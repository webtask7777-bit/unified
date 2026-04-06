'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAskTool } from '@/hooks/useAskTool';
import { WORMHOLE_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ToolArticles from '@/components/shared/ToolArticles';

const WormholeScene = dynamic(() => import('@/components/3d/WormholeScene'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import ChipPresets from '@/components/shared/ChipPresets';
import InputArea from '@/components/shared/InputArea';
import ResponsePanel from '@/components/shared/ResponsePanel';
import ProgressBar from '@/components/shared/ProgressBar';

export default function WormholeFeasibility() {
  const [input, setInput] = useState('');
  const { isLoading, response, error, ask } = useAskTool();

  const handleSubmit = () => {
    if (!input.trim()) return;
    ask('wormhole', undefined, input);
  };

  return (
    <div>
      <WormholeScene />
      <div className="mb-5">
        <ScientistBadge initial="E" name="Albert Einstein" subtitle="General Relativity → Spacetime engineering" bgColor="var(--cdim)" textColor="var(--coral)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Wormhole Feasibility AI
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Einstein: &quot;Maine 1935 mein Rosen ke saath Einstein-Rosen bridge propose kiya tha. Ab AI se dekhte hain — kya wormhole banana REALLY possible hai?&quot;
        </div>
      </div>

      <FormulaBar formula="Gμν + Λgμν = (8πG/c⁴)Tμν  ·  ds² = −e²ᶲdt² + dr²/(1−b/r) + r²dΩ²" />

      {/* Feasibility meters */}
      <div className="mb-4">
        <ProgressBar label="Mathematical consistency" value={90} color="var(--green)" displayValue="9/10" />
        <ProgressBar label="Physical realizability" value={20} color="var(--amber)" displayValue="2/10" />
        <ProgressBar label="Engineering feasibility" value={1} color="var(--coral)" displayValue="0.1/10" />
      </div>

      {/* Key numbers */}
      <div className="metrics-grid">
        <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 16, color: 'var(--coral)' }}>−10⁶⁴ J</div>
          <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Exotic matter needed</div>
        </div>
        <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 16, color: 'var(--purple)' }}>10⁻³⁵ m</div>
          <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Planck scale effects</div>
        </div>
        <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 16, color: 'var(--teal)' }}>10⁻⁴⁴ s</div>
          <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Planck time stability</div>
        </div>
      </div>

      <ChipPresets chips={WORMHOLE_CHIPS} onSelect={setInput} />

      <InputArea
        label="Wormhole, warp drive, ya spacetime engineering ka sawaal"
        placeholder="e.g. 1 meter throat radius ka traversable wormhole banane ke liye kitni exotic matter chahiye? Casimir effect se kitna milta hai?"
        hint="Einstein spacetime ki equations solve karega"
        buttonText="Analyze karo →"
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />

      <ResponsePanel
        isLoading={isLoading}
        response={response}
        error={error}
        scientistName="Albert Einstein"
        scientistIcon="🌀"
        scientistRole="General Relativity & Spacetime Engineering"
        emptyIcon="🌀"
        emptyText="Einstein spacetime mein wormhole dhoondh raha hai..."
      />

      <ToolArticles groupIdx={3} chips={WORMHOLE_CHIPS} color="var(--coral)" title="Spacetime Engineering Research" />
    </div>
  );
}
