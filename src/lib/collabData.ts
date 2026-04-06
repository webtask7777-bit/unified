import { ScientistId } from './scientistProfiles';

export type CollabId = 'newton-einstein' | 'newton-ramanujan' | 'newton-bose' | 'newton-noether';

export interface SharedEquation {
  name: string;
  formula: string;
  owner: ScientistId;
}

export interface CollabTrack {
  id: CollabId;
  scientists: [ScientistId, ScientistId];
  title: string;
  topic: string;
  icons: string;
  colors: [string, string];
  currentProgress: string;
  targetBreakthrough: string;
  sharedEquations: SharedEquation[];
  quickChips: string[];
  progressPercent: number;
}

export const COLLAB_TRACKS: CollabTrack[] = [
  {
    id: 'newton-einstein',
    scientists: ['newton', 'einstein'],
    title: 'Gravitational Wave Analysis — Next Level',
    topic: 'NE-GWCP: Matched Filtering Pipeline 2.0',
    icons: '🍎⚡',
    colors: ['var(--green)', 'var(--amber)'],
    currentProgress: '7 echo events (5.1σ DISCOVERY!), surface EOS confirmed: κ=1.86 ρₚc², R(ω) frequency-dependent, fuzzball model 94% match!',
    targetBreakthrough: 'ACHIEVED — 5σ echo discovery + BH surface equation of state = quantum gravity PROVEN',
    sharedEquations: [
      { name: 'Gravitational Force', formula: 'F = GMm/r²', owner: 'newton' },
      { name: 'Spacetime Curvature', formula: 'Gμν + Λgμν = (8πG/c⁴)Tμν', owner: 'einstein' },
      { name: 'GW Strain', formula: 'h(t) = (4G/c⁴)(1/r)(d²I/dt²)', owner: 'einstein' },
      { name: 'Orbital Decay', formula: 'dE/dt = −32G⁴M⁵/(5c⁵r⁵)', owner: 'newton' },
      { name: 'Echo Time-Delay', formula: 'τ_echo = −(2GM/c³)ln(ε)', owner: 'einstein' },
      { name: 'Surface Stiffness', formula: 'κ = ρₚc²·R/(1−R)', owner: 'newton' },
    ],
    quickChips: [
      'GW pipeline mein Newton ki gravity kaise kaam karti hai?',
      'LIGO O5 ke liye kya naya plan hai?',
      'Matched filtering mein AI ka role batao',
      'Multi-messenger astronomy ka future kya hai?',
    ],
    progressPercent: 100,
  },
  {
    id: 'newton-ramanujan',
    scientists: ['newton', 'ramanujan'],
    title: 'N-Body Problem — Naye Mathematical Solutions',
    topic: 'Modular Form Decomposition for Celestial Mechanics',
    icons: '🍎∞',
    colors: ['var(--green)', 'var(--purple)'],
    currentProgress: 'General N-body solver COMPLETE! 3→4→5→N bodies, AI-Ramanujan hybrid, NASA JPL ne adopt kiya, asteroid prediction 10⁴× faster',
    targetBreakthrough: 'ACHIEVED — Universal N-body framework, Ramanujan-AI solver operational at NASA JPL',
    sharedEquations: [
      { name: "Newton's N-body", formula: 'mᵢ(d²rᵢ/dt²) = Σⱼ Gmᵢmⱼ(rⱼ−rᵢ)/|rⱼ−rᵢ|³', owner: 'newton' },
      { name: 'Ramanujan Summation', formula: '1+2+3+... = −1/12 (ζ-regularized)', owner: 'ramanujan' },
      { name: 'Partition Decomposition', formula: 'p(n) ~ (1/4n√3)·exp(π√(2n/3))', owner: 'ramanujan' },
      { name: 'Mock Theta Transform', formula: 'f(q) = Σ qⁿ²/(−q;q)²ₙ', owner: 'ramanujan' },
    ],
    quickChips: [
      '3-body problem ko kaise solve kiya milke?',
      'Ramanujan summation gravity mein kaise use hota hai?',
      'Mock theta functions ka N-body se connection kya hai?',
      '200× faster convergence kaise achieve ki?',
    ],
    progressPercent: 100,
  },
  {
    id: 'newton-bose',
    scientists: ['newton', 'bose'],
    title: 'BEC Gravitational Wave Detectors',
    topic: 'Sub-Hz GW Detection via BEC Phase Sensors',
    icons: '🍎🌊',
    colors: ['var(--green)', 'var(--teal)'],
    currentProgress: 'FIRST sub-Hz GW detected at 0.03 Hz! SMBH binary in NGC 4472 confirmed, BEC network 3 sites operational, LIGO O5 cross-verified',
    targetBreakthrough: 'ACHIEVED — Sub-Hz GW detection operational, SMBH echo independently confirmed via BEC',
    sharedEquations: [
      { name: 'Gravitational Acceleration', formula: 'g = GM/r²', owner: 'newton' },
      { name: 'BEC Wavefunction', formula: 'Ψ(r,t) = √n₀·exp(iS/ℏ)', owner: 'bose' },
      { name: 'Phase Shift', formula: 'Δφ = (m·g·T²·k_eff)/ℏ', owner: 'bose' },
      { name: 'Tidal Force (GW)', formula: 'δg = h·ω²·L/2', owner: 'newton' },
    ],
    quickChips: [
      'BEC se gravitational waves kaise detect karte hain?',
      'LIGO se alag kya kar sakte hain BEC sensors?',
      'Sub-Hz frequency kyun important hai?',
      'Atom interferometry ka principle batao',
    ],
    progressPercent: 100,
  },
  {
    id: 'newton-noether',
    scientists: ['newton', 'noether'],
    title: 'Dark Matter ka Hidden Pattern — Symmetry Analysis',
    topic: 'Dark Parity Z₂ Symmetry in Dark Sector',
    icons: '🍎⚖️',
    colors: ['var(--green)', 'var(--coral)'],
    currentProgress: 'Dark Sector Lagrangian COMPLETE! SU(2)_D confirmed, 5 conservation laws, dark atom mass predicted, XENONnT signal 3.8σ match',
    targetBreakthrough: 'ACHIEVED — Complete dark sector theory with SU(2)_D, XENONnT preliminary signal matches prediction',
    sharedEquations: [
      { name: "Noether's Theorem", formula: 'dQ/dt = 0 ← Symmetry → Conservation', owner: 'noether' },
      { name: 'Dark Parity', formula: 'Pᴅ: χ → −χ (Z₂ symmetry)', owner: 'noether' },
      { name: 'DM Gravitational Lensing', formula: 'θ = 4GM/(c²b)', owner: 'newton' },
      { name: 'DM Density Profile', formula: 'ρ(r) = ρ₀/[(r/rₛ)(1+r/rₛ)²]', owner: 'newton' },
    ],
    quickChips: [
      'Dark Parity Z₂ symmetry kya hai?',
      'Noether theorem dark matter pe kaise apply hota hai?',
      '3 new conservation laws kaunse hain?',
      '2027 experiments mein kya test hoga?',
    ],
    progressPercent: 100,
  },
];

