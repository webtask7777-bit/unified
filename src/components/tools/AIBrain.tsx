'use client';

import { useState } from 'react';
import { SCIENTIST_PROFILES, ScientistId, SCIENTIST_IDS } from '@/lib/scientistProfiles';
import { BRAIN_DATA, ScientistBrain } from '@/lib/brainData';
import BrainScene from '@/components/3d/BrainScene';

/* ── Section wrapper ── */
function Section({ title, icon, color, children }: {
  title: string; icon: string; color: string; children: React.ReactNode;
}) {
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--bd)', borderRadius: 12, padding: 18, marginBottom: 14, borderTop: `2px solid ${color}` }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>{icon}</span> {title}
      </h3>
      {children}
    </div>
  );
}

/* ── Domain Bar ── */
function DomainBar({ name, level, icon, color }: { name: string; level: number; icon: string; color: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
        <span>{icon} {name}</span>
        <span style={{ color, fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{ height: 6, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${level}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

/* ── Brain Node (concept) ── */
function NodeCard({ label, info, color, index }: { label: string; info: string; color: string; index: number }) {
  return (
    <div style={{
      background: 'var(--bg3)', border: '1px solid var(--bd)', borderRadius: 10, padding: '10px 12px',
      borderLeft: `3px solid ${color}`, fontSize: 12, lineHeight: 1.5,
    }}>
      <div style={{ fontWeight: 700, color, marginBottom: 2, fontSize: 13 }}>
        <span style={{ opacity: 0.5, marginRight: 6 }}>#{index + 1}</span>{label}
      </div>
      <div style={{ color: 'var(--t2)' }}>{info}</div>
    </div>
  );
}

/* ── Thinking Step ── */
function StepCard({ step, detail, icon, index, total, color }: {
  step: string; detail: string; icon: string; index: number; total: number; color: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: index < total - 1 ? 14 : 0 }}>
      <div style={{
        minWidth: 36, height: 36, borderRadius: '50%', background: color, display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0,
        opacity: 0.9,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
          <span style={{ color: 'var(--t3)', marginRight: 6 }}>Step {index + 1}</span>{step}
        </div>
        <div style={{ color: 'var(--t2)', fontSize: 12 }}>{detail}</div>
      </div>
      {index < total - 1 && (
        <div style={{ position: 'absolute', left: 35, top: 40, width: 2, height: 14, background: 'var(--bd)' }} />
      )}
    </div>
  );
}

/* ── Memory Card ── */
function MemoryCard({ content, type, icon, color }: {
  content: string; type: string; icon: string; color: string;
}) {
  return (
    <div style={{
      background: 'var(--bg3)', borderRadius: 10, padding: '10px 14px', marginBottom: 8,
      borderLeft: `3px solid ${color}`, fontSize: 12,
    }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{
          fontSize: 10, background: color + '22', color, padding: '1px 8px', borderRadius: 8,
          fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5,
        }}>{type}</span>
      </div>
      <div style={{ color: 'var(--t2)', lineHeight: 1.6 }}>{content}</div>
    </div>
  );
}

/* ── Connection Map (visual) ── */
function ConnectionMap({ brain, color }: { brain: ScientistBrain; color: string }) {
  const nodes = brain.nodes;
  const conns = brain.connections;
  const w = 100;
  const cx = w / 2;
  const cy = w / 2;

  const nodePositions = nodes.map((_, i) => {
    const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
    const r = 35;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
      <svg viewBox={`0 0 ${w} ${w}`} style={{ width: 220, height: 220 }}>
        {conns.map(([a, b], i) => (
          <line key={i}
            x1={nodePositions[a]?.x} y1={nodePositions[a]?.y}
            x2={nodePositions[b]?.x} y2={nodePositions[b]?.y}
            stroke={color} strokeWidth={0.5} opacity={0.3}
          />
        ))}
        {nodePositions.map((pos, i) => (
          <g key={i}>
            <circle cx={pos.x} cy={pos.y} r={3.5} fill={color} opacity={0.8} />
            <text x={pos.x} y={pos.y + (pos.y < cy ? -6 : 8)} textAnchor="middle"
              fill="var(--t2)" fontSize={3.2} fontFamily="DM Sans">
              {nodes[i].label}
            </text>
          </g>
        ))}
        <circle cx={cx} cy={cy} r={2} fill={color} opacity={0.15} />
      </svg>
    </div>
  );
}

/* ── Main Component ── */
export default function AIBrain() {
  const [selected, setSelected] = useState<ScientistId>('newton');

  const profile = SCIENTIST_PROFILES[selected];
  const brain = BRAIN_DATA[selected];
  const color = profile.color.replace('var(--', '').replace(')', '');
  const colorHex: Record<string, string> = {
    green: '#3ecf8e', amber: '#f5a623', purple: '#a78bfa',
    coral: '#f87060', teal: '#38bdf8', blue: '#5b8ff9',
  };
  const c = colorHex[color] || '#a78bfa';

  return (
    <div>
      {/* Header */}
      <h2 style={{ fontFamily: 'var(--font-dm-serif, "DM Serif Display", serif)', fontSize: 26, marginBottom: 4 }}>
        AI Brain
      </h2>
      <p style={{ color: 'var(--t2)', fontSize: 13, marginBottom: 16 }}>
        Har scientist ka neural map — domains, concepts, thinking style, aur AI memories.
      </p>

      {/* Scientist Selector */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 10, marginBottom: 16 }}>
        {SCIENTIST_IDS.map(id => {
          const p = SCIENTIST_PROFILES[id];
          const active = id === selected;
          const sc = colorHex[p.color.replace('var(--', '').replace(')', '')] || '#a78bfa';
          return (
            <button key={id} onClick={() => setSelected(id)} style={{
              background: active ? sc + '22' : 'var(--bg2)',
              border: `1.5px solid ${active ? sc : 'var(--bd)'}`,
              borderRadius: 10, padding: '8px 14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
              color: active ? sc : 'var(--t2)', fontSize: 12, fontWeight: active ? 700 : 400,
              transition: 'all 0.2s',
            }}>
              <span style={{ fontSize: 16 }}>{p.icon}</span>
              <span>{p.fullName.split(' ').pop()}</span>
            </button>
          );
        })}
      </div>

      {/* 3D Brain */}
      <BrainScene
        color={profile.color}
        nodeCount={brain.nodes.length}
        connectionCount={brain.connections.length}
      />

      {/* Brain Type + Signature */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--bd)', borderRadius: 14,
        padding: 18, marginBottom: 14, textAlign: 'center', borderTop: `2px solid ${c}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>{profile.icon}</span>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>{profile.fullName}</h3>
            <div style={{ color: c, fontSize: 13, fontWeight: 600 }}>{brain.brainType}</div>
          </div>
        </div>
        <div style={{ fontStyle: 'italic', color: 'var(--t2)', fontSize: 13, marginBottom: 10 }}>
          &ldquo;{brain.signatureThought}&rdquo;
        </div>
        {/* Brain stats pills */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {brain.stats.map((s, i) => (
            <div key={i} style={{
              background: 'var(--bg3)', border: '1px solid var(--bd)', borderRadius: 8,
              padding: '4px 12px', fontSize: 11, display: 'flex', gap: 6, alignItems: 'center',
            }}>
              <span>{s.icon}</span>
              <span style={{ color: 'var(--t2)' }}>{s.label}</span>
              <span style={{ fontWeight: 700, color: c }}>{s.value}</span>
            </div>
          ))}
        </div>
        {/* Dominant Side */}
        <div style={{ marginTop: 10, fontSize: 11, color: 'var(--t3)' }}>
          Dominant: <span style={{ color: c, fontWeight: 600 }}>
            {brain.dominantSide === 'left' ? '🧮 Left Brain (Analytical)' :
             brain.dominantSide === 'right' ? '🎨 Right Brain (Creative)' :
             '☯️ Balanced (Both Hemispheres)'}
          </span>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="brain-grid">
        {/* Left: Knowledge Domains */}
        <div>
          <Section title="Gyaan Kshetra — Knowledge Domains" icon="📊" color={c}>
            {brain.domains.map((d, i) => (
              <DomainBar key={i} name={d.name} level={d.level} icon={d.icon} color={c} />
            ))}
          </Section>

          {/* Thinking Style */}
          <Section title="Soch ka Tarika — Thinking Pattern" icon="🧠" color={c}>
            {brain.thinkingStyle.map((s, i) => (
              <StepCard key={i} step={s.step} detail={s.detail} icon={s.icon}
                index={i} total={brain.thinkingStyle.length} color={c + '33'} />
            ))}
          </Section>
        </div>

        {/* Right: Concepts + Connections */}
        <div>
          <Section title="Dimag ke Nodes — Core Concepts" icon="⚡" color={c}>
            <ConnectionMap brain={brain} color={c} />
            <div className="brain-nodes-grid">
              {brain.nodes.map((n, i) => (
                <NodeCard key={i} label={n.label} info={n.info} color={c} index={i} />
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* AI Memories - full width */}
      <Section title="AI Yaadein — Neural Memories" icon="💾" color={c}>
        <div className="brain-memories-grid">
          {brain.memories.map((m, i) => (
            <MemoryCard key={i} content={m.content} type={m.type} icon={m.icon} color={c} />
          ))}
        </div>
      </Section>
    </div>
  );
}
