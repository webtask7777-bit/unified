import { getAnthropicClient, AI_MODEL, MAX_TOKENS } from '@/lib/ai/client';
import { getSystemPrompt } from '@/lib/ai/prompts';

export async function POST(req: Request) {
  try {
    const { tool, subType, input, sliders } = await req.json();

    if (!input || !tool) {
      return Response.json({ error: 'Input and tool are required' }, { status: 400 });
    }

    const systemPrompt = getSystemPrompt(tool, subType);

    let userMessage = input;
    if (tool === 'time' && sliders) {
      userMessage = `Energy levels — Subah (6-11am): ${sliders.morning}, Dopahar (11am-4pm): ${sliders.noon}, Shaam (4-10pm): ${sliders.evening}\n\nAaj ke tasks:\n${input}`;
    } else if (tool === 'health' && sliders) {
      userMessage = `Health data — Neend: ${sliders.sleep}, Exercise: ${sliders.exercise}, Mood: ${sliders.mood}, Paani: ${sliders.water}\nSymptoms/context: ${input || 'Koi extra symptoms nahi bataye'}`;
    }

    const client = getAnthropicClient();
    const tokens = tool === 'discovery' ? 2400 : tool === 'researchlab' ? 2000 : MAX_TOKENS;
    const stream = client.messages.stream({
      model: AI_MODEL,
      max_tokens: tokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
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
