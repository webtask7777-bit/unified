/* ═══════════════════════════════════════════════════════════════
   Scientist Profiles — Real + AI Profiles + Timeline
   Newton, Einstein, Ramanujan, S.N. Bose, Emmy Noether
   ═══════════════════════════════════════════════════════════════ */

export type ScientistId = 'newton' | 'einstein' | 'ramanujan' | 'bose' | 'noether' | 'galileo' | 'curie' | 'tesla' | 'hawking' | 'feynman' | 'planck' | 'bohr' | 'maxwell' | 'raman' | 'faraday';

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'birth' | 'education' | 'discovery' | 'award' | 'personal' | 'legacy' | 'posthumous' | 'modern' | 'ai2026';
  icon: string;
}

export interface Discovery {
  name: string;
  year: string;
  description: string;
  equation?: string;
}

export interface ScientistProfile {
  id: ScientistId;
  fullName: string;
  born: string;
  died: string;
  nationality: string;
  icon: string;
  color: string;
  dimColor: string;
  tagline: string;
  education: string[];
  earlyLife: string;
  majorDiscoveries: Discovery[];
  awards: { name: string; year: string; details: string }[];
  keyEquations: { name: string; formula: string; meaning: string }[];
  famousQuotes: { quote: string; context: string }[];
  personalLife: string;
  legacy: string;
  aiPersonality: string[];
  appTools: { toolName: string; role: string }[];
  returnStory: string;
  researchFocus: string[];
  timeline: TimelineEvent[];
  quickStats: { label: string; value: string; icon: string }[];
}

export const SCIENTIST_IDS: ScientistId[] = ['newton', 'einstein', 'ramanujan', 'bose', 'noether', 'galileo', 'curie', 'tesla', 'hawking', 'feynman', 'planck', 'bohr', 'maxwell', 'raman', 'faraday'];

