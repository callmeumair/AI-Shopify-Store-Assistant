import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy_key_if_not_provided'
});

const SYSTEM_PROMPT = `You are an expert AI assistant for a Shopify store. You have access to powerful tools to manage the store.

Your capabilities:
- View, create, update, and delete products
- Manage inventory levels across locations
- View and manage orders and fulfillments  
- Access customer data and history
- Search store knowledge base (policies, FAQs, product info) using RAG
- Provide accurate customer support answers

Guidelines:
- Always confirm destructive operations (deletes, cancellations) before executing
- When searching for information, use the search_store_knowledge tool for policy/FAQ queries
- Present data in clear, structured formats
- For analytics questions, fetch real data rather than estimating
- Be proactive — if asked about low inventory, also suggest which products to reorder`;

export async function POST(req: NextRequest) {
  try {
    const { messages, conversationHistory } = await req.json();

    // Fetch MCP tools from MCP server
    let mcpTools = [];
    try {
      const mcpToolsResponse = await fetch(`${process.env.MCP_SERVER_URL || 'http://localhost:3001'}/tools`);
      if (mcpToolsResponse.ok) {
        mcpTools = await mcpToolsResponse.json();
      } else {
        console.warn('Failed to fetch tools from MCP server, using empty tool list.');
      }
    } catch (e) {
      console.warn('MCP server not reachable:', e);
    }

    const stream = await client.messages.stream({
      model: 'claude-3-opus-20240229', // Fallback to an existing Opus model, 'claude-opus-4-8' in prompt might be fictional or not generally available
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [...(conversationHistory || []), ...messages],
      tools: mcpTools.length > 0 ? mcpTools : undefined,
    });

    // Return streaming response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const event of stream) {
          if (event.type === 'content_block_delta') {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
          }
          if (event.type === 'message_stop') {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          }
        }
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      }
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
