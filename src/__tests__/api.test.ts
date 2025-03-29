import { NextRequest } from 'next/server';
import { addToMailingList, sendEmail } from '@/lib/mailgun';
import { POST as subscribeHandler } from '@/app/api/subscribe/route';
import { POST as contactHandler } from '@/app/api/contact/route';

// Mock the Mailgun functions
jest.mock('@/lib/mailgun', () => ({
  addToMailingList: jest.fn(),
  sendEmail: jest.fn(),
}));

describe('API Routes', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('POST /api/subscribe', () => {
    it('should successfully subscribe an email', async () => {
      // Mock successful subscription
      (addToMailingList as jest.Mock).mockResolvedValue({ success: true });

      const request = new Request('http://localhost:3000/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });

      const response = await subscribeHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ message: 'Successfully subscribed to newsletter' });
      expect(addToMailingList).toHaveBeenCalledWith('test@example.com');
    });

    it('should handle subscription failure', async () => {
      // Mock failed subscription
      (addToMailingList as jest.Mock).mockResolvedValue({ 
        success: false, 
        error: 'Failed to subscribe' 
      });

      const request = new Request('http://localhost:3000/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });

      const response = await subscribeHandler(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ 
        error: 'Failed to subscribe' 
      });
    });

    it('should handle missing email', async () => {
      const request = new Request('http://localhost:3000/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await subscribeHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({ 
        error: 'Email is required' 
      });
      expect(addToMailingList).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/contact', () => {
    const validContactData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test Message',
    };

    it('should successfully send contact form email', async () => {
      // Mock successful email sending
      (sendEmail as jest.Mock).mockResolvedValue({ success: true });

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validContactData),
      });

      const response = await contactHandler(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ message: 'Message sent successfully' });
      expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({
        subject: 'Contact Form: Test Subject',
        text: expect.stringContaining('Test Message'),
        html: expect.stringContaining('Test Message'),
      }));
    });

    it('should handle email sending failure', async () => {
      // Mock failed email sending
      (sendEmail as jest.Mock).mockResolvedValue({ 
        success: false, 
        error: 'Failed to send email' 
      });

      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(validContactData),
      });

      const response = await contactHandler(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data).toEqual({ 
        error: 'Failed to send message. Please try again later.' 
      });
    });

    it('should handle missing required fields', async () => {
      const request = new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test User',
          // Missing email
          subject: 'Test Subject',
          message: 'Test Message',
        }),
      });

      const response = await contactHandler(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data).toEqual({ 
        error: 'All fields are required' 
      });
      expect(sendEmail).not.toHaveBeenCalled();
    });
  });
}); 