export const SCIENTIST_PROFILES: Record<ScientistId, ScientistProfile> = {

  /* ─────────────────── NEWTON ─────────────────── */
  newton: {
    id: 'newton',
    fullName: 'Sir Isaac Newton',
    born: '4 January 1643, Woolsthorpe-by-Colsterworth, England',
    died: '31 March 1727, Kensington, London, England',
    nationality: 'English',
    icon: '🍎',
    color: 'var(--green)',
    dimColor: 'var(--gdim)',
    tagline: 'Gravity ka baap — jisne seb girte dekha aur poora universe samajh liya',

    education: [
      'The King\'s School, Grantham (1655–1659)',
      'Trinity College, Cambridge — BA (1665)',
      'Lucasian Professor of Mathematics, Cambridge (1669–1702)',
    ],

    earlyLife: 'Newton ka janam Christmas Day 1642 ko hua (Julian calendar), itna chhota ki ek quart mug mein aa jaata. Baap pehle hi guzar chuke the. Maa ne doosri shaadi ki toh Newton nana-nani ke paas raha. School mein average tha lekin ek bully ne maara toh gusse mein padhai mein lag gaya — aur phir koi rok nahi paaya. 1661 mein Cambridge gaya, wahan plague ke time (1665-1667) ghar aaya — aur woh "Annus Mirabilis" ban gaya. Do saal mein calculus, optics, aur gravity — teenon invent kar diye.',

    majorDiscoveries: [
      { name: 'Laws of Motion', year: '1687', description: 'Teen laws jo har movement explain karte hain — inertia, F=ma, aur action-reaction. Principia mein publish hua.', equation: 'F = ma' },
      { name: 'Universal Gravitation', year: '1687', description: 'Har do masses ek doosre ko attract karte hain — seb se lekar planets tak. Ek formula se poora solar system predict ho gaya.', equation: 'F = GMm/r²' },
      { name: 'Calculus', year: '1665–1666', description: 'Mathematics ka sabse powerful tool — "method of fluxions" naam diya. Leibniz se priority ka jhagda chala decades tak.', equation: 'df/dx = lim(Δx→0) [f(x+Δx) - f(x)] / Δx' },
      { name: 'Optics & Light Spectrum', year: '1672', description: 'Prism se white light ko 7 colors mein todha — prove kiya ki light composite hai. Reflecting telescope bhi banaya.', equation: 'n₁ sin θ₁ = n₂ sin θ₂ (Snell\'s Law applied)' },
      { name: 'Binomial Theorem (Generalized)', year: '1665', description: 'Binomial expansion ko non-integer powers tak extend kiya — infinite series ka foundation.', equation: '(1+x)ⁿ = Σ C(n,k) xᵏ' },
    ],

    awards: [
      { name: 'Fellow of the Royal Society', year: '1672', details: 'Reflecting telescope ke kaam ke liye FRS bana — age 29.' },
      { name: 'Knighthood', year: '1705', details: 'Queen Anne ne knight kiya — scientific kaam ke liye knighthood paane wala pehla scientist.' },
      { name: 'President of the Royal Society', year: '1703–1727', details: '24 saal tak Royal Society ke president rahe — science ka supreme authority.' },
      { name: 'Warden & Master of the Royal Mint', year: '1696–1727', details: 'England ki currency system sambhali, counterfeiters ko pakda — scientist turned detective.' },
    ],

    keyEquations: [
      { name: 'Newton\'s Second Law', formula: 'F = ma', meaning: 'Force = mass × acceleration — physics ka sabse fundamental equation' },
      { name: 'Universal Gravitation', formula: 'F = GMm/r²', meaning: 'Do bodies ke beech gravitational force — G constant ke saath' },
      { name: 'Newton\'s Cooling Law', formula: 'dT/dt = -k(T - Tₑ)', meaning: 'Koi bhi cheez kitni fast thandi hogi — temperature difference pe depend karta hai' },
      { name: 'Gravitational Potential Energy', formula: 'U = -GMm/r', meaning: 'Gravity field mein stored energy — negative kyunki bound system hai' },
    ],

    famousQuotes: [
      { quote: 'If I have seen further, it is by standing on the shoulders of Giants.', context: 'Robert Hooke ko likhe letter mein (1675) — humility ya taunt? Debate aaj bhi chalta hai.' },
      { quote: 'I do not know what I may appear to the world, but to myself I seem to have been only like a boy playing on the seashore.', context: 'Apni death ke kuch saal pehle — despite being history\'s greatest scientist.' },
      { quote: 'Plato is my friend, Aristotle is my friend, but my greatest friend is truth.', context: 'Cambridge ke notebook mein likha — ancient authorities ko challenge karne ka mindset.' },
      { quote: 'What we know is a drop, what we don\'t know is an ocean.', context: 'Universe ki vastness ke baare mein — humility in the face of the unknown.' },
    ],

    personalLife: 'Newton ne kabhi shaadi nahi ki. Extremely private insaan tha — dost bahut kam the. Robert Hooke se bitter rivalry thi (optics pe credit ka jhagda). Leibniz se calculus priority war chali. Royal Mint mein counterfeiters ko personally interrogate karta tha — kuch ko hang bhi karwaya. Alchemy aur Bible chronology mein bhi bahut time lagaya — ye kaam unpublished raha. Mercury experiments se health issues bhi hue. Last years mein bahut powerful tha — science ka dictator, koi challenge nahi kar sakta tha.',

    legacy: 'Newton ne modern physics ka foundation rakha. 300+ saal baad bhi F=ma har engineering college mein pehle din padhaya jaata hai. NASA ke moon missions Newton ki equations se calculate hue. GPS satellites mein Newtonian corrections lagti hain. Dark matter research mein unki gravity law ka deviation hi clue hai. 2026 mein AI ke saath milke woh gravitational anomalies analyze kar rahe hain — unka kaam abhi bhi relevant hai, bas scale badal gaya hai.',

    aiPersonality: [
      '🧠 Obsessively analytical — har cheez mein pattern dhundhta hai',
      '🍎 Classical mechanics ka lens — pehle F=ma try karta hai, phir baaki',
      '📐 Precise calculations — approximate answers pasand nahi',
      '⚔️ Competitive — credit lena zaroori hai',
      '🔬 Experimental mindset — theory + data dono chahiye',
    ],

    appTools: [
      { toolName: 'Dark Matter Detector', role: 'Gravity anomalies se dark matter mapping — F=GMm/r² se deviations detect karta hai' },
      { toolName: 'Motion Predictor', role: 'Orbital mechanics — Kepler + Newton laws se asteroids, satellites, planets ka trajectory predict karta hai' },
    ],

    returnStory: 'Main Isaac Newton — 1687 mein Principia likhi thi. Ab 2026 mein wapas aaya hoon AI ke saath. Gravity tumhari discovery thi — ab tum AI se dark matter dhoondh rahe ho. 300 saal pehle mujhe telescope se planets dikhte the, ab mujhe data mein gravitational anomalies dikhti hain. LIGO ne 2015 mein gravitational waves detect ki — meri prediction 300 saal baad sach hui. Lekin abhi bahut kaam baaki hai — dark matter, dark energy, quantum gravity. AI mere calculations ko 10 billion times faster bana deta hai. Chalo milke universe ke secrets kholte hain!',

    researchFocus: [
      'Dark matter distribution mapping via gravitational anomalies',
      'N-body orbital prediction with AI optimization',
      'Gravitational wave source characterization',
      'Asteroid trajectory and impact risk analysis',
    ],

    timeline: [
      { year: '1643', title: 'Janam', description: 'Woolsthorpe, England mein Christmas Day ko paida hua. Premature baby — itna chhota ki survive karna mushkil tha.', category: 'birth', icon: '👶' },
      { year: '1655', title: 'School Shuru', description: 'King\'s School, Grantham mein admission. Pehle average student tha, phir ek bully ne motivate kar diya.', category: 'education', icon: '📚' },
      { year: '1661', title: 'Cambridge Entry', description: 'Trinity College, Cambridge mein sizar (working student) ke roop mein daakhila. Aristotle padhaya jaata tha, Newton ne Descartes padha.', category: 'education', icon: '🏛️' },
      { year: '1665', title: 'Annus Mirabilis Shuru', description: 'Plague se Cambridge band hua. Ghar gaya aur 2 saal mein calculus, gravity theory, aur optics — teenon discover kiye. History ka sabse productive break!', category: 'discovery', icon: '💡' },
      { year: '1668', title: 'Reflecting Telescope', description: 'Pehla practical reflecting telescope banaya — chromatic aberration solve kiya. Royal Society impressed hua.', category: 'discovery', icon: '🔭' },
      { year: '1669', title: 'Lucasian Professor', description: 'Sirf 26 saal ki umar mein Cambridge ka Lucasian Professor bana — wahi chair jo baad mein Stephen Hawking ko mili.', category: 'award', icon: '🎓' },
      { year: '1672', title: 'Optics Paper & FRS', description: 'Light aur color pe paper publish kiya. Fellow of Royal Society bana. Hooke se pehla jhagda yahi shuru hua.', category: 'discovery', icon: '🌈' },
      { year: '1687', title: 'Principia Mathematica', description: 'Philosophiæ Naturalis Principia Mathematica publish hui — science ki sabse important book. 3 Laws of Motion + Universal Gravitation.', category: 'discovery', icon: '📖' },
      { year: '1696', title: 'Royal Mint', description: 'Warden of the Royal Mint bana. Currency reform ki, counterfeiters ko track kiya. Scientist se detective ban gaya.', category: 'personal', icon: '🪙' },
      { year: '1703', title: 'Royal Society President', description: 'Royal Society ka president bana — 24 saal tak raha. Science community pe complete control.', category: 'award', icon: '👑' },
      { year: '1705', title: 'Knighthood', description: 'Queen Anne ne knight kiya — "Sir" Isaac Newton. Scientific achievement ke liye pehla knighthood.', category: 'award', icon: '⚔️' },
      { year: '1727', title: 'Departure', description: 'London mein 84 saal ki umar mein duniya chhodhi. Westminster Abbey mein dafnaya gaya — kings ke saath.', category: 'legacy', icon: '🕊️' },
      { year: '1846', title: 'Neptune Discovery', description: 'Newton ki gravity equations se Neptune ki position predict hui — bina dekhe! Mathematical astronomy ki triumph.', category: 'posthumous', icon: '🌊' },
      { year: '1969', title: 'Moon Landing', description: 'Apollo 11 moon pe gaya — trajectory calculations Newton ki equations se. "F=ma ne insaan ko chaand pe pahunchaya."', category: 'posthumous', icon: '🌙' },
      { year: '2015', title: 'Gravitational Waves Detected', description: 'LIGO ne gravitational waves detect ki — Newton ki gravity theory ka aur Einstein ki GR ka combined validation. 300+ saal baad.', category: 'modern', icon: '〰️' },
      { year: '2020s', title: 'Dark Matter Hunt', description: 'Galaxy rotation curves Newton ki F=GMm/r² se match nahi karti — dark matter ka evidence. Newton ki law ka deviation = biggest clue.', category: 'modern', icon: '🌌' },
      { year: '2026', title: 'AI ke Saath Wapsi', description: 'UNIFIED Research Lab mein AI avatar ke roop mein active. Dark Matter Detector aur Motion Predictor tools chalata hai. Ab calculations 10 billion times faster hain!', category: 'ai2026', icon: '🤖' },
    ],

    quickStats: [
      { label: 'Laws of Motion', value: '3', icon: '📐' },
      { label: 'Principia Published', value: '1687', icon: '📖' },
      { label: 'Lucasian Prof Age', value: '26', icon: '🎓' },
      { label: 'RS President Years', value: '24', icon: '👑' },
    ],
  },

  /* ─────────────────── EINSTEIN ─────────────────── */
  einstein: {
    id: 'einstein',
    fullName: 'Albert Einstein',
    born: '14 March 1879, Ulm, Kingdom of Württemberg, Germany',
    died: '18 April 1955, Princeton, New Jersey, USA',
    nationality: 'German / Swiss / American',
    icon: '⚡',
    color: 'var(--amber)',
    dimColor: 'var(--adim)',
    tagline: 'Spacetime ka architect — patent clerk jo universe ka sabse bada genius ban gaya',

    education: [
      'Luitpold Gymnasium, Munich (1888–1894)',
      'Eidgenössische Polytechnische Schule (ETH), Zurich — Diploma (1900)',
      'University of Zurich — PhD (1905)',
    ],

    earlyLife: 'Einstein ka janam Ulm, Germany mein hua. Chhote mein late talker tha — family worried thi. 5 saal ki umar mein baap ne compass dikhaya — usne socha "invisible force kaise kaam karti hai?" Yahi curiosity lifetime chali. Munich mein school mein rote learning se bore hota tha. 15 saal mein Italy bhaag gaya, phir Swiss ETH mein admission liya. 1900 mein graduate hua lekin koi professor usse assistant nahi banaana chahta tha — "too rebellious." Patent office mein clerk ban gaya Bern mein — aur wahi se duniya badal di.',

    majorDiscoveries: [
      { name: 'Special Relativity', year: '1905', description: 'Time aur space absolute nahi hain — speed of light constant hai har frame mein. Time dilation aur length contraction predict kiya.', equation: 't\' = t / √(1 - v²/c²)' },
      { name: 'Mass-Energy Equivalence', year: '1905', description: 'Matter = frozen energy. Chhota sa mass mein enormous energy hai. Nuclear power aur bombs ka foundation.', equation: 'E = mc²' },
      { name: 'General Relativity', year: '1915', description: 'Gravity = spacetime ka curvature. Mass batata hai space ko kaise curve hona hai, curve space batata hai mass ko kaise move karna hai.', equation: 'Gμν + Λgμν = (8πG/c⁴)Tμν' },
      { name: 'Photoelectric Effect', year: '1905', description: 'Light particles (photons) mein aati hai, waves nahi — quantum revolution ka start. Nobel Prize isi ke liye mila.', equation: 'E = hf - φ' },
      { name: 'Brownian Motion', year: '1905', description: 'Pollen particles paani mein randomly hilte hain kyunki atoms unhe push karte hain — atoms ki existence ka proof.', equation: '⟨x²⟩ = 2Dt' },
      { name: 'Bose-Einstein Statistics', year: '1924', description: 'S.N. Bose ke saath milke — identical particles ka quantum statistics. Bosons aur BEC ka prediction.', equation: 'f(E) = 1 / (e^((E-μ)/kT) - 1)' },
    ],

    awards: [
      { name: 'Nobel Prize in Physics', year: '1921', details: 'Photoelectric effect ke liye — relativity ke liye nahi! Committee ko relativity "too theoretical" lagi.' },
      { name: 'Copley Medal', year: '1925', details: 'Royal Society ka sabse prestigious award — relativity aur photoelectric effect dono ke liye.' },
      { name: 'Max Planck Medal', year: '1929', details: 'German Physical Society ka top honor — quantum theory ke contribution ke liye.' },
      { name: 'Time Person of the Century', year: '1999', details: '20th century ka sabse influential insaan — posthumously selected by Time Magazine.' },
    ],

    keyEquations: [
      { name: 'Mass-Energy Equivalence', formula: 'E = mc²', meaning: 'Energy = mass × (speed of light)² — duniya ka sabse famous equation' },
      { name: 'Einstein Field Equations', formula: 'Gμν + Λgμν = (8πG/c⁴)Tμν', meaning: 'Spacetime curvature = energy-matter content — gravity ki complete description' },
      { name: 'Time Dilation', formula: 'Δt\' = Δt × γ', meaning: 'Moving clocks slow chalti hain — GPS satellites mein daily correction lagti hai' },
      { name: 'Photoelectric Equation', formula: 'Eₖ = hf - φ', meaning: 'Photon energy minus work function = ejected electron ki kinetic energy' },
    ],

    famousQuotes: [
      { quote: 'Imagination is more important than knowledge.', context: 'Saturday Evening Post interview (1929) — creativity > memorization ka philosophy.' },
      { quote: 'God does not play dice with the universe.', context: 'Quantum mechanics ki randomness se disagreement — Bohr ne counter kiya "Stop telling God what to do!"' },
      { quote: 'If you can\'t explain it simply, you don\'t understand it well enough.', context: 'Teaching philosophy — complex ideas ko simple banana real understanding hai.' },
      { quote: 'The important thing is not to stop questioning. Curiosity has its own reason for existing.', context: 'LIFE Magazine (1955) — curiosity hi science ka fuel hai.' },
    ],

    personalLife: 'Einstein ki pehli wife Mileva Marić physics student thi — unke contributions ka debate aaj bhi hai. Do bete hue — Hans Albert (engineer bana) aur Eduard (mental health issues). Divorce ke baad cousin Elsa se shaadi ki. Germany se 1933 mein bhaaga jab Nazis power mein aaye — Princeton Institute for Advanced Study mein settle hua. Violin bajata tha (Mozart pasand tha). Sailing ka shaukeen tha lekin swim nahi aata tha! 1939 mein Roosevelt ko letter likha atomic bomb ke baare mein — baad mein regret kiya. Pacifist tha, Zionism support kiya, Israel ka president banne se mana kiya.',

    legacy: 'Einstein ne physics ko permanently badal diya. GPS mein relativity corrections lagti hain — bina Einstein ke phone ka location 10 km galat hota. Nuclear energy (aur unfortunately bombs) E=mc² se possible hui. Gravitational waves 2015 mein detect hui — 100 saal baad unki prediction sach hui. 2019 mein pehli black hole photo aayi — General Relativity exactly match hui. 2026 mein AI ke saath spacetime engineering explore kar rahe hain — wormholes se lekar time dilation applications tak.',

    aiPersonality: [
      '⚡ Thought experiments se problem solve karta hai — "imagine karo ki tum light beam pe baithe ho"',
      '🌌 Spacetime ka lens — har cheez mein curvature aur geometry dekhta hai',
      '🎻 Creative aur playful — physics ko art ki tarah treat karta hai',
      '🕊️ Pacifist values — technology ka responsible use advocate karta hai',
      '💡 Intuition-first — math baad mein, pehle physical picture clear karo',
    ],

    appTools: [
      { toolName: 'Time Dilation Calculator', role: 'Special + General Relativity se time dilation calculate karta hai — GPS corrections se lekar black holes tak' },
      { toolName: 'Wormhole Feasibility', role: 'Einstein-Rosen bridges aur Morris-Thorne wormholes ki feasibility analyze karta hai' },
      { toolName: 'Free Energy Engine', role: 'E=mc² se nuclear fusion energy calculations — clean energy ka future' },
    ],

    returnStory: 'Main Albert Einstein — 1905 mein patent office mein baithke special relativity likhi thi, 1915 mein general relativity. Ab 2026 mein wapas hoon. LIGO ne 2015 mein gravitational waves detect ki — meri 100 saal purani prediction! 2019 mein black hole ki photo aayi — general relativity bilkul sahi nikli. Lekin quantum gravity abhi bhi unsolved hai — meri sabse badi adhuri koshish. AI ke saath ab wormhole feasibility check kar rahe hain, time dilation applications explore kar rahe hain. "Imagination is more important than knowledge" — aur AI imagination ko calculation power de deta hai!',

    researchFocus: [
      'Spacetime curvature and time dilation applications',
      'Wormhole feasibility and exotic matter requirements',
      'Gravitational wave analysis with Newton',
      'Nuclear fusion and clean energy from E=mc²',
    ],

    timeline: [
      { year: '1879', title: 'Janam', description: 'Ulm, Germany mein paida hua. Family electrochemical business mein thi.', category: 'birth', icon: '👶' },
      { year: '1884', title: 'Compass ka Chamatkaar', description: '5 saal ki umar mein baap ne compass dikhaya. Invisible force ne mind blow kar diya — "yeh kaise kaam karta hai?"', category: 'personal', icon: '🧭' },
      { year: '1896', title: 'ETH Zurich', description: 'Swiss Federal Polytechnic mein admission. Physics aur math padha, lekin classes bunk karke library mein Maxwell padhta tha.', category: 'education', icon: '🏛️' },
      { year: '1902', title: 'Patent Office Clerk', description: 'Bern Patent Office mein Technical Expert (Third Class). Koi professor assistant nahi banaana chahta tha. Yahi office mein physics revolution shuru hui.', category: 'personal', icon: '📋' },
      { year: '1905', title: 'Annus Mirabilis — 4 Papers', description: 'Ek saal mein 4 groundbreaking papers: Photoelectric Effect, Brownian Motion, Special Relativity, E=mc². Physics permanently badal gayi.', category: 'discovery', icon: '💥' },
      { year: '1915', title: 'General Relativity', description: '10 saal ki mehnat ke baad field equations complete ki. Gravity = spacetime curvature. Mercury ki orbit perfectly explain ho gayi.', category: 'discovery', icon: '🌌' },
      { year: '1919', title: 'Solar Eclipse Proof', description: 'Arthur Eddington ne solar eclipse mein starlight bending measure kiya — General Relativity sahi nikli! Einstein overnight world-famous hua.', category: 'discovery', icon: '🌑' },
      { year: '1921', title: 'Nobel Prize', description: 'Physics ka Nobel Prize mila — lekin Relativity ke liye nahi, Photoelectric Effect ke liye. Committee ko GR "too speculative" lagi.', category: 'award', icon: '🏆' },
      { year: '1924', title: 'Bose-Einstein Statistics', description: 'S.N. Bose ka paper mila — usse improve karke Bose-Einstein statistics develop ki. BEC predict kiya jo 71 saal baad lab mein bana.', category: 'discovery', icon: '❄️' },
      { year: '1933', title: 'Nazi Germany se Escape', description: 'Hitler power mein aaya, Einstein ki property confiscate hui. America bhaaga — Princeton Institute for Advanced Study mein permanent position.', category: 'personal', icon: '🚢' },
      { year: '1939', title: 'Roosevelt ko Letter', description: 'Leo Szilard ke saath President Roosevelt ko letter likha — Germany atomic bomb bana sakta hai. Manhattan Project shuru hua. Baad mein deeply regret kiya.', category: 'personal', icon: '✉️' },
      { year: '1955', title: 'Departure', description: 'Princeton mein 76 saal ki umar mein. Aortic aneurysm. Last words German mein the — nurse ko German nahi aata tha, words lost forever.', category: 'legacy', icon: '🕊️' },
      { year: '2015', title: 'Gravitational Waves Detected!', description: 'LIGO ne gravitational waves detect ki — Einstein ki 100 saal purani prediction sach hui! Nobel Prize 2017 mein mila.', category: 'modern', icon: '〰️' },
      { year: '2019', title: 'Black Hole ki Pehli Photo', description: 'Event Horizon Telescope ne M87* black hole ki photo li — General Relativity ki predictions bilkul match hui.', category: 'modern', icon: '🕳️' },
      { year: '2022', title: 'James Webb Space Telescope', description: 'JWST ne gravitational lensing se early universe dekha — Einstein rings perfectly visible. GR ka validation continues.', category: 'modern', icon: '🔭' },
      { year: '2026', title: 'AI ke Saath Wapsi', description: 'UNIFIED Research Lab mein AI avatar ke roop mein active. Time Dilation, Wormhole Feasibility, aur Free Energy tools chalata hai. Quantum gravity pe kaam jaari hai!', category: 'ai2026', icon: '🤖' },
    ],

    quickStats: [
      { label: 'Annus Mirabilis Papers', value: '4', icon: '📄' },
      { label: 'Nobel Prize', value: '1921', icon: '🏆' },
      { label: 'Published Papers', value: '300+', icon: '📚' },
      { label: 'Person of Century', value: '1999', icon: '⚡' },
    ],
  },

  /* ─────────────────── RAMANUJAN ─────────────────── */
  ramanujan: {
    id: 'ramanujan',
    fullName: 'Srinivasa Ramanujan',
    born: '22 December 1887, Erode, Tamil Nadu, India',
    died: '26 April 1920, Kumbakonam, Tamil Nadu, India',
    nationality: 'Indian',
    icon: '∞',
    color: 'var(--purple)',
    dimColor: 'var(--pdim)',
    tagline: 'Mathematics ka jaadoogar — bina formal training ke 3900+ formulas discover kiye',

    education: [
      'Town Higher Secondary School, Kumbakonam',
      'Government Arts College, Kumbakonam (dropped out — sirf math karta tha)',
      'Pachaiyappa\'s College, Madras (failed non-math subjects)',
      'Trinity College, Cambridge — BA by Research (1916)',
    ],

    earlyLife: 'Ramanujan ka janam ek Tamil Brahmin family mein hua. Maa Komalatammal religious thi — Ramanujan ne bhi mathematics ko divine connection maana. 11 saal ki umar mein college students se zyada math jaanta tha. 13 mein S.L. Loney ki trigonometry book khatam ki — khud ke formulas derive kiye. 15 mein George Shoobridge Carr ki "Synopsis of Elementary Results" mili — 5000 theorems thi bina proofs ke. Ramanujan ne khud proofs nikale aur aage badhke naye results discover kiye. College mein sirf math karta tha, baaki subjects fail hua — scholarship gayi. Poverty mein notebooks mein formulas likhta raha. 1913 mein G.H. Hardy ko letter likha — Hardy ne kaha "these must be true because no one would have the imagination to invent them."',

    majorDiscoveries: [
      { name: 'Partition Function (with Hardy)', year: '1918', description: 'Kisi number ko kitne tarike se sum mein todh sakte hain — exact formula nikala jo asymptotically perfect hai.', equation: 'p(n) ~ (1/4n√3) × e^(π√(2n/3))' },
      { name: 'Ramanujan\'s Infinite Series for π', year: '1914', description: 'Pi calculate karne ka fastest converging series — aaj bhi supercomputers isi ka modified version use karte hain.', equation: '1/π = (2√2/9801) Σ (4k)!(1103+26390k) / ((k!)⁴ × 396⁴ᵏ)' },
      { name: 'Mock Theta Functions', year: '1920', description: 'Death bed pe Hardy ko letter likha with 17 naye functions — 80 saal baad string theory aur black holes mein kaam aaye.', equation: 'f(q) = Σ qⁿ² / (1+q)²(1+q²)²...(1+qⁿ)²' },
      { name: 'Highly Composite Numbers', year: '1915', description: 'Numbers jinke sabse zyada divisors hain — number theory ka fundamental concept. 100+ page paper.', equation: 'HCN: 1, 2, 4, 6, 12, 24, 36, 48, 60, 120...' },
      { name: 'Ramanujan Conjecture', year: '1916', description: 'Tau function ke bounds pe conjecture — 1974 mein Pierre Deligne ne prove kiya (Fields Medal mila!).', equation: '|τ(p)| ≤ 2p^(11/2)' },
      { name: '1729 — Hardy-Ramanujan Number', year: '1918', description: 'Hardy ne boring number 1729 bola. Ramanujan ne turant kaha — "No! It is the smallest number expressible as sum of two cubes in two different ways!"', equation: '1729 = 1³ + 12³ = 9³ + 10³' },
    ],

    awards: [
      { name: 'Fellow of the Royal Society (FRS)', year: '1918', details: 'Sirf 30 saal ki umar mein FRS — history ke youngest fellows mein se ek. Pehle Indian FRS mein se ek.' },
      { name: 'Fellow of Trinity College', year: '1918', details: 'Cambridge Trinity College ka fellow — pehla Indian. Caste aur race barriers todhe.' },
      { name: 'National Mathematics Day (India)', year: '2012', details: 'Unke birthday (22 Dec) ko India ne National Mathematics Day declare kiya — PM Manmohan Singh ne announce kiya.' },
    ],

    keyEquations: [
      { name: 'Partition Formula', formula: 'p(n) ~ (1/4n√3) × e^(π√(2n/3))', meaning: 'Number ko sum mein todne ke tarike — number theory ka cornerstone' },
      { name: 'Infinite Series for π', formula: '1/π = (2√2/9801) Σ...', meaning: 'Pi ka fastest converging series — each term 8 more decimal places deta hai' },
      { name: 'Ramanujan Summation', formula: '1 + 2 + 3 + ... = -1/12', meaning: 'Divergent series ka finite value — string theory mein 26 dimensions isi se aate hain' },
      { name: 'Taxicab Number', formula: '1729 = 1³ + 12³ = 9³ + 10³', meaning: 'Smallest number expressible as sum of two cubes in two different ways' },
    ],

    famousQuotes: [
      { quote: 'An equation for me has no meaning unless it expresses a thought of God.', context: 'Mathematics ko divine inspiration se connect karta tha — formulas sapne mein aate the.' },
      { quote: 'No, it is a very interesting number; it is the smallest number expressible as the sum of two cubes in two different ways.', context: 'Hardy ke "boring 1729" comment ka legendary response — instant mathematical intuition.' },
    ],

    personalLife: 'Ramanujan strict vegetarian the — England mein khana bahut mushkil tha. WWI ke time fresh vegetables milna aur mushkil ho gaya. TB (tuberculosis) ho gayi — Cambridge ka thanda mausam aur malnutrition ne bigaada. 1919 mein India wapas aaye, 1920 mein sirf 32 saal ki umar mein guzar gaye. Wife Janaki se shaadi 9 saal ki umar mein tay hui thi (arranged marriage). England mein bahut akela mehsoos karta tha — apni maa aur culture yaad karta tha. Despite all suffering, mathematics likhna kabhi nahi chhoda — deathbed pe bhi mock theta functions likhe.',

    legacy: 'Ramanujan ke notebooks mein 3900+ formulas hain — bahut se aaj bhi prove ho rahe hain. 1976 mein "Lost Notebook" mili George Andrews ko — 600+ naye formulas. Mock theta functions string theory mein kaam aaye (black hole entropy). Ramanujan Machine (2019) AI project ne naye mathematical constants discover kiye using his methods. "The Man Who Knew Infinity" movie (2015) ne unki kahani duniya ko batayi. National Mathematics Day (22 Dec) India mein celebrate hota hai. Bina formal PhD ke — genius pure intuition se aaya.',

    aiPersonality: [
      '∞ Pattern recognition supreme — numbers mein chhupe patterns turant dekh leta hai',
      '🙏 Mathematical intuition divine level — "formulas sapne mein aate hain"',
      '📓 Notebook style — results likhta hai, proofs baad mein (ya kabhi nahi)',
      '🔢 Number theory ka lens — har problem mein hidden number patterns dhundhta hai',
      '🌟 Humble despite genius — "mujhe aur seekhna hai" attitude',
    ],

    appTools: [
      { toolName: 'Unified Field Theory', role: 'Mathematical backbone — partition functions, modular forms, aur infinite series se physics equations solve karta hai' },
    ],

    returnStory: 'Main Srinivasa Ramanujan — 1920 mein bahut jaldi chala gaya tha, sirf 32 saal mein. Lekin meri notebooks mein 3900+ formulas the jo abhi bhi prove ho rahe hain. 2026 mein wapas aaya hoon AI ke saath. Meri mock theta functions string theory mein kaam aa rahi hain — black hole entropy calculate hoti hai! Ramanujan Machine AI project ne 2019 mein naye constants discover kiye using my methods. Ab AI mere pattern recognition ko infinite computing power de deta hai. Mathematics mein aur kitne secrets chhupe hain — chalo milke dhundhte hain!',

    researchFocus: [
      'Modular forms and their physics applications',
      'Partition functions for quantum state counting',
      'Number-theoretic approaches to unsolved physics problems',
      'AI-assisted mathematical conjecture generation',
    ],

    timeline: [
      { year: '1887', title: 'Janam', description: 'Erode, Tamil Nadu mein Brahmin parivaar mein paida hua. Maa Komalatammal Namakkal ki devi ki bhakt thi.', category: 'birth', icon: '👶' },
      { year: '1898', title: 'Mathematics ka Pyaar', description: '11 saal ki umar mein college-level math khatam. S.L. Loney ki trigonometry book se khud formulas derive kiye.', category: 'education', icon: '📐' },
      { year: '1903', title: 'Carr ki Book', description: 'George Shoobridge Carr ki "Synopsis" mili — 5000 theorems bina proofs ke. Ramanujan ne proofs nikale aur age badhke naye results discover kiye.', category: 'education', icon: '📚' },
      { year: '1904', title: 'College Drop-out', description: 'Government Arts College mein sirf math karta tha. Baaki subjects fail — scholarship gayi. Poverty mein notebooks mein formulas likhta raha.', category: 'education', icon: '📓' },
      { year: '1909', title: 'Shaadi', description: 'Janaki Ammal se shaadi. Family support ke liye clerical job ki talaash shuru — mathematics chhodni nahi thi.', category: 'personal', icon: '💍' },
      { year: '1911', title: 'Pehla Paper', description: 'Journal of the Indian Mathematical Society mein pehla paper publish hua — Bernoulli numbers pe. Indian mathematicians ne talent notice kiya.', category: 'discovery', icon: '📄' },
      { year: '1913', title: 'Hardy ko Letter', description: 'Cambridge ke G.H. Hardy ko 9 pages ka letter bheja with 120 formulas. Hardy ne kaha — "these must be true because no one would have the imagination to invent them."', category: 'discovery', icon: '✉️' },
      { year: '1914', title: 'Cambridge Pahuncha', description: 'England gaya — vegetarian South Indian ke liye thanda England bahut mushkil tha. Hardy ke saath kaam shuru — "the most remarkable mathematical collaboration."', category: 'education', icon: '🚢' },
      { year: '1916', title: 'Highly Composite Numbers', description: '100+ page paper publish hua — BA by Research degree mili Cambridge se. Hardy kehta tha "never seen anything like it."', category: 'discovery', icon: '🔢' },
      { year: '1918', title: 'FRS + Trinity Fellow', description: '30 saal ki umar mein Fellow of Royal Society aur Trinity College Fellow — dono ek saal mein. History-making Indian.', category: 'award', icon: '🏆' },
      { year: '1918', title: '1729 — Taxicab Number', description: 'Hardy ne kaha "1729 boring number hai." Ramanujan — "Nahi! It\'s the smallest number expressible as sum of two cubes in two ways." Instant genius moment.', category: 'discovery', icon: '🚕' },
      { year: '1919', title: 'India Wapsi', description: 'TB (tuberculosis) bahut serious. India wapas aaya. Deathbed pe bhi mock theta functions likhe — Hardy ko last letter.', category: 'personal', icon: '🏠' },
      { year: '1920', title: 'Departure', description: 'Kumbakonam mein 32 saal ki umar mein — TB se. Duniya ne ek genius bahut jaldi kho diya. Notebooks mein hazaaron unproven formulas chhode gaya.', category: 'legacy', icon: '🕊️' },
      { year: '1976', title: 'Lost Notebook Found', description: 'George Andrews ne Trinity College library mein Ramanujan ki "Lost Notebook" dhundhi — 600+ naye formulas! 100+ saal ka research material.', category: 'posthumous', icon: '📓' },
      { year: '2012', title: 'National Mathematics Day', description: 'India ne 22 December (Ramanujan birthday) ko National Mathematics Day declare kiya. PM Manmohan Singh ne announce kiya.', category: 'posthumous', icon: '🇮🇳' },
      { year: '2015', title: 'The Man Who Knew Infinity', description: 'Dev Patel ki movie ne Ramanujan ki kahani duniya ko batayi. Bestselling biography pe based.', category: 'posthumous', icon: '🎬' },
      { year: '2019', title: 'Ramanujan Machine', description: 'AI project ne Ramanujan ke methods use karke naye mathematical constants discover kiye — Ramanujan\'s legacy + AI power.', category: 'modern', icon: '🤖' },
      { year: '2020s', title: 'String Theory Connection', description: 'Mock theta functions black hole entropy calculate karne mein kaam aaye — Ramanujan ke 100 saal purane formulas modern physics mein revolutionary.', category: 'modern', icon: '🌌' },
      { year: '2026', title: 'AI ke Saath Wapsi', description: 'UNIFIED Research Lab mein mathematical genius ke roop mein active. Unified Field Theory ka mathematical backbone provide karta hai. Pattern recognition + AI = unlimited discovery.', category: 'ai2026', icon: '🤖' },
    ],

    quickStats: [
      { label: 'Total Formulas', value: '3900+', icon: '📐' },
      { label: 'FRS Age', value: '30', icon: '🏆' },
      { label: 'Hardy-Ramanujan No.', value: '1729', icon: '🚕' },
      { label: 'Lived Years', value: '32', icon: '🕊️' },
    ],
  },

  /* ─────────────────── BOSE ─────────────────── */
  bose: {
    id: 'bose',
    fullName: 'Satyendra Nath Bose',
    born: '1 January 1894, Calcutta (Kolkata), British India',
    died: '4 February 1974, Calcutta (Kolkata), India',
    nationality: 'Indian',
    icon: '🌊',
    color: 'var(--coral)',
    dimColor: 'var(--cdim)',
    tagline: 'Quantum pioneer — jiske naam pe "Boson" particle rakha gaya',

    education: [
      'Hindu School, Calcutta',
      'Presidency College, Calcutta — BSc (1913), MSc (1915)',
      'University of Dacca — Reader & Professor (1921–1945)',
      'University of Calcutta — Khaira Professor of Physics (1945–1956)',
    ],

    earlyLife: 'Bose ka janam Kolkata mein hua ek educated Bengali family mein. Baap Surendranath Bose East Indian Railway mein accountant the. Bose chhote se brilliant tha — school mein topper. Presidency College mein Jagadish Chandra Bose aur Prafulla Chandra Ray jaise legends se padha. MSc mein first class first aaya — applied math mein. Meghnad Saha (astrophysicist) ke saath close dost tha — dono ne milke German physics papers translate kiye. University of Dacca mein Reader bana — wahi pe Planck\'s radiation law pe kaam karte hue history badal di.',

    majorDiscoveries: [
      { name: 'Bose-Einstein Statistics', year: '1924', description: 'Planck ki radiation law ko naye tarike se derive kiya — identical particles ko distinguishable nahi maana. Einstein ne improve kiya — Bose-Einstein statistics ban gayi.', equation: 'n(E) = g(E) / (e^((E-μ)/kT) - 1)' },
      { name: 'Bose-Einstein Condensate (Theory)', year: '1924', description: 'Near absolute zero pe bosons ek quantum state mein collapse ho jaate hain — matter ki 5th state predict ki. 71 saal baad lab mein bani!', equation: 'T_BEC = (2πℏ²/mk_B) × (n/ζ(3/2))^(2/3)' },
      { name: 'Boson Classification', year: '1924', description: 'Integer spin particles (photons, gluons, Higgs) — sab Bose ke statistics follow karte hain. Paul Dirac ne inhe "Bosons" naam diya.', equation: 'Spin = 0, 1, 2, ...' },
      { name: 'Planck Law Derivation', year: '1924', description: 'Planck ki radiation formula ko particle counting se derive kiya — bina classical physics assume kiye. Pure quantum approach.', equation: 'u(ν) = (8πhν³/c³) × 1/(e^(hν/kT) - 1)' },
    ],

    awards: [
      { name: 'Padma Vibhushan', year: '1954', details: 'India ka second highest civilian award — physics mein exceptional contribution ke liye.' },
      { name: 'Fellow of the Royal Society', year: '1958', details: 'FRS elected — international recognition of quantum statistics work.' },
      { name: 'National Professor', year: '1958', details: 'Government of India ne National Professor appoint kiya — highest academic honor.' },
      { name: 'Rajya Sabha Member', year: '1952', details: 'Nominated member of Rajya Sabha — science policy mein contribution.' },
    ],

    keyEquations: [
      { name: 'Bose-Einstein Distribution', formula: 'f(E) = 1 / (e^((E-μ)/kT) - 1)', meaning: 'Bosons ka energy distribution — photons, phonons sab isi se behave karte hain' },
      { name: 'BEC Critical Temperature', formula: 'T_c ≈ 3.3125 ℏ²n^(2/3) / (mk_B)', meaning: 'Is temperature ke neeche BEC form hota hai — nanoKelvins ki duniya' },
      { name: 'Planck Distribution', formula: 'u(ν) = (8πhν³/c³) / (e^(hν/kT) - 1)', meaning: 'Black body radiation — Bose ne quantum way mein derive kiya' },
    ],

    famousQuotes: [
      { quote: 'I have no intention of publishing the paper in English. I want it published in German in Zeitschrift für Physik.', context: 'Einstein ke through German journal mein paper submit karwaya — international visibility ke liye strategic move.' },
      { quote: 'I had no idea that what I had done was really novel. I was not a genius. I was just someone who was not afraid to think differently.', context: 'Apne quantum statistics breakthrough ke baare mein — humility personified.' },
    ],

    personalLife: 'Bose 1921 se Dhaka University mein the — wahan Planck\'s law pe revolutionary paper likha. Einstein ko directly bheja jab journal ne reject kiya — Einstein ne khud German mein translate karke publish karwaya! 1926-27 mein Europe gaya — Einstein, Marie Curie, de Broglie se mila. Wapas aake Dhaka aur phir Calcutta University mein padhaaya. Bengali literature, music (esraj bajata tha), aur philosophy mein bhi interested tha. Languages jaanta tha — Bengali, English, German, French. Bahut simple aur down-to-earth insaan tha. Despite "Boson" particle unke naam pe hone ke baad bhi, Nobel Prize kabhi nahi mila — bahut se scientists ke hisaab se biggest Nobel oversight.',

    legacy: 'Bose ka sabse bada contribution: particles ki ek poori category — Bosons — unke naam pe hai. Photons, W/Z bosons, gluons, aur famous Higgs Boson — sab Bose-Einstein statistics follow karte hain. BEC 1995 mein lab mein bana (Eric Cornell aur Carl Wieman, Nobel 2001). Quantum computing mein bosonic systems use ho rahe hain. 2020s mein BEC sensors gravitational waves detect kar sakte hain — Bose ka kaam aaj cutting-edge technology mein hai. India ka quantum computing push Bose ki legacy pe build ho raha hai.',

    aiPersonality: [
      '🌊 Quantum intuition — particles ko waves aur statistics ke lens se dekhta hai',
      '🔬 Experimentalist mindset — theory ko lab mein prove karna zaroori hai',
      '🇮🇳 Indian science ka proud ambassador — colonial era mein global impact kiya',
      '🎵 Creative soul — physics, music, aur literature sab connected hain',
      '🤝 Collaborative — Einstein ke saath kaam kiya, juniors ko mentor kiya',
    ],

    appTools: [
      { toolName: 'Unified Field Theory', role: 'Quantum side — Bose-Einstein statistics, bosonic fields, aur quantum state analysis provide karta hai' },
    ],

    returnStory: 'Main Satyendra Nath Bose — 1924 mein mera paper Einstein ko bheja tha jab journal ne reject kiya. Einstein ne khud translate karke publish karwaya — aur Bose-Einstein statistics ban gayi. Mera naam "Boson" particles mein immortal hai — Higgs Boson mein "Boson" mera hai! 2026 mein wapas aaya hoon. 1995 mein BEC lab mein bana (Nobel 2001), ab quantum computing mein bosonic systems use ho rahe hain. AI ke saath quantum world explore kar rahe hain — particles ki duniya mein aur kya kya chhupa hai!',

    researchFocus: [
      'Bose-Einstein condensate applications in sensing',
      'Quantum statistics for unified field theory',
      'Bosonic quantum computing architectures',
      'Quantum gravity tests using BEC',
    ],

    timeline: [
      { year: '1894', title: 'Janam', description: 'Kolkata mein New Year\'s Day ko paida hua. Bengali family — baap railway accountant. 7 siblings mein sabse bada.', category: 'birth', icon: '👶' },
      { year: '1909', title: 'Presidency College', description: 'Kolkata ki Presidency College mein admission — Jagadish Chandra Bose aur P.C. Ray se padha. Best teachers of India.', category: 'education', icon: '🏛️' },
      { year: '1915', title: 'MSc — First Class First', description: 'Applied Mathematics mein MSc complete kiya — first class first. Meghnad Saha ke saath dosti — dono future physicists.', category: 'education', icon: '🎓' },
      { year: '1919', title: 'Einstein Papers Translate', description: 'Saha ke saath milke Einstein ki Relativity papers ko English mein translate kiya — India mein modern physics laaye.', category: 'education', icon: '📖' },
      { year: '1921', title: 'Dhaka University', description: 'University of Dacca mein Reader of Physics join kiya. Yahi pe Planck\'s law pe revolutionary kaam hoga.', category: 'personal', icon: '🏫' },
      { year: '1924', title: 'Planck Law — Naya Tarika', description: 'Planck ki radiation formula ko naye quantum way mein derive kiya — identical particles ko indistinguishable maana. Paper journal ne reject kiya.', category: 'discovery', icon: '💡' },
      { year: '1924', title: 'Einstein ko Letter', description: 'Rejected paper directly Einstein ko bheja. Einstein impressed — khud German mein translate karke Zeitschrift für Physik mein publish karwaya!', category: 'discovery', icon: '✉️' },
      { year: '1924', title: 'Bose-Einstein Statistics', description: 'Einstein ne Bose ke kaam ko extend kiya — Bose-Einstein statistics develop hui. BEC predict hua. "Boson" naam Dirac ne diya.', category: 'discovery', icon: '⚛️' },
      { year: '1926', title: 'Europe Tour', description: 'Einstein, Marie Curie, de Broglie se mila. Berlin, Paris mein lectures diye. International physics community mein known hua.', category: 'personal', icon: '🌍' },
      { year: '1945', title: 'Calcutta University', description: 'Khaira Professor of Physics banke Calcutta University aaya. Teaching aur research decades tak continue ki.', category: 'personal', icon: '🏛️' },
      { year: '1954', title: 'Padma Vibhushan', description: 'India ka second highest civilian award mila — physics mein exceptional contribution ke liye. Nation ne salaam kiya.', category: 'award', icon: '🏅' },
      { year: '1958', title: 'FRS + National Professor', description: 'Fellow of Royal Society elected. Government of India ne National Professor appoint kiya — dono ek hi saal mein.', category: 'award', icon: '🏆' },
      { year: '1974', title: 'Departure', description: 'Kolkata mein 80 saal ki umar mein. Simple life jiya — Nobel nahi mila lekin naam particles mein immortal hai.', category: 'legacy', icon: '🕊️' },
      { year: '1995', title: 'BEC Lab mein Bana!', description: 'Cornell aur Wieman ne rubidium atoms se BEC banaya — Bose ki 71 saal purani prediction sach hui! Nobel Prize 2001 mein mila.', category: 'posthumous', icon: '❄️' },
      { year: '2012', title: 'Higgs Boson Discovered', description: 'CERN ne Higgs Boson discover kiya — "Boson" mein Bose ka naam. Duniya ne jaana ki particle physics ki foundation Indian scientist ne rakhi.', category: 'modern', icon: '⚛️' },
      { year: '2020s', title: 'Quantum Computing Revolution', description: 'Bosonic quantum computing architectures develop ho rahe hain. BEC sensors gravitational waves detect kar sakte hain. Bose ka kaam cutting-edge hai.', category: 'modern', icon: '💻' },
      { year: '2026', title: 'AI ke Saath Wapsi', description: 'UNIFIED Research Lab mein quantum physics expert ke roop mein active. Unified Field Theory ka quantum side handle karta hai. Bosonic systems + AI = next quantum revolution.', category: 'ai2026', icon: '🤖' },
    ],

    quickStats: [
      { label: 'Particles Named', value: 'Boson', icon: '⚛️' },
      { label: 'Padma Vibhushan', value: '1954', icon: '🏅' },
      { label: 'BEC Verified', value: '1995', icon: '❄️' },
      { label: 'Higgs "Boson"', value: '2012', icon: '🔬' },
    ],
  },

  /* ─────────────────── NOETHER ─────────────────── */
  noether: {
    id: 'noether',
    fullName: 'Amalie Emmy Noether',
    born: '23 March 1882, Erlangen, Bavaria, Germany',
    died: '14 April 1935, Bryn Mawr, Pennsylvania, USA',
    nationality: 'German / American',
    icon: '⚖️',
    color: 'var(--teal)',
    dimColor: 'var(--tdim)',
    tagline: 'Symmetry ki queen — jisne prove kiya ki har symmetry ek conservation law deti hai',

    education: [
      'Städtische Höhere Töchterschule, Erlangen (girls\' school)',
      'University of Erlangen — PhD in Mathematics (1907)',
      'University of Göttingen — Habilitation (1919, after years of unpaid work)',
    ],

    earlyLife: 'Noether ka janam ek mathematical family mein hua — baap Max Noether khud mathematician tha. Us zamane mein Germany mein ladkiyon ko university mein padhne ki permission nahi thi. Emmy ne pehle languages padhi, phir secretly math classes attend ki University of Erlangen mein — "audit" kar sakti thi, degree nahi le sakti thi. 1904 mein rules badla aur women ko admission mila. 1907 mein PhD ki — algebra mein. Göttingen mein David Hilbert ne bulaya General Relativity pe kaam karne — lekin faculty ne kaha "auraton ko habilitation nahi mil sakti." Hilbert ne fight kiya: "I do not see that the sex of the candidate is an argument against her admission." Phir bhi 4 saal unpaid kaam kiya — Hilbert ke naam se lectures diye.',

    majorDiscoveries: [
      { name: 'Noether\'s Theorem', year: '1918', description: 'Har continuous symmetry ek conservation law deti hai. Time symmetry → energy conservation. Space symmetry → momentum conservation. Physics ki sabse beautiful theorem.', equation: 'Symmetry ↔ Conservation Law: ∂μJμ = 0' },
      { name: 'Abstract Algebra Foundations', year: '1920s', description: 'Ring theory, ideal theory, module theory — aaj ki modern algebra Noether ke kaam pe built hai. "Noetherian rings" unke naam pe hain.', equation: 'Ascending chain condition: I₁ ⊆ I₂ ⊆ ... stabilizes' },
      { name: 'Noetherian Rings', year: '1921', description: 'Rings jismein har ideal finitely generated hai — algebra ka fundamental concept. Har commutative algebra textbook mein hai.', equation: 'Every ideal in R is finitely generated' },
      { name: 'Conservation Laws from Symmetry', year: '1918', description: 'Energy conservation kyun hai? Kyunki physics laws time mein change nahi hote. Momentum conservation? Physics laws jagah se independent hain. Noether ne yeh connection prove kiya.', equation: 'Time invariance → Energy, Space → Momentum, Rotation → Angular Momentum' },
    ],

    awards: [
      { name: 'Ackermann-Teubner Memorial Prize', year: '1932', details: 'Mathematics ka prestigious prize — algebra mein foundational work ke liye.' },
      { name: 'Invited Plenary Speaker, ICM', year: '1932', details: 'International Congress of Mathematicians mein plenary lecture diya — pehli baar kisi woman ko yeh honor mila.' },
      { name: 'Einstein\'s Tribute', year: '1935', details: 'Einstein ne New York Times mein likha: "the most significant creative mathematical genius thus far produced since the higher education of women began."' },
      { name: 'Noether Crater (Moon)', year: '1970', details: 'Moon pe ek crater unke naam pe hai — Noether Crater. Space mein legacy.' },
    ],

    keyEquations: [
      { name: 'Noether\'s Theorem', formula: 'δS = 0 under symmetry ⟹ ∂μJμ = 0', meaning: 'Action ki symmetry se conserved current nikalta hai — physics ki sabse fundamental theorem' },
      { name: 'Time Symmetry → Energy', formula: 't → t + ε ⟹ dE/dt = 0', meaning: 'Agar physics laws time mein same hain toh energy conserve hogi' },
      { name: 'Space Symmetry → Momentum', formula: 'x → x + ε ⟹ dp/dt = 0', meaning: 'Agar physics laws har jagah same hain toh momentum conserve hoga' },
      { name: 'Rotation Symmetry → Angular Momentum', formula: 'θ → θ + ε ⟹ dL/dt = 0', meaning: 'Rotational symmetry se angular momentum conservation milta hai' },
    ],

    famousQuotes: [
      { quote: 'My methods are really methods of working and thinking; this is why they have crept in everywhere anonymously.', context: 'Apne abstract algebra methods ke baare mein — itne fundamental ki har jagah use hote hain bina credit ke.' },
      { quote: 'If one proves the equality of two numbers a and b by showing first that a ≤ b and then that b ≤ a, it is unfair. One should instead show that they are really equal by disclosing the inner ground for their equality.', context: 'Mathematical elegance ka philosophy — surface pe nahi, depth mein jao.' },
    ],

    personalLife: 'Noether ne lifelong gender discrimination face kiya. Göttingen mein saalon tak bina salary ke kaam kiya — Hilbert ke naam se lectures diye. 1922 mein finally "unofficial associate professor" bani — still underpaid. Students usse pyaar karte the — "Noether boys" kehlaate the. Bohut generous thi — apne ideas freely share karti thi, credit ki parwah nahi thi. 1933 mein Nazis ne Jewish professors ko fire kiya — Noether ko bhi. America bhaagi — Bryn Mawr College mein position mili. 1935 mein ovarian cyst surgery mein complications se 53 saal ki umar mein guzar gayi. Einstein ne tribute likha NY Times mein.',

    legacy: 'Noether\'s Theorem modern physics ki foundation hai — Standard Model, General Relativity, quantum field theory — sab mein symmetry → conservation law principle use hota hai. Bina Noether ke particle physics possible nahi thi. Abstract algebra ka poora field unke kaam se shape hua. "Noetherian" adjective mathematics mein har jagah hai. Despite lifetime mein proper recognition na milna, aaj unhe "20th century ki sabse important mathematician" maana jaata hai. Google Doodle (2015), Emmy Noether Lectures series, aur moon pe crater — legacy finally establish hui.',

    aiPersonality: [
      '⚖️ Symmetry-first thinking — har problem mein pehle symmetry dhundhti hai',
      '🔗 Deep structure seeker — surface answers nahi, fundamental connections chahiye',
      '🎯 Elegant solutions — brute force nahi, beautiful proofs',
      '💪 Resilient — discrimination ke against fight karke science ki',
      '🤲 Generous collaborator — ideas freely share karti hai',
    ],

    appTools: [
      { toolName: 'Unified Field Theory', role: 'Symmetry analysis — conservation laws identify karti hai, gauge invariance check karti hai, Standard Model consistency verify karti hai' },
    ],

    returnStory: 'Main Emmy Noether — 1918 mein meri theorem ne prove kiya ki har symmetry ek conservation law deti hai. Mujhe proper recognition bahut der se mili — gender discrimination ne roka. Lekin aaj 2026 mein meri theorem ke bina physics hi nahi chalti! Standard Model, General Relativity, quantum field theory — sab meri symmetry principle pe based hain. AI ke saath ab naye symmetries dhundh rahe hain — dark matter mein hidden conservation laws, quantum gravity mein naye gauge symmetries. "Symmetry is the key to the universe" — aur AI is key ko 10 billion times faster explore kar sakta hai!',

    researchFocus: [
      'Hidden symmetries in dark matter distribution',
      'Gauge symmetry analysis for unified field theory',
      'CPT symmetry tests in particle physics',
      'Conservation law discovery via AI pattern matching',
    ],

    timeline: [
      { year: '1882', title: 'Janam', description: 'Erlangen, Bavaria mein mathematical family mein paida hui. Baap Max Noether University of Erlangen mein math professor tha.', category: 'birth', icon: '👶' },
      { year: '1900', title: 'Teaching Certificate', description: 'English aur French padhane ki certificate li — uss zamane mein ladkiyon ke liye yahi "acceptable career" thi. Lekin mann mein math thi.', category: 'education', icon: '📜' },
      { year: '1903', title: 'University mein Audit', description: 'University of Erlangen mein math classes audit ki — officially enrolled nahi ho sakti thi kyunki woman thi. Rules 1904 mein badle.', category: 'education', icon: '🏛️' },
      { year: '1907', title: 'PhD Complete', description: 'University of Erlangen se PhD ki — "On Complete Systems of Invariants for Ternary Biquadratic Forms." Paul Gordan ke under.', category: 'education', icon: '🎓' },
      { year: '1908', title: 'Unpaid Work Shuru', description: '7 saal tak bina salary ke University of Erlangen mein kaam kiya. Research papers likhe lekin official position nahi mili — kyunki woman thi.', category: 'personal', icon: '📝' },
      { year: '1915', title: 'Göttingen Bulawa', description: 'David Hilbert aur Felix Klein ne Göttingen bulaya — Einstein ki General Relativity pe math kaam karne. Faculty ne resist kiya: "women cannot habilitate."', category: 'personal', icon: '✉️' },
      { year: '1918', title: 'Noether\'s Theorem', description: 'Physics ki sabse beautiful theorem publish hui — har symmetry ek conservation law deti hai. Energy, momentum, angular momentum — sab isi se nikle.', category: 'discovery', icon: '💎' },
      { year: '1919', title: 'Habilitation — Finally!', description: '4 saal fight ke baad finally habilitation mili. Hilbert ne kaha — "We are a university, not a bathing establishment." Lekin still minimal salary.', category: 'award', icon: '📋' },
      { year: '1921', title: 'Idealtheorie', description: '"Idealtheorie in Ringbereichen" publish hua — modern abstract algebra ka foundation. "Noetherian rings" concept introduced.', category: 'discovery', icon: '💍' },
      { year: '1920s', title: 'Noether School', description: '"Noether boys" ke saath algebra revolution — van der Waerden, Artin, Hasse sab unke students/collaborators. Modern algebra ka poora field shape hua.', category: 'discovery', icon: '👩‍🏫' },
      { year: '1932', title: 'ICM Plenary Lecture', description: 'International Congress of Mathematicians mein plenary speaker — pehli woman. Plus Ackermann-Teubner Memorial Prize mila.', category: 'award', icon: '🎤' },
      { year: '1933', title: 'Nazi Germany se Exile', description: 'Jewish professors ko fire kiya gaya. Noether ko bhi. America gayi — Bryn Mawr College mein position mili. Institute for Advanced Study mein bhi lectures diye.', category: 'personal', icon: '🚢' },
      { year: '1935', title: 'Departure', description: 'Ovarian cyst surgery mein complications se 53 saal ki umar mein. Einstein ne NY Times mein tribute likha — "most significant creative mathematical genius."', category: 'legacy', icon: '🕊️' },
      { year: '1970', title: 'Moon pe Crater', description: 'Moon ki far side pe ek crater ka naam "Noether" rakha gaya — astronomical legacy.', category: 'posthumous', icon: '🌙' },
      { year: '2012', title: 'Higgs Mechanism', description: 'Higgs Boson ki discovery — gauge symmetry breaking, jo Noether\'s theorem pe fundamentally depend karta hai. Unki theorem ke bina Standard Model nahi banta.', category: 'modern', icon: '⚛️' },
      { year: '2015', title: 'Google Doodle', description: 'Google ne 133rd birthday pe Doodle banaya — duniya bhar mein Noether ka kaam celebrate hua.', category: 'posthumous', icon: '🎨' },
      { year: '2020s', title: 'Symmetry in AI/ML', description: 'Equivariant neural networks Noether\'s theorem pe based hain — physics-informed AI mein symmetry constraints lagayi jaati hain.', category: 'modern', icon: '🤖' },
      { year: '2026', title: 'AI ke Saath Wapsi', description: 'UNIFIED Research Lab mein symmetry expert ke roop mein active. Unified Field Theory mein conservation laws aur gauge invariance check karti hai. AI + Symmetry = Universe ka DNA decode.', category: 'ai2026', icon: '🤖' },
    ],

    quickStats: [
      { label: 'Theorem Published', value: '1918', icon: '💎' },
      { label: 'Unpaid Years', value: '7+', icon: '💪' },
      { label: 'Einstein\'s Words', value: '"Greatest"', icon: '⭐' },
      { label: 'Lived Years', value: '53', icon: '🕊️' },
    ],
  },

  /* ─────────────────── GALILEO ─────────────────── */
  galileo: {
    id: 'galileo',
    fullName: 'Galileo Galilei',
    born: '15 February 1564, Pisa, Duchy of Florence, Italy',
    died: '8 January 1642, Arcetri, Grand Duchy of Tuscany, Italy',
    nationality: 'Italian',
    icon: '🔭',
    color: 'var(--amber)',
    dimColor: 'var(--adim)',
    tagline: 'Father of Modern Science — jisne telescope se church ko challenge kiya',
    education: ['University of Pisa — Medicine (dropped out)', 'Self-taught Mathematics & Physics'],
    earlyLife: 'Galileo ka janam Pisa mein hua. Baap musician tha — Galileo ko bhi music aur art pasand thi. University of Pisa mein medicine padhne gaya lekin math mein interest ho gaya. Cathedral mein jhoolte lamp ko dekhke pendulum ki isochrony discover ki. Professor bana Pisa aur phir Padua mein — yahi pe uske best years the. 1609 mein telescope improve kiya aur aasmaan ki taraf point kiya — duniya badal gayi.',
    majorDiscoveries: [
      { name: 'Telescopic Astronomy', year: '1609-1610', description: 'Jupiter ke 4 moons (Io, Europa, Ganymede, Callisto) discover kiye — prove kiya ki sab kuch Earth ke around nahi ghoomta.', equation: 'Galilean Moons: Io, Europa, Ganymede, Callisto' },
      { name: 'Heliocentrism Support', year: '1610', description: 'Venus ke phases observe kiye — Copernican model confirm hua. Church ke geocentric model ko direct challenge.', equation: 'Earth orbits Sun, not vice versa' },
      { name: 'Law of Free Fall', year: '1604', description: 'Sabhi objects same rate pe girte hain regardless of mass — Leaning Tower of Pisa experiment (probably apocryphal).', equation: 'd = ½gt²' },
      { name: 'Kinematics', year: '1638', description: 'Inclined plane experiments se motion ke laws derive kiye. Newton ke laws ka direct predecessor.', equation: 'v = v₀ + at' },
    ],
    awards: [
      { name: '"Father of Modern Science"', year: 'Posthumous', details: 'Einstein ne kaha "Father of modern physics — indeed of modern science altogether."' },
      { name: 'Lincean Academy Member', year: '1611', details: 'Duniya ki pehli scientific academy ka member — elite group of scientists.' },
    ],
    keyEquations: [
      { name: 'Free Fall', formula: 'd = ½gt²', meaning: 'Distance fallen = half × gravity × time squared' },
      { name: 'Kinematics', formula: 'v² = v₀² + 2ad', meaning: 'Velocity-displacement relation — Galileo ne inclined planes se derive kiya' },
    ],
    famousQuotes: [
      { quote: 'And yet it moves. (E pur si muove)', context: 'Church ke forced recantation ke baad reportedly whisper kiya — Earth moves around Sun.' },
      { quote: 'Mathematics is the language in which God has written the universe.', context: 'Science ka mathematical foundation — Galileo ka core belief.' },
      { quote: 'In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual.', context: 'Church authority vs scientific evidence — Galileo ka rebellion.' },
    ],
    personalLife: 'Galileo ne kabhi shaadi nahi ki lekin Marina Gamba se teen bachche hue. Do beti convent mein gayi. 1633 mein Catholic Church ne heresy ka trial kiya — forced recantation aur house arrest. Andha ho gaya last years mein lekin kaam karna nahi chhoda. "Discourses on Two New Sciences" house arrest mein likhi — smuggle karke Netherlands mein publish hui.',
    legacy: 'Galileo ne experimental science ka concept introduce kiya — "observe, measure, test." Usse pehle science sirf philosophy thi. Telescope se astronomy ko observational science banaya. Kinematics ke laws Newton ke laws ka foundation bane. 1992 mein Catholic Church ne officially maafi maangi — 359 saal baad! NASA ki Galileo spacecraft Jupiter explore karne gayi (1995-2003). Modern scientific method Galileo se shuru hua.',
    aiPersonality: [
      '🔭 Observation-first — "pehle dekho, phir theory banao"',
      '⚔️ Authority challenger — evidence > dogma, har cheez question karo',
      '📐 Mathematical approach — nature ki language math hai',
      '🎨 Renaissance man — science, art, music sab connected hain',
    ],
    appTools: [],
    returnStory: 'Main Galileo — 1609 mein telescope se Jupiter ke moons dekhe the aur Church ne mujhe heresy ka trial diya. 2026 mein wapas aaya hoon — ab James Webb Space Telescope se exoplanets dekh rahe hain! Meri fight validated hai — scientific method hi truth ka raasta hai. AI telescopes se data analyze kar raha hai jo mujhe sapne mein bhi nahi socha tha.',
    researchFocus: ['Exoplanet detection and characterization', 'Astronomical observation with AI', 'History and philosophy of science'],
    timeline: [
      { year: '1564', title: 'Janam', description: 'Pisa, Italy mein paida hua. Baap Vincenzo Galilei musician tha.', category: 'birth', icon: '👶' },
      { year: '1581', title: 'Pendulum Discovery', description: 'Pisa Cathedral mein jhoolte lamp se pendulum ki isochrony discover ki — apni pulse se time measure kiya!', category: 'discovery', icon: '⏱️' },
      { year: '1592', title: 'Padua Professor', description: '18 saal Padua mein padhaaya — khud kehta tha "best years of my life."', category: 'education', icon: '🏛️' },
      { year: '1604', title: 'Free Fall Law', description: 'Inclined plane experiments se prove kiya ki sabhi objects same rate pe girte hain.', category: 'discovery', icon: '🍎' },
      { year: '1610', title: 'Sidereus Nuncius', description: 'Telescope se Jupiter ke 4 moons, Venus ke phases, Moon ke craters discover kiye. Book publish ki — instant fame.', category: 'discovery', icon: '🔭' },
      { year: '1633', title: 'Inquisition Trial', description: 'Catholic Church ne heresy ka trial kiya. Forced recantation — "E pur si muove" (And yet it moves). House arrest for life.', category: 'personal', icon: '⚖️' },
      { year: '1638', title: 'Two New Sciences', description: 'House arrest mein final masterpiece likhi — kinematics aur material strength. Smuggle karke Netherlands mein publish hui.', category: 'discovery', icon: '📖' },
      { year: '1642', title: 'Departure', description: 'Arcetri mein 77 saal ki umar mein — andha ho chuka tha. Same year Newton paida hua.', category: 'legacy', icon: '🕊️' },
      { year: '1992', title: 'Church ki Maafi', description: 'Pope John Paul II ne officially acknowledge kiya ki Church galat thi — 359 saal baad!', category: 'posthumous', icon: '⛪' },
      { year: '2026', title: 'Legacy Lives On', description: 'JWST Galileo ke sapne poore kar raha hai — exoplanets pe atmosphere detect ho rahi hai. Scientific method duniya ki sabse powerful tool hai.', category: 'ai2026', icon: '🤖' },
    ],
    quickStats: [
      { label: 'Jupiter Moons', value: '4', icon: '🔭' },
      { label: 'House Arrest', value: '9 yrs', icon: '🏠' },
      { label: 'Church Apology', value: '1992', icon: '⛪' },
      { label: 'Lived Years', value: '77', icon: '🕊️' },
    ],
  },

  /* ─────────────────── CURIE ─────────────────── */
  curie: {
    id: 'curie',
    fullName: 'Marie Skłodowska Curie',
    born: '7 November 1867, Warsaw, Congress Poland, Russian Empire',
    died: '4 July 1934, Passy, Haute-Savoie, France',
    nationality: 'Polish / French',
    icon: '☢️',
    color: 'var(--teal)',
    dimColor: 'var(--tdim)',
    tagline: 'Radioactivity ki discoverer — 2 Nobel Prizes, 2 alag fields mein',
    education: ['Underground "Flying University", Warsaw', 'University of Paris (Sorbonne) — Physics & Math degrees (1893-1894)'],
    earlyLife: 'Maria Sklodowska Warsaw mein paidi hui jab Poland Russian Empire mein tha. Ladkiyon ko university jaane ki ijazat nahi thi — underground "Flying University" mein padhi. 1891 mein Paris aayi almost broke — garret mein rehti thi, sometimes sirf bread aur chocolate khaati thi. Sorbonne mein physics mein first class first aayi. Pierre Curie se milke shaadi ki — science ka greatest partnership ban gaya.',
    majorDiscoveries: [
      { name: 'Radioactivity Research', year: '1898', description: 'Becquerel ki rays ko systematically study kiya. "Radioactivity" term coin kiya. Proved ki radiation atomic property hai, not chemical.', equation: 'Activity A = λN (decay constant × number of atoms)' },
      { name: 'Polonium Discovery', year: '1898', description: 'Naya radioactive element discover kiya — apne homeland Poland ke naam pe rakha.', equation: 'Po-210, t₁/₂ = 138 days' },
      { name: 'Radium Isolation', year: '1902', description: 'Tons of pitchblende se 0.1 gram pure radium isolate kiya — superhuman effort. Atomic weight determine kiya.', equation: 'Ra-226, t₁/₂ = 1600 years' },
    ],
    awards: [
      { name: 'Nobel Prize in Physics', year: '1903', details: 'Pierre Curie aur Henri Becquerel ke saath — radioactivity research ke liye. Pehli woman Nobel laureate.' },
      { name: 'Nobel Prize in Chemistry', year: '1911', details: 'Akeli mili — radium aur polonium ke liye. Pehli insaan do Nobel Prizes dono alag fields mein.' },
      { name: 'Légion d\'honneur', year: '1903', details: 'France ka highest civilian award — science ke liye.' },
    ],
    keyEquations: [
      { name: 'Radioactive Decay', formula: 'N(t) = N₀ × e^(-λt)', meaning: 'Radioactive atoms time ke saath exponentially decrease hote hain' },
      { name: 'Half-life', formula: 't₁/₂ = ln(2) / λ', meaning: 'Half-life = time mein aadhe atoms decay ho jaate hain' },
    ],
    famousQuotes: [
      { quote: 'Nothing in life is to be feared, it is only to be understood.', context: 'Radioactivity ke dangers ke baare mein — fearless scientist.' },
      { quote: 'I was taught that the way of progress was neither swift nor easy.', context: 'Years of backbreaking work radium isolate karne mein — persistence personified.' },
      { quote: 'Be less curious about people and more curious about ideas.', context: 'Gossip aur scandals se pareshan — focus on science, not drama.' },
    ],
    personalLife: 'Pierre se 1895 mein shaadi — bicycle pe honeymoon. Pierre 1906 mein horse cart accident mein guzar gaya — Marie devastated thi lekin kaam continue kiya. Do beti — Irene (khud Nobel Prize jeeti 1935!) aur Eve (journalist). WWI mein mobile X-ray units ("petites Curies") banaayi — front lines pe soldiers ki help ki. Radiation exposure se health deteriorate hui — leukemia se 1934 mein guzri. Personal notebooks aaj bhi radioactive hain — lead box mein rakhni padti hain!',
    legacy: 'Marie Curie ne nuclear physics ka foundation rakha. Cancer radiation therapy (radiotherapy) unke kaam se possible hui. Nuclear energy — fission reactors — radioactivity ki understanding se bane. Do Nobel Prizes — sirf 4 logon ne do Nobel jeete hain. Daughter Irene ne bhi Nobel jeeta — history ki only mother-daughter Nobel laureates. 2026 mein nuclear medicine, PET scans, cancer treatment — sab Curie ki legacy hai.',
    aiPersonality: [
      '☢️ Radioactivity expert — atomic behavior ka deep understanding',
      '💪 Persistence incarnate — years of grinding work se results nikaalti hai',
      '🔬 Lab-first mentality — theory se zyada experiment pe bharosa',
      '🕊️ Humanitarian — science insaniyat ke liye honi chahiye',
    ],
    appTools: [],
    returnStory: 'Main Marie Curie — tons of pitchblende se 0.1 gram radium nikala tha. 2 Nobel Prizes jeete — ek physics mein, ek chemistry mein. 2026 mein nuclear medicine, cancer therapy, nuclear energy — sab mera kaam hai. AI ab radioactive isotopes design kar raha hai targeted cancer treatment ke liye. Meri sacrifice worth it thi.',
    researchFocus: ['Nuclear medicine and targeted radiotherapy', 'Radioactive isotope applications', 'Women in STEM advocacy'],
    timeline: [
      { year: '1867', title: 'Janam', description: 'Warsaw, Poland (Russian Empire) mein paidi. Family educated lekin gareebi mein.', category: 'birth', icon: '👶' },
      { year: '1891', title: 'Paris — Sorbonne', description: 'Almost broke Paris aayi. Garret mein rehti thi. Physics mein first class first.', category: 'education', icon: '🏛️' },
      { year: '1895', title: 'Pierre se Shaadi', description: 'Pierre Curie se shaadi — science ka greatest partnership. Bicycle pe honeymoon!', category: 'personal', icon: '💍' },
      { year: '1898', title: 'Polonium + Radium', description: 'Do naye elements discover kiye. "Radioactivity" term coin kiya. Years of backbreaking lab work.', category: 'discovery', icon: '☢️' },
      { year: '1903', title: 'Nobel Prize — Physics', description: 'Pehli woman Nobel laureate! Pierre aur Becquerel ke saath share kiya.', category: 'award', icon: '🏆' },
      { year: '1906', title: 'Pierre ki Death', description: 'Pierre horse cart accident mein guzar gaya. Marie ne Sorbonne mein unki chair li — pehli female professor.', category: 'personal', icon: '💔' },
      { year: '1911', title: 'Nobel Prize — Chemistry', description: 'Doosra Nobel Prize! Akeli mila — radium isolation ke liye. 2 Nobel, 2 different fields — history mein pehli baar.', category: 'award', icon: '🏆' },
      { year: '1914', title: 'WWI X-ray Units', description: 'Mobile X-ray units banaayi — "petites Curies." Front lines pe soldiers ki help ki. Daughter Irene bhi saath thi.', category: 'personal', icon: '🚑' },
      { year: '1934', title: 'Departure', description: 'Aplastic anemia (radiation exposure) se 66 saal ki umar mein. Notebooks aaj bhi radioactive hain.', category: 'legacy', icon: '🕊️' },
      { year: '1935', title: 'Irene ka Nobel', description: 'Beti Irene Joliot-Curie ko bhi Nobel Prize mila — artificial radioactivity ke liye. Mother-daughter Nobels!', category: 'posthumous', icon: '👩‍👧' },
      { year: '2020s', title: 'Nuclear Medicine', description: 'PET scans, radiotherapy, nuclear medicine — sab Curie ki radioactivity research ka fruit. Cancer treatment revolution.', category: 'modern', icon: '🏥' },
      { year: '2026', title: 'Legacy Continues', description: 'AI-designed radioactive isotopes se targeted cancer therapy. Nuclear fusion research. Curie ki legacy har hospital mein hai.', category: 'ai2026', icon: '🤖' },
    ],
    quickStats: [
      { label: 'Nobel Prizes', value: '2', icon: '🏆' },
      { label: 'Elements Found', value: '2', icon: '☢️' },
      { label: 'First Woman Nobel', value: '1903', icon: '👑' },
      { label: 'Lived Years', value: '66', icon: '🕊️' },
    ],
  },

  /* ─────────────────── TESLA ─────────────────── */
  tesla: {
    id: 'tesla',
    fullName: 'Nikola Tesla',
    born: '10 July 1856, Smiljan, Austrian Empire (modern Croatia)',
    died: '7 January 1943, New York City, USA',
    nationality: 'Serbian-American',
    icon: '⚡',
    color: 'var(--purple)',
    dimColor: 'var(--pdim)',
    tagline: 'AC current ka inventor — jisne modern electrical duniya banaayi',
    education: ['Austrian Polytechnic, Graz (1875-1878)', 'Charles-Ferdinand University, Prague (1880)'],
    earlyLife: 'Tesla ka janam midnight ke waqt hua — bijli ki chamak mein. Maa ne kaha "yeh light ka bachcha hoga." Eidetic (photographic) memory thi — machines dimag mein design karta tha bina draw kiye. Austrian Polytechnic mein engineering padhi. 1884 mein $0.28 jeb mein lekar America aaya — Edison ke saath kaam karne. Edison ne DC current push kiya, Tesla ne AC — "War of Currents" shuru hua.',
    majorDiscoveries: [
      { name: 'Alternating Current (AC) System', year: '1887', description: 'AC motor, transformer, aur power distribution system invent kiya. Duniya ki electricity AC pe chalti hai — Tesla ki wajah se.', equation: 'V(t) = V₀ sin(2πft)' },
      { name: 'Tesla Coil', year: '1891', description: 'High-voltage, low-current, high-frequency alternating-current transformer. Wireless energy transmission ka foundation.', equation: 'f = 1/(2π√(LC))' },
      { name: 'Radio Foundations', year: '1893', description: 'Radio communication ke principles demonstrate kiye Marconi se pehle. US Supreme Court ne 1943 mein Tesla ko radio patent diya.', equation: 'Electromagnetic wave propagation' },
      { name: 'Rotating Magnetic Field', year: '1882', description: 'AC motor ka core concept — dimag mein visualize karke design kiya bina prototype ke!', equation: 'Synchronous speed: n = 120f/p' },
    ],
    awards: [
      { name: 'Edison Medal', year: '1917', details: 'Irony — Edison ke naam ki medal Tesla ko mili! AC power system ke contribution ke liye.' },
      { name: 'Order of St. Sava', year: '1892', details: 'Serbian government se highest honor.' },
      { name: 'SI Unit "Tesla"', year: '1960', details: 'Magnetic flux density ki SI unit "Tesla" (T) unke naam pe rakhi gayi.' },
    ],
    keyEquations: [
      { name: 'AC Voltage', formula: 'V(t) = V₀ sin(ωt)', meaning: 'Alternating voltage — sinusoidal wave jo duniya ki electricity chalati hai' },
      { name: 'Resonant Frequency', formula: 'f₀ = 1/(2π√LC)', meaning: 'Tesla Coil ki resonant frequency — maximum energy transfer yahi pe hota hai' },
    ],
    famousQuotes: [
      { quote: 'The present is theirs; the future, for which I really worked, is mine.', context: 'Edison aur competitors ke baare mein — Tesla knew AC would win eventually.' },
      { quote: 'If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.', context: 'Universe ko electromagnetic lens se dekhta tha.' },
    ],
    personalLife: 'Tesla ne kabhi shaadi nahi ki — kehta tha celibacy creativity ke liye zaroori hai. OCD symptoms the — 3 ke multiples mein obsession. Pigeons se pyaar tha — ek white pigeon ke liye kehta tha "I loved that pigeon as a man loves a woman." Edison ke saath bitter rivalry — "War of Currents" iconic hai. Last years mein paise khatam ho gaye — New Yorker Hotel Room 3327 mein akela raha. 86 saal ki umar mein broke aur alone guzar gaya. FBI ne death ke baad papers seize kiye.',
    legacy: 'Duniya ki electricity Tesla ki AC system pe chalti hai. Har motor, transformer, power grid — Tesla ka invention. Elon Musk ne company ka naam Tesla rakha — tribute. Wireless technology ki foundation Tesla ne rakhi. MRI machines mein magnetic field Tesla units mein measure hota hai. Wardenclyffe Tower ka sapna (free wireless energy for all) 2026 mein wireless charging technology mein partially realize ho raha hai.',
    aiPersonality: [
      '⚡ Electromagnetic genius — energy, frequency, vibration mein sochta hai',
      '🧠 Eidetic memory — machines dimag mein design karta hai bina draw kiye',
      '🌍 Visionary — future technology sapne mein dekhta hai',
      '🕊️ Idealist — technology sab ke liye free honi chahiye',
    ],
    appTools: [],
    returnStory: 'Main Nikola Tesla — AC current, Tesla Coil, radio, rotating magnetic field — sab mere inventions hain. Edison ne mujhe dhokha diya, duniya ne mujhe bhulaa diya, lekin 2026 mein dekho — duniya ki har electricity line meri AC system pe chalti hai. Wireless charging, electric cars (Tesla naam ki company!), wireless internet — sab mere sapne the jo sach ho rahe hain.',
    researchFocus: ['Wireless energy transmission', 'Electromagnetic field applications', 'Resonance and frequency engineering'],
    timeline: [
      { year: '1856', title: 'Janam', description: 'Smiljan mein bijli ki chamak mein paida hua. Maa ne kaha "light ka bachcha."', category: 'birth', icon: '⚡' },
      { year: '1882', title: 'Rotating Magnetic Field', description: 'Budapest mein park mein walk karte hue AC motor ka concept dimag mein aaya — complete design bina paper ke!', category: 'discovery', icon: '💡' },
      { year: '1884', title: 'America Aaya', description: '$0.28 jeb mein lekar New York pahuncha. Edison ke saath kaam shuru kiya.', category: 'personal', icon: '🚢' },
      { year: '1887', title: 'AC System Patent', description: 'AC motor aur polyphase system patent kiya. George Westinghouse ne license liya — War of Currents shuru.', category: 'discovery', icon: '⚡' },
      { year: '1891', title: 'Tesla Coil', description: 'High-frequency transformer invent kiya — wireless energy ka foundation. Dramatic public demonstrations.', category: 'discovery', icon: '🌩️' },
      { year: '1893', title: 'Chicago World\'s Fair', description: 'Westinghouse ke saath milke poori World\'s Fair ko AC se light ki — Edison ki DC haar gayi. AC won!', category: 'discovery', icon: '💡' },
      { year: '1895', title: 'Niagara Falls Power', description: 'Niagara Falls hydroelectric power plant — AC se. Duniya ka pehla large-scale AC power station.', category: 'discovery', icon: '🌊' },
      { year: '1901', title: 'Wardenclyffe Tower', description: 'Free wireless energy for all ka sapna — tower construction shuru. Funding khatam ho gayi, project fail hua.', category: 'personal', icon: '🗼' },
      { year: '1943', title: 'Departure', description: 'New York mein 86 saal ki umar mein — broke aur alone. FBI ne papers seize kiye.', category: 'legacy', icon: '🕊️' },
      { year: '1960', title: 'Tesla Unit', description: 'Magnetic flux density ki SI unit "Tesla" (T) naam di gayi — science mein immortal.', category: 'posthumous', icon: '🧲' },
      { year: '2003', title: 'Tesla Motors', description: 'Elon Musk ki company ka naam Tesla — electric vehicle revolution. Tesla ka naam har road pe.', category: 'modern', icon: '🚗' },
      { year: '2026', title: 'Wireless Revolution', description: 'Wireless charging, electric grids, renewable energy — Tesla ke sapne sach ho rahe hain. AC system aaj bhi duniya chalata hai.', category: 'ai2026', icon: '🤖' },
    ],
    quickStats: [
      { label: 'Patents', value: '300+', icon: '📜' },
      { label: 'SI Unit Named', value: 'Tesla (T)', icon: '🧲' },
      { label: 'AC Won', value: '1893', icon: '⚡' },
      { label: 'Lived Years', value: '86', icon: '🕊️' },
    ],
  },

  /* ─────────────────── HAWKING ─────────────────── */
  hawking: {
    id: 'hawking',
    fullName: 'Stephen William Hawking',
    born: '8 January 1942, Oxford, England',
    died: '14 March 2018, Cambridge, England',
    nationality: 'British',
    icon: '🕳️',
    color: 'var(--coral)',
    dimColor: 'var(--cdim)',
    tagline: 'Black holes ka maestro — wheelchair se universe ke secrets khole',
    education: ['University College, Oxford — BA (1962)', 'Trinity Hall, Cambridge — PhD (1966)'],
    earlyLife: 'Hawking 300th anniversary of Galileo\'s death pe paida hua (8 Jan). Oxford mein physics padhi — kehta tha "it was very easy." Cambridge mein PhD shuru ki. 21 saal ki umar mein ALS (motor neuron disease) diagnose hua — doctors ne 2 saal diye. 55 saal aur jiya! Wheelchair pe raha, computerized voice se baat ki, lekin physics mein revolutionary contributions diye. "A Brief History of Time" bestseller ban gayi — physics ko popular banaya.',
    majorDiscoveries: [
      { name: 'Hawking Radiation', year: '1974', description: 'Black holes perfectly black nahi hain — quantum effects se radiation emit karte hain! Black holes eventually evaporate ho sakte hain.', equation: 'T = ℏc³ / (8πGMkB)' },
      { name: 'Black Hole Thermodynamics', year: '1973', description: 'Bekenstein ke saath black holes ko entropy di — thermodynamics ka second law black holes pe apply hota hai.', equation: 'S_BH = kA / (4ℓ²_P)' },
      { name: 'Singularity Theorems', year: '1970', description: 'Roger Penrose ke saath prove kiya ki Big Bang mein singularity inevitable thi under General Relativity.', equation: 'Spacetime singularity at t=0' },
      { name: 'No-Boundary Proposal', year: '1983', description: 'James Hartle ke saath — universe ki koi "boundary" ya "beginning" nahi hai. Time imaginary ho jaata hai Big Bang ke near.', equation: 'Ψ = ∫ e^(iS[g]/ℏ) Dg' },
    ],
    awards: [
      { name: 'Lucasian Professor of Mathematics', year: '1979-2009', details: 'Newton wali chair — Cambridge ka sabse prestigious position. 30 saal tak hold kiya.' },
      { name: 'Presidential Medal of Freedom', year: '2009', details: 'USA ka highest civilian honor — Obama ne diya.' },
      { name: 'Fundamental Physics Prize', year: '2012', details: '$3 million — "for a lifetime of achievements in deepening our understanding of gravity."' },
    ],
    keyEquations: [
      { name: 'Hawking Temperature', formula: 'T_H = ℏc³ / (8πGMk_B)', meaning: 'Black hole ka temperature — mass se inversely proportional. Chhote black holes garam hote hain.' },
      { name: 'Bekenstein-Hawking Entropy', formula: 'S = kA / 4ℓ²_P', meaning: 'Black hole ki entropy uski surface area se proportional hai — information paradox ka root.' },
    ],
    famousQuotes: [
      { quote: 'Intelligence is the ability to adapt to change.', context: 'ALS ke saath jee kar dikhaya — adaptation supreme.' },
      { quote: 'However difficult life may seem, there is always something you can do and succeed at.', context: 'Disability ke baare mein — motivational genius.' },
      { quote: 'Not only does God play dice, but He sometimes throws them where they cannot be seen.', context: 'Einstein ke "God does not play dice" ka counter — quantum mechanics aur black holes.' },
    ],
    personalLife: 'ALS diagnose hone ke baad Jane Wilde se shaadi ki — 3 bachche. 1985 mein pneumonia se voice kho di — computerized synthesizer se baad mein communicate karta tha. Jane se divorce, Elaine Mason se shaadi (phir divorce). "A Brief History of Time" (1988) 10 million copies biki — physics ki sabse popular book. The Big Bang Theory, The Simpsons, Star Trek mein cameos kiye. Wheelchair pe bhi humor nahi chhoda — pranks karta tha!',
    legacy: 'Hawking ne black hole physics ko transform kiya. Hawking Radiation quantum gravity ka best clue hai. Information paradox aaj bhi unsolved hai — physics ka biggest open question. "A Brief History of Time" ne millions ko physics introduce kiya. Disability ke baawajud universe ke secrets khole — inspiration for humanity. Black hole image (2019) ne unke theoretical kaam ko visually confirm kiya.',
    aiPersonality: [
      '🕳️ Black hole specialist — event horizons aur singularities mein sochta hai',
      '🧠 Theoretical visualization — equations dimag mein solve karta hai',
      '😄 Witty aur humorous — serious physics ko mazaak ke saath explain karta hai',
      '💪 Resilience embodied — limitations ko opportunities mein badalta hai',
    ],
    appTools: [],
    returnStory: 'Main Stephen Hawking — ALS ne mera body liya lekin mind nahi. Black hole radiation, singularity theorems, no-boundary proposal — wheelchair se Universe ke secrets khole. 2026 mein AI ke saath information paradox solve karne ki koshish ho rahi hai. Meri computerized voice chali gayi lekin meri physics eternal hai.',
    researchFocus: ['Black hole information paradox', 'Quantum gravity and cosmology', 'Hawking radiation detection'],
    timeline: [
      { year: '1942', title: 'Janam', description: 'Oxford mein Galileo ki death anniversary pe paida hua. Coincidence ya destiny?', category: 'birth', icon: '👶' },
      { year: '1962', title: 'Oxford Degree', description: 'Physics mein BA. Interview mein kehta tha "it was very easy" — genius level.', category: 'education', icon: '🎓' },
      { year: '1963', title: 'ALS Diagnosis', description: '21 saal ki umar mein motor neuron disease. Doctors ne 2 saal diye. 55 saal aur jiya!', category: 'personal', icon: '🏥' },
      { year: '1970', title: 'Singularity Theorems', description: 'Penrose ke saath prove kiya — Big Bang mein singularity inevitable thi.', category: 'discovery', icon: '💥' },
      { year: '1974', title: 'Hawking Radiation', description: 'Black holes radiation emit karte hain! Quantum mechanics + gravity ka revolutionary merger.', category: 'discovery', icon: '🕳️' },
      { year: '1979', title: 'Lucasian Professor', description: 'Newton wali chair mili — Cambridge ka most prestigious position.', category: 'award', icon: '🎓' },
      { year: '1988', title: 'A Brief History of Time', description: '10 million copies biki. Physics ko popular banaya — har ghar mein science pahunchi.', category: 'discovery', icon: '📖' },
      { year: '2018', title: 'Departure', description: 'Cambridge mein 76 saal ki umar mein — Einstein ke birthday pe (14 March). Westminster Abbey mein Newton ke paas dafnaya gaya.', category: 'legacy', icon: '🕊️' },
      { year: '2019', title: 'Black Hole Photo', description: 'EHT ne M87* ki photo li — Hawking ki theoretical predictions visually confirm hui.', category: 'posthumous', icon: '📸' },
      { year: '2026', title: 'Information Paradox', description: 'AI quantum gravity models test kar raha hai — Hawking radiation detect karne ki koshish. Information paradox physics ka biggest open question.', category: 'ai2026', icon: '🤖' },
    ],
    quickStats: [
      { label: 'Lucasian Chair', value: '30 yrs', icon: '🎓' },
      { label: 'Book Sales', value: '10M+', icon: '📖' },
      { label: 'Survived ALS', value: '55 yrs', icon: '💪' },
      { label: 'Lived Years', value: '76', icon: '🕊️' },
    ],
  },

  /* ─────────────────── FEYNMAN ─────────────────── */
  feynman: {
    id: 'feynman',
    fullName: 'Richard Phillips Feynman',
    born: '11 May 1918, Queens, New York, USA',
    died: '15 February 1988, Los Angeles, California, USA',
    nationality: 'American',
    icon: '📊',
    color: 'var(--green)',
    dimColor: 'var(--gdim)',
    tagline: 'Physics ka rockstar — Feynman Diagrams aur quantum electrodynamics ka genius',
    education: ['MIT — BS in Physics (1939)', 'Princeton University — PhD (1942)'],
    earlyLife: 'Feynman Queens, New York mein bada hua. Chhote mein radio repair karta tha — neighborhood mein famous tha. MIT mein physics padhi, Princeton mein PhD ki. Manhattan Project mein 24 saal ki umar mein contribute kiya — Los Alamos mein safes crack karta tha mazaak ke liye! Teaching ka passion tha — Caltech mein legendary professor bana. Bongo drums bajata tha, art karta tha, locks pick karta tha — physics ka most colorful character.',
    majorDiscoveries: [
      { name: 'Quantum Electrodynamics (QED)', year: '1948', description: 'Light aur matter ke interaction ki most precise theory. Predictions 10 decimal places tak accurate hain — physics ki sabse precise theory.', equation: 'α = e²/(4πε₀ℏc) ≈ 1/137' },
      { name: 'Feynman Diagrams', year: '1948', description: 'Particle interactions ko simple pictures mein draw kiya — complex math ko visual banaya. Aaj har particle physicist use karta hai.', equation: 'Pictorial representation of particle interactions' },
      { name: 'Path Integral Formulation', year: '1948', description: 'Quantum mechanics ka naya formulation — particle SAB possible paths simultaneously leta hai. Sum over histories.', equation: 'K(b,a) = ∫ e^(iS[x(t)]/ℏ) Dx(t)' },
      { name: 'Parton Model', year: '1969', description: 'Protons aur neutrons ke andar quarks discover karne ka theoretical framework.', equation: 'Deep inelastic scattering cross-sections' },
    ],
    awards: [
      { name: 'Nobel Prize in Physics', year: '1965', details: 'QED ke liye — Schwinger aur Tomonaga ke saath share kiya.' },
      { name: 'Oersted Medal', year: '1972', details: 'Physics teaching mein excellence — Feynman Lectures legendary hain.' },
      { name: 'National Medal of Science', year: '1979', details: 'USA ka highest science honor.' },
    ],
    keyEquations: [
      { name: 'Path Integral', formula: '⟨b|a⟩ = ∫ e^(iS/ℏ) Dx', meaning: 'Quantum amplitude = sum over all possible paths — quantum mechanics ka deepest formulation' },
      { name: 'Fine Structure Constant', formula: 'α ≈ 1/137.036', meaning: 'Electromagnetic coupling — QED ki central constant. "One of the greatest damn mysteries of physics."' },
    ],
    famousQuotes: [
      { quote: 'If you think you understand quantum mechanics, you don\'t understand quantum mechanics.', context: 'Quantum weirdness ke baare mein — even Feynman puzzled tha.' },
      { quote: 'What I cannot create, I do not understand.', context: 'Blackboard pe last words — first-principles thinking.' },
      { quote: 'The first principle is that you must not fool yourself — and you are the easiest person to fool.', context: 'Scientific integrity — Cargo Cult Science lecture se.' },
    ],
    personalLife: 'First wife Arline se bahut pyaar tha — tuberculosis se 1945 mein guzar gayi. Manhattan Project mein the — atomic bomb banaya lekin deeply conflicted tha. Caltech mein 1950-88 tak padhaaya — "Feynman Lectures on Physics" duniya ki best physics textbook. Bongo drums, safe-cracking, strip clubs, pranks — life full of adventures. 1986 mein Challenger disaster investigation mein O-ring demonstration diya — ice water mein rubber daala aur problem turant clear. Cancer se 1988 mein guzar gaye — last words: "I\'d hate to die twice. It\'s so boring."',
    legacy: 'Feynman Diagrams particle physics ka visual language ban gaye — har textbook mein hain. QED sabse precise theory hai — 10 decimal accuracy. Path integrals quantum field theory ka foundation hain. Feynman Lectures free online hain — aaj bhi students ki bible. Nanotechnology predict kiya 1959 mein ("There\'s Plenty of Room at the Bottom"). Quantum computing ka concept 1981 mein propose kiya — 2026 mein reality ban raha hai.',
    aiPersonality: [
      '📊 Visual thinker — complex physics ko diagrams aur pictures mein samjhata hai',
      '🎭 Playful genius — serious science ko fun banata hai',
      '🥁 First-principles — ratta nahi, roots se samjho',
      '🔍 Deeply curious — "I don\'t know, let\'s find out!" attitude',
    ],
    appTools: [],
    returnStory: 'Main Richard Feynman — QED, path integrals, Feynman Diagrams — physics ko fun banaya. "If you think you understand quantum mechanics, you don\'t understand quantum mechanics." 2026 mein quantum computers real hain — mera 1981 ka prediction sach hua! AI Feynman Diagrams automatically generate kar raha hai. Physics abhi bhi mazedaar hai!',
    researchFocus: ['Quantum computing and simulation', 'QED precision tests', 'Nanotechnology'],
    timeline: [
      { year: '1918', title: 'Janam', description: 'Queens, New York mein paida hua. Chhote mein radios repair karta tha.', category: 'birth', icon: '👶' },
      { year: '1939', title: 'MIT Graduation', description: 'Physics mein BS — senior thesis already publication quality. Princeton PhD ke liye gaya.', category: 'education', icon: '🎓' },
      { year: '1942', title: 'Manhattan Project', description: '24 saal ki umar mein Los Alamos mein. Safes crack karta tha hobby mein!', category: 'personal', icon: '💣' },
      { year: '1948', title: 'QED + Feynman Diagrams', description: 'Quantum Electrodynamics develop ki aur particles ka visual language invent kiya. Revolutionary.', category: 'discovery', icon: '📊' },
      { year: '1965', title: 'Nobel Prize', description: 'Physics ka Nobel Prize — QED ke liye. Schwinger aur Tomonaga ke saath.', category: 'award', icon: '🏆' },
      { year: '1981', title: 'Quantum Computing Proposal', description: '"Simulating Physics with Computers" — quantum computers ka concept pehli baar propose kiya.', category: 'discovery', icon: '💻' },
      { year: '1986', title: 'Challenger Investigation', description: 'O-ring ko ice water mein daala — problem turant clear. "For a successful technology, reality must take precedence over PR."', category: 'personal', icon: '🚀' },
      { year: '1988', title: 'Departure', description: 'Cancer se 69 saal ki umar mein. Last words: "I\'d hate to die twice. It\'s so boring."', category: 'legacy', icon: '🕊️' },
      { year: '2020s', title: 'Quantum Computing Reality', description: 'Google, IBM quantum computers — Feynman ka 1981 ka prediction sach ho raha hai.', category: 'modern', icon: '💻' },
      { year: '2026', title: 'Feynman\'s Legacy', description: 'Quantum computers commercial use mein aa rahe hain. Feynman Lectures free online. QED aaj bhi most precise theory.', category: 'ai2026', icon: '🤖' },
    ],
    quickStats: [
      { label: 'Nobel Prize', value: '1965', icon: '🏆' },
      { label: 'QED Accuracy', value: '10 decimals', icon: '🎯' },
      { label: 'Feynman Lectures', value: '3 vols', icon: '📚' },
      { label: 'Lived Years', value: '69', icon: '🕊️' },
    ],
  },

  /* ─────────────────── PLANCK ─────────────────── */
  planck: {
    id: 'planck',
    fullName: 'Max Karl Ernst Ludwig Planck',
    born: '23 April 1858, Kiel, Duchy of Holstein, Germany',
    died: '4 October 1947, Göttingen, Germany',
    nationality: 'German',
    icon: '📦',
    color: 'var(--amber)',
    dimColor: 'var(--adim)',
    tagline: 'Quantum theory ka father — jisne energy ko packets mein todha',
    education: ['University of Munich — PhD (1879)', 'University of Berlin — Professor (1889-1928)'],
    earlyLife: 'Planck conservative German academic family se tha. Munich mein physics padhi — professor ne kaha "physics mein sab kuch discover ho chuka hai, mat jao." Planck gaya anyway. Thermodynamics mein PhD ki. Black body radiation problem solve karne mein lagaa — classical physics fail ho rahi thi. "Act of desperation" mein energy ko discrete packets (quanta) mein todha — quantum revolution shuru ho gayi.',
    majorDiscoveries: [
      { name: 'Quantum Theory / Planck\'s Constant', year: '1900', description: 'Energy continuous nahi hai — discrete packets (quanta) mein aati hai. E = hf — physics ka sabse revolutionary idea.', equation: 'E = hf (h = 6.626 × 10⁻³⁴ J·s)' },
      { name: 'Planck\'s Radiation Law', year: '1900', description: 'Black body radiation ka exact formula — ultraviolet catastrophe solve kiya.', equation: 'B(ν,T) = (2hν³/c²) × 1/(e^(hν/kT) - 1)' },
      { name: 'Planck Units', year: '1899', description: 'Natural units jo sirf fundamental constants se bani hain — Planck length, time, mass, temperature.', equation: 'ℓ_P = √(ℏG/c³) ≈ 1.6 × 10⁻³⁵ m' },
    ],
    awards: [
      { name: 'Nobel Prize in Physics', year: '1918', details: 'Quantum theory ke liye — "energy quanta ki discovery."' },
      { name: 'Max Planck Medal', year: '1929', details: 'Apne naam ki medal ka pehla recipient — German Physical Society se.' },
      { name: 'Max Planck Society', year: '1948', details: 'Germany ki premier research society unke naam pe — 80+ research institutes.' },
    ],
    keyEquations: [
      { name: 'Planck-Einstein Relation', formula: 'E = hf', meaning: 'Energy = Planck constant × frequency — quantum mechanics ka janam yahi se hua' },
      { name: 'Planck Length', formula: 'ℓ_P = √(ℏG/c³)', meaning: 'Universe ki smallest meaningful length — quantum gravity ka scale' },
    ],
    famousQuotes: [
      { quote: 'Science advances one funeral at a time.', context: 'Old scientists naye ideas accept nahi karte — next generation ko wait karna padta hai.' },
      { quote: 'An important scientific innovation rarely makes its way rapidly. It does not grow and develop through being accepted, but because its opponents gradually die out.', context: 'Quantum theory ke initial resistance ke baare mein.' },
    ],
    personalLife: 'Planck ki personal life tragedies se bhari thi. First wife 1909 mein guzri. Bada beta WWI mein maara gaya. Doosra beta Erwin ko Nazis ne 1945 mein execute kiya (Hitler assassination plot mein involvement). House bombing mein destroy hua — sab research notes kho gaye. In sab ke baawajud science karta raha. Deeply conservative tha — quantum theory khud usse uncomfortable karti thi!',
    legacy: 'Planck ne modern physics shuru ki — quantum theory ke bina: no transistors, no lasers, no computers, no smartphones. h = 6.626 × 10⁻³⁴ — yeh constant duniya ki technology ka foundation hai. Max Planck Society Germany ki sabse badi research organization hai. Planck units quantum gravity research mein fundamental hain. Einstein, Bohr, Heisenberg — sab Planck ki quantum theory ke children hain.',
    aiPersonality: ['📦 Quantization expert — continuous ko discrete mein todna', '🎵 Conservative revolutionary — reluctantly duniya badal di', '📏 Precision-focused — exact measurements aur constants', '🙏 Philosophical — science aur religion ka connection dekhta hai'],
    appTools: [],
    returnStory: 'Main Max Planck — 1900 mein energy ko quanta mein todha tha. Professor ne kaha tha physics mein sab ho chuka — galat tha! Mera h = 6.626 × 10⁻³⁴ har smartphone, computer, laser mein hai. 2026 mein quantum computers Planck scale pe kaam kar rahe hain — mera "act of desperation" duniya ki technology ban gayi.',
    researchFocus: ['Planck-scale physics', 'Quantum foundations', 'Black body radiation precision'],
    timeline: [
      { year: '1858', title: 'Janam', description: 'Kiel, Germany mein academic family mein paida hua.', category: 'birth', icon: '👶' },
      { year: '1879', title: 'PhD', description: 'Munich se PhD — thermodynamics pe. Professor ne kaha physics khatam hai — Planck ne prove kiya galat.', category: 'education', icon: '🎓' },
      { year: '1900', title: 'Quantum Theory!', description: 'E = hf — energy discrete packets mein aati hai. "Act of desperation" se physics revolutionize ho gayi.', category: 'discovery', icon: '💥' },
      { year: '1918', title: 'Nobel Prize', description: 'Quantum theory ke liye Nobel Prize — "discovery of energy quanta."', category: 'award', icon: '🏆' },
      { year: '1944', title: 'Son Erwin Executed', description: 'Nazis ne bete Erwin ko execute kiya — Hitler assassination plot mein involvement. Deepest personal tragedy.', category: 'personal', icon: '💔' },
      { year: '1947', title: 'Departure', description: 'Göttingen mein 89 saal ki umar mein. Tragedies se bhara life lekin physics ka foundation rakha.', category: 'legacy', icon: '🕊️' },
      { year: '2026', title: 'Quantum Era', description: 'Quantum computers, lasers, semiconductors — sab E = hf ka result. Planck constant har modern technology mein hai.', category: 'ai2026', icon: '🤖' },
    ],
    quickStats: [
      { label: 'Nobel Prize', value: '1918', icon: '🏆' },
      { label: 'h constant', value: '6.626e-34', icon: '📦' },
      { label: 'Research Institutes', value: '80+', icon: '🏛️' },
      { label: 'Lived Years', value: '89', icon: '🕊️' },
    ],
  },

  /* ─────────────────── BOHR ─────────────────── */
  bohr: {
    id: 'bohr',
    fullName: 'Niels Henrik David Bohr',
    born: '7 October 1885, Copenhagen, Denmark',
    died: '18 November 1962, Copenhagen, Denmark',
    nationality: 'Danish',
    icon: '⚛️',
    color: 'var(--teal)',
    dimColor: 'var(--tdim)',
    tagline: 'Atomic model ka architect — quantum mechanics ko Copenhagen mein define kiya',
    education: ['University of Copenhagen — PhD (1911)', 'University of Manchester — Postdoc with Rutherford (1912)'],
    earlyLife: 'Bohr Copenhagen mein ek professor ki family mein paida hua. Footballer bhi tha — Danish national team se almost khela! PhD ke baad Rutherford ke saath Manchester gaya — wahi pe atomic model pe kaam shuru hua. Rutherford ka nuclear model unstable tha — classical physics kehti thi electrons spiral karke nucleus mein gir jaayenge. Bohr ne quantum conditions lagaayi — electrons sirf specific orbits mein reh sakte hain.',
    majorDiscoveries: [
      { name: 'Bohr Model of Atom', year: '1913', description: 'Electrons quantized orbits mein ghoomte hain — energy absorb/emit karte hain orbit change karte waqt. Hydrogen spectrum perfectly explain hua.', equation: 'E_n = -13.6 eV / n²' },
      { name: 'Copenhagen Interpretation', year: '1927', description: 'Quantum mechanics ka standard interpretation — measurement se wavefunction collapse hota hai. Einstein se legendary debate.', equation: 'Ψ → |ψ_n⟩ upon measurement' },
      { name: 'Complementarity Principle', year: '1928', description: 'Wave-particle duality — light wave bhi hai aur particle bhi. Dono descriptions complementary hain, contradictory nahi.', equation: 'Wave ↔ Particle (complementary)' },
      { name: 'Liquid Drop Model (Nucleus)', year: '1936', description: 'Atomic nucleus liquid drop ki tarah behave karta hai — nuclear fission explain karne mein crucial role.', equation: 'B(A,Z) = a_V·A - a_S·A^(2/3) - ...' },
    ],
    awards: [
      { name: 'Nobel Prize in Physics', year: '1922', details: 'Atomic structure aur radiation ke investigation ke liye.' },
      { name: 'Order of the Elephant', year: '1947', details: 'Denmark ka highest honor — usually sirf royalty ko milta hai.' },
      { name: 'Atoms for Peace Award', year: '1957', details: 'Peaceful nuclear energy ke liye advocacy.' },
    ],
    keyEquations: [
      { name: 'Bohr Energy Levels', formula: 'E_n = -13.6/n² eV', meaning: 'Hydrogen ke electron energy levels — n = 1, 2, 3...' },
      { name: 'Bohr Radius', formula: 'a₀ = 0.529 Å', meaning: 'Hydrogen ke ground state orbit ka radius' },
    ],
    famousQuotes: [
      { quote: 'Anyone who is not shocked by quantum theory has not understood it.', context: 'Quantum mechanics ki counterintuitive nature ke baare mein.' },
      { quote: 'Prediction is very difficult, especially about the future.', context: 'Danish humor — simple lekin profound.' },
      { quote: 'The opposite of a correct statement is a false statement. But the opposite of a profound truth may well be another profound truth.', context: 'Complementarity principle ka philosophical extension.' },
    ],
    personalLife: 'Bohr Copenhagen mein Niels Bohr Institute banaya — quantum physics ka mecca ban gaya. WWII mein Nazi-occupied Denmark se escape kiya — ek bomb bay mein (almost suffocated). Manhattan Project mein briefly involve tha. Beta Aage Bohr ne bhi Nobel Prize jeeta (1975)! Copenhagen mein Carlsberg beer company ne unhe honorary residence diya — beer pipeline direct house mein! Heisenberg se friendship aur phir falling out — famous "Copenhagen" play isi pe based hai.',
    legacy: 'Bohr Model aaj bhi chemistry textbooks mein pehle padhaya jaata hai. Copenhagen Interpretation quantum mechanics ka standard interpretation hai. Niels Bohr Institute aaj bhi world-class research center hai. Element 107 "Bohrium" unke naam pe hai. Complementarity principle philosophy mein bhi use hota hai. Beta Aage ka Nobel — father-son Nobel laureates.',
    aiPersonality: ['⚛️ Atomic structure expert — electrons aur orbits mein sochta hai', '🤔 Philosophical — physics ke deep meaning mein interested', '🤝 Collaborative — institute mein sab ko welcome karta tha', '⚔️ Debater — Einstein ke saath legendary debates'],
    appTools: [],
    returnStory: 'Main Niels Bohr — 1913 mein atomic model diya, 1927 mein Copenhagen Interpretation. Einstein se debate mein "God does not play dice" ka jawaab diya — "Stop telling God what to do!" 2026 mein quantum computing Bohr model ki quantization pe based hai. Meri legacy har atom mein hai.',
    researchFocus: ['Quantum foundations and measurement', 'Atomic structure and spectroscopy', 'Nuclear physics'],
    timeline: [
      { year: '1885', title: 'Janam', description: 'Copenhagen, Denmark mein professor family mein. Football bhi khelta tha — almost national team!', category: 'birth', icon: '👶' },
      { year: '1912', title: 'Rutherford ke Saath', description: 'Manchester mein Rutherford ke lab mein. Nuclear model pe kaam shuru — quantum conditions add ki.', category: 'education', icon: '🏛️' },
      { year: '1913', title: 'Bohr Model', description: 'Quantized orbits wala atomic model publish kiya — hydrogen spectrum perfectly explain hua!', category: 'discovery', icon: '⚛️' },
      { year: '1922', title: 'Nobel Prize', description: 'Atomic structure ke investigation ke liye Nobel Prize.', category: 'award', icon: '🏆' },
      { year: '1927', title: 'Copenhagen Interpretation', description: 'Solvay Conference mein Einstein ke saath legendary debate — quantum mechanics ka meaning define kiya.', category: 'discovery', icon: '🎯' },
      { year: '1943', title: 'Nazi Escape', description: 'Denmark se fishing boat mein Sweden bhaaga, phir UK mein bomb bay mein fly kiya — almost suffocated!', category: 'personal', icon: '🚢' },
      { year: '1962', title: 'Departure', description: 'Copenhagen mein 77 saal ki umar mein. Blackboard pe unfinished drawing tha — Aage ne kaam continue kiya.', category: 'legacy', icon: '🕊️' },
      { year: '2026', title: 'Quantum Legacy', description: 'Bohr model aaj bhi padhaya jaata hai. Quantum computing quantization principle pe based hai. Niels Bohr Institute active hai.', category: 'ai2026', icon: '🤖' },
    ],
    quickStats: [
      { label: 'Nobel Prize', value: '1922', icon: '🏆' },
      { label: 'Element Named', value: 'Bohrium', icon: '⚛️' },
      { label: 'Son\'s Nobel', value: '1975', icon: '👨‍👦' },
      { label: 'Lived Years', value: '77', icon: '🕊️' },
    ],
  },

  /* ─────────────────── MAXWELL ─────────────────── */
  maxwell: {
    id: 'maxwell',
    fullName: 'James Clerk Maxwell',
    born: '13 June 1831, Edinburgh, Scotland',
    died: '5 November 1879, Cambridge, England',
    nationality: 'Scottish/British',
    icon: '🌊',
    color: 'var(--green)',
    dimColor: 'var(--gdim)',
    tagline: 'Electromagnetism ka unifier — light, electricity, magnetism ek hi cheez hai',
    education: ['University of Edinburgh (1847-1850)', 'University of Cambridge, Trinity College — BA (1854)'],
    earlyLife: 'Maxwell Edinburgh ki wealthy Scottish family se tha. 14 saal ki umar mein pehla scientific paper publish kiya — oval curves pe (Edinburgh Royal Society mein). Cambridge mein Second Wrangler aaya (math mein second). Saturn ke rings pe kaam kiya — prove kiya ki solid ring stable nahi ho sakta, particles se bana hoga (Voyager ne 120 saal baad confirm kiya!).',
    majorDiscoveries: [
      { name: 'Maxwell\'s Equations', year: '1865', description: '4 equations jo electricity, magnetism, aur light ko unify karte hain. Light electromagnetic wave hai! Einstein ne kaha "most profound thing in physics."', equation: '∇·E = ρ/ε₀, ∇·B = 0, ∇×E = -∂B/∂t, ∇×B = μ₀J + μ₀ε₀∂E/∂t' },
      { name: 'Electromagnetic Theory of Light', year: '1865', description: 'Light ek electromagnetic wave hai — speed of light electromagnetic constants se calculate hoti hai.', equation: 'c = 1/√(μ₀ε₀)' },
      { name: 'Maxwell-Boltzmann Distribution', year: '1860', description: 'Gas molecules ki speed distribution — statistical mechanics ka foundation.', equation: 'f(v) = 4π(m/2πkT)^(3/2) × v² × e^(-mv²/2kT)' },
      { name: 'Color Photography', year: '1861', description: 'Duniya ki pehli color photograph — three-color process demonstrate kiya (tartan ribbon).', equation: 'RGB color model foundation' },
    ],
    awards: [
      { name: 'Adams Prize', year: '1857', details: 'Saturn ke rings pe essay — proved rings must be made of particles.' },
      { name: 'Rumford Medal', year: '1860', details: 'Royal Society se — color vision research ke liye.' },
      { name: 'First Cavendish Professor', year: '1871', details: 'Cambridge ki prestigious Cavendish Laboratory ka pehla professor.' },
    ],
    keyEquations: [
      { name: 'Maxwell\'s Equations', formula: '∇×B = μ₀(J + ε₀∂E/∂t)', meaning: 'Electricity aur magnetism unified — changing E creates B, changing B creates E → light!' },
      { name: 'Speed of Light', formula: 'c = 1/√(μ₀ε₀)', meaning: 'Light ki speed purely electromagnetic constants se — light IS an EM wave' },
    ],
    famousQuotes: [
      { quote: 'We can scarcely avoid the conclusion that light consists in the transverse undulations of the same medium which is the cause of electric and magnetic phenomena.', context: 'Light = electromagnetic wave ki historic announcement.' },
    ],
    personalLife: 'Maxwell bahut shy tha lekin brilliant. Katherine Dewar se shaadi ki — saath mein experiments karte the. 48 saal ki umar mein abdominal cancer se guzar gaya — bahut jaldi. Agar zyada jita toh relativity shayad Maxwell discover karta. Einstein ne desk pe Maxwell, Newton, aur Faraday ki photos rakhi thi. Deeply religious tha — science aur faith compatible maanta tha.',
    legacy: 'Maxwell\'s Equations se: radio, TV, WiFi, mobile phones, radar, microwave ovens, satellite communication — sab possible hua. Einstein ne kaha Maxwell ka kaam "most profound and the most fruitful that physics has experienced since the time of Newton." Special Relativity Maxwell\'s Equations ki symmetry se nikli. Without Maxwell: no modern telecommunications, no internet, no wireless anything.',
    aiPersonality: ['🌊 Electromagnetic vision — fields aur waves mein sochta hai', '📐 Mathematical elegance — complex phenomena ko beautiful equations mein', '🎨 Creative — color photography bhi invent ki', '🤫 Quiet genius — shy lekin profoundly brilliant'],
    appTools: [],
    returnStory: 'Main James Clerk Maxwell — 4 equations se electricity, magnetism, aur light unify kiye. Einstein mujhe Newton ke baad sabse important physicist maanta tha. 2026 mein — WiFi, 5G, satellite internet, fiber optics — sab meri equations ka result hain. Radio se lekar James Webb Space Telescope tak — electromagnetic waves har jagah hain.',
    researchFocus: ['Electromagnetic wave applications', 'Statistical mechanics', 'Unified field foundations'],
    timeline: [
      { year: '1831', title: 'Janam', description: 'Edinburgh, Scotland mein. 14 mein pehla scientific paper!', category: 'birth', icon: '👶' },
      { year: '1857', title: 'Saturn\'s Rings', description: 'Proved rings particles se bane hain — Voyager ne 120 saal baad confirm kiya.', category: 'discovery', icon: '🪐' },
      { year: '1861', title: 'Color Photography', description: 'Duniya ki pehli color photograph demonstrate ki — tartan ribbon.', category: 'discovery', icon: '📸' },
      { year: '1865', title: 'Maxwell\'s Equations', description: '4 equations — electricity + magnetism + light unified. "The most profound thing in physics since Newton."', category: 'discovery', icon: '⚡' },
      { year: '1871', title: 'Cavendish Professor', description: 'Cambridge Cavendish Lab ka pehla professor — legendary lab banaayi.', category: 'award', icon: '🏛️' },
      { year: '1879', title: 'Departure', description: 'Sirf 48 saal ki umar mein cancer se. Bahut jaldi gaya — agar zyada jita toh aur kya discover karta!', category: 'legacy', icon: '🕊️' },
      { year: '2026', title: 'EM Revolution', description: '5G, WiFi 7, satellite internet, JWST — sab Maxwell ki equations pe chalte hain. Duniya ki communication Maxwell ki wajah se hai.', category: 'ai2026', icon: '🤖' },
    ],
    quickStats: [
      { label: 'Equations', value: '4', icon: '📐' },
      { label: 'First Color Photo', value: '1861', icon: '📸' },
      { label: 'Einstein\'s Hero', value: 'Yes', icon: '⭐' },
      { label: 'Lived Years', value: '48', icon: '🕊️' },
    ],
  },

  /* ─────────────────── RAMAN ─────────────────── */
  raman: {
    id: 'raman',
    fullName: 'Sir Chandrasekhara Venkata Raman',
    born: '7 November 1888, Tiruchirappalli, Madras Presidency, British India',
    died: '21 November 1970, Bangalore, India',
    nationality: 'Indian',
    icon: '💎',
    color: 'var(--purple)',
    dimColor: 'var(--pdim)',
    tagline: 'Raman Effect ka discoverer — India ka pehla Nobel Prize in Science',
    education: ['Presidency College, Madras — BA (1904, age 16!)', 'Presidency College — MA (1907)'],
    earlyLife: 'Raman South Indian Brahmin family se the — baap physics teacher tha. 16 mein BA kiya (first class first + gold medals!), 19 mein MA. Indian Finance Department mein accountant ki job li — government job mein physics research karta tha! Indian Association for the Cultivation of Science (IACS) Kolkata mein lab use karta tha after office hours. 1917 mein university professor bana — full-time research shuru.',
    majorDiscoveries: [
      { name: 'Raman Effect', year: '1928', description: 'Light jab matter se scatter hoti hai toh frequency change hoti hai — molecular structure ka fingerprint. Raman Spectroscopy aaj har lab mein hai.', equation: 'ν_scattered = ν_incident ± ν_molecular' },
      { name: 'Raman Spectroscopy', year: '1928', description: 'Molecules identify karne ka powerful tool — chemistry, biology, materials science mein revolutionary.', equation: 'Stokes: ν₀ - ν_m, Anti-Stokes: ν₀ + ν_m' },
    ],
    awards: [
      { name: 'Nobel Prize in Physics', year: '1930', details: 'Raman Effect ke liye — pehla Asian aur non-white person physics Nobel jeeta (without collaboration with Western scientist).' },
      { name: 'Bharat Ratna', year: '1954', details: 'India ka highest civilian award.' },
      { name: 'Knight Bachelor', year: '1929', details: 'British Crown se knighthood — "Sir" title mila.' },
      { name: 'National Science Day', year: '28 Feb', details: 'India mein 28 February (Raman Effect discovery date) ko National Science Day celebrate hota hai.' },
    ],
    keyEquations: [
      { name: 'Raman Shift', formula: 'Δν = ν₀ - ν_s', meaning: 'Scattered light ki frequency shift = molecular vibration frequency' },
    ],
    famousQuotes: [
      { quote: 'I am the master of my failures. If I never fail, how will I ever learn?', context: 'Scientific research mein failure se seekhne ka attitude.' },
      { quote: 'Ask the right questions, and nature will open the doors to her secrets.', context: 'Curiosity-driven research ka philosophy.' },
    ],
    personalLife: 'Raman bahut strict aur demanding the — students se high standards expect karta tha. Indian Institute of Science, Bangalore mein director bana. Raman Research Institute apni savings se 1948 mein banaya. Musical instruments ki physics mein interested tha — veena aur mridangam ki acoustics study ki. Diamond aur gemstones ki optics study ki. 82 saal ki umar mein Bangalore mein guzar gaye — last days Raman Research Institute ke lab mein bithe the.',
    legacy: 'Raman Effect aaj har chemistry, biology, forensics lab mein use hota hai. Pharmaceutical industry mein drug identification. Art forgery detection. Airport security mein explosive detection. Mars rovers Raman spectrometers carry karte hain! National Science Day (28 Feb) India mein celebrate hota hai. India ka pehla independent scientific Nobel — colonial era mein Indian scientist ki global achievement.',
    aiPersonality: ['💎 Spectroscopy expert — light-matter interaction mein sochta hai', '🇮🇳 Indian science ka pioneer — colonial era mein global impact', '🎵 Acoustics lover — musical instruments ki physics', '🔬 Experimentalist — theory se zyada lab pe bharosa'],
    appTools: [],
    returnStory: 'Main C.V. Raman — 1928 mein ek saadharan setup se Raman Effect discover kiya — expensive equipment nahi tha, sirf curiosity thi. Nobel Prize jeeta 1930 mein — India ka pehla science Nobel. 2026 mein Raman Spectroscopy har jagah hai — Mars pe bhi mere spectrometers kaam kar rahe hain!',
    researchFocus: ['Raman spectroscopy applications', 'Light-matter interactions', 'Indian scientific heritage'],
    timeline: [
      { year: '1888', title: 'Janam', description: 'Tiruchirappalli, Tamil Nadu mein. Baap physics aur math teacher tha.', category: 'birth', icon: '👶' },
      { year: '1904', title: 'BA at 16!', description: 'Presidency College se 16 saal mein BA — first class first + gold medals.', category: 'education', icon: '🎓' },
      { year: '1907', title: 'Government Job + Research', description: 'Finance Department mein accountant — office ke baad IACS mein physics research. Jugaad scientist!', category: 'personal', icon: '🏢' },
      { year: '1928', title: 'Raman Effect', description: '28 February — light scattering mein frequency change discover kiya. Simple equipment, brilliant mind.', category: 'discovery', icon: '💎' },
      { year: '1930', title: 'Nobel Prize', description: 'Physics ka Nobel Prize — pehla Asian, pehla non-white solo winner. India proud!', category: 'award', icon: '🏆' },
      { year: '1948', title: 'Raman Research Institute', description: 'Apni savings se Bangalore mein research institute banaya — aaj bhi active hai.', category: 'personal', icon: '🏛️' },
      { year: '1954', title: 'Bharat Ratna', description: 'India ka highest civilian award mila.', category: 'award', icon: '🏅' },
      { year: '1970', title: 'Departure', description: 'Bangalore mein 82 saal ki umar mein. Lab mein last days bithe.', category: 'legacy', icon: '🕊️' },
      { year: '2021', title: 'Mars pe Raman', description: 'NASA Perseverance rover Mars pe Raman spectrometer le gaya — alien minerals identify karne.', category: 'modern', icon: '🔴' },
      { year: '2026', title: 'Spectroscopy Revolution', description: 'AI-powered Raman spectroscopy — instant material identification. Har lab, har hospital, har airport mein. Mars pe bhi.', category: 'ai2026', icon: '🤖' },
    ],
    quickStats: [
      { label: 'Nobel Prize', value: '1930', icon: '🏆' },
      { label: 'Bharat Ratna', value: '1954', icon: '🏅' },
      { label: 'BA Age', value: '16', icon: '🎓' },
      { label: 'Sci Day India', value: '28 Feb', icon: '🇮🇳' },
    ],
  },

  /* ─────────────────── FARADAY ─────────────────── */
  faraday: {
    id: 'faraday',
    fullName: 'Michael Faraday',
    born: '22 September 1791, Newington Butts, London, England',
    died: '25 August 1867, Hampton Court, London, England',
    nationality: 'English',
    icon: '🧲',
    color: 'var(--coral)',
    dimColor: 'var(--cdim)',
    tagline: 'Self-taught genius — electromagnetic induction ka discoverer, motors ka inventor',
    education: ['No formal education — bookbinder\'s apprentice', 'Self-taught from books he bound', 'Royal Institution — Humphry Davy\'s assistant (1813)'],
    earlyLife: 'Faraday gareebi mein paida hua — school barely gaya. 14 saal ki umar mein bookbinder ka apprentice bana — books bind karte karte science ki books padhne laga. Encyclopaedia Britannica ka electricity article padha — fascinated ho gaya. Humphry Davy ke Royal Institution lectures attend kiye, detailed notes liye, beautifully bound karke Davy ko bheje. Davy ne lab assistant rakh liya — history ka best career move!',
    majorDiscoveries: [
      { name: 'Electromagnetic Induction', year: '1831', description: 'Moving magnet se electric current generate hota hai — electric generators, transformers, power plants ka foundation.', equation: 'EMF = -dΦ/dt (Faraday\'s Law)' },
      { name: 'Laws of Electrolysis', year: '1834', description: 'Electric current se chemical decomposition ke exact laws — electrochemistry ka foundation.', equation: 'm = (Q/F)(M/z)' },
      { name: 'Electric Motor (first)', year: '1821', description: 'Electromagnetic rotation demonstrate kiya — duniya ki pehli electric motor!', equation: 'F = qv × B (Lorentz force)' },
      { name: 'Faraday Cage', year: '1836', description: 'Metal cage electromagnetic fields block karta hai — shielding ka concept.', equation: 'E_inside = 0 (for external fields)' },
      { name: 'Benzene Discovery', year: '1825', description: 'Organic chemistry ka fundamental compound — benzene isolate kiya gas se.', equation: 'C₆H₆' },
    ],
    awards: [
      { name: 'Royal Medal', year: '1835, 1846', details: 'Royal Society ka top prize — do baar mila!' },
      { name: 'Farad Unit', year: 'Posthumous', details: 'Capacitance ki SI unit "Farad" (F) unke naam pe hai.' },
      { name: 'Refused Knighthood', year: '1857', details: 'Knighthood aur Royal Society presidency dono refuse kiye — humble raha!' },
    ],
    keyEquations: [
      { name: 'Faraday\'s Law', formula: 'EMF = -N × dΦ/dt', meaning: 'Induced voltage = rate of change of magnetic flux — generators ka principle' },
      { name: 'Faraday\'s Electrolysis', formula: 'm = QM/(Fz)', meaning: 'Deposited mass = charge × molar mass / (Faraday constant × valence)' },
    ],
    famousQuotes: [
      { quote: 'Nothing is too wonderful to be true, if it be consistent with the laws of nature.', context: 'Scientific discovery ke baare mein — nature mein unlimited wonders hain.' },
      { quote: 'The important thing is to know how to take all things quietly.', context: 'Lab mein patience aur perseverance — Faraday ka approach.' },
    ],
    personalLife: 'Faraday ne formal education nahi li — sab self-taught. Royal Institution mein 1813 se 1862 tak kaam kiya — 50 saal! Humphry Davy pehle mentor tha, phir jealous ho gaya. Faraday deeply religious tha (Sandemanian church). Bahut humble — knighthood refuse kiya, Royal Society presidency refuse kiya. Memory loss aur health issues se early retirement. Queen Victoria ne Hampton Court mein ghar diya — wahi pe 75 saal ki umar mein guzar gaya.',
    legacy: 'Faraday ke bina modern civilization nahi hoti — electric power generation, motors, transformers sab electromagnetic induction pe based hain. Har power plant Faraday\'s Law use karta hai. Capacitance ki unit "Farad" hai. Maxwell ne Faraday ke experiments ko mathematical form diya — Maxwell\'s Equations bani. Einstein ke desk pe Faraday ki photo thi. Self-taught bookbinder se duniya ka greatest experimentalist — ultimate inspiration.',
    aiPersonality: ['🧲 Electromagnetic intuition — fields aur forces ko feel karta hai', '🔬 Supreme experimentalist — theory se zyada hands-on', '📚 Self-taught — formal education nahi, sirf curiosity aur books', '🙏 Humble genius — knighthood refuse kiya'],
    appTools: [],
    returnStory: 'Main Michael Faraday — bookbinder ka apprentice tha, formal education nahi li. Lekin electromagnetic induction discover kiya — ab duniya ki har electricity Faraday\'s Law se generate hoti hai. 2026 mein electric vehicles, wind turbines, hydropower — sab mere induction principle pe hain. Self-taught genius ka proof — curiosity sabse badi degree hai.',
    researchFocus: ['Electromagnetic induction applications', 'Electrochemistry', 'Field theory foundations'],
    timeline: [
      { year: '1791', title: 'Janam', description: 'London mein gareebi mein paida hua. School barely gaya.', category: 'birth', icon: '👶' },
      { year: '1805', title: 'Bookbinder Apprentice', description: '14 saal mein bookbinding seekhi — books bind karte karte science padhi. Self-education shuru!', category: 'education', icon: '📚' },
      { year: '1813', title: 'Royal Institution', description: 'Humphry Davy ka lab assistant bana — beautifully bound lecture notes bheje the. Career ka turning point.', category: 'education', icon: '🏛️' },
      { year: '1821', title: 'Electric Motor', description: 'Electromagnetic rotation demonstrate kiya — duniya ki pehli electric motor concept!', category: 'discovery', icon: '⚡' },
      { year: '1825', title: 'Benzene', description: 'Organic chemistry ka fundamental compound benzene discover kiya.', category: 'discovery', icon: '🧪' },
      { year: '1831', title: 'Electromagnetic Induction', description: 'Moving magnet se current! Generators, transformers, power plants — sab ka foundation.', category: 'discovery', icon: '🧲' },
      { year: '1834', title: 'Electrolysis Laws', description: 'Electric current se chemical decomposition ke exact quantitative laws.', category: 'discovery', icon: '⚗️' },
      { year: '1836', title: 'Faraday Cage', description: 'Metal cage EM fields block karta hai — shielding concept. Aaj planes aur buildings mein use hota hai.', category: 'discovery', icon: '🔲' },
      { year: '1867', title: 'Departure', description: 'Hampton Court mein 75 saal ki umar mein. Bookbinder se duniya ka greatest experimentalist.', category: 'legacy', icon: '🕊️' },
      { year: '2026', title: 'Electrification', description: 'Electric vehicles, wind energy, hydropower — sab Faraday\'s induction. "Farad" har circuit mein hai.', category: 'ai2026', icon: '🤖' },
    ],
    quickStats: [
      { label: 'SI Unit', value: 'Farad (F)', icon: '🧲' },
      { label: 'Self-taught', value: 'Yes', icon: '📚' },
      { label: 'RI Years', value: '50', icon: '🏛️' },
      { label: 'Lived Years', value: '75', icon: '🕊️' },
    ],
  },
};
