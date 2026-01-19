import { NextRequest, NextResponse } from 'next/server';
import { processAnthropicChat } from '@/lib/anthropic-service';
import { EnhancedChatRequest, EnhancedChatResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: EnhancedChatRequest = await request.json();
    const { message, conversationHistory, cartContext } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check if Anthropic API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not configured');
      return NextResponse.json<EnhancedChatResponse>({
        message: "I'm temporarily unavailable. Please try again later or browse our catalog directly.",
      });
    }

    const response = await processAnthropicChat(
      message,
      conversationHistory || [],
      cartContext
    );

    return NextResponse.json<EnhancedChatResponse>(response);
  } catch (error) {
    console.error('Chat API error:', error);

    // Return a user-friendly error response
    return NextResponse.json<EnhancedChatResponse>({
      message: "I apologize, but something went wrong. Please try again or browse our catalog.",
    });
  }
}
