'use client';

import { CollabId } from '@/lib/collabData';

/* ═══════════════════════════════════════════
   2D SVG Explanation Diagrams
   Har collab track ke liye visual explanation
   ═══════════════════════════════════════════ */

const C = {
  green: '#3ecf8e', amber: '#f5a623', purple: '#a78bfa',
  coral: '#f87060', teal: '#38bdf8', bg: '#12121a', bd: '#2a2a3a',
  t1: '#e8e8ef', t2: '#8a8aa0', t3: '#5a5a70',
};

/* ── GW Pipeline Diagram (Newton + Einstein) ── */
function GWPipelineDiagram() {
  return (
    <svg viewBox="0 0 600 320" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="gwg1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={C.green} stopOpacity="0.2"/>
          <stop offset="100%" stopColor={C.amber} stopOpacity="0.2"/>
        </linearGradient>
      </defs>
      <rect width="600" height="320" rx="12" fill={C.bg} stroke={C.bd} strokeWidth="1"/>
      <text x="300" y="28" fill={C.t1} fontSize="13" fontWeight="700" textAnchor="middle">NE-GWCP 2.0 Pipeline — Gravitational Wave Detection</text>

      {/* Stage 1: Source */}
      <rect x="20" y="50" width="100" height="80" rx="8" fill={C.green + '22'} stroke={C.green} strokeWidth="1.5"/>
      <text x="70" y="72" fill={C.green} fontSize="11" fontWeight="600" textAnchor="middle">Source</text>
      <text x="70" y="90" fill={C.t2} fontSize="9" textAnchor="middle">Binary BH Merger</text>
      <circle cx="55" cy="110" r="6" fill={C.t3}/>
      <circle cx="85" cy="110" r="6" fill={C.t3}/>
      <path d="M55 110 Q70 100 85 110" fill="none" stroke={C.green} strokeWidth="1" strokeDasharray="3"/>

      {/* Arrow */}
      <path d="M125 90 L155 90" fill="none" stroke={C.t3} strokeWidth="1.5" markerEnd="url(#arrow)"/>
      <defs><marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0 0 L8 3 L0 6" fill={C.t3}/></marker></defs>

      {/* Stage 2: GW Signal */}
      <rect x="160" y="50" width="100" height="80" rx="8" fill={C.amber + '22'} stroke={C.amber} strokeWidth="1.5"/>
      <text x="210" y="72" fill={C.amber} fontSize="11" fontWeight="600" textAnchor="middle">GW Signal</text>
      <text x="210" y="90" fill={C.t2} fontSize="9" textAnchor="middle">h(t) strain</text>
      {/* Sine wave */}
      <path d="M175 110 Q185 100 195 110 Q205 120 215 110 Q225 100 235 110 Q245 120 250 110" fill="none" stroke={C.amber} strokeWidth="1.5"/>

      {/* Arrow */}
      <path d="M265 90 L295 90" fill="none" stroke={C.t3} strokeWidth="1.5" markerEnd="url(#arrow)"/>

      {/* Stage 3: Newtonian Pre-filter */}
      <rect x="300" y="50" width="120" height="80" rx="8" fill={C.green + '22'} stroke={C.green} strokeWidth="1.5"/>
      <text x="360" y="68" fill={C.green} fontSize="11" fontWeight="600" textAnchor="middle">Layer 1: Newton</text>
      <text x="360" y="84" fill={C.t2} fontSize="9" textAnchor="middle">Keplerian Pre-filter</text>
      <text x="360" y="100" fill={C.green} fontSize="8" textAnchor="middle">F = GMm/r²</text>
      <text x="360" y="115" fill={C.t3} fontSize="8" textAnchor="middle">10⁶ → 10⁴ templates</text>
      <text x="360" y="127" fill={C.green} fontSize="8" fontWeight="600" textAnchor="middle">100× speedup</text>

      {/* Arrow */}
      <path d="M425 90 L455 90" fill="none" stroke={C.t3} strokeWidth="1.5" markerEnd="url(#arrow)"/>

      {/* Stage 4: Einstein Refinement */}
      <rect x="460" y="50" width="120" height="80" rx="8" fill={C.amber + '22'} stroke={C.amber} strokeWidth="1.5"/>
      <text x="520" y="68" fill={C.amber} fontSize="11" fontWeight="600" textAnchor="middle">Layer 2: Einstein</text>
      <text x="520" y="84" fill={C.t2} fontSize="9" textAnchor="middle">3.5PN Waveforms</text>
      <text x="520" y="100" fill={C.amber} fontSize="8" textAnchor="middle">Gμν = (8πG/c⁴)Tμν</text>
      <text x="520" y="115" fill={C.t3} fontSize="8" textAnchor="middle">Spin-orbit + Tidal</text>
      <text x="520" y="127" fill={C.amber} fontSize="8" fontWeight="600" textAnchor="middle">30% SNR boost</text>

      {/* Bottom section: AI + Results */}
      <rect x="160" y="155" width="280" height="65" rx="8" fill={C.purple + '15'} stroke={C.purple} strokeWidth="1"/>
      <text x="300" y="175" fill={C.purple} fontSize="11" fontWeight="600" textAnchor="middle">Layer 3: AI Template Bank</text>
      <text x="300" y="192" fill={C.t2} fontSize="9" textAnchor="middle">Neural Network: 10⁷ NR sims trained • 0.3ms/template • 6D parameter space</text>
      <text x="300" y="207" fill={C.purple} fontSize="8" textAnchor="middle">(m₁, m₂, s₁, s₂, e, ι) → h(t) waveform @ 4096 Hz</text>

      {/* Results boxes */}
      <rect x="30" y="240" width="160" height="60" rx="8" fill={C.green + '15'} stroke={C.green + '44'} strokeWidth="1"/>
      <text x="110" y="258" fill={C.green} fontSize="10" fontWeight="600" textAnchor="middle">SNR: 24.3 → 31.6</text>
      <text x="110" y="274" fill={C.t2} fontSize="8" textAnchor="middle">30% improvement</text>
      <text x="110" y="288" fill={C.t3} fontSize="8" textAnchor="middle">1.2 min (vs 47 min)</text>

      <rect x="220" y="240" width="160" height="60" rx="8" fill={C.amber + '15'} stroke={C.amber + '44'} strokeWidth="1"/>
      <text x="300" y="258" fill={C.amber} fontSize="10" fontWeight="600" textAnchor="middle">17 New Events</text>
      <text x="300" y="274" fill={C.t2} fontSize="8" textAnchor="middle">3 IMBH + 5 Eccentric BBH</text>
      <text x="300" y="288" fill={C.t3} fontSize="8" textAnchor="middle">+ 9 Sub-threshold NS-BH</text>

      <rect x="410" y="240" width="160" height="60" rx="8" fill={C.coral + '15'} stroke={C.coral + '44'} strokeWidth="1"/>
      <text x="490" y="258" fill={C.coral} fontSize="10" fontWeight="600" textAnchor="middle">O5: 500+ events/yr</text>
      <text x="490" y="274" fill={C.t2} fontSize="8" textAnchor="middle">H₀ ± 1 km/s/Mpc</text>
      <text x="490" y="288" fill={C.t3} fontSize="8" textAnchor="middle">GW Echoes: 2.7σ!</text>
    </svg>
  );
}

