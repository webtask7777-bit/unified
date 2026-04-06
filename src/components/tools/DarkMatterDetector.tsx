'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAskTool } from '@/hooks/useAskTool';
import { DARKMATTER_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ToolArticles from '@/components/shared/ToolArticles';

const GravityMapScene = dynamic(() => import('@/components/3d/GravityMapScene'), { ssr: false });
const EarthGravityGlobe = dynamic(() => import('@/components/3d/EarthGravityGlobe'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import ChipPresets from '@/components/shared/ChipPresets';
import InputArea from '@/components/shared/InputArea';
import ResponsePanel from '@/components/shared/ResponsePanel';
import ProgressBar from '@/components/shared/ProgressBar';

export default function DarkMatterDetector() {
  const [input, setInput] = useState('');
  const { isLoading, response, error, ask } = useAskTool();

  const handleSubmit = () => {
    if (!input.trim()) return;
    ask('darkmatter', undefined, input);
  };

  return (
    <div>
      <GravityMapScene />
      <EarthGravityGlobe />
      <div className="mb-5">
        <ScientistBadge initial="N" name="Isaac Newton" subtitle="Gravity anomalies → Dark matter mapping" bgColor="var(--pdim)" textColor="var(--purple)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Dark Matter Detector
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Newton: &quot;Maine gravity khoji thi — lekin universe ka 85% mass invisible hai! AI se gravitational anomalies mein dark matter ka pattern dhoondho.&quot;
        </div>
      </div>

      <FormulaBar formula="F = GMm/r²  ·  Observed rotation ≠ Visible mass  ·  Dark matter = ?" />

      {/* Universe composition */}
      <div className="mb-4">
        <ProgressBar label="Ordinary matter" value={5} color="var(--blue)" displayValue="~5%" />
        <ProgressBar label="Dark matter" value={27} color="var(--purple)" displayValue="~27%" />
        <ProgressBar label="Dark energy" value={68} color="var(--amber)" displayValue="~68%" />
      </div>

      {/* Stats */}
      <div className="metrics-grid">
        <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--purple)' }}>85%</div>
          <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Universe ka invisible mass</div>
        </div>
        <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--amber)' }}>0</div>
          <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Direct detections (abhi tak)</div>
        </div>
        <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--teal)' }}>6×</div>
          <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Visible matter se zyada</div>
        </div>
      </div>

      <ChipPresets chips={DARKMATTER_CHIPS} onSelect={setInput} />

      <InputArea
        label="Galaxy data, observation, ya dark matter ka sawaal"
        placeholder="e.g. Ek spiral galaxy ka rotation curve flat hai 30 kpc tak, visible mass 5×10^10 solar masses — dark matter halo ka mass aur distribution predict karo..."
        hint="Newton gravity anomalies se dark matter map banayega"
        buttonText="Detect karo →"
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        disabled={isLoading}
      />

      <ResponsePanel
        isLoading={isLoading}
        response={response}
        error={error}
        scientistName="Isaac Newton"
        scientistIcon="🌌"
        scientistRole="Gravitational Anomaly Analysis"
        emptyIcon="🌌"
        emptyText="Newton dark matter dhoondh raha hai... apna data do!"
      />

      <ToolArticles groupIdx={0} chips={DARKMATTER_CHIPS} color="var(--purple)" title="Dark Matter Research" />
    </div>
  );
}
