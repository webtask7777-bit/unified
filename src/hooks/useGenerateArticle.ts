'use client';

import { useState, useCallback } from 'react';
import { STATIC_ARTICLES } from '@/lib/articles';

export function useGenerateArticle() {
  const [generated, setGenerated] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [streaming, setStreaming] = useState<Record<string, string>>({});

  const generate = useCallback(async (key: string, chipValue: string) => {
    if (generated[key] || loading[key]) return;

    setLoading(prev => ({ ...prev, [key]: true }));
    setStreaming(prev => ({ ...prev, [key]: '' }));

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'researchlab', input: chipValue }),
      });

      if (!res.ok) throw new Error('API failed');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No stream');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setStreaming(prev => ({ ...prev, [key]: accumulated }));
      }

      setGenerated(prev => ({ ...prev, [key]: accumulated }));
      setStreaming(prev => { const n = { ...prev }; delete n[key]; return n; });
    } catch {
      // On failure, fallback to static — no error shown, just use existing article
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  }, [generated, loading]);

  const getArticle = useCallback((key: string): string | undefined => {
    return generated[key] || STATIC_ARTICLES[key];
  }, [generated]);

  const isGenerating = useCallback((key: string): boolean => {
    return loading[key] || false;
  }, [loading]);

  const getStreaming = useCallback((key: string): string => {
    return streaming[key] || '';
  }, [streaming]);

  const isAIGenerated = useCallback((key: string): boolean => {
    return !!generated[key];
  }, [generated]);

  return { generate, getArticle, isGenerating, getStreaming, isAIGenerated };
}
