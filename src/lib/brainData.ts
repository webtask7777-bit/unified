import { ScientistId } from './scientistProfiles';

export interface BrainDomain {
  name: string;
  level: number;
  icon: string;
}

export interface BrainNode {
  label: string;
  info: string;
}

export interface ThinkingStep {
  step: string;
  detail: string;
  icon: string;
}

export interface BrainMemory {
  content: string;
  type: string;
  icon: string;
}

export interface BrainStat {
  label: string;
  value: string;
  icon: string;
}

export interface ScientistBrain {
  id: ScientistId;
  brainType: string;
  signatureThought: string;
  dominantSide: 'left' | 'right' | 'balanced';
  domains: BrainDomain[];
  nodes: BrainNode[];
  connections: [number, number][];
  thinkingStyle: ThinkingStep[];
  memories: BrainMemory[];
  stats: BrainStat[];
}

export const BRAIN_DATA: Record<ScientistId, ScientistBrain> = {
  newton: {
    id: 'newton',
    brainType: 'Analytical-Experimental Genius',
    signatureThought: 'Har cheez ka ek mathematical law hai — bas dhoondhna padta hai',
    dominantSide: 'left',
    domains: [
      { name: 'Classical Mechanics', level: 98, icon: '⚙️' },
      { name: 'Mathematics', level: 92, icon: '📐' },
      { name: 'Optics', level: 88, icon: '🌈' },
      { name: 'Astronomy', level: 82, icon: '🔭' },
      { name: 'Natural Philosophy', level: 78, icon: '📜' },
      { name: 'Alchemy', level: 42, icon: '⚗️' },
    ],
    nodes: [
      { label: 'Gravity', info: 'Universal force — har do mass ke beech attraction' },
      { label: 'Laws of Motion', info: 'Teen laws jo poori mechanics define karte hain' },
      { label: 'Calculus', info: 'Mathematics ka naya language — change ko measure karo' },
      { label: 'Optics', info: 'White light = 7 colors — prism se proof' },
      { label: 'Principia', info: 'Greatest science book ever written — 1687' },
      { label: 'Tides', info: 'Moon ki gravity se samundar ka uthna-girna' },
      { label: 'Orbits', info: 'Planetary motion ka complete mathematical model' },
      { label: 'Reflecting Telescope', info: 'Naya design — chromatic aberration solved' },
    ],
    connections: [[0,1],[0,2],[0,4],[0,6],[1,2],[1,4],[2,3],[2,4],[3,7],[5,0],[5,6],[6,4]],
    thinkingStyle: [
      { step: 'Observe', detail: 'Nature ko dhyan se dekho — patterns dhoondho', icon: '👁️' },
      { step: 'Hypothesize', detail: 'Ek mathematical explanation socho', icon: '💭' },
      { step: 'Mathematize', detail: 'Equation bana ke prove karo', icon: '📐' },
      { step: 'Verify', detail: 'Experiment se confirm karo', icon: '🔬' },
      { step: 'Publish', detail: 'Principia mein likh do — duniya badal do', icon: '📖' },
    ],
    memories: [
      { content: 'Seb girte dekha — gravity ka concept aaya. Lekin equation likhne mein 20 saal lage!', type: 'Eureka Moment', icon: '🍎' },
      { content: 'Plague ke time ghar aaya — 2 saal mein calculus, optics, gravity teenon invent kar diye', type: 'Annus Mirabilis', icon: '⚡' },
      { content: 'Prism se white light 7 colors mein split kiya — optics forever changed', type: 'Experiment', icon: '🌈' },
      { content: 'Leibniz se calculus ka credit war — bitter rivalry', type: 'Rivalry', icon: '⚔️' },
      { content: '"If I have seen further, it is by standing on the shoulders of giants"', type: 'Philosophy', icon: '🗣️' },
    ],
    stats: [
      { label: 'Est. IQ', value: '190+', icon: '🧠' },
      { label: 'Active Fields', value: '5', icon: '🔬' },
      { label: 'Key Laws', value: '4', icon: '📜' },
      { label: 'Productive Years', value: '62', icon: '⏳' },
    ],
  },

  einstein: {
    id: 'einstein',
    brainType: 'Thought Experiment Virtuoso',
    signatureThought: 'Imagination knowledge se zyada important hai — pehle socho, phir equation likho',
    dominantSide: 'right',
    domains: [
      { name: 'Theoretical Physics', level: 99, icon: '⚡' },
      { name: 'Cosmology', level: 92, icon: '🌌' },
      { name: 'Mathematics', level: 80, icon: '📐' },
      { name: 'Philosophy', level: 76, icon: '🤔' },
      { name: 'Quantum Theory', level: 68, icon: '⚛️' },
      { name: 'Thought Experiments', level: 98, icon: '💭' },
    ],
    nodes: [
      { label: 'Special Relativity', info: 'Time aur space relative hain — speed of light constant' },
      { label: 'E=mc²', info: 'Mass = Energy — universe ka sabse famous equation' },
      { label: 'General Relativity', info: 'Gravity = spacetime ka curvature — mass bends space' },
      { label: 'Photoelectric Effect', info: 'Light = particles (photons) — Nobel Prize 1921' },
      { label: 'Brownian Motion', info: 'Atoms exist — random molecular collisions ka proof' },
      { label: 'Gravitational Waves', info: 'Spacetime mein ripples — LIGO ne 2015 mein detect kiya' },
      { label: 'Cosmological Constant', info: 'Lambda — universe expand ho rahi hai ya nahi?' },
      { label: 'Unified Field', info: 'Sab forces ko ek equation mein jodne ka sapna' },
    ],
    connections: [[0,1],[0,2],[0,5],[1,3],[2,5],[2,6],[2,7],[3,4],[4,0],[6,7],[1,7],[3,7]],
    thinkingStyle: [
      { step: 'Imagine', detail: 'Gedankenexperiment — light beam ke saath daudo', icon: '🏃' },
      { step: 'Simplify', detail: 'Problem ko essence tak strip karo', icon: '✂️' },
      { step: 'Equation', detail: 'Elegant mathematics mein express karo', icon: '📝' },
      { step: 'Predict', detail: 'Naye testable predictions nikalo', icon: '🔮' },
      { step: 'Wait', detail: 'Technology aane do — proof aa jayega', icon: '⏰' },
    ],
    memories: [
      { content: '16 saal ki umar mein socha — agar light beam ke saath dauda toh kya dikhega?', type: 'Origin', icon: '💡' },
      { content: 'Patent office mein baithke 4 revolutionary papers likhe — 1905 Annus Mirabilis', type: 'Breakthrough', icon: '📝' },
      { content: 'Eddington ne 1919 eclipse mein light bending confirm kiya — raat bhar hero', type: 'Verification', icon: '🌑' },
      { content: '"God does not play dice" — quantum mechanics se lifelong disagreement', type: 'Philosophy', icon: '🎲' },
      { content: 'Brain preserved after death — 2.71 kg, unique parietal lobe structure', type: 'Legacy', icon: '🧠' },
    ],
    stats: [
      { label: 'Est. IQ', value: '160', icon: '🧠' },
      { label: 'Nobel Prizes', value: '1', icon: '🏆' },
      { label: 'Papers', value: '300+', icon: '📄' },
      { label: 'Thought Exp.', value: '10+', icon: '💭' },
    ],
  },

  ramanujan: {
    id: 'ramanujan',
    brainType: 'Divine Intuition Engine',
    signatureThought: 'Equations mere sapnon mein aati hain — Namagiri Devi dikhati hain',
    dominantSide: 'right',
    domains: [
      { name: 'Number Theory', level: 99, icon: '🔢' },
      { name: 'Infinite Series', level: 98, icon: '♾️' },
      { name: 'Analysis', level: 97, icon: '📊' },
      { name: 'Modular Forms', level: 96, icon: '🌀' },
      { name: 'Combinatorics', level: 93, icon: '🧩' },
      { name: 'Mathematical Intuition', level: 100, icon: '✨' },
    ],
    nodes: [
      { label: 'Partition Functions', info: 'Ek number ko kitne tarike se tod sakte hain — p(n)' },
      { label: 'Mock Theta', info: 'Mysterious functions — 80 saal baad samjhi gayi' },
      { label: 'Infinite Series', info: 'Pi, e, aur 1/π ke liye incredible series' },
      { label: '1729', info: 'Hardy ka taxicab number — "very interesting number hai"' },
      { label: 'Continued Fractions', info: 'Numbers ko fractions ki infinite chain mein express karo' },
      { label: 'Ramanujan Tau', info: 'τ(n) function — deep number theory connections' },
      { label: 'Modular Equations', info: 'Elliptic functions ke beech ke relations' },
      { label: 'Pi Formulas', info: 'π calculate karne ke fastest formulas — NASA use karta hai' },
    ],
    connections: [[0,1],[0,2],[0,6],[1,6],[2,4],[2,7],[3,0],[4,5],[4,7],[5,6],[6,1],[7,2]],
    thinkingStyle: [
      { step: 'Dream', detail: 'Namagiri Devi se visions — sapne mein formulas', icon: '🙏' },
      { step: 'Intuit', detail: 'Pattern feel karo — proof baad mein aayega', icon: '✨' },
      { step: 'Write', detail: 'Notebook mein tez-tez likho — 3900+ results', icon: '📝' },
      { step: 'Skip Proof', detail: '"Space nahi hai margin mein" — result important hai', icon: '⏭️' },
    ],
    memories: [
      { content: '1+2+3+4+... = -1/12 — impossible lag raha hai lekin physics mein kaam aata hai', type: 'Wild Result', icon: '♾️' },
      { content: 'Hardy ko letter likha — "I am a clerk in Madras" — duniya badal gayi', type: 'Turning Point', icon: '✉️' },
      { content: '1729 = 12³ + 1³ = 10³ + 9³ — "boring number nahi hai, Hardy!"', type: 'Famous Moment', icon: '🚕' },
      { content: 'Lost notebook 1976 mein mila — aaj tak naye theorems nikal rahe hain', type: 'Legacy', icon: '📔' },
      { content: 'Bina formal training ke Cambridge FRS bana — sirf 30 saal ki umar mein', type: 'Achievement', icon: '🎓' },
    ],
    stats: [
      { label: 'Results', value: '3900+', icon: '📊' },
      { label: 'Notebooks', value: '3', icon: '📔' },
      { label: 'FRS Age', value: '30', icon: '🎓' },
      { label: 'Intuition', value: '∞', icon: '✨' },
    ],
  },

  bose: {
    id: 'bose',
    brainType: 'Quantum Statistical Pioneer',
    signatureThought: 'Photon ko classical physics se mat dekho — naye statistics chahiye',
    dominantSide: 'balanced',
    domains: [
      { name: 'Quantum Mechanics', level: 94, icon: '⚛️' },
      { name: 'Statistical Physics', level: 97, icon: '📊' },
      { name: 'Mathematics', level: 84, icon: '📐' },
      { name: 'Theoretical Physics', level: 89, icon: '🔬' },
      { name: 'Teaching', level: 92, icon: '👨‍🏫' },
      { name: 'Bengali Literature', level: 75, icon: '📚' },
    ],
    nodes: [
      { label: 'Bose-Einstein Stats', info: 'Identical particles ka naya counting method — bosons' },
      { label: 'Bosons', info: 'Uske naam pe particles — photons, gluons, Higgs sab' },
      { label: 'Photon Gas', info: 'Light ko gas ki tarah treat karo — quantum statistics' },
      { label: 'BEC Prediction', info: 'Absolute zero pe atoms ek state mein collapse — 1995 mein prove hua' },
      { label: "Planck's Law", info: 'Planck ka formula quantum way se derive kiya — bina classical assumption' },
      { label: 'Quantum States', info: 'Particles ke energy levels ka distribution' },
      { label: 'D-brane Connection', info: 'String theory mein Bose statistics ka modern role' },
    ],
    connections: [[0,1],[0,2],[0,3],[0,4],[1,3],[1,6],[2,4],[2,5],[3,5],[4,5],[5,6]],
    thinkingStyle: [
      { step: 'Question', detail: 'Classical derivation mein kya galat hai?', icon: '❓' },
      { step: 'Rethink', detail: 'Fundamentals se dobara socho — identical particles', icon: '🔄' },
      { step: 'New Statistics', detail: 'Naya counting method banao jo quantum reality match kare', icon: '📊' },
      { step: 'Share', detail: 'Einstein ko letter likho — collaboration shuru', icon: '✉️' },
    ],
    memories: [
      { content: 'Class mein Planck ka formula derive karte waqt "galti" ki — woh galti naya physics thi!', type: 'Eureka', icon: '💡' },
      { content: 'Einstein ne paper translate karke German journal mein submit karaya — instant recognition', type: 'Recognition', icon: '📬' },
      { content: '"Boson" naam Dirac ne diya — ek Indian scientist ke naam pe fundamental particle', type: 'Honor', icon: '⭐' },
      { content: 'Nobel nahi mila lekin uska kaam 7 Nobel Prizes ka basis bana', type: 'Impact', icon: '🏆' },
      { content: 'Bangla mein science likhne ka passion — "apni bhasha mein physics seekho"', type: 'Vision', icon: '📝' },
    ],
    stats: [
      { label: 'Particle Named', value: 'Boson', icon: '⚛️' },
      { label: 'Nobel Basis', value: '7', icon: '🏆' },
      { label: 'Key Papers', value: '25+', icon: '📄' },
      { label: 'Teaching Years', value: '40+', icon: '👨‍🏫' },
    ],
  },

  noether: {
    id: 'noether',
    brainType: 'Abstract Symmetry Architect',
    signatureThought: 'Har symmetry ke peeche ek conservation law chhupi hai — dhoondho!',
    dominantSide: 'left',
    domains: [
      { name: 'Abstract Algebra', level: 99, icon: '💎' },
      { name: 'Symmetry Analysis', level: 98, icon: '⚖️' },
      { name: 'Theoretical Physics', level: 88, icon: '⚡' },
      { name: 'Ring Theory', level: 97, icon: '💍' },
      { name: 'Topology', level: 86, icon: '🔗' },
      { name: 'Invariant Theory', level: 94, icon: '🪞' },
    ],
    nodes: [
      { label: "Noether's Theorem", info: 'Symmetry ↔ Conservation Law — physics ka deepest insight' },
      { label: 'Conservation Laws', info: 'Energy, momentum, charge — sab symmetry se aate hain' },
      { label: 'Noetherian Rings', info: 'Algebra ka foundation — ascending chain condition' },
      { label: 'Ideal Theory', info: 'Ring theory mein ideals ka systematic study' },
      { label: 'Abstract Algebra', info: 'Modern algebra ka foundation — groups, rings, fields' },
      { label: 'Invariant Theory', info: 'Transformations mein kya nahi badalta — woh important hai' },
      { label: 'Symmetry Breaking', info: 'Jab symmetry toothi hai — Higgs mechanism' },
    ],
    connections: [[0,1],[0,5],[0,6],[1,5],[2,3],[2,4],[3,4],[4,5],[5,0],[6,0],[6,1]],
    thinkingStyle: [
      { step: 'Abstract', detail: 'Problem ko most general form mein socho', icon: '🔍' },
      { step: 'Generalize', detail: 'Specific se universal pattern nikalo', icon: '🌐' },
      { step: 'Prove', detail: 'Rigorous mathematical proof do', icon: '✅' },
      { step: 'Connect', detail: 'Algebra aur physics ko bridge karo', icon: '🌉' },
    ],
    memories: [
      { content: 'Göttingen mein unpaid padhaati thi — "unofficial lecturer" kyunki woman thi', type: 'Struggle', icon: '⚔️' },
      { content: 'Einstein ne kaha "greatest woman mathematician in history" — phir bhi professor nahi bana payi', type: 'Recognition', icon: '📣' },
      { content: 'Noether Theorem — physics ka ek sabse beautiful result, 1918 mein prove kiya', type: 'Masterpiece', icon: '✨' },
      { content: 'Nazi Germany se bhagna pada — Bryn Mawr mein aakhiri saal', type: 'Exile', icon: '🚢' },
      { content: 'Standard Model of particle physics — uska theorem foundation hai', type: 'Legacy', icon: '🧬' },
    ],
    stats: [
      { label: 'Key Theorem', value: '1', icon: '⚖️' },
      { label: 'Algebra Impact', value: '∞', icon: '💎' },
      { label: 'Students', value: 'Noether Boys', icon: '👥' },
      { label: 'Fields Changed', value: '3', icon: '🔬' },
    ],
  },

  galileo: {
    id: 'galileo',
    brainType: 'Observational Revolutionary',
    signatureThought: 'Measure karo jo measure ho sake — jo na ho sake usko measurable banao',
    dominantSide: 'balanced',
    domains: [
      { name: 'Astronomy', level: 96, icon: '🔭' },
      { name: 'Mechanics', level: 91, icon: '⚙️' },
      { name: 'Instrumentation', level: 93, icon: '🔧' },
      { name: 'Mathematics', level: 80, icon: '📐' },
      { name: 'Philosophy', level: 78, icon: '📜' },
      { name: 'Courage', level: 98, icon: '🦁' },
    ],
    nodes: [
      { label: 'Telescope', info: '30x magnification — sky ko pehli baar detail mein dekha' },
      { label: 'Jupiter Moons', info: '4 moons discover kiye — Earth center nahi hai proof' },
      { label: 'Heliocentrism', info: 'Sun is center — Church se ladai, "Eppur si muove"' },
      { label: 'Falling Bodies', info: 'Pisa Tower experiment — heavy aur light same speed girte hain' },
      { label: 'Pendulum', info: 'Church ke lamp se isochronism discover kiya' },
      { label: 'Venus Phases', info: 'Venus ke phases — Copernican model ka proof' },
      { label: 'Sunspots', info: 'Sun perfect nahi hai — spots change hote hain' },
    ],
    connections: [[0,1],[0,2],[0,5],[0,6],[1,2],[2,3],[3,4],[4,3],[5,2],[6,2]],
    thinkingStyle: [
      { step: 'Observe', detail: 'Apni aankhon se dekho — authority pe bharosa mat karo', icon: '👁️' },
      { step: 'Experiment', detail: 'Test karo — Pisa Tower se cheezon ko girao', icon: '🧪' },
      { step: 'Measure', detail: 'Numbers mein record karo — precision matters', icon: '📏' },
      { step: 'Challenge', detail: 'Galat ho toh bolo — chahe Church ho ya Aristotle', icon: '⚔️' },
    ],
    memories: [
      { content: 'Telescope banakar Jupiter ke 4 moons dekhe — Earth center nahi hai, proved!', type: 'Discovery', icon: '🔭' },
      { content: 'Inquisition ne house arrest diya — "phir bhi dharti ghumti hai" bola', type: 'Courage', icon: '🦁' },
      { content: 'Pisa Tower se gend girayi — Aristotle galat tha, sab same speed girte hain', type: 'Experiment', icon: '🏗️' },
      { content: 'Church mein lamp hilte dekha — pendulum ka isochronism discover kiya', type: 'Insight', icon: '💡' },
    ],
    stats: [
      { label: 'Discoveries', value: '8+', icon: '🔭' },
      { label: 'Telescope Power', value: '30x', icon: '🔍' },
      { label: 'Moons Found', value: '4', icon: '🌙' },
      { label: 'Trials Survived', value: '2', icon: '⚖️' },
    ],
  },

  curie: {
    id: 'curie',
    brainType: 'Relentless Experimental Pioneer',
    signatureThought: 'Life mein kuch bhi darr ke nahi — sirf samajhne ke liye hota hai',
    dominantSide: 'left',
    domains: [
      { name: 'Radioactivity', level: 99, icon: '☢️' },
      { name: 'Chemistry', level: 95, icon: '⚗️' },
      { name: 'Physics', level: 91, icon: '⚡' },
      { name: 'Experimental Methods', level: 97, icon: '🔬' },
      { name: 'Determination', level: 100, icon: '💪' },
    ],
    nodes: [
      { label: 'Radioactivity', info: 'Naam usne diya — atomic property hai, chemical nahi' },
      { label: 'Radium', info: 'Tons pitchblende se grams radium isolate kiya' },
      { label: 'Polonium', info: 'Apne desh Poland ke naam pe element rakh diya' },
      { label: 'X-Ray Units', info: 'WWI mein mobile X-ray vans — "Petites Curies"' },
      { label: 'Nuclear Physics', info: 'Atomic structure ka foundation rakh diya' },
      { label: 'Alpha/Beta/Gamma', info: 'Radiation ke teen types classify kiye' },
    ],
    connections: [[0,1],[0,2],[0,4],[0,5],[1,2],[1,4],[2,0],[3,0],[3,4],[4,5]],
    thinkingStyle: [
      { step: 'Hypothesize', detail: 'Atomic property hai — test karo har element pe', icon: '💭' },
      { step: 'Isolate', detail: 'Tons of ore process karo — pure element nikalo', icon: '⚗️' },
      { step: 'Measure', detail: 'Precise electrometer readings — data is everything', icon: '📊' },
      { step: 'Repeat', detail: '1000 baar repeat karo — certainty chahiye', icon: '🔄' },
    ],
    memories: [
      { content: 'Tons pitchblende se pinch radium nikala — 4 saal ki backbreaking work', type: 'Determination', icon: '💪' },
      { content: 'Do Nobel Prizes — Physics (1903) aur Chemistry (1911) — pehli aurat', type: 'Historic', icon: '🏆' },
      { content: 'Pierre ki death ke baad akele research continue ki — never gave up', type: 'Strength', icon: '❤️' },
      { content: 'Aaj bhi uski notebooks radioactive hain — lead box mein rakhni padti hain', type: 'Legacy', icon: '📔' },
    ],
    stats: [
      { label: 'Nobel Prizes', value: '2', icon: '🏆' },
      { label: 'Elements Found', value: '2', icon: '⚛️' },
      { label: 'Fields', value: 'Physics + Chem', icon: '🔬' },
      { label: 'Firsts', value: '4+', icon: '⭐' },
    ],
  },

  tesla: {
    id: 'tesla',
    brainType: 'Visionary Inventor Supreme',
    signatureThought: 'Future electric hai — main woh future apne dimag mein pehle build karta hoon',
    dominantSide: 'right',
    domains: [
      { name: 'Electrical Engineering', level: 99, icon: '⚡' },
      { name: 'Invention', level: 98, icon: '💡' },
      { name: 'Electromagnetism', level: 96, icon: '🧲' },
      { name: 'Visualization', level: 100, icon: '👁️' },
      { name: 'Wireless Technology', level: 92, icon: '📡' },
      { name: 'Futurism', level: 95, icon: '🔮' },
    ],
    nodes: [
      { label: 'AC Motor', info: 'Alternating current motor — duniya ki electricity ka backbone' },
      { label: 'Tesla Coil', info: 'High voltage, high frequency — wireless energy ka sapna' },
      { label: 'Wireless Energy', info: 'Wardenclyffe Tower — bina wire ke bijli bhejo' },
      { label: 'Rotating Field', info: 'Rotating magnetic field — AC motor ka core concept' },
      { label: 'Radio', info: 'Radio invention ka claim — Marconi se pehle patent' },
      { label: 'Remote Control', info: 'Radio-controlled boat — 1898 mein robotics ki shuruaat' },
      { label: 'AC Power Grid', info: 'Niagara Falls power plant — AC duniya mein laaya' },
    ],
    connections: [[0,3],[0,6],[1,2],[1,4],[2,4],[2,5],[3,0],[3,6],[4,5],[5,1],[6,0]],
    thinkingStyle: [
      { step: 'Visualize', detail: 'Pura machine dimag mein build karo — har nut-bolt tak', icon: '👁️' },
      { step: 'Mental Test', detail: 'Dimag mein chalao — kahan problem aayegi dekho', icon: '🧠' },
      { step: 'Perfect Design', detail: 'Mentally iterate karo jab tak perfect na ho', icon: '✨' },
      { step: 'Build Once', detail: 'Sirf ek baar banao — pehli baar perfect', icon: '🔧' },
    ],
    memories: [
      { content: 'Budapest park mein chalta tha aur AC motor ka vision aaya — poora design dimag mein!', type: 'Vision', icon: '💡' },
      { content: 'Edison ke saath kaam kiya, phir AC vs DC war — Tesla jeet gaya', type: 'War of Currents', icon: '⚡' },
      { content: 'Wardenclyffe Tower — free wireless energy ka sapna — funding khatam, tower gira diya', type: 'Tragedy', icon: '💔' },
      { content: 'Photographic memory thi — books padhke word by word yaad rakhta tha', type: 'Superpower', icon: '🧠' },
    ],
    stats: [
      { label: 'Patents', value: '300+', icon: '📜' },
      { label: 'Inventions', value: '700+', icon: '💡' },
      { label: 'Languages', value: '8', icon: '🗣️' },
      { label: 'Vision Power', value: '∞', icon: '👁️' },
    ],
  },

  hawking: {
    id: 'hawking',
    brainType: 'Cosmic Boundary Breaker',
    signatureThought: 'Universe ke rules samajhna hai toh boundaries pe jao — event horizon pe',
    dominantSide: 'balanced',
    domains: [
      { name: 'Cosmology', level: 98, icon: '🌌' },
      { name: 'Black Holes', level: 99, icon: '🕳️' },
      { name: 'Quantum Gravity', level: 96, icon: '⚛️' },
      { name: 'General Relativity', level: 93, icon: '📐' },
      { name: 'Science Communication', level: 97, icon: '📖' },
      { name: 'Willpower', level: 100, icon: '💪' },
    ],
    nodes: [
      { label: 'Hawking Radiation', info: 'Black holes emit radiation — eventually evaporate ho jayenge' },
      { label: 'Singularity Theorems', info: 'Penrose ke saath prove kiya — Big Bang mein singularity thi' },
      { label: 'Information Paradox', info: 'Black hole mein info kahan jaati hai? — biggest open question' },
      { label: 'No-Boundary', info: 'Universe ki koi "beginning" nahi — time imaginary ho jaata hai' },
      { label: 'Brief History', info: 'A Brief History of Time — 10 million copies sold' },
      { label: 'BH Thermodynamics', info: 'Black holes ka temperature aur entropy hai — Bekenstein-Hawking' },
      { label: 'Chronology Protection', info: 'Time travel impossible kyun? — physics khud rokti hai' },
    ],
    connections: [[0,2],[0,5],[1,0],[1,3],[2,5],[2,0],[3,1],[4,0],[4,1],[5,0],[6,3]],
    thinkingStyle: [
      { step: 'Boundary', detail: 'Extreme conditions imagine karo — event horizon, Big Bang', icon: '🔥' },
      { step: 'Quantum', detail: 'Classical result pe quantum corrections lagao', icon: '⚛️' },
      { step: 'Surprise', detail: 'Counter-intuitive result aayega — accept karo', icon: '😮' },
      { step: 'Communicate', detail: 'Duniya ko samjhao — har insaan science samajh sakta hai', icon: '📢' },
    ],
    memories: [
      { content: 'ALS diagnosis at 21 — doctors ne 2 saal diye, 55 saal aur jiya', type: 'Courage', icon: '💪' },
      { content: 'Black holes glow karte hain — quantum effects se radiation nikalti hai', type: 'Breakthrough', icon: '✨' },
      { content: 'Wheelchair se universe ke sabse bade questions solve kiye', type: 'Inspiration', icon: '♿' },
      { content: 'Thorne ke saath bet haari — black holes info destroy nahi karte', type: 'Bet', icon: '🎰' },
    ],
    stats: [
      { label: 'Books Sold', value: '10M+', icon: '📖' },
      { label: 'ALS Years', value: '55+', icon: '💪' },
      { label: 'Key Papers', value: '150+', icon: '📄' },
      { label: 'Pop Culture', value: '∞', icon: '⭐' },
    ],
  },

  feynman: {
    id: 'feynman',
    brainType: 'Playful Problem Solver',
    signatureThought: 'Agar simply explain nahi kar sakte — toh samjhe nahi ho tum',
    dominantSide: 'balanced',
    domains: [
      { name: 'Quantum Electrodynamics', level: 99, icon: '⚡' },
      { name: 'Teaching', level: 98, icon: '👨‍🏫' },
      { name: 'Problem Solving', level: 100, icon: '🧩' },
      { name: 'Particle Physics', level: 95, icon: '⚛️' },
      { name: 'Nanotechnology', level: 82, icon: '🔬' },
      { name: 'Fun', level: 99, icon: '😄' },
    ],
    nodes: [
      { label: 'Feynman Diagrams', info: 'Particle interactions ko pictures mein draw karo' },
      { label: 'QED', info: 'Quantum Electrodynamics — most accurate theory ever' },
      { label: 'Path Integrals', info: 'Quantum particle har possible path leta hai simultaneously' },
      { label: 'Nanotechnology', info: '"Plenty of room at the bottom" — nano revolution start kiya' },
      { label: 'Superfluidity', info: 'Helium-4 ki superfluidity explain ki — liquid friction zero' },
      { label: 'Weak Force', info: 'V-A theory — weak nuclear force ka structure' },
      { label: 'Parton Model', info: 'Proton ke andar "partons" — quarks ka precursor' },
    ],
    connections: [[0,1],[0,2],[1,2],[1,5],[2,1],[3,0],[4,2],[5,6],[6,1],[0,5]],
    thinkingStyle: [
      { step: 'Play', detail: 'Problem ke saath khelo — serious mat ho', icon: '🎮' },
      { step: 'Draw', detail: 'Diagrams banao — visual thinking > equations', icon: '✏️' },
      { step: 'Calculate', detail: 'Ab calculate karo — but fun way mein', icon: '🔢' },
      { step: 'Simplify', detail: 'Itna simple banao ki 5 saal ka bachcha samjhe', icon: '👶' },
    ],
    memories: [
      { content: 'Manhattan Project mein safes crack karta tha — security test ke liye!', type: 'Fun', icon: '🔓' },
      { content: 'Challenger disaster — O-ring ko ice water mein daala, sabke saamne fail dikha diya', type: 'Courage', icon: '🚀' },
      { content: 'Bongo drums bajata tha strip clubs mein — physicist by day, drummer by night', type: 'Character', icon: '🥁' },
      { content: '"Surely You\'re Joking" — autobiography jo bestseller ban gayi', type: 'Legacy', icon: '📖' },
    ],
    stats: [
      { label: 'Nobel Prize', value: '1965', icon: '🏆' },
      { label: 'Diagrams Created', value: '∞', icon: '✏️' },
      { label: 'Lectures', value: '1000s', icon: '👨‍🏫' },
      { label: 'Safes Cracked', value: '???', icon: '🔓' },
    ],
  },

  planck: {
    id: 'planck',
    brainType: 'Reluctant Revolutionary',
    signatureThought: 'Main quantum sirf isliye laaya kyunki aur koi option nahi tha — nature ne force kiya',
    dominantSide: 'left',
    domains: [
      { name: 'Thermodynamics', level: 96, icon: '🌡️' },
      { name: 'Quantum Theory', level: 95, icon: '📦' },
      { name: 'Statistical Mechanics', level: 91, icon: '📊' },
      { name: 'Classical Physics', level: 93, icon: '⚙️' },
      { name: 'Ethics', level: 90, icon: '⚖️' },
      { name: 'Music', level: 75, icon: '🎹' },
    ],
    nodes: [
      { label: "Planck's Constant", info: 'h = 6.626 × 10⁻³⁴ J·s — quantum world ka ruler' },
      { label: 'Black Body Radiation', info: 'UV catastrophe solve kiya — energy quantized hai' },
      { label: 'Energy Quanta', info: 'E = hf — energy packets mein aati hai, continuous nahi' },
      { label: 'Planck Units', info: 'Universe ke natural units — length, time, mass, temperature' },
      { label: "Planck's Law", info: 'Radiation spectrum ka perfect formula' },
      { label: 'Entropy', info: 'S = k ln W — Boltzmann ke saath thermodynamics' },
    ],
    connections: [[0,1],[0,2],[0,3],[1,2],[1,4],[2,4],[2,5],[3,0],[4,5],[5,1]],
    thinkingStyle: [
      { step: 'Classical First', detail: 'Pehle classical physics try karo — sab options', icon: '📚' },
      { step: 'Fail', detail: 'UV catastrophe — classical physics fail ho gayi', icon: '❌' },
      { step: 'Desperate Fix', detail: 'Energy ko quantize karo — last resort "trick"', icon: '🎲' },
      { step: 'Accept Reality', detail: 'Trick nahi tha — nature actually quantized hai', icon: '🤯' },
    ],
    memories: [
      { content: 'Black body radiation solve karne ki desperation mein h introduce kiya — socha temporary fix hai', type: 'Revolution', icon: '💡' },
      { content: '"A new scientific truth does not triumph by convincing its opponents" — generation badalni padti hai', type: 'Wisdom', icon: '📜' },
      { content: 'Son Erwin ko Nazis ne execute kiya — personal tragedy ke bavjood science continue kiya', type: 'Tragedy', icon: '💔' },
      { content: 'Piano aur cello dono bajata tha — music mein bhi precise tha', type: 'Personal', icon: '🎹' },
    ],
    stats: [
      { label: 'Nobel Prize', value: '1918', icon: '🏆' },
      { label: 'Constants Named', value: '5+', icon: '📐' },
      { label: 'Revolution', value: 'Quantum', icon: '⚛️' },
      { label: 'Music Skills', value: 'Pro', icon: '🎹' },
    ],
  },

  bohr: {
    id: 'bohr',
    brainType: 'Complementarity Philosopher',
    signatureThought: 'Opposite truths ek saath sahi ho sakte hain — yahi complementarity hai',
    dominantSide: 'balanced',
    domains: [
      { name: 'Atomic Physics', level: 97, icon: '⚛️' },
      { name: 'Quantum Mechanics', level: 95, icon: '🔮' },
      { name: 'Philosophy of Science', level: 93, icon: '🤔' },
      { name: 'Nuclear Physics', level: 89, icon: '☢️' },
      { name: 'Debate Skills', level: 98, icon: '🗣️' },
      { name: 'Football', level: 70, icon: '⚽' },
    ],
    nodes: [
      { label: 'Bohr Model', info: 'Atom ka planetary model — electrons fixed orbits mein' },
      { label: 'Complementarity', info: 'Wave aur particle dono sahi — depends on observation' },
      { label: 'Copenhagen', info: 'Quantum mechanics ki interpretation — measurement matters' },
      { label: 'Nuclear Model', info: 'Liquid drop model — nuclear fission predict kiya' },
      { label: 'Correspondence', info: 'Quantum → Classical jab numbers bade hon' },
      { label: 'Hydrogen Spectrum', info: 'Hydrogen ke spectral lines perfectly explain kiye' },
    ],
    connections: [[0,1],[0,4],[0,5],[1,2],[1,4],[2,1],[3,0],[3,2],[4,0],[5,0]],
    thinkingStyle: [
      { step: 'Model', detail: 'Simple model banao — phir complexity add karo', icon: '🏗️' },
      { step: 'Debate', detail: 'Einstein se bhi lado agar galat lag raha hai', icon: '🗣️' },
      { step: 'Refine', detail: 'Model ko data se match karo — iterate karo', icon: '🔄' },
      { step: 'Accept Paradox', detail: 'Nature paradoxical hai — dono answers sahi ho sakte hain', icon: '☯️' },
    ],
    memories: [
      { content: 'Einstein-Bohr debates — physics ki greatest intellectual battles', type: 'Debate', icon: '⚔️' },
      { content: 'Atomic model banaya — electrons fixed orbits mein ghoomte hain, beech mein nahi', type: 'Breakthrough', icon: '⚛️' },
      { content: 'Nazi Denmark se escape kiya — boat mein Sweden, phir London, phir Manhattan Project', type: 'Escape', icon: '🚤' },
      { content: 'Carlsberg brewery ne house diya — free beer pipeline ke saath!', type: 'Fun Fact', icon: '🍺' },
    ],
    stats: [
      { label: 'Nobel Prize', value: '1922', icon: '🏆' },
      { label: 'Einstein Debates', value: '30+', icon: '🗣️' },
      { label: 'Element Named', value: 'Bohrium', icon: '⚛️' },
      { label: 'Students (Nobel)', value: '6+', icon: '🎓' },
    ],
  },

  maxwell: {
    id: 'maxwell',
    brainType: 'Unification Architect',
    signatureThought: 'Electricity aur magnetism ek hi cheez hain — aur light bhi wohi hai!',
    dominantSide: 'left',
    domains: [
      { name: 'Electromagnetism', level: 99, icon: '🧲' },
      { name: 'Mathematics', level: 95, icon: '📐' },
      { name: 'Thermodynamics', level: 89, icon: '🌡️' },
      { name: 'Optics', level: 93, icon: '🌈' },
      { name: 'Statistical Mechanics', level: 88, icon: '📊' },
    ],
    nodes: [
      { label: "Maxwell's Equations", info: '4 equations — poora electromagnetism summarize' },
      { label: 'EM Waves', info: 'Light = electromagnetic wave — speed = 1/√(μ₀ε₀)' },
      { label: 'Displacement Current', info: 'Missing term dhoondha — equations complete kiye' },
      { label: 'Maxwell Distribution', info: 'Gas molecules ki speed ka statistical distribution' },
      { label: 'Color Photography', info: 'First color photograph — RGB method invented' },
      { label: "Saturn's Rings", info: 'Rings solid nahi — particles se bane hain — proved!' },
    ],
    connections: [[0,1],[0,2],[0,4],[1,0],[1,4],[2,0],[3,0],[4,1],[5,0]],
    thinkingStyle: [
      { step: 'Unify', detail: 'Alag-alag phenomena ko ek framework mein jodo', icon: '🔗' },
      { step: 'Mathematize', detail: 'Elegant equations mein express karo — beauty matters', icon: '📝' },
      { step: 'Predict', detail: 'Equations se naye phenomena predict karo', icon: '🔮' },
      { step: 'Verify', detail: 'Hertz ne EM waves detect kiye — Maxwell sahi tha', icon: '✅' },
    ],
    memories: [
      { content: 'Electricity + Magnetism + Light = ek hi cheez — greatest unification before Einstein', type: 'Masterpiece', icon: '⚡' },
      { content: 'Light ki speed calculate ki equations se — c = 3×10⁸ m/s — exactly match!', type: 'Eureka', icon: '💡' },
      { content: 'First color photo banaya — tartan ribbon ka — 1861', type: 'Innovation', icon: '📸' },
      { content: '48 saal mein guzar gaya — aur kya kar leta agar zyada jeeta', type: 'What If', icon: '😢' },
    ],
    stats: [
      { label: 'Equations', value: '4', icon: '📐' },
      { label: 'Fields Unified', value: '3', icon: '🔗' },
      { label: 'Died Age', value: '48', icon: '⏳' },
      { label: 'Einstein Said', value: '"Greatest"', icon: '⚡' },
    ],
  },

  raman: {
    id: 'raman',
    brainType: 'Scattered Light Genius',
    signatureThought: 'Sea ka blue Rayleigh scattering nahi hai — main prove karunga!',
    dominantSide: 'left',
    domains: [
      { name: 'Optics', level: 98, icon: '💎' },
      { name: 'Spectroscopy', level: 97, icon: '🌈' },
      { name: 'Acoustics', level: 89, icon: '🔊' },
      { name: 'Crystallography', level: 86, icon: '💠' },
      { name: 'Institution Building', level: 94, icon: '🏛️' },
    ],
    nodes: [
      { label: 'Raman Effect', info: 'Light scatter hote waqt frequency change hoti hai — molecular fingerprint' },
      { label: 'Light Scattering', info: 'Scattered light mein inelastic component — new physics' },
      { label: 'Molecular Vibrations', info: 'Molecules vibrate karte hain — Raman spectroscopy se detect karo' },
      { label: 'Crystal Physics', info: 'Crystal lattice vibrations — Raman-Nath diffraction' },
      { label: 'Acoustics', info: 'Musical instruments ka physics — violin, mridangam' },
      { label: 'Raman Spectroscopy', info: 'Har lab mein use hota hai — materials identify karo' },
    ],
    connections: [[0,1],[0,2],[0,5],[1,2],[1,5],[2,3],[2,5],[3,4],[4,0],[5,0]],
    thinkingStyle: [
      { step: 'Question', detail: 'Established science ko challenge karo — sea blue kyun hai?', icon: '❓' },
      { step: 'Experiment', detail: 'Simple equipment se deep experiments karo', icon: '🔬' },
      { step: 'Discover', detail: 'Naya phenomenon dhoondho — Raman Effect', icon: '💡' },
      { step: 'Build', detail: 'Institution banao — Indian science ko strong karo', icon: '🏛️' },
    ],
    memories: [
      { content: 'Ship pe Mediterranean Sea dekhi — "blue Rayleigh nahi hai" — investigate karna shuru kiya', type: 'Origin', icon: '🚢' },
      { content: 'Nobel Prize 1930 — Asia ka pehla science Nobel — Indian flag ke saath gaya', type: 'Pride', icon: '🇮🇳' },
      { content: 'IISc aur Raman Research Institute banaya — Indian science ka foundation', type: 'Builder', icon: '🏛️' },
      { content: '28 Feb = National Science Day — Raman Effect ki discovery ka din', type: 'Legacy', icon: '📅' },
    ],
    stats: [
      { label: 'Nobel Prize', value: '1930', icon: '🏆' },
      { label: 'Discovery Age', value: '40', icon: '🎂' },
      { label: 'Institutes Built', value: '2', icon: '🏛️' },
      { label: 'National Day', value: '28 Feb', icon: '📅' },
    ],
  },

  faraday: {
    id: 'faraday',
    brainType: 'Intuitive Experimentalist',
    signatureThought: 'Main math nahi jaanta — lekin fields aur lines of force mujhe dikhti hain',
    dominantSide: 'right',
    domains: [
      { name: 'Electromagnetism', level: 97, icon: '🧲' },
      { name: 'Chemistry', level: 91, icon: '⚗️' },
      { name: 'Experimentation', level: 100, icon: '🔬' },
      { name: 'Intuition', level: 96, icon: '✨' },
      { name: 'Science Communication', level: 93, icon: '🎤' },
      { name: 'Humility', level: 99, icon: '🙏' },
    ],
    nodes: [
      { label: 'EM Induction', info: 'Magnet move karo → electricity banti hai — generator ka basis' },
      { label: "Faraday's Laws", info: 'Electrolysis ke quantitative laws — chemistry + physics jodh diye' },
      { label: 'Lines of Force', info: 'Invisible field lines imagine kiye — Maxwell ne math diya' },
      { label: 'Electric Motor', info: 'Pehla electric motor banaya — rotation from electricity' },
      { label: 'Generator', info: 'Faraday disk — mechanical energy → electrical energy' },
      { label: 'Diamagnetism', info: 'Materials magnetic field se repel hote hain — discovered' },
      { label: 'Electrochemistry', info: 'Anode, cathode, electrode — sab terms Faraday ne diye' },
    ],
    connections: [[0,2],[0,3],[0,4],[1,6],[2,0],[2,5],[3,0],[3,4],[4,0],[5,2],[6,1]],
    thinkingStyle: [
      { step: 'Tinker', detail: 'Haathon se kaam karo — experiments se seekho', icon: '🔧' },
      { step: 'See Fields', detail: 'Invisible forces ko visualize karo — lines of force', icon: '👁️' },
      { step: 'Discover', detail: 'Naya phenomenon dhoondho — experiment se theory nikalo', icon: '💡' },
      { step: 'Demonstrate', detail: 'Christmas Lectures — sabko science dikhao', icon: '🎄' },
    ],
    memories: [
      { content: 'Bookbinding apprentice se scientist bana — self-taught genius', type: 'Origin', icon: '📚' },
      { content: "Humphry Davy ka assistant bana — Davy ne kaha 'greatest discovery was Faraday'", type: 'Recognition', icon: '⭐' },
      { content: 'Christmas Lectures at Royal Institution — bachon ko science sikhaya — aaj bhi hoti hain', type: 'Legacy', icon: '🎄' },
      { content: 'Knighthood reject ki — "plain Mr. Faraday" rehna chahta tha', type: 'Humility', icon: '🙏' },
    ],
    stats: [
      { label: 'Discoveries', value: '10+', icon: '💡' },
      { label: 'Terms Coined', value: '10+', icon: '📝' },
      { label: 'Math Knowledge', value: 'Zero', icon: '📐' },
      { label: 'Christmas Lectures', value: '19', icon: '🎄' },
    ],
  },
};

export const BRAIN_IDS = Object.keys(BRAIN_DATA) as ScientistId[];
