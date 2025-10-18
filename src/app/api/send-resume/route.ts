import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';
import { 
  isValidEmail, 
  sanitizeEmail, 
  containsSuspiciousPatterns,
  hashForLogging,
  isValidOrigin,
  addSecurityHeaders
} from '@/lib/security';
import { logger } from '@/lib/logger';

export const runtime = 'nodejs';

// Configuration from environment variables
const CV_FILENAME = process.env.CV_FILENAME || '881a9cf4113fe492e9fdaa6d1d77ce562ddc6d5b92e5a110.pdf';
const CV_DISPLAY_NAME = process.env.CV_DISPLAY_NAME || 'CV.pdf';
const EMAIL_SUBJECT = process.env.EMAIL_SUBJECT || 'Ashwin Charathsandran - Resume';
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || 'Ashwin Charathsandran';
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || 'mail.ashwin.lol';
const MAILGUN_FROM = `${EMAIL_FROM_NAME} <postmaster@${MAILGUN_DOMAIN}>`;

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://ashwin.lol',
  'https://www.ashwin.lol',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
];

export async function POST(request: Request) {
  try {
    // Security: Validate origin to prevent CSRF
    if (process.env.ENABLE_CSRF_PROTECTION === 'true') {
      if (!isValidOrigin(request, ALLOWED_ORIGINS)) {
        logger.warn('Blocked request from invalid origin', {
          origin: request.headers.get('origin'),
          referer: request.headers.get('referer')
        });
        return NextResponse.json(
          { error: 'Invalid request origin' },
          { status: 403 }
        );
      }
    }

    // Rate limiting
    const identifier = getClientIdentifier(request);
    const rateLimit = await checkRateLimit(identifier);
    
    if (!rateLimit.success) {
      logger.warn('Rate limit exceeded', {
        identifier: hashForLogging(identifier),
        limit: rateLimit.limit,
        reset: new Date(rateLimit.reset).toISOString()
      });
      
      const headers = new Headers();
      addSecurityHeaders(headers);
      headers.set('X-RateLimit-Limit', rateLimit.limit.toString());
      headers.set('X-RateLimit-Remaining', '0');
      headers.set('X-RateLimit-Reset', Math.floor(rateLimit.reset / 1000).toString());
      headers.set('Retry-After', '3600'); // 1 hour
      
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers }
      );
    }

    // Parse and validate request body
    let email: string;
    try {
      const body = await request.json();
      email = body.email;
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate email is provided
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Sanitize and validate email
    const sanitizedEmail = sanitizeEmail(email);
    
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for suspicious patterns
    if (containsSuspiciousPatterns(sanitizedEmail)) {
      logger.warn('Suspicious email pattern detected', {
        emailHash: hashForLogging(sanitizedEmail)
      });
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate Mailgun API key is configured
    if (!process.env.MAILGUN_API_KEY) {
      logger.error('MAILGUN_API_KEY not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    const FormData = (await import('form-data')).default;
    const Mailgun = (await import('mailgun.js')).default;
    const mailgun = new Mailgun(FormData);
    
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    });

    const htmlContent = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0f0f0f; color: #e5e5e5; border-radius: 12px; border: 1px solid #333333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">${EMAIL_FROM_NAME}</h1>
        </div>
        <div style="background-color: #1a1a1a; border-radius: 8px; padding: 25px; margin-bottom: 30px; border: 1px solid #333333;">
          <h2 style="margin-top: 0; color: #3b82f6; font-size: 18px; font-weight: 500;">Thank you for your interest!</h2>
          <p style="margin: 16px 0; line-height: 1.6;">Thank you for requesting my CV. I've attached it to this email for your reference.</p>
          <p style="margin: 16px 0; line-height: 1.6;">Feel free to reach out if you have any questions or would like to discuss potential opportunities.</p>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://ashwin.lol" style="display: inline-block; color: #3b82f6; text-decoration: none; font-size: 14px; border-bottom: 1px dotted #3b82f680;">ashwin.lol</a>
        </div>
      </div>
    `;

    let cvBuffer: Buffer;
    try {
      const fs = (await import('fs')).default;
      const path = (await import('path')).default;
      
      const cvPath = path.join(process.cwd(), 'public', CV_FILENAME);
      cvBuffer = fs.readFileSync(cvPath);
    } catch (fileError) {
      logger.error('Failed to load CV file', fileError, {
        filename: CV_FILENAME,
        path: 'public/' + CV_FILENAME
      });
      return NextResponse.json(
        { error: 'CV file not available. Email cannot be sent.' },
        { status: 500 }
      );
    }

    const emailData = {
      from: MAILGUN_FROM,
      to: [sanitizedEmail],
      subject: EMAIL_SUBJECT,
      text: 'Please find attached my CV.',
      html: htmlContent,
      attachment: [{
        data: cvBuffer,
        filename: CV_DISPLAY_NAME,
        contentType: 'application/pdf',
      }]
    };

    try {
      const result = await mg.messages.create(MAILGUN_DOMAIN, emailData);
      
      // Log success with hashed email for privacy
      logger.info('Email sent successfully', {
        messageId: result.id,
        recipient: hashForLogging(sanitizedEmail),
        timestamp: new Date().toISOString()
      });

      // Prepare response headers with security and rate limit info
      const responseHeaders = new Headers();
      addSecurityHeaders(responseHeaders);
      responseHeaders.set('X-RateLimit-Limit', rateLimit.limit.toString());
      responseHeaders.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
      responseHeaders.set('X-RateLimit-Reset', Math.floor(rateLimit.reset / 1000).toString());

      return NextResponse.json(
        {
          success: true,
          remaining: rateLimit.remaining,
          messageId: result.id || 'unknown'
        },
        {
          status: 200,
          headers: responseHeaders
        }
      );
    } catch (mailgunError) {
      logger.error('Mailgun API error', mailgunError, {
        recipient: hashForLogging(sanitizedEmail),
        domain: MAILGUN_DOMAIN
      });
      
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    logger.error('Unexpected error in send-resume endpoint', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}