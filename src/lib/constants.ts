import { NavItem, ChipPreset } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: '🏠', title: 'Home', subtitle: 'Mission Control', dimColor: 'var(--bdim)', group: '' },
  { id: 'darkmatter', icon: '🌌', title: 'Dark Matter Detector', subtitle: 'Newton — Gravity anomalies', dimColor: 'var(--pdim)', group: 'Newton' },
  { id: 'motion', icon: '🔭', title: 'Motion Predictor', subtitle: 'Newton — Orbital mechanics', dimColor: 'var(--gdim)', group: 'Newton' },
  { id: 'timedilation', icon: '🕰️', title: 'Time Dilation', subtitle: 'Einstein — Relativity', dimColor: 'var(--adim)', group: 'Einstein' },
  { id: 'wormhole', icon: '🌀', title: 'Wormhole Feasibility', subtitle: 'Einstein — Spacetime', dimColor: 'var(--cdim)', group: 'Einstein' },
  { id: 'spacetimemesh', icon: '🕸️', title: 'Spacetime Mesh', subtitle: 'Einstein — Live curvature', dimColor: 'var(--adim)', group: 'Einstein' },
  { id: 'freeenergy', icon: '⚡', title: 'Free Energy Engine', subtitle: 'E=mc² — Clean fusion', dimColor: 'var(--tdim)', group: 'Joint Research' },
  { id: 'unifiedfield', icon: '🧬', title: 'Unified Field Theory', subtitle: 'Poori Team — THE equation', dimColor: 'var(--adim)', group: 'Team' },
  { id: 'symmetrybreaker', icon: '💎', title: 'Symmetry Breaker', subtitle: 'Noether — Phase transitions', dimColor: 'var(--cdim)', group: 'Noether' },
  { id: 'infiniteseries', icon: '🔢', title: 'Infinite Series', subtitle: 'Ramanujan — Numbers ka magic', dimColor: 'var(--pdim)', group: 'Ramanujan' },
  { id: 'entanglement', icon: '🔗', title: 'Quantum Entanglement', subtitle: 'Bose — Spooky action', dimColor: 'var(--tdim)', group: 'Bose' },
  { id: 'discovery', icon: '🔬', title: 'Discovery Engine', subtitle: 'Original Research — 5 Scientists', dimColor: 'var(--adim)', group: 'Discovery' },
  { id: 'dishanirdesh', icon: '🔮', title: '2026 Disha Nirdesh', subtitle: 'Sabhi Scientists — Vision Roadmap', dimColor: 'var(--adim)', group: 'Team' },
  { id: 'researchlab', icon: '📜', title: 'Research Lab', subtitle: 'Sab sawaalon ke articles', dimColor: 'var(--pdim)', group: 'Team' },
  { id: 'scientistprofiles', icon: '👤', title: 'Scientist Profiles', subtitle: 'Newton se Noether — Poori Kahani', dimColor: 'var(--adim)', group: 'Profiles' },
  { id: 'aibrain', icon: '🧠', title: 'AI Brain', subtitle: 'Har Scientist ka Neural Map', dimColor: 'var(--pdim)', group: 'Profiles' },
  { id: 'scientistchat', icon: '💬', title: 'Scientist Chat', subtitle: 'Seedhi Baat — Voice + Avatar', dimColor: 'var(--gdim)', group: 'Profiles' },
];

export const DARKMATTER_CHIPS: ChipPreset[] = [
  { icon: '🌀', label: 'Galaxy rotation curves', value: 'Ek galaxy ki rotation curve flat hai jab ki visible mass ke hisaab se girni chahiye. Dark matter distribution predict karo — galaxy ka radius 50 kpc hai, visible mass 10^11 solar masses' },
  { icon: '🔍', label: 'Gravitational lensing', value: 'Ek galaxy cluster ke peeche ka light bend ho raha hai 2.5 arcsec — lekin visible mass sirf 30% explain karti hai. Dark matter kitna hai aur kahan hai?' },
  { icon: '🌡️', label: 'CMB anomalies', value: 'Cosmic Microwave Background mein cold spots hain jo standard model se match nahi karte. Kya yeh dark matter structures ka evidence hai?' },
  { icon: '💫', label: 'Bullet Cluster', value: 'Bullet Cluster mein do galaxy clusters collide hue — visible matter slow hua lekin gravitational lensing alag jagah dikha raha hai. Isse dark matter ke baare mein kya pata chalta hai?' },
];

