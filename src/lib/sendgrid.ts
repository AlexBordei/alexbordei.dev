import mail from '@sendgrid/mail';

// Initialize SendGrid with API key
mail.setApiKey(process.env.SENDGRID_API_KEY || '');

export interface EmailData {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async (data: EmailData) => {
  try {
    await mail.send(data);
    return { success: true };
  } catch (error) {
    console.error('SendGrid Error:', error);
    return { success: false, error };
  }
};

export const addToContactList = async (email: string) => {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/marketing/contacts', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contacts: [
          {
            email,
            list_ids: [process.env.SENDGRID_LIST_ID],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add contact to list');
    }

    return { success: true };
  } catch (error) {
    console.error('SendGrid List Error:', error);
    return { success: false, error };
  }
}; 