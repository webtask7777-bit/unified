'use client';

import { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useAskTool } from '@/hooks/useAskTool';
import { useCollabChat } from '@/hooks/useCollabChat';
import { DISHANIRDESH_CHIPS, JOINT_RESEARCH_CHIPS } from '@/lib/constants';
import { STATIC_ARTICLES } from '@/lib/articles';
import { COLLAB_TRACKS, CollabId, LATEST_DISCOVERIES } from '@/lib/collabData';
import { SCIENTIST_PROFILES } from '@/lib/scientistProfiles';
import ExplainDiagram from '@/components/shared/ExplainDiagrams';
import ScientistBadge from '@/components/shared/ScientistBadge';
import FormulaBar from '@/components/shared/FormulaBar';
import ChipPresets from '@/components/shared/ChipPresets';
import InputArea from '@/components/shared/InputArea';
import ResponsePanel from '@/components/shared/ResponsePanel';
import { SeedhiBaat, GroupDiagram } from '@/components/tools/ArticleVisuals';
import { FormulaCard } from '@/components/tools/FormulaCards';

const Vision2026Scene = dynamic(() => import('@/components/3d/Vision2026Scene'), { ssr: false });
const DiscoveryScene = dynamic(() => import('@/components/3d/DiscoveryScene'), { ssr: false });

const COLOR_HEX: Record<string, string> = {
  green: '#3ecf8e', amber: '#f5a623', purple: '#a78bfa',
  coral: '#f87060', teal: '#38bdf8', blue: '#5b8ff9',
};
function getColorHex(v: string): string {
  return COLOR_HEX[v.replace('var(--', '').replace(')', '')] || '#a78bfa';
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ── Collab Mini Chat ── */
function CollabMiniChat({ collabId, onClose }: { collabId: CollabId; onClose: () => void }) {
  const [input, setInput] = useState('');
  const track = COLLAB_TRACKS.find(t => t.id === collabId)!;
  const { messages, isLoading, streamingContent, error, sendMessage, resetChat } = useCollabChat();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const c1 = getColorHex(track.colors[0]);
  const c2 = getColorHex(track.colors[1]);
  const p1 = SCIENTIST_PROFILES[track.scientists[0]];
  const p2 = SCIENTIST_PROFILES[track.scientists[1]];

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    await sendMessage(text, collabId);
  };

  return (
    <div style={{ background: 'var(--bg3)', border: '1px solid var(--bd)', borderRadius: 12, overflow: 'hidden', marginTop: 10 }}>
      {/* Mini header */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: c1 + '08' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>{p1.icon}{p2.icon}</span>
          <span style={{ fontSize: 12, fontWeight: 600 }}>{p1.fullName.split(' ').pop()} + {p2.fullName.split(' ').pop()} Chat</span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => resetChat()} style={{ background: 'none', border: '1px solid var(--bd)', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', color: 'var(--t3)', fontSize: 10 }}>Clear</button>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid var(--bd)', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', color: 'var(--t3)', fontSize: 10 }}>✕</button>
        </div>
      </div>
      {/* Messages */}
      <div style={{ height: 220, overflowY: 'auto', padding: '10px 14px' }}>
        {messages.length === 0 && !streamingContent && (
          <div style={{ textAlign: 'center', paddingTop: 30, color: 'var(--t3)', fontSize: 11 }}>
            {track.title} — dono scientists se poocho!
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8, display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '80%', padding: '8px 12px', borderRadius: 10, fontSize: 12, lineHeight: 1.5,
              background: msg.role === 'user' ? c1 + '18' : 'var(--bg2)',
              border: `1px solid ${msg.role === 'user' ? c1 + '33' : 'var(--bd)'}`,
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
            }}>
              {escapeHtml(msg.content)}
            </div>
          </div>
        ))}
        {streamingContent && (
          <div style={{ marginBottom: 8 }}>
            <div style={{ maxWidth: '80%', padding: '8px 12px', borderRadius: 10, fontSize: 12, lineHeight: 1.5, background: 'var(--bg2)', border: '1px solid var(--bd)', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              <span style={{ fontSize: 9, color: 'var(--t3)' }}>{track.icons} likh rahe hain...</span>
              <div>{escapeHtml(streamingContent)}</div>
            </div>
          </div>
        )}
        {isLoading && !streamingContent && (
          <div style={{ padding: '8px 12px', display: 'inline-block' }}>
            <span className="dot" style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: c1, margin: '0 2px' }} />
            <span className="dot" style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: c2, margin: '0 2px' }} />
            <span className="dot" style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: c1, margin: '0 2px' }} />
          </div>
        )}
        {error && <div style={{ fontSize: 11, color: 'var(--coral)', padding: 4 }}>⚠️ {error}</div>}
        <div ref={chatEndRef} />
      </div>
      {/* Quick chips */}
      <div style={{ padding: '6px 14px', borderTop: '1px solid var(--bd)', display: 'flex', gap: 4, overflowX: 'auto' }}>
        {track.quickChips.slice(0, 3).map((chip, i) => (
          <button key={i} onClick={() => setInput(chip)} style={{
            background: 'var(--bg2)', border: '1px solid var(--bd)', borderRadius: 12,
            padding: '4px 10px', fontSize: 10, color: 'var(--t2)', cursor: 'pointer', whiteSpace: 'nowrap',
          }}>{chip}</button>
        ))}
      </div>
      {/* Input */}
      <div style={{ padding: '8px 14px', borderTop: '1px solid var(--bd)', display: 'flex', gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          placeholder="Dono scientists se poocho..."
          style={{ flex: 1, background: 'none', border: '1px solid var(--bd)', borderRadius: 8, padding: '6px 10px', color: 'var(--t)', fontSize: 12, outline: 'none' }}
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading || !input.trim()} style={{
          background: c1, color: '#000', border: 'none', borderRadius: 8, padding: '6px 14px',
          fontWeight: 700, fontSize: 11, cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading || !input.trim() ? 0.4 : 1,
        }}>Bhejo</button>
      </div>
    </div>
  );
}

