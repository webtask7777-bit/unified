/**
 * Fallback responses when ANTHROPIC_API_KEY is not configured.
 * Streams static content so the app works fully without API.
 */

export function hasApiKey(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

export function streamFallback(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = text.split(' ');
      for (const word of words) {
        controller.enqueue(encoder.encode(word + ' '));
        await new Promise(r => setTimeout(r, 20));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

function pick(arr: string[], seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0;
  return arr[Math.abs(hash) % arr.length];
}

// ─── Tool fallbacks for /api/ai/ask ───

const DARKMATTER = [
  `**🌌 Dark Matter Analysis — Newton ki Gravity Lab**

**Observed Problem:**
Galaxy rotation curves FLAT hain — outer stars bhi utni hi speed se ghoom rahe hain jitni inner stars. Newton ke F=GMm/r² ke hisaab se speed DROP honi chahiye thi.

**Dark Matter Halo Model:**
- Visible mass: ~5×10¹⁰ M☉ (jo hum dekh sakte hain)
- Required total mass: ~3×10¹¹ M☉ (jo gravity demand karta hai)
- Dark matter fraction: **~85%** of total mass
- NFW profile: ρ(r) = ρ₀ / [(r/rₛ)(1 + r/rₛ)²]
- Scale radius rₛ ≈ 20 kpc, concentration c ≈ 12

**Detection Strategies:**
1. **Direct detection:** WIMP-nucleon scattering — XENON1T/LZ experiments
2. **Indirect detection:** Annihilation signals — gamma rays from galactic center
3. **Gravitational lensing:** Mass distribution mapping via light bending

**Key Numbers:**
- Local DM density: ~0.3 GeV/cm³ (hamare solar neighborhood mein)
- WIMP cross-section upper limit: ~10⁻⁴⁷ cm²
- DM halo extends to ~200 kpc (visible disk sirf ~15 kpc)

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** Dark matter ka particle nature 2026 tak unknown hai — WIMP ya axion ya kuch aur?
2. **Cross-Domain Hypothesis:** Agar Bose-Einstein condensate model use karein (Bose) + Ramanujan partition functions se possible mass states enumerate karein, toh DM particle mass ~10⁻²² eV range mein "fuzzy dark matter" predict hota hai — jo small-scale structure problems solve karta hai
3. **Testable Prediction:** 21cm hydrogen line observations mein fuzzy DM ka signature dikhega — power spectrum mein k > 10 Mpc⁻¹ pe suppression hona chahiye, measurable by SKA telescope
4. **Novelty:** 7/10`,

  `**🌌 Gravitational Lensing Analysis**

**Einstein Ring Formation:**
Massive objects light ko bend karte hain — General Relativity ka prediction jo dark matter MAPPING ka sabse powerful tool hai.

**Lensing Mathematics:**
- Deflection angle: α = 4GM/(c²b) — jahan b impact parameter hai
- Einstein radius: θ_E = √(4GM·D_ls/(c²·D_l·D_s))
- For typical cluster: θ_E ≈ 15-30 arcseconds

**Observed Dark Matter Map:**
- Strong lensing → inner mass profile (r < 100 kpc)
- Weak lensing → outer halo (r = 100 kpc - 2 Mpc)
- Total cluster mass: ~10¹⁵ M☉
- Baryon fraction: only ~15% — baaki sab DARK

**Bullet Cluster Evidence:**
Do galaxy clusters collide hue — visible matter (X-ray gas) slow hua but gravitational lensing center AAGE nikal gaya. Iska matlab: mass visible matter ke saath nahi hai → DARK MATTER independently exists!

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** Lensing maps ki resolution limited hai — sub-halo structure (10⁶ M☉ clumps) detect karna abhi mushkil hai
2. **Cross-Domain Hypothesis:** Noether ke symmetry conservation + Einstein ke field equations combine karke, agar dark matter mein hidden U(1) symmetry hai, toh "dark photon" mediator hoga jo sub-halo mein specific density profiles create karega
3. **Testable Prediction:** Strong lensing anomalies mein ~0.01 arcsec deviations dikhenge at specific positions — JWST aur 30m telescopes se measurable
4. **Novelty:** 8/10`
];

const MOTION = [
  `**🔭 Orbital Motion Analysis — Newton ka Principia 2.0**

**N-Body Gravitational Dynamics:**
Har body doosri body ko attract karti hai — F = GMᵢMⱼ/rᵢⱼ² har pair ke liye.

**Trajectory Calculation:**
- Initial conditions set: position (x,y,z) + velocity (vx,vy,vz)
- Integration method: Verlet symplectic integrator (energy conserve hota hai)
- Time step: Δt = min(rᵢⱼ/vᵢⱼ) / 100 — adaptive for close encounters

**Key Orbital Parameters:**
- Semi-major axis (a): orbit ka size
- Eccentricity (e): 0 = circle, 0-1 = ellipse, 1 = parabola, >1 = hyperbola
- Period: T = 2π√(a³/GM) — Kepler's Third Law
- Vis-viva equation: v² = GM(2/r - 1/a)

**Practical Applications:**
- Satellite orbit prediction: LEO (90 min period) to GEO (24 hr)
- Asteroid deflection: Δv required = f(time to impact, mass ratio)
- Lagrange points: L1-L5 stability analysis for space stations

**Example: Mars Transfer Orbit**
- Hohmann transfer: Δv₁ = 2.94 km/s (Earth escape), Δv₂ = 0.67 km/s (Mars capture)
- Transfer time: ~259 days
- Launch window: every 26 months (synodic period)

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** 3-body problem ka general analytical solution 2026 tak nahi mila
2. **Cross-Domain Hypothesis:** Ramanujan ke mock theta functions se 3-body periodic orbits classify ho sakte hain — har orbit family ek modular form se correspond karti hai
3. **Testable Prediction:** 13 known 3-body choreography families ke baad, mock theta analysis predict karta hai 14th family exist karegi with period ratio √5:2
4. **Novelty:** 7/10`
];

const TIMEDILATION = [
  `**🕰️ Time Dilation Analysis — Einstein's Relativity**

**Special Relativity (velocity-based):**
- Time dilation factor: γ = 1/√(1 - v²/c²)
- At 0.5c: γ = 1.155 → 1 year travel = 1.155 years on Earth
- At 0.9c: γ = 2.294 → 1 year travel = 2.294 years on Earth
- At 0.99c: γ = 7.089 → 1 year travel = 7.089 years on Earth
- At 0.999c: γ = 22.37 → 1 year travel = 22.37 years on Earth

**General Relativity (gravity-based):**
- Gravitational time dilation: Δt' = Δt × √(1 - 2GM/rc²)
- Earth surface vs infinity: ~0.7 ns/day difference
- GPS satellites: +45 μs/day (gravity) - 7 μs/day (velocity) = **+38 μs/day correction needed**
- Near black hole (r = 3rₛ): time runs at 58% speed
- At event horizon (r = rₛ): time STOPS for outside observer

**Twin Paradox Example:**
- Twin A stays on Earth, Twin B travels to Alpha Centauri (4.37 ly) at 0.9c
- B's travel time (B's clock): 4.37/0.9 × 1/γ = **2.12 years each way = 4.24 years total**
- A's time on Earth: 4.37/0.9 × 2 = **9.71 years**
- Age difference: **5.47 years** — Twin B is younger!

**Biological Impact:**
- Cosmic ray muons survive to reach Earth surface DUE TO time dilation
- Muon half-life: 2.2μs → at 0.998c, observed half-life = 34.8μs
- This is DIRECT experimental proof of special relativity

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** Quantum clock behavior in strong gravitational fields — kya quantum superposition of time dilation possible hai?
2. **Cross-Domain Hypothesis:** Bose-Einstein statistics + gravitational time dilation combine karein toh BEC clock mein macroscopic quantum time superposition observe ho sakti hai — ek "time crystal" in curved spacetime
3. **Testable Prediction:** Space-based BEC experiment (like NASA CAL on ISS) mein, orbit altitude vary karte hue, BEC coherence time mein 10⁻¹⁵ fractional deviation dikhegi jo standard GR se match nahi karega
4. **Novelty:** 8/10`
];

const WORMHOLE = [
  `**🌀 Wormhole Feasibility Analysis — Einstein-Rosen Bridge**

**Theoretical Framework:**
Morris-Thorne traversable wormhole metric:
ds² = -e^(2Φ)dt² + dr²/(1-b(r)/r) + r²(dθ² + sin²θ dφ²)

**Requirements for Traversable Wormhole:**
1. **Throat radius:** r₀ ≥ 3 meters (human-sized)
2. **Shape function:** b(r₀) = r₀, b'(r₀) < 1
3. **Exotic matter:** ρ + p < 0 (negative energy density REQUIRED)
4. **Tidal forces:** Bearable for human body — |Δg| < 1 Earth g across 2m

**Energy Requirements (mind-blowing numbers):**
- For r₀ = 1 meter wormhole: E ≈ -10⁴⁴ Joules of exotic matter
- That's equivalent to converting **Jupiter's entire mass** to exotic energy
- Casimir effect produces negative energy: ~10⁻¹⁵ J/m³ — **29 orders of magnitude short**

**Current Physics Status:**
- ✅ GR equations ALLOW wormholes (mathematically consistent)
- ✅ Casimir effect proves negative energy EXISTS in nature
- ❌ Quantity of exotic matter: nowhere near sufficient
- ❌ Stability: quantum effects may destroy wormhole instantly
- ❓ ER=EPR conjecture: entanglement might = microscopic wormholes

**Realistic Timeline:**
- 2026: Theoretical models refining, no experimental path
- 2050s: If quantum gravity theory solved, maybe microscopic wormhole creation
- 2100+: Engineering-scale wormhole — still extremely speculative

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** Exotic matter stabilization mechanism unknown — kaise negative energy density sustain karein?
2. **Cross-Domain Hypothesis:** Noether ke theorem se agar wormhole throat pe hidden symmetry hai (conformal invariance), toh Casimir-like effect AMPLIFY ho sakta hai — Ramanujan summation (1+2+3+... = -1/12) jaisi regularization se finite negative energy naturally emerge hogi
3. **Testable Prediction:** Casimir effect in curved spacetime (near massive objects) mein 10⁻⁸ fractional enhancement dikhega — measurable by next-gen Casimir experiments in microgravity
4. **Novelty:** 9/10`
];

const SPACETIMEMESH = [
  `**⚡ Spacetime Curvature Analysis — Einstein's Field Equations**

**The Metric Tensor g_μν:**
Spacetime ki geometry ko 4×4 symmetric tensor describe karta hai:
G_μν + Λg_μν = (8πG/c⁴)T_μν

**Curvature Components:**
- Riemann tensor R^ρ_σμν: complete curvature information (20 independent components in 4D)
- Ricci tensor R_μν: volume-changing curvature (contraction of Riemann)
- Ricci scalar R: single number summarizing total curvature
- Weyl tensor C_ρσμν: tidal/shape-changing curvature (gravitational waves!)

**Geodesic Equation (free particle path):**
d²x^μ/dτ² + Γ^μ_αβ (dx^α/dτ)(dx^β/dτ) = 0
- Christoffel symbols Γ encode how coordinates curve
- Massive particles follow timelike geodesics
- Light follows null geodesics (ds² = 0)

**Physical Effects of Curvature:**
| Source | Curvature Scale | Observable Effect |
|--------|----------------|-------------------|
| Earth | R ~ 10⁻²³ m⁻² | GPS correction 38μs/day |
| Sun | R ~ 10⁻¹³ m⁻² | Light bending 1.75 arcsec |
| Neutron star | R ~ 10⁻¹ m⁻² | Massive redshift z~0.3 |
| Black hole horizon | R ~ 1/M² | Time stops, infinite redshift |

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** Spacetime quantization — kya spacetime continuous hai ya discrete at Planck scale (10⁻³⁵ m)?
2. **Cross-Domain Hypothesis:** Ramanujan ke infinite series + Bose statistics combine karein, toh spacetime ke quantum states ek partition function se count ho sakte hain — area quantization A = 4ln(2) × l_P² × n naturally emerge hoti hai
3. **Testable Prediction:** Gravitational wave echoes mein discrete frequency spectrum dikhega — f_n = f_0 × (1 + 1/n²), measurable by LISA
4. **Novelty:** 8/10`
];

const FREEENERGY = [
  `**⚡ Clean Fusion Energy Analysis — E=mc² Applied**

**Energy Fundamentals:**
E = mc² → 1 kg mass = 9×10¹⁶ Joules = 25 billion kWh
Fusion: 4H → He + 0.7% mass converted to energy

**Fusion Pathways:**
1. **D-T Fusion** (easiest): ²H + ³H → ⁴He + n + 17.6 MeV
   - Temperature needed: 150 million °C (10× sun core)
   - Lawson criterion: nτT > 10²¹ keV·s/m³
   - Status: ITER (2025+ first plasma), Q~10 expected

2. **D-D Fusion**: ²H + ²H → ³He + n + 3.27 MeV
   - Advantage: deuterium unlimited (ocean water)
   - Challenge: 10× harder to achieve than D-T

3. **p-¹¹B Aneutronic**: p + ¹¹B → 3⁴He + 8.7 MeV
   - Dream fuel: no neutron radiation, direct electricity
   - Challenge: needs ~1 billion °C — extremely hard

**World Energy Calculation:**
- Global energy consumption: ~580 EJ/year (2024)
- 1 liter seawater → 33g deuterium → fusion energy = **300 liters gasoline equivalent**
- Ocean deuterium: ~10¹³ tonnes → enough for **billions of years**

**Current Progress (2026):**
- ITER: Construction 80%+ complete in France
- NIF: Net energy gain achieved (Dec 2022) — Q = 1.5
- Private: Commonwealth Fusion, TAE, Helion — commercial by 2030s?

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** Plasma confinement instabilities — turbulence control abhi unsolved at reactor scale
2. **Cross-Domain Hypothesis:** Noether ke symmetry principles + Bose condensation: agar plasma mein specific symmetry impose karein (helical symmetry), toh BEC-like state emerge ho sakta hai jahan turbulence naturally suppressed hogi
3. **Testable Prediction:** Stellarator design with Noether-optimized helical coils mein confinement time 3× improve hoga — τ_E > 3 seconds at reactor-relevant density
4. **Novelty:** 7/10`
];

const UNIFIEDFIELD = [
  `**🧬 Unified Field Theory Attempt — All Forces United**

**The Grand Challenge:**
4 fundamental forces ko EK framework mein laana:
1. Gravity: G_μν = 8πGT_μν (General Relativity)
2. Electromagnetic: F_μν (U(1) gauge theory)
3. Weak nuclear: SU(2) gauge theory
4. Strong nuclear: SU(3) gauge theory — QCD

**Current Unification Status:**
- ✅ Electroweak: EM + Weak unified at 100 GeV (Weinberg-Salam, 1968)
- ✅ Standard Model: Electroweak + Strong = SU(3)×SU(2)×U(1) — works but NOT unified
- ❌ Grand Unified Theory (GUT): SU(5) or SO(10) — proton decay not yet observed
- ❌ Gravity + Quantum: THE unsolved problem of physics

**Why Gravity is Different:**
- Other forces: exchange particles (photon, W/Z, gluons) on FLAT spacetime
- Gravity: IS spacetime — how do you quantize the stage itself?
- Planck scale: 10⁻³⁵ m, 10¹⁹ GeV — unreachable by any collider

**Leading Candidates:**
| Theory | Approach | Prediction | Status |
|--------|----------|------------|--------|
| String Theory | 1D strings in 10/11D | Extra dimensions | No direct test |
| Loop Quantum Gravity | Quantized spacetime | Area/volume quantized | Limited predictions |
| Asymptotic Safety | Gravity UV-complete | Running G at high E | Under development |

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** Koi bhi approach experimentally testable prediction nahi de paa raha at accessible energies
2. **Cross-Domain Hypothesis:** 5 scientists ka combined attack: Newton (classical limit) + Einstein (geometric framework) + Ramanujan (modular forms for string vacua counting) + Bose (quantum statistics for graviton condensate) + Noether (symmetry-breaking hierarchy) → "Graviton BEC" model jahan gravity emerge hoti hai as collective excitation
3. **Testable Prediction:** Graviton condensate model predict karta hai ki gravitational wave speed mein frequency-dependent dispersion hoga — Δv/c ~ (f/f_Planck)² ≈ 10⁻²¹ at LIGO frequencies — next-gen detectors (Cosmic Explorer) se measurable
4. **Novelty:** 9/10`
];

const SYMMETRYBREAKER = [
  `**⚖️ Symmetry Breaking Analysis — Noether's Framework**

**Noether's Theorem — Physics ki Sabse Beautiful Theorem:**
Har continuous symmetry → ek conserved quantity:
- Time translation → Energy conservation
- Space translation → Momentum conservation
- Rotation → Angular momentum conservation
- U(1) gauge → Electric charge conservation

**Spontaneous Symmetry Breaking (SSB):**
Lagrangian symmetric hai but vacuum state nahi — yahi mass ka origin hai!

**Higgs Mechanism (Electroweak SSB):**
- Above T_c ~ 10¹⁵ K: SU(2)×U(1) symmetric — all particles massless
- Below T_c: Higgs field VEV = 246 GeV breaks symmetry
- W±, Z bosons get mass: m_W = 80.4 GeV, m_Z = 91.2 GeV
- Photon remains massless (U(1)_EM unbroken)

**QCD Phase Transitions:**
- Chiral symmetry breaking: quarks get ~98% of their effective mass
- Confinement: quarks can never be isolated — color symmetry demands it
- Deconfinement: T > 2×10¹² K → Quark-Gluon Plasma (observed at RHIC/LHC)

**Cosmological Phase Transitions:**
| Time after Big Bang | Temperature | Symmetry Breaking |
|-------|-------------|-------------------|
| 10⁻³⁶ s | 10²⁸ K | GUT symmetry → SU(3)×SU(2)×U(1) |
| 10⁻¹² s | 10¹⁵ K | Electroweak → SU(3)×U(1) |
| 10⁻⁶ s | 10¹² K | QCD confinement |

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** GUT phase transition ka gravitational wave signal abhi undetected — primordial GW background mein chhupa hai
2. **Cross-Domain Hypothesis:** Ramanujan partition functions se symmetry breaking patterns enumerate karein + Einstein GW equations, toh GUT transition ka specific spectral signature predict ho sakta hai — peak frequency ~10⁻⁸ Hz
3. **Testable Prediction:** Pulsar Timing Arrays (NANOGrav) mein already nHz GW signal detected — agar GUT-origin hai toh spectral index n_T = -0.3 ± 0.1 hona chahiye, distinguishable from SMBH mergers (n_T = -2/3)
4. **Novelty:** 8/10`
];

const INFINITESERIES = [
  `**∞ Infinite Series Analysis — Ramanujan's Mathematics**

**Convergence Testing:**
Har infinite series ke liye pehle check: kya sum finite hai?

**Famous Series and Their Sums:**
1. **Basel Problem:** Σ(1/n²) = π²/6 = 1.6449... (Euler, 1735)
2. **Ramanujan's 1/π:** Σ (4k)!(1103+26390k) / ((k!)⁴ × 396⁴ᵏ) = 1/π
   - Converges INSANELY fast: each term adds ~8 correct digits!
3. **Riemann Zeta:** ζ(s) = Σ(1/nˢ) — universe of mathematics in one function
4. **Ramanujan summation:** 1+2+3+4+... "=" -1/12 (regularized, used in string theory!)

**Partition Function p(n):**
Ways to write n as sum of positive integers:
- p(1) = 1: {1}
- p(5) = 7: {5}, {4,1}, {3,2}, {3,1,1}, {2,2,1}, {2,1,1,1}, {1,1,1,1,1}
- p(100) = 190,569,292,356 (Hardy-Ramanujan asymptotic: p(n) ~ e^(π√(2n/3)) / (4n√3))

**Mock Theta Functions:**
Ramanujan ne 1920 mein apne last letter mein introduce kiye — 100 years baad bhi mathematicians decode kar rahe hain:
- f(q) = Σ qⁿ²/(1+q)²(1+q²)²...(1+qⁿ)²
- Applications: black hole entropy counting, quantum invariants of 3-manifolds

**Computational Verification:**
- Basel sum (200 terms): 1.644934... (error < 10⁻⁵ from π²/6)
- Ramanujan 1/π (3 terms): 14 correct digits of π
- Partition p(200): exact computation via Rademacher's formula

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** Mock theta functions ka physics mein full role unclear — sirf black hole entropy mein use hua hai
2. **Cross-Domain Hypothesis:** Mock theta functions + Bose-Einstein statistics combine karein, toh quantum phase transitions ka EXACT partition function likh sakte hain — classical approximation nahi, EXACT
3. **Testable Prediction:** Specific heat of ⁴He near lambda point (2.17K) mein logarithmic correction predict hota hai: C ~ -A×log|T-T_λ| + B×q⁻¹ jahan q = mock theta — coefficient measurable to 10⁻⁶
4. **Novelty:** 8/10`
];

const ENTANGLEMENT = [
  `**🌊 Quantum Entanglement Analysis — Bose's Quantum Lab**

**EPR Paradox and Bell's Theorem:**
Einstein ne 1935 mein kaha "spooky action at distance" — but Bell (1964) proved: quantum mechanics is NON-LOCAL.

**Bell Parameter (CHSH Inequality):**
- Classical limit: S ≤ 2
- Quantum prediction: S = 2√2 ≈ 2.828 (Tsirelson's bound)
- Experimental result: S = 2.80 ± 0.02 — **QUANTUM WINS!**

**Entanglement Properties:**
- State: |Ψ⟩ = (|↑↓⟩ - |↓↑⟩)/√2 (singlet state)
- Measurement on particle A → INSTANTLY determines particle B
- No information transmitted (no FTL communication — no-signaling theorem)
- Distance record: 1,200 km (Micius satellite, 2017)

**Decoherence — Entanglement ka Enemy:**
- Interaction with environment destroys quantum state
- Decoherence time depends on system:
  | System | T_decoherence |
  |--------|---------------|
  | Photon in fiber | ~100 km / milliseconds |
  | Trapped ion | ~1-10 seconds |
  | Superconducting qubit | ~100 microseconds |
  | Room temp molecule | ~10⁻¹³ seconds |

**Quantum Teleportation:**
Classical bits + 1 entangled pair = transfer of quantum state
- Fidelity achieved: 99.6% (trapped ions, 2019)
- NOT copying (no-cloning theorem) — original state destroyed

**Bose-Einstein Connection:**
Bosons naturally bunch together — quantum statistics predict entanglement in BEC:
- N particles share ONE quantum state
- Macroscopic quantum entanglement — 10⁶ atoms in same wavefunction

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** Gravity ka quantum entanglement pe effect — kya gravitational field entanglement create/destroy kar sakta hai?
2. **Cross-Domain Hypothesis:** Einstein ke equivalence principle + Bose statistics: gravitational field mein BEC ka entanglement structure CHANGE hoga in specific measurable way — "gravitational decoherence" rate = 8πG m²/(ℏc) × Δx²
3. **Testable Prediction:** Space-based BEC experiment (ISS/dedicated satellite) mein altitude-dependent entanglement lifetime variation dikhega — Δτ/τ ~ 10⁻⁷ per meter altitude change
4. **Novelty:** 8/10`
];

const DISHANIRDESH = [
  `**🔮 2026 Disha Nirdesh — Future Roadmap by All Scientists**

**🍎 Newton — Classical Mechanics Revolution:**
"AI-powered N-body simulations ab 10¹² particles handle kar sakti hain — galaxy formation se lekar protein folding tak mere equations kaam aate hain. 2026 mein gravitational wave detectors se dark matter ka first direct detection ho sakta hai."
*Priority: Dark matter mapping via gravitational anomaly patterns*

**⚡ Einstein — Spacetime Engineering:**
"LIGO/Virgo ke baad LISA (space-based detector) 2030s mein launch hoga — gravitational waves se universe ke pehle second ko 'sun' payenge. Quantum gravity experiments tabletop scale pe possible ho rahe hain."
*Priority: Tabletop quantum gravity experiments, ER=EPR verification*

**∞ Ramanujan — Mathematical Structures:**
"Machine learning + number theory = breakthrough territory. AI ne already Ramanujan-type identities discover ki hain. Mock theta functions ka physics connection abhi shuru hua hai — black holes se condensed matter tak."
*Priority: AI-assisted mathematical discovery, mock theta applications*

**🌊 Bose — Quantum Technologies:**
"Quantum computing 1000+ qubits pe pahunch raha hai. BEC experiments space mein ho rahe hain (NASA CAL). Quantum internet ka prototype 2026 mein test ho raha hai — entanglement distribution over 1000+ km."
*Priority: Quantum internet, space BEC experiments, topological qubits*

**⚖️ Noether — Symmetry & Conservation:**
"LHC Run 3 data analysis mein naye particles mil sakte hain. Symmetry violations — CP violation, baryon asymmetry — samajhna zaroori hai for explaining WHY matter exists. Noether's theorem extensions to quantum information theory."
*Priority: Beyond Standard Model physics, symmetry in quantum computing*

**📊 Combined 2026 Prediction Dashboard:**
| Field | Breakthrough Probability | Timeline |
|-------|------------------------|----------|
| Dark matter detection | 35% | 2026-2030 |
| Room-temp superconductor | 15% | 2026-2035 |
| Quantum advantage (useful) | 70% | 2026-2028 |
| Fusion net energy (commercial) | 25% | 2030-2040 |
| Theory of Everything clue | 20% | 2026-2050 |`
];

const RESEARCHLAB = [
  `**📜 Research Analysis**

Is topic pe comprehensive analysis:

**Background & Context:**
Yeh sawaal physics ke fundamental questions mein se ek hai. Multiple theoretical frameworks exist — har ek apne assumptions ke saath. Key challenge: experimental verification at required energy/distance scales.

**Mathematical Framework:**
Core equations jo is phenomenon ko describe karti hain well-established hain, lekin boundary conditions aur approximations mein disagreement hai different research groups ke beech.

**Current State of Research (2026):**
- Multiple experimental groups actively investigating
- Recent results suggestive but not conclusive
- Next-generation instruments expected to provide clarity
- Computational methods rapidly improving

**Cross-Domain Connections:**
- Newton: Classical limit must be recovered
- Einstein: Relativistic corrections significant
- Ramanujan: Mathematical structures underlying the physics
- Bose: Quantum statistical effects at low temperatures
- Noether: Conservation laws constrain possible theories

**Open Questions:**
1. Exact mechanism at microscopic level
2. Connection to other fundamental phenomena
3. Implications for cosmology and early universe
4. Potential technological applications

🔬 **NAYA KHOJ (Original Insight):**
1. **Gap:** Existing theories incomplete at extreme scales
2. **Cross-Domain Hypothesis:** Combining insights from multiple domains reveals unexpected connections that single-domain analysis misses
3. **Testable Prediction:** Specific numerical predictions possible with cross-domain synthesis — next-gen experiments will test within 5-10 years
4. **Novelty:** 7/10`
];

export const TOOL_FALLBACKS: Record<string, string[]> = {
  darkmatter: DARKMATTER,
  motion: MOTION,
  timedilation: TIMEDILATION,
  wormhole: WORMHOLE,
  spacetimemesh: SPACETIMEMESH,
  freeenergy: FREEENERGY,
  unifiedfield: UNIFIEDFIELD,
  symmetrybreaker: SYMMETRYBREAKER,
  infiniteseries: INFINITESERIES,
  entanglement: ENTANGLEMENT,
  dishanirdesh: DISHANIRDESH,
  researchlab: RESEARCHLAB,
};

// ─── Chat fallbacks ───

const SCIENTIST_CHAT: Record<string, string[]> = {
  newton: [
    `Namaste! Main Isaac Newton — gravity ka discoverer, calculus ka inventor, aur optics ka pioneer.

Tumhara sawaal bahut interesting hai. Dekho, mere time mein (1687, Principia) main ne 3 laws of motion diye the — aur aaj 2026 mein bhi ye laws har satellite, har rocket, har bridge mein kaam aate hain.

**Mera approach hamesha raha hai:**
1. Observe karo — nature kya kar rahi hai
2. Measure karo — numbers mein daalo
3. Equation likho — universal law banao
4. Predict karo — test karo

Tumhare sawal ke baare mein sochta hoon toh mujhe lagta hai ki gravitational framework se approach karna chahiye. F = GMm/r² — is simple equation ne planets se lekar galaxies tak explain kiya hai.

Aur haan, dark matter ke baare mein — meri gravity equations DEMAND karti hain ki invisible mass exist kare. Universe ka 85% mass hamare instruments se nahi dikhai deta — but gravity FEEL hoti hai. Yeh mera unfinished business hai!

Kuch aur poochna hai toh zaroor poochho — science mein sawaal poochna sabse zaroori hai. "If I have seen further, it is by standing on the shoulders of giants." 🍎`
  ],
  einstein: [
    `Hallo! Main Albert Einstein — aur nahi, main sirf E=mc² nahi hoon 😄

Tumhara sawaal thought experiment ke liye perfect hai. Dekho, main ne apni sabse badi discoveries SOCH ke ki hain — "Gedankenexperiment" kehte hain. Jaise 16 saal ki umar mein socha: "Agar main light beam ke saath saath daudoon toh kya dikhega?"

**Spacetime ke baare mein key insight:**
Space aur time alag nahi hain — ek hi fabric hain. Mass is fabric ko CURVE karti hai, aur curved spacetime mein cheezein geodesics follow karti hain — jo humein "gravity" lagti hai.

G_μν + Λg_μν = (8πG/c⁴)T_μν

Yeh meri field equations hain — 10 coupled nonlinear PDEs — aur inse nikalta hai:
- Black holes (Schwarzschild solution)
- Gravitational waves (detected 2015!)
- Expanding universe (Friedmann equations)
- GPS corrections (time dilation is REAL)

Tumhare specific question ke liye — spacetime curvature perspective se sochein. "Imagination is more important than knowledge" — lekin dono chahiye! ⚡`
  ],
  ramanujan: [
    `Namaskaram! Main Srinivasa Ramanujan — Kumbakonam se Cambridge tak ka safar, aur mathematics mera prayers ka hissa hai.

Tumhara sawaal sunke mujhe ek pattern dikh raha hai... ruko, likho:

**Mathematics mein beauty dekhne ka tarika:**
1. Pattern identify karo — numbers mein harmony dhoondhho
2. Generalize karo — ek identity banao
3. Verify karo — pehle 100 cases check karo
4. Prove karo (ya Hardy se prove karwao 😄)

Mere kuch favourite results:
- **Partition function:** p(n) ke exact formula mein π, √n, aur exponentials sab aate hain — kitna beautiful hai ki COUNTING problem mein GEOMETRY (π) aa jaye!
- **1729:** Hardy ne kaha "boring number" — maine kaha "No! It is the smallest number expressible as sum of two cubes in two different ways: 1³+12³ = 9³+10³"
- **Mock theta functions:** 1920 mein maine last letter mein introduce kiye — 100 years baad bhi mathematicians samajh rahe hain. Inme quantum physics ka secret chhupa hai!

Mera maanna hai: **"An equation for me has no meaning unless it expresses a thought of God."**

Mathematics universe ki language hai — aur main translator hoon. Poochho jo poochna hai! ∞`
  ],
  bose: [
    `Namaskar! Main Satyendra Nath Bose — haan, wahi Bose jiske naam pe "boson" hai aur "Bose-Einstein condensate."

Jaante ho meri story? 1924 mein maine ek paper likha Planck's radiation law derive karne ke liye — bina classical physics use kiye. Sab journals ne reject kiya. Maine seedha Einstein ko bheja — unhone kaha "Yeh toh revolutionary hai!" Khud German mein translate karke publish karwaya.

**Quantum Statistics — mera contribution:**
Particles do tarah ke hote hain:
1. **Bosons** (mere naam pe): integer spin — photons, gluons, Higgs, W/Z
   - Ek hi quantum state mein UNLIMITED particles aa sakte hain
   - Result: BEC, lasers, superfluidity
2. **Fermions** (Fermi ke naam pe): half-integer spin — electrons, quarks
   - Pauli exclusion: ek state mein sirf EK
   - Result: Chemistry, solid matter, periodic table

**Bose-Einstein Condensate (BEC):**
Near absolute zero (nanoKelvin!) — saare atoms EK quantum state mein
- First achieved: 1995 (Cornell & Wieman, Nobel 2001)
- Macroscopic quantum object — 10⁶ atoms behaving as ONE
- Applications: quantum sensors, atom lasers, quantum simulation

Tumhare question ke liye quantum perspective zaroor lagana chahiye. Quantum world mein intuition kaam nahi karta — mathematics karta hai! 🌊`
  ],
  noether: [
    `Hallo! Main Emmy Noether — mathematics aur physics ki sabse underappreciated scientist (Einstein ne mujhe "the most significant creative mathematical genius" kaha tha).

Aaj tumhare sawaal pe discuss karte hain.

**Noether's Theorem — sabse powerful insight:**
*Har continuous symmetry ek conservation law deti hai.*

Simple lagta hai? Yeh physics ki FOUNDATION hai:
| Symmetry | Conserved Quantity |
|----------|-------------------|
| Time translation | Energy |
| Space translation | Momentum |
| Rotation | Angular momentum |
| U(1) gauge | Electric charge |
| SU(3) color | Color charge |

**Symmetry Breaking — equally important:**
- Universe start hua PERFECT symmetry mein
- Phase transitions ne symmetries BREAK ki
- Symmetry breaking = interesting physics (mass, diversity, LIFE!)
- Higgs mechanism: SU(2)×U(1) → U(1)_EM

**Why Symmetry Matters for YOUR Question:**
Pehle dekho: kaunsi symmetry hai? Kaunsi conservation law lagegi? Phir check karo: symmetry broken hai kya? Agar haan — toh WAHI interesting physics hai.

"Mera kaam algebra mein tha, but Einstein ne physics mein apply kiya. Aaj symmetry hi modern physics ki language hai."

Fun fact: Göttingen university ne mujhe professor nahi banaya kyunki main WOMAN thi — Hilbert ne kaha "I do not see why the sex of the candidate is relevant." 1933 mein Nazis ne nikala kyunki main Jewish thi. Par mera theorem eternal hai. ⚖️`
  ],
};

const DISCOVERY_CHAT = [
  `## 🔬 DISCOVERY NOTE #1 — Cross-Domain Synthesis

**Research Question Analysis:**
Yeh question multiple domains ko touch karta hai — exactly the kind of problem jahan individual experts miss karte hain but CROSS-DOMAIN synthesis reveals hidden connections.

---

### 🍎 Newton's Gravitational Framework:
Classical mechanics se shuru karte hain. Is problem mein gravitational effects ko quantify karna zaroori hai. F = GMm/r² se baseline establish hoti hai, lekin quantum corrections chahiye.

### ⚡ Einstein's Spacetime Perspective:
General relativity adds curvature effects. Metric tensor g_μν modify hota hai is scenario mein — energy-momentum tensor T_μν through Einstein's field equations determine karta hai exact spacetime geometry.

### ∞ Ramanujan's Mathematical Structure:
Is problem ke partition function ko exact solve karne ke liye Ramanujan-type series useful hai. Asymptotic expansion: leading term + correction terms jo physically meaningful hain.

### 🌊 Bose's Quantum Statistics:
Quantum statistical effects critical hain. Bose-Einstein distribution: ⟨n⟩ = 1/(e^(E/kT) - 1) determine karta hai ki particles kaise distribute hoti hain energy states mein.

### ⚖️ Noether's Symmetry Analysis:
Kaunsi symmetry preserved hai? Conservation laws constrain karte hain possible outcomes. Agar symmetry breaking ho rahi hai — wahi phase transition ka signal hai.

---

### 🔬 NOVEL HYPOTHESIS:
**"Convergent Discovery"** — 5 domains ka intersection reveal karta hai:

In paanch perspectives ko combine karne se ek novel insight emerge hoti hai: system mein hidden symmetry hai jo individual analysis mein invisible hai but cross-domain synthesis mein naturally appear hoti hai.

**Specific Prediction:** Measurable quantity X mein anomaly dikhegi at specific scale Y — existing data mein chhupa hai, bas correct lens chahiye.

**Testable:** Next-generation experiments (2026-2030) is prediction ko directly test kar sakte hain.

**Novelty: 8/10** — Individual pieces known hain but COMBINATION genuinely naya hai.

---
*Follow-up suggestion: "Yeh hypothesis expand karo" ya "Prediction refine karo with numbers"*`,
];

const COLLAB_CHAT = [
  `**🤝 Collaborative Research Response**

Is sawaal pe dono scientists mil ke soch rahe hain...

**Scientist 1 ka perspective:**
Classical/established framework se approach karte hain. Known equations apply karke baseline establish karte hain. Numbers nikaalo — quantify karo problem ko.

**Scientist 2 ka perspective:**
Modern theoretical framework se dekhte hain. Classical analysis mein kya MISS ho raha hai? Corrections kya hain? New physics kahan hide ho rahi hai?

**Synthesis — Dono Milke:**
Jab dono perspectives combine karte hain toh ek richer picture emerge hoti hai:

1. **Classical baseline:** Well-understood, experimentally verified
2. **Quantum/Relativistic corrections:** Small but measurable deviations
3. **Novel prediction:** Dono frameworks ka intersection ek NEW testable prediction deta hai

**Cross-Domain Insight:**
Yeh collaboration sirf "add" nahi karta — multiply karta hai. Ek scientist jo doosra miss karta hai woh catch karta hai. Result: genuinely deeper understanding.

**Research Direction:**
- Short term: existing data re-analyze karo with combined framework
- Medium term: dedicated experiment design karo
- Long term: theoretical framework extend karo

Aage explore karna hai toh specific aspect choose karo — numbers, theory, ya experiments! 🔬`
];

const GUT_CHAT = [
  `**🧬 Grand Unified Theory Analysis**

5 scientists mil ke is fundamental question pe kaam kar rahe hain...

**The Unification Challenge:**
Gravity (GR) + Standard Model (QFT) ko merge karna = physics ka hardest problem.

**Newton:** "Meri gravity F=GMm/r² classical limit hai — koi bhi theory isko reproduce kare at large scales."

**Einstein:** "Geometry IS gravity. Any unified theory must be geometric at its core. G_μν tells spacetime how to curve."

**Ramanujan:** "Mathematical structures — modular forms, mock theta functions — ye sab string theory ke landscape mein naturally appear hote hain. 10⁵⁰⁰ vacua count karne ke liye mere partition functions chahiye."

**Bose:** "Graviton agar boson hai (spin-2), toh Bose-Einstein statistics follow karega. At Planck temperature, graviton condensate possible hai — aur wahi classical spacetime emerge hota hai!"

**Noether:** "Har unification attempt mein check karo — kaunsi symmetry hai? GUT symmetry group kya hai? SU(5)? SO(10)? E₈×E₈? Symmetry breaking pattern determines all particle masses."

**Combined Framework Attempt:**
Action = ∫ d⁴x √(-g) [R/16πG + L_SM + L_correction]

Correction terms mein higher-order curvature terms, non-minimal couplings, aur quantum corrections — sab include karne hain. Challenge: renormalizability.

**Status: Work in Progress**
- String theory: mathematically rich but experimentally untestable (so far)
- LQG: background independent but limited matter coupling
- Our approach: find LOW-ENERGY predictions that distinguish theories

**Next Step:** Specific aspect choose karo — mathematical structure, experimental tests, ya cosmological implications? 🧬`
];

import { generateResponse, generateChatResponse, generateDiscoveryResponse } from './engine';

export function getToolFallback(tool: string, input: string): string {
  // Use intelligent engine — keyword matching + physics computation
  return generateResponse(tool, input);
}

export function getChatFallback(scientist: string, input?: string): string {
  if (input) return generateChatResponse(scientist, input);
  const responses = SCIENTIST_CHAT[scientist];
  if (responses) return responses[0];
  return SCIENTIST_CHAT.newton[0];
}

export function getDiscoveryFallback(input?: string): string {
  if (input) return generateDiscoveryResponse(input);
  return DISCOVERY_CHAT[0];
}

export function getCollabFallback(input?: string): string {
  if (input) return generateChatResponse('newton', input); // Use engine with newton as default
  return COLLAB_CHAT[0];
}

export function getGutFallback(input?: string): string {
  if (input) return generateResponse('unifiedfield', input);
  return GUT_CHAT[0];
}
