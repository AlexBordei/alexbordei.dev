import formData from 'form-data';
import Mailgun from 'mailgun.js';
import crypto from 'crypto';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_PRIVATE_KEY || '',
  url: 'https://api.eu.mailgun.net'
});

// Secret key for token generation - should be in env
const UNSUBSCRIBE_SECRET = process.env.UNSUBSCRIBE_SECRET || 'your-secret-key';

export interface EmailData {
  to: string;
  from?: string;
  subject: string;
  text: string;
  html?: string;
  'h:List-Unsubscribe'?: string;
  'h:List-Unsubscribe-Post'?: string;
  'h:List-Id'?: string;
  'h:List-Post'?: string;
  'h:List-Archive'?: string;
  'h:List-Subscribe'?: string;
  'h:List-Owner'?: string;
  'v:user-variables'?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Generate a secure unsubscribe token
export const generateUnsubscribeToken = (email: string): string => {
  const timestamp = Date.now();
  const data = `${email}:${timestamp}`;
  const hmac = crypto.createHmac('sha256', UNSUBSCRIBE_SECRET);
  hmac.update(data);
  const signature = hmac.digest('hex');
  return Buffer.from(`${data}:${signature}`).toString('base64');
};

// Verify and decode unsubscribe token
export const verifyUnsubscribeToken = (token: string): { email: string; timestamp: number } | null => {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [email, timestamp, signature] = decoded.split(':');
    const data = `${email}:${timestamp}`;
    const hmac = crypto.createHmac('sha256', UNSUBSCRIBE_SECRET);
    hmac.update(data);
    const expectedSignature = hmac.digest('hex');
    
    if (signature !== expectedSignature) {
      return null;
    }

    // Check if token is not too old (e.g., 30 days)
    const tokenAge = Date.now() - parseInt(timestamp);
    if (tokenAge > 30 * 24 * 60 * 60 * 1000) {
      return null;
    }

    return { email, timestamp: parseInt(timestamp) };
  } catch (error) {
    return null;
  }
};

export const sendEmail = async (data: EmailData) => {
  try {
    const domain = 'alexbordei.dev';
    const fromEmail = 'contact@alexbordei.dev';

    console.log('Sending email:', {
      to: data.to,
      from: `Alex Bordei <${fromEmail}>`,
      subject: data.subject,
      domain,
    });

    // Use the messages API with form data
    const result = await mg.messages.create(domain, {
      to: data.to,
      from: `Alex Bordei <${fromEmail}>`,
      subject: data.subject,
      text: data.text,
      ...(data.html ? { html: data.html } : {}),
      ...(data['h:List-Unsubscribe'] ? { 'h:List-Unsubscribe': data['h:List-Unsubscribe'] } : {}),
      ...(data['h:List-Unsubscribe-Post'] ? { 'h:List-Unsubscribe-Post': data['h:List-Unsubscribe-Post'] } : {}),
      ...(data['h:List-Id'] ? { 'h:List-Id': data['h:List-Id'] } : {}),
      ...(data['h:List-Post'] ? { 'h:List-Post': data['h:List-Post'] } : {}),
      ...(data['h:List-Archive'] ? { 'h:List-Archive': data['h:List-Archive'] } : {}),
      ...(data['h:List-Subscribe'] ? { 'h:List-Subscribe': data['h:List-Subscribe'] } : {}),
      ...(data['h:List-Owner'] ? { 'h:List-Owner': data['h:List-Owner'] } : {}),
      ...(data['v:user-variables'] ? { 'v:user-variables': data['v:user-variables'] } : {})
    });

    console.log('Email sent successfully:', result);
    return { success: true };
  } catch (error: any) {
    console.error('Mailgun Error:', {
      error,
      message: error.message,
      details: error.details,
      status: error.status,
    });
    return { 
      success: false, 
      error: error.message || 'Failed to send email'
    };
  }
};