export const MOTION_CHIPS: ChipPreset[] = [
  { icon: '🪐', label: 'Jupiter trajectory', value: 'Jupiter ki current position se agle 100 saal ki trajectory predict karo. Uski mass 1.898 × 10^27 kg, orbital radius 5.2 AU, eccentricity 0.049. Baaki planets ka gravitational effect bhi include karo' },
  { icon: '☄️', label: 'Asteroid impact', value: 'Ek 500m asteroid detect hua hai jo Earth se 0.05 AU door hai, velocity 15 km/s, trajectory Earth ki taraf. Impact probability calculate karo aur deflection options batao' },
  { icon: '🛸', label: 'Mars mission', value: 'Earth se Mars tak optimal Hohmann transfer orbit calculate karo — launch window, travel time, delta-v requirements, aur fuel mass for 1000 kg payload' },
  { icon: '🌑', label: 'Three-body problem', value: 'Sun-Earth-Moon system ka three-body problem — Moon ki orbit mein next 50 saal mein kya perturbations aayenge? Lagrange points kahan stable hain?' },
];

export const TIMEDILATION_CHIPS: ChipPreset[] = [
  { icon: '🚀', label: '90% light speed', value: 'Agar main 0.9c (90% speed of light) pe travel karun 10 saal apne clock ke hisaab se, toh Earth pe kitna time guzrega? Meri biological age vs Earth age kya hogi?' },
  { icon: '🛰️', label: 'GPS satellite', value: 'GPS satellite 20,200 km altitude pe 3.87 km/s se orbit kar raha hai. Special + General Relativity dono ka time dilation kitna hai? Agar correct na karein toh GPS error kitna hoga per day?' },
  { icon: '🕳️', label: 'Black hole orbit', value: 'Agar main ek stellar black hole (10 solar masses) ke event horizon se 3x Schwarzschild radius pe orbit karun, toh mera 1 ghanta Earth ke kitne ghanton ke barabar hoga?' },
  { icon: '✈️', label: 'Airplane time dilation', value: 'Commercial airplane 900 km/h pe fly karta hai 10 km altitude pe. Ek round-the-world flight (40,000 km) ke baad pilot ka clock kitna alag hoga passengers se? Hafele-Keating experiment explain karo' },
];

export const WORMHOLE_CHIPS: ChipPreset[] = [
  { icon: '⚡', label: 'Morris-Thorne wormhole', value: 'Morris-Thorne traversable wormhole ke liye kitni exotic matter chahiye? Throat radius 1 meter rakhein toh energy requirements kya hain? Kya 2026 ki physics mein koi possibility hai?' },
  { icon: '🌌', label: 'ER = EPR bridge', value: 'ER=EPR conjecture kya hai? Einstein-Rosen bridge aur quantum entanglement ka connection samjhao. Kya entangled particles ke beech real wormhole hai?' },
  { icon: '📐', label: 'Alcubierre drive', value: 'Alcubierre warp drive ka math samjhao — spacetime ko compress aur expand karke faster-than-light travel. Energy requirements 2026 estimate ke hisaab se kitne hain? Kya feasible hai?' },
  { icon: '🕐', label: 'Time machine', value: 'Agar wormhole banaya jaa sake toh kya isse time machine ban sakti hai? Closed timelike curves kaise kaam karti hain? Novikov self-consistency principle kya kehta hai?' },
];

