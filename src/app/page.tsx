'use client';

import { useState, useEffect } from 'react';
import { ToolId } from '@/lib/types';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MobileNav from '@/components/layout/MobileNav';
import HomePanel from '@/components/tools/HomePanel';
import DarkMatterDetector from '@/components/tools/DarkMatterDetector';
import MotionPredictor from '@/components/tools/MotionPredictor';
import TimeDilation from '@/components/tools/TimeDilation';
import WormholeFeasibility from '@/components/tools/WormholeFeasibility';
import FreeEnergy from '@/components/tools/FreeEnergy';
import UnifiedFieldTheory from '@/components/tools/UnifiedFieldTheory';
import SpacetimeMesh from '@/components/tools/SpacetimeMesh';
import SymmetryBreaker from '@/components/tools/SymmetryBreaker';
import InfiniteSeries from '@/components/tools/InfiniteSeries';
import QuantumEntanglement from '@/components/tools/QuantumEntanglement';
import DiscoveryEngine from '@/components/tools/DiscoveryEngine';
import DishaNirdesh from '@/components/tools/DishaNirdesh';
import ResearchLab from '@/components/tools/ResearchLab';
import ScientistProfiles from '@/components/tools/ScientistProfiles';
import AIBrain from '@/components/tools/AIBrain';
import ScientistChat from '@/components/tools/ScientistChat';

export default function UnifiedApp() {
  const [activePanel, setActivePanel] = useState<ToolId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Header onMenuToggle={() => setMobileMenuOpen(true)} />
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        active={activePanel}
        onNavigate={setActivePanel}
      />
      <div className="app-grid">
        <Sidebar active={activePanel} onNavigate={setActivePanel} />
        <main className="p-5 overflow-y-auto" style={{ minWidth: 0 }}>
          <div className="max-w-4xl mx-auto">
            {activePanel === 'home' && <HomePanel onNavigate={setActivePanel} />}
            {activePanel === 'darkmatter' && <DarkMatterDetector />}
            {activePanel === 'motion' && <MotionPredictor />}
            {activePanel === 'timedilation' && <TimeDilation />}
            {activePanel === 'wormhole' && <WormholeFeasibility />}
            {activePanel === 'freeenergy' && <FreeEnergy />}
            {activePanel === 'unifiedfield' && <UnifiedFieldTheory />}
            {activePanel === 'spacetimemesh' && <SpacetimeMesh />}
            {activePanel === 'symmetrybreaker' && <SymmetryBreaker />}
            {activePanel === 'infiniteseries' && <InfiniteSeries />}
            {activePanel === 'entanglement' && <QuantumEntanglement />}
            {activePanel === 'discovery' && <DiscoveryEngine />}
            {activePanel === 'dishanirdesh' && <DishaNirdesh />}
            {activePanel === 'researchlab' && <ResearchLab />}
            {activePanel === 'scientistprofiles' && <ScientistProfiles />}
            {activePanel === 'aibrain' && <AIBrain />}
            {activePanel === 'scientistchat' && <ScientistChat />}
          </div>
        </main>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 xl:right-[200px] w-10 h-10 rounded-full border border-bd2 flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 z-40"
          style={{ background: 'var(--bg2)', color: 'var(--t2)', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
}
