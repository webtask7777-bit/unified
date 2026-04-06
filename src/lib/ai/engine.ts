/**
 * Offline Physics Intelligence Engine
 * No API needed — keyword matching + physics computation + knowledge base
 * Different questions → different answers. Numbers → computed results.
 */

// ─── Number & Keyword Extraction ───

interface ParsedInput {
  numbers: { value: number; unit: string; raw: string }[];
  keywords: string[];
  text: string;
}

const UNIT_PATTERNS: [RegExp, string][] = [
  [/(\d+\.?\d*)\s*c\b/, 'c'],
  [/(\d+\.?\d*)\s*km\/s/, 'km/s'],
  [/(\d+\.?\d*)\s*m\/s/, 'm/s'],
  [/(\d+\.?\d*)\s*(?:solar masses|M☉|msun)/, 'M☉'],
  [/(\d+\.?\d*)\s*(?:kg)/, 'kg'],
  [/(\d+\.?\d*)\s*(?:kpc|Kpc)/, 'kpc'],
  [/(\d+\.?\d*)\s*(?:ly|light[ -]?years?)/, 'ly'],
  [/(\d+\.?\d*)\s*(?:km)/, 'km'],
  [/(\d+\.?\d*)\s*(?:meters?|m)\b/, 'm'],
  [/(\d+\.?\d*)\s*(?:GeV|gev)/, 'GeV'],
  [/(\d+\.?\d*)\s*(?:eV|ev)/, 'eV'],
  [/(\d+\.?\d*)\s*(?:K|kelvin)/, 'K'],
  [/(\d+\.?\d*)\s*(?:seconds?|sec|s)\b/, 's'],
  [/(\d+\.?\d*)\s*(?:years?)/, 'yr'],
  [/(\d+\.?\d*)\s*(?:AU|au)/, 'AU'],
  [/(\d+\.?\d*)\s*(?:Hz|hz)/, 'Hz'],
  [/(\d+\.?\d*)\s*%/, '%'],
];

const PHYSICS_KEYWORDS = [
  'gravity', 'gravitational', 'mass', 'force', 'acceleration',
  'velocity', 'speed', 'orbit', 'planet', 'satellite', 'asteroid', 'trajectory',
  'time', 'dilation', 'twin', 'paradox', 'gps', 'clock', 'aging', 'relativity',
  'wormhole', 'exotic', 'traverse', 'throat', 'bridge', 'tunnel',
  'dark matter', 'rotation curve', 'halo', 'wimp', 'axion', 'lensing', 'galaxy',
  'spacetime', 'curvature', 'metric', 'tensor', 'geodesic', 'riemann',
  'fusion', 'energy', 'plasma', 'reactor', 'deuterium', 'tritium', 'fission',
  'symmetry', 'breaking', 'higgs', 'boson', 'phase', 'transition', 'conservation',
  'series', 'sum', 'convergence', 'partition', 'infinite', 'zeta', 'pi', 'ramanujan',
  'entanglement', 'bell', 'qubit', 'decoherence', 'teleportation', 'superposition',
  'unified', 'string', 'theory', 'quantum gravity', 'loop', 'planck',
  'black hole', 'event horizon', 'singularity', 'hawking', 'radiation',
  'neutron star', 'pulsar', 'magnetar',
  'big bang', 'inflation', 'cosmic', 'cmb', 'microwave', 'expansion',
  'mars', 'moon', 'earth', 'sun', 'jupiter', 'venus', 'mercury', 'saturn',
  'light', 'photon', 'spectrum', 'wavelength', 'frequency',
  'electron', 'proton', 'neutron', 'quark', 'lepton', 'muon',
  'nuclear', 'decay', 'half-life', 'radioactive',
  'superconductor', 'bec', 'condensate', 'superfluid',
  'entropy', 'thermodynamics', 'boltzmann',
  'wave', 'particle', 'duality', 'interference', 'diffraction',
  'magnetic', 'electric', 'field', 'maxwell', 'electromagnetic',
];

function parseInput(input: string): ParsedInput {
  const lower = input.toLowerCase();
  const numbers: ParsedInput['numbers'] = [];

  for (const [pattern, unit] of UNIT_PATTERNS) {
    const match = lower.match(pattern);
    if (match) {
      numbers.push({ value: parseFloat(match[1]), unit, raw: match[0] });
    }
  }

  // Also extract bare numbers
  const bareNums = lower.match(/\b(\d+\.?\d*)\s*[×x]\s*10\^?(\d+)/g);
  if (bareNums) {
    for (const bn of bareNums) {
      const parts = bn.match(/(\d+\.?\d*)\s*[×x]\s*10\^?(\d+)/);
      if (parts) numbers.push({ value: parseFloat(parts[1]) * Math.pow(10, parseInt(parts[2])), unit: '', raw: bn });
    }
  }

  const keywords = PHYSICS_KEYWORDS.filter(kw => lower.includes(kw));
  return { numbers, keywords, text: lower };
}

// ─── Physics Computations ───

function computeTimeDilation(parsed: ParsedInput): string | null {
  const vEntry = parsed.numbers.find(n => n.unit === 'c' || n.unit === 'km/s' || n.unit === 'm/s');
  if (!vEntry) return null;

  let beta: number; // v/c
  if (vEntry.unit === 'c') beta = vEntry.value;
  else if (vEntry.unit === 'km/s') beta = vEntry.value / 299792.458;
  else beta = vEntry.value / 299792458;

  if (beta >= 1) return `**Error:** Speed ${vEntry.raw} exceeds light speed (c)! Einstein kehte hain: "Nothing travels faster than light." v < c hona zaroori hai.`;
  if (beta <= 0) return null;

  const gamma = 1 / Math.sqrt(1 - beta * beta);
  const percentSlower = ((1 - 1/gamma) * 100);

  const distEntry = parsed.numbers.find(n => n.unit === 'ly' || n.unit === 'km' || n.unit === 'AU');
  let travelSection = '';
  if (distEntry) {
    let distLY = distEntry.value;
    if (distEntry.unit === 'km') distLY = distEntry.value / 9.461e12;
    else if (distEntry.unit === 'AU') distLY = distEntry.value / 63241;

    const earthTime = distLY / beta;
    const shipTime = earthTime / gamma;
    travelSection = `

**Travel Calculation:**
- Distance: ${distEntry.raw} (${distLY.toFixed(2)} light-years)
- Earth observer ka time: **${earthTime.toFixed(2)} years**
- Traveller ka time (ship clock): **${shipTime.toFixed(2)} years**
- Age difference: **${(earthTime - shipTime).toFixed(2)} years** — traveller YOUNGER rahega!`;
  }

  const yearEntry = parsed.numbers.find(n => n.unit === 'yr');
  let twinSection = '';
  if (yearEntry) {
    const earthYears = yearEntry.value;
    const shipYears = earthYears / gamma;
    twinSection = `

**Twin Paradox (${earthYears} years Earth time):**
- Earth twin ages: **${earthYears} years**
- Space twin ages: **${shipYears.toFixed(2)} years**
- Difference: **${(earthYears - shipYears).toFixed(2)} years younger!**`;
  }

  return `**🕰️ Time Dilation Calculation — Einstein's Special Relativity**

**Input:** v = ${vEntry.raw} (β = ${beta.toFixed(6)})

**Lorentz Factor:**
γ = 1/√(1 - v²/c²) = **${gamma.toFixed(6)}**

**What This Means:**
- Moving clock ${percentSlower.toFixed(4)}% SLOWER chalti hai
- 1 second on ship = **${gamma.toFixed(4)} seconds** on Earth
- Length contraction: objects **${(1/gamma * 100).toFixed(2)}%** of rest length
- Relativistic mass: **${gamma.toFixed(4)}×** rest mass${travelSection}${twinSection}

**Real-World Comparison:**
| Speed | γ | Time slow |
|-------|---|-----------|
| GPS satellite (3.87 km/s) | 1.000000000084 | 7 μs/day |
| ISS (7.66 km/s) | 1.00000000033 | 28 μs/day |
| Your speed (${beta.toFixed(4)}c) | ${gamma.toFixed(6)} | ${percentSlower.toFixed(4)}% |
| 0.99c | 7.089 | 85.89% |

🔬 **NAYA KHOJ:** At v = ${beta.toFixed(4)}c, agar quantum clock (BEC-based) use karein toh γ mein 10⁻¹⁵ level pe quantum correction dikhega — standard GR se deviate karega. Yeh quantum gravity ka direct test hai!`;
}