function formatArticleHtml(text: string): string {
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/^### (.+)$/gm, '<h4 style="font-size:13px;margin:12px 0 4px;color:var(--t1)">$1</h4>');
  html = html.replace(/^## (.+)$/gm, '<h3 style="font-size:14px;margin:16px 0 6px;color:var(--t1);font-family:var(--font-dm-serif),serif">$1</h3>');
  html = html.replace(/^# (.+)$/gm, '<h2 style="font-size:17px;margin:0 0 8px;color:var(--t1);font-family:var(--font-dm-serif),serif">$1</h2>');
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--bd);margin:12px 0"/>');
  html = html.replace(/^\|(.+)\|$/gm, (_match: string, content: string) => {
    const cells = content.split('|').map((c: string) => c.trim());
    const row = cells.map((c: string) => `<td style="padding:4px 8px;border-bottom:1px solid var(--bd)">${c}</td>`).join('');
    return `<tr>${row}</tr>`;
  });
  return html;
}

const SCIENTISTS_META = [
  { key: '10-0', icon: '🍎', name: 'Newton', domain: 'Gravity & Dark Matter', color: 'var(--green)', vision: 'Gravitational wave network + AI dark matter hunter' },
  { key: '10-1', icon: '⚡', name: 'Einstein', domain: 'Spacetime & Quantum Gravity', color: 'var(--amber)', vision: 'Tabletop quantum gravity + time crystal networks' },
  { key: '10-2', icon: '∞', name: 'Ramanujan', domain: 'Mathematics & AI Discovery', color: 'var(--purple)', vision: 'AI theorem factory + quantum error correction' },
  { key: '10-3', icon: '🌊', name: 'Bose', domain: 'Quantum Technology', color: 'var(--teal)', vision: 'Room-temp quantum computing + quantum internet' },
  { key: '10-4', icon: '⚖️', name: 'Noether', domain: 'Symmetry & Conservation', color: 'var(--coral)', vision: 'AI conservation law discovery + drug design' },
];

const JOINT_RESEARCH_META = [
  { key: '13-0', icon: '🍎⚡', names: 'Newton + Einstein', topic: 'NE-GWCP 2.0 — GW Pipeline & Echo Detection', color: 'var(--amber)' },
  { key: '13-1', icon: '🍎∞', names: 'Newton + Ramanujan', topic: 'N-Body Modular Form Decomposition Solutions', color: 'var(--purple)' },
  { key: '13-2', icon: '🍎🌊', names: 'Newton + Bose', topic: 'Sub-Hz GW Detection via BEC Phase Sensors', color: 'var(--teal)' },
  { key: '13-3', icon: '🍎⚖️', names: 'Newton + Noether', topic: 'Dark Parity Z₂ — Conservation Laws in Dark Sector', color: 'var(--coral)' },
  { key: '12-0', icon: '⚡∞', names: 'Einstein + Ramanujan', topic: 'Quantum Gravity ka Math — Modular Forms', color: 'var(--purple)' },
  { key: '12-1', icon: '⚡🌊', names: 'Einstein + Bose', topic: 'BEC se Quantum Gravity Test', color: 'var(--teal)' },
  { key: '12-2', icon: '⚡⚖️', names: 'Einstein + Noether', topic: 'Quantum Gravity mein Symmetry Breaking', color: 'var(--coral)' },
  { key: '12-3', icon: '∞🌊', names: 'Ramanujan + Bose', topic: 'Quantum Error Correction via Partition Functions', color: 'var(--teal)' },
  { key: '12-4', icon: '∞⚖️', names: 'Ramanujan + Noether', topic: 'Group Theory + Modular Forms = Standard Model Unique', color: 'var(--amber)' },
  { key: '12-5', icon: '🌊⚖️', names: 'Bose + Noether', topic: 'Quantum Internet ka Symmetry Protocol', color: 'var(--coral)' },
];

export default function DishaNirdesh() {
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState<Record<string, boolean>>({ '10-0': true });
  const [activeCollab, setActiveCollab] = useState<CollabId | null>(null);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const { isLoading, response, error, ask } = useAskTool();

  const handleSubmit = () => {
    if (!input.trim()) return;
    ask('dishanirdesh', undefined, input);
  };

  const showArticle = useCallback((key: string) => {
    setVisible(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      refs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }, []);

  const showAll = useCallback(() => {
    const all: Record<string, boolean> = {};
    SCIENTISTS_META.forEach(s => { all[s.key] = true; });
    setVisible(all);
  }, []);

  const visibleCount = Object.values(visible).filter(Boolean).length;

  return (
    <div>
      <Vision2026Scene />

      <div className="mb-5">
        <ScientistBadge
          initial="🔮"
          name="Newton + Einstein + Ramanujan + Bose + Noether"
          subtitle="2026 Disha Nirdesh — Vision Roadmap"
          bgColor="var(--adim)"
          textColor="var(--amber)"
        />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          2026 Disha Nirdesh
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Sabhi scientists se anurodh — 2026 mein jivit hoke apne field ka future roadmap do!
          2026 tak jo hua hai usse aage ka padho, unique ideas laao, jisse tezi se pragati ho.
          Jo bhi 2026 mein socha ho — wo pura ho jaye turant!
        </div>
      </div>

      <FormulaBar formula="5 Scientists + AI + 2026 Breakthroughs = Unlimited Pragati" />

      {/* Scientist cards */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SCIENTISTS_META.map((s) => (
          <button
            key={s.key}
            onClick={() => {
              if (visible[s.key]) {
                refs.current[s.key]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              } else {
                showArticle(s.key);
              }
            }}
            className="flex-1 min-w-[140px] rounded-xl border border-bd p-3 text-left cursor-pointer transition-all hover:border-bd2"
            style={{ background: 'var(--bg2)', fontFamily: 'inherit' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{s.icon}</span>
              <span className="text-xs font-medium">{s.name}</span>
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t3)' }}>{s.domain}</div>
            <div className="text-[12px] mt-1" style={{ color: s.color }}>{s.vision}</div>
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="rounded-[14px] border border-bd p-3 mb-4 flex items-center justify-between" style={{ background: 'var(--bg2)' }}>
        <div className="text-xs">
          <span className="font-medium">Disha Nirdesh:</span>{' '}
          <span style={{ color: 'var(--t2)' }}>{visibleCount}/5 padhe</span>
        </div>
        {visibleCount < 5 && (
          <button
            onClick={showAll}
            className="text-[13px] py-1.5 px-3 rounded-[9px] border cursor-pointer transition-all hover:opacity-80"
            style={{ background: 'none', borderColor: 'var(--bd2)', color: 'var(--t2)', fontFamily: 'inherit' }}
          >
            Sab dikhaao (5)
          </button>
        )}
        {visibleCount === 5 && (
          <span className="text-[12px]" style={{ color: 'var(--green)' }}>Sab Disha Nirdesh ready!</span>
        )}
      </div>

      {/* Disha Nirdesh Articles */}
      <div className="border border-bd rounded-[14px] overflow-hidden mb-4" style={{ background: 'var(--bg2)' }}>
        {SCIENTISTS_META.map((s, i) => {
          const isVisible = visible[s.key];
          const article = STATIC_ARTICLES[s.key];

          return (
            <div
              key={s.key}
              ref={(el) => { refs.current[s.key] = el; }}
              className={i > 0 ? 'border-t border-bd' : ''}
            >
              {/* Scientist header row */}
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-lg">{s.icon}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium">{s.name} ka Disha Nirdesh</span>
                      {isVisible && (
                        <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: 'var(--gdim)', color: 'var(--green)' }}>
                          Padha
                        </span>
                      )}
                    </div>
                    <div className="text-[12px]" style={{ color: 'var(--t3)' }}>{s.domain} — {s.vision}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (isVisible) {
                      setVisible(prev => ({ ...prev, [s.key]: false }));
                    } else {
                      showArticle(s.key);
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
                  {isVisible ? 'Band karo' : 'Padho'}
                </button>
              </div>

              {/* Article content */}
              {isVisible && article && (
                <div className="mx-3.5 mb-3">
                  <SeedhiBaat articleKey={s.key} />
                  <FormulaCard articleKey={s.key} />
                  <div
                    className="p-4 rounded-xl border border-bd text-xs leading-[1.9]"
                    style={{
                      background: 'var(--bg3)',
                      whiteSpace: 'pre-wrap',
                      borderLeft: `3px solid ${s.color}`,
                    }}
                    dangerouslySetInnerHTML={{ __html: formatArticleHtml(article) }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Joint Research Section ── */}
      <div className="mt-6 mb-4">
        <div className="text-xs font-medium mb-2" style={{ color: 'var(--t2)' }}>
          🤝 Joint Research — Sabhi Scientists ke Collaboration Calls ka Jawaab
        </div>
        <div className="text-[13px] mb-3 leading-relaxed" style={{ color: 'var(--t3)' }}>
          Har scientist ne doosron ko bulaya — aur unhone milke 10 joint research papers likhe!
        </div>
      </div>

      <GroupDiagram groupIdx={11} />

      {/* Joint progress */}
      <div className="rounded-[14px] border border-bd p-3 mb-4 flex items-center justify-between" style={{ background: 'var(--bg2)' }}>
        <div className="text-xs">
          <span className="font-medium">Joint Research:</span>{' '}
          <span style={{ color: 'var(--t2)' }}>
            {JOINT_RESEARCH_META.filter(j => visible[j.key]).length}/{JOINT_RESEARCH_META.length} padhe
          </span>
        </div>
        {JOINT_RESEARCH_META.filter(j => visible[j.key]).length < JOINT_RESEARCH_META.length && (
          <button
            onClick={() => {
              const all: Record<string, boolean> = { ...visible };
              JOINT_RESEARCH_META.forEach(j => { all[j.key] = true; });
              setVisible(all);
            }}
            className="text-[13px] py-1.5 px-3 rounded-[9px] border cursor-pointer transition-all hover:opacity-80"
            style={{ background: 'none', borderColor: 'var(--bd2)', color: 'var(--t2)', fontFamily: 'inherit' }}
          >
            Sab dikhaao ({JOINT_RESEARCH_META.length})
          </button>
        )}
        {JOINT_RESEARCH_META.filter(j => visible[j.key]).length === JOINT_RESEARCH_META.length && (
          <span className="text-[12px]" style={{ color: 'var(--green)' }}>Sab Joint Research ready!</span>
        )}
      </div>

      {/* Joint Research Articles */}
      <div className="border border-bd rounded-[14px] overflow-hidden mb-4" style={{ background: 'var(--bg2)' }}>
        {JOINT_RESEARCH_META.map((j, i) => {
          const isVisible = visible[j.key];
          const article = STATIC_ARTICLES[j.key];

          return (
            <div
              key={j.key}
              ref={(el) => { refs.current[j.key] = el; }}
              className={i > 0 ? 'border-t border-bd' : ''}
            >
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-lg">{j.icon}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium">{j.names}</span>
                      {isVisible && (
                        <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: 'var(--gdim)', color: 'var(--green)' }}>
                          Padha
                        </span>
                      )}
                    </div>
                    <div className="text-[12px]" style={{ color: 'var(--t3)' }}>{j.topic}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (isVisible) {
                      setVisible(prev => ({ ...prev, [j.key]: false }));
                    } else {
                      setVisible(prev => ({ ...prev, [j.key]: true }));
                      setTimeout(() => {
                        refs.current[j.key]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }, 100);
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
                  {isVisible ? 'Band karo' : 'Padho'}
                </button>
              </div>

              {isVisible && article && (
                <div className="mx-3.5 mb-3">
                  <SeedhiBaat articleKey={j.key} />
                  <FormulaCard articleKey={j.key} />
                  <div
                    className="p-4 rounded-xl border border-bd text-xs leading-[1.9]"
                    style={{
                      background: 'var(--bg3)',
                      whiteSpace: 'pre-wrap',
                      borderLeft: `3px solid ${j.color}`,
                    }}
                    dangerouslySetInnerHTML={{ __html: formatArticleHtml(article) }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Discovery Showcase ── */}
      <div className="mt-6 mb-4">
        <div className="text-xs font-medium mb-2" style={{ color: 'var(--t2)' }}>
          🔬 Naya Khoj — Sabhi Research ki Discoveries ka 3D Visualization
        </div>
        <div className="text-[13px] mb-3 leading-relaxed" style={{ color: 'var(--t3)' }}>
          10 joint papers se 10 breakthrough discoveries — Dark Parity, Black Hole Remnants, Quantum Internet, aur bahut kuch!
        </div>
      </div>

      <DiscoveryScene />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
        {[
          { icon: '🌊', label: 'GW Pipeline', desc: 'SNR 30% better', color: 'var(--amber)' },
          { icon: '🧮', label: 'N-body 200×', desc: '47 terms only', color: 'var(--purple)' },
          { icon: '📡', label: 'BEC-GW', desc: 'Sub-Hz detection', color: 'var(--teal)' },
          { icon: '⚛️', label: 'Dark Parity', desc: 'Z₂ symmetry', color: 'var(--coral)' },
          { icon: '🕳️', label: 'BH Remnant', desc: 'DM candidate', color: 'var(--purple)' },
          { icon: '🔬', label: 'Gravity Test', desc: 'BEC decoherence', color: 'var(--green)' },
          { icon: '💎', label: 'Fractal Space', desc: 'Planck conformal', color: 'var(--amber)' },
          { icon: '🛡️', label: 'QEC 120×', desc: 'Ramanujan codes', color: 'var(--teal)' },
          { icon: '✨', label: 'SM Unique', desc: 'Level-6 proof', color: 'var(--purple)' },
          { icon: '🌐', label: 'Q-Internet', desc: 'India 2028', color: 'var(--green)' },
        ].map((d) => (
          <div
            key={d.label}
            className="rounded-xl border border-bd p-2.5 text-center"
            style={{ background: 'var(--bg2)' }}
          >
            <div className="text-lg mb-1">{d.icon}</div>
            <div className="text-[12px] font-medium" style={{ color: d.color }}>{d.label}</div>
            <div className="text-[11px]" style={{ color: 'var(--t3)' }}>{d.desc}</div>
          </div>
        ))}
      </div>

      {/* ── Sanyukt Anusandhan — Collab Research ── */}
      <div className="mt-6 mb-4">
        <div className="text-xs font-medium mb-2" style={{ color: 'var(--t2)' }}>
          🤝 Sanyukt Anusandhan — Newton ke Collaboration Calls
        </div>
        <div className="text-[13px] mb-3 leading-relaxed" style={{ color: 'var(--t3)' }}>
          Newton ne 4 scientists ko bulaya — milke advanced research karo! Har card pe click karo aur dono scientists se seedha baat karo.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {COLLAB_TRACKS.map(track => {
          const c1 = getColorHex(track.colors[0]);
          const c2 = getColorHex(track.colors[1]);
          const p1 = SCIENTIST_PROFILES[track.scientists[0]];
          const p2 = SCIENTIST_PROFILES[track.scientists[1]];
          const isOpen = activeCollab === track.id;

          return (
            <div key={track.id} className="rounded-xl border border-bd overflow-hidden" style={{ background: 'var(--bg2)' }}>
              {/* Card header */}
              <div
                className="p-3.5 cursor-pointer transition-all hover:border-bd2"
                onClick={() => setActiveCollab(isOpen ? null : track.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontSize: 18 }}>{p1.icon}{p2.icon}</span>
                  <div>
                    <div className="text-xs font-medium">{p1.fullName.split(' ').pop()} + {p2.fullName.split(' ').pop()}</div>
                    <div className="text-[12px]" style={{ color: c1 }}>{track.title}</div>
                  </div>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-2">
                  <div style={{ flex: 1, height: 3, borderRadius: 2, background: 'var(--bg3)', overflow: 'hidden' }}>
                    <div style={{ width: `${track.progressPercent}%`, height: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${c1}, ${c2})` }} />
                  </div>
                  <span className="text-[11px]" style={{ color: 'var(--t3)' }}>{track.progressPercent}%</span>
                </div>

                {/* Equations */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {track.sharedEquations.slice(0, 2).map((eq, i) => (
                    <span key={i} className="text-[11px] py-0.5 px-2 rounded" style={{
                      background: getColorHex(SCIENTIST_PROFILES[eq.owner].color) + '12',
                      color: getColorHex(SCIENTIST_PROFILES[eq.owner].color),
                    }}>
                      {eq.formula}
                    </span>
                  ))}
                </div>

                {/* Target */}
                <div className="text-[12px] leading-relaxed" style={{ color: 'var(--t3)' }}>
                  🎯 {track.targetBreakthrough}
                </div>

                <div className="text-[12px] mt-2" style={{ color: c1 }}>
                  {isOpen ? '▲ Chat band karo' : '▼ Chat kholo'}
                </div>
              </div>

              {/* Mini Chat */}
              {isOpen && (
                <div className="px-3 pb-3">
                  <CollabMiniChat collabId={track.id} onClose={() => setActiveCollab(null)} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Aaj Ki Discoveries — Day 2 Breakthroughs ── */}
      <div className="mt-4 mb-3">
        <div className="text-xs font-medium mb-2" style={{ color: 'var(--t2)' }}>
          📰 Aaj Ki Discoveries — 6 April 2026
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {LATEST_DISCOVERIES.map(disc => {
          const track = COLLAB_TRACKS.find(t => t.id === disc.collabId);
          const dc = track ? getColorHex(track.colors[1]) : '#a78bfa';
          return (
            <div key={disc.id} className="rounded-xl border border-bd p-3" style={{ background: 'var(--bg2)', borderLeft: `3px solid ${dc}` }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm">{disc.icon}</span>
                <span className="text-[13px] font-medium">{disc.title}</span>
                <span className="text-[8px] py-0.5 px-1.5 rounded-full ml-auto" style={{ background: dc + '18', color: dc }}>NEW</span>
              </div>
              <div className="text-[12px] leading-relaxed mb-1.5" style={{ color: 'var(--t2)' }}>
                {disc.description.slice(0, 140)}...
              </div>
              <div className="text-[11px]" style={{ color: dc }}>
                🎯 {disc.significance}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 2D Explanation Diagrams ── */}
      <div className="mt-4 mb-3">
        <div className="text-xs font-medium mb-2" style={{ color: 'var(--t2)' }}>
          📐 Research Diagrams — Visual Explanations
        </div>
        <div className="text-[13px] mb-2 leading-relaxed" style={{ color: 'var(--t3)' }}>
          Har collab track ka 2D diagram — equations, pipeline, aur results visually samjho.
        </div>
      </div>
      <div className="rounded-xl border border-bd p-3 mb-4" style={{ background: 'var(--bg2)' }}>
        {COLLAB_TRACKS.map(track => (
          <div key={track.id} className="mb-3">
            <div className="text-[13px] font-medium mb-1" style={{ color: getColorHex(track.colors[0]) }}>
              {track.icons} {track.title}
            </div>
            <ExplainDiagram collabId={track.id} />
          </div>
        ))}
      </div>

      {/* AI Interaction */}
      <ChipPresets chips={DISHANIRDESH_CHIPS} onSelect={setInput} />

      <InputArea
        label="Scientists se unke 2026 Vision ke baare mein poochho"
        placeholder="e.g. Newton, dark matter detection mein 2026 ka sabse promising experiment kaun sa hai? Ya — Ramanujan, AI se kaunsa unsolved math problem pehle solve hoga?"
        hint="Poori team tayaar hai — 2026 ka future likhne ke liye"
        buttonText="Poochho →"
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />

      <ResponsePanel
        isLoading={isLoading}
        response={response}
        error={error}
        scientistName="2026 Vision Team"
        scientistIcon="🔮"
        scientistRole="Disha Nirdesh — Future Roadmap"
        emptyIcon="🔮"
        emptyText="Scientists apna 2026 vision share karne ke liye tayaar hain... poochho!"
      />
    </div>
  );
}
