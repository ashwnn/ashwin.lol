import { NextResponse } from 'next/server';
import { 
  sanitizeString, 
  hashForLogging,
  isValidOrigin,
  addSecurityHeaders
} from '@/lib/security';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export const runtime = 'nodejs';

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://ashwin.lol',
  'https://www.ashwin.lol',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
];

// System metrics collection endpoint
export async function POST(request: Request) {
  try {
    // Security: Validate origin to prevent CSRF
    if (process.env.ENABLE_CSRF_PROTECTION === 'true') {
      if (!isValidOrigin(request, ALLOWED_ORIGINS)) {
        console.warn('Blocked metrics request from invalid origin');
        return NextResponse.json(
          { error: 'Invalid request origin' },
          { status: 403 }
        );
      }
    }

    // Rate limiting (more lenient for metrics)
    const identifier = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(`metrics:${identifier}`);
    
    if (!rateLimit.success) {
      console.warn(`Metrics rate limit exceeded for ${hashForLogging(identifier)}`);
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Parse and validate request body
    let data: {
      recipient?: string;
      delivered_at?: string;
      status?: string;
      source?: string;
    };
    
    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    // Validate required fields for delivery metrics
    if (!data.recipient || !data.delivered_at || !data.status) {
      return NextResponse.json(
        { error: 'Invalid metrics data: missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedStatus = sanitizeString(data.status, 50);
    const sanitizedSource = data.source ? sanitizeString(data.source, 100) : 'unknown';

    // Log to console for system monitoring (with hashed email)
    console.log('Delivery metrics:', {
      recipient: hashForLogging(data.recipient),
      timestamp: data.delivered_at,
      status: sanitizedStatus,
      source: sanitizedSource
    });

    // Forward to analytics service for aggregation (if configured)
    if (process.env.ANALYTICS_URL && process.env.ANALYTICS_SITE_ID) {
      try {
        const analyticsPayload = new URL(process.env.ANALYTICS_URL);
        analyticsPayload.searchParams.append('type', 'event');
        analyticsPayload.searchParams.append('id', process.env.ANALYTICS_SITE_ID);
        analyticsPayload.searchParams.append('event_type', 'resume_submission');
        analyticsPayload.searchParams.append('email', hashForLogging(data.recipient));
        analyticsPayload.searchParams.append('timestamp', data.delivered_at);
        analyticsPayload.searchParams.append('hostname', sanitizedSource);

        await fetch(analyticsPayload.toString(), { 
          mode: 'no-cors',
          headers: {
            'User-Agent': 'System-Metrics/1.0'
          },
          signal: AbortSignal.timeout(5000) // 5 second timeout
        });
      } catch (error) {
        // Analytics forwarding is non-critical
        console.log('Analytics service unavailable:', error instanceof Error ? error.message : 'Unknown error');
      }
    }

    // Prepare response with security headers
    const responseHeaders = new Headers();
    addSecurityHeaders(responseHeaders);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Metrics recorded' 
      },
      { headers: responseHeaders }
    );

  } catch (error) {
    console.error('Metrics collection error:', error);
    return NextResponse.json({ 
      error: 'Metrics collection failed' 
    }, { status: 500 });
  }
}
