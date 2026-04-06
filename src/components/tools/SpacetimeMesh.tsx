'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useAskTool } from '@/hooks/useAskTool';
import { SPACETIMEMESH_CHIPS } from '@/lib/constants';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ToolArticles from '@/components/shared/ToolArticles';

const SpacetimeMeshScene = dynamic(() => import('@/components/3d/SpacetimeMeshScene'), { ssr: false });
import FormulaBar from '@/components/shared/FormulaBar';
import SliderInput from '@/components/shared/SliderInput';
import ChipPresets from '@/components/shared/ChipPresets';
import InputArea from '@/components/shared/InputArea';
import ResponsePanel from '@/components/shared/ResponsePanel';

export default function SpacetimeMesh() {
  const [mass, setMass] = useState(10);
  const [input, setInput] = useState('');
  const { isLoading, response, error, ask } = useAskTool();

  // Schwarzschild radius: r_s = 2GM/c²
  const G = 6.674e-11;
  const c = 3e8;
  const M_sun = 1.989e30;
  const M = mass * M_sun;
  const rs = (2 * G * M) / (c * c);
  const rsKm = (rs / 1000).toFixed(1);

  // Kretschner scalar (curvature) at r = 3*rs
  const r = 3 * rs;
  const K = (48 * G * G * M * M) / (c * c * c * c * r * r * r * r * r * r);

  // Surface gravity
  const surfaceGravity = (c * c * c * c) / (4 * G * M);
  const gForce = (surfaceGravity / 9.8).toExponential(1);

  const handleSubmit = () => {
    if (!input.trim()) return;
    ask('spacetimemesh', undefined, input, {
      mass: `${mass} solar masses`,
      schwarzschildRadius: `${rsKm} km`,
      curvature: K.toExponential(2),
    });
  };

  return (
    <div>
      <SpacetimeMeshScene />
      <div className="mb-5">
        <ScientistBadge initial="E" name="Albert Einstein" subtitle="Spacetime tells matter how to move — matter tells spacetime how to curve" bgColor="var(--adim)" textColor="var(--amber)" />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Spacetime Mesh Visualizer
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Einstein: &quot;Gravity koi force nahi hai — yeh spacetime ka curvature hai! Mass spacetime ko curve karti hai, aur curved spacetime matter ko move karati hai. Yeh mesh dekhkar samjho!&quot;
        </div>
      </div>

      <FormulaBar formula="R_μν − ½g_μν R + Λg_μν = (8πG/c⁴)T_μν  ·  r_s = 2GM/c²" />

      {/* Live calculator */}
      <div className="rounded-[14px] border border-bd p-4 mb-3" style={{ background: 'var(--bg2)' }}>
        <SliderInput
          label="Mass (solar masses M☉)"
          min={1}
          max={100}
          value={mass}
          onChange={setMass}
          unit="M☉"
          color="var(--amber)"
        />
        <div className="metrics-grid" style={{ marginTop: 12 }}>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--amber)' }}>
              {rsKm} km
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Schwarzschild Radius</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--blue)' }}>
              {K.toExponential(1)}
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Curvature at 3r_s</div>
          </div>
          <div className="border border-bd rounded-xl p-3 text-center" style={{ background: 'var(--bg3)' }}>
            <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 18, color: 'var(--green)' }}>
              {gForce} g
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t2)' }}>Surface Gravity</div>
          </div>
        </div>
        <div className="text-[13px] mt-3 text-center" style={{ color: 'var(--t3)' }}>
          {mass} M☉ mass — event horizon {rsKm} km pe, uske andar se light bhi escape nahi kar sakti
        </div>
      </div>

      <ChipPresets chips={SPACETIMEMESH_CHIPS} onSelect={setInput} />

      <InputArea
        label="Spacetime curvature ke baare mein poochho"
        placeholder="e.g. Neutron star ke paas spacetime kitna curve hota hai? Frame dragging kya hai? Black hole ke andar geodesics kaise dikhti hain?"
        hint="Einstein full GR math ke saath jawab dega"
        buttonText="Visualize karo →"
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
        scientistIcon="🕸️"
        scientistRole="General Relativity & Spacetime Curvature"
        emptyIcon="🕸️"
        emptyText="Einstein spacetime ka mesh calculate kar raha hai... scenario batao!"
      />

      <ToolArticles groupIdx={3} chips={SPACETIMEMESH_CHIPS} color="var(--amber)" title="Spacetime Engineering Research" />
    </div>
  );
}
