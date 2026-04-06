'use client';

import { ScientistId } from '@/lib/scientistProfiles';

const COLOR_HEX: Record<string, string> = {
  green: '#3ecf8e', amber: '#f5a623', purple: '#a78bfa',
  coral: '#f87060', teal: '#38bdf8', blue: '#5b8ff9',
};

interface PortraitProps {
  id: ScientistId;
  size?: number;
  showName?: boolean;
}

/* Each scientist gets a unique 2D SVG portrait with distinctive features */

function NewtonPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.green;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="ng" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#ng)" stroke={c} strokeWidth="2"/>
      {/* Wig */}
      <ellipse cx="100" cy="75" rx="52" ry="40" fill="#8B7355"/>
      <ellipse cx="56" cy="100" rx="16" ry="30" fill="#8B7355"/>
      <ellipse cx="144" cy="100" rx="16" ry="30" fill="#8B7355"/>
      <ellipse cx="52" cy="120" rx="12" ry="15" fill="#7A6548"/>
      <ellipse cx="148" cy="120" rx="12" ry="15" fill="#7A6548"/>
      {/* Face */}
      <ellipse cx="100" cy="105" rx="38" ry="42" fill="#F5D0A9"/>
      <ellipse cx="100" cy="115" rx="35" ry="35" fill="#F0C899"/>
      {/* Eyes */}
      <ellipse cx="85" cy="100" rx="6" ry="4.5" fill="#fff"/>
      <circle cx="86" cy="100" r="2.5" fill="#3a2818"/>
      <ellipse cx="115" cy="100" rx="6" ry="4.5" fill="#fff"/>
      <circle cx="116" cy="100" r="2.5" fill="#3a2818"/>
      {/* Brows */}
      <path d="M77 94 Q85 89 93 93" fill="none" stroke="#5a4030" strokeWidth="1.5"/>
      <path d="M107 93 Q115 89 123 94" fill="none" stroke="#5a4030" strokeWidth="1.5"/>
      {/* Nose */}
      <path d="M100 103 Q96 115 94 117 Q100 120 106 117 Q104 115 100 103" fill="#E8B888" stroke="#D4A070" strokeWidth="0.5"/>
      {/* Mouth */}
      <path d="M90 125 Q100 130 110 125" fill="none" stroke="#B87A5A" strokeWidth="1.5"/>
      {/* Collar */}
      <path d="M70 148 Q100 160 130 148" fill="#fff" stroke="#ddd" strokeWidth="1"/>
      <path d="M80 148 L90 170 Q100 175 110 170 L120 148" fill="#444"/>
      {/* Apple */}
      <circle cx="160" cy="165" r="12" fill="#e74c3c"/>
      <path d="M160 153 Q162 148 164 153" fill="none" stroke="#5a3" strokeWidth="1.5"/>
      <ellipse cx="160" cy="163" rx="3" ry="2" fill="#ff6b5b" opacity="0.5"/>
    </svg>
  );
}

function EinsteinPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.amber;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="eg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#eg)" stroke={c} strokeWidth="2"/>
      {/* Wild white hair */}
      <ellipse cx="100" cy="72" rx="55" ry="38" fill="#d4d4d4"/>
      <ellipse cx="55" cy="80" rx="20" ry="25" fill="#c8c8c8" transform="rotate(-15 55 80)"/>
      <ellipse cx="145" cy="80" rx="20" ry="25" fill="#c8c8c8" transform="rotate(15 145 80)"/>
      <ellipse cx="60" cy="65" rx="12" ry="18" fill="#ddd" transform="rotate(-25 60 65)"/>
      <ellipse cx="140" cy="65" rx="12" ry="18" fill="#ddd" transform="rotate(25 140 65)"/>
      <ellipse cx="100" cy="55" rx="30" ry="15" fill="#e0e0e0"/>
      {/* Face */}
      <ellipse cx="100" cy="108" rx="36" ry="40" fill="#F5D0A9"/>
      {/* Eyes */}
      <ellipse cx="86" cy="100" rx="6" ry="5" fill="#fff"/>
      <circle cx="87" cy="100" r="3" fill="#4a3520"/>
      <circle cx="88" cy="99" r="1" fill="#fff"/>
      <ellipse cx="114" cy="100" rx="6" ry="5" fill="#fff"/>
      <circle cx="115" cy="100" r="3" fill="#4a3520"/>
      <circle cx="116" cy="99" r="1" fill="#fff"/>
      {/* Bushy brows */}
      <path d="M76 93 Q86 86 96 92" fill="none" stroke="#888" strokeWidth="2.5"/>
      <path d="M104 92 Q114 86 124 93" fill="none" stroke="#888" strokeWidth="2.5"/>
      {/* Nose */}
      <path d="M100 104 Q97 116 93 118 Q100 121 107 118 Q103 116 100 104" fill="#E8B888"/>
      {/* Mustache */}
      <path d="M85 124 Q92 130 100 126 Q108 130 115 124" fill="#aaa" stroke="#999" strokeWidth="0.5"/>
      {/* Smile */}
      <path d="M88 130 Q100 138 112 130" fill="none" stroke="#B87A5A" strokeWidth="1.5"/>
      {/* Tongue out */}
      <ellipse cx="100" cy="136" rx="5" ry="4" fill="#e88"/>
      {/* Collar */}
      <rect x="72" y="148" width="56" height="20" rx="4" fill="#666"/>
    </svg>
  );
}

function RamanujanPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.purple;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="rg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#rg)" stroke={c} strokeWidth="2"/>
      {/* Hair - neat, parted */}
      <ellipse cx="100" cy="72" rx="42" ry="30" fill="#1a1a1a"/>
      <ellipse cx="80" cy="68" rx="25" ry="22" fill="#222"/>
      <ellipse cx="120" cy="70" rx="22" ry="20" fill="#1a1a1a"/>
      {/* Face - Indian complexion */}
      <ellipse cx="100" cy="108" rx="35" ry="40" fill="#C68642"/>
      <ellipse cx="100" cy="112" rx="33" ry="36" fill="#BB7735"/>
      {/* Eyes - gentle */}
      <ellipse cx="86" cy="102" rx="6" ry="4" fill="#fff"/>
      <circle cx="87" cy="102" r="2.5" fill="#2a1a0a"/>
      <ellipse cx="114" cy="102" rx="6" ry="4" fill="#fff"/>
      <circle cx="115" cy="102" r="2.5" fill="#2a1a0a"/>
      {/* Soft brows */}
      <path d="M78 96 Q86 93 94 96" fill="none" stroke="#3a2a1a" strokeWidth="1.5"/>
      <path d="M106 96 Q114 93 122 96" fill="none" stroke="#3a2a1a" strokeWidth="1.5"/>
      {/* Nose */}
      <path d="M100 106 Q96 116 93 118 Q100 121 107 118 Q104 116 100 106" fill="#A86B30"/>
      {/* Gentle smile */}
      <path d="M90 128 Q100 133 110 128" fill="none" stroke="#7A5020" strokeWidth="1.5"/>
      {/* Tilak/forehead mark */}
      <ellipse cx="100" cy="80" rx="2" ry="4" fill="#e74c3c"/>
      {/* Collar - formal jacket */}
      <path d="M68 150 L80 148 L100 155 L120 148 L132 150 L130 175 L70 175Z" fill="#333"/>
      <path d="M92 148 L100 155 L108 148" fill="#fff" stroke="#ddd" strokeWidth="0.5"/>
      {/* Infinity symbol */}
      <text x="155" y="170" fontSize="20" fill={c} opacity="0.5">∞</text>
    </svg>
  );
}

function BosePortrait({ s }: { s: number }) {
  const c = COLOR_HEX.teal;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#bg)" stroke={c} strokeWidth="2"/>
      {/* Hair */}
      <ellipse cx="100" cy="70" rx="44" ry="28" fill="#222"/>
      {/* Face - round, Bengali */}
      <ellipse cx="100" cy="106" rx="38" ry="42" fill="#C68642"/>
      {/* Glasses - round */}
      <circle cx="82" cy="100" r="14" fill="none" stroke="#555" strokeWidth="2"/>
      <circle cx="118" cy="100" r="14" fill="none" stroke="#555" strokeWidth="2"/>
      <line x1="96" y1="100" x2="104" y2="100" stroke="#555" strokeWidth="2"/>
      <line x1="68" y1="100" x2="62" y2="96" stroke="#555" strokeWidth="1.5"/>
      <line x1="132" y1="100" x2="138" y2="96" stroke="#555" strokeWidth="1.5"/>
      {/* Eyes behind glasses */}
      <ellipse cx="82" cy="100" rx="5" ry="3.5" fill="#fff"/>
      <circle cx="83" cy="100" r="2" fill="#2a1a0a"/>
      <ellipse cx="118" cy="100" rx="5" ry="3.5" fill="#fff"/>
      <circle cx="119" cy="100" r="2" fill="#2a1a0a"/>
      {/* Nose */}
      <path d="M100 104 Q97 114 94 116 Q100 119 106 116 Q103 114 100 104" fill="#A86B30"/>
      {/* Warm smile */}
      <path d="M88 126 Q100 134 112 126" fill="none" stroke="#7A5020" strokeWidth="1.8"/>
      {/* Dhoti collar / kurta */}
      <path d="M65 150 L100 158 L135 150 L132 175 L68 175Z" fill="#f5f0e0"/>
      <path d="M95 150 L100 158 L105 150" fill="#e8e0d0"/>
    </svg>
  );
}

function NoetherPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.coral;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="nog" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#nog)" stroke={c} strokeWidth="2"/>
      {/* Hair - short, practical */}
      <ellipse cx="100" cy="70" rx="45" ry="30" fill="#5a3a20"/>
      <ellipse cx="65" cy="82" rx="18" ry="22" fill="#5a3a20"/>
      <ellipse cx="135" cy="82" rx="18" ry="22" fill="#5a3a20"/>
      <ellipse cx="100" cy="60" rx="35" ry="18" fill="#6a4a30"/>
      {/* Face - woman */}
      <ellipse cx="100" cy="108" rx="34" ry="38" fill="#F5D0A9"/>
      {/* Eyes - sharp, intelligent */}
      <ellipse cx="86" cy="100" rx="6" ry="4.5" fill="#fff"/>
      <circle cx="87" cy="100" r="2.5" fill="#3a5a2a"/>
      <ellipse cx="114" cy="100" rx="6" ry="4.5" fill="#fff"/>
      <circle cx="115" cy="100" r="2.5" fill="#3a5a2a"/>
      {/* Glasses */}
      <ellipse cx="86" cy="100" rx="12" ry="10" fill="none" stroke="#666" strokeWidth="1.5"/>
      <ellipse cx="114" cy="100" rx="12" ry="10" fill="none" stroke="#666" strokeWidth="1.5"/>
      <line x1="98" y1="100" x2="102" y2="100" stroke="#666" strokeWidth="1.5"/>
      {/* Brows */}
      <path d="M76 92 Q86 88 96 92" fill="none" stroke="#5a3a20" strokeWidth="1.5"/>
      <path d="M104 92 Q114 88 124 92" fill="none" stroke="#5a3a20" strokeWidth="1.5"/>
      {/* Nose */}
      <path d="M100 104 Q97 113 95 115 Q100 117 105 115 Q103 113 100 104" fill="#E8B888"/>
      {/* Determined expression */}
      <path d="M90 124 Q100 128 110 124" fill="none" stroke="#B87A5A" strokeWidth="1.5"/>
      {/* Collar */}
      <path d="M70 148 L100 155 L130 148 L128 175 L72 175Z" fill="#556"/>
      <circle cx="100" cy="152" r="3" fill="#aaa"/>
      {/* Symmetry symbol */}
      <text x="155" y="170" fontSize="16" fill={c} opacity="0.5">⚖️</text>
    </svg>
  );
}

function GalileoPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.blue;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="gg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#gg)" stroke={c} strokeWidth="2"/>
      {/* Balding head */}
      <ellipse cx="100" cy="72" rx="40" ry="26" fill="#F5D0A9"/>
      <ellipse cx="65" cy="85" rx="15" ry="20" fill="#6a5a4a"/>
      <ellipse cx="135" cy="85" rx="15" ry="20" fill="#6a5a4a"/>
      {/* Face */}
      <ellipse cx="100" cy="108" rx="38" ry="42" fill="#F5D0A9"/>
      {/* Eyes */}
      <ellipse cx="86" cy="100" rx="5.5" ry="4" fill="#fff"/>
      <circle cx="87" cy="100" r="2.5" fill="#3a2818"/>
      <ellipse cx="114" cy="100" rx="5.5" ry="4" fill="#fff"/>
      <circle cx="115" cy="100" r="2.5" fill="#3a2818"/>
      {/* Brows */}
      <path d="M78 95 Q86 91 94 95" fill="none" stroke="#5a4a3a" strokeWidth="1.5"/>
      <path d="M106 95 Q114 91 122 95" fill="none" stroke="#5a4a3a" strokeWidth="1.5"/>
      {/* Nose */}
      <path d="M100 104 Q96 116 93 118 Q100 121 107 118 Q104 116 100 104" fill="#E8B888"/>
      {/* Big beard */}
      <path d="M70 120 Q75 145 100 155 Q125 145 130 120" fill="#7a6a5a"/>
      <path d="M75 125 Q80 140 100 148 Q120 140 125 125" fill="#8a7a6a"/>
      {/* Mouth in beard */}
      <path d="M90 126 Q100 130 110 126" fill="none" stroke="#5a4030" strokeWidth="1"/>
      {/* Renaissance collar */}
      <ellipse cx="100" cy="158" rx="40" ry="12" fill="#f5f0e8" stroke="#ddd" strokeWidth="1"/>
      {/* Telescope */}
      <rect x="148" y="50" width="6" height="35" rx="2" fill="#8a7a5a" transform="rotate(30 151 67)"/>
      <ellipse cx="154" cy="48" rx="6" ry="4" fill="#aaa" transform="rotate(30 154 48)"/>
    </svg>
  );
}

function CuriePortrait({ s }: { s: number }) {
  const c = COLOR_HEX.teal;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="cg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#cg)" stroke={c} strokeWidth="2"/>
      {/* Hair up in bun */}
      <ellipse cx="100" cy="58" rx="28" ry="18" fill="#4a3a2a"/>
      <ellipse cx="100" cy="68" rx="42" ry="25" fill="#3a2a1a"/>
      <ellipse cx="62" cy="82" rx="14" ry="20" fill="#3a2a1a"/>
      <ellipse cx="138" cy="82" rx="14" ry="20" fill="#3a2a1a"/>
      {/* Face */}
      <ellipse cx="100" cy="108" rx="34" ry="38" fill="#F5D0A9"/>
      {/* Eyes - determined */}
      <ellipse cx="86" cy="100" rx="6" ry="4.5" fill="#fff"/>
      <circle cx="87" cy="100" r="2.5" fill="#4a6a5a"/>
      <ellipse cx="114" cy="100" rx="6" ry="4.5" fill="#fff"/>
      <circle cx="115" cy="100" r="2.5" fill="#4a6a5a"/>
      {/* Brows */}
      <path d="M78 94 Q86 90 94 94" fill="none" stroke="#4a3a2a" strokeWidth="1.2"/>
      <path d="M106 94 Q114 90 122 94" fill="none" stroke="#4a3a2a" strokeWidth="1.2"/>
      {/* Nose */}
      <path d="M100 104 Q97 113 95 115 Q100 117 105 115 Q103 113 100 104" fill="#E8B888"/>
      {/* Gentle determined smile */}
      <path d="M90 124 Q100 129 110 124" fill="none" stroke="#B87A5A" strokeWidth="1.3"/>
      {/* High collar dress */}
      <path d="M68 148 L100 156 L132 148 L130 175 L70 175Z" fill="#2a2a3a"/>
      <ellipse cx="100" cy="150" rx="18" ry="5" fill="#333" stroke="#555" strokeWidth="0.5"/>
      {/* Glow - radioactive */}
      <circle cx="160" cy="160" r="10" fill={c + '33'}/>
      <circle cx="160" cy="160" r="5" fill={c + '66'}/>
    </svg>
  );
}

function TeslaPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.amber;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="tg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#tg)" stroke={c} strokeWidth="2"/>
      {/* Slicked dark hair */}
      <ellipse cx="100" cy="68" rx="42" ry="28" fill="#1a1a1a"/>
      <ellipse cx="100" cy="60" rx="35" ry="18" fill="#222"/>
      {/* Face - tall, thin */}
      <ellipse cx="100" cy="108" rx="32" ry="42" fill="#F0D0A0"/>
      {/* Eyes - intense */}
      <ellipse cx="86" cy="98" rx="6" ry="5" fill="#fff"/>
      <circle cx="87" cy="98" r="3" fill="#2a3a4a"/>
      <circle cx="88" cy="97" r="1" fill="#fff"/>
      <ellipse cx="114" cy="98" rx="6" ry="5" fill="#fff"/>
      <circle cx="115" cy="98" r="3" fill="#2a3a4a"/>
      <circle cx="116" cy="97" r="1" fill="#fff"/>
      {/* Sharp brows */}
      <path d="M76 91 Q86 86 96 91" fill="none" stroke="#222" strokeWidth="2"/>
      <path d="M104 91 Q114 86 124 91" fill="none" stroke="#222" strokeWidth="2"/>
      {/* Nose */}
      <path d="M100 102 Q96 114 94 116 Q100 119 106 116 Q104 114 100 102" fill="#E0C090"/>
      {/* Thin mustache */}
      <path d="M88 120 Q94 124 100 122 Q106 124 112 120" fill="#222"/>
      {/* Serious mouth */}
      <path d="M92 128 Q100 130 108 128" fill="none" stroke="#B07A4A" strokeWidth="1.2"/>
      {/* Formal suit */}
      <path d="M70 150 L85 148 L100 160 L115 148 L130 150 L128 175 L72 175Z" fill="#1a1a2a"/>
      <path d="M92 148 L100 160 L108 148" fill="#fff"/>
      <rect x="97" y="155" width="6" height="8" rx="1" fill="#222"/>
      {/* Lightning bolt */}
      <path d="M155 40 L148 60 L156 58 L147 78" fill="none" stroke={c} strokeWidth="2.5"/>
    </svg>
  );
}

function HawkingPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.purple;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="hg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#hg)" stroke={c} strokeWidth="2"/>
      {/* Hair - thinning */}
      <ellipse cx="100" cy="72" rx="38" ry="22" fill="#8a7a5a"/>
      {/* Face */}
      <ellipse cx="100" cy="105" rx="34" ry="38" fill="#F5D0A9"/>
      {/* Glasses */}
      <rect x="70" y="93" width="25" height="18" rx="4" fill="none" stroke="#555" strokeWidth="2"/>
      <rect x="105" y="93" width="25" height="18" rx="4" fill="none" stroke="#555" strokeWidth="2"/>
      <line x1="95" y1="102" x2="105" y2="102" stroke="#555" strokeWidth="2"/>
      {/* Eyes */}
      <ellipse cx="82" cy="102" rx="4.5" ry="3.5" fill="#fff"/>
      <circle cx="83" cy="102" r="2" fill="#4a6a8a"/>
      <ellipse cx="118" cy="102" rx="4.5" ry="3.5" fill="#fff"/>
      <circle cx="119" cy="102" r="2" fill="#4a6a8a"/>
      {/* Nose */}
      <path d="M100 106 Q97 115 95 117 Q100 119 105 117 Q103 115 100 106" fill="#E8B888"/>
      {/* Knowing smile */}
      <path d="M88 126 Q100 132 112 126" fill="none" stroke="#B87A5A" strokeWidth="1.5"/>
      {/* Wheelchair hint */}
      <rect x="72" y="148" width="56" height="18" rx="4" fill="#444"/>
      <rect x="80" y="152" width="40" height="10" rx="3" fill="#555"/>
      {/* Stars around */}
      <circle cx="40" cy="45" r="2" fill="#fff" opacity="0.6"/>
      <circle cx="160" cy="35" r="1.5" fill="#fff" opacity="0.5"/>
      <circle cx="155" cy="55" r="1" fill="#fff" opacity="0.4"/>
    </svg>
  );
}

function FeynmanPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.coral;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="fg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#fg)" stroke={c} strokeWidth="2"/>
      {/* Wavy hair */}
      <ellipse cx="100" cy="68" rx="44" ry="28" fill="#5a3a1a"/>
      <ellipse cx="75" cy="62" rx="18" ry="15" fill="#6a4a2a"/>
      <ellipse cx="125" cy="64" rx="16" ry="14" fill="#5a3a1a"/>
      {/* Face - friendly */}
      <ellipse cx="100" cy="108" rx="36" ry="40" fill="#F5D0A9"/>
      {/* Eyes - mischievous */}
      <ellipse cx="86" cy="100" rx="6" ry="4.5" fill="#fff"/>
      <circle cx="88" cy="100" r="2.5" fill="#3a2818"/>
      <ellipse cx="114" cy="100" rx="6" ry="4.5" fill="#fff"/>
      <circle cx="116" cy="100" r="2.5" fill="#3a2818"/>
      {/* Raised brow */}
      <path d="M76 93 Q86 87 96 93" fill="none" stroke="#5a3a1a" strokeWidth="1.8"/>
      <path d="M104 94 Q114 90 124 94" fill="none" stroke="#5a3a1a" strokeWidth="1.5"/>
      {/* Nose */}
      <path d="M100 104 Q96 115 93 117 Q100 120 107 117 Q104 115 100 104" fill="#E8B888"/>
      {/* Big grin */}
      <path d="M84 125 Q100 138 116 125" fill="#fff" stroke="#B87A5A" strokeWidth="1.2"/>
      <path d="M86 125 Q100 134 114 125" fill="#fff"/>
      {/* Casual collar */}
      <path d="M68 150 L100 156 L132 150 L130 175 L70 175Z" fill="#446"/>
      <path d="M88 148 Q100 152 112 148" fill="none" stroke="#557" strokeWidth="2"/>
      {/* Feynman diagram */}
      <line x1="145" y1="150" x2="165" y2="165" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      <path d="M155 155 Q160 150 165 155 Q160 160 155 155" fill="none" stroke={c} strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}

function PlanckPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.amber;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="pg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#pg)" stroke={c} strokeWidth="2"/>
      {/* Balding, some hair on sides */}
      <ellipse cx="100" cy="78" rx="38" ry="22" fill="#F5D0A9"/>
      <ellipse cx="62" cy="85" rx="14" ry="18" fill="#888"/>
      <ellipse cx="138" cy="85" rx="14" ry="18" fill="#888"/>
      {/* Face */}
      <ellipse cx="100" cy="108" rx="36" ry="40" fill="#F5D0A9"/>
      {/* Pince-nez glasses */}
      <circle cx="86" cy="100" r="10" fill="none" stroke="#777" strokeWidth="1.5"/>
      <circle cx="114" cy="100" r="10" fill="none" stroke="#777" strokeWidth="1.5"/>
      <line x1="96" y1="100" x2="104" y2="100" stroke="#777" strokeWidth="1.5"/>
      {/* Eyes */}
      <ellipse cx="86" cy="100" rx="4.5" ry="3.5" fill="#fff"/>
      <circle cx="87" cy="100" r="2" fill="#4a3a2a"/>
      <ellipse cx="114" cy="100" rx="4.5" ry="3.5" fill="#fff"/>
      <circle cx="115" cy="100" r="2" fill="#2a3a4a"/>
      {/* Mustache */}
      <path d="M84 120 Q92 126 100 122 Q108 126 116 120" fill="#777"/>
      {/* Mouth */}
      <path d="M92 128 Q100 131 108 128" fill="none" stroke="#B87A5A" strokeWidth="1"/>
      {/* Formal suit */}
      <path d="M68 150 L85 148 L100 160 L115 148 L132 150 L130 175 L70 175Z" fill="#222"/>
      <path d="M93 148 L100 160 L107 148" fill="#fff"/>
      <rect x="97" y="155" width="6" height="6" rx="1" fill="#333"/>
    </svg>
  );
}

function BohrPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.teal;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="brg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#brg)" stroke={c} strokeWidth="2"/>
      {/* Hair - neat, receding */}
      <ellipse cx="100" cy="72" rx="40" ry="24" fill="#6a5a3a"/>
      <ellipse cx="100" cy="64" rx="30" ry="16" fill="#7a6a4a"/>
      {/* Face - round, friendly */}
      <ellipse cx="100" cy="108" rx="38" ry="42" fill="#F5D0A9"/>
      {/* Eyes */}
      <ellipse cx="86" cy="100" rx="6" ry="4.5" fill="#fff"/>
      <circle cx="87" cy="100" r="2.5" fill="#4a5a6a"/>
      <ellipse cx="114" cy="100" rx="6" ry="4.5" fill="#fff"/>
      <circle cx="115" cy="100" r="2.5" fill="#4a5a6a"/>
      {/* Brows */}
      <path d="M76 94 Q86 90 96 94" fill="none" stroke="#5a4a3a" strokeWidth="1.5"/>
      <path d="M104 94 Q114 90 124 94" fill="none" stroke="#5a4a3a" strokeWidth="1.5"/>
      {/* Nose */}
      <path d="M100 104 Q97 115 94 117 Q100 120 106 117 Q103 115 100 104" fill="#E8B888"/>
      {/* Thoughtful smile */}
      <path d="M90 126 Q100 132 110 126" fill="none" stroke="#B87A5A" strokeWidth="1.5"/>
      {/* Suit */}
      <path d="M68 150 L85 148 L100 160 L115 148 L132 150 L130 175 L70 175Z" fill="#2a2a3a"/>
      <path d="M92 148 L100 160 L108 148" fill="#fff"/>
      {/* Atom orbits */}
      <ellipse cx="160" cy="50" rx="15" ry="6" fill="none" stroke={c} strokeWidth="1" opacity="0.4" transform="rotate(30 160 50)"/>
      <ellipse cx="160" cy="50" rx="15" ry="6" fill="none" stroke={c} strokeWidth="1" opacity="0.4" transform="rotate(-30 160 50)"/>
      <circle cx="160" cy="50" r="3" fill={c} opacity="0.5"/>
    </svg>
  );
}

function MaxwellPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.blue;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="mg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#mg)" stroke={c} strokeWidth="2"/>
      {/* Hair + massive beard */}
      <ellipse cx="100" cy="68" rx="44" ry="28" fill="#5a4a3a"/>
      <ellipse cx="60" cy="85" rx="18" ry="22" fill="#5a4a3a"/>
      <ellipse cx="140" cy="85" rx="18" ry="22" fill="#5a4a3a"/>
      {/* Face */}
      <ellipse cx="100" cy="100" rx="34" ry="32" fill="#F5D0A9"/>
      {/* Eyes */}
      <ellipse cx="86" cy="96" rx="5.5" ry="4" fill="#fff"/>
      <circle cx="87" cy="96" r="2.5" fill="#4a5a3a"/>
      <ellipse cx="114" cy="96" rx="5.5" ry="4" fill="#fff"/>
      <circle cx="115" cy="96" r="2.5" fill="#4a5a3a"/>
      {/* Brows */}
      <path d="M78 90 Q86 86 94 90" fill="none" stroke="#5a4a3a" strokeWidth="1.5"/>
      <path d="M106 90 Q114 86 122 90" fill="none" stroke="#5a4a3a" strokeWidth="1.5"/>
      {/* Nose */}
      <path d="M100 100 Q97 110 95 112 Q100 114 105 112 Q103 110 100 100" fill="#E8B888"/>
      {/* MASSIVE beard */}
      <path d="M65 108 Q60 140 80 165 Q100 175 120 165 Q140 140 135 108" fill="#6a5a4a"/>
      <path d="M70 115 Q65 140 85 160 Q100 168 115 160 Q135 140 130 115" fill="#7a6a5a"/>
      {/* Collar behind beard */}
      <rect x="75" y="155" width="50" height="15" rx="3" fill="#333"/>
    </svg>
  );
}

function RamanPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.green;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="rmg" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#rmg)" stroke={c} strokeWidth="2"/>
      {/* Turban */}
      <ellipse cx="100" cy="62" rx="40" ry="28" fill="#f5f0e0"/>
      <ellipse cx="100" cy="55" rx="35" ry="20" fill="#e8e0d0"/>
      <ellipse cx="100" cy="50" rx="28" ry="14" fill="#f0e8d8"/>
      {/* Face - South Indian */}
      <ellipse cx="100" cy="108" rx="35" ry="40" fill="#B8762E"/>
      {/* Eyes - sharp */}
      <ellipse cx="86" cy="100" rx="6" ry="4" fill="#fff"/>
      <circle cx="87" cy="100" r="2.5" fill="#1a1a0a"/>
      <ellipse cx="114" cy="100" rx="6" ry="4" fill="#fff"/>
      <circle cx="115" cy="100" r="2.5" fill="#1a1a0a"/>
      {/* Brows */}
      <path d="M78 94 Q86 90 94 94" fill="none" stroke="#3a2a0a" strokeWidth="1.5"/>
      <path d="M106 94 Q114 90 122 94" fill="none" stroke="#3a2a0a" strokeWidth="1.5"/>
      {/* Nose */}
      <path d="M100 104 Q96 115 93 117 Q100 120 107 117 Q104 115 100 104" fill="#A06820"/>
      {/* Proud smile */}
      <path d="M88 128 Q100 135 112 128" fill="none" stroke="#7A4A10" strokeWidth="1.8"/>
      {/* Formal suit */}
      <path d="M68 150 L85 148 L100 160 L115 148 L132 150 L130 175 L70 175Z" fill="#222"/>
      <path d="M93 148 L100 160 L107 148" fill="#fff"/>
      {/* Indian flag hint */}
      <rect x="152" y="150" width="14" height="3" fill="#f93"/>
      <rect x="152" y="153" width="14" height="3" fill="#fff"/>
      <rect x="152" y="156" width="14" height="3" fill="#128807"/>
    </svg>
  );
}

