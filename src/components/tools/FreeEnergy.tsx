'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAskTool } from '@/hooks/useAskTool';
import { FREEENERGY_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ToolArticles from '@/components/shared/ToolArticles';

const AtomScene = dynamic(() => import('@/components/3d/AtomScene'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import SliderInput from '@/components/shared/SliderInput';
import ChipPresets from '@/components/shared/ChipPresets';
import InputArea from '@/components/shared/InputArea';
import ResponsePanel from '@/components/shared/ResponsePanel';

export default function FreeEnergy() {
  const [massGrams, setMassGrams] = useState(1);
  const [input, setInput] = useState('');
  const { isLoading, response, error, ask } = useAskTool();

  // E = mc² calculator
  const c = 299792458; // m/s
  const massKg = massGrams / 1000;
  const energyJ = massKg * c * c;
  const energyKWh = energyJ / 3.6e6;
  const homesPerYear = energyKWh / 10000; // avg US home ~10,000 kWh/year

  const formatNum = (n: number) => {
    if (n >= 1e15) return (n / 1e15).toFixed(1) + ' PJ';
    if (n >= 1e12) return (n / 1e12).toFixed(1) + ' TJ';
    if (n >= 1e9) return (n / 1e9).toFixed(1) + ' GJ';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + ' MJ';
    return n.toFixed(0) + ' J';
  };

  const formatHomes = (n: number) => {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + ' billion';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + ' million';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return n.toFixed(0);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    ask('freeenergy', undefined, input, {
      mass: `${massGrams} grams`,
      energy: formatNum(energyJ),
      homes: formatHomes(homesPerYear),
    });
  };

  return (
    <div>
      <AtomScene />
      <div className="mb-5">
        <ScientistBadge initial="N+E" name="Newton + Einstein" subtitle="E=mc² — Duniya ko free energy do!" bgColor="var(--tdim)" textColor="var(--teal)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Free Energy Engine
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Einstein: &quot;E=mc² ka weapons mein use hua — mujhe dukh hai. Lekin ab AI se clean fusion energy bana sakte hain jo poori duniya ko free electricity de!&quot;
          <br />Newton: &quot;Aur meri force laws se energy harvest karna — dono milke kaam karenge!&quot;
        </div>
      </div>

      <FormulaBar formula="E = mc²  ·  c = 299,792,458 m/s  ·  Energy ∝ Mass" />

      {/* Live E=mc² calculator */}
      <div className="rounded-[14px] border border-bd p-4 mb-3" style={{ background: 'var(--bg2)' }}>
        <div className="text-[13px] mb-2 font-medium" style={{ color: 'var(--teal)' }}>⚡ Live E = mc² Calculator</div>
        <SliderInput
          label="Mass input"
          min={1}
          max={1000}
          value={massGrams}
          onChange={setMassGrams}
          unit="grams"
          color="var(--teal)"
        />
        <div className="metrics-grid" style={{ marginTop: 12 }}>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 16, color: 'var(--teal)' }}>
              {formatNum(energyJ)}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Energy output</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 16, color: 'var(--amber)' }}>
              {energyKWh >= 1e9 ? (energyKWh / 1e9).toFixed(1) + 'B' : (energyKWh / 1e6).toFixed(1) + 'M'} kWh
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Electricity equivalent</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 16, color: 'var(--green)' }}>
              {formatHomes(homesPerYear)}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Homes powered (1 year)</div>
          </div>
        </div>
        <div className="text-[13px] mt-3 text-center" style={{ color: 'var(--t3)' }}>
          Sirf {massGrams}g matter se {formatHomes(homesPerYear)} gharon ko 1 saal bijli! — Einstein ki equation ki taakat
        </div>
      </div>

      <ChipPresets chips={FREEENERGY_CHIPS} onSelect={setInput} />

      <InputArea
        label="Fusion, antimatter, ya clean energy ka sawaal"
        placeholder="e.g. 1 kg deuterium-tritium fuel se kitni energy milegi? Yeh kitne gharon ko power kar sakta hai? ITER project ka status kya hai?"
        hint="Newton + Einstein — physics se free energy"
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
        scientistName="Newton + Einstein"
        scientistIcon="⚡"
        scientistRole="E=mc² × F=ma — Clean Energy Physics"
        emptyIcon="⚡"
        emptyText="Newton aur Einstein clean energy ka math kar rahe hain..."
      />

      <ToolArticles groupIdx={4} chips={FREEENERGY_CHIPS} color="var(--teal)" title="Energy Physics Research" />
    </div>
  );
}
