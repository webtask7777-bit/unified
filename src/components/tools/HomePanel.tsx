'use client';

import dynamic from 'next/dynamic';
import { ToolId } from '@/lib/types';

const UniverseScene = dynamic(() => import('@/components/3d/UniverseScene'), { ssr: false });

interface HomePanelProps {
  onNavigate: (id: ToolId) => void;
}

const TOOLS = [
  { id: 'darkmatter' as ToolId, icon: '🌌', title: 'Dark Matter Detector', desc: 'Newton: "Gravity anomalies se invisible mass dhoondho — universe ka 85% abhi tak chhupa hai!"', sci: 'Newton — Gravitational anomaly mapping', color: 'var(--purple)' },
  { id: 'motion' as ToolId, icon: '🔭', title: 'Universal Motion Predictor', desc: 'Newton: "Har planet, asteroid, black hole ki trajectory — real-time predict karo! Principia 2.0!"', sci: 'Newton — Orbital mechanics + N-body', color: 'var(--green)' },
  { id: 'timedilation' as ToolId, icon: '🕰️', title: 'Time Dilation Calculator', desc: 'Einstein: "GPS se space travel tak — har insaan ka biological age vs cosmic age calculate karo!"', sci: 'Einstein — Special + General Relativity', color: 'var(--amber)' },
  { id: 'wormhole' as ToolId, icon: '🌀', title: 'Wormhole Feasibility AI', desc: 'Einstein: "General Relativity ki equations se dekho — wormhole theoretically kahan possible hai?"', sci: 'Einstein — Spacetime engineering', color: 'var(--coral)' },
  { id: 'freeenergy' as ToolId, icon: '⚡', title: 'Free Energy Engine', desc: 'Einstein: "E=mc² ka weapons mein nahi — clean fusion mein use karo! Poori duniya ko free electricity!"', sci: 'Newton + Einstein — E=mc² × F=ma', color: 'var(--teal)' },
  { id: 'unifiedfield' as ToolId, icon: '🧬', title: 'Unified Field Theory Bot', desc: 'Poori Team: "Woh ek equation dhoondho jo Classical + Quantum + Relativity sab jod de!"', sci: 'Newton + Einstein + Ramanujan + Bose + Noether', color: 'var(--amber)' },
  { id: 'dishanirdesh' as ToolId, icon: '🔮', title: '2026 Disha Nirdesh', desc: 'Sabhi Scientists: "2026 mein jivit hoke — har ek ne apni field ka future roadmap diya. Unique ideas, bold predictions!"', sci: 'Newton + Einstein + Ramanujan + Bose + Noether', color: 'var(--amber)' },
  { id: 'researchlab' as ToolId, icon: '📜', title: 'Research Lab', desc: 'Sab Scientists: "Har sawaal ka research article — signature aur date ke saath. Naya khoj ho toh highlight!"', sci: 'Poori Team — 24 Research Articles', color: 'var(--purple)' },
];

const HEROES = [
  { id: 'darkmatter' as ToolId, icon: '🍎', name: 'Newton', dim: 'var(--gdim)', role: 'Gravity & Motion' },
  { id: 'timedilation' as ToolId, icon: '⚡', name: 'Einstein', dim: 'var(--adim)', role: 'Spacetime' },
  { id: 'unifiedfield' as ToolId, icon: '∞', name: 'Ramanujan', dim: 'var(--pdim)', role: 'Mathematics' },
  { id: 'unifiedfield' as ToolId, icon: '🌊', name: 'S.N. Bose', dim: 'var(--cdim)', role: 'Quantum' },
  { id: 'unifiedfield' as ToolId, icon: '⚖️', name: 'Noether', dim: 'var(--tdim)', role: 'Symmetry' },
];

const FEATURES = [
  { icon: '🧮', title: 'Real physics calculations', desc: 'Actual equations, SI units, real numbers — no buzzwords' },
  { icon: '🤖', title: 'AI-powered analysis', desc: 'Claude AI as Newton/Einstein — physics-accurate responses' },
  { icon: '🇮🇳', title: 'Hinglish mein', desc: 'Complex physics simple language mein — samajh aata hai' },
];