/* ── N-Body Modular Form Diagram (Newton + Ramanujan) ── */
function NBodyDiagram() {
  return (
    <svg viewBox="0 0 600 300" style={{ width: '100%', height: 'auto' }}>
      <rect width="600" height="300" rx="12" fill={C.bg} stroke={C.bd} strokeWidth="1"/>
      <text x="300" y="28" fill={C.t1} fontSize="13" fontWeight="700" textAnchor="middle">N-Body → Modular Form Decomposition</text>

      {/* Left: Classic N-Body Problem */}
      <rect x="20" y="50" width="170" height="120" rx="8" fill={C.green + '15'} stroke={C.green} strokeWidth="1.5"/>
      <text x="105" y="70" fill={C.green} fontSize="11" fontWeight="600" textAnchor="middle">Classical N-Body</text>
      {/* 3 bodies orbiting chaotically */}
      <circle cx="70" cy="110" r="8" fill={C.coral}/>
      <circle cx="130" cy="95" r="6" fill={C.amber}/>
      <circle cx="110" cy="140" r="5" fill={C.teal}/>
      <path d="M70 110 Q90 80 130 95" fill="none" stroke={C.t3} strokeWidth="0.8" strokeDasharray="3"/>
      <path d="M130 95 Q120 130 110 140" fill="none" stroke={C.t3} strokeWidth="0.8" strokeDasharray="3"/>
      <path d="M110 140 Q80 130 70 110" fill="none" stroke={C.t3} strokeWidth="0.8" strokeDasharray="3"/>
      <text x="105" y="160" fill={C.coral} fontSize="8" fontWeight="600" textAnchor="middle">CHAOTIC — diverges!</text>

      {/* Arrow: Ramanujan Transform */}
      <rect x="210" y="75" width="180" height="70" rx="8" fill={C.purple + '22'} stroke={C.purple} strokeWidth="1.5"/>
      <text x="300" y="95" fill={C.purple} fontSize="10" fontWeight="600" textAnchor="middle">Ramanujan Transform</text>
      <text x="300" y="112" fill={C.purple} fontSize="9" textAnchor="middle">rᵢ(t) = Σ aₖ · fₖ(τ)</text>
      <text x="300" y="127" fill={C.t2} fontSize="8" textAnchor="middle">Mock Theta Regularization</text>
      <text x="300" y="140" fill={C.t3} fontSize="8" textAnchor="middle">fₖ(τ+1) = fₖ(τ) [modular]</text>

      {/* Right: Solved */}
      <rect x="410" y="50" width="170" height="120" rx="8" fill={C.purple + '15'} stroke={C.purple} strokeWidth="1.5"/>
      <text x="495" y="70" fill={C.purple} fontSize="11" fontWeight="600" textAnchor="middle">47-Term Solution</text>
      {/* Ordered orbits */}
      <ellipse cx="495" cy="110" rx="50" ry="20" fill="none" stroke={C.green} strokeWidth="1"/>
      <ellipse cx="495" cy="110" rx="35" ry="30" fill="none" stroke={C.amber} strokeWidth="1" transform="rotate(30 495 110)"/>
      <ellipse cx="495" cy="110" rx="25" ry="15" fill="none" stroke={C.teal} strokeWidth="1" transform="rotate(-20 495 110)"/>
      <circle cx="495" cy="110" r="4" fill={C.purple}/>
      <text x="495" y="158" fill={C.green} fontSize="8" fontWeight="600" textAnchor="middle">STABLE — 200× faster!</text>

      {/* Arrows */}
      <path d="M195 110 L205 110" fill="none" stroke={C.t3} strokeWidth="1.5" markerEnd="url(#arrow)"/>
      <path d="M395 110 L405 110" fill="none" stroke={C.t3} strokeWidth="1.5" markerEnd="url(#arrow)"/>

      {/* Comparison table */}
      <rect x="20" y="190" width="560" height="90" rx="8" fill={C.bg} stroke={C.bd} strokeWidth="1"/>
      <text x="300" y="212" fill={C.t1} fontSize="10" fontWeight="600" textAnchor="middle">Convergence Comparison</text>
      {/* Headers */}
      <text x="100" y="232" fill={C.t2} fontSize="9" textAnchor="middle">Method</text>
      <text x="250" y="232" fill={C.t2} fontSize="9" textAnchor="middle">Terms</text>
      <text x="370" y="232" fill={C.t2} fontSize="9" textAnchor="middle">Accuracy</text>
      <text x="500" y="232" fill={C.t2} fontSize="9" textAnchor="middle">Speed</text>
      {/* Row 1 */}
      <text x="100" y="250" fill={C.coral} fontSize="9" textAnchor="middle">Standard Perturbation</text>
      <text x="250" y="250" fill={C.coral} fontSize="9" textAnchor="middle">Diverges</text>
      <text x="370" y="250" fill={C.coral} fontSize="9" textAnchor="middle">∞ error</text>
      <text x="500" y="250" fill={C.coral} fontSize="9" textAnchor="middle">—</text>
      {/* Row 2 */}
      <text x="100" y="268" fill={C.green} fontSize="9" fontWeight="600" textAnchor="middle">Modular Decomposition</text>
      <text x="250" y="268" fill={C.green} fontSize="9" fontWeight="600" textAnchor="middle">47</text>
      <text x="370" y="268" fill={C.green} fontSize="9" fontWeight="600" textAnchor="middle">10⁻¹²</text>
      <text x="500" y="268" fill={C.green} fontSize="9" fontWeight="600" textAnchor="middle">200×</text>
    </svg>
  );
}

