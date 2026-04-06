'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useDiscoveryChat } from '@/hooks/useDiscoveryChat';
import { useVoice, VoiceControls, SpeakButton } from '@/hooks/useVoice';
import { DISCOVERY_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import { formatArticleHtml } from '@/lib/formatArticle';

const DiscoveryEngineScene = dynamic(() => import('@/components/3d/DiscoveryEngineScene'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import ChipPresets from '@/components/shared/ChipPresets';

const DOMAINS = [
  { icon: '🍎', name: 'Newton', field: 'Gravity & Mechanics', color: 'var(--green)' },
  { icon: '⚡', name: 'Einstein', field: 'Spacetime & GR', color: 'var(--amber)' },
  { icon: '∞', name: 'Ramanujan', field: 'Number Theory', color: 'var(--purple)' },
  { icon: '🌊', name: 'Bose', field: 'Quantum Statistics', color: 'var(--teal)' },
  { icon: '⚖️', name: 'Noether', field: 'Symmetry & Conservation', color: 'var(--coral)' },
];

export default function DiscoveryEngine() {
  const [input, setInput] = useState('');
  const { messages, isLoading, streamingContent, error, sendMessage, resetChat } = useDiscoveryChat();
  const voice = useVoice('discovery');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  // Auto-speak new responses
  const lastMsgCount = useRef(0);
  useEffect(() => {
    if (messages.length > lastMsgCount.current && messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.role === 'assistant' && voice.voiceOn) {
        voice.speak(last.content);
      }
    }
    lastMsgCount.current = messages.length;
  }, [messages]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = useCallback(() => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  }, [input, isLoading, sendMessage]);

  const handleChipSelect = (value: string) => {
    if (isLoading) return;
    sendMessage(value);
  };

  return (
    <div>
      <DiscoveryEngineScene />
      <div className="mb-5">
        <ScientistBadge initial="D" name="Discovery Engine" subtitle="5 Scientists × AI = Original Research" bgColor="var(--adim)" textColor="var(--amber)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Original Discovery Engine
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Yeh educational chatbot NAHI hai — yeh genuine research engine hai. 5 scientists milke cross-domain synthesis karte hain — novel hypotheses, specific predictions, testable frameworks. Internet pe nahi milega.
        </div>
      </div>

      <FormulaBar formula="F_gravity × G_μν × ζ(s) × |Ψ⟩⟨Ψ| × δL/δφ = 0  →  NOVEL DISCOVERY" />

      {/* Active Research Domains */}
      <div className="rounded-[14px] border border-bd p-4 mb-3" style={{ background: 'var(--bg2)' }}>
        <div className="text-[11px] mb-2 uppercase tracking-wider font-medium" style={{ color: 'var(--t3)' }}>
          Contributing Domains — Cross-Domain Synthesis Active
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {DOMAINS.map(d => (
            <div key={d.name} className="border border-bd rounded-xl px-3 py-2 text-center flex-shrink-0" style={{ background: 'var(--bg3)', minWidth: 100 }}>
              <div style={{ fontSize: 18 }}>{d.icon}</div>
              <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 12, color: d.color }}>{d.name}</div>
              <div className="text-[10px]" style={{ color: 'var(--t3)' }}>{d.field}</div>
            </div>
          ))}
        </div>
        <div className="text-[12px] mt-3 text-center" style={{ color: 'var(--t3)' }}>
          5 domains ka intersection = genuinely unexplored territory — yahi original research hai
        </div>
      </div>

      {messages.length === 0 && (
        <ChipPresets chips={DISCOVERY_CHIPS} onSelect={handleChipSelect} />
      )}

      {/* Chat Area */}
      <div className="rounded-[14px] border border-bd overflow-hidden mb-3" style={{ background: 'var(--bg2)' }}>
        {/* Header */}
        <div className="p-3 border-b border-bd flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">🔬</span>
            <span className="text-xs font-medium">Discovery Research Chat</span>
            <span className="text-[11px]" style={{ color: 'var(--t3)' }}>
              {messages.length === 0 ? 'Naya session' : `${Math.ceil(messages.length / 2)} discoveries`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <VoiceControls
              voiceOn={voice.voiceOn} isSpeaking={voice.isSpeaking} isPaused={voice.isPaused}
              speed={voice.speed} onToggle={voice.toggleVoice} onStop={voice.stop}
              onPause={voice.pause} onResume={voice.resume} onCycleSpeed={voice.cycleSpeed}
              color="var(--amber)" compact
            />
            {messages.length > 0 && (
              <button
                onClick={() => { voice.stop(); resetChat(); }}
                className="text-[12px] py-1 px-2.5 rounded-lg border cursor-pointer transition-all hover:opacity-80"
                style={{ background: 'none', borderColor: 'var(--bd2)', color: 'var(--t3)', fontFamily: 'inherit' }}
              >
                Naya Research
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="p-3 max-h-[600px] overflow-y-auto" style={{ minHeight: messages.length === 0 ? 80 : 200 }}>
          {messages.length === 0 && !isLoading && (
            <div className="text-center py-6" style={{ color: 'var(--t3)' }}>
              <div className="text-2xl mb-2">🔬</div>
              <div className="text-[13px]">5 scientists research question ka intezaar kar rahe hain... cross-domain problem do!</div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`mb-3 ${msg.role === 'user' ? 'flex justify-end' : ''}`}>
              {msg.role === 'user' ? (
                <div
                  className="rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed max-w-[85%]"
                  style={{ background: 'var(--adim)', color: 'var(--t1)' }}
                >
                  {msg.content}
                </div>
              ) : (
                <div className="rounded-xl border border-bd p-3.5" style={{ background: 'var(--bg3)', borderLeft: '3px solid var(--amber)' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-sm">🔬</span>
                    <span className="text-[11px] font-medium flex-1" style={{ color: 'var(--amber)' }}>Discovery Note #{Math.ceil((i + 1) / 2)}</span>
                    <SpeakButton text={msg.content} voiceId="discovery" color="var(--amber)" size={13} />
                  </div>
                  <div
                    className="text-[13px] leading-[1.9]"
                    style={{ color: 'var(--t1)' }}
                    dangerouslySetInnerHTML={{ __html: formatArticleHtml(msg.content) }}
                  />
                </div>
              )}
            </div>
          ))}

          {streamingContent && (
            <div className="mb-3 rounded-xl border border-bd p-3.5" style={{ background: 'var(--bg3)', borderLeft: '3px solid var(--amber)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-sm">🔬</span>
                <span className="text-[11px] font-medium" style={{ color: 'var(--amber)' }}>Discovering...</span>
              </div>
              <div
                className="text-[13px] leading-[1.9]"
                style={{ color: 'var(--t1)' }}
                dangerouslySetInnerHTML={{ __html: formatArticleHtml(streamingContent) }}
              />
            </div>
          )}

          {isLoading && !streamingContent && (
            <div className="text-center py-4">
              <div className="text-[13px]" style={{ color: 'var(--t3)' }}>🔬 5 scientists mil ke soch rahe hain...</div>
            </div>
          )}

          {error && (
            <div className="text-center py-3 text-[13px]" style={{ color: 'var(--coral)' }}>
              Error: {error}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-bd">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit(); }}
              placeholder={messages.length === 0
                ? 'Cross-domain research question likho...'
                : 'Follow-up: hypothesis expand karo, prediction refine karo...'}
              disabled={isLoading}
              rows={2}
              className="flex-1 rounded-xl border border-bd p-2.5 text-[13px] resize-none"
              style={{ background: 'var(--bg3)', color: 'var(--t1)', fontFamily: 'inherit', outline: 'none' }}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="self-end rounded-xl px-4 py-2.5 text-[13px] font-medium cursor-pointer transition-all hover:opacity-90 disabled:opacity-40"
              style={{ background: 'var(--amber)', color: '#000', fontFamily: 'inherit', border: 'none' }}
            >
              {isLoading ? '...' : 'Discover →'}
            </button>
          </div>
          <div className="text-[11px] mt-1.5" style={{ color: 'var(--t3)' }}>
            Ctrl+Enter se bhejo · Har response genuinely naya — multi-turn research conversation
          </div>
        </div>
      </div>

      {/* Chip presets for follow-ups */}
      {messages.length > 0 && !isLoading && (
        <ChipPresets chips={DISCOVERY_CHIPS} onSelect={handleChipSelect} />
      )}

      {/* Original Research Notice */}
      <div className="rounded-[14px] border p-4 mt-3 text-center" style={{ background: 'var(--bg2)', borderColor: 'var(--amber)', borderStyle: 'dashed' }}>
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 15, color: 'var(--amber)', marginBottom: 4 }}>
          Original Research — Pre-written Articles Nahi
        </div>
        <div className="text-[12px]" style={{ color: 'var(--t3)' }}>
          Har response genuinely NAYA hai — cross-domain synthesis se novel hypotheses aur testable predictions. Copy-paste nahi, original discovery notes.
        </div>
      </div>
    </div>
  );
}
