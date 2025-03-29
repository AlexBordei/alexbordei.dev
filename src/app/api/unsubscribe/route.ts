import { NextResponse } from 'next/server';
import { sendEmail, verifyUnsubscribeToken, removeFromMailingList } from '@/lib/mailgun';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Unsubscribe token is required' },
        { status: 400 }
      );
    }

    // Verify and decode the token
    const decoded = verifyUnsubscribeToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid or expired unsubscribe token' },
        { status: 400 }
      );
    }

    const { email } = decoded;

    // Remove from mailing list
    const result = await removeFromMailingList(email);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    // Send confirmation to the user
    const confirmationResult = await sendEmail({
      to: email,
      subject: 'Unsubscribed from Newsletter',
      text: `You have been successfully unsubscribed from the newsletter. 
      
If this was a mistake, you can resubscribe at any time by visiting:
https://alexbordei.dev/newsletter

Best regards,
Alex Bordei`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">Unsubscribed from Newsletter</h2>
          <p style="color: #4a4a4a; line-height: 1.6;">You have been successfully unsubscribed from the newsletter.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #4a4a4a; margin: 0;">If this was a mistake, you can resubscribe at any time by visiting:</p>
            <p style="margin: 10px 0;"><a href="https://alexbordei.dev/newsletter" style="color: #0070f3; text-decoration: none;">https://alexbordei.dev/newsletter</a></p>
          </div>
          <p style="color: #4a4a4a; line-height: 1.6;">Best regards,<br>Alex Bordei</p>
        </div>
      `
    });

    // Send notification to admin
    await sendEmail({
      to: 'alex.bordei@whiz.ro',
      subject: 'Newsletter Unsubscription',
      text: `${email} has unsubscribed from the newsletter.`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">Newsletter Unsubscription</h2>
          <p style="color: #4a4a4a; line-height: 1.6;">${email} has unsubscribed from the newsletter.</p>
        </div>
      `
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Unsubscribe API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 