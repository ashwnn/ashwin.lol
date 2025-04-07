import { NextResponse } from 'next/server';
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
  url: 'https://api.mailgun.net'
});

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || '';

class InMemoryRateLimiter {
  private requests: Map<string, { count: number, resetAt: number }> = new Map();
  private shortTermRequests: Map<string, { timestamp: number }> = new Map();

  async checkDailyLimit(ip: string): Promise<{ allowed: boolean, remaining: number, resetAt: number }> {
    const now = Date.now();
    const resetAt = new Date().setHours(24, 0, 0, 0); // Reset at midnight

    const record = this.requests.get(ip);
    if (!record) {
      this.requests.set(ip, { count: 1, resetAt });
      return { allowed: true, remaining: 4, resetAt };
    }

    if (now > record.resetAt) {
      this.requests.set(ip, { count: 1, resetAt });
      return { allowed: true, remaining: 4, resetAt };
    }

    if (record.count >= 5) {
      return { allowed: false, remaining: 0, resetAt: record.resetAt };
    }

    record.count += 1;
    this.requests.set(ip, record);
    return { allowed: true, remaining: 5 - record.count, resetAt: record.resetAt };
  }

  async checkShortTermLimit(ip: string): Promise<{ allowed: boolean, retryAfter: number }> {
    const now = Date.now();
    const record = this.shortTermRequests.get(ip);

    if (!record) {
      this.shortTermRequests.set(ip, { timestamp: now });
      return { allowed: true, retryAfter: 0 };
    }

    const elapsedMs = now - record.timestamp;
    if (elapsedMs < 5000) {
      return { allowed: false, retryAfter: Math.ceil((5000 - elapsedMs) / 1000) };
    }

    this.shortTermRequests.set(ip, { timestamp: now });
    return { allowed: true, retryAfter: 0 };
  }

  cleanup() {
    const now = Date.now();

    for (const [ip, record] of this.requests.entries()) {
      if (now > record.resetAt) {
        this.requests.delete(ip);
      }
    }

    for (const [ip, record] of this.shortTermRequests.entries()) {
      if (now - record.timestamp > 60000) {
        this.shortTermRequests.delete(ip);
      }
    }
  }
}

const rateLimiter = new InMemoryRateLimiter();
setInterval(() => {
  rateLimiter.cleanup();
}, 5 * 60 * 1000);

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const shortTermLimit = await rateLimiter.checkShortTermLimit(ip);
    if (!shortTermLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(shortTermLimit.retryAfter)
          }
        }
      );
    }

    const dailyLimit = await rateLimiter.checkDailyLimit(ip);
    if (!dailyLimit.allowed) {
      return NextResponse.json(
        { error: 'Daily request limit reached. Please try again tomorrow.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.floor(dailyLimit.resetAt / 1000).toString()
          }
        }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const htmlContent = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #0f0f0f; color: #e5e5e5; border-radius: 12px; border: 1px solid #333333;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Ashwin Charathsandran</h1>
          <p style="margin: 8px 0 0; color: #999999; font-size: 16px;">My Resume</p>
        </div>
        <div style="background-color: #1a1a1a; border-radius: 8px; padding: 25px; margin-bottom: 30px; border: 1px solid #333333;">
          <h2 style="margin-top: 0; color: #3b82f6; font-size: 18px; font-weight: 500;">Thank you for your interest!</h2>
          <p style="margin: 16px 0; line-height: 1.6;">Hello,</p>
          <p style="margin: 16px 0; line-height: 1.6;">Thank you for requesting my CV. I've attached it to this email for your reference.</p>
          <p style="margin: 16px 0; line-height: 1.6;">Feel free to reach out if you have any questions or would like to discuss potential opportunities.</p>
        </div>
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333333;">
          <p style="margin: 0; color: #999999; font-size: 14px;">Best regards,</p>
          <p style="margin: 8px 0 0; color: #ffffff; font-size: 16px; font-weight: 500;">Ashwin Charathsandran</p>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <a href="https://ashwin.lol" style="display: inline-block; color: #3b82f6; text-decoration: none; font-size: 14px; border-bottom: 1px dotted #3b82f680;">ashwin.lol</a>
        </div>
      </div>
    `;

    // Configure email data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const emailData: any = {
      from: process.env.FROM_EMAIL || `Ashwin Charathsandran <resume@${MAILGUN_DOMAIN}>`,
      to: email,
      subject: 'Ashwin Charathsandran - Resume',
      text: 'Please find attached my CV.',
      html: htmlContent,
    };

    // Add attachment if a CV is available – ensure it's passed as an array per Mailgun's API requirements
    if (process.env.CV_BASE64) {
      emailData.attachment = [{
        data: Buffer.from(process.env.CV_BASE64, 'base64'),
        filename: 'CV.pdf',
        contentType: 'application/pdf',
      }];
    }

    // Send email using Mailgun
    const result = await mg.messages.create(MAILGUN_DOMAIN, emailData);

    return NextResponse.json(
      {
        success: true,
        remaining: dailyLimit.remaining,
        messageId: result.id || 'unknown'
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': dailyLimit.remaining.toString(),
          'X-RateLimit-Reset': Math.floor(dailyLimit.resetAt / 1000).toString()
        }
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
