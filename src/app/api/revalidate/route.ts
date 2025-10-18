import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { logger } from '@/lib/logger';
import { addSecurityHeaders } from '@/lib/security';

/**
 * On-Demand Revalidation API Endpoint
 * 
 * This endpoint allows manual cache invalidation for ISR pages.
 * 
 * Usage:
 * POST /api/revalidate
 * Body: {
 *   secret: "your-revalidation-secret",
 *   path: "/blog/my-post" // optional
 *   tag: "blog-posts" // optional
 * }
 * 
 * Returns:
 * 200: { revalidated: true, now: timestamp }
 * 401: { message: "Invalid token" }
 * 400: { message: "Missing path or tag" }
 * 500: { message: "Error revalidating" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret, path, tag } = body;

    // Check for secret to prevent unauthorized revalidation
    const revalidationSecret = process.env.REVALIDATION_SECRET;
    
    if (!revalidationSecret) {
      logger.error('REVALIDATION_SECRET not configured');
      const errorResponse = NextResponse.json(
        { message: 'Revalidation not configured' },
        { status: 500 }
      );
      addSecurityHeaders(errorResponse.headers);
      return errorResponse;
    }

    if (secret !== revalidationSecret) {
      logger.warn('Invalid revalidation token attempt');
      const unauthorizedResponse = NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
      addSecurityHeaders(unauthorizedResponse.headers);
      return unauthorizedResponse;
    }

    // Revalidate by path or tag
    if (path) {
      logger.info('Revalidating path', { path });
      revalidatePath(path);
    } else if (tag) {
      logger.info('Revalidating tag', { tag });
      revalidateTag(tag);
    } else {
      logger.warn('Revalidation request missing path or tag');
      const badRequestResponse = NextResponse.json(
        { message: 'Missing path or tag parameter' },
        { status: 400 }
      );
      addSecurityHeaders(badRequestResponse.headers);
      return badRequestResponse;
    }

    logger.info('Cache revalidation successful', { path, tag });

    const successResponse = NextResponse.json(
      { 
        revalidated: true, 
        now: Date.now(),
        path,
        tag
      },
      { status: 200 }
    );
    
    addSecurityHeaders(successResponse.headers);
    return successResponse;

  } catch (error) {
    logger.error('Error during revalidation', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    const errorResponse = NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
    
    addSecurityHeaders(errorResponse.headers);
    return errorResponse;
  }
}

// Return 405 for non-POST requests
export async function GET() {
  const response = NextResponse.json(
    { message: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
  
  addSecurityHeaders(response.headers);
  return response;
}