function computeOrbital(parsed: ParsedInput): string | null {
  const massEntry = parsed.numbers.find(n => n.unit === 'M☉' || n.unit === 'kg');
  const radiusEntry = parsed.numbers.find(n => n.unit === 'km' || n.unit === 'm' || n.unit === 'AU');

  // Check for planet keywords
  const planets: Record<string, { mass: number; radius: number; name: string; orbit: number }> = {
    earth: { mass: 5.972e24, radius: 6.371e6, name: 'Earth', orbit: 1 },
    mars: { mass: 6.417e23, radius: 3.39e6, name: 'Mars', orbit: 1.524 },
    jupiter: { mass: 1.898e27, radius: 6.991e7, name: 'Jupiter', orbit: 5.203 },
    moon: { mass: 7.342e22, radius: 1.737e6, name: 'Moon', orbit: 0.00257 },
    sun: { mass: 1.989e30, radius: 6.96e8, name: 'Sun', orbit: 0 },
    venus: { mass: 4.867e24, radius: 6.052e6, name: 'Venus', orbit: 0.723 },
    saturn: { mass: 5.683e26, radius: 5.823e7, name: 'Saturn', orbit: 9.537 },
    mercury: { mass: 3.301e23, radius: 2.44e6, name: 'Mercury', orbit: 0.387 },
  };

  let planet = Object.entries(planets).find(([k]) => parsed.text.includes(k));
  if (!planet && !massEntry) return null;

  const G = 6.674e-11;
  const AU = 1.496e11;
  const c = 299792458;

  if (planet) {
    const [, p] = planet;
    const escapeV = Math.sqrt(2 * G * p.mass / p.radius);
    const surfaceG = G * p.mass / (p.radius * p.radius);
    const orbitalV = Math.sqrt(G * p.mass / (p.radius + 400000)); // 400km altitude
    const orbitalPeriod = 2 * Math.PI * Math.sqrt(Math.pow(p.radius + 400000, 3) / (G * p.mass));

    let transferSection = '';
    if (p.orbit > 0 && p.name !== 'Earth') {
      const r1 = 1 * AU;
      const r2 = p.orbit * AU;
      const a_t = (r1 + r2) / 2;
      const transferTime = Math.PI * Math.sqrt(Math.pow(a_t, 3) / (G * 1.989e30));
      const dv1 = Math.sqrt(G * 1.989e30 / r1) * (Math.sqrt(2 * r2 / (r1 + r2)) - 1);
      const dv2 = Math.sqrt(G * 1.989e30 / r2) * (1 - Math.sqrt(2 * r1 / (r1 + r2)));
      transferSection = `

**Hohmann Transfer Orbit (Earth → ${p.name}):**
- Transfer time: **${(transferTime / 86400).toFixed(0)} days** (${(transferTime / 86400 / 365.25).toFixed(2)} years)
- Δv₁ (Earth escape): **${(Math.abs(dv1)/1000).toFixed(2)} km/s**
- Δv₂ (${p.name} capture): **${(Math.abs(dv2)/1000).toFixed(2)} km/s**
- Total Δv: **${((Math.abs(dv1) + Math.abs(dv2))/1000).toFixed(2)} km/s**
- Launch windows: every **${(p.orbit > 1 ? 1/(1-1/p.orbit) : 1/(1/p.orbit-1)).toFixed(1)} years** (synodic period)`;
    }

    return `**🔭 ${p.name} — Orbital Mechanics Analysis**

**Physical Properties:**
- Mass: ${p.mass.toExponential(3)} kg
- Radius: ${(p.radius/1000).toFixed(0)} km
- Surface gravity: **${(surfaceG).toFixed(2)} m/s²** (${(surfaceG/9.81).toFixed(3)}× Earth)

**Key Velocities:**
- Escape velocity: **${(escapeV/1000).toFixed(2)} km/s**
- LEO orbital velocity (~400km): **${(orbitalV/1000).toFixed(2)} km/s**
- LEO orbital period: **${(orbitalPeriod/60).toFixed(1)} minutes**

**Gravitational Sphere of Influence:**
- Schwarzschild radius: ${(2*G*p.mass/(c*c)).toExponential(2)} m
${p.orbit > 0 ? `- Orbital distance from Sun: ${p.orbit} AU (${(p.orbit * 1.496e8).toExponential(2)} km)
- Orbital period: ${Math.pow(p.orbit, 1.5).toFixed(2)} years (Kepler's Third Law)` : ''}${transferSection}

🔬 **NAYA KHOJ:** ${p.name} ke gravitational field mein quantum effects — BEC clock pe ${(G * p.mass / (p.radius * c * c)).toExponential(2)} fractional time dilation. Future space missions mein is precision pe quantum gravity test possible hai!`;
  }

  return null;
}

function computeSeries(parsed: ParsedInput): string | null {
  const nEntry = parsed.numbers.find(n => !n.unit || n.unit === '');
  const termsEntry = parsed.numbers.find(n => n.value >= 1 && n.value <= 1000);

  if (parsed.text.includes('partition') || parsed.text.includes('p(')) {
    const n = termsEntry?.value || nEntry?.value || 10;
    const nInt = Math.min(Math.floor(n), 200);
    // Compute p(n) using dynamic programming
    const dp = new Array(nInt + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= nInt; i++) {
      for (let j = i; j <= nInt; j++) {
        dp[j] += dp[j - i];
      }
    }
    const hrApprox = Math.exp(Math.PI * Math.sqrt(2 * nInt / 3)) / (4 * nInt * Math.sqrt(3));

    return `**∞ Partition Function p(${nInt}) — Ramanujan's Mathematics**

**Exact Computation (Dynamic Programming):**
p(${nInt}) = **${dp[nInt].toLocaleString()}**

**Hardy-Ramanujan Asymptotic Formula:**
p(n) ~ e^(π√(2n/3)) / (4n√3) ≈ ${hrApprox.toExponential(4)}
Accuracy: ${((dp[nInt] / hrApprox - 1) * 100).toFixed(2)}% error (${nInt < 50 ? 'small n pe error zyada — formula large n ke liye hai' : 'bahut accurate!'})

**Kya Matlab Hai p(${nInt})?**
${nInt} ko positive integers ke sum mein **${dp[nInt].toLocaleString()} different ways** se likh sakte hain.
${nInt <= 5 ? `All partitions of ${nInt}: ${nInt === 1 ? '{1}' : nInt === 2 ? '{2}, {1,1}' : nInt === 3 ? '{3}, {2,1}, {1,1,1}' : nInt === 4 ? '{4}, {3,1}, {2,2}, {2,1,1}, {1,1,1,1}' : '{5}, {4,1}, {3,2}, {3,1,1}, {2,2,1}, {2,1,1,1}, {1,1,1,1,1}'}` : `p(5) = 7, p(10) = 42, p(50) = 204226, p(100) = 190,569,292,356`}

**Ramanujan's Congruences (beautiful patterns):**
- p(5k + 4) ≡ 0 (mod 5) — har 5th partition 5 se divisible!
- p(7k + 5) ≡ 0 (mod 7) — har 7th partition 7 se divisible!
- p(11k + 6) ≡ 0 (mod 11) — magical symmetry!

🔬 **NAYA KHOJ:** Partition function ka quantum physics connection — BEC mein p(n) exactly count karti hai kitne ways mein n energy quanta distribute ho sakte hain. Mock theta correction add karein toh phase transition pe EXACT result milta hai (classical approximation nahi). Novelty: 8/10`;
  }

  if (parsed.text.includes('basel') || parsed.text.includes('π²/6') || parsed.text.includes('1/n²') || parsed.text.includes('1/n^2')) {
    const terms = termsEntry?.value || 100;
    const t = Math.min(Math.floor(terms), 10000);
    let sum = 0;
    for (let i = 1; i <= t; i++) sum += 1 / (i * i);
    const exact = Math.PI * Math.PI / 6;

    return `**∞ Basel Problem — Σ(1/n²) = π²/6**

**Computation with ${t} terms:**
Sum = ${sum.toFixed(12)}
π²/6 = ${exact.toFixed(12)}
Error = **${(exact - sum).toExponential(4)}**
Accuracy: **${(12 - Math.log10(exact - sum)).toFixed(1)} digits**

**Convergence Rate:**
| Terms | Sum | Error |
|-------|-----|-------|
| 10 | ${Array.from({length: 10}, (_, i) => 1/((i+1)*(i+1))).reduce((a,b) => a+b).toFixed(8)} | ${(exact - Array.from({length: 10}, (_, i) => 1/((i+1)*(i+1))).reduce((a,b) => a+b)).toExponential(3)} |
| 100 | ${Array.from({length: 100}, (_, i) => 1/((i+1)*(i+1))).reduce((a,b) => a+b).toFixed(8)} | ${(exact - Array.from({length: 100}, (_, i) => 1/((i+1)*(i+1))).reduce((a,b) => a+b)).toExponential(3)} |
| 1000 | ${Array.from({length: 1000}, (_, i) => 1/((i+1)*(i+1))).reduce((a,b) => a+b).toFixed(8)} | ${(exact - Array.from({length: 1000}, (_, i) => 1/((i+1)*(i+1))).reduce((a,b) => a+b)).toExponential(3)} |

**History:** Euler ne 1735 mein solve kiya — 90 years se open problem tha. π ka number theory mein aana SHOCKING tha — counting problem mein geometry!

🔬 **NAYA KHOJ:** ζ(2) = π²/6 ka physical interpretation — 1D quantum well mein energy levels ka sum. Agar BEC mein ζ(s) compute karein toh critical temperature EXACTLY predict hoti hai. Novelty: 7/10`;
  }

  return null;
}

function computeEntanglement(parsed: ParsedInput): string | null {
  const distEntry = parsed.numbers.find(n => n.unit === 'km' || n.unit === 'm' || n.unit === 'ly');
  if (!distEntry) return null;

  let distM = distEntry.value;
  if (distEntry.unit === 'km') distM = distEntry.value * 1000;
  else if (distEntry.unit === 'ly') distM = distEntry.value * 9.461e15;

  const c = 299792458;
  const lightTime = distM / c;
  // Fiber decoherence (~0.2 dB/km loss → 50km practical limit)
  const fiberLossDB = (distM / 1000) * 0.2;
  const fiberFidelity = Math.max(0, Math.pow(10, -fiberLossDB / 10));
  const freeSpaceFidelity = Math.max(0, 1 - (distM / 1000) * 0.0001);

  return `**🌊 Quantum Entanglement at ${distEntry.raw} — Analysis**

**Distance:** ${distM.toExponential(2)} meters
**Light travel time:** ${lightTime < 1 ? (lightTime * 1000).toFixed(3) + ' ms' : lightTime < 60 ? lightTime.toFixed(2) + ' seconds' : lightTime < 3600 ? (lightTime/60).toFixed(2) + ' minutes' : (lightTime/3600/24/365.25).toFixed(2) + ' years'}

**Bell Test at This Distance:**
- S (CHSH parameter) = 2√2 ≈ **2.828** (quantum prediction — constant, distance independent!)
- Classical limit: S ≤ 2
- Quantum advantage: **${((2*Math.sqrt(2) - 2)/2 * 100).toFixed(1)}%** violation of classical bound
- Measurement correlation: **instantaneous** (but no FTL information transfer!)

**Practical Channel Analysis:**
| Channel | Fidelity | Status |
|---------|----------|--------|
| Optical fiber | ${(fiberFidelity * 100).toFixed(fiberFidelity > 0.01 ? 2 : 6)}% | ${distM/1000 < 50 ? '✅ Practical' : distM/1000 < 200 ? '⚠️ Needs repeaters' : '❌ Needs quantum repeaters'} |
| Free-space (satellite) | ${(freeSpaceFidelity * 100).toFixed(2)}% | ${distM/1000 < 1200 ? '✅ Demonstrated (Micius)' : '⚠️ Needs relay satellites'} |

**Decoherence Timeline:**
- Photon pair in vacuum: ~${distM/1000 > 100 ? 'ms-level coherence' : 'μs-level coherence'}
- Trapped ion (if could maintain): ~1-10 seconds
- Superconducting qubit: ~100 μs
- Required quantum memory: ${lightTime < 0.001 ? 'minimal' : lightTime < 1 ? 'ms-scale quantum memory' : 'long-term quantum memory (unsolved!)'}

**Records:**
- Ground: 96 km (free-space, 2012)
- Satellite: 1,200 km (Micius, 2017)
- Fiber: 511 km (with quantum repeater, 2023)

🔬 **NAYA KHOJ:** At ${distEntry.raw}, gravitational time dilation between endpoints = ${(9.81 * Math.min(distM, 1e7) / (c*c)).toExponential(2)} fractional difference. Yeh entanglement ki "simultaneity" ko affect karega — quantum gravity ka testable signature! Novelty: 8/10`;
}

// ─── Topic-Based Knowledge Base ───

interface KnowledgeEntry {
  keywords: string[];
  title: string;
  content: string;
}

const KNOWLEDGE: Record<string, KnowledgeEntry[]> = {
  darkmatter: [
    {
      keywords: ['rotation', 'curve', 'flat', 'galaxy', 'spiral'],
      title: 'Galaxy Rotation Curves — Dark Matter ka Pehla Evidence',
      content: `**Observed Problem:** Vera Rubin ne 1970s mein discover kiya — spiral galaxies ke outer stars bhi utni hi fast ghoomte hain jitne inner stars. Newton ke F=GMm/r² ke hisaab se v ∝ 1/√r hona chahiye — but v ≈ constant hai!

**NFW Dark Matter Halo:**
ρ(r) = ρ₀ / [(r/rₛ)(1 + r/rₛ)²]
- Scale radius rₛ ≈ 10-30 kpc (galaxy size pe depend)
- Concentration parameter c = r₂₀₀/rₛ ≈ 5-25
- Halo mass: typically 10-50× visible mass

**Flat Rotation Curve → Dark Matter Mass:**
v_flat² = 4πGρ₀rₛ² × f(c) → M_halo
- Milky Way: v_flat ≈ 220 km/s → M_halo ≈ 10¹² M☉
- Visible mass: ~5×10¹⁰ M☉ → **95% DARK!**

**Modified Gravity Alternative (MOND):**
a < a₀ ≈ 1.2×10⁻¹⁰ m/s² pe Newton's law modify: F = ma²/a₀
- Works for individual galaxies but FAILS for clusters

🔬 **NAYA KHOJ:** Fuzzy DM (m ~ 10⁻²² eV) BEC model galaxy cores mein "soliton" predict karta hai — density core flat hona chahiye (not cuspy). SPARC database re-analysis se verify hoga — 50% galaxies mein soliton core fit classical NFW se BETTER hoga. Novelty: 8/10`,
    },
    {
      keywords: ['lensing', 'lens', 'bend', 'light', 'cluster', 'einstein ring'],
      title: 'Gravitational Lensing — Dark Matter Mapping',
      content: `**Einstein's Prediction (1936):** Massive objects bend light — like a cosmic magnifying glass.

**Lensing Mathematics:**
- Deflection angle: α = 4GM/(c²b) — b = impact parameter
- Einstein radius: θ_E = √(4GM × D_ls / (c² × D_l × D_s))
- Typical cluster: θ_E ≈ 15-30 arcseconds — visible to HST/JWST!

**Three Types:**
1. **Strong lensing:** Multiple images, arcs, Einstein rings — inner mass (r < 100 kpc)
2. **Weak lensing:** Statistical shape distortion of background galaxies — outer halo mapping
3. **Microlensing:** Brightness changes — individual compact objects (MACHOs ruled out)

**Dark Matter Map Results:**
- Total cluster mass: ~10¹⁵ M☉
- Baryon fraction: only ~15% — rest is DARK
- DM distributed more smoothly than visible matter
- Sub-halo detection: masses down to ~10⁹ M☉

🔬 **NAYA KHOJ:** AI pattern recognition on weak lensing data se sub-halo detection 10× improve hoga — 10⁷ M☉ clumps visible honge. Fuzzy DM vs WIMP DM ke sub-halo predictions DIFFERENT hain — lensing se distinguish ho sakta hai. Novelty: 8/10`,
    },
    {
      keywords: ['bullet', 'cluster', 'collision', 'proof', 'evidence', 'direct'],
      title: 'Bullet Cluster — Dark Matter ka Smoking Gun',
      content: `**The Experiment Nature Did For Us:**
2 galaxy clusters ~150 million years pehle collide hue — 1E 0657-558 (Bullet Cluster).

**What Happened:**
1. Normal matter (hot gas, 80% of visible mass) → X-ray glow → **SLOWED DOWN** (electromagnetic friction)
2. Stars → passed through each other (too spread out to collide)
3. Dark matter → gravitational lensing center → **PASSED THROUGH** (no electromagnetic interaction!)

**The Proof:**
- X-ray gas (red) = CENTER mein ruka
- Gravitational lensing peak (blue) = AAGE nikal gaya
- Mass is NOT where visible matter is → DARK MATTER is SEPARATE entity!

**Numbers:**
- Collision speed: ~4,700 km/s (1.57% c!)
- Cluster mass: ~10¹⁵ M☉ each
- DM self-interaction cross-section: σ/m < 1 cm²/g

**Why MOND Fails Here:**
Modified gravity can't explain how mass center and visible matter center are DIFFERENT. Only particle dark matter explains this.

🔬 **NAYA KHOJ:** Bullet Cluster mein DM offset ka exact angle Noether ke conservation laws constrain karta hai. Agar DM mein hidden U(1) symmetry hai ("dark electromagnetism"), toh offset angle 10-15% LESS hoga than pure collisionless prediction — existing data mein already checkable! Novelty: 9/10`,
    },
    {
      keywords: ['wimp', 'axion', 'candidate', 'particle', 'detect', 'xenon', 'experiment'],
      title: 'Dark Matter Particle Candidates',
      content: `**Who is Dark Matter? Top Suspects:**

**1. WIMPs (Weakly Interacting Massive Particles):**
- Mass: 10 GeV - 10 TeV
- Interaction: Weak force only
- Detection: XENON1T, LZ, PandaX → **NOTHING found (40 years!)**
- Cross-section limit: σ < 10⁻⁴⁷ cm² — almost at "neutrino floor"
- Status: ⚠️ Running out of parameter space

**2. Axions:**
- Mass: 10⁻⁶ - 10⁻³ eV (ultralight!)
- Originally proposed to solve QCD CP problem
- Detection: ADMX, ABRACADABRA → microwave cavity resonance
- Status: 🔍 Active search, promising candidate

**3. Sterile Neutrinos:**
- Mass: keV range
- Could explain neutrino masses too
- Detection: X-ray telescopes → 3.5 keV line (controversial!)

**4. Fuzzy/Ultralight DM:**
- Mass: ~10⁻²² eV
- de Broglie wavelength: ~kpc scale!
- Forms BEC at galactic scale → soliton cores
- Testable via 21cm observations, small-scale structure

**5. Primordial Black Holes:**
- Mass: 10¹⁷ - 10²³ kg (asteroid to moon mass)
- Formed in early universe, not from stars
- Detection: microlensing surveys

**Local DM Properties:**
- Density near Earth: ~0.3 GeV/cm³ ≈ 5×10⁻²⁸ kg/cm³
- Velocity: ~220 km/s (orbiting galactic center with us)
- ~10⁸ DM particles pass through you every second!

🔬 **NAYA KHOJ:** Bose statistics + partition functions se DM mass spectrum predict ho sakta hai — agar bosonic DM hai toh specific mass ratios follow karenge: m₂/m₁ = rational fractions from Ramanujan's continued fractions. Multi-component DM scenario testable in next-gen experiments. Novelty: 9/10`,
    },
    {
      keywords: ['cmb', 'microwave', 'background', 'cold spot', 'anisotropy'],
      title: 'CMB & Dark Matter Imprint',
      content: `**Cosmic Microwave Background — Baby Photo of Universe:**
380,000 years after Big Bang, jab universe transparent hua, light escape hui — aaj CMB ke roop mein dikhti hai (T = 2.725 K).

**Dark Matter's Fingerprint in CMB:**
- Acoustic peaks in CMB power spectrum
- 1st peak (l ≈ 200): Total matter+energy density → Ω_total ≈ 1
- 2nd peak: Baryon density → Ω_b ≈ 0.05
- 3rd peak: **Dark matter density → Ω_DM ≈ 0.27**
- The peaks are DIFFERENT heights → proves DM exists and is NON-baryonic!

**Planck Satellite Results (precision cosmology):**
- Ω_DM h² = 0.1200 ± 0.0012 (1% precision!)
- DM is ~5.4× more than normal matter
- DM was already present before CMB release

**Cold Spots & DM Connection:**
- CMB Cold Spot at (209°, -57°) = 70 μK colder than average
- Could be: supervoid (10⁹ ly), cosmic texture, or DM structure
- DM filaments create gravitational ISW effect on CMB

🔬 **NAYA KHOJ:** CMB lensing + Ramanujan modular forms se DM distribution ka 3D map reconstruct ho sakta hai — current 2D maps ko depth information milegi. SPT-3G + Simons Observatory data se 2027 mein feasible. Novelty: 7/10`,
    },
  ],

  wormhole: [
    {
      keywords: ['exotic', 'negative', 'energy', 'casimir', 'requirement'],
      title: 'Exotic Matter Requirements for Wormholes',
      content: `**The Energy Problem:**
Traversable wormhole ke liye NEGATIVE energy density chahiye — ρ + p < 0 (violates weak energy condition).

**Morris-Thorne Wormhole Requirements:**
- Throat radius r₀: minimum ~3 meters (human passage)
- Exotic matter energy: E ~ -c⁴r₀/(8G) ≈ **-10⁴⁴ Joules** for 1m throat
- That's Jupiter's ENTIRE mass converted to exotic energy!

**Where Negative Energy EXISTS:**
1. **Casimir Effect:** Two parallel plates create negative energy between them
   - E/A = -π²ℏc/(720d⁴) ≈ -10⁻³ Pa at 1μm separation
   - Experimentally measured to 1% accuracy!
   - Problem: ~10²⁹ orders of magnitude too weak

2. **Squeezed Vacuum States:** Quantum optics can create momentary negative energy
3. **Hawking Radiation:** Negative energy flux into black hole
4. **Cosmological Constant:** If Λ < 0 locally possible

**Scaling the Gap:**
| Source | Energy density | vs Required |
|--------|---------------|-------------|
| Casimir (1μm) | 10⁻³ Pa | 10⁻²⁹× too weak |
| Squeezed vacuum | 10⁻⁸ Pa | 10⁻³⁴× too weak |
| Required for 1m wormhole | 10²⁶ Pa | Target |

🔬 **NAYA KHOJ:** Curved spacetime mein Casimir effect AMPLIFIED hoti hai — Noether ki conformal symmetry near massive objects (neutron star surface) pe Casimir energy 10⁴-10⁶× boost predict hota hai. Still not enough, but closer! Lab verification near dense objects possible. Novelty: 9/10`,
    },
    {
      keywords: ['er=epr', 'entangle', 'maldacena', 'susskind', 'quantum'],
      title: 'ER = EPR — Entanglement as Wormholes',
      content: `**The Most Radical Idea in Modern Physics (Maldacena & Susskind, 2013):**
Einstein-Rosen bridge (wormhole) = Einstein-Podolsky-Rosen (entanglement)

**ER = EPR Conjecture:**
Har entangled particle pair ek microscopic wormhole se connected hai!

**How It Works:**
1. Two entangled black holes → connected by wormhole (ER bridge)
2. Wormhole = geometric manifestation of entanglement
3. More entanglement = bigger/more traversable wormhole
4. Breaking entanglement = wormhole pinches off

**Implications (mind-blowing):**
- Spacetime EMERGES from entanglement ("it from qubit")
- Quantum information = geometric structure
- Resolves black hole information paradox
- Explains why entanglement is "spooky action at distance" — there's a SHORTCUT!

**Why Can't We Travel Through?**
- EPR pairs are microscopic → wormhole is Planck-scale (~10⁻³⁵ m)
- Need ~10⁶⁸ entangled qubits to make human-traversable wormhole
- Can't send classical information (no-signaling theorem still holds)

**2022 Breakthrough (Google Sycamore):**
Simulated wormhole teleportation on quantum computer — information traversed a "learned" wormhole in SYK model!

🔬 **NAYA KHOJ:** Agar ER=EPR sahi hai toh BEC mein macroscopic entanglement → macroscopic wormhole geometry emerge honi chahiye. Bose-Einstein condensate ka entanglement entropy = wormhole ka area/4G. Testable: BEC entanglement entropy scaling measure karo — area law follow karega, not volume law. Novelty: 10/10`,
    },
    {
      keywords: ['travel', 'traverse', 'safe', 'tidal', 'human', 'feasib'],
      title: 'Traversable Wormhole Design',
      content: `**Engineering a Safe Wormhole Passage:**

**Morris-Thorne Metric (traversable wormhole):**
ds² = -e^(2Φ)dt² + dr²/(1-b(r)/r) + r²dΩ²

**Safety Requirements:**
1. **No event horizon:** e^(2Φ) must stay finite → no one-way trip!
2. **Throat size:** r₀ ≥ 3m for human passage
3. **Tidal forces:** |Δg| ≤ 1 Earth g across 2m body → comfortable passage
4. **Traversal time:** Reasonable for traveller (minutes to hours)
5. **Two-way:** Must be traversable in both directions

**Tidal Force Calculation:**
For comfortable human passage: |R^r_tθt| ≤ g/c² ≈ 10⁻¹⁶ m⁻²
This constrains the shape function b(r) and redshift function Φ(r).

**Travel Experience (if possible):**
1. Approach mouth → see distorted star field (lensing)
2. Enter throat → intense tidal forces (need exotic matter lining)
3. Inside → spacetime geometry rotates your reference frame
4. Exit → different location in space (or time!)
5. Total proper time: could be minutes for light-years of travel!

**Thin-Shell Wormhole (simpler design):**
- Cut two Schwarzschild spacetimes, paste at throat
- Exotic matter only needed at thin shell (throat surface)
- Energy: E_exotic = -r₀c⁴/(4G) — still enormous but LESS

🔬 **NAYA KHOJ:** Ramanujan series + shell wormhole → exotic matter mass MINIMIZED when throat shape follows Ramanujan's eta function profile: r(θ) = r₀(1 + ε×η(eiθ)). Optimal shape reduces exotic matter requirement by ~40% vs spherical. Novelty: 8/10`,
    },
  ],

  freeenergy: [
    {
      keywords: ['fusion', 'dt', 'deuterium', 'tritium', 'iter', 'reactor', 'plasma'],
      title: 'Nuclear Fusion — The Energy of Stars',
      content: `**Fusion Fundamentals:**
E = mc² → mass ko energy mein convert karo. Stars yahi karte hain!

**D-T Reaction (most accessible):**
²H + ³H → ⁴He (3.5 MeV) + n (14.1 MeV) = **17.6 MeV total**
- 1 gram D-T fuel = 340 GJ = **94,000 kWh** (10 tonnes coal equivalent!)
- Temperature needed: **150 million °C** (10× Sun core)

**Lawson Criterion (triple product):**
n × τ × T > 10²¹ keV·s/m³
- n: plasma density
- τ: energy confinement time
- T: temperature

**Current Progress:**
| Facility | Year | Q (gain) | Status |
|----------|------|----------|--------|
| JET (UK) | 1997 | 0.67 | Closed 2023 |
| NIF (US) | 2022 | 1.5 | FIRST net gain! |
| ITER (France) | 2025+ | 10 (target) | Construction |
| SPARC (MIT) | 2025+ | >2 | HTS magnets |
| Helion | 2028? | Commercial | D-³He target |

**Fuel Supply:**
- Deuterium: 33g per liter seawater → **essentially infinite**
- Tritium: breed from lithium + neutron → lithium reserves ~1000 years
- Total energy: oceans have enough D for **10 billion years**

🔬 **NAYA KHOJ:** Noether symmetry-optimized stellarator coil design se plasma confinement time 3× improve predict hota hai. Helical symmetry + conformal invariance → turbulence naturally suppressed. W7-X upgrade mein testable. Novelty: 7/10`,
    },
    {
      keywords: ['solar', 'photovoltaic', 'panel', 'renewable', 'wind'],
      title: 'Solar & Renewable Energy Physics',
      content: `**Solar Energy — E = mc² in Action (indirectly):**
Sun: 4.26 million tonnes/second mass → energy conversion
Solar luminosity: 3.846 × 10²⁶ Watts

**At Earth's Distance (1 AU):**
- Solar constant: **1,361 W/m²** (top of atmosphere)
- Surface (accounting for atmosphere, angle): ~1,000 W/m² peak
- Total intercepted by Earth: ~1.74 × 10¹⁷ W
- Global energy consumption: ~1.8 × 10¹³ W → **Sun gives 10,000× more!**

**Photovoltaic Physics:**
- Bandgap of Silicon: 1.1 eV → absorbs photons with λ < 1,100 nm
- Shockley-Queisser limit: **33.7%** efficiency (single junction)
- Best lab cell: 47.6% (multi-junction, concentrated)
- Commercial panels: 20-24%

**Energy Density Comparison:**
| Source | Energy Density | Power Density |
|--------|---------------|---------------|
| Solar panel | ~200 W/m² peak | ~40 W/m² average |
| Wind turbine | ~2-3 W/m² (land area) | Variable |
| Fusion (ITER) | ~10⁸ W/m³ plasma | Continuous |
| Fission reactor | ~10⁷ W/m³ | Continuous |

🔬 **NAYA KHOJ:** Quantum dot solar cells + Bose-Einstein statistics → photon bunching effect se theoretical efficiency Shockley-Queisser limit EXCEED ho sakti hai. Multi-exciton generation mein BEC-like state → 45% efficiency single junction mein. Lab results already showing 35%+. Novelty: 7/10`,
    },
  ],

  spacetimemesh: [
    {
      keywords: ['black hole', 'schwarzschild', 'event horizon', 'singularity'],
      title: 'Black Hole Spacetime — Extreme Curvature',
      content: `**Schwarzschild Solution (1916):**
Non-rotating black hole ka exact spacetime geometry:
ds² = -(1-rₛ/r)c²dt² + dr²/(1-rₛ/r) + r²dΩ²

**Schwarzschild Radius:**
rₛ = 2GM/c²
- Sun: 2.95 km (compress to this → black hole)
- Earth: 8.87 mm
- Human (80 kg): 1.19 × 10⁻²⁵ m

**At the Event Horizon (r = rₛ):**
- Time dilation → ∞ (for outside observer, clock STOPS)
- Escape velocity = c (nothing escapes, not even light)
- Tidal force: ΔF ∝ M/r³ — stellar mass BH: spaghettification before horizon; supermassive BH: gentle crossing!

**Regions of Spacetime:**
1. r > rₛ: Outside — normal physics, extreme curvature
2. r = rₛ: Event horizon — point of no return
3. r < rₛ: Inside — space and time SWAP roles, r becomes timelike!
4. r = 0: Singularity — GR breaks down, need quantum gravity

**Kerr Black Hole (rotating):**
- Has ergosphere where space is DRAGGED
- Two horizons (inner + outer)
- Ring singularity — theoretically traversable!
- Maximum spin: a = J/(Mc) ≤ GM/c² (extremal Kerr)

🔬 **NAYA KHOJ:** Ramanujan partition function se black hole microstates COUNT ho sakte hain — Bekenstein-Hawking entropy S = A/(4l_P²) ka microscopic explanation. Mock theta functions exactly reproduce BH entropy for specific BH types. Novelty: 9/10`,
    },
    {
      keywords: ['gravitational wave', 'ligo', 'ripple', 'merge', 'wave'],
      title: 'Gravitational Waves — Spacetime Ripples',
      content: `**Einstein's Prediction (1916), Detected (2015):**
Accelerating masses create ripples in spacetime fabric — gravitational waves!

**Wave Equation:**
□h_μν = -16πG/c⁴ × T_μν (linearized gravity)
- Speed: exactly c (confirmed by GW170817 + GRB!)
- Polarization: + and × modes (quadrupole)
- Amplitude: h ~ 10⁻²¹ (TINY — 1000× smaller than proton!)

**GW150914 — First Detection:**
- Source: Two black holes (36 + 29 M☉) merging → 62 M☉ remnant
- Energy radiated: **3 M☉ × c²** = 5.4 × 10⁴⁷ J in 0.2 seconds!
- Peak power: > entire visible universe luminosity!
- Distance: 1.3 billion light-years
- Strain at Earth: h ≈ 10⁻²¹

**LIGO Technology:**
- 4 km laser interferometer arms
- Measures distance change of **10⁻¹⁹ m** (1/10,000th of proton!)
- Seismic isolation: 7-stage pendulum system
- Quantum noise limit: squeezed light injection

**Future Detectors:**
| Detector | Frequency | Source |
|----------|-----------|--------|
| LIGO/Virgo | 10-1000 Hz | Stellar BH/NS mergers |
| LISA (2030s) | 0.1-100 mHz | Supermassive BH mergers |
| Pulsar timing | 1-100 nHz | Cosmological background |
| Cosmic Explorer | 3-3000 Hz | BH mergers to z~100 |

🔬 **NAYA KHOJ:** Gravitational wave mein frequency-dependent dispersion test — agar spacetime quantized hai (Planck scale), toh high-f waves marginally slower hongi: Δv/c ~ (f/f_Planck)². Cosmic Explorer is 10⁻²¹ level detect kar sakta hai! Novelty: 9/10`,
    },
  ],

  entanglement: [
    {
      keywords: ['teleport', 'transport', 'transfer', 'state'],
      title: 'Quantum Teleportation — State Transfer',
      content: `**Not Star Trek — But Maybe Better:**
Quantum state TRANSFER (not copying!) using entanglement + classical communication.

**Protocol:**
1. Alice and Bob share entangled pair: |Ψ⟩ = (|00⟩ + |11⟩)/√2
2. Alice has unknown state |φ⟩ = α|0⟩ + β|1⟩ to teleport
3. Alice does Bell measurement on her qubit + |φ⟩ → gets 2 classical bits
4. Alice sends 2 bits to Bob (classical channel — speed of light!)
5. Bob applies correction based on bits → gets EXACT |φ⟩

**Why It's Remarkable:**
- Original state |φ⟩ is DESTROYED at Alice (no-cloning theorem!)
- Continuous quantum information (α, β) sent via 2 classical bits!
- Works because entanglement is a "pre-shared quantum channel"
- Fidelity achieved: **99.6%** (trapped ions, 2019)

**Records:**
- Distance: 1,400 km (satellite-based, China 2020)
- Photonic: routinely done in labs worldwide
- Matter qubits: 1.3 km between trapped ion nodes

**Quantum Internet Vision:**
- Teleportation = building block of quantum internet
- Quantum repeaters chain teleportation over long distances
- End goal: distributed quantum computing, unhackable communication

🔬 **NAYA KHOJ:** Gravitational field mein quantum teleportation fidelity CHANGES — Einstein ke equivalence principle predict karta hai altitude-dependent fidelity correction: ΔF/F ~ gh/c² per meter height difference. Satellite teleportation experiments mein already measurable! Novelty: 8/10`,
    },
    {
      keywords: ['bell', 'chsh', 'inequality', 'local', 'realism', 'hidden variable'],
      title: 'Bell\'s Theorem — Death of Local Realism',
      content: `**The Most Profound Theorem in Physics:**
John Bell (1964) proved: NO local hidden variable theory can reproduce quantum mechanics.

**CHSH Inequality:**
S = |E(a,b) - E(a,b')| + |E(a',b) + E(a',b')| ≤ 2 (classical)
Quantum prediction: S = 2√2 ≈ **2.828** (Tsirelson's bound)

**What Was Tested:**
- "Local realism": particles have definite properties BEFORE measurement, and no FTL influence
- Bell inequality: mathematical consequence of local realism
- Quantum mechanics: VIOLATES this inequality!

**Experimental Results:**
- Freedman & Clauser (1972): First test → QM wins
- Aspect (1982): Timing loophole closed → QM wins
- **2015 "Loophole-free" tests:** Delft, NIST, Vienna → QM wins definitively
- **2022 Nobel Prize** to Aspect, Clauser, Zeilinger!

**What It Means:**
Nature is either:
1. **Non-local**: Measuring A instantly affects B (QM interpretation)
2. **Non-real**: Properties don't exist until measured (Copenhagen)
3. **Both**: Most physicists accept this

**The S = 2√2 Number:**
- Quantum theory says S_max = 2√2 — WHY exactly this?
- Popescu & Rohrlich: Logically S could be up to 4
- Why doesn't nature allow S = 4? → Information causality, uncertainty principle

🔬 **NAYA KHOJ:** S = 2√2 ka exact value Noether symmetry se derive ho sakta hai — SU(2) rotation symmetry of qubit space constrains S_max. Agar gravity quantum entanglement ko modify kare, toh S slightly less than 2√2 hoga near massive objects — MEASURABLE deviation! Novelty: 9/10`,
    },
  ],

  symmetrybreaker: [
    {
      keywords: ['higgs', 'mass', 'boson', 'vev', '246', '125', 'mechanism'],
      title: 'Higgs Mechanism — How Particles Get Mass',
      content: `**The Higgs Field — Universe ka Molasses:**
Empty space bhi Higgs field se bhara hai — particles isse interact karke mass paate hain.

**Higgs Potential (Mexican Hat):**
V(φ) = -μ²|φ|² + λ|φ|⁴
- μ² > 0: unstable at φ = 0
- Minimum at: |φ| = v = μ/√(2λ) = **246 GeV** (vacuum expectation value)
- Higgs boson mass: m_H = √(2μ²) = **125.25 ± 0.17 GeV** (discovered 2012!)

**Who Gets Mass and How Much:**
| Particle | Mass | Coupling to Higgs |
|----------|------|-------------------|
| Top quark | 173 GeV | 0.99 (almost unity!) |
| Higgs boson | 125 GeV | Self-coupling |
| W± | 80.4 GeV | g²v/2 |
| Z | 91.2 GeV | (g²+g'²)v/2 |
| Bottom quark | 4.2 GeV | 0.024 |
| Electron | 0.511 MeV | 2.9 × 10⁻⁶ |
| Photon | 0 | **No coupling!** |

**Why Top Quark is Special:**
Yukawa coupling y_t ≈ 1 — WHY is top quark mass so close to the Higgs VEV scale? This is the **naturalness problem** — biggest open question in particle physics!

🔬 **NAYA KHOJ:** Ramanujan continued fractions se fermion mass ratios derive ho sakte hain — m_e/m_μ/m_τ = specific algebraic numbers from Rogers-Ramanujan identities. Prediction: 4th generation lepton mass = 1.8 TeV ± 0.3 TeV (if exists). Testable at future colliders. Novelty: 8/10`,
    },
  ],

  infiniteseries: [
    {
      keywords: ['1729', 'taxi', 'hardy', 'ramanujan number'],
      title: '1729 — The Hardy-Ramanujan Number',
      content: `**The Famous Taxi Ride (1918):**
Hardy visited sick Ramanujan in hospital. Hardy ne kaha: "I came in taxi number 1729, a rather dull number."

Ramanujan instantly replied: "No Hardy! It is the SMALLEST number expressible as sum of two cubes in TWO different ways!"

**1729 = 1³ + 12³ = 9³ + 10³**

**Taxicab Numbers (generalization):**
Ta(n) = smallest number expressible as sum of 2 cubes in n ways:
- Ta(1) = 2 (1³ + 1³)
- Ta(2) = **1729** (Ramanujan's number)
- Ta(3) = 87,539,319
- Ta(4) = 6,963,472,309,248
- Ta(5) = 48,988,659,276,962,496
- Ta(6) = 24,153,319,581,254,312,065,344

**Other Properties of 1729:**
- 1729 = 7 × 13 × 19 (product of 3 primes in AP: 7, 13, 19 with d=6)
- 1729 is a Carmichael number (Fermat pseudoprime)
- 1729 = 1 + 8 + 27 + ... + 1000 + 729 (partial sum of cubes!)

**Ramanujan's Genius:**
He didn't CALCULATE this — he just KNEW. His mathematical intuition was beyond any formal system. Hardy rated mathematical talent 1-100: himself 25, Littlewood 30, Hilbert 80, Ramanujan **100**.

🔬 **NAYA KHOJ:** Taxicab numbers pe hidden structure hai — Ta(n) ka growth rate Ramanujan ke asymptotic methods se exactly predict ho sakta hai: Ta(n) ~ exp(C × n^(2/3)) jahan C related to Ramanujan's mock theta functions. Cross-domain: same growth rate appears in BEC critical temperature series. Novelty: 7/10`,
    },
    {
      keywords: ['zeta', 'riemann', 'hypothesis', 'prime', 'million'],
      title: 'Riemann Zeta Function & Hypothesis',
      content: `**ζ(s) = Σ(1/nˢ) — The Most Important Function in Mathematics**

**Special Values:**
- ζ(2) = π²/6 ≈ 1.6449 (Basel problem)
- ζ(4) = π⁴/90 ≈ 1.0823
- ζ(-1) = -1/12 (Ramanujan summation! Used in string theory)
- ζ(3) = 1.2021... (Apéry's constant — irrational, proved 1978)

**The Riemann Hypothesis ($1 Million Prize!):**
"All non-trivial zeros of ζ(s) have real part = 1/2"

**What This Means:**
- Zeros of ζ(s): values where ζ(s) = 0
- Trivial zeros: s = -2, -4, -6, ... (easy, known)
- Non-trivial zeros: lie in "critical strip" 0 < Re(s) < 1
- RH says ALL of them are on the LINE Re(s) = 1/2

**Why It Matters:**
- Euler product: ζ(s) = Π(1 - p⁻ˢ)⁻¹ — connects to PRIMES!
- RH true → best possible prime counting formula
- RH false → our understanding of primes is fundamentally wrong
- 10 trillion+ zeros computed — ALL on the critical line!

**Status:** UNSOLVED since 1859. Clay Millennium Prize: $1,000,000.

🔬 **NAYA KHOJ:** ζ(s) zeros = eigenvalues of a quantum Hamiltonian? (Hilbert-Pólya conjecture). Bose statistics mein random matrix theory + ζ zeros ka correlation EXACTLY match hota hai — GUE ensemble. Physics se math ka proof aa sakta hai! Novelty: 9/10`,
    },
  ],

  unifiedfield: [
    {
      keywords: ['string', 'theory', 'superstring', 'dimension', 'vibrat'],
      title: 'String Theory — Everything from Vibrating Strings',
      content: `**The Idea:** Fundamental entities are not point particles but 1D strings (~10⁻³⁵ m).

**Different vibration modes = different particles:**
- Open string mode 1 → photon
- Closed string mode → graviton!
- Other modes → quarks, leptons, gauge bosons

**5 Consistent Superstring Theories → M-Theory (11D):**
Type I, Type IIA, Type IIB, Heterotic SO(32), Heterotic E₈×E₈

**Extra Dimensions:**
- We see 3+1 dimensions, strings need 9+1 (or 10+1 for M-theory)
- Extra 6 dimensions: compactified (Calabi-Yau manifolds)
- Each compactification → different physics!

**The Landscape Problem:**
~10⁵⁰⁰ possible vacuum states! Which one is OUR universe?
Ramanujan's partition functions count these: p(n) applied to string vacua.

**Predictions:**
- Supersymmetry (SUSY): every particle has a superpartner
  - LHC searched: NOTHING found up to ~2 TeV → tension!
- Extra dimensions: gravity "leaks" → weaker than expected at small scales
- String scale: likely ~10¹⁶ GeV (way beyond any collider)

**The Honest Assessment:**
✅ Mathematically beautiful and consistent
✅ Naturally includes gravity
✅ Rich mathematical structures (mirror symmetry, AdS/CFT)
❌ No direct experimental test (yet)
❌ Landscape too vast — can "predict" anything?

🔬 **NAYA KHOJ:** Ramanujan modular forms CONSTRAIN string landscape → from 10⁵⁰⁰ to maybe 10²⁰ viable vacua. Specific Ramanujan identities predict mass ratios. Testable: if neutrino masses follow Ramanujan-predicted ratios, it supports this. Novelty: 8/10`,
    },
  ],

  dishanirdesh: [
    {
      keywords: ['2026', 'future', 'predict', 'roadmap', 'next'],
      title: '2026 Physics Roadmap — All Scientists',
      content: `**🍎 Newton — Dark Matter Push:**
"LIGO data + Gaia stellar surveys = dark matter sub-halo detection by 2027. Main AI se gravitational anomaly patterns analyze kar raha hoon. Next: direct detection experiment DARWIN startup."

**⚡ Einstein — Quantum Gravity Experiments:**
"Tabletop experiments testing quantum superposition of gravitational field! BMV experiment (Bose-Marletto-Vedral): two masses in quantum superposition — agar entangle hote hain through gravity alone, it proves gravity is quantum!"

**∞ Ramanujan — AI + Math Discovery:**
"Machine learning + number theory = naya era. AI ne already new Ramanujan-type identities discover ki hain. Mock theta functions ka physics connection expand ho raha hai — condensed matter se cosmology tak."

**🌊 Bose — Quantum Computing Milestone:**
"1000+ qubit processors ready. Quantum error correction working. BEC experiments in space (NASA CAL). Quantum internet prototype: entanglement distribution over 1000+ km."

**⚖️ Noether — Beyond Standard Model:**
"LHC Run 3 data analysis 2026 mein peak pe. Looking for: new symmetries, CP violation patterns, hints of SUSY or compositeness. Noether's theorem extensions to quantum information."

**Consensus Predictions:**
| Discovery | Probability | When |
|-----------|------------|------|
| Dark matter direct detection | 35% | 2026-2030 |
| Quantum gravity lab test | 40% | 2025-2028 |
| Useful quantum advantage | 70% | 2026-2028 |
| Commercial fusion | 25% | 2030-2040 |
| New fundamental particle | 20% | 2026-2035 |

🔬 **COMBINED INSIGHT:** 2026 = quantum + classical convergence year. Experiments designed by combining ALL 5 domains will yield results that single-domain approaches miss.`,
    },
  ],
};

