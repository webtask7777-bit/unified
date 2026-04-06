'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SCIENTIST_PROFILES, ScientistId, SCIENTIST_IDS } from '@/lib/scientistProfiles';
import { useScientistChat } from '@/hooks/useScientistChat';
import { useCollabChat } from '@/hooks/useCollabChat';
import { COLLAB_TRACKS, CollabId } from '@/lib/collabData';
import ScientistPortrait from '@/components/shared/ScientistPortrait';

/* ── Voice Config per scientist ── */
const VOICE_CONFIG: Record<string, { rate: number; pitch: number; lang: string }> = {
  newton:   { rate: 0.92, pitch: 0.9,  lang: 'en-GB' },
  einstein: { rate: 0.95, pitch: 0.85, lang: 'en-US' },
  ramanujan:{ rate: 0.90, pitch: 1.0,  lang: 'en-IN' },
  bose:     { rate: 0.88, pitch: 0.95, lang: 'en-IN' },
  noether:  { rate: 0.94, pitch: 1.1,  lang: 'en-US' },
  galileo:  { rate: 0.93, pitch: 0.88, lang: 'en-US' },
  curie:    { rate: 0.90, pitch: 1.05, lang: 'en-US' },
  tesla:    { rate: 0.96, pitch: 0.82, lang: 'en-US' },
  hawking:  { rate: 0.78, pitch: 0.7,  lang: 'en-GB' },
  feynman:  { rate: 1.05, pitch: 1.0,  lang: 'en-US' },
  planck:   { rate: 0.88, pitch: 0.85, lang: 'en-US' },
  bohr:     { rate: 0.90, pitch: 0.9,  lang: 'en-GB' },
  maxwell:  { rate: 0.90, pitch: 0.88, lang: 'en-GB' },
  raman:    { rate: 0.92, pitch: 0.95, lang: 'en-IN' },
  faraday:  { rate: 0.90, pitch: 0.92, lang: 'en-GB' },
};

/* ── Scientist Avatar (uses 2D portrait for larger sizes) ── */
function ScientistAvatar({ id, size = 80 }: { id: ScientistId; size?: number }) {
  return <ScientistPortrait id={id} size={size} />;
}

