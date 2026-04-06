'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAskTool } from '@/hooks/useAskTool';
import { RAMANUJAN_MATH_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ToolArticles from '@/components/shared/ToolArticles';

const SeriesScene = dynamic(() => import('@/components/3d/SeriesScene'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import SliderInput from '@/components/shared/SliderInput';
import ChipPresets from '@/components/shared/ChipPresets';
import InputArea from '@/components/shared/InputArea';
import ResponsePanel from '@/components/shared/ResponsePanel';

export default function InfiniteSeries() {
  const [terms, setTerms] = useState(20);
  const [input, setInput] = useState('');
  const { isLoading, response, error, ask } = useAskTool();

  // Basel series: sum of 1/n² converges to π²/6
  let baselSum = 0;
  for (let n = 1; n <= terms; n++) baselSum += 1 / (n * n);
  const baselLimit = (Math.PI * Math.PI) / 6;
  const baselError = Math.abs(baselLimit - baselSum);

  // Harmonic series: sum of 1/n (diverges)
  let harmonicSum = 0;
  for (let n = 1; n <= terms; n++) harmonicSum += 1 / n;

  // Partition function p(n) — Hardy-Ramanujan approximation
  const pn = Math.round(Math.exp(Math.PI * Math.sqrt((2 * terms) / 3)) / (4 * terms * Math.sqrt(3)));

  const handleSubmit = () => {
    if (!input.trim()) return;
    ask('infiniteseries', undefined, input, {
      terms: `${terms} terms`,
      baselPartialSum: baselSum.toFixed(6),
      baselLimit: baselLimit.toFixed(6),
      harmonicSum: harmonicSum.toFixed(4),
      partitionP: pn.toLocaleString(),
    });
  };

  return (
    <div>
      <SeriesScene />
      <div className="mb-5">
        <ScientistBadge initial="R" name="Srinivasa Ramanujan" subtitle="An equation for me has no meaning unless it expresses a thought of God" bgColor="var(--pdim)" textColor="var(--purple)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Infinite Series Calculator
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Ramanujan: &quot;Numbers mere dost hain — har number ka apna character hai! 1+2+3+4+... = -1/12 sunke chaunk gaye? Yeh mathematics ka magic hai — aur quantum physics mein yeh sach mein kaam karta hai!&quot;
        </div>
      </div>

      <FormulaBar formula="1+2+3+... = −1/12 (ζ-reg)  ·  Σ1/n² = π²/6  ·  p(n) ~ e^(π√(2n/3))/(4n√3)" />

      {/* Live calculator */}
      <div className="rounded-[14px] border border-bd p-4 mb-3" style={{ background: 'var(--bg2)' }}>
        <SliderInput
          label="Number of terms (N)"
          min={1}
          max={200}
          value={terms}
          onChange={setTerms}
          unit="terms"
          color="var(--purple)"
        />
        <div className="metrics-grid" style={{ marginTop: 12 }}>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--purple)' }}>
              {baselSum.toFixed(4)}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Basel Sum (→ π²/6)</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--blue)' }}>
              {baselError.toExponential(2)}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Error from π²/6</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--green)' }}>
              p({terms}) = {pn > 1e15 ? pn.toExponential(2) : pn.toLocaleString()}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Partition Function</div>
          </div>
        </div>
        <div className="text-[13px] mt-3 text-center" style={{ color: 'var(--t3)' }}>
          {terms} terms ke baad — Basel series π²/6 = {baselLimit.toFixed(4)} ke {baselError < 0.001 ? 'bahut kareeb' : 'paas ja rahi hai'}
        </div>
      </div>

      <ChipPresets chips={RAMANUJAN_MATH_CHIPS} onSelect={setInput} />

      <InputArea
        label="Numbers aur series ke baare mein poochho"
        placeholder="e.g. 1+2+3+... = -1/12 kaise? Partition function kya hai? Ramanujan summation physics mein kahan use hoti hai?"
        hint="Ramanujan numbers ki duniya dikhayega"
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
        scientistName="Srinivasa Ramanujan"
        scientistIcon="🔢"
        scientistRole="Infinite Series & Number Theory"
        emptyIcon="🔢"
        emptyText="Ramanujan numbers ka magic dikhane ko taiyaar hai... series batao!"
      />

      <ToolArticles groupIdx={7} chips={RAMANUJAN_MATH_CHIPS} color="var(--purple)" title="Mathematical Physics Research" />
    </div>
  );
}