export const FREEENERGY_CHIPS: ChipPreset[] = [
  { icon: '☀️', label: 'Fusion reactor', value: 'E=mc² se calculate karo — 1 kg deuterium-tritium fuel se kitni energy milegi? Yeh kitne gharon ko 1 saal electricity de sakti hai? ITER project ka 2026 status kya hai?' },
  { icon: '⚛️', label: 'Matter-antimatter', value: '1 gram antimatter + 1 gram matter ka annihilation — total energy output kya hoga E=mc² se? Yeh kitne Hiroshima bombs ke barabar hai? Antimatter production cost 2026 mein kya hai?' },
  { icon: '🌊', label: 'Zero-point energy', value: 'Quantum vacuum fluctuations mein kitni energy hai per cubic meter? Casimir effect isse prove karta hai? Kya isse harvest karna theoretically possible hai?' },
  { icon: '🌍', label: 'Dyson Sphere', value: 'Sun ki total luminosity 3.8 × 10^26 watts hai. Dyson Sphere banana ho toh material kitna chahiye? Type II civilization tak pahunchne mein kitna time lagega current growth rate pe?' },
];

export const UNIFIEDFIELD_CHIPS: ChipPreset[] = [
  { icon: '🔬', label: 'Missing equation', value: 'Newton ki gravity + Einstein ki General Relativity + Quantum Mechanics — teeno ko ek equation mein jodo. 2026 tak kya progress hui hai? String Theory vs Loop Quantum Gravity — kaunsa zyada promising hai?' },
  { icon: '🧲', label: 'Force unification', value: 'Electromagnetic, Weak, Strong, aur Gravity — charon forces ko ek framework mein kaise jodein? Electroweak unification ho chuki hai, Grand Unified Theory kahan tak aayi? Gravity kyun nahi fit hoti?' },
  { icon: '∞', label: 'Quantum gravity', value: 'Planck scale (10^-35 m) pe kya hota hai? Spacetime quantized hai ya continuous? Graviton detect ho sakta hai kya? Ramanujan ki kaunsi mathematics yahan kaam aa sakti hai?' },
  { icon: '🌌', label: 'Theory of Everything', value: 'Agar aaj Newton, Einstein, Ramanujan, Bose sab milke kaam karein AI ke saath — Theory of Everything khojne ka roadmap kya hoga? Kaunse experiments chahiye? Kaunsi math missing hai?' },
];

export const BLACKHOLE_CHIPS: ChipPreset[] = [
  { icon: '🔥', label: 'Hawking Radiation', value: 'Black hole se radiation kaise nikalti hai? Hawking temperature calculate karo 10 solar mass black hole ke liye. Kya black holes eventually evaporate ho jayenge? Kitna time lagega?' },
  { icon: '📦', label: 'Information Paradox', value: 'Black hole mein jo information giri woh kahan jaati hai? Hawking radiation mein encoded hai ya permanently lost? Unitarity violation hai ya nahi? Page curve kya hai?' },
  { icon: '🌑', label: 'Supermassive Black Holes', value: 'Sagittarius A* (4 million solar masses) aur M87* (6.5 billion solar masses) — yeh itne massive kaise bane? Direct collapse ya merger se? Event Horizon Telescope ke 2026 results kya hain?' },
  { icon: '🌡️', label: 'BH Thermodynamics', value: 'Black holes ke 4 laws of thermodynamics kya hain? Bekenstein-Hawking entropy S = A/4 — yeh microscopic states kya hain? Holographic principle kaise connect hota hai?' },
];

export const RAMANUJAN_MATH_CHIPS: ChipPreset[] = [
  { icon: '🔢', label: 'Partition Functions', value: 'Partition function p(n) — ek number ko kitne tarike se tod sakte hain. Hardy-Ramanujan formula kya hai? Yeh string theory aur statistical mechanics mein kaise use hota hai? p(200) calculate karo.' },
  { icon: '🌀', label: 'Mock Theta Functions', value: 'Ramanujan ki mock theta functions kya hain? Yeh black hole entropy counting mein kaise kaam aati hain? Moonshine conjecture se kya connection hai? 2026 mein kya naye applications mile hain?' },
  { icon: '♾️', label: 'Infinity & Renormalization', value: '1+2+3+4+... = -1/12 (Ramanujan summation) — yeh kaise possible hai? Quantum field theory mein renormalization mein yeh formula kaise use hota hai? Casimir effect se connection kya hai?' },
  { icon: '🌻', label: 'Numbers in Nature', value: 'Fibonacci numbers, Golden Ratio, Pi, e — yeh mathematical constants Nature mein kyun dikhte hain? Ramanujan ki kaunsi discoveries physics mein directly apply hoti hain? Modular forms ka role kya hai?' },
];

