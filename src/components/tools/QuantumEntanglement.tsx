'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAskTool } from '@/hooks/useAskTool';
import { BOSE_QUANTUM_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ToolArticles from '@/components/shared/ToolArticles';

const EntanglementScene = dynamic(() => import('@/components/3d/EntanglementScene'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import SliderInput from '@/components/shared/SliderInput';
import ChipPresets from '@/components/shared/ChipPresets';
import InputArea from '@/components/shared/InputArea';
import ResponsePanel from '@/components/shared/ResponsePanel';

export default function QuantumEntanglement() {
  const [distance, setDistance] = useState(30);
  const [input, setInput] = useState('');
  const { isLoading, response, error, ask } = useAskTool();

  // Distance: log scale 0→1m, 100→1 light-year (9.461e15 m)
  const logD = (distance / 100) * 16;
  const D_m = Math.pow(10, logD);
  const distLabel = logD < 3 ? `${D_m.toFixed(1)} m`
    : logD < 6 ? `${(D_m / 1e3).toFixed(1)} km`
    : logD < 12 ? `${(D_m / 1e9).toFixed(1)} billion m`
    : `${(D_m / 9.461e15).toFixed(3)} ly`;

  // Bell inequality: quantum max = 2√2 ≈ 2.828, classical limit = 2
  const bellS = 2 * Math.sqrt(2);

  // Decoherence time (rough model — shorter at larger distances due to environment)
  const tDecoherence = Math.max(1e-15, 1e-3 / Math.sqrt(D_m));
  const decoLabel = tDecoherence > 1e-3 ? `${(tDecoherence * 1e3).toFixed(1)} ms`
    : tDecoherence > 1e-6 ? `${(tDecoherence * 1e6).toFixed(1)} μs`
    : tDecoherence > 1e-9 ? `${(tDecoherence * 1e9).toFixed(1)} ns`
    : `${(tDecoherence * 1e12).toFixed(1)} ps`;

  // Entanglement fidelity (decreases with distance due to noise)
  const fidelity = Math.max(0.5, 1 - Math.log10(D_m + 1) * 0.05);

  const handleSubmit = () => {
    if (!input.trim()) return;
    ask('entanglement', undefined, input, {
      distance: distLabel,
      bellParameter: `S = ${bellS.toFixed(3)} > 2`,
      decoherenceTime: decoLabel,
      fidelity: `${(fidelity * 100).toFixed(1)}%`,
    });
  };

  return (
    <div>
      <EntanglementScene />
      <div className="mb-5">
        <ScientistBadge initial="B" name="Satyendra Nath Bose" subtitle="Quantum statistics revealed — particles that share identity" bgColor="var(--tdim)" textColor="var(--teal)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Quantum Entanglement Lab
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Bose: &quot;Quantum duniya mein particles ek doosre se jude rehte hain — chahe kitni bhi door ho jaayein! Bell inequality todkar Nature ne prove kiya ki entanglement real hai. Yeh spooky action samjho!&quot;
        </div>
      </div>

      <FormulaBar formula="|Ψ⟩ = (|↑↓⟩ − |↓↑⟩)/√2  ·  S = 2√2 > 2 (Bell violation)" />

      {/* Live calculator */}
      <div className="rounded-[14px] border border-bd p-4 mb-3" style={{ background: 'var(--bg2)' }}>
        <SliderInput
          label="Entanglement Distance (log scale)"
          min={0}
          max={100}
          value={distance}
          onChange={setDistance}
          unit={distLabel}
          color="var(--teal)"
        />
        <div className="metrics-grid" style={{ marginTop: 12 }}>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--teal)' }}>
              S = {bellS.toFixed(3)}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Bell Parameter (&gt; 2)</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--blue)' }}>
              {decoLabel}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Decoherence Time</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: fidelity > 0.9 ? 'var(--green)' : 'var(--amber)' }}>
              {(fidelity * 100).toFixed(1)}%
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Entanglement Fidelity</div>
          </div>
        </div>
        <div className="text-[13px] mt-3 text-center" style={{ color: 'var(--t3)' }}>
          {distLabel} ki doori pe — Bell inequality S = {bellS.toFixed(2)} &gt; 2, entanglement {fidelity > 0.9 ? 'strong' : fidelity > 0.7 ? 'moderate' : 'weak'}
        </div>
      </div>

      <ChipPresets chips={BOSE_QUANTUM_CHIPS} onSelect={setInput} />

      <InputArea
        label="Quantum entanglement ke baare mein poochho"
        placeholder="e.g. Bell inequality kya hai? Quantum teleportation kaise kaam karta hai? BEC mein entanglement ka role kya hai?"
        hint="Bose quantum physics ki depth mein jayega"
        buttonText="Explore karo →"
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />

      <ResponsePanel
        isLoading={isLoading}
        response={response}
        error={error}
        scientistName="Satyendra Nath Bose"
        scientistIcon="🔗"
        scientistRole="Quantum Statistics & Entanglement"
        emptyIcon="🔗"
        emptyText="Bose quantum entanglement explore karne ko taiyaar hai... sawaal poochho!"
      />

      <ToolArticles groupIdx={9} chips={BOSE_QUANTUM_CHIPS} color="var(--teal)" title="Quantum Physics Research" />
    </div>
  );
}
