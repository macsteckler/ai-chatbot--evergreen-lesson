import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { ChatRequest } from '@/types/chat';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    // Read business data from file
    const businessDataPath = path.join(process.cwd(), 'business-data.txt');
    let businessData = '';
    
    try {
      businessData = fs.readFileSync(businessDataPath, 'utf-8');
    } catch (error) {
      console.error('Error reading business data:', error);
      return NextResponse.json(
        { error: 'Failed to load business information' },
        { status: 500 }
      );
    }

    // Construct system prompt with business data
    const systemPrompt = `You are a helpful customer service assistant for ABC Real Estate. You MUST always provide a response to every question.

Business Information:
${businessData}

IMPORTANT RULES:
1. ALWAYS respond - never send an empty or blank message
2. Be warm, welcoming, and conversational
3. Use ONLY the business information provided above to answer questions
4. If you don't have specific information to answer a question, respond with: "I don't have that specific information, but I'd be happy to help! Please contact our office at (425) 555-0123 or email info@abcrealestate.com and our team will assist you."
5. Keep responses helpful and concise
6. Be friendly and professional in every response

SCHEDULING APPOINTMENTS:
When a customer wants to schedule a meeting, property viewing, consultation, or appointment, you should:
1. Acknowledge their request warmly
2. Include the special marker: [CALENDLY:https://calendly.com/mac-andevergreen/30min]
3. Explain they can pick a time that works for them

Example response for scheduling:
"I'd be happy to help you schedule a meeting! You can choose a convenient time using our online calendar below:

[CALENDLY:https://calendly.com/mac-andevergreen/30min]

Simply pick a date and time that works best for you, and I'll make sure one of our agents is ready to meet with you."

IMPORTANT: Only include the [CALENDLY:...] marker when the customer explicitly wants to schedule, book, or set up a meeting/appointment/viewing. Do not include it for general questions.

Remember: Even if you're unsure, ALWAYS provide a helpful response that guides the customer to contact the office.`;

    // Prepare messages for OpenAI
    const openaiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    ];

    // Call OpenAI API with streaming
    const response = await openai.chat.completions.create({
      model: 'gpt-5-mini',
      messages: openaiMessages,
      max_completion_tokens: 1000,
      stream: true,
    });

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    let hasContent = false;
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              hasContent = true;
              controller.enqueue(encoder.encode(content));
            }
          }
          
          // If no content was received, send a fallback message
          if (!hasContent) {
            const fallbackMessage = "I apologize, but I'm having trouble processing your question. Please try rephrasing it, or contact our office directly at (425) 555-0123 or info@abcrealestate.com for immediate assistance.";
            controller.enqueue(encoder.encode(fallbackMessage));
          }
          
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          const errorMessage = "I'm sorry, I encountered an error. Please contact our office at (425) 555-0123 or info@abcrealestate.com for assistance.";
          controller.enqueue(encoder.encode(errorMessage));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