export const addToMailingList = async (email: string) => {
  try {
    const domain = 'alexbordei.dev';
    const mailingList = `newsletter@${domain}`;
    const privateKey = process.env.MAILGUN_PRIVATE_KEY || '';
    
    console.log('Adding to mailing list:', {
      email,
      mailingList,
      domain
    });

    // First, ensure mailing list exists
    try {
      console.log('Creating mailing list if not exists...');
      const createListParams = new URLSearchParams();
      createListParams.append('address', mailingList);
      createListParams.append('name', 'Newsletter');
      createListParams.append('description', 'Alex Bordei Newsletter');
      createListParams.append('access_level', 'readonly');

      const createResponse = await fetch(`https://api.eu.mailgun.net/v3/lists/${mailingList}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`api:${privateKey}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: createListParams.toString()
      });

      const createData = await createResponse.json();
      console.log('Create list response:', createData);
    } catch (createError) {
      console.log('Mailing list might already exist:', createError);
      // Ignore error as list might already exist
    }

    // Then add member to the list
    try {
      const formDataObj = new URLSearchParams();
      formDataObj.append('address', email);
      formDataObj.append('subscribed', 'yes');
      formDataObj.append('upsert', 'yes');

      const listResponse = await fetch(`https://api.eu.mailgun.net/v3/lists/${mailingList}/members`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`api:${privateKey}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formDataObj.toString()
      });

      const responseData = await listResponse.json();
      console.log('Mailing list response:', responseData);

      if (!listResponse.ok) {
        throw new Error('Failed to add to mailing list: ' + (responseData.message || 'Unknown error'));
      }

      console.log('Successfully added to mailing list:', responseData);
    } catch (listError) {
      console.error('Mailing list error:', listError);
      throw listError;
    }

    // Then send welcome email
    const welcomeResult = await mg.messages.create(domain, {
      to: email,
      from: `Alex Bordei <newsletter@${domain}>`,
      subject: 'Welcome to My Newsletter!',
      text: `Welcome to my newsletter!

Thank you for subscribing! You'll now receive updates about my latest content, projects, and insights.

What to expect:
- Latest blog posts and articles
- Project updates and announcements
- Tech insights and tutorials
- Personal development tips

You can unsubscribe at any time by:
1. Using the unsubscribe link at the bottom of any newsletter
2. Replying to this email with "unsubscribe" in the subject line
3. Sending an email to newsletter@alexbordei.dev with subject "unsubscribe"

Best regards,
Alex Bordei`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">Welcome to My Newsletter!</h2>
          <p style="color: #4a4a4a; line-height: 1.6;">Thank you for subscribing! You'll now receive updates about my latest content, projects, and insights.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #4a4a4a; margin: 0 0 10px 0;"><strong>What to expect:</strong></p>
            <ul style="color: #4a4a4a; margin: 0; padding-left: 20px;">
              <li style="margin: 5px 0;">Latest blog posts and articles</li>
              <li style="margin: 5px 0;">Project updates and announcements</li>
              <li style="margin: 5px 0;">Tech insights and tutorials</li>
              <li style="margin: 5px 0;">Personal development tips</li>
            </ul>
          </div>
          <p style="color: #4a4a4a; line-height: 1.6;">Best regards,<br>Alex Bordei</p>
          <div style="border-top: 1px solid #eaeaea; margin-top: 20px; padding-top: 20px;">
            <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Don't want to receive these emails?</p>
            <p style="margin: 0;">You can unsubscribe by:</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li style="margin: 5px 0;">Using the unsubscribe link at the bottom of any newsletter</li>
              <li style="margin: 5px 0;">Replying to this email with "unsubscribe" in the subject line</li>
              <li style="margin: 5px 0;">Sending an email to newsletter@alexbordei.dev with subject "unsubscribe"</li>
            </ul>
          </div>
        </div>
      `,
      'h:List-Unsubscribe': `<mailto:newsletter@alexbordei.dev?subject=unsubscribe>`,
      'h:List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      'v:subscribed': 'true',
      'v:email': email
    });

    console.log('Welcome email sent:', welcomeResult);
    return { success: true };
  } catch (error: any) {
    console.error('Newsletter Subscription Error:', {
      error,
      message: error.message,
    });
    return { 
      success: false, 
      error: error.message || 'Failed to process subscription'
    };
  }
};

export const removeFromMailingList = async (email: string) => {
  try {
    const domain = 'alexbordei.dev';
    
    // Remove from Mailgun mailing list
    await mg.lists.members.destroyMember(`newsletter@${domain}`, email);
    
    // Send confirmation of unsubscribe
    await sendEmail({
      to: email,
      subject: 'Unsubscribed from Newsletter',
      text: `You have been successfully unsubscribed from the newsletter.

If this was a mistake, you can resubscribe at any time by:
1. Visiting https://alexbordei.dev/newsletter
2. Sending an email to newsletter@alexbordei.dev with subject "subscribe"

Best regards,
Alex Bordei`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1a1a1a; margin-bottom: 20px;">Unsubscribed from Newsletter</h2>
          <p style="color: #4a4a4a; line-height: 1.6;">You have been successfully unsubscribed from the newsletter.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #4a4a4a; margin: 0;">If this was a mistake, you can resubscribe at any time by:</p>
            <ul style="color: #4a4a4a; margin: 10px 0; padding-left: 20px;">
              <li style="margin: 5px 0;">Visiting <a href="https://alexbordei.dev/newsletter" style="color: #0070f3; text-decoration: none;">https://alexbordei.dev/newsletter</a></li>
              <li style="margin: 5px 0;">Sending an email to newsletter@alexbordei.dev with subject "subscribe"</li>
            </ul>
          </div>
          <p style="color: #4a4a4a; line-height: 1.6;">Best regards,<br>Alex Bordei</p>
        </div>
      `
    });
    
    return { success: true };
  } catch (error: any) {
    console.error('Newsletter Unsubscribe Error:', {
      error,
      message: error.message,
    });
    return { 
      success: false, 
      error: error.message || 'Failed to unsubscribe'
    };
  }
}; 