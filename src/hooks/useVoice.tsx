'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/* ── Premium Voice Selection ── */
// Prioritize high-quality / Enhanced voices for natural sound
const PREMIUM_VOICE_NAMES = [
  'Enhanced', 'Premium', 'Natural', 'Neural',
  'Samantha', 'Daniel', 'Karen', 'Moira', 'Tessa', 'Alex',
  'Rishi', 'Veena', 'Lekha', 'Sangeeta',
  'Google', 'Microsoft',
];

const VOICE_PROFILES: Record<string, { rate: number; pitch: number; lang: string; gender: 'male' | 'female' }> = {
  newton:    { rate: 0.92, pitch: 0.90, lang: 'en-GB', gender: 'male' },
  einstein:  { rate: 0.95, pitch: 0.85, lang: 'en-US', gender: 'male' },
  ramanujan: { rate: 0.90, pitch: 1.00, lang: 'en-IN', gender: 'male' },
  bose:      { rate: 0.88, pitch: 0.95, lang: 'en-IN', gender: 'male' },
  noether:   { rate: 0.94, pitch: 1.10, lang: 'en-US', gender: 'female' },
  galileo:   { rate: 0.93, pitch: 0.88, lang: 'en-US', gender: 'male' },
  curie:     { rate: 0.90, pitch: 1.05, lang: 'en-US', gender: 'female' },
  tesla:     { rate: 0.96, pitch: 0.82, lang: 'en-US', gender: 'male' },
  hawking:   { rate: 0.78, pitch: 0.70, lang: 'en-GB', gender: 'male' },
  feynman:   { rate: 1.05, pitch: 1.00, lang: 'en-US', gender: 'male' },
  planck:    { rate: 0.88, pitch: 0.85, lang: 'en-US', gender: 'male' },
  bohr:      { rate: 0.90, pitch: 0.90, lang: 'en-GB', gender: 'male' },
  maxwell:   { rate: 0.90, pitch: 0.88, lang: 'en-GB', gender: 'male' },
  raman:     { rate: 0.92, pitch: 0.95, lang: 'en-IN', gender: 'male' },
  faraday:   { rate: 0.90, pitch: 0.92, lang: 'en-GB', gender: 'male' },
  // Default for tools/discovery
  default:   { rate: 0.94, pitch: 0.95, lang: 'en-US', gender: 'male' },
  discovery: { rate: 0.96, pitch: 0.90, lang: 'en-US', gender: 'male' },
};

