import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Heart, 
  BookHeart, 
  Sparkles, 
  Camera, 
  Compass, 
  CalendarHeart, 
  Music, 
  Cake 
} from 'lucide-react';

export const SECTIONS = [
  { id: 1, key: 'letter', title: 'The Letter', icon: Mail, emoji: '💌', preview: 'A letter from my heart' },
  { id: 2, key: 'what-i-love', title: 'What I Love', icon: Heart, emoji: '🎈', preview: '10 reasons why you are special' },
  { id: 3, key: 'our-story', title: 'Our Story', icon: BookHeart, emoji: '🎁', preview: 'Milestones of our journey' },
  { id: 4, key: 'wishes', title: 'Wishes & Dreams', icon: Sparkles, emoji: '✨', preview: 'Make a wish in the magical jar' },
  { id: 5, key: 'moments', title: 'Moments', icon: Camera, emoji: '📸', preview: 'Our real couple photo gallery' },
  { id: 6, key: 'places', title: 'Places', icon: Compass, emoji: '🗺️', preview: 'Map of memories & dreams' },
  { id: 7, key: 'our-date', title: 'Our Date', icon: CalendarHeart, emoji: '📅', preview: 'Live counter & milestones' },
  { id: 8, key: 'our-song', title: 'Our Song', icon: Music, emoji: '🎵', preview: 'Special romantic melody player' },
  { id: 9, key: 'final-surprise', title: 'Final Surprise', icon: Cake, emoji: '🎂', preview: 'A grand birthday surprise' },
];

export default function BottomNavDock({
  activeSectionIndex,
  onSelectSection,
  onPrev,
  onNext,
  exploredSections = []
}) {
  return (
    <div className="fixed bottom-3 sm:bottom-6 left-0 right-0 z-40 flex justify-center px-2 pointer-events-none">
      <motion.nav
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full glass-dock max-w-full overflow-x-auto shadow-2xl"
      >
        {/* Left Arrow Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onPrev}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-colors flex-shrink-0"
          title="Previous Surprise"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>

        {/* 9 Section Icons */}
        <div className="flex items-center gap-1 sm:gap-2 px-1">
          {SECTIONS.map((sec, idx) => {
            const Icon = sec.icon;
            const isActive = activeSectionIndex === idx;
            const isExplored = exploredSections.includes(sec.id);

            return (
              <motion.button
                key={sec.id}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectSection(idx)}
                className={`relative flex flex-col items-center justify-center w-8 h-10 sm:w-10 sm:h-12 rounded-xl transition-all ${
                  isActive
                    ? 'text-rose-600 font-bold'
                    : 'text-slate-400 hover:text-rose-400'
                }`}
                title={`${sec.id}. ${sec.title}`}
              >
                {/* Icon Wrapper with cute styling */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-base sm:text-lg transition-transform ${
                    isActive
                      ? 'scale-110 bg-rose-100/80 shadow-sm'
                      : 'hover:bg-slate-100/60'
                  }`}
                >
                  <span>{sec.emoji}</span>
                </div>

                {/* Explored status indicator / Active underline */}
                <div className="flex items-center justify-center mt-0.5">
                  {isActive ? (
                    <motion.div
                      layoutId="activeUnderline"
                      className="w-3.5 h-1 sm:w-4 sm:h-1 bg-rose-500 rounded-full"
                    />
                  ) : (
                    <div
                      className={`w-1 h-1 rounded-full transition-colors ${
                        isExplored ? 'bg-rose-300' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Counter Indicator (e.g. 1/9) */}
        <div className="text-[11px] sm:text-xs font-bold text-slate-500 px-1 sm:px-2 select-none flex-shrink-0">
          <span className="text-rose-600 font-extrabold">{activeSectionIndex + 1}</span>
          <span className="text-slate-400">/</span>
          <span>9</span>
        </div>

        {/* Right Arrow Button (Pink pill/circle from reference) */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onNext}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-md shadow-rose-500/30 transition-all flex-shrink-0"
          title="Next Surprise"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </motion.nav>
    </div>
  );
}