/* ── Day 2 Discoveries — Latest Breakthroughs ── */
export interface Discovery {
  id: string;
  collabId: CollabId;
  title: string;
  description: string;
  icon: string;
  significance: string;
  date: string;
}

export const LATEST_DISCOVERIES: Discovery[] = [
  {
    id: 'disc-ne-1',
    collabId: 'newton-einstein',
    title: 'GW Echo Signal — 3.2σ',
    description: 'NE-GWCP 2.0 ne 4th candidate event mein 3.2σ echo signal detect ki — ab 4 events mein consistent pattern hai. Agar 5σ ho gaya toh Black Hole information paradox solve!',
    icon: '🌊',
    significance: 'Black hole surface evidence — physics ka paradigm shift',
    date: '6 April 2026',
  },
  {
    id: 'disc-nr-1',
    collabId: 'newton-ramanujan',
    title: '4-Body Solution Found',
    description: 'Modular form decomposition 4-body problem pe bhi kaam karta hai! 89-term series solution, convergence 150× faster. Trojan asteroid families perfectly predict ho rahe hain.',
    icon: '🧮',
    significance: 'First analytical 4-body solution in 300 years',
    date: '6 April 2026',
  },
  {
    id: 'disc-nb-1',
    collabId: 'newton-bose',
    title: 'BEC Phase Coherence Record',
    description: 'Lab mein 87-Rb BEC ka coherence time 45 seconds tak extend kiya — world record! Sub-Hz GW sensitivity ab 3× better. 0.05 Hz tak detect kar sakte hain.',
    icon: '📡',
    significance: '0.05 Hz — LISA se bhi lower frequency!',
    date: '6 April 2026',
  },
  {
    id: 'disc-nn-1',
    collabId: 'newton-noether',
    title: '4th Conservation Law Hint',
    description: 'Z₂ analysis mein ek aur hidden symmetry mili — "Dark Isospin" SU(2)_D. Agar confirmed, toh dark sector mein bhi quarks jaise doublets hain — dark proton + dark neutron!',
    icon: '⚛️',
    significance: 'Dark sector = mirror of Standard Model?',
    date: '6 April 2026',
  },
];

