'use client';

import { useState, useRef, useCallback } from 'react';
import { ChipPreset } from '@/lib/types';
import { useGenerateArticle } from '@/hooks/useGenerateArticle';
import { SeedhiBaat } from '@/components/tools/ArticleVisuals';
import { FormulaCard } from '@/components/tools/FormulaCards';
import { formatArticleHtml } from '@/lib/formatArticle';

export default function ToolArticles({ groupIdx, chips, color, title }: {
  groupIdx: number;
  chips: ChipPreset[];
  color: string;
  title: string;
}) {
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const { generate, getArticle, isGenerating, getStreaming, isAIGenerated } = useGenerateArticle();

  const showArticle = useCallback((key: string, chipValue: string) => {
    setVisible(prev => ({ ...prev, [key]: true }));
    generate(key, chipValue);
    setTimeout(() => {
      refs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }, [generate]);

  const showAll = useCallback(() => {
    const all: Record<string, boolean> = {};
    chips.forEach((chip, cIdx) => {
      const key = `${groupIdx}-${cIdx}`;
      all[key] = true;
      generate(key, chip.value);
    });
    setVisible(all);
  }, [chips, groupIdx, generate]);

  const visibleCount = Object.values(visible).filter(Boolean).length;

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="rounded-t-[14px] border border-bd p-3.5 flex items-center justify-between" style={{ background: 'var(--bg2)' }}>
        <div>
          <div className="text-sm font-medium">📜 Research Articles — {title}</div>
          <div className="text-[12px]" style={{ color: 'var(--t3)' }}>{visibleCount}/{chips.length} articles dekhe</div>
        </div>
        {visibleCount < chips.length && (
          <button
            onClick={showAll}
            className="text-[13px] py-1.5 px-3 rounded-[9px] border cursor-pointer transition-all hover:opacity-80"
            style={{ background: 'none', borderColor: 'var(--bd2)', color: 'var(--t2)', fontFamily: 'inherit' }}
          >
            Sab dikhaao ({chips.length})
          </button>
        )}
        {visibleCount === chips.length && (
          <span className="text-[12px]" style={{ color: 'var(--green)' }}>Sab ready!</span>
        )}
      </div>

      {/* Articles list */}
      <div className="border border-bd border-t-0 rounded-b-[14px] overflow-hidden" style={{ background: 'var(--bg2)' }}>
        {chips.map((chip, cIdx) => {
          const key = `${groupIdx}-${cIdx}`;
          const isVisible = visible[key];
          const article = getArticle(key);
          const generating = isGenerating(key);
          const streamText = getStreaming(key);
          const aiGenerated = isAIGenerated(key);

          return (
            <div
              key={cIdx}
              ref={(el) => { refs.current[key] = el; }}
              className="border-t border-bd"
            >
              {/* Question row */}
              <div className="p-3.5 flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm">{chip.icon}</span>
                    <span className="text-xs font-medium">{chip.label}</span>
                    {isVisible && aiGenerated && (
                      <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: 'var(--adim)', color: 'var(--amber)' }}>
                        AI Generated
                      </span>
                    )}
                    {isVisible && !aiGenerated && !generating && (
                      <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: 'var(--gdim)', color: 'var(--green)' }}>
                        Published
                      </span>
                    )}
                    {generating && (
                      <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: 'var(--adim)', color: 'var(--amber)' }}>
                        AI likh raha hai...
                      </span>
                    )}
                  </div>
                  <div className="text-[13px] leading-relaxed" style={{ color: 'var(--t3)' }}>
                    {chip.value.slice(0, 120)}...
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (isVisible) {
                      setVisible(prev => ({ ...prev, [key]: false }));
                    } else {
                      showArticle(key, chip.value);
                    }
                  }}
                  className="text-[13px] py-1.5 px-3 rounded-[9px] border cursor-pointer transition-all hover:opacity-80 shrink-0"
                  style={{
                    background: isVisible ? 'var(--bg3)' : 'none',
                    borderColor: 'var(--bd2)',
                    color: 'var(--t2)',
                    fontFamily: 'inherit',
                  }}
                >
                  {isVisible ? 'Band karo' : 'Article padho'}
                </button>
              </div>

              {/* Article content */}
              {isVisible && (
                <div className="mx-3.5 mb-3">
                  <SeedhiBaat articleKey={key} />
                  <FormulaCard articleKey={key} />
                  {generating && streamText ? (
                    <div
                      className="p-4 rounded-xl border border-bd text-sm leading-[2]"
                      style={{
                        background: 'var(--bg3)',
                        whiteSpace: 'pre-wrap',
                        borderLeft: `3px solid var(--amber)`,
                      }}
                      dangerouslySetInnerHTML={{ __html: formatArticleHtml(streamText) }}
                    />
                  ) : generating && !streamText ? (
                    <div className="p-4 rounded-xl border border-bd text-center" style={{ background: 'var(--bg3)' }}>
                      <div className="text-[13px]" style={{ color: 'var(--t3)' }}>
                        🤖 AI naya original article likh raha hai...
                      </div>
                    </div>
                  ) : article ? (
                    <div
                      className="p-4 rounded-xl border border-bd text-sm leading-[2]"
                      style={{
                        background: 'var(--bg3)',
                        whiteSpace: 'pre-wrap',
                        borderLeft: `3px solid ${aiGenerated ? 'var(--amber)' : color}`,
                      }}
                      dangerouslySetInnerHTML={{ __html: formatArticleHtml(article) }}
                    />
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
