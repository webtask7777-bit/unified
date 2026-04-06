import { getAnthropicClient, AI_MODEL } from '@/lib/ai/client';
import { getSystemPrompt } from '@/lib/ai/prompts';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'messages are required' }, { status: 400 });
    }

    const prompt = getSystemPrompt('discovery');
    const client = getAnthropicClient();

    const stream = client.messages.stream({
      model: AI_MODEL,
      max_tokens: 2400,
      system: prompt,
      messages,
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
