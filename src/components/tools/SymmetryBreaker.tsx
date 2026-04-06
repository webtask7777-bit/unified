'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAskTool } from '@/hooks/useAskTool';
import { NOETHER_SYMMETRY_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ToolArticles from '@/components/shared/ToolArticles';

const SymmetryScene = dynamic(() => import('@/components/3d/SymmetryScene'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import SliderInput from '@/components/shared/SliderInput';
import ChipPresets from '@/components/shared/ChipPresets';
import InputArea from '@/components/shared/InputArea';
import ResponsePanel from '@/components/shared/ResponsePanel';

export default function SymmetryBreaker() {
  const [energy, setEnergy] = useState(50);
  const [input, setInput] = useState('');
  const { isLoading, response, error, ask } = useAskTool();

  // Energy scale in GeV (log scale: 0→1 GeV, 100→10^15 GeV)
  const logE = (energy / 100) * 15;
  const E_GeV = Math.pow(10, logE);
  const eLabel = logE < 3 ? `${E_GeV.toFixed(1)} GeV` : `10^${logE.toFixed(1)} GeV`;

  // Phase transitions
  const ewBroken = logE < 2.2;      // Electroweak ~246 GeV
  const qcdConfined = logE < -0.7;   // QCD ~0.2 GeV
  const gutBroken = logE < 15;       // GUT ~10^15 GeV

  // Mexican hat parameter: μ² flips sign at critical temperature
  const muSq = ewBroken ? (246 * 246 - E_GeV * E_GeV * 0.01) : -(E_GeV * 0.01);
  const vev = ewBroken ? Math.sqrt(Math.max(0, -muSq / 0.13)).toFixed(1) : '0';

  const handleSubmit = () => {
    if (!input.trim()) return;
    ask('symmetrybreaker', undefined, input, {
      energy: eLabel,
      ewSymmetry: ewBroken ? 'Broken' : 'Restored',
      qcdPhase: qcdConfined ? 'Confined' : 'QGP',
      vev: `${vev} GeV`,
    });
  };

  return (
    <div>
      <SymmetryScene />
      <div className="mb-5">
        <ScientistBadge initial="N" name="Emmy Noether" subtitle="Symmetry is the language of Nature's deepest laws" bgColor="var(--cdim)" textColor="var(--coral)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Symmetry Breaker
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Noether: &quot;Har symmetry ke peeche ek conservation law chhupi hai. Jab symmetry break hoti hai — tab naye particles janm lete hain, jaise Higgs boson! Mexican hat potential dekhkar samjho.&quot;
        </div>
      </div>

      <FormulaBar formula="V(φ) = −μ²|φ|² + λ|φ|⁴  ·  ⟨φ⟩ = √(μ²/2λ) = 246 GeV" />

      {/* Live calculator */}
      <div className="rounded-[14px] border border-bd p-4 mb-3" style={{ background: 'var(--bg2)' }}>
        <SliderInput
          label="Energy Scale (GeV — log scale)"
          min={0}
          max={100}
          value={energy}
          onChange={setEnergy}
          unit={eLabel}
          color="var(--coral)"
        />
        <div className="metrics-grid" style={{ marginTop: 12 }}>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: ewBroken ? 'var(--coral)' : 'var(--green)' }}>
              {ewBroken ? 'Broken' : 'Symmetric'}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Electroweak SU(2)×U(1)</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: qcdConfined ? 'var(--blue)' : 'var(--amber)' }}>
              {qcdConfined ? 'Confined' : 'QGP'}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>QCD Phase</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--purple)' }}>
              {vev} GeV
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Higgs VEV ⟨φ⟩</div>
          </div>
        </div>
        <div className="text-[13px] mt-3 text-center" style={{ color: 'var(--t3)' }}>
          {eLabel} pe — {ewBroken ? 'Higgs field ne electroweak symmetry tod di, particles ko mass mili' : 'Electroweak symmetry restored — W, Z massless hain'}
        </div>
      </div>

      <ChipPresets chips={NOETHER_SYMMETRY_CHIPS} onSelect={setInput} />

      <InputArea
        label="Symmetry aur conservation laws ke baare mein poochho"
        placeholder="e.g. Higgs mechanism kaise kaam karta hai? CP violation kya hai? Spontaneous symmetry breaking se kya hota hai?"
        hint="Noether symmetry ki gahraayi se samjhayegi"
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
        scientistName="Emmy Noether"
        scientistIcon="💎"
        scientistRole="Symmetry & Conservation Laws"
        emptyIcon="💎"
        emptyText="Noether symmetry analyze kar rahi hai... scenario batao!"
      />

      <ToolArticles groupIdx={8} chips={NOETHER_SYMMETRY_CHIPS} color="var(--coral)" title="Symmetry & Conservation Research" />
    </div>
  );
}
