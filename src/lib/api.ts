import { logger } from './logger';

/**
 * API Utility Module
 * 
 * Provides centralized API handling with:
 * - Automatic retry with exponential backoff
 * - Response caching to reduce API calls
 * - Rate limit detection and handling
 * - Request batching capabilities
 * - Error handling and logging
 */

// ============================================
// Types
// ============================================

interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
  retryableStatuses?: number[];
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  key?: string; // Custom cache key
}

interface FetchOptions extends Omit<RequestInit, 'cache'> {
  retry?: RetryOptions;
  cache?: CacheOptions;
  timeout?: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
}

// ============================================
// In-Memory Cache
// ============================================

class APICache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private maxSize = 100; // Maximum cache entries

  set<T>(key: string, data: T, ttl: number): void {
    // Enforce cache size limit (LRU-style)
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) this.cache.delete(firstKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;

    // Check if cache entry has expired
    const age = Date.now() - entry.timestamp;
    if (age > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      entries: Array.from(this.cache.keys()),
    };
  }
}

// Global cache instance
const apiCache = new APICache();

// ============================================
// Retry Logic
// ============================================

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffMultiplier: 2,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shouldRetry(status: number | undefined, retryableStatuses: number[]): boolean {
  if (!status) return true; // Network errors are retryable
  return retryableStatuses.includes(status);
}

function calculateDelay(attempt: number, options: Required<RetryOptions>): number {
  const delay = Math.min(
    options.initialDelay * Math.pow(options.backoffMultiplier, attempt),
    options.maxDelay
  );
  
  // Add jitter to prevent thundering herd
  const jitter = Math.random() * 0.3 * delay;
  return delay + jitter;
}

// ============================================
// Rate Limit Handling
// ============================================

function parseRateLimitHeaders(headers: Headers): RateLimitInfo | null {
  const limit = headers.get('x-ratelimit-limit');
  const remaining = headers.get('x-ratelimit-remaining');
  const reset = headers.get('x-ratelimit-reset');

  if (!limit || !remaining || !reset) {
    return null;
  }

  return {
    limit: parseInt(limit, 10),
    remaining: parseInt(remaining, 10),
    reset: parseInt(reset, 10),
  };
}

function handleRateLimit(rateLimitInfo: RateLimitInfo): void {
  const now = Math.floor(Date.now() / 1000);
  const waitTime = Math.max(0, rateLimitInfo.reset - now);

  // Only log warning if we're running low on requests (less than 20% remaining)
  const threshold = Math.floor(rateLimitInfo.limit * 0.2);
  if (rateLimitInfo.remaining <= threshold) {
    logger.warn('Rate limit approaching', {
      remaining: rateLimitInfo.remaining,
      limit: rateLimitInfo.limit,
      resetIn: `${waitTime}s`,
    });
  }

  if (rateLimitInfo.remaining === 0) {
    throw new Error(`Rate limit exceeded. Resets in ${waitTime} seconds.`);
  }
}

// ============================================
// Fetch with Timeout
// ============================================

async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number }
): Promise<Response> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
}

// ============================================
// Enhanced Fetch with Retry & Caching
// ============================================

export async function enhancedFetch<T = unknown>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    retry: retryOptions,
    cache: cacheOptions,
    timeout,
    ...fetchOptions
  } = options;

  // Merge retry options with defaults
  const retry: Required<RetryOptions> = {
    ...DEFAULT_RETRY_OPTIONS,
    ...retryOptions,
  };

  // Generate cache key
  const cacheKey = cacheOptions?.key || `${url}:${JSON.stringify(fetchOptions)}`;

  // Check cache first
  if (cacheOptions?.ttl) {
    const cached = apiCache.get<T>(cacheKey);
    if (cached !== null) {
      logger.info('API cache hit', { url, cacheKey });
      return cached;
    }
  }

  let lastError: Error | null = null;
  let attempt = 0;

  while (attempt <= retry.maxRetries) {
    try {
      logger.info('API request', { url, attempt, maxRetries: retry.maxRetries });

      const response = await fetchWithTimeout(url, {
        ...fetchOptions,
        timeout,
      });

      // Check for rate limiting
      const rateLimitInfo = parseRateLimitHeaders(response.headers);
      if (rateLimitInfo) {
        handleRateLimit(rateLimitInfo);
      }

      // Handle non-OK responses
      if (!response.ok) {
        const shouldRetryRequest = shouldRetry(response.status, retry.retryableStatuses);

        logger.warn('API request failed', {
          url,
          status: response.status,
          statusText: response.statusText,
          willRetry: shouldRetryRequest && attempt < retry.maxRetries,
        });

        if (!shouldRetryRequest) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        throw new Error(`Retryable error: ${response.status}`);
      }

      // Parse response
      const data = await response.json() as T;

      // Cache successful response
      if (cacheOptions?.ttl) {
        apiCache.set(cacheKey, data, cacheOptions.ttl);
        logger.info('API response cached', { url, cacheKey, ttl: cacheOptions.ttl });
      }

      logger.info('API request successful', { url, attempt });
      return data;

    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      // Don't retry if we've exhausted attempts
      if (attempt >= retry.maxRetries) {
        break;
      }

      // Calculate delay and wait before retry
      const delay = calculateDelay(attempt, retry);
      logger.warn('Retrying API request', {
        url,
        attempt,
        nextAttemptIn: `${Math.round(delay)}ms`,
        error: lastError.message,
      });

      await sleep(delay);
      attempt++;
    }
  }

  // All retries failed
  logger.error('API request failed after all retries', {
    url,
    attempts: attempt,
    error: lastError?.message,
  });

  throw lastError || new Error('Request failed after retries');
}

