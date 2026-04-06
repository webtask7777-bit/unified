'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { DARKMATTER_CHIPS, MOTION_CHIPS, TIMEDILATION_CHIPS, WORMHOLE_CHIPS, FREEENERGY_CHIPS, UNIFIEDFIELD_CHIPS, BLACKHOLE_CHIPS, RAMANUJAN_MATH_CHIPS, NOETHER_SYMMETRY_CHIPS, BOSE_QUANTUM_CHIPS } from '@/lib/constants';
import { ChipPreset } from '@/lib/types';
import { STATIC_ARTICLES } from '@/lib/articles';
import { COLLAB_TRACKS, LATEST_DISCOVERIES, FINAL_BREAKTHROUGHS, ECHO_EVENTS, ECHO_ANALYSIS, SCIENTIST_FINAL_STATEMENTS, CollabId } from '@/lib/collabData';
import { SCIENTIST_PROFILES } from '@/lib/scientistProfiles';
import ScientistBadge from '@/components/shared/ScientistBadge';
import ExplainDiagram, { EchoTimeDelayDiagram } from '@/components/shared/ExplainDiagrams';
import { GroupDiagram, SeedhiBaat } from './ArticleVisuals';
import { FormulaCard } from './FormulaCards';
import { formatArticleHtml } from '@/lib/formatArticle';

const ResearchLabScene = dynamic(() => import('@/components/3d/ResearchLabScene'), { ssr: false });
const CollabResearchScene = dynamic(() => import('@/components/3d/CollabResearchScene'), { ssr: false });

interface ArticleGroup {
  tool: string;
  icon: string;
  title: string;
  scientists: string;
  color: string;
  chips: ChipPreset[];
}

const ARTICLE_GROUPS: ArticleGroup[] = [
  { tool: 'darkmatter', icon: '🌌', title: 'Dark Matter Research', scientists: 'Newton', color: 'var(--purple)', chips: DARKMATTER_CHIPS },
  { tool: 'motion', icon: '🔭', title: 'Orbital Mechanics Research', scientists: 'Newton', color: 'var(--green)', chips: MOTION_CHIPS },
  { tool: 'timedilation', icon: '🕰️', title: 'Relativity Research', scientists: 'Einstein', color: 'var(--amber)', chips: TIMEDILATION_CHIPS },
  { tool: 'wormhole', icon: '🌀', title: 'Spacetime Engineering Research', scientists: 'Einstein', color: 'var(--coral)', chips: WORMHOLE_CHIPS },
  { tool: 'freeenergy', icon: '⚡', title: 'Energy Physics Research', scientists: 'Newton + Einstein', color: 'var(--teal)', chips: FREEENERGY_CHIPS },
  { tool: 'unifiedfield', icon: '🧬', title: 'Unified Field Theory Research', scientists: 'Newton + Einstein + Ramanujan + Bose + Noether', color: 'var(--amber)', chips: UNIFIEDFIELD_CHIPS },
  { tool: 'blackhole', icon: '🕳️', title: 'Black Hole Research', scientists: 'Einstein + Bose', color: 'var(--coral)', chips: BLACKHOLE_CHIPS },
  { tool: 'ramanujanmath', icon: '🔢', title: 'Mathematical Universe', scientists: 'Ramanujan', color: 'var(--teal)', chips: RAMANUJAN_MATH_CHIPS },
  { tool: 'noethersymmetry', icon: '⚖️', title: 'Symmetry Laws', scientists: 'Noether', color: 'var(--green)', chips: NOETHER_SYMMETRY_CHIPS },
  { tool: 'bosequantum', icon: '🌊', title: 'Quantum World', scientists: 'Bose', color: 'var(--purple)', chips: BOSE_QUANTUM_CHIPS },
];

const COLOR_HEX: Record<string, string> = {
  green: '#3ecf8e', amber: '#f5a623', purple: '#a78bfa',
  coral: '#f87060', teal: '#38bdf8', blue: '#5b8ff9',
};
function getColorHex(v: string): string {
  return COLOR_HEX[v.replace('var(--', '').replace(')', '')] || '#a78bfa';
}

const ADVANCED_ARTICLES = COLLAB_TRACKS.map((track, i) => ({
  key: `13-${i}`,
  icons: track.icons,
  names: `${SCIENTIST_PROFILES[track.scientists[0]].fullName.split(' ').pop()} + ${SCIENTIST_PROFILES[track.scientists[1]].fullName.split(' ').pop()}`,
  title: track.title,
  topic: track.topic,
  color1: track.colors[0],
  color2: track.colors[1],
}));

