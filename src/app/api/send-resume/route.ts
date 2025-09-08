import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Configuration - Edit these values as needed
const CV_FILENAME = '881a9cf4113fe492e9fdaa6d1d77ce562ddc6d5b92e5a110.pdf';
const CV_DISPLAY_NAME = 'CV.pdf';
const RATE_LIMIT_MAX = 5;
const EMAIL_SUBJECT = 'Ashwin Charathsandran - Resume';
const EMAIL_FROM_NAME = 'Ashwin Charathsandran';
const MAILGUN_DOMAIN = 'mail.ashwin.lol';
const MAILGUN_FROM = `${EMAIL_FROM_NAME} <postmaster@${MAILGUN_DOMAIN}>`;

const rateLimiter = {
  checkLimits: () => ({
    dailyAllowed: true,
    shortTermAllowed: true,
    remaining: RATE_LIMIT_MAX,
    resetAt: Date.now() + 24 * 60 * 60 * 1000
  })
};

export async function POST(request: Request) {
  try {
    const limits = rateLimiter.checkLimits();
    
    if (!limits.shortTermAllowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '5' } }
      );
    }

    if (!limits.dailyAllowed) {
      return NextResponse.json(
        { error: 'Daily request limit reached. Please try again tomorrow.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': Math.floor(limits.resetAt / 1000).toString()
          }
        }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const FormData = (await import('form-data')).default;
    const Mailgun = (await import('mailgun.js')).default;
    const mailgun = new Mailgun(FormData);
    
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY || '',
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
      console.error('Failed to load CV file:', fileError);
      return NextResponse.json(
        { error: 'CV file not available. Email cannot be sent.' },
        { status: 500 }
      );
    }

    const emailData = {
      from: MAILGUN_FROM,
      to: [email],
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
      console.log('Email sent successfully:', result);

      return NextResponse.json(
        {
          success: true,
          remaining: limits.remaining,
          messageId: result.id || 'unknown'
        },
        {
          status: 200,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX.toString(),
            'X-RateLimit-Remaining': limits.remaining.toString(),
            'X-RateLimit-Reset': Math.floor(limits.resetAt / 1000).toString()
          }
        }
      );
    } catch (error) {
      console.error('Mailgun error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}