import { NextRequest, NextResponse } from 'next/server';
// Local type definitions to replace the unresolved '@/types' import
type NewsletterRequest = {
  email: string;
  source?: string | null;
};

type NewsletterResponse = {
  success: boolean;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterRequest = await request.json();
    const { email, source } = body;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }
    
    // In a real app, you would integrate with your newsletter service here
    // For demo purposes, we'll simulate success
    console.log(`Newsletter signup: ${email} from ${source}`);
    
    // You could integrate with services like:
    // - Mailchimp
    // - ConvertKit  
    // - Supabase
    // - SendGrid
    
    const response: NewsletterResponse = {
      success: true,
      message: 'Successfully subscribed to newsletter!'
    };
    
    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error processing newsletter signup:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
