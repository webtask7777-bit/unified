'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAskTool } from '@/hooks/useAskTool';
import { TIMEDILATION_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ToolArticles from '@/components/shared/ToolArticles';

const SpacetimeGrid = dynamic(() => import('@/components/3d/SpacetimeGrid'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import SliderInput from '@/components/shared/SliderInput';
import ChipPresets from '@/components/shared/ChipPresets';
import InputArea from '@/components/shared/InputArea';
import ResponsePanel from '@/components/shared/ResponsePanel';

export default function TimeDilation() {
  const [speed, setSpeed] = useState(50);
  const [input, setInput] = useState('');
  const { isLoading, response, error, ask } = useAskTool();

  // Calculate Lorentz factor
  const v = speed / 100; // fraction of c
  const gamma = v >= 1 ? Infinity : 1 / Math.sqrt(1 - v * v);
  const timeFactor = gamma === Infinity ? '∞' : gamma.toFixed(4);

  const handleSubmit = () => {
    if (!input.trim()) return;
    ask('timedilation', undefined, input, {
      speed: `${speed}% of c`,
      lorentzFactor: timeFactor,
    });
  };

  return (
    <div>
      <SpacetimeGrid />
      <div className="mb-5">
        <ScientistBadge initial="E" name="Albert Einstein" subtitle="Time is relative — aur ab calculate bhi!" bgColor="var(--adim)" textColor="var(--amber)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Time Dilation Calculator
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Einstein: &quot;Time aur Space absolute nahi hain — speed aur gravity dono time ko change karte hain. GPS se lekar space travel tak — har jagah meri relativity kaam karti hai!&quot;
        </div>
      </div>

      <FormulaBar formula="t' = t/√(1 − v²/c²)  ·  γ = 1/√(1 − v²/c²)" />

      {/* Live calculator */}
      <div className="rounded-[14px] border border-bd p-4 mb-3" style={{ background: 'var(--bg2)' }}>
        <SliderInput
          label="Speed (% of light speed c)"
          min={0}
          max={99}
          value={speed}
          onChange={setSpeed}
          unit="% c"
          color="var(--amber)"
        />
        <div className="metrics-grid" style={{ marginTop: 12 }}>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--amber)' }}>
              {speed}%c
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Velocity</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--blue)' }}>
              γ = {timeFactor}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Lorentz factor</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--green)' }}>
              {gamma === Infinity ? '∞' : (1 / gamma * 100).toFixed(1)}%
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Time slow-down</div>
          </div>
        </div>
        <div className="text-[13px] mt-3 text-center" style={{ color: 'var(--t3)' }}>
          {speed}% light speed pe — traveler ka 1 saal = Earth ka {gamma === Infinity ? '∞' : gamma.toFixed(2)} saal
        </div>
      </div>

      <ChipPresets chips={TIMEDILATION_CHIPS} onSelect={setInput} />

      <InputArea
        label="Kaunsa time dilation scenario calculate karna hai?"
        placeholder="e.g. Agar main 0.99c pe 5 saal travel karun, toh wapas aake Earth pe kitna time guzra hoga? Meri biological age vs friends ki age?"
        hint="Einstein complete math ke saath jawab dega"
        buttonText="Calculate karo →"
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
        scientistIcon="🕰️"
        scientistRole="Special + General Relativity Calculator"
        emptyIcon="🕰️"
        emptyText="Einstein time calculate kar raha hai... scenario batao!"
      />

      <ToolArticles groupIdx={2} chips={TIMEDILATION_CHIPS} color="var(--amber)" title="Relativity Research" />
    </div>
  );
}
