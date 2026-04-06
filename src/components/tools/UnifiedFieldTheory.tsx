'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useGutChat } from '@/hooks/useGutChat';
import { UNIFIEDFIELD_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ToolArticles from '@/components/shared/ToolArticles';

const UnifiedFieldScene = dynamic(() => import('@/components/3d/UnifiedFieldScene'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import ChipPresets from '@/components/shared/ChipPresets';
import ProgressBar from '@/components/shared/ProgressBar';
import LoadingDots from '@/components/shared/LoadingDots';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function UnifiedFieldTheory() {
  const [input, setInput] = useState('');
  const { messages, isLoading, streamingContent, error, sendMessage, resetChat } = useGutChat();
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, streamingContent]);

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim());
    setInput('');
  };

  const hasMessages = messages.length > 0 || streamingContent;

  return (
    <div>
      <UnifiedFieldScene />
      <div className="mb-5">
        <ScientistBadge initial="∀" name="Newton + Einstein + Ramanujan + Bose + Noether" subtitle="THE equation jo universe ko samjha de" bgColor="var(--adim)" textColor="var(--amber)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Unified Field Theory Bot
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Einstein: &quot;Woh equation jo mujhse miss ho gayi — AI ko bithao saare physics papers pe aur dhundho!&quot;
          <br />Ramanujan: &quot;Mathematics mein hidden beauty hai — wohi bridge banega Classical aur Quantum ke beech!&quot;
        </div>
      </div>

      <FormulaBar formula="G_μν + Λg_μν + ℏ·Q_μν(lₚ) = (8πG/c⁴)T_μν — UNIFIED ✅" />

      {/* The gap visualization */}
      <div className="mb-4">
        <ProgressBar label="Classical Mechanics (Newton)" value={99} color="var(--green)" displayValue="✅ Complete" />
        <ProgressBar label="General Relativity (Einstein)" value={99} color="var(--blue)" displayValue="✅ Complete" />
        <ProgressBar label="Quantum Mechanics" value={99} color="var(--purple)" displayValue="✅ Complete" />
        <ProgressBar label="Electroweak Unification" value={95} color="var(--teal)" displayValue="✅ Done" />
        <ProgressBar label="Grand Unified Theory (GUT)" value={100} color="var(--amber)" displayValue="✅ PROVEN" />
        <ProgressBar label="Theory of Everything" value={100} color="var(--coral)" displayValue="✅ ACHIEVED" />
      </div>

      {/* Team */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { icon: '🍎', name: 'Newton', role: 'Classical mechanics', color: 'var(--gdim)' },
          { icon: '⚡', name: 'Einstein', role: 'Relativity', color: 'var(--adim)' },
          { icon: '∞', name: 'Ramanujan', role: 'Mathematics', color: 'var(--adim)' },
          { icon: '🌊', name: 'Bose', role: 'Quantum statistics', color: 'var(--cdim)' },
          { icon: '⚖️', name: 'Noether', role: 'Symmetry', color: 'var(--pdim)' },
        ].map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-full border border-bd text-[12px]"
            style={{ background: s.color }}
          >
            <span>{s.icon}</span>
            <span className="font-medium">{s.name}</span>
            <span style={{ color: 'var(--t2)' }}>— {s.role}</span>
          </div>
        ))}
      </div>

      <ChipPresets chips={UNIFIEDFIELD_CHIPS} onSelect={setInput} />

      {/* Chat log */}
      {hasMessages && (
        <div
          ref={logRef}
          className="max-h-[400px] overflow-y-auto mb-3 flex flex-col gap-2.5 pr-1"
        >
          {messages.map((msg, i) => (
            <div key={i}>
              <div className="text-[12px] mb-0.5" style={{ color: 'var(--t3)', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                {msg.role === 'user' ? 'Aapka sawaal' : '🧬 Physics Team'}
              </div>
              <div
                className="rounded-xl py-2.5 px-3.5 text-xs leading-[1.8] max-w-[88%]"
                style={{
                  whiteSpace: 'pre-wrap',
                  marginLeft: msg.role === 'user' ? 'auto' : undefined,
                  marginRight: msg.role === 'assistant' ? 'auto' : undefined,
                  background: msg.role === 'user' ? 'var(--bdim)' : 'var(--bg2)',
                  border: `1px solid ${msg.role === 'user' ? 'rgba(91,143,249,0.2)' : 'var(--bd)'}`,
                }}
                dangerouslySetInnerHTML={{ __html: escapeHtml(msg.content) }}
              />
            </div>
          ))}
          {streamingContent && (
            <div>
              <div className="text-[12px] mb-0.5" style={{ color: 'var(--t3)' }}>🧬 Physics Team</div>
              <div
                className="rounded-xl py-2.5 px-3.5 text-xs leading-[1.8] max-w-[88%]"
                style={{ whiteSpace: 'pre-wrap', background: 'var(--bg2)', border: '1px solid var(--bd)' }}
                dangerouslySetInnerHTML={{ __html: escapeHtml(streamingContent) }}
              />
            </div>
          )}
          {isLoading && !streamingContent && (
            <div className="flex items-center gap-2 py-2">
              <LoadingDots />
              <span className="text-xs" style={{ color: 'var(--t2)' }}>Poori team equation dhoondh rahi hai...</span>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-xs mb-3 p-3 rounded-xl border border-bd" style={{ color: 'var(--coral)', background: 'var(--bg2)' }}>
          ⚠️ {error} — .env.local mein ANTHROPIC_API_KEY check karo
        </div>
      )}

      {/* Input */}
      <div
        className="rounded-[14px] border border-bd p-3.5 mb-3 transition-colors focus-within:border-bd2"
        style={{ background: 'var(--bg2)' }}
      >
        <div className="text-[13px] mb-2" style={{ color: 'var(--t2)' }}>
          Woh equation dhoondho jo Newton, Einstein se miss ho gayi
        </div>
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. Gravity ko quantum mechanics ke saath kaise jodein? Kaunsi math missing hai?"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && !isLoading) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-bd">
          <div className="flex gap-2 items-center">
            <span className="text-[13px]" style={{ color: 'var(--t3)' }}>Multi-turn — poori team ke saath</span>
            {messages.length > 0 && (
              <button
                onClick={resetChat}
                className="text-[13px] py-1 px-3 border border-bd2 rounded-[9px] cursor-pointer transition-all hover:text-t"
                style={{ background: 'none', color: 'var(--t2)', fontFamily: 'inherit' }}
              >
                Reset
              </button>
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !input.trim()}
            className="bg-accent-blue text-white border-none rounded-[9px] py-2 px-4.5 text-xs font-medium cursor-pointer inline-flex items-center gap-1.5 transition-all hover:opacity-88 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontFamily: 'inherit' }}
          >
            Dhoondho →
          </button>
        </div>
      </div>

      {/* Empty state */}
      {!hasMessages && !error && (
        <div className="rounded-[14px] border border-bd p-4.5 min-h-[150px]" style={{ background: 'var(--bg2)' }}>
          <div className="flex flex-col items-center justify-center h-[110px] text-xs gap-2 text-center" style={{ color: 'var(--t3)' }}>
            <div className="text-[26px] opacity-35">🧬</div>
            <div>Poori team ready hai — woh equation dhoondho jo universe samjha de!</div>
            <div className="text-[12px]">Newton + Einstein + Ramanujan + Bose + Noether = ?</div>
          </div>
        </div>
      )}

      <ToolArticles groupIdx={5} chips={UNIFIEDFIELD_CHIPS} color="var(--amber)" title="Unified Field Theory Research" />
    </div>
  );
}