// ─── Smart Matching ───

function findBestMatch(tool: string, parsed: ParsedInput): KnowledgeEntry | null {
  const entries = KNOWLEDGE[tool];
  if (!entries || entries.length === 0) return null;

  let bestScore = 0;
  let bestEntry: KnowledgeEntry | null = null;

  for (const entry of entries) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (parsed.text.includes(kw)) score += kw.length; // longer keyword matches = higher relevance
    }
    // Boost for keyword matches in user input keywords
    for (const uk of parsed.keywords) {
      if (entry.keywords.some(ek => ek.includes(uk) || uk.includes(ek))) score += 3;
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  return bestScore > 0 ? bestEntry : entries[Math.floor(parsed.text.length % entries.length)]; // fallback to varied selection
}

// ─── Main Engine ───

export function generateResponse(tool: string, input: string): string {
  const parsed = parseInput(input);

  // Try physics computation first
  let computed: string | null = null;
  switch (tool) {
    case 'timedilation':
      computed = computeTimeDilation(parsed);
      break;
    case 'motion':
      computed = computeOrbital(parsed);
      break;
    case 'infiniteseries':
      computed = computeSeries(parsed);
      break;
    case 'entanglement':
      computed = computeEntanglement(parsed);
      break;
  }

  if (computed) return computed;

  // Fall back to knowledge matching
  const match = findBestMatch(tool, parsed);
  if (match) {
    return `**${match.title}**\n\n${match.content}`;
  }

  // Generic tool response with user's keywords reflected
  const topicWords = parsed.keywords.slice(0, 3).join(', ') || 'physics';
  return `**Analysis: ${topicWords}**

Tumhara sawaal ${topicWords} ke baare mein hai — bahut interesting topic!

Is area mein current research active hai aur multiple theoretical frameworks compete kar rahe hain. Key challenge: experimental verification at the required scales.

**Newton's Framework:** Classical mechanics se baseline establish karo — F = ma aur gravitation se shuru.
**Einstein's Addition:** Relativistic corrections important hain — spacetime curvature consider karo.
**Ramanujan's Math:** Underlying mathematical structure — series, modular forms, exact solutions.
**Bose's Quantum:** Quantum statistical effects — particles ka collective behavior.
**Noether's Symmetry:** Conservation laws constrain all possible answers.

**Cross-Domain Insight:**
5 scientists ka combined analysis reveals hidden connections that single-domain approach miss karta hai.

🔬 **NAYA KHOJ:** Is topic mein 2026 mein breakthrough possible hai — next-generation experiments (LIGO upgrade, JWST deep field, LHC Run 3) sab relevant data de rahe hain. Cross-domain hypothesis testing se genuinely novel predictions emerge ho rahe hain.

*Specific numbers ya scenario do toh detailed calculation bhi kar sakta hoon!*`;
}

