'use client';

import { useState, useRef } from 'react';
import {
  SCIENTIST_IDS,
  SCIENTIST_PROFILES,
  type ScientistId,
  type ScientistProfile,
  type TimelineEvent,
} from '@/lib/scientistProfiles';

/* ═══════════════════════════════════════════════════
   Category badge colors for timeline
   ═══════════════════════════════════════════════════ */
const CAT_STYLE: Record<TimelineEvent['category'], { bg: string; label: string }> = {
  birth:      { bg: 'var(--gdim)', label: 'Janam' },
  education:  { bg: 'var(--tdim)', label: 'Taleem' },
  discovery:  { bg: 'var(--adim)', label: 'Khoj' },
  award:      { bg: 'var(--pdim)', label: 'Samman' },
  personal:   { bg: 'var(--cdim)', label: 'Zindagi' },
  legacy:     { bg: 'var(--bdim)', label: 'Virasat' },
  posthumous: { bg: 'var(--pdim)', label: 'Baad mein' },
  modern:     { bg: 'var(--tdim)', label: 'Aaj' },
  ai2026:     { bg: 'var(--adim)', label: '2026 AI' },
};

/* ═══════════════════════════════════════════════════
   Section wrapper
   ═══════════════════════════════════════════════════ */
function Section({ icon, title, color, children }: {
  icon: string; title: string; color: string; children: React.ReactNode;
}) {
  return (
    <div className="border border-bd rounded-[14px] overflow-hidden mb-4" style={{ background: 'var(--bg2)' }}>
      <div className="px-4 py-3 flex items-center gap-2 border-b border-bd" style={{ borderTop: `2px solid ${color}` }}>
        <span className="text-base">{icon}</span>
        <span className="text-sm font-semibold" style={{ color: 'var(--t)' }}>{title}</span>
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Real Profile Tab
   ═══════════════════════════════════════════════════ */
function RealProfileTab({ p }: { p: ScientistProfile }) {
  return (
    <div className="flex flex-col gap-0">
      {/* Early Life */}
      <Section icon="📒" title="Shuruat ki Kahani" color={p.color}>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--t2)' }}>{p.earlyLife}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.education.map((e, i) => (
            <span key={i} className="text-[12px] px-2.5 py-1 rounded-full border border-bd" style={{ background: p.dimColor, color: 'var(--t)' }}>
              {e}
            </span>
          ))}
        </div>
      </Section>

      {/* Major Discoveries */}
      <Section icon="💡" title="Maha Khoj — Major Discoveries" color={p.color}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {p.majorDiscoveries.map((d, i) => (
            <div key={i} className="border border-bd rounded-xl p-3" style={{ background: 'var(--bg3)' }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] font-semibold" style={{ color: p.color }}>{d.name}</span>
                <span className="text-[12px] px-2 py-0.5 rounded-full" style={{ background: p.dimColor, color: 'var(--t2)' }}>{d.year}</span>
              </div>
              <p className="text-[13px] mb-2" style={{ color: 'var(--t2)' }}>{d.description}</p>
              {d.equation && (
                <code className="text-[13px] px-2 py-1 rounded-md block" style={{ background: 'var(--bg)', color: p.color, fontFamily: 'monospace' }}>
                  {d.equation}
                </code>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* 2026 Naya Khoj — Original Research */}
      {p.nayaKhoj.length > 0 && (
        <Section icon="🔬" title="2026 NAYA KHOJ — Original Research Hypotheses" color="var(--amber)">
          <div className="flex flex-col gap-3">
            {p.nayaKhoj.map((k, i) => (
              <div key={i} className="border rounded-xl p-3.5" style={{ background: 'var(--bg3)', borderColor: 'var(--amber)', borderLeft: '3px solid var(--amber)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--adim)', color: 'var(--amber)' }}>
                    NOVEL — {k.novelty}/10
                  </span>
                  <span className="text-[12px] font-semibold" style={{ color: 'var(--t1)' }}>{k.title}</span>
                </div>
                <div className="text-[12px] mb-1.5" style={{ color: 'var(--t3)' }}>
                  <strong style={{ color: 'var(--coral)' }}>Gap:</strong> {k.gap}
                </div>
                <div className="text-[12px] mb-1.5" style={{ color: 'var(--t2)' }}>
                  <strong style={{ color: 'var(--amber)' }}>Hypothesis:</strong> {k.hypothesis}
                </div>
                <div className="text-[12px] mb-2 p-2 rounded-lg" style={{ background: 'var(--bg)', color: 'var(--green)' }}>
                  <strong>Prediction:</strong> {k.prediction}
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {k.domains.map((d, j) => (
                    <span key={j} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: 'var(--bg)', color: 'var(--t3)' }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Key Equations */}
      <Section icon="📐" title="Key Equations" color={p.color}>
        <div className="flex flex-col gap-2">
          {p.keyEquations.map((eq, i) => (
            <div key={i} className="flex items-start gap-3 border border-bd rounded-xl p-3" style={{ background: 'var(--bg3)' }}>
              <code className="text-[12px] shrink-0 px-2 py-1 rounded-md" style={{ background: 'var(--bg)', color: p.color, fontFamily: 'monospace' }}>
                {eq.formula}
              </code>
              <div>
                <span className="text-[13px] font-semibold block" style={{ color: 'var(--t)' }}>{eq.name}</span>
                <span className="text-[12px]" style={{ color: 'var(--t2)' }}>{eq.meaning}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Awards */}
      <Section icon="🏆" title="Samman — Awards" color={p.color}>
        <div className="flex flex-col gap-2">
          {p.awards.map((a, i) => (
            <div key={i} className="flex items-start gap-3 border border-bd rounded-xl p-3" style={{ background: 'var(--bg3)' }}>
              <span className="text-[13px] shrink-0 font-bold px-2 py-0.5 rounded-full" style={{ background: p.dimColor, color: p.color }}>{a.year}</span>
              <div>
                <span className="text-[12px] font-semibold block" style={{ color: 'var(--t)' }}>{a.name}</span>
                <span className="text-[12px]" style={{ color: 'var(--t2)' }}>{a.details}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Famous Quotes */}
      <Section icon="💬" title="Mashoor Alfaaz — Famous Quotes" color={p.color}>
        <div className="flex flex-col gap-3">
          {p.famousQuotes.map((q, i) => (
            <div key={i} className="pl-3 py-2" style={{ borderLeft: `3px solid ${p.color}` }}>
              <p className="text-[13px] italic mb-1" style={{ color: 'var(--t)' }}>"{q.quote}"</p>
              <p className="text-[12px]" style={{ color: 'var(--t2)' }}>{q.context}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Personal Life */}
      <Section icon="🏠" title="Niji Zindagi — Personal Life" color={p.color}>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--t2)' }}>{p.personalLife}</p>
      </Section>

      {/* Legacy */}
      <Section icon="🌟" title="Virasat — Legacy" color={p.color}>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--t2)' }}>{p.legacy}</p>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   AI Profile Tab
   ═══════════════════════════════════════════════════ */
function AIProfileTab({ p }: { p: ScientistProfile }) {
  return (
    <div className="flex flex-col gap-0">
      {/* AI Personality */}
      <Section icon="🧠" title="AI Personality" color={p.color}>
        <div className="flex flex-col gap-2">
          {p.aiPersonality.map((trait, i) => (
            <div key={i} className="flex items-start gap-2 text-[12px] px-3 py-2 rounded-xl border border-bd" style={{ background: 'var(--bg3)', color: 'var(--t)' }}>
              {trait}
            </div>
          ))}
        </div>
      </Section>

      {/* App Tools */}
      <Section icon="🛠️" title="App mein kya karta hai" color={p.color}>
        <div className="flex flex-col gap-2">
          {p.appTools.map((tool, i) => (
            <div key={i} className="border border-bd rounded-xl p-3" style={{ background: 'var(--bg3)' }}>
              <span className="text-[12px] font-semibold block mb-1" style={{ color: p.color }}>{tool.toolName}</span>
              <span className="text-[13px]" style={{ color: 'var(--t2)' }}>{tool.role}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 2026 Return Story */}
      <Section icon="🤖" title="2026 Wapsi ki Kahani" color={p.color}>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--t2)' }}>{p.returnStory}</p>
      </Section>

      {/* Research Focus */}
      <Section icon="🔬" title="Current Research Focus (2026)" color={p.color}>
        <div className="flex flex-col gap-2">
          {p.researchFocus.map((focus, i) => (
            <div key={i} className="flex items-center gap-2 text-[12px]" style={{ color: 'var(--t)' }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.color }} />
              {focus}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Timeline Tab
   ═══════════════════════════════════════════════════ */
function TimelineTab({ p }: { p: ScientistProfile }) {
  return (
    <div className="relative pl-6 md:pl-8">
      {/* Vertical line */}
      <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-[2px]" style={{ background: 'var(--bd2)' }} />

      <div className="flex flex-col gap-4">
        {p.timeline.map((ev, i) => {
          const cat = CAT_STYLE[ev.category];
          return (
            <div key={i} className="relative">
              {/* Dot on the line */}
              <div
                className="absolute -left-[21px] md:-left-[25px] top-[6px] w-[10px] h-[10px] rounded-full border-2"
                style={{ borderColor: p.color, background: ev.category === 'ai2026' ? p.color : 'var(--bg)' }}
              />

              {/* Content card */}
              <div className="border border-bd rounded-xl p-3" style={{ background: 'var(--bg2)' }}>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[12px] font-bold px-2 py-0.5 rounded-full" style={{ background: p.dimColor, color: p.color }}>
                    {ev.year}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: cat.bg, color: 'var(--t2)' }}>
                    {cat.label}
                  </span>
                  <span className="text-sm">{ev.icon}</span>
                </div>
                <p className="text-[12px] font-semibold mb-1" style={{ color: 'var(--t)' }}>{ev.title}</p>
                <p className="text-[13px]" style={{ color: 'var(--t2)' }}>{ev.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════ */
type Tab = 'real' | 'ai' | 'timeline';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'real', label: 'Real Profile', icon: '📋' },
  { key: 'ai', label: 'AI Profile', icon: '🤖' },
  { key: 'timeline', label: 'Timeline', icon: '📅' },
];

export default function ScientistProfiles() {
  const [selected, setSelected] = useState<ScientistId>('newton');
  const [tab, setTab] = useState<Tab>('real');
  const contentRef = useRef<HTMLDivElement>(null);

  const p = SCIENTIST_PROFILES[selected];

  const handleSelect = (id: ScientistId) => {
    setSelected(id);
    setTab('real');
    contentRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* ── Page Header ── */}
      <h1 className="text-[26px] mb-1" style={{ fontFamily: 'var(--font-dm-serif), serif', color: 'var(--t)' }}>
        Scientist Profiles
      </h1>
      <p className="text-[13px] mb-5" style={{ color: 'var(--t2)' }}>
        Newton se Noether — poori kahani, real data, AI persona, aur 2026 tak ka safar.
      </p>

      {/* ── Scientist Selector ── */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {SCIENTIST_IDS.map((id) => {
          const s = SCIENTIST_PROFILES[id];
          const active = id === selected;
          return (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border transition-all cursor-pointer shrink-0"
              style={{
                background: active ? s.dimColor : 'var(--bg2)',
                borderColor: active ? s.color : 'var(--bd)',
                minWidth: 90,
              }}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="text-[13px] font-semibold" style={{ color: active ? s.color : 'var(--t2)' }}>
                {s.fullName.split(' ').pop()}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Profile Header ── */}
      <div className="border border-bd rounded-[14px] p-4 mb-4 relative overflow-hidden" style={{ background: 'var(--bg2)' }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: p.color }} />
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shrink-0"
            style={{ background: p.dimColor }}
          >
            {p.icon}
          </div>
          <div className="min-w-0">
            <h2 className="text-[20px] mb-0.5" style={{ fontFamily: 'var(--font-dm-serif), serif', color: 'var(--t)' }}>
              {p.fullName}
            </h2>
            <p className="text-[13px] mb-0.5" style={{ color: 'var(--t2)' }}>{p.tagline}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[12px]" style={{ color: 'var(--t2)' }}>
              <span>Born: {p.born.split(',')[0]}</span>
              <span>Died: {p.died.split(',')[0]}</span>
              <span>{p.nationality}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-2 mt-4">
          {p.quickStats.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-bd" style={{ background: 'var(--bg3)' }}>
              <span className="text-sm">{s.icon}</span>
              <div className="flex flex-col">
                <span className="text-[12px]" style={{ color: 'var(--t2)' }}>{s.label}</span>
                <span className="text-[12px] font-bold" style={{ color: p.color }}>{s.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab Switcher ── */}
      <div className="flex gap-1 mb-4 p-1 rounded-xl border border-bd" style={{ background: 'var(--bg2)' }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12px] font-medium transition-all cursor-pointer"
            style={{
              background: tab === t.key ? p.dimColor : 'transparent',
              color: tab === t.key ? p.color : 'var(--t2)',
              borderBottom: tab === t.key ? `2px solid ${p.color}` : '2px solid transparent',
            }}
          >
            <span>{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div ref={contentRef}>
        {tab === 'real' && <RealProfileTab p={p} />}
        {tab === 'ai' && <AIProfileTab p={p} />}
        {tab === 'timeline' && <TimelineTab p={p} />}
      </div>
    </div>
  );
}
