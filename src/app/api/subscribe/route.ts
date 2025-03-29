import { NextResponse } from 'next/server';
import { addToMailingList } from '@/lib/mailgun';

// Simple in-memory cache for recent subscriptions
const recentSubscriptions = new Map<string, number>();
const SUBSCRIPTION_COOLDOWN = 60 * 1000; // 1 minute cooldown

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if this email was recently subscribed
    const lastSubscriptionTime = recentSubscriptions.get(email);
    const now = Date.now();
    if (lastSubscriptionTime && (now - lastSubscriptionTime) < SUBSCRIPTION_COOLDOWN) {
      return NextResponse.json(
        { error: 'Please wait a moment before trying again' },
        { status: 429 }
      );
    }

    const result = await addToMailingList(email);
    if (result.success) {
      // Add to recent subscriptions cache
      recentSubscriptions.set(email, now);

      // Clean up old entries from the cache
      for (const [key, time] of recentSubscriptions.entries()) {
        if (now - time > SUBSCRIPTION_COOLDOWN) {
          recentSubscriptions.delete(key);
        }
      }
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Subscribe API Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Internal server error'
      },
      { status: error.status || 500 }
    );
  }
} 