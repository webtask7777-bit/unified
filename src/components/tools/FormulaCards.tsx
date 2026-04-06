'use client';

/* ── Formula breakdown for each article ── */

interface FormulaPart {
  sym: string;
  meaning: string;
}

interface FormulaInfo {
  formula: string;
  parts: FormulaPart[];
  matlab: string; // one line "iska matlab" in simple Hindi
}

export const FORMULA_DATA: Record<string, FormulaInfo> = {
  // ── Group 0: Dark Matter ──
  '0-0': {
    formula: 'v(r) = √(GM(r) / r)',
    parts: [
      { sym: 'v(r)', meaning: 'star ki speed distance r pe' },
      { sym: 'G', meaning: 'gravitational constant (6.674×10⁻¹¹)' },
      { sym: 'M(r)', meaning: 'r ke andar total mass' },
      { sym: 'r', meaning: 'center se distance' },
    ],
    matlab: 'Agar sirf visible mass hoti toh v girta — lekin flat rehta hai, matlab extra invisible mass (dark matter) hai',
  },
  '0-1': {
    formula: 'θ = 4GM / (rc²)',
    parts: [
      { sym: 'θ', meaning: 'light kitna mudti hai (bend angle)' },
      { sym: 'G', meaning: 'gravitational constant' },
      { sym: 'M', meaning: 'beech mein jo mass hai (galaxy cluster)' },
      { sym: 'r', meaning: 'light mass ke kitna paas se guzri' },
      { sym: 'c', meaning: 'light ki speed (3×10⁸ m/s)' },
    ],
    matlab: 'Zyada mass = zyada bending. Visible mass se jo bending honi chahiye usse zyada dikh rahi hai = dark matter!',
  },
  '0-2': {
    formula: 'ΔT/T ≈ δρ/ρ × (1/3)',
    parts: [
      { sym: 'ΔT', meaning: 'CMB temperature mein farq' },
      { sym: 'T', meaning: 'average CMB temperature (2.725 K)' },
      { sym: 'δρ', meaning: 'density mein variation' },
      { sym: 'ρ', meaning: 'average density' },
    ],
    matlab: 'Jahan matter zyada packed tha, wahan CMB thoda garam hai. Cold spots batate hain ki dark matter ka structure kahan hai.',
  },
  '0-3': {
    formula: 'M_total = M_visible + M_dark',
    parts: [
      { sym: 'M_total', meaning: 'lensing se measure ki gayi total mass' },
      { sym: 'M_visible', meaning: 'jo matter dikhta hai (gas, stars)' },
      { sym: 'M_dark', meaning: 'invisible mass = dark matter' },
    ],
    matlab: 'Bullet Cluster mein M_visible ruk gayi lekin M_total aage nikal gayi — dark matter seedha guzar gaya!',
  },

  // ── Group 1: Orbital Mechanics ──
  '1-0': {
    formula: 'T² = (4π² / GM) × a³',
    parts: [
      { sym: 'T', meaning: 'orbit complete karne ka time (period)' },
      { sym: 'G', meaning: 'gravitational constant' },
      { sym: 'M', meaning: 'Sun ki mass (1.989×10³⁰ kg)' },
      { sym: 'a', meaning: 'orbit ka semi-major axis (avg distance)' },
      { sym: 'π', meaning: '3.14159...' },
    ],
    matlab: 'Door ka planet slow ghoomega, paas ka fast. Jupiter ka T = 11.86 saal kyunki a = 5.2 AU door hai.',
  },
  '1-1': {
    formula: 'E = ½mv² − GMm/r',
    parts: [
      { sym: 'E', meaning: 'asteroid ki total energy' },
      { sym: '½mv²', meaning: 'kinetic energy (speed se)' },
      { sym: 'GMm/r', meaning: 'gravitational potential energy' },
      { sym: 'm', meaning: 'asteroid ka mass' },
      { sym: 'v', meaning: 'asteroid ki velocity' },
    ],
    matlab: 'E < 0 toh asteroid Earth ke chakkar mein hai, E > 0 toh nikal jayega, E ≈ 0 toh seedha aa raha hai!',
  },
  '1-2': {
    formula: 'Δv = √(GM/r₁) × (√(2r₂/(r₁+r₂)) − 1)',
    parts: [
      { sym: 'Δv', meaning: 'kitni speed badhaani hai (fuel cost)' },
      { sym: 'r₁', meaning: 'Earth ki orbit radius (1 AU)' },
      { sym: 'r₂', meaning: 'Mars ki orbit radius (1.524 AU)' },
      { sym: 'GM', meaning: 'Sun ka gravitational parameter' },
    ],
    matlab: 'Hohmann transfer = sabse kam fuel mein Mars pahunchna. Δv ≈ 3.6 km/s chahiye Earth orbit se.',
  },
  '1-3': {
    formula: 'F⃗ᵢ = Σⱼ≠ᵢ (Gmᵢmⱼ / rᵢⱼ²) × r̂ᵢⱼ',
    parts: [
      { sym: 'F⃗ᵢ', meaning: 'body i pe total force' },
      { sym: 'mᵢ, mⱼ', meaning: 'dono bodies ka mass' },
      { sym: 'rᵢⱼ', meaning: 'dono ke beech distance' },
      { sym: 'Σ', meaning: 'saari doosri bodies ka sum' },
    ],
    matlab: '3 bodies ke liye koi shortcut formula nahi — computer se step-by-step solve karna padta hai. Chaos!',
  },

  // ── Group 2: Relativity ──
  '2-0': {
    formula: "t' = t / √(1 − v²/c²)",
    parts: [
      { sym: "t'", meaning: 'rocket mein bita hua time' },
      { sym: 't', meaning: 'Earth pe bita hua time' },
      { sym: 'v', meaning: 'rocket ki speed' },
      { sym: 'c', meaning: 'light ki speed' },
      { sym: 'v²/c²', meaning: 'speed ratio squared (0.9² = 0.81)' },
    ],
    matlab: 'v = 0.9c pe: t\' = t/√(0.19) = t/0.436. Matlab Earth ka 1 saal = rocket ka 0.436 saal!',
  },
  '2-1': {
    formula: 'Δt = GM / (rc²) × t',
    parts: [
      { sym: 'Δt', meaning: 'time mein farq per day' },
      { sym: 'G', meaning: 'gravitational constant' },
      { sym: 'M', meaning: 'Earth ka mass' },
      { sym: 'r', meaning: 'satellite ki distance from Earth center' },
      { sym: 'c', meaning: 'light speed' },
    ],
    matlab: 'GPS satellite ki clock 38 microsecond/day tez chalti hai. Correct na karo toh position 10 km galat!',
  },
  '2-2': {
    formula: 't_local = t_∞ × √(1 − rₛ/r)',
    parts: [
      { sym: 't_local', meaning: 'black hole ke paas bita hua time' },
      { sym: 't_∞', meaning: 'door se dekha hua time' },
      { sym: 'rₛ', meaning: 'Schwarzschild radius = 2GM/c²' },
      { sym: 'r', meaning: 'black hole center se distance' },
    ],
    matlab: 'Jaise-jaise r → rₛ (event horizon), time almost ruk jaata hai! Interstellar ka Miller planet yahi tha.',
  },
  '2-3': {
    formula: 'Δτ = τ_earth − τ_rocket = t(1 − 1/γ)',
    parts: [
      { sym: 'Δτ', meaning: 'dono twins ke age mein farq' },
      { sym: 'τ_earth', meaning: 'Earth twin ki age (proper time)' },
      { sym: 'τ_rocket', meaning: 'rocket twin ki age' },
      { sym: 'γ', meaning: 'Lorentz factor = 1/√(1−v²/c²)' },
    ],
    matlab: 'Rocket waala chhota rehta hai kyunki uska time slow tha. v=0.99c pe: 7 saal mein sirf 1 saal budha!',
  },

  // ── Group 3: Wormhole ──
  '3-0': {
    formula: 'ds² = −e²ᶲdt² + dr²/(1−b/r) + r²dΩ²',
    parts: [
      { sym: 'ds²', meaning: 'spacetime mein do points ka distance' },
      { sym: 'e²ᶲ', meaning: 'redshift function (time kaise behave karta hai)' },
      { sym: 'b(r)', meaning: 'shape function (wormhole ki shape decide karta hai)' },
      { sym: 'r²dΩ²', meaning: 'sphere ka angular part' },
    ],
    matlab: 'Ye Morris-Thorne metric hai — wormhole ka "blueprint". b(r₀) = r₀ pe throat hai aur 1−b/r > 0 zaroori hai.',
  },
  '3-1': {
    formula: 'ρ + p < 0 (NEC violation)',
    parts: [
      { sym: 'ρ', meaning: 'energy density (matter ki energy per volume)' },
      { sym: 'p', meaning: 'pressure' },
      { sym: 'NEC', meaning: 'Null Energy Condition' },
      { sym: 'ρ + p < 0', meaning: 'negative energy needed!' },
    ],
    matlab: 'Normal matter mein ρ+p > 0 hota hai. Wormhole kholne ke liye "exotic matter" chahiye jisme ρ+p < 0 ho — ye bahut rare hai.',
  },
  '3-2': {
    formula: 'E ≈ mc² × (r_throat / l_Planck)',
    parts: [
      { sym: 'E', meaning: 'total energy required' },
      { sym: 'r_throat', meaning: 'wormhole ka opening size' },
      { sym: 'l_Planck', meaning: '1.6×10⁻³⁵ m (sabse chhoti length)' },
      { sym: 'mc²', meaning: 'Planck energy ≈ 10⁹ joules' },
    ],
    matlab: '1 meter throat ke liye ≈ 10⁴⁴ joules chahiye — Sun 1 second mein sirf 3.8×10²⁶ deta hai. Billions of suns!',
  },
  '3-3': {
    formula: 'Δt_wormhole < Δt_light (outside)',
    parts: [
      { sym: 'Δt_wormhole', meaning: 'wormhole se travel ka time' },
      { sym: 'Δt_light', meaning: 'normal space mein light ka time' },
      { sym: '<', meaning: 'wormhole tez hai light se bhi!' },
    ],
    matlab: 'Agar ek mouth ko fast move karke wapas laao toh time difference ban jaata hai — time machine ban sakti hai (theory mein)!',
  },

  // ── Group 4: Free Energy ──
  '4-0': {
    formula: 'E = mc²',
    parts: [
      { sym: 'E', meaning: 'energy (joules mein)' },
      { sym: 'm', meaning: 'mass (kg mein)' },
      { sym: 'c', meaning: 'light speed = 3×10⁸ m/s' },
      { sym: 'c²', meaning: '= 9×10¹⁶ — bahut bada number!' },
    ],
    matlab: '1 gram = 9×10¹³ joules = 21.5 kilotons TNT = Hiroshima bomb! Thodi si mass = bahut zyada energy.',
  },
  '4-1': {
    formula: '4¹H → ⁴He + 2e⁺ + 2ν + 26.7 MeV',
    parts: [
      { sym: '4¹H', meaning: '4 hydrogen atoms (protons)' },
      { sym: '⁴He', meaning: '1 helium atom bana' },
      { sym: '2e⁺', meaning: '2 positrons nikle' },
      { sym: '2ν', meaning: '2 neutrinos nikle' },
      { sym: '26.7 MeV', meaning: 'energy release (per reaction)' },
    ],
    matlab: 'Sun har second 600 million ton hydrogen ko helium mein badalta hai. Mass lost = 4.3 million ton/sec = pure energy!',
  },
  '4-2': {
    formula: 'η_fusion ≈ 0.7% vs η_fission ≈ 0.1%',
    parts: [
      { sym: 'η_fusion', meaning: 'fusion mein mass→energy conversion rate' },
      { sym: 'η_fission', meaning: 'fission mein mass→energy conversion rate' },
      { sym: '0.7%', meaning: 'har 1kg hydrogen se 7g energy banta hai' },
      { sym: '0.1%', meaning: 'har 1kg uranium se 1g energy banta hai' },
    ],
    matlab: 'Fusion 7× zyada efficient hai fission se — aur waste bhi kam. Bas 100 million °C temperature chahiye!',
  },
  '4-3': {
    formula: 'E₀ = ½ ℏω',
    parts: [
      { sym: 'E₀', meaning: 'zero-point energy (minimum possible energy)' },
      { sym: 'ℏ', meaning: 'reduced Planck constant (1.055×10⁻³⁴ J·s)' },
      { sym: 'ω', meaning: 'angular frequency of oscillation' },
    ],
    matlab: 'Vacuum bhi bilkul khaali nahi hai — quantum physics kehta hai har jagah thodi energy hamesha rehti hai. Harvest karna mushkil hai.',
  },

  // ── Group 5: Unified Field ──
  '5-0': {
    formula: 'Gμν + Λgμν = (8πG/c⁴) Tμν',
    parts: [
      { sym: 'Gμν', meaning: 'spacetime ka curvature (geometry)' },
      { sym: 'Λgμν', meaning: 'cosmological constant (dark energy)' },
      { sym: 'Tμν', meaning: 'matter-energy content' },
      { sym: '8πG/c⁴', meaning: 'coupling constant' },
    ],
    matlab: 'Left side = space kaise muda hai. Right side = kitna matter hai. "Matter tells space how to curve, space tells matter how to move."',
  },
  '5-1': {
    formula: 'G_N / G_EM ≈ 10⁻³⁶',
    parts: [
      { sym: 'G_N', meaning: 'gravitational force strength' },
      { sym: 'G_EM', meaning: 'electromagnetic force strength' },
      { sym: '10⁻³⁶', meaning: 'gravity 10³⁶ times weak hai!' },
    ],
    matlab: 'Ek chhota magnet poori Earth ki gravity beat kar deta hai! Kya gravity extra dimensions mein "leak" karti hai? Hierarchy Problem.',
  },
  '5-2': {
    formula: 'τ(n) = Σ_{d|n} d¹¹ (simplified)',
    parts: [
      { sym: 'τ(n)', meaning: 'Ramanujan tau function' },
      { sym: 'n', meaning: 'natural number' },
      { sym: 'Σ_{d|n}', meaning: 'n ke divisors ka sum' },
      { sym: 'd¹¹', meaning: 'divisor ki 11th power' },
    ],
    matlab: 'Ramanujan ke formulas 100 saal baad string theory mein fit ho rahe hain — 26 dimensions ki math mein! Genius.',
  },
  '5-3': {
    formula: '∂L/∂q − d/dt(∂L/∂q̇) = 0',
    parts: [
      { sym: 'L', meaning: 'Lagrangian (KE − PE)' },
      { sym: 'q', meaning: 'generalized coordinate (position)' },
      { sym: 'q̇', meaning: 'velocity (dq/dt)' },
      { sym: '∂L/∂q', meaning: 'force term' },
    ],
    matlab: 'Noether: agar L time mein change nahi hota → energy conserve. Space mein change nahi → momentum conserve. Symmetry = law!',
  },

  // ── Group 6: Black Holes ──
  '6-0': {
    formula: 'T_H = ℏc³ / (8πGMk_B)',
    parts: [
      { sym: 'T_H', meaning: 'Hawking temperature' },
      { sym: 'ℏ', meaning: 'Planck constant (quantum)' },
      { sym: 'c', meaning: 'light speed' },
      { sym: 'M', meaning: 'black hole ki mass' },
      { sym: 'k_B', meaning: 'Boltzmann constant' },
    ],
    matlab: 'Bada BH = thanda (T ∝ 1/M). Sun jitna BH ka T = 0.00000006 K — bahut thanda! Chhota BH garam hota hai aur tez evaporate.',
  },
  '6-1': {
    formula: 'S_BH = k_B × A / (4 l_P²)',
    parts: [
      { sym: 'S_BH', meaning: 'black hole ki entropy (disorder)' },
      { sym: 'A', meaning: 'event horizon ka surface area' },
      { sym: 'l_P', meaning: 'Planck length (1.6×10⁻³⁵ m)' },
      { sym: 'k_B', meaning: 'Boltzmann constant' },
    ],
    matlab: 'Information area mein store hoti hai, volume mein nahi! Ye "holographic principle" hai — universe ek hologram ho sakta hai!',
  },
  '6-2': {
    formula: 'M_BH ∝ σ⁴ (M-sigma relation)',
    parts: [
      { sym: 'M_BH', meaning: 'supermassive BH ki mass' },
      { sym: 'σ', meaning: 'galaxy ke stars ki velocity dispersion' },
      { sym: '∝', meaning: 'proportional hai' },
      { sym: 'σ⁴', meaning: '4th power — tight correlation!' },
    ],
    matlab: 'Galaxy ke stars ki speed se BH ka mass predict ho jaata hai! BH aur galaxy saath mein evolve hote hain.',
  },
  '6-3': {
    formula: 'dS_BH ≥ 0, S = k_B ln W',
    parts: [
      { sym: 'dS_BH ≥ 0', meaning: 'entropy kabhi kam nahi hoti (2nd law)' },
      { sym: 'S', meaning: 'entropy' },
      { sym: 'W', meaning: 'microstates ki number' },
      { sym: 'k_B ln W', meaning: 'Boltzmann entropy formula' },
    ],
    matlab: 'Black hole thermodynamics = normal thermodynamics! Temperature, entropy, sab same laws follow karte hain.',
  },

  // ── Group 7: Ramanujan Math ──
  '7-0': {
    formula: 'p(n) ~ (1/4n√3) × e^(π√(2n/3))',
    parts: [
      { sym: 'p(n)', meaning: 'n ko kitne tarike se partition kar sakte hain' },
      { sym: 'e^(π√(2n/3))', meaning: 'exponentially badhta hai' },
      { sym: '~', meaning: 'approximately equal (n bade ke liye)' },
      { sym: 'π, √', meaning: 'pi aur square root — number theory mein kahan se aaye?!' },
    ],
    matlab: 'p(100) = 190,569,292,356. Itna bada! Hardy-Ramanujan formula ye estimate 99.99% sahi deta hai. Magic!',
  },
  '7-1': {
    formula: 'f(q) = Σ_{n≥0} qⁿ² / (−q;q)²ₙ',
    parts: [
      { sym: 'f(q)', meaning: 'mock theta function' },
      { sym: 'q', meaning: 'complex variable (|q|<1)' },
      { sym: 'qⁿ²', meaning: 'n square powers of q' },
      { sym: '(−q;q)ₙ', meaning: 'q-Pochhammer symbol (product)' },
    ],
    matlab: 'Ramanujan ne deathbed pe 17 mock theta functions likhe — aaj ye black hole entropy aur string theory mein exact fit hote hain!',
  },
  '7-2': {
    formula: 'ζ(−1) = −1/12 → 1+2+3+... = −1/12',
    parts: [
      { sym: 'ζ(s)', meaning: 'Riemann zeta function' },
      { sym: 'ζ(−1)', meaning: 'analytic continuation pe value' },
      { sym: '−1/12', meaning: 'regularized sum' },
      { sym: '1+2+3+...', meaning: 'infinite sum (normally ∞)' },
    ],
    matlab: 'Ye "cheating" nahi hai — string theory mein 26 dimensions tabhi aate hain jab ye sum = −1/12 use karein! Physics mein real hai.',
  },
  '7-3': {
    formula: 'Fₙ = Fₙ₋₁ + Fₙ₋₂ (Fibonacci)',
    parts: [
      { sym: 'Fₙ', meaning: 'nth Fibonacci number' },
      { sym: 'F₁ = 1, F₂ = 1', meaning: 'starting values' },
      { sym: 'sequence', meaning: '1, 1, 2, 3, 5, 8, 13, 21, 34...' },
      { sym: 'Fₙ/Fₙ₋₁ → φ', meaning: 'Golden ratio (1.618...)' },
    ],
    matlab: 'Sunflower ke beej, shells ki spiral, galaxy ka shape — sab Fibonacci follow karte hain! Math = Nature ki language.',
  },

  // ── Group 8: Noether Symmetry ──
  '8-0': {
    formula: 'Symmetry → dQ/dt = 0',
    parts: [
      { sym: 'Symmetry', meaning: 'kuch badlo lekin physics same rahe' },
      { sym: 'Q', meaning: 'conserved quantity' },
      { sym: 'dQ/dt = 0', meaning: 'Q time ke saath change nahi hota' },
      { sym: 'Examples', meaning: 'Time→Energy, Space→Momentum, Rotation→Angular momentum' },
    ],
    matlab: 'Har symmetry ek conservation law deti hai. Ye physics ka sabse powerful theorem hai — Emmy Noether ne 1918 mein prove kiya!',
  },
  '8-1': {
    formula: 'CPT |ψ⟩ = |ψ⟩',
    parts: [
      { sym: 'C', meaning: 'Charge conjugation (matter ↔ antimatter)' },
      { sym: 'P', meaning: 'Parity (left ↔ right mirror image)' },
      { sym: 'T', meaning: 'Time reversal (forward ↔ backward)' },
      { sym: '|ψ⟩', meaning: 'quantum state of system' },
    ],
    matlab: 'Alag-alag C, P, T toot sakte hain, lekin teeno saath lagao toh physics HAMESHA same rehti hai. Universe ka fundamental rule!',
  },
  '8-2': {
    formula: 'V(φ) = −μ²|φ|² + λ|φ|⁴ (Mexican hat)',
    parts: [
      { sym: 'V(φ)', meaning: 'Higgs potential energy' },
      { sym: 'φ', meaning: 'Higgs field value' },
      { sym: '−μ²', meaning: 'negative mass² term (unstable center!)' },
      { sym: 'λ|φ|⁴', meaning: 'self-interaction (stability at rim)' },
    ],
    matlab: 'Potential "Mexican hat" shape ka hai — center (symmetric) unstable hai, ball rim pe girti hai = symmetry break = mass milta hai!',
  },
  '8-3': {
    formula: 'T↓ → G_unified → G_strong + G_EW → G_SM',
    parts: [
      { sym: 'T↓', meaning: 'universe thanda ho raha hai' },
      { sym: 'G_unified', meaning: 'ek hi force thi start mein' },
      { sym: 'G_strong', meaning: 'strong nuclear force alag hui' },
      { sym: 'G_EW → G_EM + G_weak', meaning: 'electroweak bhi split hui' },
    ],
    matlab: 'Big Bang ke baad: 1 force → 2 → 3 → 4 forces. Jaise paani jamne pe crystal bane = symmetry break hui, forces alag hui!',
  },

  // ── Group 9: Bose Quantum ──
  '9-0': {
    formula: 'n(ε) = 1 / (e^((ε−μ)/k_BT) − 1)',
    parts: [
      { sym: 'n(ε)', meaning: 'energy ε pe kitne particles hain' },
      { sym: 'ε', meaning: 'energy level' },
      { sym: 'μ', meaning: 'chemical potential' },
      { sym: 'k_BT', meaning: 'thermal energy (temperature)' },
      { sym: '−1', meaning: 'ye "−1" bosons ke liye hai (fermions mein "+1" hota)' },
    ],
    matlab: 'T → 0 pe: sab bosons ε = 0 level pe gir jaate hain! Ye hai BEC — ek giant quantum wave ban jaata hai.',
  },
  '9-1': {
    formula: '|ψ⟩_AB = (|01⟩ − |10⟩) / √2',
    parts: [
      { sym: '|ψ⟩_AB', meaning: 'do particles ka combined state' },
      { sym: '|01⟩', meaning: 'A=0, B=1' },
      { sym: '|10⟩', meaning: 'A=1, B=0' },
      { sym: '1/√2', meaning: 'normalization (probability = 1)' },
    ],
    matlab: 'A measure karo aur 0 mile → B TURANT 1 ho jaata hai, chahe kitna bhi door ho. Einstein ne kaha "spooky" — lekin ye real hai!',
  },
  '9-2': {
    formula: '|ψ⟩ = α|0⟩ + β|1⟩, |α|² + |β|² = 1',
    parts: [
      { sym: '|ψ⟩', meaning: 'qubit ka quantum state' },
      { sym: '|0⟩, |1⟩', meaning: 'basis states (like 0 and 1)' },
      { sym: 'α, β', meaning: 'complex amplitudes (probabilities)' },
      { sym: '|α|² + |β|² = 1', meaning: 'total probability = 100%' },
    ],
    matlab: 'Normal bit: 0 YA 1. Qubit: 0 AUR 1 ek saath! 50 qubits = 2⁵⁰ states simultaneously. Quantum computing ki power!',
  },
  '9-3': {
    formula: 'ρ_superfluid ∝ (T_c/T)^(3/2) × ρ_DM',
    parts: [
      { sym: 'ρ_superfluid', meaning: 'superfluid dark matter density' },
      { sym: 'T_c', meaning: 'critical temperature (BEC form hone ka)' },
      { sym: 'T', meaning: 'actual temperature' },
      { sym: 'ρ_DM', meaning: 'total dark matter density' },
    ],
    matlab: 'Agar dark matter bosonic particles hai toh galaxy centers mein BEC ban sakta hai — superfluid! Ye rotation curves explain kar sakta hai.',
  },
  // Group 10 — Disha Nirdesh
  '10-0': {
    formula: 'h = (4G/c⁴) × (M·v²/r·D)',
    parts: [
      { sym: 'h', meaning: 'gravitational wave strain (signal strength)' },
      { sym: 'G', meaning: 'gravitational constant' },
      { sym: 'M', meaning: 'chirp mass (merging bodies ki)' },
      { sym: 'v', meaning: 'orbital velocity' },
      { sym: 'D', meaning: 'distance to source' },
    ],
    matlab: 'Gravitational wave detector jitna sensitive, utni door ki events sune. AI noise filtering se sensitivity 10x badh sakti hai — Newton ka 2026 plan.',
  },
  '10-1': {
    formula: 'Gμν + Λgμν = (8πG/c⁴)Tμν + Qμν',
    parts: [
      { sym: 'Gμν', meaning: 'Einstein tensor (spacetime curvature)' },
      { sym: 'Λ', meaning: 'cosmological constant (dark energy)' },
      { sym: 'Tμν', meaning: 'stress-energy tensor (matter/energy)' },
      { sym: 'Qμν', meaning: 'quantum correction term (NEW!)' },
    ],
    matlab: 'Einstein ki original equation + quantum correction = semi-classical gravity. Tabletop experiments se Qμν measure karna — yeh 2026 ka sabse bada experiment hoga!',
  },
  '10-2': {
    formula: 'p(n) ~ (1/4n√3) × e^(π√(2n/3))',
    parts: [
      { sym: 'p(n)', meaning: 'partition function (n ko todne ke tarike)' },
      { sym: 'n', meaning: 'number being partitioned' },
      { sym: 'e^(π√...)', meaning: 'exponential growth rate' },
    ],
    matlab: 'Ramanujan-Hardy formula: ek number kitne tarike se tod sakte hain. Yeh quantum error correction codes ki foundation hai — 2026 mein quantum computers stable banayegi!',
  },
  '10-3': {
    formula: 'T_BEC = (2πℏ²/mk_B) × (n/ζ(3/2))^(2/3)',
    parts: [
      { sym: 'T_BEC', meaning: 'BEC critical temperature' },
      { sym: 'ℏ', meaning: 'reduced Planck constant' },
      { sym: 'm', meaning: 'particle mass' },
      { sym: 'n', meaning: 'particle density' },
      { sym: 'ζ(3/2)', meaning: 'Riemann zeta function ≈ 2.612' },
    ],
    matlab: 'Bose ka plan: engineered quasi-particles se BEC temperature room-temp tak le jaao. Topological qubits + photonic circuits = room-temp quantum computer!',
  },
  '10-4': {
    formula: '∂μJ^μ = 0  ←  δL/δφ = d/dt(δL/δφ̇)',
    parts: [
      { sym: '∂μJ^μ', meaning: 'conserved current ka divergence = 0' },
      { sym: 'L', meaning: 'Lagrangian (system ki total physics)' },
      { sym: 'φ', meaning: 'field variable' },
      { sym: 'δL/δφ', meaning: 'Euler-Lagrange equation' },
    ],
    matlab: 'Noether ka theorem: har symmetry ek conservation law deti hai. AI se naye symmetries dhoondho LHC data mein — naye conserved quantities milenge = new physics!',
  },
  // Group 11 — Joint Research
  '11-0': {
    formula: 'h = (2G/c⁴) × (1/D) × d²I_ij/dt²',
    parts: [
      { sym: 'h', meaning: 'gravitational wave strain amplitude' },
      { sym: 'G', meaning: 'gravitational constant' },
      { sym: 'c', meaning: 'speed of light' },
      { sym: 'D', meaning: 'distance to source' },
      { sym: 'I_ij', meaning: 'quadrupole moment tensor (mass distribution)' },
    ],
    matlab: 'Newton ka source model + Einstein ka quadrupole formula = gravitational wave waveform. Matched filtering se LIGO mein SNR 30% improve hoga — NE-GWCP pipeline!',
  },
  '11-1': {
    formula: 'N(E,L) = Σ_k c_k × R_k(E) × Y_k(L)',
    parts: [
      { sym: 'N(E,L)', meaning: 'N-body state density' },
      { sym: 'R_k(E)', meaning: 'Ramanujan-type convergent series' },
      { sym: 'Y_k(L)', meaning: 'angular momentum functions' },
      { sym: 'c_k', meaning: 'partition coefficients' },
    ],
    matlab: 'Classical perturbation mein 10,000+ terms chahiye — Ramanujan ki series sirf 47 terms mein same accuracy deti hai. 200× speedup! Hecke eigenvalues se orbital resonances predict hoti hain.',
  },
  '11-2': {
    formula: 'Δφ = k_eff × g × T²',
    parts: [
      { sym: 'Δφ', meaning: 'atom interferometer phase shift' },
      { sym: 'k_eff', meaning: 'effective wave vector (10⁹ /m with LMT)' },
      { sym: 'g', meaning: 'gravitational acceleration (or GW tidal)' },
      { sym: 'T', meaning: 'interrogation time (seconds)' },
    ],
    matlab: 'BEC atom interferometer mein T² dependence hai — time badhao, sensitivity dramatically badhti hai. 10m baseline, 10s interrogation = sub-Hz gravitational waves detect! LIGO se 100× sasta.',
  },
  '11-3': {
    formula: 'ρ(r) = ρ₀/[(r/rₛ)(1+r/rₛ)²]  →  Z₂: P_D = -1',
    parts: [
      { sym: 'ρ(r)', meaning: 'dark matter density (NFW profile)' },
      { sym: 'rₛ', meaning: 'scale radius (symmetry breaking scale)' },
      { sym: 'Z₂', meaning: 'discrete Dark Parity symmetry' },
      { sym: 'P_D', meaning: 'dark parity quantum number (-1 for DM)' },
    ],
    matlab: 'NFW profile mein broken conformal symmetry chhupa hai! Inner halo scale-free, outer region mein symmetry break hota hai at rₛ. Dark Parity (P_D) conservation batata hai kyun DM stable aur invisible hai.',
  },
  // Group 12 — Remaining Joint Research
  '12-0': {
    formula: 'Z_QG(τ) = η(τ)⁻²⁴ × Θ(τ)',
    parts: [
      { sym: 'Z_QG', meaning: 'quantum gravity partition function' },
      { sym: 'η(τ)', meaning: 'Dedekind eta function (Ramanujan ki favorite)' },
      { sym: 'Θ(τ)', meaning: 'modular theta function' },
      { sym: 'τ', meaning: 'modular parameter (spacetime geometry)' },
    ],
    matlab: 'Ramanujan ki modular forms se quantum gravity ka partition function exact calculate hota hai. Black hole entropy S = A/4 - 3/2 ln(A) naturally aata hai — string theory se match!',
  },
  '12-1': {
    formula: 'Γ_grav = G × m² / (ℏ × Δx)',
    parts: [
      { sym: 'Γ_grav', meaning: 'gravitational decoherence rate' },
      { sym: 'm', meaning: 'BEC mass (10⁶ atoms)' },
      { sym: 'Δx', meaning: 'superposition separation distance' },
      { sym: 'G, ℏ', meaning: 'gravitational & Planck constants' },
    ],
    matlab: 'Agar gravity quantum hai toh BEC superposition decohere hoga — yeh rate measurable hai! Diósi-Penrose model ka direct test. India mein IISER Pune + VSSC collaboration se ho sakta hai.',
  },
  '12-2': {
    formula: 'v(E) = c × (1 ± E/E_QG)',
    parts: [
      { sym: 'v(E)', meaning: 'photon speed (energy-dependent)' },
      { sym: 'c', meaning: 'classical speed of light' },
      { sym: 'E', meaning: 'photon energy' },
      { sym: 'E_QG', meaning: 'quantum gravity energy scale (~10¹⁹ GeV)' },
    ],
    matlab: 'Quantum gravity mein Lorentz symmetry approximate ho jaati hai — photon speed energy pe depend karti hai. Gamma ray bursts se test ho raha hai. CTA telescope 2027 mein definitive test karega!',
  },
  '12-3': {
    formula: 'λ₂ ≤ 2√(k-1)  →  R = 1-k/n, d ≥ g/2',
    parts: [
      { sym: 'λ₂', meaning: 'Ramanujan graph ka spectral gap (optimal)' },
      { sym: 'k', meaning: 'graph degree (connections per node)' },
      { sym: 'R', meaning: 'quantum code rate' },
      { sym: 'd', meaning: 'code distance (error tolerance)' },
    ],
    matlab: 'Ramanujan graph ka spectral gap mathematically tightest possible hai — isliye error correction code bhi optimal hai. Surface code se 120× kam qubits chahiye. Room-temp quantum computing feasible!',
  },
  '12-4': {
    formula: 'f(τ) = Σ aₙqⁿ  →  aₙ = particle multiplicity',
    parts: [
      { sym: 'f(τ)', meaning: 'level-6 modular form' },
      { sym: 'aₙ', meaning: 'Fourier coefficients = particle count' },
      { sym: 'qⁿ', meaning: 'e^(2πinτ) — energy level n' },
      { sym: 'τ(n)', meaning: 'Ramanujan tau function → 11D M-theory' },
    ],
    matlab: 'Level 6 ka modular form space 1-dimensional hai — Standard Model (U(1)×SU(2)×SU(3)) UNIQUE hai! Koi alternative gauge group possible nahi. Ramanujan ki tau function 11D se connected hai.',
  },
  '12-5': {
    formula: 'Q_info = Σᵢ S(ρᵢ) = conserved',
    parts: [
      { sym: 'Q_info', meaning: 'quantum information charge (conserved)' },
      { sym: 'S(ρᵢ)', meaning: 'von Neumann entropy at node i' },
      { sym: 'ρᵢ', meaning: 'density matrix at each repeater' },
    ],
    matlab: 'Noether ka theorem quantum internet pe: agar Q_info conserved hai toh information leak impossible hai — provably secure! Topological invariant (Chern number) noise se change nahi hota.',
  },
  // Group 13 — Advanced Joint Research (merged from 11+13)
  '13-0': {
    formula: 'SNR = ∫ h(f)·template(f)/S_n(f) df',
    parts: [
      { sym: 'SNR', meaning: 'signal-to-noise ratio (detection confidence)' },
      { sym: 'h(f)', meaning: 'gravitational wave strain in frequency domain' },
      { sym: 'template(f)', meaning: 'NE-GWCP 2.0 hybrid waveform template' },
      { sym: 'S_n(f)', meaning: 'detector noise power spectral density' },
    ],
    matlab: 'NE-GWCP 2.0: Newton ka Keplerian pre-filter (100× speedup) + Einstein ka 3.5PN waveform + AI template bank = SNR 31.6 (30% up), 17 new events, 2.7σ echo signals detected!',
  },
  '13-1': {
    formula: 'T(N) ≈ 23·N²·ln(N) × Σ_k c_k·R_k(E)·Y_k(L)',
    parts: [
      { sym: 'T(N)', meaning: 'general N-body computation terms' },
      { sym: 'N', meaning: 'number of bodies' },
      { sym: 'R_k(E)', meaning: 'Ramanujan convergent series' },
      { sym: 'c_k', meaning: 'modular form coefficients' },
    ],
    matlab: 'Modular form decomposition se N-body problem ka general formula! 3-body: 47 terms, 4-body: 89 terms, 5-body: 156 terms. NASA JPL adopted — 200× faster than classical perturbation.',
  },
  '13-2': {
    formula: 'Δφ = k_eff × g × T²  |  T_coherence = 45s (world record)',
    parts: [
      { sym: 'Δφ', meaning: 'BEC interferometer phase shift' },
      { sym: 'k_eff', meaning: 'effective wave vector (10⁹ /m with LMT)' },
      { sym: 'T', meaning: 'interrogation time (45s record)' },
      { sym: 'g', meaning: 'gravitational wave tidal acceleration' },
    ],
    matlab: 'BEC coherence 45 seconds = world record! Sub-Hz band (0.01-1 Hz) open hua — LIGO/LISA gap covered. NGC 4472 SMBH binary at 0.03 Hz first detection. LIGO se 100× sasta!',
  },
  '13-3': {
    formula: 'L_dark = -¼F^a_μν F^aμν + D_μΦ†D^μΦ − V(Φ)',
    parts: [
      { sym: 'L_dark', meaning: 'dark sector Lagrangian (complete)' },
      { sym: 'F^a_μν', meaning: 'SU(2)_D dark gauge field strength' },
      { sym: 'Φ', meaning: 'dark Higgs doublet (symmetry breaking)' },
      { sym: 'V(Φ)', meaning: 'dark Higgs potential' },
    ],
    matlab: 'NFW profile → Z₂ Dark Parity → full SU(2)_D gauge theory! 4 conservation laws: dark charge, dark isospin, dark parity, dark angular momentum. XENONnT 3.8σ excess at predicted mass!',
  },
};

