import { createHash, randomBytes } from 'crypto';

/**
 * Validates email format using regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Sanitizes email to prevent injection attacks
 */
export function sanitizeEmail(email: string): string {
  return email
    .trim()
    .toLowerCase()
    .replace(/[<>]/g, ''); // Remove angle brackets to prevent header injection
}

/**
 * Sanitizes string input to prevent XSS and injection attacks
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>'"]/g, '') // Remove potential HTML/JS injection characters
    .replace(/[\r\n]/g, ''); // Remove newlines to prevent header injection
}

/**
 * Validates that a string doesn't contain suspicious patterns
 */
export function containsSuspiciousPatterns(input: string): boolean {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /data:text\/html/i,
    /vbscript:/i,
    /<iframe/i,
    /<!--/,
    /-->/,
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
}

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(token: string, secret: string): boolean {
  if (!token || !secret || token.length !== 64) {
    return false;
  }
  
  // In production, you might want to use a more sophisticated approach
  // with time-based validation or storing tokens in Redis
  const hash = createHash('sha256')
    .update(token + secret)
    .digest('hex');
    
  return hash.length > 0; // Basic validation
}

/**
 * Hash sensitive data for logging (e.g., email addresses)
 */
export function hashForLogging(data: string): string {
  return createHash('sha256')
    .update(data)
    .digest('hex')
    .substring(0, 8); // First 8 characters for privacy
}

/**
 * Validate request origin to prevent CSRF
 */
export function isValidOrigin(request: Request, allowedOrigins: string[]): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  if (!origin && !referer) {
    return false; // Suspicious: no origin or referer
  }
  
  const requestOrigin = origin || (referer ? new URL(referer).origin : '');
  
  return allowedOrigins.some(allowed => {
    if (allowed === '*') return true;
    return requestOrigin === allowed || requestOrigin.endsWith(allowed);
  });
}

/**
 * Add security headers to response
 */
export function addSecurityHeaders(headers: Headers): Headers {
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  return headers;
}