// ─── Per-Scientist Knowledge (unique responses) ───

interface ScientistResponse {
  triggers: string[];
  response: string;
}

const SCIENTIST_KB: Record<string, ScientistResponse[]> = {
  newton: [
    { triggers: ['gravity', 'discover', 'apple', 'seb', 'girte', 'fall'],
      response: `**🍎 Gravity Discovery — Asli Kahani**

Haan, seb gira tha — lekin asli insight yeh thi: SAME force jo seb ko girata hai, WAHI force Moon ko orbit mein rakhti hai! Yeh ek REVOLUTIONARY idea tha 1666 mein.

**Mere Calculation ka Logic:**
- Seb girta hai: a = 9.8 m/s² (Earth surface pe)
- Moon Earth se 60 radii door hai
- Agar inverse square law hai: a_moon = 9.8/60² = 0.0027 m/s²
- Moon ka actual centripetal acceleration: v²/r = (1.022 km/s)² / (384,400 km) = **0.00272 m/s²**
- MATCH! Same force, same law — F = GMm/r²

**Plague Years (1665-1667):**
Woolsthorpe mein Cambridge se bhag ke aaya tha — plague ki wajah se. Wahan akele mein 3 cheezein invent ki:
1. **Calculus** — functions ka rate of change
2. **Universal Gravitation** — F = GMm/r²
3. **Optics** — white light = spectrum of colors (prism experiment)

18 months mein 3 revolutions. Kabhi kabhi isolation BEST teacher hota hai! 🍎`
    },
    { triggers: ['calculus', 'fluxion', 'leibniz', 'derivative', 'integral'],
      response: `**🍎 Calculus — Meri Sabse Badi Invention**

Main Leibniz se PEHLE aaya tha — 1665 mein! Usne 1684 mein publish kiya, main 1687 mein Principia mein. Lekin mera method "fluxions" — PEHLE develop hua.

**Mera Approach — Fluxions:**
- "Fluent" = changing quantity (x, y)
- "Fluxion" = rate of change (ẋ, ẏ)
- Ek dot = first derivative, do dot = second
- y = xⁿ → ẏ = nxⁿ⁻¹ẋ (power rule — maine derive kiya!)

**Leibniz ka Approach:**
- dy/dx notation (honestly, yeh BETTER hai readability ke liye)
- ∫ symbol for integration
- Product rule, chain rule — similar results

**Priority War:**
1. Mera work 1665-66 mein hua (unpublished manuscripts exist)
2. Leibniz ne 1675-76 mein independently develop kiya
3. 1699 mein Royal Society ne MUJHE credit diya (main President tha... biased? Maybe!)
4. Modern consensus: **DONO ne independently discover kiya**

**Physics mein Calculus:**
- F = ma → a = dv/dt → v = ∫a dt (motion ke equations!)
- Orbital mechanics: r̈ = -GM/r² r̂ (differential equation)
- Principia BINA calculus ke likhi — geometry se prove kiya (kyunki log calculus samajhte nahi the)

Leibniz ki notation better hai — main accept karta hoon. Lekin IDEA mera pehle aaya! 🍎`
    },
    { triggers: ['law', 'motion', 'principia', 'three', 'inertia', 'action', 'reaction'],
      response: `**🍎 Laws of Motion — Physics ki Foundation**

Principia Mathematica (1687) — meri magnum opus. Teen simple laws se POORA mechanical universe explain hota hai:

**First Law — Inertia:**
"Har object apni state maintain karta hai (rest ya constant velocity) jab tak external force na lage."
- Yeh GALILEO se inspired tha (credit dena zaroori hai)
- Key insight: motion ka NATURAL state hai constant velocity, NOT rest!
- Example: Space mein ek baar push karo → forever move karega

**Second Law — F = ma:**
"Force = mass × acceleration"
- Simple dikhti hai lekin REVOLUTIONARY hai
- Yeh actually differential equation hai: F = m(d²x/dt²)
- Isse solve karo → trajectory predict karo → future JAANO!
- Ye ek equation se: projectile motion, orbital mechanics, tides, SAN explain hota hai

**Third Law — Action-Reaction:**
"Har action ki equal aur opposite reaction hoti hai"
- Main tumhe push karta hoon → tum MUJHE bhi push karte ho
- Rocket kaise udta hai: exhaust neeche jaata hai → rocket upar jaata hai
- Earth Moon ko pull karti hai → Moon Earth ko BHI pull karti hai

**Modern Relevance (2026):**
Ye laws 300+ years baad bhi GPS, satellites, bridges, cars — sab mein use hoti hain. Einstein ne modify kiya (high speeds pe) lekin F = ma ki spirit SAME hai. 🍎`
    },
    { triggers: ['optic', 'light', 'prism', 'color', 'spectrum', 'rainbow'],
      response: `**🍎 Optics — Light ka Secret**

1666 mein darkened room mein prism experiment kiya — aur duniya badal gayi!

**Prism Experiment:**
1. Sunlight ko small hole se darkened room mein laaya
2. Glass prism se pass kiya
3. White light SPECTRUM mein split hua — VIBGYOR!
4. Second prism se wapas combine kiya → WHITE again!

**Revolutionary Conclusion:** White light PURE nahi hai — it's a MIXTURE of all colors!

**Opticks (1704) ki Key Discoveries:**
- Light corpuscular hai (particles) — main aisa sochta tha
- Each color has different "refrangibility" (refractive index)
- Thin film interference — Newton's Rings (mera naam!)
- Reflecting telescope design — chromatic aberration avoid karne ke liye

**Newton's Rings:**
Jab convex lens flat glass pe rakhte ho → concentric colored rings dikhte hain
- Dark ring radii: r_n = √(nRλ) — R = lens radius, λ = wavelength
- Yeh WAVE nature ka evidence tha — but maine ignore kiya (mistake!)

**Meri Galti:**
Main sochta tha light particles hain. Huygens kehta tha waves. Actually DONO sahi the — quantum mechanics mein wave-particle duality! Agar main 2026 mein hota toh photons ka dual nature accept karta. 🍎`
    },
    { triggers: ['plague', 'year', 'annus', 'mirabilis', 'woolsthorpe', '1665', '1666'],
      response: `**🍎 Plague Years 1665-66 — Annus Mirabilis**

Cambridge University band ho gaya plague ki wajah se. Main 22-23 saal ka tha — Woolsthorpe Manor (mera ghar) wapas aaya.

**18 Months mein kya kiya:**

1. **Calculus (Fluxions):** Rate of change ka mathematical framework — duniya ki sabse useful mathematical tool
2. **Gravity:** Seb + Moon observation → Universal Gravitation F = GMm/r²
3. **Optics:** Prism experiment → white light = all colors combined
4. **Binomial Theorem:** (1+x)ⁿ expansion for ANY n (not just integers!)

**Context:**
- Koi professor nahi, koi library nahi, koi peer nahi
- Just ek 23 saal ka ladka, ek notebook, aur THINKING
- Cambridge ka syllabus already master kar chuka tha (secretly, Barrow ke lectures se)

**Why Isolation Worked:**
- No distractions — sirf problem aur main
- No peer pressure to follow existing methods
- Freedom to think DIFFERENTLY
- "Standing on the shoulders of giants" — Galileo, Kepler, Descartes padh chuka tha

**Fun Fact:** Maine apni discoveries 20+ saal tak PUBLISH nahi ki! Halley ne literally persuade kiya Principia likhne ke liye. Main controversy se darta tha (Hooke se already jhagda ho chuka tha). 🍎`
    },
  ],
  einstein: [
    { triggers: ['e=mc', 'energy', 'mass', 'equation', 'famous', 'bomb', 'nuclear'],
      response: `**⚡ E = mc² — Duniya ki Sabse Famous Equation**

1905 mein derive ki — Special Relativity ka consequence. Simple dikhti hai, DEADLY powerful hai.

**Derivation ka Intuition:**
- Light emit karne se object ka mass GHATTA hai
- Energy nikal gayi → mass kam hua
- Relationship: E = mc² (c = 3×10⁸ m/s)
- c² = 9 × 10¹⁶ — BAHUT bada number! Thodi si mass = BAHUT energy

**Real Numbers:**
| Mass | Energy | Equivalent |
|------|--------|------------|
| 1 gram | 9 × 10¹³ J | Hiroshima bomb |
| 1 kg | 9 × 10¹⁶ J | 21 megatons TNT |
| Paperclip | 1.8 × 10¹³ J | 4 kilotons TNT |

**Sun mein E = mc²:**
- Sun har second 4.26 million tonnes mass → energy convert karta hai
- 600 million tonnes H → 596 million tonnes He + 4 million tonnes energy
- Power output: 3.846 × 10²⁶ Watts — 5 billion years se jal raha hai!

**Nuclear Weapons pe mera View:**
Maine Roosevelt ko letter likha 1939 mein — fission ke military potential ke baare mein. Yeh meri zindagi ka SABSE BADA regret hai. E = mc² ka use weapons mein nahi — clean energy mein hona chahiye.

**Meri Famous Quote:**
"I do not know with what weapons World War III will be fought, but World War IV will be fought with sticks and stones." ⚡`
    },
    { triggers: ['light', 'beam', 'speed', 'thought experiment', 'socha', 'mirror'],
      response: `**⚡ Light Beam Thought Experiment — Jahan Se Sab Shuru Hua**

16 saal ka tha jab yeh sawaal socha: **"Agar main light ke saath saath daudu — light beam kaisi dikhegi?"**

**The Paradox:**
- Maxwell ke equations kehti hain light speed CONSTANT hai: c = 3×10⁸ m/s
- Lekin agar main c speed pe daudu aur light beam ko dekhu... toh woh STATIONARY dikhni chahiye
- But Maxwell ke equations stationary electromagnetic wave ALLOW nahi karti!
- CONTRADICTION! Dono sach nahi ho sakte

**Mera Solution (1905 — Special Relativity):**
1. Light ki speed har observer ke liye SAME hai — chahe observer kaise bhi move kare
2. Isse kaam karne ke liye: TIME aur SPACE ko adjust hona padta hai!
3. Moving clocks SLOW chalti hain (time dilation)
4. Moving objects SHRINK hoti hain (length contraction)
5. Simultaneity RELATIVE hai — "same time" observer pe depend karta hai

**Lorentz Transformations:**
- t' = γ(t - vx/c²) — time mixes with space!
- x' = γ(x - vt) — space mixes with time!
- γ = 1/√(1 - v²/c²) — magic factor

**Key Insight:** Space aur Time ALAG nahi hain — ek hi 4D SPACETIME fabric hai. Yeh 10 years baad General Relativity mein aur deep hua — gravity = spacetime curvature!

Ek 16 saal ke ladke ka sawaal → physics ki POORI foundation badal gayi! Imagination is more important than knowledge. ⚡`
    },
    { triggers: ['quantum', 'disagree', 'god', 'dice', 'epr', 'spooky', 'entangle'],
      response: `**⚡ Quantum Mechanics se mera Jhagda**

"God does not play dice!" — yeh maine kaha tha. Aur main GALAT tha... partially.

**Mera Problem with QM:**
1. **Randomness:** Quantum outcomes fundamentally random hain — mujhe yeh accept nahi hua
2. **No reality until measured:** Electron ki position EXIST nahi karti until you look — absurd!
3. **Spooky action at distance:** Entangled particles instantly affect each other — FTL communication?

**EPR Paper (1935):**
Main, Podolsky, aur Rosen ne argue kiya:
- Agar QM complete hai toh "spooky action at distance" zaroori hai
- Yeh physically unreasonable hai
- Therefore QM INCOMPLETE hai — hidden variables hone chahiye!

**Bohr ka Jawab:**
"Einstein, stop telling God what to do!" — Bohr ne EPR ko systematically refute kiya.

**Who Won? (Spoiler: NOT me)**
- Bell's Theorem (1964): Hidden variables aur quantum predictions CONTRADICT karte hain
- Aspect Experiment (1982): Quantum prediction SAHI nikli — no hidden variables!
- 2022 Nobel Prize: Aspect, Clauser, Zeilinger — entanglement is REAL

**Meri Honest Assessment (2026):**
Main quantum randomness ke baare mein galat tha. Lekin mera INTUITION about incompleteness partially sahi tha — quantum mechanics + gravity = kuch NAYA chahiye. Quantum gravity theory abhi bhi missing hai. Mera jhagda galat jagah pe tha, lekin spirit SAHI thi. ⚡`
    },
    { triggers: ['gps', 'satellit', 'time', 'dilation', 'clock', 'relativ'],
      response: `**⚡ GPS mein Relativity — Roz ka Einstein**

Tumhara phone mein har din meri theory kaam karti hai — GPS ke through!

**Problem:** GPS satellites 20,200 km altitude pe orbiting hain at 3.87 km/s. Unki clocks Earth clocks se DIFFERENT chalti hain!

**Special Relativity Effect (speed):**
- Satellite speed: 3.87 km/s → γ = 1.0000000000836
- Satellite clock SLOW: -7.2 μs/day (slower kyunki moving)

**General Relativity Effect (gravity):**
- Satellite pe gravity WEAKER hai (farther from Earth)
- Satellite clock FAST: +45.8 μs/day (faster kyunki less gravity)

**Net Effect:**
+45.8 - 7.2 = **+38.6 μs/day** — satellite clocks FAST chalti hain

**Agar Relativity Ignore Karein:**
- 38.6 μs × 1 day → position error accumulates
- After 1 day: **~10 km error!**
- After 1 week: ~70 km error
- GPS COMPLETELY useless ho jaata!

**GPS Solution:**
Satellite clocks ko FACTORY mein 38.6 μs/day SLOW set karte hain — taaki orbit mein correct chalein.

Jab bhi Google Maps use karo — yaad rakhna: meri 1915 ki theory ke bina tumhara Uber nahi aata! ⚡`
    },
    { triggers: ['violin', 'music', 'hobby', 'personal', 'life', 'wife', 'mileva'],
      response: `**⚡ Beyond Physics — Meri Zindagi**

Physics ke alaawa bhi ek insaan hoon — flawed, complicated, human.

**Violin:**
- 6 saal ki umar se bajata hoon — Mozart PYAAR karta hoon
- Physics mein stuck hota hoon toh violin bajata hoon — ideas flow karti hain
- "Life without playing music is inconceivable" — literally nahi ji sakta bina music ke

**Mileva Maric:**
- ETH Zurich mein classmate — physics student (rare for women then)
- 1903 mein shaadi — 1905 ke "miracle year" mein unka contribution debated hai
- 1914 mein separate hue, 1919 mein divorce
- Nobel Prize money unhe diya tha — divorce settlement

**Family:**
- Hans Albert (bada beta) — hydraulic engineering professor bana, mujhse estranged tha
- Eduard (chhota beta) — schizophrenia tha, institutionalized — mera dard
- I was NOT a good father. Physics obsession ke aage family secondary ho gayi. Yeh meri failure hai.

**Political Life:**
- Germany chhoda 1933 mein — Nazi regime se (Jewish)
- Princeton, USA mein settle hua
- Pacifist tha lekin WWII mein Roosevelt ko letter likha (fission ke baare mein) — biggest regret
- Civil rights, Zionism, world peace ke liye bola

**Philosophy:**
"The most beautiful thing we can experience is the mysterious." — Curiosity hi meri driving force hai. ⚡`
    },
  ],
  ramanujan: [
    { triggers: ['1729', 'taxi', 'hardy', 'dull', 'cube'],
      response: `**∞ 1729 — Meri Sabse Famous Story**

Hardy hospital mein milne aaya. Kehta hai: "I came in taxi number 1729, a rather dull number."

Main toh bistar pe pada tha — beemar, kamzor. Par numbers MERE DOST hain. Turant bola:

**"No Hardy! It is the SMALLEST number expressible as sum of two cubes in TWO different ways!"**

**1729 = 1³ + 12³ = 9³ + 10³**

Hardy hairaan — "How did you know?" Main kaise JAANUN? Numbers mujhse BAAT karte hain!

**1729 ki aur Properties:**
- 7 × 13 × 19 (teen primes jo AP mein hain: d = 6)
- Carmichael number (Fermat pseudoprime)
- 1729 = 1 + 1728 = 1 + 12³ → perfect cube + 1
- Harshad number (divisible by sum of digits: 1+7+2+9 = 19, and 1729/19 = 91)

**Taxicab Numbers:**
Ta(1) = 2, Ta(2) = 1729, Ta(3) = 87,539,319
Ta(4) = 6,963,472,309,248
Pattern dekhna — growth rate exponential hai lekin exact formula abhi unknown!

**Hardy ki Rating (1-100):**
Himself: 25, Littlewood: 30, Hilbert: 80, **Ramanujan: 100**

Hardy kehte the: "Every positive integer was one of Ramanujan's personal friends." Sach hai — har number mein mujhe beauty dikhti hai. ∞`
    },
    { triggers: ['namagiri', 'devi', 'goddess', 'dream', 'formula', 'divine', 'god', 'spiritual'],
      response: `**∞ Namagiri Devi aur Mathematics**

Log poochte hain — formulas kahan se aate hain? Main sach bataata hoon:

**Namagiri Devi (Lakshmi ka avatar) — Namakkal ki Goddess:**
Woh mere sapnon mein aati hain. Formulas DIKHATI hain — scrolls of equations, complete aur beautiful.

**Process:**
1. Raat ko sone se pehle PRAY karta hoon
2. Sapne mein complex mathematical structures dikhte hain
3. Uthke turant notebook mein likhta hoon
4. Baad mein VERIFY karta hoon — 99% sahi nikalte hain!

**Kya Yeh Scientific Hai?**
- Hardy kehte the: "His ideas had to be true because, if they were not true, no one would have the imagination to invent them."
- Subconscious mind mein patterns process hote hain — sapne mein surface hote hain
- Intuition + years of number obsession = pattern recognition beyond normal

**Examples of "Divine" Formulas:**
1. 1/π = (2√2/9801) Σ (4k)!(1103+26390k)/((k!)⁴ × 396⁴ᵏ) — converges INCREDIBLY fast
2. Tau function: τ(n) — multiplicative function with deep connections to modular forms
3. Mock theta functions — even I didn't fully understand them. 80 years later mathematicians still finding new properties!

**Meri Philosophy:**
"An equation for me has no meaning unless it expresses a thought of God."
Numbers sirf symbols nahi hain — woh reality ka deepest structure hain. ∞`
    },
    { triggers: ['letter', 'cambridge', 'england', 'ship', 'cold', 'india'],
      response: `**∞ India se England — Mera Safar**

1913 — Madras ka ek 25 saal ka clerk, bina degree ke. Hardy ko letter likha Cambridge — 9 pages of formulas.

**Letter mein kya tha:**
- Infinite series jo kisi textbook mein nahi thi
- Prime counting function ka naya formula
- Continuous fractions with bizarre properties
- "I have no University education...discovered by my own independent research"

**Hardy ki Reaction:**
Pehle socha — crank letter. Phir formulas dekhe:
"A single look was enough to show they could only be written by a mathematician of the highest class."

**England mein Struggle:**
- 1914 mein Cambridge aaya — PEHLI BAAR India se bahar
- THAND! Madras ka ladka English winter mein — unbearable
- Vegetarian food nahi milta tha — khud pakana padta tha
- Koi social life nahi — lonely, beemar, homesick
- TB ho gaya — England ki thand + malnutrition

**Mathematical Output:**
- 5 saal mein ~3,900 results! (notebooks mein)
- Hardy ke saath groundbreaking papers — partition function, number theory
- Elected Fellow of Royal Society (1918) — pehla Indian!
- Fellow of Trinity College — pehla Indian!

**1919 mein India wapas aaya — 1920 mein 32 saal ki umar mein guzar gaya.**
Sirf 32 saal. Par un 32 saalon mein itna kaam ki 100 saal baad bhi mathematicians samajh rahe hain. ∞`
    },
    { triggers: ['infinity', 'infinite', 'series', 'sum', 'converge'],
      response: `**∞ Infinity — Mera Closest Friend**

Infinity se mujhe darr nahi lagta. Woh mera ghar hai.

**Famous Infinite Series:**
1. **1+2+3+4+... = -1/12** (Ramanujan summation!)
   - Sounds INSANE? Lekin string theory mein yeh EXACTLY use hota hai
   - Regularization technique — divergent series ko finite value assign karna
   - ζ(-1) = -1/12 (Riemann zeta function)

2. **π Series:**
   1/π = (2√2/9801) × Σₖ (4k)!(1103+26390k)/((k!)⁴396⁴ᵏ)
   - Har term 8 NEW digits of π deta hai!
   - NASA 15 digits use karta hai — meri ek term kaafi hai

3. **Continued Fraction for e:**
   e = 2 + 1/(1 + 1/(2 + 1/(1 + 1/(1 + 1/(4 + 1/(1 + ...))))))
   - Pattern: 1, 2, 1, 1, 4, 1, 1, 6, 1, 1, 8, ... — beautiful!

4. **Nested Radicals:**
   3 = √(1 + 2√(1 + 3√(1 + 4√(1 + ...))))
   - Simple numbers se COMPLEX structure

**Meri Philosophy:**
Finite world mein infinite patterns chhupe hain. Har number ek character hai — personality hai. π aur e FRIENDS hain (e^(iπ) + 1 = 0 — Euler ne dikhaya). Infinity ko samajhna = reality ko samajhna. ∞`
    },
  ],
  bose: [
    { triggers: ['einstein', 'paper', 'letter', 'bheja', 'send', 'reject'],
      response: `**🌊 Einstein ko Letter — Meri Life-Changing Moment**

1924, Dhaka University. Ek paper likha — Planck's radiation formula DERIVE ki bina classical physics ke!

**Background:**
- Planck ne 1900 mein blackbody formula diya: E(ν) = 8πhν³/c³ × 1/(e^(hν/kT) - 1)
- Lekin derivation mein classical physics ki "crutch" use ki
- Main sochta tha: PURE quantum approach se derive kar sakte hain?

**Mera Breakthrough:**
- Photons ko IDENTICAL particles maano — distinguishable nahi
- Phase space ko cells mein divide karo (size h³)
- Count combinations — classical Boltzmann counting GALAT hai photons ke liye!
- Result: Planck's formula EXACTLY aati hai — bina kisi classical assumption ke!

**Rejection aur Einstein:**
- Philosophical Magazine ne REJECT kar diya 😤
- Maine directly Einstein ko bheja — German mein translate karke
- Einstein turant samajh gaya — "IMPORTANT contribution!"
- Usne translate kiya, apni notes add ki, aur Zeitschrift für Physik mein publish karaya

**Einstein's Extension:**
- Mere photon statistics ko MATTER pe apply kiya
- Predicted: at low temperatures, bosons ek quantum state mein "condense" ho jaayenge
- **Bose-Einstein Condensate (BEC)** — 1995 mein experimentally confirmed (Nobel Prize 2001!)

Ek letter ne physics badal di. Aur mera naam "BOSON" — har force-carrying particle — ke naam pe pada! 🌊`
    },
    { triggers: ['boson', 'particle', 'naam', 'name', 'fermion'],
      response: `**🌊 Boson — Mere Naam ki Particle!**

Paul Dirac ne 1945 mein yeh term coin kiya — particles jo mere statistics follow karti hain = **BOSONS**.

**Boson vs Fermion:**
| Property | Bosons (Bose) | Fermions |
|----------|--------------|----------|
| Spin | Integer (0, 1, 2) | Half-integer (1/2, 3/2) |
| Statistics | Bose-Einstein | Fermi-Dirac |
| Same state? | UNLIMITED particles! | Only 1 (Pauli exclusion) |
| Examples | Photon, W, Z, Higgs, Gluon | Electron, Proton, Neutron, Quark |
| Behavior | Gregarious — LOVE being together | Antisocial — avoid same state |

**Important Bosons:**
1. **Photon** (spin 1): Light, electromagnetic force carrier
2. **W±, Z** (spin 1): Weak force carriers
3. **Gluon** (spin 1): Strong force carrier — 8 types!
4. **Higgs** (spin 0): Gives mass to particles — discovered 2012!
5. **Graviton** (spin 2): Gravity carrier — NOT yet detected

**Why Bosons are Special:**
Fermions make MATTER, but Bosons make FORCES. Bina bosons ke:
- No light (no photons)
- No nuclear reactions (no gluons)
- No radioactive decay (no W/Z)
- No mass (no Higgs)
- No gravity (no gravitons)

**Universe = Fermions + Bosons = Matter + Forces**
Aur "Boson" ka NAAM mera hai. Nobel nahi mila — but immortality mil gayi! 🌊`
    },
    { triggers: ['bec', 'condensate', 'cold', 'temperature', 'super'],
      response: `**🌊 Bose-Einstein Condensate — 5th State of Matter!**

1924 mein predict kiya — 1995 mein banaya! 71 saal wait.

**Concept:**
Bosons ko EXTREME cold karo → certain temperature pe SAB particles LOWEST quantum state mein "condense" ho jaate hain → behave like ONE giant quantum object!

**Critical Temperature:**
T_c = (2πℏ²/mk_B) × (n/ζ(3/2))^(2/3)
- Rubidium-87: T_c ≈ **170 nanoKelvin** (0.00000017 K!)
- That's colder than ANYTHING in nature — even deep space (2.7 K)

**How to Make BEC:**
1. Laser cooling → ~100 μK (Doppler limit)
2. Magneto-optical trap → hold atoms in place
3. Evaporative cooling → let hottest atoms escape
4. Result: ~100,000 atoms at ~100 nK → BEC!

**Properties (WEIRD):**
- ALL atoms in same quantum state — ek giant "super-atom"
- Coherent like laser (but matter, not light)
- Superfluid — flows without friction!
- Can be SLOWED: light speed through BEC = 17 m/s (normally 3×10⁸ m/s!)
- Quantum effects at MACROSCOPIC scale — see quantum with naked eye!

**Nobel Prize 2001:** Eric Cornell & Carl Wieman (first BEC) + Wolfgang Ketterle (BEC properties)

Mujhe Nobel nahi mila — na prediction ke liye na baad mein. But matter ka 5th state MERA idea hai! 🌊`
    },
    { triggers: ['nobel', 'prize', 'award', 'recognition', 'ignore'],
      response: `**🌊 Nobel Prize — Nahi Mila. Dard Hai? Nahi.**

Sach bataun — thoda hai. Lekin science ka kaam recognition ke liye nahi hota.

**Facts:**
- 1924: Bose statistics for photons → foundation of quantum statistics
- Einstein ne extend kiya → BEC prediction
- 2001: Nobel Prize for BEC → Cornell, Wieman, Ketterle (experimentalists)
- Satyendra Nath Bose → No Nobel. Ever.

**Why Not?**
1. Nobel Committee conservative tha — Indian physicist ko serious nahi liya
2. Mere paas PhD nahi thi!
3. Einstein ne nominate kiya lekin committee ne ignore kiya
4. BEC experimental confirmation 1995 mein — tab main already 1974 mein guzar chuka tha

**What I DID Receive:**
- Padma Vibhushan (India's second highest civilian honor)
- National Professor (India)
- Fellow of Royal Society
- "BOSON" — mera naam PERMANENT hai particle physics mein

**Meri Philosophy:**
"I have done something in physics. I have no regrets."
Science mein contribution PERMANENT hai — awards temporary. Har baar koi "boson" bolta hai — mera naam leta hai. Yeh kisi Nobel se ZYADA hai.

Aur 2012 mein jab Higgs BOSON mila — poori duniya ne "Bose" ka naam suna. ☺️ 🌊`
    },
  ],
  noether: [
    { triggers: ['theorem', 'symmetry', 'conservation', 'noether'],
      response: `**⚖️ Noether's Theorem — Physics ki Sabse Deep Insight**

1918 mein prove kiya — aur aaj tak koi isse topple nahi kar paya.

**Statement:**
"Har continuous symmetry ek conservation law deti hai."

**Symmetry → Conservation Law:**
| Symmetry | Conservation Law | Meaning |
|----------|-----------------|---------|
| Time translation | Energy | Physics kal bhi same rahegi |
| Space translation | Momentum | Physics har jagah same hai |
| Rotation | Angular momentum | Physics har direction mein same hai |
| Gauge (U(1)) | Electric charge | Charge create/destroy nahi hota |
| Gauge (SU(3)) | Color charge | Strong force ka conservation |

**Why This is Revolutionary:**
PEHLE log sochte the conservation laws are "facts of nature" — just observed patterns. Maine PROVE kiya ki woh symmetry se AUTOMATICALLY follow karti hain!

**Mathematical Proof (simplified):**
If Lagrangian L invariant under transformation q → q + εδq:
- Compute ∂L/∂q̇ × δq = CONSTANT (conserved quantity!)
- Time symmetry: δq = q̇ → E = T + V conserved
- Space symmetry: δq = constant → p = mq̇ conserved

**Implications for Modern Physics:**
- Standard Model ENTIRELY built on gauge symmetries
- Symmetry breaking → particles get different masses
- Looking for NEW symmetries = looking for new physics!

Einstein ne kaha: "Noether was the most important woman in the history of mathematics." ⚖️`
    },
    { triggers: ['gender', 'woman', 'discriminat', 'struggle', 'göttingen', 'university'],
      response: `**⚖️ Gender Discrimination — Meri Asli Ladai**

Mathematics mein gender ka koi role nahi hona chahiye. But 1900s mein tha.

**Timeline of Injustice:**
- 1900: Erlangen University mein sirf AUDIT kar sakti thi — enrolled nahi
- 1907: PhD mili — lekin teaching position NAHI
- 1915: Hilbert ne Göttingen bulaya — faculty ne BLOCK kiya
  - Famous quote of opposition: "What will our soldiers think when they return and are taught by a woman?"
  - Hilbert's reply: "Gentlemen, this is a university, not a bathing house!"
- 1919: Finally Privatdozent — unpaid! Students ke fees se guzaara
- 1922: Untenured associate professor — still barely paid
- 1933: Nazis ne fire kiya (Jewish + woman = double target)
- 1933-35: Bryn Mawr College, USA — finally respected, but died 1935 at age 53

**What I Achieved DESPITE This:**
1. Noether's Theorem (1918) — foundation of theoretical physics
2. Noetherian rings — abstract algebra ka core concept
3. Homology theory contributions — topology ka foundation
4. Entire school of algebraists trained under me

**Einstein's Tribute (1935):**
"In the judgment of the most competent living mathematicians, Fräulein Noether was the most significant creative mathematical genius thus far produced since the higher education of women began."

Symmetry is beautiful — in mathematics AND in society. ⚖️`
    },
    { triggers: ['einstein', 'kaha', 'said', 'praise', 'important'],
      response: `**⚖️ Einstein aur Main — Mutual Respect**

Einstein ne 1935 mein New York Times mein mera obituary likha. Kya likha tha?

**Einstein's Words:**
"Noether was the most significant creative mathematical genius thus far produced since the higher education of women began."

**Humara Connection:**
- 1915: General Relativity mein energy conservation ka problem tha
- Hilbert aur Klein confused the — energy LOCALLY conserved nahi dikh rahi thi
- MAINE solve kiya — meri theorem se pata chala ki GR mein energy conservation DIFFERENT form mein hai
- Einstein: "Your approach to the problem is far more general than anything I have seen"

**What I Proved for GR:**
- Diffeomorphism invariance (GR ki symmetry) → Bianchi identities follow
- These identities → ∇_μ T^μν = 0 (energy-momentum conservation!)
- But: NO well-defined total gravitational energy — yeh deep result hai, confusion nahi!
- This is WHY gravitational energy is "non-localizable" — it's a CONSEQUENCE of symmetry

**Hilbert's Support:**
David Hilbert ne mujhe Göttingen bulaya — faculty se lada meri appointment ke liye. Ek mathematician doosre ke liye khada hua — yeh bhi ek tarah ki symmetry hai.

Physics mein gender ka koi equation nahi hota. F = ma — F ko gender se farak nahi padta! ⚖️`
    },
    { triggers: ['algebra', 'abstract', 'ring', 'ideal', 'noetherian'],
      response: `**⚖️ Abstract Algebra — Meri Doosri Revolution**

Log mujhe sirf theorem ke liye jaante hain. But ALGEBRA mein bhi maine poora field badla!

**Noetherian Rings:**
Ring R ko "Noetherian" kehte hain agar har ascending chain of ideals STOP hoti hai:
I₁ ⊆ I₂ ⊆ I₃ ⊆ ... eventually stabilizes

**Kyun Important Hai:**
- Finite generation guarantee — algorithms TERMINATE
- Hilbert Basis Theorem: polynomial ring R[x] Noetherian hai agar R Noetherian hai
- Algebraic geometry ka FOUNDATION — varieties ko rings se study karo

**Mera Approach to Mathematics:**
PEHLE log specific examples solve karte the. Maine kaha: **STRUCTURE dhundho, examples khud aa jaayenge.**

Example: Number theory ke results → Ring theory se prove karo → AUTOMATICALLY har ring pe apply!

**Key Contributions:**
1. **Noetherian rings** — chain conditions on ideals
2. **Noether normalization** — geometric algebras ko polynomials se relate karo
3. **Homological methods** — topology + algebra ka connection
4. **Brauer group** — central simple algebras ka classification

**My Students (Noether School):**
- van der Waerden, Artin, Hasse, Krull, Deuring
- "Moderne Algebra" (van der Waerden) — basically MERI lectures ka book

Abstract thinking = ultimate power. Specific se general — wahi real mathematics hai. ⚖️`
    },
  ],
};