/* ── FormulaCard Component ── */

export function FormulaCard({ articleKey }: { articleKey: string }) {
  const data = FORMULA_DATA[articleKey];
  if (!data) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.04))',
      border: '1px solid rgba(99,102,241,0.15)',
      borderRadius: 10, padding: '10px 12px', marginBottom: 8,
    }}>
      {/* Formula */}
      <div style={{
        fontFamily: "'Cambria Math', 'Times New Roman', serif",
        fontSize: 15, color: '#a5b4fc', textAlign: 'center',
        padding: '8px 0', marginBottom: 6,
        background: 'rgba(0,0,0,0.2)', borderRadius: 8,
        letterSpacing: 0.5,
      }}>
        {data.formula}
      </div>

      {/* Symbol breakdown */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
        {data.parts.map((p, i) => (
          <div key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 10, padding: '2px 6px', borderRadius: 6,
            background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.1)',
          }}>
            <span style={{ fontFamily: "'Cambria Math', serif", color: '#818cf8', fontWeight: 600 }}>
              {p.sym}
            </span>
            <span style={{ color: 'var(--t2)' }}>= {p.meaning}</span>
          </div>
        ))}
      </div>

      {/* Matlab (meaning) */}
      <div style={{
        fontSize: 10, lineHeight: 1.6, color: 'var(--t2)',
        borderTop: '1px solid rgba(99,102,241,0.1)', paddingTop: 5,
      }}>
        <span style={{ color: '#818cf8', fontWeight: 600 }}>📐 Matlab: </span>
        {data.matlab}
      </div>
    </div>
  );
}
