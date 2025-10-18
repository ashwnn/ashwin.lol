/**
 * Logger utility for production-ready error and info logging
 * Provides structured logging with timestamps and context
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  /**
   * Log an informational message
   */
  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  /**
   * Log a warning message
   */
  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  /**
   * Log an error with full details
   */
  error(message: string, error?: unknown, context?: LogContext): void {
    const errorDetails = this.extractErrorDetails(error);
    this.log('error', message, { ...context, ...errorDetails });
  }

  /**
   * Log debug information (only in development)
   */
  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      this.log('debug', message, context);
    }
  }

  /**
   * Extract error details from various error types
   */
  private extractErrorDetails(error: unknown): Record<string, unknown> {
    if (!error) return {};

    if (error instanceof Error) {
      return {
        error: error.message,
        stack: this.isDevelopment ? error.stack : undefined,
        name: error.name,
      };
    }

    if (typeof error === 'string') {
      return { error };
    }

    if (typeof error === 'object') {
      return { error: JSON.stringify(error) };
    }

    return { error: String(error) };
  }

  /**
   * Core logging method
   */
  private log(level: LogLevel, message: string, context?: LogContext): void {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...context,
    };

    // In production, use structured logging
    // In development, use formatted console output
    if (this.isDevelopment) {
      const color = this.getConsoleColor(level);
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
        `${color}[${level.toUpperCase()}]%c ${message}`,
        `color: ${color}; font-weight: bold`,
        'color: inherit',
        context || ''
      );
    } else {
      // Structured JSON logging for production
      console.log(JSON.stringify(logData));
    }
  }

  /**
   * Get console color based on log level
   */
  private getConsoleColor(level: LogLevel): string {
    switch (level) {
      case 'error':
        return '#ef4444'; // red
      case 'warn':
        return '#f59e0b'; // orange
      case 'info':
        return '#3b82f6'; // blue
      case 'debug':
        return '#8b5cf6'; // purple
      default:
        return '#6b7280'; // gray
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export types
export type { LogLevel, LogContext };
