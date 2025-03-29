import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailgun';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!process.env.MAILGUN_DOMAIN || !process.env.MAILGUN_FROM_EMAIL || !process.env.CONTACT_EMAIL) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Send message to alex.bordei@whiz.ro
    const notificationResult = await sendEmail({
      to: 'alex.bordei@whiz.ro',
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0;"><strong style="color: #4a4a4a;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #4a4a4a;">Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong style="color: #4a4a4a;">Message:</strong></p>
            <p style="margin: 10px 0; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="color: #666; font-size: 14px; margin-top: 20px;">This message was sent from your website contact form.</p>
        </div>
      `,
    });

    if (!notificationResult.success) {
      console.error('Failed to send message:', notificationResult.error);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    // Send confirmation to the sender
    const confirmationResult = await sendEmail({
      to: email,
      subject: 'Thank you for reaching out!',
      text: `Hi ${name},

Thank you for your message. I've received it and will get back to you as soon as possible.

In the meantime, feel free to:
- Check out my latest blog posts at https://alexbordei.dev/blog
- Follow me on Twitter at https://twitter.com/alexbordei
- Connect with me on LinkedIn at https://linkedin.com/in/alexbordei

Best regards,
Alex Bordei`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">Thank you for reaching out!</h2>
          <p style="color: #4a4a4a; line-height: 1.6;">Hi ${name},</p>
          <p style="color: #4a4a4a; line-height: 1.6;">Thank you for your message. I've received it and will get back to you as soon as possible.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #4a4a4a; margin: 0 0 10px 0;"><strong>In the meantime, feel free to:</strong></p>
            <ul style="color: #4a4a4a; margin: 0; padding-left: 20px;">
              <li style="margin: 5px 0;"><a href="https://alexbordei.dev/blog" style="color: #0070f3; text-decoration: none;">Check out my latest blog posts</a></li>
              <li style="margin: 5px 0;"><a href="https://twitter.com/alexbordei" style="color: #0070f3; text-decoration: none;">Follow me on Twitter</a></li>
              <li style="margin: 5px 0;"><a href="https://linkedin.com/in/alexbordei" style="color: #0070f3; text-decoration: none;">Connect with me on LinkedIn</a></li>
            </ul>
          </div>
          <p style="color: #4a4a4a; line-height: 1.6;">Best regards,<br>Alex Bordei</p>
          <div style="border-top: 1px solid #eaeaea; margin-top: 20px; padding-top: 20px;">
            <p style="color: #666; font-size: 14px; margin: 0;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });

    if (!confirmationResult.success) {
      console.error('Failed to send confirmation:', confirmationResult.error);
      // Don't return error to user since the main message was sent
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 