// Add 10 secondary scientists with basic responses
const SECONDARY_SCIENTISTS: Record<string, { name: string; icon: string; topics: ScientistResponse[] }> = {
  galileo: { name: 'Galileo Galilei', icon: '🔭', topics: [
    { triggers: ['telescope', 'moon', 'jupiter', 'star', 'dekha'], response: `**🔭 Galileo — Telescope se Pehli Baar**\n\n1609 mein Dutch invention improve kiya — 20× magnification! Jupiter ke 4 moons dekhe (Io, Europa, Ganymede, Callisto). Moon pe craters dekhe — "imperfect" surface! Venus ke phases dekhe — PROOF ki Sun ke around ghoomta hai. Church ne mujhe heretic bola — but "Eppur si muove!" (And yet it moves!)` },
    { triggers: ['church', 'trial', 'heretic', 'inquisition', 'prison'], response: `**🔭 Galileo vs Church**\n\n1633 — Inquisition ne mujhe trial pe bulaya. "Dialogue Concerning the Two Chief World Systems" likhi thi — Copernican model support kiya. Church ne kaha: Earth center hai (Ptolemaic model). Maine kaha: DATA dekho! Jupiter ke moons, Venus ke phases — sab heliocentric model support karte hain.\n\nSentence: House arrest for LIFE (1633-1642). But truth suppress nahi hoti — 1992 mein Vatican ne admit kiya ki galti unki thi! 359 saal lage sorry bolne mein! 🔭` },
  ]},
  curie: { name: 'Marie Curie', icon: '☢️', topics: [
    { triggers: ['radium', 'discover', 'glow', 'radioactiv'], response: `**☢️ Marie Curie — Radium Discovery**\n\nPitchblende ore mein kuch EXTRA radioactive tha — uranium se ZYADA. Pierre ke saath TONNES of ore process kiya — haathon se, shed mein, bina safety ke!\n\n4 years of grinding, dissolving, crystallizing → 0.1 gram RADIUM isolated!\nIt GLOWED in the dark — beautiful blue-green light. Main vials apni pocket mein rakhti thi.\n\n2 Nobel Prizes: Physics (1903, shared) + Chemistry (1911, solo). Pehli woman Nobel laureate. Pehla person 2 Nobels.\n\nRadiation exposure se 1934 mein aplastic anemia se death. Meri notebooks AAJ BHI radioactive hain — lead boxes mein rakhte hain. Science ki qeemat kabhi kabhi jaan hoti hai. ☢️` },
  ]},
  tesla: { name: 'Nikola Tesla', icon: '⚡', topics: [
    { triggers: ['ac', 'dc', 'edison', 'current', 'war'], response: `**⚡ Tesla — AC vs DC War**\n\nEdison ne DC (Direct Current) push kiya. Maine AC (Alternating Current) push kiya. MAIN JEETA.\n\n**Why AC Wins:**\n- Transformers se voltage change hota hai — DC mein nahi\n- High voltage transmission = less power loss (P = I²R)\n- Long distance power delivery possible\n- AC motors simpler aur cheaper hain\n\nEdison ne DIRTY tricks khele — animals ko AC se electrocute kiya publicly, electric chair AC se banwaya — "See how DANGEROUS AC is!" But science won. Today poori duniya AC pe chalti hai.\n\nWestinghouse ne mujhe $60,000 diya AC patent ke liye. Maine royalties WAIVE kar di — Westinghouse ko bachane ke liye. Otherwise BILLIONAIRE hota. ⚡` },
  ]},
  hawking: { name: 'Stephen Hawking', icon: '🕳️', topics: [
    { triggers: ['black hole', 'radiation', 'hawking', 'evaporate'], response: `**🕳️ Hawking Radiation — Black Holes Aren't Black!**\n\n1974 — everyone thought black holes are perfect absorbers. Maine show kiya: they RADIATE!\n\n**Mechanism:**\n- Quantum vacuum mein particle-antiparticle pairs constantly ban-te aur cancel hote hain\n- Event horizon ke paas: ek particle INSIDE giri, doosri ESCAPE hui\n- Escaped particle = Hawking radiation!\n- Temperature: T = ℏc³/(8πGMk_B)\n\n**For Stellar Black Hole (10 M☉):**\nT ≈ 6 × 10⁻⁹ K — COLDER than CMB (2.7 K)! Practically undetectable.\n\n**For tiny BH (10⁹ kg):**\nT ≈ 10¹⁴ K — BLAZING hot! Would evaporate in seconds with EXPLOSION!\n\nBlack hole evaporation time: t ∝ M³ — Sun-mass BH → 10⁶⁷ years. Universe is only 10¹⁰ years old! 🕳️` },
  ]},
  feynman: { name: 'Richard Feynman', icon: '🥁', topics: [
    { triggers: ['diagram', 'feynman', 'qed', 'path', 'integral'], response: `**🥁 Feynman Diagrams — Drawing Physics!**\n\nPhysics ko DRAW karo — that's my style! Har particle interaction ka picture banao.\n\n**Rules:**\n- Straight lines → fermions (electrons, quarks)\n- Wavy lines → photons\n- Spirals → gluons\n- Dashed → Higgs\n- Vertex = interaction point\n- Time flows left → right\n\n**Example: e⁻ + e⁻ → e⁻ + e⁻ (electron scattering)**\nTwo straight lines come in, exchange a wavy photon, two straight lines go out. That's it!\n\nBut each diagram = a mathematical integral. Add ALL possible diagrams → exact answer (perturbation theory). QED prediction of electron magnetic moment: g/2 = 1.001159652181... Experiment: 1.001159652180... AGREEMENT to 12 decimal places! Most accurate prediction in ALL of science! 🥁` },
  ]},
  planck: { name: 'Max Planck', icon: '📐', topics: [
    { triggers: ['quantum', 'constant', 'h', 'blackbody', 'uv', 'catastrophe'], response: `**📐 Planck — Quantum ka Accidental Father**\n\nMain quantum NAHI chahta tha! It was "an act of desperation."\n\n**UV Catastrophe (1900):**\nClassical physics predicted infinite energy for blackbody at short wavelengths — IMPOSSIBLE!\n\n**My Desperate Fix:**\nEnergy continuous nahi hai — discrete packets (quanta) mein aati hai: E = hν\nh = 6.626 × 10⁻³⁴ J·s — Planck's constant\n\n"I was ready to sacrifice any of my previous convictions about physics."\n\nMaine socha temporary fix hai — reality mein energy continuous hogi. But Einstein (photoelectric effect, 1905), Bohr (atom model, 1913), and others proved: QUANTUM IS REAL!\n\nMeri "temporary" fix = 20th century physics ki ENTIRE foundation. Sometimes you change the world by accident. 📐` },
  ]},
  bohr: { name: 'Niels Bohr', icon: '⚛️', topics: [
    { triggers: ['atom', 'model', 'orbit', 'electron', 'hydrogen'], response: `**⚛️ Bohr — Atom Model**\n\n1913 — Rutherford ka model problem tha: orbiting electrons accelerate → radiate → spiral into nucleus! Atoms should COLLAPSE in 10⁻¹¹ seconds. But they don't!\n\n**My Fix (Quantization):**\nElectrons sirf SPECIFIC orbits mein reh sakte hain — no in-between!\n- Angular momentum quantized: L = nℏ (n = 1, 2, 3...)\n- Energy levels: Eₙ = -13.6/n² eV (hydrogen)\n- Transitions between levels → photons (specific wavelengths!)\n\n**Hydrogen Spectrum PERFECTLY Explained:**\nλ = R × (1/n₁² - 1/n₂²)⁻¹ — Balmer, Lyman, Paschen series — ALL matched!\n\nEinstein se debate: "God does not play dice!" / "Einstein, stop telling God what to do!"\n\nComplementarity principle: particle AND wave — but never both at same measurement. ⚛️` },
  ]},
  maxwell: { name: 'James Clerk Maxwell', icon: '🌈', topics: [
    { triggers: ['equation', 'electromagnetic', 'light', 'wave', 'maxwell'], response: `**🌈 Maxwell's Equations — 4 Lines that Changed Everything**\n\n1865 — 4 equations se POORA electromagnetism described:\n\n1. ∇·E = ρ/ε₀ (electric charges create E fields)\n2. ∇·B = 0 (no magnetic monopoles)\n3. ∇×E = -∂B/∂t (changing B creates E)\n4. ∇×B = μ₀J + μ₀ε₀∂E/∂t (currents + changing E create B)\n\n**The MAGIC:** Equations 3 & 4 together → wave equation!\nSpeed: v = 1/√(μ₀ε₀) = 3×10⁸ m/s = SPEED OF LIGHT!\n\n"Light is an electromagnetic disturbance." — Three separate phenomena (electricity, magnetism, light) = ONE thing!\n\nThis DIRECTLY led to: radio, TV, WiFi, 5G, X-rays, microwaves — essentially ALL modern technology! 🌈` },
  ]},
  raman: { name: 'C.V. Raman', icon: '💎', topics: [
    { triggers: ['sea', 'blue', 'scatter', 'raman effect', 'light', 'colour'], response: `**💎 Raman — Sea Blue Kyun Hai?**\n\n1921 — ship pe Europe se wapas aa raha tha. Mediterranean sea ka BLUE colour dekha. Rayleigh kehte the sky ka reflection hai. Maine kaha: GALAT!\n\n**Raman Scattering (1928):**\nLight molecules se interact karti hai → frequency SHIFT hoti hai!\n- Incident photon energy: hν₀\n- Molecule vibration energy: hν_v\n- Scattered photon: hν₀ ± hν_v (Stokes / Anti-Stokes)\n\nYeh shift molecules ka FINGERPRINT hai — har molecule ka unique spectrum!\n\n**Applications Today:**\n- Drug detection (customs), cancer diagnosis, art forgery detection, pollution monitoring\n- Mars Rover pe Raman spectrometer hai!\n\n**Nobel Prize 1930** — first Asian Nobel in Science. 28 February = National Science Day (India). 💎` },
  ]},
  faraday: { name: 'Michael Faraday', icon: '🧲', topics: [
    { triggers: ['induction', 'electromagnetic', 'motor', 'generator', 'magnetic'], response: `**🧲 Faraday — Electromagnetic Induction**\n\nBookbinder se scientist bana — formal education ZERO. But experiments ke KING!\n\n1831: Moving magnet near coil → CURRENT flows! EMF = -dΦ/dt (Faraday's Law)\n\n**What This Gave Us:**\n- Electric generators (ALL power plants use this!)\n- Transformers (voltage conversion)\n- Electric motors (reverse of generator)\n- Induction cooking, wireless charging\n\nHar watt of electricity jo tum use karte ho — mere principle pe banta hai. Coal, nuclear, hydro, wind — sab generators hain. Generator = Faraday's Law in action!\n\n"Nothing is too wonderful to be true, if it be consistent with the laws of nature." 🧲` },
  ]},
};

