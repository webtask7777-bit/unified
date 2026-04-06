import { getAnthropicClient, AI_MODEL, MAX_TOKENS } from '@/lib/ai/client';
import { getCollabPrompt } from '@/lib/ai/collabPrompts';
import { CollabId } from '@/lib/collabData';
import { hasApiKey, streamFallback, getCollabFallback } from '@/lib/ai/fallback';

export async function POST(req: Request) {
  try {
    const { collabId, messages } = await req.json();

    if (!collabId || !messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'collabId and messages are required' }, { status: 400 });
    }

    if (!hasApiKey()) {
      return streamFallback(getCollabFallback());
    }

    const prompt = getCollabPrompt(collabId as CollabId);
    const client = getAnthropicClient();

    const stream = client.messages.stream({
      model: AI_MODEL,
      max_tokens: MAX_TOKENS,
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