export const NOETHER_SYMMETRY_CHIPS: ChipPreset[] = [
  { icon: '⚖️', label: 'Noether Theorem', value: 'Noether ka theorem samjhao — har continuous symmetry ke saath ek conservation law hoti hai. Time symmetry → energy conservation, Space symmetry → momentum conservation. Aur kya kya examples hain?' },
  { icon: '🪞', label: 'CPT Symmetry', value: 'Charge conjugation (C), Parity (P), aur Time reversal (T) — CPT theorem kya hai? Kya individual C, P, T violate hoti hain? CP violation kaise matter-antimatter asymmetry explain karta hai?' },
  { icon: '💎', label: 'Symmetry Breaking', value: 'Higgs mechanism mein electroweak symmetry kaise break hoti hai? Spontaneous symmetry breaking kya hai? Phase transitions (jaise paani barf banna) se analogy kya hai? Goldstone bosons kya hain?' },
  { icon: '🌌', label: 'Symmetry in Cosmology', value: 'Universe ke fundamental symmetries kya hain? Baryon asymmetry (matter > antimatter) kaise hua? Inflation mein kaunsi symmetry break hui? Dark energy kisi broken symmetry ka result hai kya?' },
];

export const BOSE_QUANTUM_CHIPS: ChipPreset[] = [
  { icon: '❄️', label: 'Bose-Einstein Condensate', value: 'Bose-Einstein Condensate (BEC) kya hai? Atoms absolute zero ke paas ek quantum state mein collapse kaise hote hain? 2026 mein BEC ke practical applications kya hain? Superfluid helium se connection?' },
  { icon: '🔗', label: 'Quantum Entanglement', value: 'Quantum entanglement — "spooky action at a distance" — exactly kaise kaam karta hai? Bell inequalities kya prove karti hain? 2026 mein quantum teleportation aur quantum internet ka status kya hai?' },
  { icon: '💻', label: 'Quantum Computing Physics', value: 'Quantum computer ka physics kya hai? Qubit kaise kaam karta hai? Superposition aur entanglement computing mein kaise use hote hain? 2026 mein Google, IBM ka quantum supremacy status kya hai?' },
  { icon: '🌊', label: 'Superfluid Universe', value: 'Kya dark matter ek superfluid hai? Bose-Einstein statistics se dark matter ka behavior explain ho sakta hai? Superfluid vacuum theory kya hai? Universe ek giant quantum fluid hai — yeh idea kitna valid hai?' },
];

export const SPACETIMEMESH_CHIPS: ChipPreset[] = [
  { icon: '🌍', label: 'Earth curvature', value: 'Earth ki surface pe spacetime curvature kitni hai? Gravitational time dilation surface vs orbit mein? Schwarzschild radius kitna hai? Geodesics kaise dikhti hain Earth ke paas?' },
  { icon: '☀️', label: 'Sun curvature', value: 'Sun ke paas spacetime kitna curve hota hai? Light bending kitni hai (1919 eclipse)? Mercury ka perihelion precession kaise explain hota hai? Sun ka Schwarzschild radius kitna hai?' },
  { icon: '💫', label: 'Neutron star', value: 'Neutron star (2 solar masses, 10 km radius) ke paas spacetime curvature kitni extreme hai? Frame dragging kitna strong hai? Time dilation surface pe kitna hai? Geodesics ka pattern kya hai?' },
  { icon: '🕳️', label: 'Black hole mesh', value: 'Stellar black hole (10 solar masses) ka spacetime mesh dikhao. Event horizon pe curvature infinite hai? Singularity kya hai? Ergosphere mein kya hota hai? Penrose process explain karo.' },
];