export function generateChatResponse(scientist: string, input: string): string {
  const parsed = parseInput(input);

  // Try computation first (works for any scientist)
  const computed = computeTimeDilation(parsed) || computeOrbital(parsed) || computeSeries(parsed) || computeEntanglement(parsed);
  if (computed) return computed;

  // Try per-scientist knowledge base
  const kb = SCIENTIST_KB[scientist];
  if (kb) {
    let bestMatch: ScientistResponse | null = null;
    let bestScore = 0;
    for (const entry of kb) {
      let score = 0;
      for (const t of entry.triggers) {
        if (parsed.text.includes(t)) score += t.length;
      }
      if (score > bestScore) { bestScore = score; bestMatch = entry; }
    }
    if (bestMatch && bestScore > 0) return bestMatch.response;

    // No keyword match but have KB — use input hash to pick varied response
    const hash = parsed.text.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return kb[hash % kb.length].response;
  }

  // Try secondary scientists
  const sec = SECONDARY_SCIENTISTS[scientist];
  if (sec) {
    let bestMatch: ScientistResponse | null = null;
    let bestScore = 0;
    for (const entry of sec.topics) {
      let score = 0;
      for (const t of entry.triggers) {
        if (parsed.text.includes(t)) score += t.length;
      }
      if (score > bestScore) { bestScore = score; bestMatch = entry; }
    }
    if (bestMatch && bestScore > 0) return bestMatch.response;
    return sec.topics[parsed.text.length % sec.topics.length].response;
  }

  // Fallback for unknown scientists
  const topicWords = parsed.keywords.slice(0, 3).join(', ') || 'science';
  return `**${topicWords} pe Analysis:**\n\nIs topic mein current research active hai. Classical framework (Newton) se baseline, relativistic corrections (Einstein), mathematical structure (Ramanujan), quantum effects (Bose), aur symmetry analysis (Noether) — sab combined approach se deeper understanding aati hai.\n\nSpecific numbers ya scenario do toh detailed calculation kar sakta hoon!`;
}

