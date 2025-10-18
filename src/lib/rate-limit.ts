import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create Redis client (only if UPSTASH credentials are provided)
let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  // Create rate limiter with sliding window
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(
      parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10),
      `${parseInt(process.env.RATE_LIMIT_WINDOW_MS || '86400000', 10)} ms`
    ),
    analytics: true,
    prefix: '@ratelimit/resume',
  });
}

// In-memory fallback rate limiter (for development/testing)
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const inMemoryStore = new Map<string, RateLimitEntry>();

// Clean up old entries every hour
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of inMemoryStore.entries()) {
      if (entry.resetAt < now) {
        inMemoryStore.delete(key);
      }
    }
  }, 60 * 60 * 1000);
}

export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  // If Upstash is configured, use it
  if (ratelimit) {
    try {
      const result = await ratelimit.limit(identifier);
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset,
      };
    } catch (error) {
      console.error('Rate limit check failed:', error);
      // Fall through to in-memory limiter
    }
  }

  // Fallback to in-memory rate limiter
  const now = Date.now();
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '86400000', 10);
  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10);
  
  const entry = inMemoryStore.get(identifier);
  
  if (!entry || entry.resetAt < now) {
    // Create new entry
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
    };
    inMemoryStore.set(identifier, newEntry);
    
    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      reset: newEntry.resetAt,
    };
  }
  
  // Update existing entry
  entry.count += 1;
  const success = entry.count <= maxRequests;
  
  return {
    success,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - entry.count),
    reset: entry.resetAt,
  };
}

export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  const ip = cfConnectingIp || realIp || forwardedFor?.split(',')[0] || 'unknown';
  
  // Add user agent as additional identifier
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  return `${ip}:${userAgent}`;
}