/* ── Find best available voice ── */
function findBestVoice(lang: string, gender: 'male' | 'female'): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const langPrefix = lang.split('-')[0];
  const isFemale = gender === 'female';

  // Score each voice — higher = better
  const scored = voices
    .filter(v => v.lang.startsWith(langPrefix) || v.lang.startsWith('en'))
    .map(v => {
      let score = 0;
      const name = v.name.toLowerCase();
      // Exact language match
      if (v.lang === lang) score += 10;
      else if (v.lang.startsWith(langPrefix)) score += 7;
      else score += 2; // any English

      // Premium/Enhanced voices get huge boost
      if (name.includes('enhanced')) score += 25;
      if (name.includes('premium')) score += 22;
      if (name.includes('natural')) score += 20;
      if (name.includes('neural')) score += 18;

      // Named high-quality voices
      for (const prem of PREMIUM_VOICE_NAMES) {
        if (name.includes(prem.toLowerCase())) { score += 8; break; }
      }

      // Gender matching (heuristic)
      const femaleNames = ['samantha', 'karen', 'moira', 'tessa', 'veena', 'lekha', 'sangeeta', 'fiona', 'victoria', 'zira'];
      const maleNames = ['daniel', 'alex', 'rishi', 'fred', 'david', 'mark', 'james'];
      const isFemaleVoice = femaleNames.some(f => name.includes(f));
      const isMaleVoice = maleNames.some(m => name.includes(m));
      if (isFemale && isFemaleVoice) score += 5;
      if (!isFemale && isMaleVoice) score += 5;

      return { voice: v, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.length > 0 ? scored[0].voice : voices[0];
}

/* ── Clean text for speech ── */
function cleanForSpeech(text: string): string {
  return text
    .replace(/[*#_`~>|]/g, '')           // markdown chars
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // markdown links → text only
    .replace(/#{1,4}\s*/g, '')            // heading markers
    .replace(/\n{2,}/g, '. ')            // double newlines → pause
    .replace(/\n/g, ', ')               // single newlines → brief pause
    .replace(/\s{2,}/g, ' ')             // multiple spaces
    .replace(/[→←↑↓∞∂∇∫∑∏√±×÷≈≠≤≥]/g, '') // math symbols
    .replace(/\d+\.\s/g, '. ')           // numbered lists
    .replace(/•/g, ',')                  // bullets → comma pause
    .trim();
}

/* ── Split into sentences for natural flow ── */
function splitSentences(text: string): string[] {
  // Split on sentence boundaries but keep chunks reasonable
  const raw = text.match(/[^.!?]+[.!?]+\s*|[^.!?]+$/g) || [text];
  const chunks: string[] = [];
  let current = '';

  for (const sentence of raw) {
    if ((current + sentence).length > 200) {
      if (current) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

/* ── The Hook ── */
export function useVoice(voiceId: string = 'default') {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [speed, setSpeed] = useState<number>(1); // 1 = normal, multiplier
  const utteranceQueue = useRef<SpeechSynthesisUtterance[]>([]);
  const currentIndex = useRef(0);

  // Load voices (some browsers load async)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.getVoices(); // trigger load
    const handler = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', handler);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', handler);
  }, []);

  // Track speaking state
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const interval = setInterval(() => {
      setIsSpeaking(window.speechSynthesis.speaking);
      setIsPaused(window.speechSynthesis.paused);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const speak = useCallback((text: string, overrideId?: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const id = overrideId || voiceId;
    const profile = VOICE_PROFILES[id] || VOICE_PROFILES.default;
    const cleaned = cleanForSpeech(text);
    const sentences = splitSentences(cleaned);

    const voice = findBestVoice(profile.lang, profile.gender);
    utteranceQueue.current = [];
    currentIndex.current = 0;

    const speakNext = () => {
      if (currentIndex.current >= utteranceQueue.current.length) {
        setIsSpeaking(false);
        return;
      }
      const utter = utteranceQueue.current[currentIndex.current];
      utter.onend = () => {
        currentIndex.current++;
        // Natural pause between sentences (150ms)
        setTimeout(speakNext, 150);
      };
      utter.onerror = () => {
        currentIndex.current++;
        speakNext();
      };
      window.speechSynthesis.speak(utter);
    };

    for (const sentence of sentences) {
      const utter = new SpeechSynthesisUtterance(sentence);
      utter.rate = profile.rate * speed;
      utter.pitch = profile.pitch;
      utter.lang = profile.lang;
      if (voice) utter.voice = voice;
      utteranceQueue.current.push(utter);
    }

    setIsSpeaking(true);
    speakNext();
  }, [voiceId, speed]);

  const stop = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    utteranceQueue.current = [];
    currentIndex.current = 0;
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceOn(prev => {
      if (prev) {
        // turning off — stop current speech
        window.speechSynthesis?.cancel();
        utteranceQueue.current = [];
        setIsSpeaking(false);
      }
      return !prev;
    });
  }, []);

  const cycleSpeed = useCallback(() => {
    setSpeed(prev => {
      if (prev === 1) return 1.25;
      if (prev === 1.25) return 1.5;
      if (prev === 1.5) return 0.8;
      return 1;
    });
  }, []);

  return {
    speak,
    stop,
    pause,
    resume,
    toggleVoice,
    cycleSpeed,
    isSpeaking,
    isPaused,
    voiceOn,
    speed,
  };
}

/* ── Compact Voice Controls Component ── */
export function VoiceControls({
  voiceOn, isSpeaking, isPaused, speed,
  onToggle, onStop, onPause, onResume, onCycleSpeed,
  color = 'var(--t2)',
  compact = false,
}: {
  voiceOn: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  speed: number;
  onToggle: () => void;
  onStop: () => void;
  onPause: () => void;
  onResume: () => void;
  onCycleSpeed: () => void;
  color?: string;
  compact?: boolean;
}) {
  const btnStyle: React.CSSProperties = {
    background: 'none', border: '1px solid var(--bd)',
    borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit',
    color, padding: compact ? '3px 6px' : '4px 8px',
    fontSize: compact ? 11 : 12, display: 'flex', alignItems: 'center', gap: 3,
    transition: 'all 0.15s',
  };

  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {/* Voice On/Off */}
      <button onClick={onToggle} style={{
        ...btnStyle,
        background: voiceOn ? color + '18' : 'none',
        borderColor: voiceOn ? color : 'var(--bd)',
      }} title={voiceOn ? 'Voice OFF karo' : 'Voice ON karo'}>
        {voiceOn ? '🔊' : '🔇'}
      </button>

      {/* Play/Pause/Stop — only when speaking */}
      {isSpeaking && (
        <>
          <button onClick={isPaused ? onResume : onPause} style={btnStyle}
            title={isPaused ? 'Resume' : 'Pause'}>
            {isPaused ? '▶️' : '⏸️'}
          </button>
          <button onClick={onStop} style={btnStyle} title="Stop">⏹️</button>
        </>
      )}

      {/* Speed */}
      {voiceOn && (
        <button onClick={onCycleSpeed} style={{
          ...btnStyle, fontSize: compact ? 10 : 11, fontWeight: 600,
        }} title="Speed change karo">
          {speed}x
        </button>
      )}
    </div>
  );
}

/* ── Inline speak button for individual messages ── */
export function SpeakButton({
  text, voiceId = 'default', color = 'var(--t3)', size = 14,
}: {
  text: string;
  voiceId?: string;
  color?: string;
  size?: number;
}) {
  const handleSpeak = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const profile = VOICE_PROFILES[voiceId] || VOICE_PROFILES.default;
    const cleaned = cleanForSpeech(text);
    const sentences = splitSentences(cleaned);
    const voice = findBestVoice(profile.lang, profile.gender);

    let idx = 0;
    const speakNext = () => {
      if (idx >= sentences.length) return;
      const utter = new SpeechSynthesisUtterance(sentences[idx]);
      utter.rate = profile.rate;
      utter.pitch = profile.pitch;
      utter.lang = profile.lang;
      if (voice) utter.voice = voice;
      utter.onend = () => { idx++; speakNext(); };
      window.speechSynthesis.speak(utter);
    };
    speakNext();
  };

  return (
    <button
      onClick={handleSpeak}
      title="Sunno"
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: size, color, padding: 0, lineHeight: 1,
        opacity: 0.6, transition: 'opacity 0.15s',
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
    >
      🔊
    </button>
  );
}