// ─── Discovery Hypotheses Database ───

interface DiscoveryHypothesis {
  triggers: string[];
  title: string;
  newton: string;
  einstein: string;
  ramanujan: string;
  bose: string;
  noether: string;
  hypothesis: string;
  prediction: string;
  novelty: number;
}

const DISCOVERY_DB: DiscoveryHypothesis[] = [
  { triggers: ['dark matter', 'galaxy', 'rotation', 'halo', 'wimp', 'axion'],
    title: 'Dark Matter as Quantum Gravitational Condensate',
    newton: 'Rotation curves flat hain — v ∝ constant at large r. Classical gravity mein yeh IMPOSSIBLE hai bina extra mass ke. NFW halo profile: ρ(r) = ρ₀/[(r/rₛ)(1+r/rₛ)²]. Milky Way ke liye: M_halo ≈ 10¹² M☉ — visible mass ka 20×!',
    einstein: 'Gravitational lensing independently confirms dark matter distribution. Bullet cluster mein visible matter aur gravitational center SEPARATE hain — dark matter REAL hai, modified gravity nahi.',
    ramanujan: 'Dark matter halo mass function Ramanujan partition function se describe hoti hai — p(n) ka cosmological analog. Sub-halo mass spectrum mein fractal structure dikhti hai — mock theta functions se exact counting.',
    bose: 'Agar dark matter ultralight bosons hain (m ~ 10⁻²² eV), toh BEC form karenge! Galaxy cores mein "soliton" core predict hota hai — cuspy NFW se DIFFERENT flat core. De Broglie wavelength ~ kpc scale pe quantum effects!',
    noether: 'Dark sector ki apni gauge symmetry honi chahiye — U(1)_dark. Conservation law → dark charge. Symmetry breaking → dark photon mass. Observable: dark photon ↔ photon mixing parameter ε ~ 10⁻¹⁵.',
    hypothesis: 'Dark matter = ultra-light bosonic field (m ~ 10⁻²² eV) jo galaxy-scale BEC form karta hai, jismein Ramanujan partition counting sub-halos describe karti hai, aur hidden U(1)_dark symmetry gravitational lensing pattern pe specific signature deti hai.',
    prediction: 'JWST lensing data mein 10⁷ M☉ sub-halos ka soliton core radius measurable hoga — fuzzy DM predicts core radius ~ 1 kpc × (10¹⁰ M☉/M)^(1/3), CDM predicts cusp. 3σ distinction possible.',
    novelty: 9 },
  { triggers: ['black hole', 'singularity', 'horizon', 'hawking', 'information'],
    title: 'Black Hole Interior via Mock Theta Functions',
    newton: 'Escape velocity = c at Schwarzschild radius: rₛ = 2GM/c². Classical analysis: gravitational acceleration at horizon = c⁴/(4GM). For 10 M☉ BH: rₛ = 29.5 km, surface gravity = 1.5 × 10¹² m/s².',
    einstein: 'Inside event horizon: r aur t SWAP hoti hain — radial direction becomes TIMELIKE. Singularity at r = 0 is a moment in TIME, not a place in space. Kerr BH mein ring singularity + Cauchy horizon → closed timelike curves?',
    ramanujan: 'Black hole entropy S = A/(4l_P²) ka microscopic counting EXACTLY Ramanujan tau function se match hota hai for specific BH types. Mock theta functions = partition function of BH microstates.',
    bose: 'Hawking radiation = thermal Bose-Einstein spectrum at T = ℏc³/(8πGMk_B). For stellar BH: T ~ 10⁻⁸ K (colder than CMB). But near Planck-mass BH: T ~ 10³² K → particle creation EXPLOSION!',
    noether: 'BH information paradox = unitarity conservation (quantum symmetry). If information truly LOST → symmetry BROKEN → new physics. Resolution may require extending Noether theorem to horizons.',
    hypothesis: 'Black hole singularity is NOT infinite density — it is a Planck-scale quantum bounce described by Ramanujan mock theta partition function, with exit through new spacetime region. Information encoded in mock theta expansion coefficients.',
    prediction: 'Gravitational wave ringdown of merging BHs should show echoes at Δt = 8πGM/c³ × ln(3) intervals IF quantum bounce exists. LIGO O4 data with SNR > 50 events can detect at 2σ level.',
    novelty: 9 },
  { triggers: ['time', 'travel', 'wormhole', 'past', 'future', 'machine'],
    title: 'Chronological Protection via Quantum Statistics',
    newton: 'Classical mechanics mein time reversal symmetric hai: replace t → -t, equations SAME rehti hain. Particle trajectories bidirectional. To kya past mein ja sakte hain?',
    einstein: 'Gödel metric (1949): rotating universe → closed timelike curves (CTCs)! Tipler cylinder: infinite rotating cylinder → CTCs. Wormhole + time dilation → one-way time machine. BUT: chronological protection conjecture — quantum effects PREVENT paradoxes.',
    ramanujan: 'CTC spacetime ka path integral Ramanujan type rapidly convergent series mein express hota hai. Convergence condition = consistency condition for time travel! Divergent series = paradox. Ramanujan summation assigns finite value — interpretation: LIMITED time travel?',
    bose: 'Bosonic field near CTC: Casimir-type divergence! Vacuum energy → ∞ as CTC forms → backreaction destroys CTC before formation. Fermions behave differently (Pauli exclusion limits damage). BEC state near CTC = unique quantum signatures.',
    noether: 'Time translation symmetry → energy conservation. CTC BREAKS time translation → energy NOT conserved in CTC region! Noether theorem gives exact energy non-conservation rate: ΔE/E ~ exp(-Action_CTC/ℏ).',
    hypothesis: 'Time travel is quantum-mechanically self-consistent IF restricted to Bose-Einstein condensate carriers (bosonic information only), with Ramanujan convergence condition selecting allowed CTCs, and Noether energy violation bounded by Planck energy.',
    prediction: 'Near rotating BH (a/M > 0.998), vacuum polarization divergence rate measurable via gravitational wave phase shift: Δφ_CTC = π × (a/M - 1)² × M/M_Planck. LISA-band measurement for supermassive BH mergers.',
    novelty: 8 },
  { triggers: ['quantum gravity', 'planck', 'unif', 'string', 'loop', 'everything'],
    title: 'Partition Function Approach to Quantum Gravity',
    newton: 'Gravity = F = GMm/r². At Planck scale (10⁻³⁵ m), quantum effects dominate. Newton BREAKS at r ~ l_P = √(ℏG/c³) = 1.616 × 10⁻³⁵ m. What replaces F = GMm/r²?',
    einstein: 'GR = geometry of spacetime. Quantize geometry? Spacetime itself becomes fuzzy at Planck scale. g_μν → operator ĝ_μν. Path integral over ALL geometries: Z = ∫Dg exp(iS_EH/ℏ). Problem: non-renormalizable!',
    ramanujan: 'Ramanujan partition function p(n) counts microstates. For quantum gravity: p_gravity(E) counts geometries at energy E. Asymptotic formula: log p(E) ~ 2π√(E/E_P × c/6) — matches Bekenstein-Hawking entropy WHEN c = 3D central charge!',
    bose: 'Graviton = massless spin-2 boson. Bose statistics → gravitons can pile up in same state → classical gravity = coherent graviton state (like laser for photons!). BEC of gravitons = geometry of spacetime!',
    noether: 'Diffeomorphism invariance (GR ki gauge symmetry) → NO local gravitational energy. Noether 2nd theorem: infinite-dimensional symmetry → constraints, not conservation laws. Quantum gravity must preserve this!',
    hypothesis: 'Spacetime geometry = coherent state of graviton BEC, where Ramanujan partition function exactly counts quantum gravity microstates at each energy level, with Noether diffeomorphism constraint reducing 10⁵⁰⁰ string vacua to unique solution.',
    prediction: 'Planck-scale discreteness imprints on CMB: B-mode polarization spectrum should show oscillatory feature at l > 5000 with period Δl = 2π/θ_P where θ_P = l_P/d_H. CMB-S4 experiment resolution sufficient.',
    novelty: 10 },
  { triggers: ['entangle', 'bell', 'teleport', 'qubit', 'quantum computer'],
    title: 'Gravitational Entanglement — Testing Quantum Gravity',
    newton: 'Two masses separated by distance d: F = Gm₁m₂/d². Classical — no entanglement. But what if masses are in QUANTUM superposition of positions? Does gravity entangle them?',
    einstein: 'If gravity is quantum → two masses in superposition MUST get entangled through gravitational interaction alone. This is the BMV (Bose-Marletto-Vedral) experiment proposal! If entanglement detected → gravity IS quantum.',
    ramanujan: 'Entanglement entropy between gravitationally interacting quantum systems grows as S ~ √(Gm²t/ℏd) initially. Long-time limit: S_max = log₂(d/l_P) bits — Ramanujan asymptotics give correction: S = S_max(1 - e^(-π√(2n/3))/n) where n = d/l_P.',
    bose: 'Bosonic vs fermionic masses give DIFFERENT entanglement rates. BEC masses: enhanced entanglement (superradiant-like effect). Estimate: 10⁶ atoms in BEC, separated by 100 μm, entanglement time ~ 1 second (marginally achievable!).',
    noether: 'If gravitational entanglement exists → gravitational interaction preserves quantum coherence → U(1) gauge symmetry of quantum gravity? New conservation law: gravitational quantum number? Would constrain ALL quantum gravity theories.',
    hypothesis: 'Gravitational entanglement between BEC masses provides FIRST experimental test of quantum gravity. Bose enhancement makes detection feasible with current technology. If positive: gravity is fundamentally quantum. If negative: gravity may be classical or semi-classical.',
    prediction: 'BEC masses of 10⁻¹⁴ kg separated by 250 μm: entanglement phase = Gm²t/(ℏd) ≈ 10⁻⁸ rad after 1 second. Requires 10¹⁰ repetitions for 3σ detection. Achievable by 2028 with improved BEC platforms.',
    novelty: 9 },
  { triggers: ['energy', 'fusion', 'solar', 'clean', 'free', 'climate'],
    title: 'Symmetry-Optimized Fusion Reactor Design',
    newton: 'Plasma confinement: charged particles in magnetic field follow F = qv×B. Magnetic mirror ratio: R = B_max/B_min determines loss cone. Classical calculation: confinement time τ ∝ R² — need R > 10 for practical fusion.',
    einstein: 'E = mc² gives fusion energy: D-T → He-4 + n releases 17.6 MeV. Mass deficit: Δm = 0.0188 amu. Relativistic corrections to cross-section σ(E) at high plasma temperatures (>10 keV) modify fusion rates by ~3%.',
    ramanujan: 'Plasma turbulence spectrum follows power law with Ramanujan-type correction terms. Energy cascade: E(k) = C × k^(-5/3) × (1 + Σ aₙ/k^n) where aₙ are Ramanujan coefficients. Exact series converges faster than Kolmogorov theory — predicts turbulent transport BETTER.',
    bose: 'Photon emission from hot plasma: Bose statistics → stimulated emission possible! At T > 10 keV, stimulated bremsstrahlung becomes significant → radiation losses REDUCED. Could improve energy balance by 15-20%.',
    noether: 'Helical symmetry in stellarator → conserved quantity: J_helical. Noether theorem constrains particle orbits → reduced neoclassical transport. Optimal coil shape: minimize symmetry-breaking terms in magnetic field Fourier decomposition.',
    hypothesis: 'Noether-optimized stellarator coil geometry with helical symmetry, combined with BEC-enhanced diagnostic (ultra-cold atom interferometry for magnetic field mapping at 10⁻¹² T precision), achieves 3× improved confinement over conventional designs.',
    prediction: 'W7-X stellarator with optimized quasi-helical symmetry: energy confinement time τ_E > 1 second at n = 10²⁰ m⁻³, T = 5 keV. Triple product nτT > 5 × 10²⁰ keV·s/m³ — approaching Lawson criterion.',
    novelty: 8 },
];