function FaradayPortrait({ s }: { s: number }) {
  const c = COLOR_HEX.blue;
  return (
    <svg width={s} height={s} viewBox="0 0 200 200">
      <defs>
        <radialGradient id="fag" cx="50%" cy="40%"><stop offset="0%" stopColor={c + '44'}/><stop offset="100%" stopColor="#0c0c14"/></radialGradient>
      </defs>
      <circle cx="100" cy="100" r="98" fill="url(#fag)" stroke={c} strokeWidth="2"/>
      {/* Curly hair */}
      <ellipse cx="100" cy="68" rx="42" ry="26" fill="#5a4a3a"/>
      <ellipse cx="70" cy="72" rx="15" ry="18" fill="#5a4a3a"/>
      <ellipse cx="130" cy="72" rx="15" ry="18" fill="#5a4a3a"/>
      {/* Face */}
      <ellipse cx="100" cy="106" rx="35" ry="40" fill="#F5D0A9"/>
      {/* Sideburns */}
      <rect x="63" y="90" width="8" height="25" rx="3" fill="#5a4a3a"/>
      <rect x="129" y="90" width="8" height="25" rx="3" fill="#5a4a3a"/>
      {/* Eyes - kind */}
      <ellipse cx="86" cy="100" rx="5.5" ry="4" fill="#fff"/>
      <circle cx="87" cy="100" r="2.5" fill="#4a5a6a"/>
      <ellipse cx="114" cy="100" rx="5.5" ry="4" fill="#fff"/>
      <circle cx="115" cy="100" r="2.5" fill="#4a5a6a"/>
      {/* Brows */}
      <path d="M78 94 Q86 91 94 95" fill="none" stroke="#5a4a3a" strokeWidth="1.3"/>
      <path d="M106 95 Q114 91 122 94" fill="none" stroke="#5a4a3a" strokeWidth="1.3"/>
      {/* Nose */}
      <path d="M100 104 Q97 113 95 115 Q100 117 105 115 Q103 113 100 104" fill="#E8B888"/>
      {/* Warm smile */}
      <path d="M90 124 Q100 130 110 124" fill="none" stroke="#B87A5A" strokeWidth="1.5"/>
      {/* Victorian coat + cravat */}
      <path d="M65 148 L85 146 L100 158 L115 146 L135 148 L132 175 L68 175Z" fill="#2a2a2a"/>
      <path d="M90 146 L100 155 L110 146" fill="#e8e0d0"/>
      <circle cx="100" cy="150" r="3" fill="#aaa"/>
      {/* Electromagnetic coil */}
      <ellipse cx="158" cy="160" rx="10" ry="8" fill="none" stroke={c} strokeWidth="1.5" opacity="0.4"/>
      <line x1="148" y1="160" x2="168" y2="160" stroke={c} strokeWidth="1" opacity="0.4"/>
    </svg>
  );
}

/* ── Portrait Router ── */
const PORTRAITS: Record<ScientistId, React.FC<{ s: number }>> = {
  newton: NewtonPortrait,
  einstein: EinsteinPortrait,
  ramanujan: RamanujanPortrait,
  bose: BosePortrait,
  noether: NoetherPortrait,
  galileo: GalileoPortrait,
  curie: CuriePortrait,
  tesla: TeslaPortrait,
  hawking: HawkingPortrait,
  feynman: FeynmanPortrait,
  planck: PlanckPortrait,
  bohr: BohrPortrait,
  maxwell: MaxwellPortrait,
  raman: RamanPortrait,
  faraday: FaradayPortrait,
};

export default function ScientistPortrait({ id, size = 120, showName = false }: PortraitProps) {
  const Portrait = PORTRAITS[id];
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <Portrait s={size} />
      {showName && (
        <span style={{ fontSize: size * 0.1, color: 'var(--t2)', fontWeight: 500 }}>
          {id.charAt(0).toUpperCase() + id.slice(1)}
        </span>
      )}
    </div>
  );
}
