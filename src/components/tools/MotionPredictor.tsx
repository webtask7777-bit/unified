'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAskTool } from '@/hooks/useAskTool';
import { MOTION_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ToolArticles from '@/components/shared/ToolArticles';

const OrbitalScene = dynamic(() => import('@/components/3d/OrbitalScene'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import ChipPresets from '@/components/shared/ChipPresets';
import InputArea from '@/components/shared/InputArea';
import ResponsePanel from '@/components/shared/ResponsePanel';

export default function MotionPredictor() {
  const [input, setInput] = useState('');
  const { isLoading, response, error, ask } = useAskTool();

  const handleSubmit = () => {
    if (!input.trim()) return;
    ask('motion', undefined, input);
  };

  return (
    <div>
      <OrbitalScene />
      <div className="mb-5">
        <ScientistBadge initial="N" name="Isaac Newton" subtitle="Principia Mathematica 2.0 — AI Edition" bgColor="var(--gdim)" textColor="var(--green)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Universal Motion Predictor
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Newton: &quot;Ek seb gira toh gravity mili — ab AI se poore universe ki har cheez ki motion predict karunga! Planets, asteroids, black holes — sab ka real-time trajectory!&quot;
        </div>
      </div>

      <FormulaBar formula="F = ma  ·  v = √(GM/r)  ·  T² = (4π²/GM)a³" />

      {/* Solar system stats */}
      <div className="metrics-grid">
        <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--green)' }}>8</div>
          <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Planets tracked</div>
        </div>
        <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--amber)' }}>1.3M+</div>
          <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Known asteroids</div>
        </div>
        <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg2)' }}>
          <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--blue)' }}>10⁻⁸</div>
          <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Prediction accuracy (arcsec)</div>
        </div>
      </div>

      <ChipPresets chips={MOTION_CHIPS} onSelect={setInput} />

      <InputArea
        label="Kaunsi celestial body ki motion predict karni hai?"
        placeholder="e.g. Ek newly discovered asteroid mass 10^12 kg, velocity 25 km/s, distance 2 AU from Sun — agle 5 saal ki orbit predict karo..."
        hint="Newtonian mechanics + AI = Principia 2.0"
        buttonText="Predict karo →"
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
        scientistIcon="🔭"
        scientistRole="Orbital Mechanics & Trajectory Prediction"
        emptyIcon="🔭"
        emptyText="Newton apna telescope ready kar raha hai... trajectory batao!"
      />

      <ToolArticles groupIdx={1} chips={MOTION_CHIPS} color="var(--green)" title="Orbital Mechanics Research" />
    </div>
  );
}