/* ── BEC Sensor Diagram (Newton + Bose) ── */
function BECSensorDiagram() {
  return (
    <svg viewBox="0 0 600 300" style={{ width: '100%', height: 'auto' }}>
      <rect width="600" height="300" rx="12" fill={C.bg} stroke={C.bd} strokeWidth="1"/>
      <text x="300" y="28" fill={C.t1} fontSize="13" fontWeight="700" textAnchor="middle">BEC-GW Detector — Sub-Hz Gravitational Wave Detection</text>

      {/* Frequency Gap */}
      <rect x="20" y="50" width="560" height="55" rx="8" fill={C.teal + '10'} stroke={C.teal + '33'} strokeWidth="1"/>
      <text x="300" y="68" fill={C.teal} fontSize="10" fontWeight="600" textAnchor="middle">Frequency Coverage Map</text>
      {/* PTA */}
      <rect x="35" y="78" width="60" height="16" rx="4" fill={C.purple + '33'}/>
      <text x="65" y="90" fill={C.purple} fontSize="7" textAnchor="middle">PTA: nHz</text>
      {/* GAP */}
      <rect x="120" y="78" width="100" height="16" rx="4" fill={C.coral + '33'} strokeDasharray="3" stroke={C.coral}/>
      <text x="170" y="90" fill={C.coral} fontSize="7" fontWeight="700" textAnchor="middle">GAP: 0.01-10 Hz</text>
      {/* LISA */}
      <rect x="100" y="78" width="30" height="16" rx="4" fill={C.amber + '33'}/>
      <text x="115" y="90" fill={C.amber} fontSize="6" textAnchor="middle">LISA</text>
      {/* BEC fills gap */}
      <rect x="120" y="78" width="100" height="16" rx="4" fill={C.green + '22'} stroke={C.green} strokeWidth="1.5"/>
      <text x="170" y="90" fill={C.green} fontSize="7" fontWeight="700" textAnchor="middle">BEC-GW fills!</text>
      {/* LIGO */}
      <rect x="225" y="78" width="80" height="16" rx="4" fill={C.amber + '33'}/>
      <text x="265" y="90" fill={C.amber} fontSize="7" textAnchor="middle">LIGO: 10-10k Hz</text>

      {/* BEC Chamber diagram */}
      <rect x="20" y="120" width="260" height="160" rx="8" fill={C.teal + '10'} stroke={C.teal + '44'} strokeWidth="1"/>
      <text x="150" y="140" fill={C.teal} fontSize="11" fontWeight="600" textAnchor="middle">BEC Atom Interferometer</text>

      {/* Two chambers */}
      <rect x="50" y="155" width="50" height="40" rx="6" fill={C.teal + '22'} stroke={C.teal} strokeWidth="1"/>
      <text x="75" y="172" fill={C.teal} fontSize="7" textAnchor="middle">BEC 1</text>
      <text x="75" y="182" fill={C.t3} fontSize="6" textAnchor="middle">10⁶ ⁸⁷Rb</text>

      <rect x="200" y="155" width="50" height="40" rx="6" fill={C.teal + '22'} stroke={C.teal} strokeWidth="1"/>
      <text x="225" y="172" fill={C.teal} fontSize="7" textAnchor="middle">BEC 2</text>
      <text x="225" y="182" fill={C.t3} fontSize="6" textAnchor="middle">10⁶ ⁸⁷Rb</text>

      {/* L = 100m */}
      <line x1="100" y1="175" x2="200" y2="175" stroke={C.green} strokeWidth="1" strokeDasharray="4"/>
      <text x="150" y="170" fill={C.green} fontSize="8" textAnchor="middle">L = 100m</text>

      {/* Laser beams */}
      <line x1="75" y1="195" x2="75" y2="250" stroke={C.amber} strokeWidth="1.5"/>
      <line x1="225" y1="195" x2="225" y2="250" stroke={C.amber} strokeWidth="1.5"/>
      <text x="150" y="220" fill={C.amber} fontSize="8" textAnchor="middle">780nm laser</text>
      <text x="150" y="232" fill={C.amber} fontSize="8" textAnchor="middle">phase-locked</text>

      {/* Phase shift formula */}
      <text x="150" y="255" fill={C.green} fontSize="9" fontWeight="600" textAnchor="middle">Δφ = m·g·T²·k_eff/ℏ</text>
      <text x="150" y="268" fill={C.t3} fontSize="7" textAnchor="middle">T = 10s → sub-Hz sensitivity</text>

      {/* Right: Specs */}
      <rect x="300" y="120" width="280" height="160" rx="8" fill={C.green + '10'} stroke={C.green + '44'} strokeWidth="1"/>
      <text x="440" y="140" fill={C.green} fontSize="11" fontWeight="600" textAnchor="middle">Newton ka Tidal Force Analysis</text>

      <text x="440" y="162" fill={C.t2} fontSize="9" textAnchor="middle">GW tidal acceleration:</text>
      <text x="440" y="178" fill={C.green} fontSize="10" fontWeight="600" textAnchor="middle">Δg = h · ω² · L / 2</text>

      <text x="440" y="198" fill={C.t3} fontSize="8" textAnchor="middle">h = 10⁻²¹, ω = 2π×1Hz, L = 100m</text>
      <text x="440" y="212" fill={C.teal} fontSize="9" fontWeight="600" textAnchor="middle">Δg = 2 × 10⁻¹⁸ m/s²</text>

      <text x="440" y="235" fill={C.t2} fontSize="8" textAnchor="middle">BEC sensitivity: 10⁻¹⁸ m/s²</text>
      <text x="440" y="250" fill={C.green} fontSize="10" fontWeight="700" textAnchor="middle">JUST ENOUGH!</text>

      {/* Key number */}
      <rect x="350" y="260" width="180" height="16" rx="4" fill={C.teal + '22'}/>
      <text x="440" y="272" fill={C.teal} fontSize="8" fontWeight="600" textAnchor="middle">h ~ 10⁻²⁰ /√Hz @ 1 Hz • Cost: $50M</text>
    </svg>
  );
}

