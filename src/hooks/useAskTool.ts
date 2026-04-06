'use client';

import { useState, useCallback } from 'react';

export function useAskTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);

  const ask = useCallback(async (
    tool: string,
    subType: string | undefined,
    input: string,
    sliders?: Record<string, string>
  ) => {
    setIsLoading(true);
    setResponse('');
    setError(null);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, subType, input, sliders }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'API request failed');
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setResponse(accumulated);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, response, error, ask };
}