const FINAL_ARTICLES = COLLAB_TRACKS.map((track, i) => ({
  key: `16-${i}`,
  icons: track.icons,
  names: `${SCIENTIST_PROFILES[track.scientists[0]].fullName.split(' ').pop()} + ${SCIENTIST_PROFILES[track.scientists[1]].fullName.split(' ').pop()}`,
  title: FINAL_BREAKTHROUGHS[i]?.title || track.title,
  collabId: track.id,
  color1: track.colors[0],
  color2: track.colors[1],
}));


type ArticleKey = string;
function makeKey(groupIdx: number, chipIdx: number): ArticleKey {
  return `${groupIdx}-${chipIdx}`;
}

export default function ResearchLab() {
  const [visible, setVisible] = useState<Record<ArticleKey, boolean>>({});
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const articleRefs = useRef<Record<ArticleKey, HTMLDivElement | null>>({});

  const showArticle = useCallback((groupIdx: number, chipIdx: number) => {
    const key = makeKey(groupIdx, chipIdx);
    setVisible(prev => ({ ...prev, [key]: true }));
    // Scroll to article after render
    setTimeout(() => {
      articleRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }, []);

  const showAll = useCallback(() => {
    const allVisible: Record<ArticleKey, boolean> = {};
    const allExpanded: Record<number, boolean> = {};
    ARTICLE_GROUPS.forEach((group, gIdx) => {
      allExpanded[gIdx] = true;
      group.chips.forEach((_, cIdx) => {
        allVisible[makeKey(gIdx, cIdx)] = true;
      });
    });
    setVisible(allVisible);
    setExpanded(allExpanded);
  }, []);

  const [activeSection, setActiveSection] = useState('articles');

  // IntersectionObserver for sticky TOC active section
  useEffect(() => {
    const sectionIds = ['section-articles', 'section-joint', 'section-collab-3d', 'section-discoveries', 'section-echo', 'section-final', 'section-statements', 'section-diagrams'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const TOC_ITEMS = [
    { id: 'section-articles', label: 'Research Articles', icon: '📜' },
    { id: 'section-joint', label: 'Joint Research', icon: '🤝' },
    { id: 'section-collab-3d', label: '3D Network', icon: '🔬' },
    { id: 'section-discoveries', label: 'Discoveries', icon: '🏆' },
    { id: 'section-echo', label: 'Echo Analysis', icon: '🔭' },
    { id: 'section-final', label: 'Final Breakthroughs', icon: '🏆' },
    { id: 'section-statements', label: 'Final Statements', icon: '🎙️' },
    { id: 'section-diagrams', label: 'Diagrams', icon: '📊' },
  ];

  const totalQuestions = ARTICLE_GROUPS.reduce((sum, g) => sum + g.chips.length, 0);
  const visibleCount = Object.values(visible).filter(Boolean).length;

  return (
    <div className="relative">
      {/* ── Sticky TOC — visible on lg+ screens ── */}
      <div className="hidden xl:block fixed right-6 top-[80px] w-[170px] z-30">
        <div className="rounded-[12px] border border-bd p-3" style={{ background: 'var(--bg2)', backdropFilter: 'blur(12px)' }}>
          <div className="text-[11px] font-medium mb-2" style={{ color: 'var(--t3)' }}>SECTIONS</div>
          <div className="space-y-0.5">
            {TOC_ITEMS.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1.5 py-1.5 px-2 rounded-lg cursor-pointer transition-all text-[12px]"
                style={{
                  color: activeSection === item.id ? 'var(--green)' : 'var(--t2)',
                  background: activeSection === item.id ? 'var(--gdim)' : 'transparent',
                  fontWeight: activeSection === item.id ? 600 : 400,
                }}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <span className="text-[11px]">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ResearchLabScene />
      <div className="mb-6">
        <ScientistBadge
          initial="📜"
          name="UNIFIED Research Lab"
          subtitle="Sab scientists — sab sawaalon ke jawab"
          bgColor="var(--pdim)"
          textColor="var(--purple)"
        />
        <div style={{ fontFamily: "var(--font-dm-serif), serif", fontSize: 26, marginBottom: 4, lineHeight: 1.2 }}>
          Research Lab — Articles & Khoj
        </div>
        <div className="text-[13px] max-w-[580px] leading-relaxed" style={{ color: 'var(--t2)' }}>
          Sare scientists se anurodh — har sawaal ka jawab dhoondha, research article likha,
          aur naye khoj pe signature aur date dala! Sab articles ready hain — padho!
        </div>
      </div>

      {/* Progress + Show All */}
      <div className="rounded-[14px] border border-bd p-4 mb-4 flex items-center justify-between flex-wrap gap-3" style={{ background: 'var(--bg2)' }}>
        <div>
          <div className="text-xs font-medium mb-1">
            Research Articles: {visibleCount} / {totalQuestions} dekhe
          </div>
          <div className="h-2 rounded-full overflow-hidden w-[200px]" style={{ background: 'var(--bg3)' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${(visibleCount / totalQuestions) * 100}%`, background: 'var(--purple)' }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          {visibleCount < totalQuestions && (
            <button
              onClick={showAll}
              className="bg-accent-blue text-white border-none rounded-[9px] py-2 px-4 text-xs font-medium cursor-pointer transition-all hover:opacity-88 active:scale-[0.98]"
              style={{ fontFamily: 'inherit' }}
            >
              Sab Articles Dikhaao ({totalQuestions})
            </button>
          )}
          {visibleCount === totalQuestions && (
            <span className="text-xs py-2 px-3" style={{ color: 'var(--green)' }}>
              Sab {totalQuestions} articles ready hain!
            </span>
          )}
        </div>
      </div>

      {/* Quick-jump pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {ARTICLE_GROUPS.map((group, gIdx) => (
          <button
            key={group.tool}
            className="flex items-center gap-1.5 text-[12px] py-1.5 px-3 rounded-full border cursor-pointer transition-all hover:scale-105 active:scale-95"
            style={{
              borderColor: expanded[gIdx] ? getColorHex(group.color) : 'var(--bd)',
              background: expanded[gIdx] ? getColorHex(group.color) + '15' : 'var(--bg2)',
              color: expanded[gIdx] ? getColorHex(group.color) : 'var(--t2)',
              fontFamily: 'inherit',
            }}
            onClick={() => {
              setExpanded(prev => ({ ...prev, [gIdx]: !prev[gIdx] }));
              if (!expanded[gIdx]) {
                setTimeout(() => {
                  document.getElementById(`group-${gIdx}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }
            }}
          >
            <span>{group.icon}</span>
            <span>{group.title.split(' ').slice(0, 2).join(' ')}</span>
          </button>
        ))}
      </div>

      {/* Article Groups */}
      <div id="section-articles">
      {ARTICLE_GROUPS.map((group, gIdx) => (
        <div key={group.tool} id={`group-${gIdx}`} className="mb-6">
          {/* Group header */}
          <div
            className="rounded-t-[14px] border border-bd p-3.5 flex items-center justify-between cursor-pointer transition-colors hover:border-bd2"
            style={{ background: 'var(--bg2)', borderBottom: expanded[gIdx] ? 'none' : undefined }}
            onClick={() => setExpanded(prev => ({ ...prev, [gIdx]: !prev[gIdx] }))}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{group.icon}</span>
              <div>
                <div className="text-sm font-medium">{group.title}</div>
                <div className="text-[12px]" style={{ color: 'var(--t3)' }}>{group.scientists} — {group.chips.length} articles</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px]" style={{ color: 'var(--t3)' }}>
                {group.chips.filter((_, cIdx) => visible[makeKey(gIdx, cIdx)]).length}/{group.chips.length}
              </span>
              <span className="text-xs" style={{ color: 'var(--t3)', transform: expanded[gIdx] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                ▼
              </span>
            </div>
          </div>

          {/* Questions & Articles */}
          {expanded[gIdx] && (
            <div className="border border-bd border-t-0 rounded-b-[14px] overflow-hidden" style={{ background: 'var(--bg2)' }}>
              {/* Topic diagram */}
              <div className="p-3">
                <GroupDiagram groupIdx={gIdx} />
              </div>
              {group.chips.map((chip, cIdx) => {
                const key = makeKey(gIdx, cIdx);
                const isVisible = visible[key];
                const article = STATIC_ARTICLES[key];

                return (
                  <div
                    key={cIdx}
                    ref={(el) => { articleRefs.current[key] = el; }}
                    className="border-t border-bd"
                  >
                    {/* Question row */}
                    <div className="p-3.5 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-sm">{chip.icon}</span>
                          <span className="text-xs font-medium">{chip.label}</span>
                          {isVisible && (
                            <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: 'var(--gdim)', color: 'var(--green)' }}>
                              Published
                            </span>
                          )}
                          {article?.includes('Naya Khoj') && (
                            <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: 'var(--adim)', color: 'var(--amber)' }}>
                              Naya Khoj!
                            </span>
                          )}
                        </div>
                        <div className="text-[13px] leading-relaxed" style={{ color: 'var(--t3)' }}>
                          {chip.value.slice(0, 120)}...
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (isVisible) {
                            setVisible(prev => ({ ...prev, [key]: false }));
                          } else {
                            showArticle(gIdx, cIdx);
                          }
                        }}
                        className="text-[13px] py-1.5 px-3 rounded-[9px] border cursor-pointer transition-all hover:opacity-80 shrink-0"
                        style={{
                          background: isVisible ? 'var(--bg3)' : 'none',
                          borderColor: 'var(--bd2)',
                          color: 'var(--t2)',
                          fontFamily: 'inherit',
                        }}
                      >
                        {isVisible ? 'Band karo' : 'Article padho'}
                      </button>
                    </div>

                    {/* Article content */}
                    {isVisible && article && (
                      <div className="mx-3.5 mb-3">
                        <SeedhiBaat articleKey={key} />
                        <FormulaCard articleKey={key} />
                        <div
                          className="p-4 rounded-xl border border-bd text-sm leading-[2]"
                          style={{
                            background: 'var(--bg3)',
                            whiteSpace: 'pre-wrap',
                            borderLeft: `3px solid ${group.color}`,
                          }}
                          dangerouslySetInnerHTML={{ __html: formatArticleHtml(article) }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
      </div>

      {/* ── Advanced Joint Research (Group 13) ── */}
      <div id="section-joint" className="mt-10 mb-6">
        <div className="flex items-center gap-2 mb-3 border-b border-bd pb-3">
          <span className="text-lg">🤝</span>
          <div>
            <div className="text-base font-semibold" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>Advanced Joint Research — Sanyukt Anusandhan</div>
            <div className="text-[12px]" style={{ color: 'var(--t3)' }}>Newton ke 4 collaboration tracks — next level research</div>
          </div>
        </div>
        <div className="text-[13px] mb-3 leading-relaxed" style={{ color: 'var(--t3)' }}>
          Newton ne 4 scientists ko invite kiya — milke deeper research karo! GW pipelines, N-body solutions, BEC sensors, aur Dark Parity.
        </div>
      </div>

      <div className="border border-bd rounded-[14px] overflow-hidden mb-4" style={{ background: 'var(--bg2)' }}>
        {ADVANCED_ARTICLES.map((a, i) => {
          const isVisible = visible[a.key];
          const article = STATIC_ARTICLES[a.key];
          const c1 = getColorHex(a.color1);
          const c2 = getColorHex(a.color2);

          return (
            <div
              key={a.key}
              ref={(el) => { articleRefs.current[a.key] = el; }}
              className={i > 0 ? 'border-t border-bd' : ''}
            >
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="text-[11px] py-0.5 px-1.5 rounded-full mr-1" style={{ background: c1 + '18', color: c1 }}>{a.icons.slice(0, 2)}</span>
                    <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: c2 + '18', color: c2 }}>{a.icons.slice(2) || a.icons.slice(1)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium">{a.names}</span>
                      {isVisible && (
                        <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: 'var(--gdim)', color: 'var(--green)' }}>
                          Published
                        </span>
                      )}
                      <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: 'var(--pdim)', color: 'var(--purple)' }}>
                        Advanced
                      </span>
                    </div>
                    <div className="text-[12px]" style={{ color: 'var(--t3)' }}>{a.title}</div>
                    <div className="text-[13px]" style={{ color: c1 }}>{a.topic}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (isVisible) {
                      setVisible(prev => ({ ...prev, [a.key]: false }));
                    } else {
                      setVisible(prev => ({ ...prev, [a.key]: true }));
                      setTimeout(() => {
                        articleRefs.current[a.key]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }, 100);
                    }
                  }}
                  className="text-[13px] py-1.5 px-3 rounded-[9px] border cursor-pointer transition-all hover:opacity-80 shrink-0"
                  style={{
                    background: isVisible ? 'var(--bg3)' : 'none',
                    borderColor: 'var(--bd2)',
                    color: 'var(--t2)',
                    fontFamily: 'inherit',
                  }}
                >
                  {isVisible ? 'Band karo' : 'Article padho'}
                </button>
              </div>

              {isVisible && article && (
                <div className="mx-3.5 mb-3">
                  <SeedhiBaat articleKey={a.key} />
                  <FormulaCard articleKey={a.key} />
                  <div
                    className="p-4 rounded-xl border border-bd text-sm leading-[2]"
                    style={{
                      background: 'var(--bg3)',
                      whiteSpace: 'pre-wrap',
                      borderLeft: `3px solid ${c1}`,
                      borderRight: `3px solid ${c2}`,
                    }}
                    dangerouslySetInnerHTML={{ __html: formatArticleHtml(article) }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 3D Collaboration Research Visualization ── */}
      <div id="section-collab-3d" className="mt-10 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🔬</span>
          <div>
            <div className="text-sm font-medium">Live Research Network — 3D Visualization</div>
            <div className="text-[12px]" style={{ color: 'var(--t3)' }}>Newton ke 4 collaboration beams — real-time progress</div>
          </div>
        </div>
        <div className="rounded-[14px] border border-bd overflow-hidden" style={{ background: 'var(--bg2)' }}>
          <CollabResearchScene />
          <div className="p-3 flex flex-wrap gap-2 justify-center border-t border-bd">
            {COLLAB_TRACKS.map((track, idx) => {
              const c2 = getColorHex(track.colors[1]);
              const articleKey = `16-${idx}`;
              return (
                <div
                  key={track.id}
                  className="flex items-center gap-1.5 text-[12px] py-1 px-2 rounded-full cursor-pointer transition-all hover:scale-105 active:scale-95"
                  style={{ background: c2 + '15', color: c2 }}
                  onClick={() => {
                    setVisible(prev => ({ ...prev, [articleKey]: true }));
                    setTimeout(() => {
                      articleRefs.current[articleKey]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }}
                >
                  <span>{track.icons}</span>
                  <span>{track.title.split('—')[0].trim()}</span>
                  <span className="font-bold">{track.progressPercent}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Aaj Ki Discoveries — Latest Breakthroughs ── */}
      <div id="section-discoveries" className="mt-10 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🏆</span>
          <div>
            <div className="text-base font-semibold" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>Aaj Ki Discoveries — 6 April 2026</div>
            <div className="text-[12px]" style={{ color: 'var(--t3)' }}>Day 2 ke breakthroughs — sabhi tracks se</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {LATEST_DISCOVERIES.map((disc, idx) => {
            const track = COLLAB_TRACKS.find(t => t.id === disc.collabId);
            const c2 = track ? getColorHex(track.colors[1]) : '#a78bfa';
            const articleKey = `16-${idx}`;
            return (
              <div
                key={disc.id}
                className="rounded-[14px] border border-bd p-4 transition-all hover:border-bd2 cursor-pointer group"
                style={{ background: 'var(--bg2)', borderLeft: `3px solid ${c2}` }}
                onClick={() => {
                  setVisible(prev => ({ ...prev, [articleKey]: true }));
                  setTimeout(() => {
                    articleRefs.current[articleKey]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{disc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium">{disc.title}</span>
                      <span className="text-[11px] py-0.5 px-1.5 rounded-full animate-pulse" style={{ background: '#f5a62322', color: '#f5a623' }}>
                        NEW
                      </span>
                    </div>
                    <div className="text-[12px]" style={{ color: c2 }}>{disc.significance}</div>
                  </div>
                  <span className="text-[12px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--t3)' }}>
                    padho &rarr;
                  </span>
                </div>
                <div className="text-[13px] leading-relaxed" style={{ color: 'var(--t2)' }}>
                  {disc.description}
                </div>
                <div className="text-[13px] mt-2 flex items-center gap-2" style={{ color: 'var(--t3)' }}>
                  <span>{track?.icons}</span>
                  <span>{disc.date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Echo Time-Delay Deep-Dive ── */}
      <div id="section-echo" className="mt-10 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🔭</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>Deep-Dive: Echo Time-Delay & Surface Stiffness</span>
              <span className="text-[11px] py-0.5 px-1.5 rounded-full animate-pulse" style={{ background: '#f5a62322', color: '#f5a623' }}>
                Day 3 — NEW
              </span>
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t3)' }}>Newton + Einstein — 4 echo events ka time-delay analysis</div>
          </div>
        </div>

        {/* Echo Events Data Table */}
        <div className="rounded-[14px] border border-bd overflow-hidden mb-3" style={{ background: 'var(--bg2)', borderLeft: '3px solid #3ecf8e', borderRight: '3px solid #f5a623' }}>
          <div className="p-3 border-b border-bd flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: '#3ecf8e18', color: '#3ecf8e' }}>🍎</span>
              <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: '#f5a62318', color: '#f5a623' }}>⚡</span>
              <span className="text-xs font-medium">4 Candidate Echo Events — Time-Delay Data</span>
            </div>
            <span className="text-[11px] py-0.5 px-1.5 rounded-full font-bold" style={{ background: '#f5a62322', color: '#f5a623' }}>
              Combined: {ECHO_ANALYSIS.combinedSigma}σ
            </span>
          </div>

          <div className="p-3 overflow-x-auto">
            <table className="w-full text-[13px]" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--bd)' }}>
                  <th className="text-left py-1.5 px-2 font-medium" style={{ color: 'var(--t2)' }}>Event</th>
                  <th className="text-center py-1.5 px-2 font-medium" style={{ color: 'var(--t2)' }}>Source</th>
                  <th className="text-center py-1.5 px-2 font-medium" style={{ color: 'var(--t2)' }}>M_final</th>
                  <th className="text-center py-1.5 px-2 font-medium" style={{ color: 'var(--t2)' }}>τ_echo</th>
                  <th className="text-center py-1.5 px-2 font-medium" style={{ color: '#3ecf8e' }}>τ/(2M)</th>
                  <th className="text-center py-1.5 px-2 font-medium" style={{ color: 'var(--t2)' }}>SNR</th>
                  <th className="text-center py-1.5 px-2 font-medium" style={{ color: 'var(--t2)' }}>A₂/A₁</th>
                </tr>
              </thead>
              <tbody>
                {ECHO_EVENTS.map((ev) => {
                  const mSec = ev.finalMass * 4.926e-6;
                  const ratio = (ev.echoDelay / (2 * mSec)).toFixed(1);
                  const isHighlight = ev.echoSNR >= 3;
                  return (
                    <tr key={ev.id} style={{
                      borderBottom: '1px solid var(--bd)',
                      background: isHighlight ? '#f5a62310' : 'transparent',
                    }}>
                      <td className="py-1.5 px-2 font-medium" style={{ color: isHighlight ? '#f5a623' : 'var(--t1)' }}>
                        {ev.id} <span className="text-[11px]" style={{ color: 'var(--t3)' }}>({ev.run})</span>
                      </td>
                      <td className="text-center py-1.5 px-2" style={{ color: 'var(--t2)' }}>
                        {ev.sourceMasses[0]}+{ev.sourceMasses[1]} M☉
                      </td>
                      <td className="text-center py-1.5 px-2 font-medium">{ev.finalMass} M☉</td>
                      <td className="text-center py-1.5 px-2 font-mono" style={{ color: '#f5a623' }}>{ev.echoDelay.toFixed(3)}s</td>
                      <td className="text-center py-1.5 px-2 font-bold" style={{ color: '#3ecf8e' }}>{ratio}</td>
                      <td className="text-center py-1.5 px-2 font-bold" style={{ color: isHighlight ? '#f5a623' : '#38bdf8' }}>{ev.echoSNR}σ</td>
                      <td className="text-center py-1.5 px-2" style={{ color: 'var(--t2)' }}>{ev.interEchoDecay}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Key results summary */}
          <div className="p-3 border-t border-bd flex flex-wrap gap-3 justify-center">
            <div className="text-center py-1.5 px-3 rounded-[8px]" style={{ background: '#3ecf8e15' }}>
              <div className="text-[12px]" style={{ color: 'var(--t3)' }}>τ/(2M) average</div>
              <div className="text-sm font-bold" style={{ color: '#3ecf8e' }}>{ECHO_ANALYSIS.avgTauOver2M} ± {ECHO_ANALYSIS.tauOver2M_err}</div>
            </div>
            <div className="text-center py-1.5 px-3 rounded-[8px]" style={{ background: '#f5a62315' }}>
              <div className="text-[12px]" style={{ color: 'var(--t3)' }}>Surface offset</div>
              <div className="text-sm font-bold" style={{ color: '#f5a623' }}>{ECHO_ANALYSIS.surfaceOffset}</div>
            </div>
            <div className="text-center py-1.5 px-3 rounded-[8px]" style={{ background: '#38bdf815' }}>
              <div className="text-[12px]" style={{ color: 'var(--t3)' }}>Reflectivity R</div>
              <div className="text-sm font-bold" style={{ color: '#38bdf8' }}>{ECHO_ANALYSIS.reflectivity} ± {ECHO_ANALYSIS.reflectivity_err}</div>
            </div>
            <div className="text-center py-1.5 px-3 rounded-[8px]" style={{ background: '#f8706015' }}>
              <div className="text-[12px]" style={{ color: 'var(--t3)' }}>Surface stiffness κ</div>
              <div className="text-sm font-bold" style={{ color: '#f87060' }}>{ECHO_ANALYSIS.stiffness}</div>
            </div>
          </div>
        </div>

        {/* Echo Diagram */}
        <div className="rounded-[14px] border border-bd overflow-hidden mb-3" style={{ background: 'var(--bg2)', borderLeft: '3px solid #3ecf8e', borderRight: '3px solid #f5a623' }}>
          <div className="p-3 flex items-center gap-2 border-b border-bd">
            <span>🍎⚡</span>
            <span className="text-xs font-medium">Echo Time-Delay Analysis — Complete Visualization</span>
            <span className="text-[11px] py-0.5 px-1.5 rounded-full ml-auto" style={{ background: '#3ecf8e18', color: '#3ecf8e' }}>
              100% Complete
            </span>
          </div>
          <div className="p-2">
            <EchoTimeDelayDiagram />
          </div>
        </div>

      </div>

      {/* ── FINAL BREAKTHROUGHS — 100% Complete ── */}
      <div id="section-final" className="mt-10 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🏆</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>FINAL BREAKTHROUGHS — Research 100% Complete</span>
              <span className="text-[11px] py-0.5 px-1.5 rounded-full font-bold" style={{ background: '#3ecf8e22', color: '#3ecf8e' }}>
                ALL TRACKS 100%
              </span>
            </div>
            <div className="text-[12px]" style={{ color: 'var(--t3)' }}>Chaaron tracks ka final discovery — sabse bada breakthrough</div>
          </div>
        </div>

        {/* Final discovery cards — 2x2 grid, clickable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {FINAL_BREAKTHROUGHS.map((disc, idx) => {
            const track = COLLAB_TRACKS.find(t => t.id === disc.collabId);
            const c2 = track ? getColorHex(track.colors[1]) : '#a78bfa';
            const articleKey = `16-${idx}`;
            const isOpen = visible[articleKey];
            return (
              <div
                key={disc.id}
                className="rounded-[14px] border border-bd p-4 transition-all hover:border-bd2 cursor-pointer group"
                style={{
                  background: isOpen ? `${c2}08` : 'var(--bg2)',
                  borderLeft: `3px solid #3ecf8e`,
                  borderRight: `3px solid ${c2}`,
                  boxShadow: isOpen ? `0 0 12px ${c2}18` : 'none',
                }}
                onClick={() => {
                  setVisible(prev => ({ ...prev, [articleKey]: true }));
                  setTimeout(() => {
                    articleRefs.current[articleKey]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{disc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold">{disc.title}</span>
                      <span className="text-[11px] py-0.5 px-1.5 rounded-full font-bold" style={{ background: '#3ecf8e22', color: '#3ecf8e' }}>
                        100%
                      </span>
                    </div>
                    <div className="text-[12px] font-medium" style={{ color: c2 }}>{disc.significance}</div>
                  </div>
                  <span className="text-[12px] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: isOpen ? '#3ecf8e' : 'var(--t3)' }}>
                    {isOpen ? 'open' : 'padho'} &rarr;
                  </span>
                </div>
                <div className="text-[13px] leading-relaxed" style={{ color: 'var(--t2)' }}>
                  {disc.description}
                </div>
                <div className="text-[13px] mt-2 flex items-center gap-2" style={{ color: 'var(--t3)' }}>
                  <span>{track?.icons}</span>
                  <span>{disc.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final articles — expandable */}
        <div className="border border-bd rounded-[14px] overflow-hidden mb-3" style={{ background: 'var(--bg2)' }}>
          {FINAL_ARTICLES.map((a, i) => {
            const isVisible = visible[a.key];
            const article = STATIC_ARTICLES[a.key];
            const c1 = getColorHex(a.color1);
            const c2 = getColorHex(a.color2);

            return (
              <div
                key={a.key}
                ref={(el) => { articleRefs.current[a.key] = el; }}
                className={i > 0 ? 'border-t border-bd' : ''}
              >
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="text-[11px] py-0.5 px-1.5 rounded-full mr-1" style={{ background: c1 + '18', color: c1 }}>{a.icons.slice(0, 2)}</span>
                      <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: c2 + '18', color: c2 }}>{a.icons.slice(2) || a.icons.slice(1)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-medium">{a.names}</span>
                        {isVisible && (
                          <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: 'var(--gdim)', color: 'var(--green)' }}>
                            Published
                          </span>
                        )}
                        <span className="text-[11px] py-0.5 px-1.5 rounded-full font-bold" style={{ background: '#3ecf8e22', color: '#3ecf8e' }}>
                          FINAL
                        </span>
                      </div>
                      <div className="text-[12px]" style={{ color: 'var(--t3)' }}>{a.title}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (isVisible) {
                        setVisible(prev => ({ ...prev, [a.key]: false }));
                      } else {
                        setVisible(prev => ({ ...prev, [a.key]: true }));
                        setTimeout(() => {
                          articleRefs.current[a.key]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }, 100);
                      }
                    }}
                    className="text-[13px] py-1.5 px-3 rounded-[9px] border cursor-pointer transition-all hover:opacity-80 shrink-0"
                    style={{
                      background: isVisible ? 'var(--bg3)' : 'none',
                      borderColor: 'var(--bd2)',
                      color: 'var(--t2)',
                      fontFamily: 'inherit',
                    }}
                  >
                    {isVisible ? 'Band karo' : 'Breakthrough padho'}
                  </button>
                </div>

                {isVisible && article && (
                  <div className="mx-3.5 mb-3">
                    <SeedhiBaat articleKey={a.key} />
                    <FormulaCard articleKey={a.key} />
                    <div
                      className="p-4 rounded-xl border border-bd text-sm leading-[2]"
                      style={{
                        background: 'var(--bg3)',
                        whiteSpace: 'pre-wrap',
                        borderLeft: `3px solid ${c1}`,
                        borderRight: `3px solid ${c2}`,
                      }}
                      dangerouslySetInnerHTML={{ __html: formatArticleHtml(article) }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Scientist Final Statements ── */}
      <div id="section-statements" className="mt-10 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎙️</span>
          <div>
            <div className="text-base font-semibold" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>Scientists Ka Final Statement</div>
            <div className="text-[12px]" style={{ color: 'var(--t3)' }}>Har scientist ki closing remarks — research complete hone pe</div>
          </div>
        </div>
        <div className="space-y-2">
          {SCIENTIST_FINAL_STATEMENTS.map((stmt) => (
            <div
              key={stmt.scientistId}
              className="rounded-[14px] border border-bd p-4 transition-all hover:border-bd2"
              style={{ background: 'var(--bg2)', borderLeft: `3px solid ${stmt.color}` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{stmt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold" style={{ color: stmt.color }}>{stmt.name}</span>
                    <span className="text-[11px] py-0.5 px-1.5 rounded-full" style={{ background: stmt.color + '18', color: stmt.color }}>
                      Final Statement
                    </span>
                  </div>
                  <div className="text-[12px] leading-relaxed italic" style={{ color: 'var(--t1)' }}>
                    &ldquo;{stmt.statement}&rdquo;
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Research Explanation Diagrams — 2D Visual ── */}
      <div id="section-diagrams" className="mt-10 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📊</span>
          <div>
            <div className="text-base font-semibold" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>Research Diagrams — Visual Explanations</div>
            <div className="text-[12px]" style={{ color: 'var(--t3)' }}>Har collab track ka 2D pipeline / architecture diagram</div>
          </div>
        </div>
        <div className="space-y-4">
          {COLLAB_TRACKS.map((track) => {
            const c2 = getColorHex(track.colors[1]);
            return (
              <div key={track.id} className="rounded-[14px] border border-bd overflow-hidden" style={{ background: 'var(--bg2)', borderLeft: `3px solid ${c2}` }}>
                <div className="p-3 flex items-center gap-2 border-b border-bd">
                  <span>{track.icons}</span>
                  <span className="text-xs font-medium">{track.title}</span>
                  <span className="text-[11px] py-0.5 px-1.5 rounded-full ml-auto" style={{ background: c2 + '18', color: c2 }}>
                    {track.progressPercent}% Complete
                  </span>
                </div>
                <div className="p-2">
                  <ExplainDiagram collabId={track.id as CollabId} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