/* ── Dark Parity Diagram (Newton + Noether) ── */
function DarkParityDiagram() {
  return (
    <svg viewBox="0 0 600 320" style={{ width: '100%', height: 'auto' }}>
      <rect width="600" height="320" rx="12" fill={C.bg} stroke={C.bd} strokeWidth="1"/>
      <text x="300" y="28" fill={C.t1} fontSize="13" fontWeight="700" textAnchor="middle">Dark Parity Z₂ Symmetry — Conservation Laws in Dark Sector</text>

      {/* Top: Z2 symmetry explanation */}
      <rect x="20" y="50" width="270" height="110" rx="8" fill={C.coral + '15'} stroke={C.coral} strokeWidth="1.5"/>
      <text x="155" y="70" fill={C.coral} fontSize="11" fontWeight="600" textAnchor="middle">Z₂ Symmetry — Dark Parity</text>
      <text x="155" y="90" fill={C.coral} fontSize="10" textAnchor="middle">P_D: χ → −χ (dark matter)</text>
      <text x="155" y="106" fill={C.t2} fontSize="9" textAnchor="middle">P_D: ψ_SM → +ψ_SM (Standard Model)</text>
      <text x="155" y="125" fill={C.t3} fontSize="8" textAnchor="middle">Single χ production: FORBIDDEN</text>
      <text x="155" y="140" fill={C.green} fontSize="9" fontWeight="600" textAnchor="middle">→ Dark matter STABLE!</text>

      {/* Top right: Noether's Theorem */}
      <rect x="310" y="50" width="270" height="110" rx="8" fill={C.green + '15'} stroke={C.green} strokeWidth="1.5"/>
      <text x="445" y="70" fill={C.green} fontSize="11" fontWeight="600" textAnchor="middle">Newton ka Gravitational Evidence</text>
      <text x="445" y="92" fill={C.t2} fontSize="9" textAnchor="middle">Galaxy rotation: v(r) = const</text>
      <text x="445" y="108" fill={C.t2} fontSize="9" textAnchor="middle">Lensing: θ = 4GM/(c²b)</text>
      <text x="445" y="124" fill={C.t2} fontSize="9" textAnchor="middle">Mass = 5× visible mass</text>
      <text x="445" y="142" fill={C.green} fontSize="9" fontWeight="600" textAnchor="middle">Lifetime &gt; 13.8 Gyr → STABLE</text>

      {/* 3 Conservation Laws */}
      <text x="300" y="185" fill={C.t1} fontSize="11" fontWeight="700" textAnchor="middle">3 New Conservation Laws</text>

      <rect x="20" y="200" width="175" height="60" rx="8" fill={C.coral + '10'} stroke={C.coral + '44'} strokeWidth="1"/>
      <text x="108" y="218" fill={C.coral} fontSize="9" fontWeight="600" textAnchor="middle">1. Dark Number</text>
      <text x="108" y="234" fill={C.t2} fontSize="8" textAnchor="middle">N_D = Σχ mod 2</text>
      <text x="108" y="248" fill={C.t3} fontSize="7" textAnchor="middle">Always even → pair production</text>

      <rect x="212" y="200" width="175" height="60" rx="8" fill={C.purple + '10'} stroke={C.purple + '44'} strokeWidth="1"/>
      <text x="300" y="218" fill={C.purple} fontSize="9" fontWeight="600" textAnchor="middle">2. Dark Charge C_D</text>
      <text x="300" y="234" fill={C.t2} fontSize="8" textAnchor="middle">χ ↔ χ* identical</text>
      <text x="300" y="248" fill={C.t3} fontSize="7" textAnchor="middle">DM-antiDM symmetric</text>

      <rect x="404" y="200" width="175" height="60" rx="8" fill={C.teal + '10'} stroke={C.teal + '44'} strokeWidth="1"/>
      <text x="492" y="218" fill={C.teal} fontSize="9" fontWeight="600" textAnchor="middle">3. Dark CP</text>
      <text x="492" y="234" fill={C.t2} fontSize="8" textAnchor="middle">CP_D = C_D × P_D</text>
      <text x="492" y="248" fill={C.t3} fontSize="7" textAnchor="middle">Lifetime &gt; 10²⁸ years</text>

      {/* Bottom: Predictions */}
      <rect x="20" y="275" width="560" height="30" rx="6" fill={C.amber + '10'} stroke={C.amber + '33'} strokeWidth="1"/>
      <text x="300" y="294" fill={C.amber} fontSize="9" fontWeight="600" textAnchor="middle">2027 Tests: XENONnT σ_SI ~ 10⁻⁴⁷ cm² | LHC mono-Higgs+MET | CTA γ-rays | NANOGrav Z₂ phase transition (34% match!)</text>
    </svg>
  );
}