// ============================================
// GitHub API Specific Functions
// ============================================

interface GitHubAPIOptions extends Omit<FetchOptions, 'headers'> {
  token?: string;
}

/**
 * Fetch from GitHub API with automatic retry and rate limit handling
 */
export async function fetchGitHubAPI<T = unknown>(
  endpoint: string,
  options: GitHubAPIOptions = {}
): Promise<T> {
  const { token, ...fetchOptions } = options;

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'ashwin.lol',
  };

  // Add authentication if token provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http')
    ? endpoint
    : `https://api.github.com${endpoint}`;

  return enhancedFetch<T>(url, {
    ...fetchOptions,
    headers,
    retry: {
      maxRetries: 3,
      initialDelay: 2000, // GitHub rate limits benefit from longer delays
      retryableStatuses: [403, 429, 500, 502, 503], // 403 can be rate limit
    },
    cache: {
      ttl: fetchOptions.cache?.ttl || 24 * 60 * 60 * 1000, // 24 hours default
      key: fetchOptions.cache?.key,
    },
  });
}

/**
 * Fetch user's gists with caching and retry
 */
export async function fetchUserGists(username: string): Promise<unknown[]> {
  return fetchGitHubAPI(`/users/${username}/gists`, {
    cache: {
      ttl: 24 * 60 * 60 * 1000, // 24 hours
      key: `gists:${username}`,
    },
  });
}

// ============================================
// Batch Request Handler
// ============================================

interface BatchRequest {
  url: string;
  options?: FetchOptions;
}

/**
 * Execute multiple API requests in parallel with concurrency control
 */
export async function batchFetch<T = unknown>(
  requests: BatchRequest[],
  maxConcurrency: number = 5
): Promise<T[]> {
  const results: T[] = [];
  const errors: Error[] = [];

  // Process requests in batches
  for (let i = 0; i < requests.length; i += maxConcurrency) {
    const batch = requests.slice(i, i + maxConcurrency);
    
    logger.info('Processing batch', {
      batchNumber: Math.floor(i / maxConcurrency) + 1,
      batchSize: batch.length,
      totalRequests: requests.length,
    });

    const batchResults = await Promise.allSettled(
      batch.map(req => enhancedFetch<T>(req.url, req.options))
    );

    batchResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value);
      } else {
        const error = result.reason instanceof Error 
          ? result.reason 
          : new Error('Unknown error');
        errors.push(error);
        logger.error('Batch request failed', {
          url: batch[index].url,
          error: error.message,
        });
      }
    });

    // Add small delay between batches to avoid overwhelming the API
    if (i + maxConcurrency < requests.length) {
      await sleep(100);
    }
  }

  if (errors.length > 0) {
    logger.warn('Batch completed with errors', {
      successful: results.length,
      failed: errors.length,
    });
  }

  return results;
}

// ============================================
// Cache Management
// ============================================

/**
 * Clear entire API cache
 */
export function clearAPICache(): void {
  apiCache.clear();
  logger.info('API cache cleared');
}

/**
 * Clear specific cache entry
 */
export function clearCacheEntry(key: string): void {
  apiCache.delete(key);
  logger.info('Cache entry cleared', { key });
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return apiCache.getStats();
}

// ============================================
// Export cache instance for advanced usage
// ============================================

export { apiCache };
