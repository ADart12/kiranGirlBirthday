import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';

// Data
import { config } from './data/config';

// Context
import { MusicProvider, useMusic } from './context/MusicContext';

// Components
import BackgroundElements from './components/BackgroundElements';
import TopNav from './components/TopNav';
import BottomNavDock, { SECTIONS } from './components/BottomNavDock';
import IntroEnvelopeModal from './components/IntroEnvelopeModal';
import HeroCakeCard from './components/HeroCakeCard';
import DashboardGrid from './components/DashboardGrid';
import SettingsModal from './components/SettingsModal';

// Section Components
import LetterSection from './components/sections/LetterSection';
import WhatILoveSection from './components/sections/WhatILoveSection';
import OurStorySection from './components/sections/OurStorySection';
import WishesSection from './components/sections/WishesSection';
import MomentsSection from './components/sections/MomentsSection';
import PlacesSection from './components/sections/PlacesSection';
import OurDateSection from './components/sections/OurDateSection';
import OurSongSection from './components/sections/OurSongSection';
import FinalSurpriseSection from './components/sections/FinalSurpriseSection';

// Utilities
import { triggerConfetti, triggerGrandCelebration } from './utils/confetti';
import { sound } from './utils/soundEffects';

function AppContent() {
  // Navigation states: 'hero', 'grid', 'section'
  const [viewMode, setViewMode] = useState('hero');
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Modals & Controls
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Global Music Player hook
  const { isPlaying, toggleSong, playSong } = useMusic();

  // Explored sections tracking
  const [exploredSections, setExploredSections] = useState(() => {
    try {
      const saved = localStorage.getItem('anuska_explored_sections');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Show intro modal on first session visit
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('has_seen_intro_envelope');
    if (!hasSeenIntro) {
      setIsIntroModalOpen(true);
      sessionStorage.setItem('has_seen_intro_envelope', 'true');
    }
  }, []);

  // Save explored sections
  const markSectionExplored = (sectionId) => {
    if (!exploredSections.includes(sectionId)) {
      const updated = [...exploredSections, sectionId];
      setExploredSections(updated);
      try {
        localStorage.setItem('anuska_explored_sections', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Switch to section
  const goToSection = (index) => {
    setActiveSectionIndex(index);
    setViewMode('section');
    markSectionExplored(SECTIONS[index].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextSection = () => {
    sound.playPop();
    const nextIdx = (activeSectionIndex + 1) % SECTIONS.length;
    goToSection(nextIdx);
  };

  const handlePrevSection = () => {
    sound.playPop();
    const prevIdx = (activeSectionIndex - 1 + SECTIONS.length) % SECTIONS.length;
    goToSection(prevIdx);
  };

  const handleToggleMusic = () => {
    toggleSong();
    if (!isPlaying) {
      triggerConfetti();
    }
  };

  const handleFireConfetti = () => {
    sound.playPop();
    triggerGrandCelebration();
  };

  const handleResetExplored = () => {
    setExploredSections([]);
    try {
      localStorage.removeItem('anuska_explored_sections');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen bg-dreamy-gradient text-slate-800 flex flex-col justify-between selection:bg-rose-200 selection:text-rose-900 pb-28 sm:pb-32">
      {/* 1. Background Confetti & Ambient Dreamy Spheres */}
      <BackgroundElements />

      {/* 2. Top Navigation Bar */}
      <TopNav
        isMusicPlaying={isPlaying}
        onToggleMusic={handleToggleMusic}
        onFireConfetti={handleFireConfetti}
        currentView={viewMode}
        onToggleView={() => {
          sound.playPop();
          if (viewMode === 'grid') {
            setViewMode('section');
          } else {
            setViewMode('grid');
          }
        }}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onGoHome={() => {
          sound.playPop();
          setViewMode('hero');
        }}
      />

      {/* 3. Main View Switcher */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center px-3 sm:px-6 w-full max-w-6xl mx-auto my-auto">
        {/* Back to Dashboard Button when in section view */}
        {viewMode === 'section' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl mb-4 flex items-center justify-between"
          >
            <button
              onClick={() => {
                sound.playPop();
                setViewMode('grid');
              }}
              className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-xs sm:text-sm font-bold text-slate-700 hover:text-rose-600 shadow-sm border border-rose-200 backdrop-blur-md flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Surprises</span>
            </button>

            <div className="text-xs font-semibold text-rose-600 bg-white/80 px-3 py-1.5 rounded-full border border-rose-200 shadow-sm backdrop-blur-md hidden sm:flex items-center gap-1.5">
              <span>{SECTIONS[activeSectionIndex].emoji}</span>
              <span>Surprise {activeSectionIndex + 1} of 9</span>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {viewMode === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center py-4"
            >
              <HeroCakeCard
                onOpenGift={() => {
                  playSong();
                  goToSection(0);
                }}
              />
            </motion.div>
          )}

          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <DashboardGrid
                onSelectSection={goToSection}
                exploredSections={exploredSections}
              />
            </motion.div>
          )}

          {viewMode === 'section' && (
            <motion.div
              key={`section-${activeSectionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              {activeSectionIndex === 0 && (
                <LetterSection onNext={handleNextSection} />
              )}
              {activeSectionIndex === 1 && (
                <WhatILoveSection onNext={handleNextSection} />
              )}
              {activeSectionIndex === 2 && (
                <OurStorySection onNext={handleNextSection} />
              )}
              {activeSectionIndex === 3 && (
                <WishesSection onNext={handleNextSection} />
              )}
              {activeSectionIndex === 4 && (
                <MomentsSection onNext={handleNextSection} />
              )}
              {activeSectionIndex === 5 && (
                <PlacesSection onNext={handleNextSection} />
              )}
              {activeSectionIndex === 6 && (
                <OurDateSection onNext={handleNextSection} />
              )}
              {activeSectionIndex === 7 && (
                <OurSongSection onNext={handleNextSection} />
              )}
              {activeSectionIndex === 8 && (
                <FinalSurpriseSection
                  onReplayFromStart={() => {
                    setViewMode('grid');
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Bottom Carousel Dock Navigation (From reference screenshot) */}
      <BottomNavDock
        activeSectionIndex={activeSectionIndex}
        onSelectSection={goToSection}
        onPrev={handlePrevSection}
        onNext={handleNextSection}
        exploredSections={exploredSections}
      />

      {/* 5. Modals */}
      <IntroEnvelopeModal
        isOpen={isIntroModalOpen}
        onClose={() => {
          setIsIntroModalOpen(false);
          playSong();
        }}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onResetExplored={handleResetExplored}
      />
    </div>
  );
}

export default function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}