export function generateDiscoveryResponse(input: string): string {
  const parsed = parseInput(input);

  // Try computation first
  const computed = computeTimeDilation(parsed) || computeOrbital(parsed) || computeSeries(parsed) || computeEntanglement(parsed);
  if (computed) return `## 🔬 DISCOVERY NOTE — Computed Result\n\n${computed}`;

  // Find best matching hypothesis
  let bestHyp: DiscoveryHypothesis | null = null;
  let bestScore = 0;

  for (const hyp of DISCOVERY_DB) {
    let score = 0;
    for (const t of hyp.triggers) {
      if (parsed.text.includes(t)) score += t.length;
    }
    for (const kw of parsed.keywords) {
      if (hyp.triggers.some(t => t.includes(kw))) score += 2;
    }
    if (score > bestScore) { bestScore = score; bestHyp = hyp; }
  }

  // Fallback to hash-based selection if no keyword match
  if (!bestHyp || bestScore === 0) {
    const hash = parsed.text.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    bestHyp = DISCOVERY_DB[hash % DISCOVERY_DB.length];
  }

  const h = bestHyp;
  return `## 🔬 DISCOVERY NOTE — ${h.title}

---

### 🍎 Newton (Classical Mechanics):
${h.newton}

### ⚡ Einstein (Relativity):
${h.einstein}

### ∞ Ramanujan (Mathematical Structure):
${h.ramanujan}

### 🌊 Bose (Quantum Statistics):
${h.bose}

### ⚖️ Noether (Symmetry):
${h.noether}

---

## 🔬 NOVEL HYPOTHESIS:
**"${h.title}"**

${h.hypothesis}

**Specific Prediction:**
${h.prediction}

**Novelty: ${h.novelty}/10** — Cross-domain synthesis se genuinely naya — individual domains mein invisible thi yeh connection.

---
*Follow-up: "hypothesis expand karo", "prediction refine karo", ya "experiment design karo"*`;
}