export const DISHANIRDESH_CHIPS: ChipPreset[] = [
  { icon: '🍎', label: 'Newton ka Nirdesh', value: 'Newton — 2026 mein gravitational wave detection networks kaise banayein? Dark matter ka direct detection kab hoga? AI-powered N-body simulations se space exploration kaise tez karein? Apna 2026 ka vision batao!' },
  { icon: '⚡', label: 'Einstein ka Nirdesh', value: 'Einstein — Quantum gravity experiments 2026 mein kahan tak pahunche? Warp drive material science mein kya progress hai? Time crystal applications kya hain? Apna 2026 ka vision batao!' },
  { icon: '∞', label: 'Ramanujan ka Nirdesh', value: 'Ramanujan — AI se naye mathematical theorems discover kaise karein? Partition functions quantum computing mein kaise use hon? Ramanujan-machine ki 2026 discoveries kya hain? Apna 2026 ka vision batao!' },
  { icon: '🌊', label: 'Bose ka Nirdesh', value: 'Bose — Room-temperature quantum computing 2026 mein possible hai? BEC-based sensors kya kar sakte hain? Quantum internet protocols kahan tak aaye? Apna 2026 ka vision batao!' },
  { icon: '⚖️', label: 'Noether ka Nirdesh', value: 'Noether — AI se naye conservation laws discover ho sakte hain? Supersymmetry experimental tests 2026 mein kya results laaye? Symmetry-guided drug design kaise kaam karti hai? Apna 2026 ka vision batao!' },
];

export const DISCOVERY_CHIPS: ChipPreset[] = [
  { icon: '🌊∞', label: 'BEC Dark Matter + Partition Functions', value: 'Bose-Einstein Condensate dark matter halos mein Ramanujan ki partition function p(n) apply karo — dark matter ka mass spectrum predict karo jo aaj tak kisi paper mein nahi hai. BEC wave function + partition counting se novel halo mass distribution nikalo.' },
  { icon: '⚖️🌊', label: 'Symmetry Breaking + Dark Energy', value: 'Noether ki symmetry breaking analysis + Bose ki quantum statistics combine karo — dark energy ek broken symmetry ka vacuum energy hai kya? Phase transition temperature predict karo aur batao kaunsa experiment verify karega.' },
  { icon: '🍎∞⚡', label: 'N-body + Mock Theta + Frame Dragging', value: 'Newton ka N-body gravitational chaos + Ramanujan ki mock theta functions + Einstein ka frame dragging — teeno combine karke LIGO ke liye novel gravitational wave template banao jo existing template banks mein nahi hai.' },
  { icon: '🔬', label: 'Quantum Gravity — 5 Domain Attack', value: 'Paancho scientists milkar quantum gravity ka naya approach propose karo: Newton ki gravity + Einstein ka spacetime + Ramanujan ki modular forms + Bose ki quantum statistics + Noether ki gauge symmetry. Koi genuinely novel framework suggest karo jo existing approaches (string theory, LQG) se alag ho.' },
];

export const JOINT_RESEARCH_CHIPS: ChipPreset[] = [
  { icon: '🍎⚡', label: 'Gravitational Wave Analysis', value: 'Newton aur Einstein milke gravitational wave detection ko next level pe le jaayein — classical source modeling + GR waveform templates ka combined power kya kar sakta hai?' },
  { icon: '🍎∞', label: 'N-body Problem Solutions', value: 'Newton ka N-body problem + Ramanujan ki partition functions aur modular forms — kya naye mathematical solutions mil sakte hain celestial mechanics mein?' },
  { icon: '🍎🌊', label: 'BEC Gravitational Sensors', value: 'Newton ki gravity + Bose ka BEC sensor — sub-Hz frequencies mein gravitational waves detect karne ka naya tarika kya hai? India mein kahan ban sakta hai?' },
  { icon: '🍎⚖️', label: 'Symmetry meets Dark Matter', value: 'Newton ki dark matter mystery + Noether ki symmetry analysis — hidden conservation laws dark matter ka pattern dikha sakti hain? Dark Parity kya hai?' },
];