/* ── Speak function ── */
function speak(text: string, scientistId: string, voiceOn: boolean) {
  if (!voiceOn || typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const clean = text.replace(/[*#_`~>|]/g, '').replace(/\n+/g, '. ').slice(0, 800);
  const utter = new SpeechSynthesisUtterance(clean);
  const cfg = VOICE_CONFIG[scientistId] || VOICE_CONFIG.newton;
  utter.rate = cfg.rate;
  utter.pitch = cfg.pitch;
  utter.lang = cfg.lang;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith(cfg.lang.split('-')[0]) && v.name.toLowerCase().includes('male') === (scientistId !== 'noether' && scientistId !== 'curie'));
  if (preferred) utter.voice = preferred;
  window.speechSynthesis.speak(utter);
}

function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/* ── Escape HTML ── */
function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* ── Quick chips per scientist ── */
const CHAT_CHIPS: Record<string, string[]> = {
  newton: ['Gravity kaise discover ki?', 'Calculus ka idea kahan se aaya?', 'Leibniz se kya hua tha?', 'Plague years mein kya kiya?'],
  einstein: ['E=mc² kaise socha?', 'Light beam wala thought experiment batao', 'Quantum mechanics se kyun disagree?', 'Violin kab bajate ho?'],
  ramanujan: ['1729 wali story batao', 'Namagiri Devi se kaise formulas aate the?', 'Hardy ko letter kyun likha?', 'Infinity ke baare mein kya sochte ho?'],
  bose: ['Einstein ko paper kyun bheja?', 'Boson naam kaise pada?', 'BEC kya hai simple mein?', 'Nobel na milne ka dard hai?'],
  noether: ['Symmetry aur conservation ka connection batao', 'Gender discrimination kaise face ki?', 'Einstein ne kya kaha tumhare baare mein?', 'Abstract algebra kyun important hai?'],
  galileo: ['Telescope se pehli baar kya dekha?', 'Church se kyun lada?', 'Pisa Tower experiment sach tha?', '"Eppur si muove" kab bola?'],
  curie: ['Radium kaise discover kiya?', 'Do Nobel Prizes — kaisa laga?', 'Pierre ke baare mein batao', 'WWI mein kya kiya?'],
  tesla: ['AC vs DC — Edison se kya hua?', 'Wardenclyffe Tower ka kya hua?', 'Dimag mein machine kaise build karte ho?', 'Wireless energy ka sapna batao'],
  hawking: ['Black hole se radiation kaise nikalti hai?', 'ALS se kaise lada?', 'Brief History of Time kyun likhi?', 'Time travel possible hai?'],
  feynman: ['Feynman Diagrams kaise banaye?', 'Manhattan Project ki koi story batao', 'Challenger disaster mein kya kiya?', 'Bongo drums kyun bajate ho?'],
  planck: ['Quantum accidentally kaise discover hua?', 'h constant kya hai simple mein?', 'UV catastrophe kya thi?', '"Funeral at a time" se kya matlab?'],
  bohr: ['Einstein se debates kaisi thi?', 'Complementarity kya hai?', 'Carlsberg wali free beer story batao', 'Atom model kaise banaya?'],
  maxwell: ['4 equations se duniya kaise badli?', 'Light electromagnetic wave hai — kaise pata chala?', 'Color photography kaise invent ki?', "Saturn's rings ka mystery kaise solve kiya?"],
  raman: ['Sea ka blue colour se kaise discovery hui?', 'Nobel Prize ceremony kaisa tha?', 'IISc kaise banaya?', 'National Science Day pe kya feel hota hai?'],
  faraday: ['Bookbinder se scientist kaise bane?', 'Electromagnetic induction kaise discover ki?', 'Christmas Lectures kaise shuru ki?', 'Knighthood kyun reject ki?'],
};

/* ── Color hex helper ── */
const COLOR_HEX: Record<string, string> = {
  green: '#3ecf8e', amber: '#f5a623', purple: '#a78bfa',
  coral: '#f87060', teal: '#38bdf8', blue: '#5b8ff9',
};

function getColorHex(colorVar: string): string {
  return COLOR_HEX[colorVar.replace('var(--', '').replace(')', '')] || '#a78bfa';
}

/* ── Main Component ── */
export default function ScientistChat() {
  const [mode, setMode] = useState<'solo' | 'collab'>('solo');
  const [selected, setSelected] = useState<ScientistId>('newton');
  const [collabId, setCollabId] = useState<CollabId>('newton-einstein');
  const [showGallery, setShowGallery] = useState(false);
  const [input, setInput] = useState('');
  const [voiceOn, setVoiceOn] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const soloChat = useScientistChat();
  const collabChat = useCollabChat();
  const chat = mode === 'solo' ? soloChat : collabChat;
  const { messages, isLoading, streamingContent, error } = chat;

  const profile = SCIENTIST_PROFILES[selected];
  const c = getColorHex(profile.color);

  const currentTrack = COLLAB_TRACKS.find(t => t.id === collabId);
  const collabColor1 = currentTrack ? getColorHex(currentTrack.colors[0]) : c;
  const collabColor2 = currentTrack ? getColorHex(currentTrack.colors[1]) : c;
  const activeColor = mode === 'solo' ? c : collabColor1;

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  // Track speechSynthesis state
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const interval = setInterval(() => {
      setIsSpeaking(window.speechSynthesis.speaking);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Stop speech on scientist/mode change
  useEffect(() => {
    stopSpeaking();
    soloChat.resetChat();
    collabChat.resetChat();
  }, [selected, mode, collabId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput('');
    let response: string | null;
    if (mode === 'solo') {
      response = await soloChat.sendMessage(text, selected);
      if (response) speak(response, selected, voiceOn);
    } else {
      response = await collabChat.sendMessage(text, collabId);
      if (response && currentTrack) speak(response, currentTrack.scientists[0], voiceOn);
    }
  }, [input, isLoading, mode, soloChat, collabChat, selected, collabId, voiceOn, currentTrack]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const chips = mode === 'solo'
    ? (CHAT_CHIPS[selected] || CHAT_CHIPS.newton)
    : (currentTrack?.quickChips || []);

  return (
    <div>
      {/* Header */}
      <h2 style={{ fontFamily: 'var(--font-dm-serif, "DM Serif Display", serif)', fontSize: 26, marginBottom: 4 }}>
        Scientist Chat
      </h2>
      <p style={{ color: 'var(--t2)', fontSize: 13, marginBottom: 12 }}>
        {mode === 'solo'
          ? 'Kisi bhi scientist se seedhi baat karo — avatar, voice, aur unki asli personality ke saath.'
          : 'Do scientists milke jawab denge — collaboration mode mein dono ki expertise ek saath!'}
      </p>

      {/* Mode Toggle + Gallery */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', gap: 4, background: 'var(--bg2)', borderRadius: 10, padding: 3, border: '1px solid var(--bd)', width: 'fit-content' }}>
        <button onClick={() => setMode('solo')} style={{
          background: mode === 'solo' ? activeColor + '22' : 'transparent',
          border: mode === 'solo' ? `1px solid ${activeColor}44` : '1px solid transparent',
          borderRadius: 8, padding: '6px 16px', cursor: 'pointer',
          color: mode === 'solo' ? activeColor : 'var(--t3)', fontSize: 12, fontWeight: mode === 'solo' ? 700 : 400,
          transition: 'all 0.2s',
        }}>
          Solo Chat
        </button>
        <button onClick={() => setMode('collab')} style={{
          background: mode === 'collab' ? collabColor1 + '22' : 'transparent',
          border: mode === 'collab' ? `1px solid ${collabColor1}44` : '1px solid transparent',
          borderRadius: 8, padding: '6px 16px', cursor: 'pointer',
          color: mode === 'collab' ? collabColor1 : 'var(--t3)', fontSize: 12, fontWeight: mode === 'collab' ? 700 : 400,
          transition: 'all 0.2s',
        }}>
          Collab Mode
        </button>
      </div>
      <button onClick={() => setShowGallery(!showGallery)} style={{
        background: showGallery ? activeColor + '22' : 'var(--bg2)',
        border: `1px solid ${showGallery ? activeColor + '44' : 'var(--bd)'}`,
        borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
        color: showGallery ? activeColor : 'var(--t3)', fontSize: 12, fontWeight: showGallery ? 700 : 400,
        transition: 'all 0.2s',
      }}>
        🖼️ Gallery
      </button>
      </div>

      {/* Gallery */}
      {showGallery && (
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--bd)', borderRadius: 14,
          padding: 16, marginBottom: 16,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, color: 'var(--t)' }}>
            Scientists Gallery — 2D Portraits
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: 12, justifyItems: 'center',
          }}>
            {SCIENTIST_IDS.map(id => {
              const p = SCIENTIST_PROFILES[id];
              const sc = getColorHex(p.color);
              const isSelected = mode === 'solo' && id === selected;
              return (
                <button key={id} onClick={() => { setSelected(id); setMode('solo'); setShowGallery(false); }} style={{
                  background: isSelected ? sc + '15' : 'transparent',
                  border: `2px solid ${isSelected ? sc : 'transparent'}`,
                  borderRadius: 14, padding: 8, cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  transition: 'all 0.2s',
                }}>
                  <ScientistPortrait id={id} size={80} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: isSelected ? sc : 'var(--t2)' }}>
                    {p.fullName.split(' ').pop()}
                  </span>
                  <span style={{ fontSize: 9, color: 'var(--t3)' }}>
                    {p.born.split(',').pop()?.trim()} — {p.died.split(',').pop()?.trim()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Solo: Scientist Selector */}
      {mode === 'solo' && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 10, marginBottom: 16 }}>
          {SCIENTIST_IDS.map(id => {
            const p = SCIENTIST_PROFILES[id];
            const active = id === selected;
            const sc = getColorHex(p.color);
            return (
              <button key={id} onClick={() => setSelected(id)} style={{
                background: active ? sc + '22' : 'var(--bg2)',
                border: `1.5px solid ${active ? sc : 'var(--bd)'}`,
                borderRadius: 10, padding: '8px 14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                color: active ? sc : 'var(--t2)', fontSize: 12, fontWeight: active ? 700 : 400,
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: 16 }}>{p.icon}</span>
                <span>{p.fullName.split(' ').pop()}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Collab: Track Selector */}
      {mode === 'collab' && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 10, marginBottom: 16 }}>
          {COLLAB_TRACKS.map(track => {
            const active = track.id === collabId;
            const tc = getColorHex(track.colors[0]);
            const p1 = SCIENTIST_PROFILES[track.scientists[0]];
            const p2 = SCIENTIST_PROFILES[track.scientists[1]];
            return (
              <button key={track.id} onClick={() => setCollabId(track.id)} style={{
                background: active ? tc + '22' : 'var(--bg2)',
                border: `1.5px solid ${active ? tc : 'var(--bd)'}`,
                borderRadius: 10, padding: '8px 14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                color: active ? tc : 'var(--t2)', fontSize: 12, fontWeight: active ? 700 : 400,
                transition: 'all 0.2s',
              }}>
                <span style={{ fontSize: 14 }}>{p1.icon}{p2.icon}</span>
                <span>{p1.fullName.split(' ').pop()} + {p2.fullName.split(' ').pop()}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Collab: Track Info Card */}
      {mode === 'collab' && currentTrack && (
        <div style={{
          background: 'var(--bg2)', border: '1px solid var(--bd)', borderRadius: 12,
          padding: 14, marginBottom: 14,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, color: collabColor1 }}>
            {currentTrack.title}
          </div>
          <div style={{ fontSize: 11, color: 'var(--t2)', marginBottom: 8 }}>
            {currentTrack.currentProgress}
          </div>
          {/* Progress bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--bg3)', overflow: 'hidden' }}>
              <div style={{
                width: `${currentTrack.progressPercent}%`, height: '100%', borderRadius: 2,
                background: `linear-gradient(90deg, ${collabColor1}, ${collabColor2})`,
                transition: 'width 0.5s',
              }} />
            </div>
            <span style={{ fontSize: 10, color: 'var(--t3)' }}>{currentTrack.progressPercent}%</span>
          </div>
          {/* Equations */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {currentTrack.sharedEquations.slice(0, 3).map((eq, i) => (
              <span key={i} style={{
                fontSize: 10, padding: '3px 8px', borderRadius: 6,
                background: getColorHex(SCIENTIST_PROFILES[eq.owner].color) + '15',
                color: getColorHex(SCIENTIST_PROFILES[eq.owner].color),
                border: `1px solid ${getColorHex(SCIENTIST_PROFILES[eq.owner].color)}22`,
              }}>
                {eq.formula}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--bd)', borderRadius: 14,
        overflow: 'hidden', marginBottom: 14,
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '14px 18px', borderBottom: `1px solid var(--bd)`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: activeColor + '08',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {mode === 'solo' ? (
              <>
                <ScientistAvatar id={selected} size={48} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{profile.fullName}</div>
                  <div style={{ color: c, fontSize: 11 }}>{profile.tagline.slice(0, 60)}...</div>
                </div>
              </>
            ) : currentTrack && (
              <>
                <div style={{ display: 'flex', marginRight: -8 }}>
                  <ScientistAvatar id={currentTrack.scientists[0]} size={42} />
                  <div style={{ marginLeft: -12 }}>
                    <ScientistAvatar id={currentTrack.scientists[1]} size={42} />
                  </div>
                </div>
                <div style={{ marginLeft: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>
                    {SCIENTIST_PROFILES[currentTrack.scientists[0]].fullName.split(' ').pop()} + {SCIENTIST_PROFILES[currentTrack.scientists[1]].fullName.split(' ').pop()}
                  </div>
                  <div style={{ color: collabColor1, fontSize: 11 }}>{currentTrack.topic}</div>
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {/* Voice toggle */}
            <button onClick={() => { setVoiceOn(!voiceOn); if (voiceOn) stopSpeaking(); }} style={{
              background: voiceOn ? activeColor + '22' : 'var(--bg3)',
              border: `1px solid ${voiceOn ? activeColor : 'var(--bd)'}`,
              borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
              color: voiceOn ? activeColor : 'var(--t3)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {voiceOn ? '🔊' : '🔇'} Voice
            </button>
            {/* Stop speaking */}
            {isSpeaking && (
              <button onClick={stopSpeaking} style={{
                background: 'var(--bg3)', border: '1px solid var(--bd)',
                borderRadius: 8, padding: '6px 10px', cursor: 'pointer',
                color: 'var(--coral)', fontSize: 12,
              }}>
                ⏹ Stop
              </button>
            )}
            {/* Reset */}
            <button onClick={() => { chat.resetChat(); stopSpeaking(); }} style={{
              background: 'var(--bg3)', border: '1px solid var(--bd)',
              borderRadius: 8, padding: '6px 10px', cursor: 'pointer',
              color: 'var(--t3)', fontSize: 12,
            }}>
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ height: 420, overflowY: 'auto', padding: '16px 18px' }}>
          {/* Empty state */}
          {messages.length === 0 && !streamingContent && (
            <div style={{ textAlign: 'center', paddingTop: 40 }}>
              {mode === 'solo' ? (
                <>
                  <ScientistAvatar id={selected} size={100} />
                  <div style={{ marginTop: 14, fontSize: 15, fontWeight: 600 }}>{profile.fullName}</div>
                  <div style={{ color: 'var(--t2)', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                    &ldquo;{profile.tagline}&rdquo;
                  </div>
                  <div style={{ color: 'var(--t3)', fontSize: 11, marginTop: 12 }}>
                    Kuch bhi poocho — {profile.fullName.split(' ').pop()} jawab denge apni style mein!
                  </div>
                </>
              ) : currentTrack && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                    <ScientistAvatar id={currentTrack.scientists[0]} size={70} />
                    <div style={{ marginLeft: -16 }}>
                      <ScientistAvatar id={currentTrack.scientists[1]} size={70} />
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>
                    {SCIENTIST_PROFILES[currentTrack.scientists[0]].fullName.split(' ').pop()} + {SCIENTIST_PROFILES[currentTrack.scientists[1]].fullName.split(' ').pop()}
                  </div>
                  <div style={{ color: collabColor1, fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>
                    {currentTrack.title}
                  </div>
                  <div style={{ color: 'var(--t3)', fontSize: 11, marginTop: 8 }}>
                    Dono scientists milke jawab denge — collaboration mode!
                  </div>
                </>
              )}
            </div>
          )}

          {/* Message bubbles */}
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 12, gap: 8, alignItems: 'flex-start',
            }}>
              {msg.role === 'assistant' && (
                mode === 'solo' ? (
                  <ScientistAvatar id={selected} size={32} />
                ) : currentTrack && (
                  <div style={{ display: 'flex', flexShrink: 0 }}>
                    <ScientistAvatar id={currentTrack.scientists[0]} size={28} />
                    <div style={{ marginLeft: -10 }}>
                      <ScientistAvatar id={currentTrack.scientists[1]} size={28} />
                    </div>
                  </div>
                )
              )}
              <div style={{
                maxWidth: '75%', padding: '10px 14px', borderRadius: 14,
                background: msg.role === 'user' ? activeColor + '22' : 'var(--bg3)',
                border: `1px solid ${msg.role === 'user' ? activeColor + '44' : 'var(--bd)'}`,
                borderTopLeftRadius: msg.role === 'assistant' ? 4 : 14,
                borderTopRightRadius: msg.role === 'user' ? 4 : 14,
              }}>
                <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 4 }}>
                  {msg.role === 'user' ? 'Aap' : (
                    mode === 'solo'
                      ? `${profile.icon} ${profile.fullName.split(' ').pop()}`
                      : currentTrack ? `${currentTrack.icons} Collab` : 'Collab'
                  )}
                </div>
                <div className="resp-body" style={{ fontSize: 13, lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{ __html: escapeHtml(msg.content) }}
                />
                {/* Re-speak button for assistant messages */}
                {msg.role === 'assistant' && voiceOn && (
                  <button onClick={() => {
                    const speakId = mode === 'solo' ? selected : (currentTrack?.scientists[0] || 'newton');
                    speak(msg.content, speakId, true);
                  }} style={{
                    background: 'none', border: 'none', color: activeColor, cursor: 'pointer',
                    fontSize: 11, marginTop: 4, padding: 0, opacity: 0.6,
                  }}>
                    🔊 Phir sunao
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Streaming message */}
          {streamingContent && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-start' }}>
              {mode === 'solo' ? (
                <ScientistAvatar id={selected} size={32} />
              ) : currentTrack && (
                <div style={{ display: 'flex', flexShrink: 0 }}>
                  <ScientistAvatar id={currentTrack.scientists[0]} size={28} />
                  <div style={{ marginLeft: -10 }}>
                    <ScientistAvatar id={currentTrack.scientists[1]} size={28} />
                  </div>
                </div>
              )}
              <div style={{
                maxWidth: '75%', padding: '10px 14px', borderRadius: 14, borderTopLeftRadius: 4,
                background: 'var(--bg3)', border: '1px solid var(--bd)',
              }}>
                <div style={{ fontSize: 10, color: 'var(--t3)', marginBottom: 4 }}>
                  {mode === 'solo'
                    ? `${profile.icon} ${profile.fullName.split(' ').pop()} likh raha hai...`
                    : currentTrack ? `${currentTrack.icons} Dono likh rahe hain...` : 'Likh rahe hain...'
                  }
                </div>
                <div className="resp-body" style={{ fontSize: 13, lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{ __html: escapeHtml(streamingContent) }}
                />
              </div>
            </div>
          )}

          {/* Loading dots */}
          {isLoading && !streamingContent && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-start' }}>
              {mode === 'solo' ? (
                <ScientistAvatar id={selected} size={32} />
              ) : currentTrack && (
                <div style={{ display: 'flex', flexShrink: 0 }}>
                  <ScientistAvatar id={currentTrack.scientists[0]} size={28} />
                  <div style={{ marginLeft: -10 }}>
                    <ScientistAvatar id={currentTrack.scientists[1]} size={28} />
                  </div>
                </div>
              )}
              <div style={{
                padding: '12px 18px', borderRadius: 14, borderTopLeftRadius: 4,
                background: 'var(--bg3)', border: '1px solid var(--bd)',
              }}>
                <span className="dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: activeColor, margin: '0 2px' }} />
                <span className="dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: activeColor, margin: '0 2px' }} />
                <span className="dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: activeColor, margin: '0 2px' }} />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{
              padding: 12, borderRadius: 10, background: 'rgba(248,112,96,0.1)',
              border: '1px solid rgba(248,112,96,0.3)', color: 'var(--coral)',
              fontSize: 12, marginBottom: 12,
            }}>
              ⚠️ {error}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick chips */}
        <div style={{
          padding: '8px 18px', borderTop: '1px solid var(--bd)',
          display: 'flex', gap: 6, overflowX: 'auto',
        }}>
          {chips.map((chip, i) => (
            <button key={i} onClick={() => setInput(chip)} style={{
              background: 'var(--bg3)', border: '1px solid var(--bd)', borderRadius: 16,
              padding: '5px 12px', fontSize: 11, color: 'var(--t2)', cursor: 'pointer',
              whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}>
              {chip}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div style={{
          padding: '12px 18px', borderTop: '1px solid var(--bd)',
          display: 'flex', gap: 10, alignItems: 'flex-end',
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode === 'solo'
              ? `${profile.fullName.split(' ').pop()} se kuch poocho...`
              : currentTrack ? `${SCIENTIST_PROFILES[currentTrack.scientists[0]].fullName.split(' ').pop()} + ${SCIENTIST_PROFILES[currentTrack.scientists[1]].fullName.split(' ').pop()} se poocho...` : 'Poocho...'
            }
            rows={2}
            style={{ flex: 1, fontSize: 13 }}
            disabled={isLoading}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading || !input.trim()}
            style={{
              background: activeColor, color: '#000', border: 'none', borderRadius: 10,
              padding: '10px 18px', cursor: isLoading ? 'not-allowed' : 'pointer',
              fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap',
              opacity: isLoading || !input.trim() ? 0.4 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {isLoading ? '...' : 'Bhejo →'}
          </button>
        </div>
      </div>

      {/* Info footer */}
      <div style={{ fontSize: 10, color: 'var(--t3)', textAlign: 'center' }}>
        Ctrl+Enter se bhejo • 🔊 Voice toggle se awaaz on/off • {mode === 'solo' ? 'Har scientist ki unique personality hai' : 'Collab mode mein dono scientists milke jawab dete hain'}
      </div>
    </div>
  );
}