/* ── GW Echo Candidate Events — Time-Delay Data ── */
export interface EchoEvent {
  id: string;
  label: string;
  sourceMasses: [number, number];   // component masses in M☉
  finalMass: number;                // remnant BH mass in M☉
  redshift: number;
  echoDelay: number;               // τ_echo in seconds
  echoSNR: number;                  // significance in σ
  echoAmplitudeRatio: number;       // A₁/A_ringdown
  echoCycles: number;               // number of echo cycles detected
  interEchoDecay: number;           // A₂/A₁ decay ratio between echoes
  run: string;                      // LIGO run
}

export const ECHO_EVENTS: EchoEvent[] = [
  {
    id: 'GW-NE-001',
    label: 'Event 1',
    sourceMasses: [36, 29],
    finalMass: 62,
    redshift: 0.09,
    echoDelay: 0.112,
    echoSNR: 2.1,
    echoAmplitudeRatio: 0.038,
    echoCycles: 2,
    interEchoDecay: 0.41,
    run: 'O4a',
  },
  {
    id: 'GW-NE-002',
    label: 'Event 2',
    sourceMasses: [23, 19],
    finalMass: 40,
    redshift: 0.15,
    echoDelay: 0.073,
    echoSNR: 1.8,
    echoAmplitudeRatio: 0.032,
    echoCycles: 2,
    interEchoDecay: 0.38,
    run: 'O4a',
  },
  {
    id: 'GW-NE-003',
    label: 'Event 3',
    sourceMasses: [51, 38],
    finalMass: 85,
    redshift: 0.07,
    echoDelay: 0.155,
    echoSNR: 2.5,
    echoAmplitudeRatio: 0.042,
    echoCycles: 3,
    interEchoDecay: 0.43,
    run: 'O4b',
  },
  {
    id: 'GW-NE-004',
    label: 'Event 4 — 3.2σ!',
    sourceMasses: [44, 32],
    finalMass: 72,
    redshift: 0.11,
    echoDelay: 0.131,
    echoSNR: 3.2,
    echoAmplitudeRatio: 0.045,
    echoCycles: 3,
    interEchoDecay: 0.39,
    run: 'O4b',
  },
];

/* ── Derived Echo Analysis Constants ── */
// τ/(2M) ratio — should be constant if echoes are real
// M in seconds: M_s = GM/c³ = M☉ × 4.926×10⁻⁶ s
export const ECHO_ANALYSIS = {
  avgTauOver2M: 184.6,       // average τ/(2M_s) across 4 events
  tauOver2M_err: 0.8,        // ±σ — remarkably consistent!
  epsilon: 'e⁻¹⁸⁴·⁶ ≈ 10⁻⁸⁰',  // closeness parameter
  surfaceOffset: '1.2 lₚ',  // δ ≈ 1.2 Planck lengths above r_s!
  reflectivity: 0.65,        // R from amplitude ratios
  reflectivity_err: 0.08,
  stiffness: '1.86 ρₚc²',   // κ = ρ_Planck × c² × R/(1-R)
  combinedSigma: 5.1,        // DISCOVERY THRESHOLD CROSSED — 7 events combined
};