export default function HomePanel({ onNavigate }: HomePanelProps) {
  return (
    <div>
      {/* 3D Universe */}
      <UniverseScene />

      {/* Hero */}
      <div className="text-center py-6 pb-5">
        <div
          className="text-3xl leading-tight mb-1"
          style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 'clamp(28px, 4vw, 38px)' }}
        >
          Agar <span style={{ color: 'var(--green)' }}>Newton</span> aur <span style={{ color: 'var(--amber)' }}>Einstein</span> ke paas
          <br /><span style={{ color: 'var(--blue)' }}>AI</span> hoti toh...
        </div>
        <div className="text-[13px] max-w-[500px] mx-auto mb-5 leading-relaxed" style={{ color: 'var(--t2)' }}>
          Duniya ke sabse mahaan scientists — 2026 mein wapas aaye hain AI ke saath.
          Dark matter se lekar Theory of Everything tak — sab build kar rahe hain!
        </div>
        <div className="flex justify-center gap-4 flex-wrap mb-7">
          {HEROES.map((h, i) => (
            <div
              key={i}
              onClick={() => onNavigate(h.id)}
              className="flex flex-col items-center gap-1.5 cursor-pointer transition-transform hover:-translate-y-0.5"
            >
              <div
                className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-[17px] border-[1.5px] border-bd2"
                style={{ background: h.dim }}
              >
                {h.icon}
              </div>
              <div className="text-[12px] font-medium">{h.name}</div>
              <div className="text-[11px]" style={{ color: 'var(--t3)' }}>{h.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tool cards */}
      <div className="home-grid">
        {TOOLS.map((tool) => (
          <div
            key={tool.id}
            onClick={() => onNavigate(tool.id)}
            className="border border-bd rounded-[14px] p-4.5 cursor-pointer transition-all hover:border-bd2 hover:-translate-y-0.5 relative overflow-hidden"
            style={{ background: 'var(--bg2)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: tool.color }} />
            <div className="text-2xl mb-2">{tool.icon}</div>
            <div className="text-sm font-medium mb-1">{tool.title}</div>
            <div className="text-xs leading-relaxed" style={{ color: 'var(--t2)' }}>{tool.desc}</div>
            <div className="text-[12px] mt-2" style={{ color: 'var(--t3)' }}>{tool.sci}</div>
          </div>
        ))}
      </div>

      {/* Discovery Engine Showcase */}
      <div
        onClick={() => onNavigate('discovery')}
        className="rounded-[14px] border p-5 mb-4 cursor-pointer transition-all hover:-translate-y-0.5"
        style={{ background: 'var(--bg2)', borderColor: 'var(--amber)', borderStyle: 'dashed' }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--adim)', color: 'var(--amber)' }}>
            GENUINELY ORIGINAL
          </span>
          <span className="text-lg">🔬</span>
        </div>
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 20, marginBottom: 4, lineHeight: 1.2 }}>
          Discovery Engine — Internet pe Nahi Milega
        </div>
        <div className="text-[13px] leading-relaxed mb-3" style={{ color: 'var(--t2)' }}>
          5 scientists ka cross-domain synthesis = genuinely novel hypotheses + testable predictions. Explain nahi — Discover karte hain.
        </div>
        <div className="flex gap-3 mb-3 justify-center">
          {[
            { icon: '🍎', name: 'Newton', color: 'var(--green)' },
            { icon: '⚡', name: 'Einstein', color: 'var(--amber)' },
            { icon: '∞', name: 'Ramanujan', color: 'var(--purple)' },
            { icon: '🌊', name: 'Bose', color: 'var(--teal)' },
            { icon: '⚖️', name: 'Noether', color: 'var(--coral)' },
          ].map(s => (
            <div key={s.name} className="flex flex-col items-center gap-0.5">
              <span className="text-sm">{s.icon}</span>
              <span className="text-[10px]" style={{ color: s.color }}>{s.name}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[
            { label: 'Educational Tools', val: '11 physics tools', icon: '📚' },
            { label: 'Original Research', val: 'Discovery Engine — NAYA', icon: '🔬' },
            { label: 'Cross-Domain', val: '5 domain synthesis', icon: '🔗' },
            { label: 'Testable Predictions', val: 'Specific numbers', icon: '🎯' },
          ].map(c => (
            <div key={c.label} className="border border-bd rounded-lg p-2 text-center" style={{ background: 'var(--bg3)' }}>
              <div className="text-sm">{c.icon}</div>
              <div className="text-[11px] font-medium">{c.val}</div>
              <div className="text-[10px]" style={{ color: 'var(--t3)' }}>{c.label}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <span className="text-[13px] py-1.5 px-4 rounded-[9px] font-medium" style={{ background: 'var(--adim)', color: 'var(--amber)' }}>
            Discover karo →
          </span>
        </div>
      </div>

      {/* Combined projects table */}
      <div className="rounded-[14px] border border-bd p-4 mb-4" style={{ background: 'var(--bg2)' }}>
        <div className="text-xs font-medium mb-3" style={{ color: 'var(--t2)' }}>🤝 Dono milkar banate hain...</div>
        <div className="grid gap-2">
          {[
            { project: 'Grand Unified Theory AI', newton: 'Classical mechanics', einstein: 'Relativity + Quantum' },
            { project: 'Space Travel Optimizer', newton: 'Orbital calculations', einstein: 'Time dilation corrections' },
            { project: 'Free Energy for Earth', newton: 'Motion & force models', einstein: 'E=mc² fusion' },
            { project: 'Universe Simulator', newton: 'Gravity laws', einstein: 'Spacetime fabric' },
          ].map((row) => (
            <div key={row.project} className="grid grid-cols-3 gap-2 text-[13px] py-1.5 border-b border-bd last:border-0">
              <div className="font-medium">{row.project}</div>
              <div style={{ color: 'var(--green)' }}>🍎 {row.newton}</div>
              <div style={{ color: 'var(--amber)' }}>⚡ {row.einstein}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="feat-grid">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="border border-bd rounded-xl p-3.5 text-center"
            style={{ background: 'var(--bg2)' }}
          >
            <div className="text-xl mb-1.5">{f.icon}</div>
            <div className="text-xs font-medium mb-0.5">{f.title}</div>
            <div className="text-[13px] leading-snug" style={{ color: 'var(--t2)' }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