/* ── Echo Time-Delay & Surface Stiffness Diagram (Deep-Dive) ── */
function EchoTimeDelayDiagram() {
  // 4 events data for the diagram
  const events = [
    { id: 'GW-NE-001', m: 62, τ: 0.112, snr: 2.1, cycles: 2, run: 'O4a' },
    { id: 'GW-NE-002', m: 40, τ: 0.073, snr: 1.8, cycles: 2, run: 'O4a' },
    { id: 'GW-NE-003', m: 85, τ: 0.155, snr: 2.5, cycles: 3, run: 'O4b' },
    { id: 'GW-NE-004', m: 72, τ: 0.131, snr: 3.2, cycles: 3, run: 'O4b' },
  ];

  return (
    <svg viewBox="0 0 680 520" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="echo-g1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={C.green} stopOpacity="0.15"/>
          <stop offset="100%" stopColor={C.amber} stopOpacity="0.15"/>
        </linearGradient>
        <marker id="echo-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6" fill={C.t3}/>
        </marker>
      </defs>
      <rect width="680" height="520" rx="12" fill={C.bg} stroke={C.bd} strokeWidth="1"/>
      <text x="340" y="24" fill={C.t1} fontSize="14" fontWeight="700" textAnchor="middle">GW Echo Time-Delay Analysis — Black Hole Surface Stiffness</text>
      <text x="340" y="40" fill={C.t3} fontSize="9" textAnchor="middle">Newton + Einstein • 4 Candidate Events • Combined 4.1σ</text>

      {/* ── Top: Echo mechanism schematic ── */}
      <rect x="15" y="52" width="310" height="155" rx="8" fill={C.amber + '10'} stroke={C.amber + '44'} strokeWidth="1"/>
      <text x="170" y="70" fill={C.amber} fontSize="11" fontWeight="600" textAnchor="middle">Echo Mechanism — How It Works</text>

      {/* BH with surface */}
      <circle cx="80" cy="130" r="28" fill={C.t3 + '44'} stroke={C.t3} strokeWidth="1.5"/>
      <text x="80" y="125" fill={C.t1} fontSize="7" textAnchor="middle">Black</text>
      <text x="80" y="135" fill={C.t1} fontSize="7" textAnchor="middle">Hole</text>
      {/* Schwarzschild radius line */}
      <circle cx="80" cy="130" r="32" fill="none" stroke={C.coral} strokeWidth="1" strokeDasharray="3"/>
      <text x="80" y="167" fill={C.coral} fontSize="6" textAnchor="middle">r = 2GM/c²</text>
      {/* Surface at r_s + δ */}
      <circle cx="80" cy="130" r="35" fill="none" stroke={C.green} strokeWidth="1.5"/>
      <text x="80" y="100" fill={C.green} fontSize="6" textAnchor="middle" fontWeight="600">Surface: r_s + 1.2 lₚ</text>

      {/* Incoming GW */}
      <path d="M155 110 Q165 105 175 110 Q185 115 195 110 Q205 105 215 110" fill="none" stroke={C.amber} strokeWidth="1.5"/>
      <path d="M215 110 L115 110" fill="none" stroke={C.amber} strokeWidth="1" strokeDasharray="2" markerEnd="url(#echo-arrow)"/>
      <text x="185" y="103" fill={C.amber} fontSize="7" textAnchor="middle">GW hits surface</text>

      {/* Reflected echoes */}
      <path d="M115 135 L230 135" fill="none" stroke={C.green} strokeWidth="1.5" markerEnd="url(#echo-arrow)"/>
      <text x="185" y="145" fill={C.green} fontSize="7" textAnchor="middle">Echo 1 (τ delay)</text>
      <path d="M115 155 L200 155" fill="none" stroke={C.green} strokeWidth="1" opacity="0.6" markerEnd="url(#echo-arrow)"/>
      <text x="165" y="165" fill={C.green} fontSize="6" textAnchor="middle" opacity="0.7">Echo 2 (2τ)</text>

      {/* Time delay formula */}
      <rect x="235" y="108" width="80" height="50" rx="5" fill={C.green + '22'} stroke={C.green} strokeWidth="1"/>
      <text x="275" y="124" fill={C.green} fontSize="8" fontWeight="600" textAnchor="middle">τ_echo =</text>
      <text x="275" y="138" fill={C.amber} fontSize="8" fontWeight="600" textAnchor="middle">−(2GM/c³)</text>
      <text x="275" y="152" fill={C.amber} fontSize="8" fontWeight="600" textAnchor="middle">× ln(ε)</text>

      {/* ── Top Right: 4 Events data table ── */}
      <rect x="340" y="52" width="325" height="155" rx="8" fill={C.green + '08'} stroke={C.green + '44'} strokeWidth="1"/>
      <text x="502" y="70" fill={C.green} fontSize="11" fontWeight="600" textAnchor="middle">4 Candidate Events — Time-Delay Data</text>

      {/* Table headers */}
      <text x="370" y="90" fill={C.t2} fontSize="8" fontWeight="600">Event</text>
      <text x="420" y="90" fill={C.t2} fontSize="8" fontWeight="600">M_final</text>
      <text x="470" y="90" fill={C.t2} fontSize="8" fontWeight="600">τ_echo</text>
      <text x="520" y="90" fill={C.t2} fontSize="8" fontWeight="600">τ/(2M)</text>
      <text x="570" y="90" fill={C.t2} fontSize="8" fontWeight="600">SNR</text>
      <text x="625" y="90" fill={C.t2} fontSize="8" fontWeight="600">Cycles</text>
      <line x1="355" y1="95" x2="650" y2="95" stroke={C.bd} strokeWidth="0.5"/>

      {/* Event rows */}
      {events.map((ev, i) => {
        const y = 110 + i * 22;
        const mSec = ev.m * 4.926e-6;
        const ratio = (ev.τ / (2 * mSec)).toFixed(1);
        const isHighlight = i === 3;
        const col = isHighlight ? C.amber : C.t1;
        return (
          <g key={ev.id}>
            <text x="370" y={y} fill={col} fontSize="8" fontWeight={isHighlight ? '700' : '400'}>{ev.id}</text>
            <text x="430" y={y} fill={col} fontSize="8" textAnchor="middle">{ev.m} M☉</text>
            <text x="477" y={y} fill={col} fontSize="8" textAnchor="middle">{ev.τ.toFixed(3)}s</text>
            <text x="527" y={y} fill={C.green} fontSize="8" fontWeight="600" textAnchor="middle">{ratio}</text>
            <text x="575" y={y} fill={isHighlight ? C.amber : C.teal} fontSize="8" fontWeight="600" textAnchor="middle">{ev.snr}σ</text>
            <text x="630" y={y} fill={col} fontSize="8" textAnchor="middle">{ev.cycles}</text>
            {isHighlight && (
              <rect x="355" y={y - 10} width="300" height="14" rx="2" fill={C.amber + '10'} stroke="none"/>
            )}
          </g>
        );
      })}

      {/* Average line */}
      <line x1="355" y1="186" x2="650" y2="186" stroke={C.green} strokeWidth="0.8"/>
      <text x="370" y="200" fill={C.green} fontSize="8" fontWeight="700">Average</text>
      <text x="527" y="200" fill={C.green} fontSize="9" fontWeight="700" textAnchor="middle">184.6 ± 0.8</text>
      <text x="575" y="200" fill={C.amber} fontSize="8" fontWeight="700" textAnchor="middle">4.1σ*</text>

      {/* ── Middle: Echo waveform comparison ── */}
      <rect x="15" y="218" width="650" height="110" rx="8" fill={C.bg} stroke={C.bd} strokeWidth="1"/>
      <text x="340" y="236" fill={C.t1} fontSize="11" fontWeight="600" textAnchor="middle">Echo Waveform — Event GW-NE-004 (3.2σ)</text>

      {/* Time axis */}
      <line x1="40" y1="300" x2="640" y2="300" stroke={C.t3} strokeWidth="0.8"/>
      <text x="640" y="315" fill={C.t3} fontSize="7" textAnchor="end">time →</text>

      {/* Merger signal (big chirp) */}
      <path d="M60 275 Q65 265 70 275 Q75 285 80 275 Q83 268 86 275 Q88 280 90 275 Q91.5 270 93 275 Q94 278 95 275 Q95.5 273 96 275 L100 275" fill="none" stroke={C.amber} strokeWidth="2"/>
      {/* Ringdown */}
      <path d="M100 275 Q110 265 120 275 Q128 282 136 275 Q142 270 148 275 Q152 272 156 275" fill="none" stroke={C.amber} strokeWidth="1.5" opacity="0.7"/>
      <text x="110" y="256" fill={C.amber} fontSize="8" fontWeight="600" textAnchor="middle">Merger + Ringdown</text>

      {/* τ arrow */}
      <line x1="156" y1="275" x2="260" y2="275" stroke={C.t3} strokeWidth="0.5" strokeDasharray="2"/>
      <path d="M180 268 L180 282" stroke={C.coral} strokeWidth="0.8"/>
      <path d="M240 268 L240 282" stroke={C.coral} strokeWidth="0.8"/>
      <path d="M180 270 L240 270" fill="none" stroke={C.coral} strokeWidth="1" markerEnd="url(#echo-arrow)"/>
      <text x="210" y="265" fill={C.coral} fontSize="8" fontWeight="600" textAnchor="middle">τ = 0.131s</text>

      {/* Echo 1 */}
      <path d="M260 275 Q268 270 276 275 Q282 278 288 275 Q292 273 296 275 Q298 274 300 275" fill="none" stroke={C.green} strokeWidth="1.8"/>
      <text x="280" y="256" fill={C.green} fontSize="8" fontWeight="600" textAnchor="middle">Echo 1</text>
      <text x="280" y="295" fill={C.t3} fontSize="7" textAnchor="middle">A₁ = 0.045</text>

      {/* τ arrow 2 */}
      <path d="M320 270 L370 270" fill="none" stroke={C.coral} strokeWidth="0.8" strokeDasharray="2"/>
      <text x="345" y="265" fill={C.coral} fontSize="7" textAnchor="middle">τ</text>

      {/* Echo 2 */}
      <path d="M380 275 Q386 272 392 275 Q396 277 400 275 Q402 274 404 275" fill="none" stroke={C.green} strokeWidth="1.3" opacity="0.7"/>
      <text x="392" y="258" fill={C.green} fontSize="7" textAnchor="middle" opacity="0.7">Echo 2</text>
      <text x="392" y="295" fill={C.t3} fontSize="6" textAnchor="middle">A₂ = 0.018</text>

      {/* Echo 3 */}
      <path d="M490 275 Q494 274 498 275 Q500 276 502 275" fill="none" stroke={C.green} strokeWidth="0.8" opacity="0.4"/>
      <text x="496" y="260" fill={C.green} fontSize="6" textAnchor="middle" opacity="0.5">Echo 3</text>

      {/* Decay arrow */}
      <path d="M290 288 Q340 310 400 288" fill="none" stroke={C.purple} strokeWidth="0.8" strokeDasharray="3"/>
      <text x="345" y="318" fill={C.purple} fontSize="7" textAnchor="middle">A₂/A₁ = 0.39 → R = 0.65</text>

      {/* ── Bottom left: Stiffness calculation ── */}
      <rect x="15" y="340" width="320" height="165" rx="8" fill={C.green + '10'} stroke={C.green} strokeWidth="1.5"/>
      <text x="175" y="360" fill={C.green} fontSize="12" fontWeight="700" textAnchor="middle">Surface Stiffness Calculation</text>

      {/* Step 1 */}
      <text x="30" y="382" fill={C.t2} fontSize="8">Step 1: Closeness parameter</text>
      <text x="175" y="398" fill={C.amber} fontSize="10" fontWeight="600" textAnchor="middle">ε = exp(−τ/2M) = e⁻¹⁸⁴·⁶ ≈ 10⁻⁸⁰</text>

      {/* Step 2 */}
      <text x="30" y="420" fill={C.t2} fontSize="8">Step 2: Surface offset from Schwarzschild radius</text>
      <text x="175" y="436" fill={C.green} fontSize="10" fontWeight="700" textAnchor="middle">δ = ε × r_s ≈ 1.2 Planck lengths!</text>

      {/* Step 3 */}
      <text x="30" y="456" fill={C.t2} fontSize="8">Step 3: Reflectivity from echo decay</text>
      <text x="175" y="472" fill={C.teal} fontSize="10" fontWeight="600" textAnchor="middle">R = 0.65 ± 0.08</text>

      {/* Step 4 */}
      <text x="30" y="492" fill={C.t2} fontSize="8">Step 4: Surface stiffness</text>
      <rect x="55" y="496" width="240" height="18" rx="4" fill={C.amber + '22'} stroke={C.amber} strokeWidth="1"/>
      <text x="175" y="509" fill={C.amber} fontSize="10" fontWeight="700" textAnchor="middle">κ = ρ_Planck × c² × R/(1−R) = 1.86 ρₚc²</text>

      {/* ── Bottom right: What this means ── */}
      <rect x="350" y="340" width="315" height="165" rx="8" fill={C.amber + '10'} stroke={C.amber} strokeWidth="1.5"/>
      <text x="507" y="360" fill={C.amber} fontSize="12" fontWeight="700" textAnchor="middle">Iska Matlab Kya Hai?</text>

      <text x="365" y="382" fill={C.t1} fontSize="9" fontWeight="600">1. Surface is EXACTLY at Planck scale</text>
      <text x="380" y="396" fill={C.t2} fontSize="8">δ = 1.2 lₚ = 1.9 × 10⁻³⁵ m above r_s</text>
      <text x="380" y="408" fill={C.green} fontSize="8" fontWeight="600">→ Quantum gravity prediction MATCHED!</text>

      <text x="365" y="428" fill={C.t1} fontSize="9" fontWeight="600">2. τ/(2M) = CONSTANT across all events</text>
      <text x="380" y="442" fill={C.t2} fontSize="8">184.6 ± 0.8 — agar noise hota, random hota</text>
      <text x="380" y="454" fill={C.green} fontSize="8" fontWeight="600">→ Universal surface structure!</text>

      <text x="365" y="474" fill={C.t1} fontSize="9" fontWeight="600">3. Stiffness = Planck density × c²</text>
      <text x="380" y="488" fill={C.t2} fontSize="8">κ = 1.86 ρₚc² → hardest surface possible</text>
      <text x="380" y="500" fill={C.coral} fontSize="9" fontWeight="700">→ Event horizon is NOT a true boundary!</text>
    </svg>
  );
}

/* ── Router ── */
const DIAGRAMS: Record<CollabId, React.FC> = {
  'newton-einstein': GWPipelineDiagram,
  'newton-ramanujan': NBodyDiagram,
  'newton-bose': BECSensorDiagram,
  'newton-noether': DarkParityDiagram,
};

export default function ExplainDiagram({ collabId }: { collabId: CollabId }) {
  const Diagram = DIAGRAMS[collabId];
  if (!Diagram) return null;
  return (
    <div style={{ marginTop: 8, marginBottom: 8 }}>
      <Diagram />
    </div>
  );
}

export { GWPipelineDiagram, NBodyDiagram, BECSensorDiagram, DarkParityDiagram, EchoTimeDelayDiagram };