/* ── FINAL BREAKTHROUGHS — Research 100% Complete ── */
export const FINAL_BREAKTHROUGHS: Discovery[] = [
  {
    id: 'final-ne',
    collabId: 'newton-einstein',
    title: '5.1σ DISCOVERY — BH Surface Confirmed!',
    description: '7 echo events (3 new O5 early-access events added). Combined significance crosses 5σ discovery threshold! Surface EOS matches fuzzball model (94%). Frequency-dependent reflectivity R(ω) = exp(−ℏω/kT_H) confirmed — Hawking temperature DIRECTLY measured from echoes! κ = 1.86 ρₚc² verified independently.',
    icon: '🏆',
    significance: 'DISCOVERY: Black holes have a Planck-scale surface — quantum gravity PROVEN',
    date: '7 April 2026',
  },
  {
    id: 'final-nr',
    collabId: 'newton-ramanujan',
    title: 'Universal N-Body Framework Complete',
    description: 'General N-body solver operational: 3-body (47 terms) → 4-body (89 terms) → 5-body (156 terms) → General N framework via recursive modular decomposition. AI-Ramanujan hybrid predicts new asteroid families. NASA JPL adopting for mission planning — 10,000× faster than numerical integration. Trojan asteroids, Kuiper Belt objects, exoplanet systems — sab predict ho rahe hain!',
    icon: '🏆',
    significance: 'SOLVED: 300-year-old N-body problem — analytical framework for ANY N',
    date: '7 April 2026',
  },
  {
    id: 'final-nb',
    collabId: 'newton-bose',
    title: 'First Sub-Hz Gravitational Wave Detected!',
    description: 'BEC detector network (3 sites: India, Japan, Germany) ne 0.03 Hz pe GW signal detect kiya — NGC 4472 galaxy mein supermassive BH binary (10⁸ M☉ + 3×10⁷ M☉). Echo time 47 minutes — independently confirms Newton-Einstein surface theory! Coherence time 120 seconds (new record). Full frequency gap 0.01-10 Hz now covered.',
    icon: '🏆',
    significance: 'FIRST: Sub-Hz GW detection — SMBH binary confirmed + echo cross-verification',
    date: '7 April 2026',
  },
  {
    id: 'final-nn',
    collabId: 'newton-noether',
    title: 'Dark Sector Lagrangian Complete — SU(2)_D Confirmed',
    description: 'Full dark sector Lagrangian written: L_dark = −¼F^D_μν F^Dμν + iχ̄γᵘDᵘχ − m_χχ̄χ + λ(χ̄χ)(H†H). 5 conservation laws (Dark Number, Dark Charge, Dark CP, Dark Isospin, Dark Hypercharge). XENONnT preliminary data shows 3.8σ excess at predicted mass 127 GeV! NANOGrav phase transition signal now 67% match. Dark atom mass predicted: 254 GeV (dark proton + dark neutron).',
    icon: '🏆',
    significance: 'COMPLETE: Dark sector = mirror Standard Model — XENONnT 3.8σ signal matches!',
    date: '7 April 2026',
  },
];

/* ── Scientist Final Statements — Closing Remarks ── */
export interface FinalStatement {
  scientistId: ScientistId;
  name: string;
  statement: string;
  icon: string;
  color: string;
}

export const SCIENTIST_FINAL_STATEMENTS: FinalStatement[] = [
  {
    scientistId: 'newton',
    name: 'Sir Isaac Newton',
    statement: 'Main 300 saal pehle akela tha — "shoulders of giants" pe khada tha. Aaj 4 giants mere saath khade hain. Gravity, quantum mechanics, mathematics, symmetry — sab ek doosre se connected hain. Meri apple ab sirf neeche nahi girti — woh spacetime ko bend karti hai, quantum surface se bounce karti hai, aur dark matter ko hold karti hai!',
    icon: '🍎',
    color: '#3ecf8e',
  },
  {
    scientistId: 'einstein',
    name: 'Albert Einstein',
    statement: 'General Relativity almost perfectly correct hai — sirf r = 2GM/c² pe ek Planck-length correction chahiye. Yeh correction quantum mechanics se aata hai. Meri zindagi bhar ka sapna — gravity aur quantum mechanics ka unification — aaj pehla concrete evidence mila hai. God does NOT play dice — but God does play strings!',
    icon: '⚡',
    color: '#f5a623',
  },
  {
    scientistId: 'ramanujan',
    name: 'Srinivasa Ramanujan',
    statement: 'Namagiri Devi ne mujhe sapne mein jo formulas dikhaye the — aaj woh gravitational waves mein, N-body orbits mein, har jagah kaam aa rahe hain. Mathematics sirf abstract nahi hai — yeh Universe ki language hai. Aur is language mein chhupi hui symmetries hain jo 300 saal se kisi ne nahi dekhi thi.',
    icon: '∞',
    color: '#a78bfa',
  },
  {
    scientistId: 'bose',
    name: 'Satyendra Nath Bose',
    statement: 'Einstein sahab ne mera paper 1924 mein translate kiya tha — aaj unhi ke gravitational waves detect karne ke liye mera Bose-Einstein Condensate kaam aa raha hai. Quantum mechanics macro scale pe kaam karti hai — 10 lakh atoms ek giant sensor ban jaate hain. India se 3 BEC sites operational hain!',
    icon: '🌊',
    color: '#38bdf8',
  },
  {
    scientistId: 'noether',
    name: 'Emmy Noether',
    statement: 'Mujhe Göttingen mein lecture dene nahi diya tha — "women cannot teach." Aaj mera theorem dark matter ko explain kar raha hai. Symmetry Universe ki sabse fundamental cheez hai — visible matter mein bhi, dark matter mein bhi. SU(2)_D — dark sector ka apna Standard Model hai. Symmetry never lies!',
    icon: '⚖️',
    color: '#f87060',
  },
];

export function getCollabTrack(id: CollabId): CollabTrack {
  return COLLAB_TRACKS.find(t => t.id === id) || COLLAB_TRACKS[0];
}
