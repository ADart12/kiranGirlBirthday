import React from 'react';
import { Volume2, VolumeX, Sparkles, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopNav({
  isMusicPlaying,
  onToggleMusic,
  onFireConfetti,
  currentView,
  onToggleView,
  onOpenSettings,
  onGoHome
}) {
  return (
    <header className="relative z-30 w-full px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
      {/* Top Left: Logo from screenshot ("2L" with Heart & Birthday Hat) */}
      <motion.button
        onClick={onGoHome}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 group text-left focus:outline-none"
        title="Go to Home"
      >
        <div className="relative flex items-center justify-center">
          {/* Party Hat SVG */}
          <svg
            className="absolute -top-3.5 -left-1 w-6 h-6 transform -rotate-12 drop-shadow-sm pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2L4 20C4 20 8 18 12 18C16 18 20 20 20 20L12 2Z"
              fill="#fb7185"
              stroke="#f43f5e"
              strokeWidth="1.2"
            />
            {/* Hat pom-pom */}
            <circle cx="12" cy="2" r="2.5" fill="#fde047" />
            {/* Hat stripes */}
            <line x1="8" y1="12" x2="16" y2="12" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="6.5" y1="16" x2="17.5" y2="16" stroke="#fcd34d" strokeWidth="1.5" />
          </svg>

          {/* Party Blower */}
          <div className="absolute -top-1 -right-4 transform rotate-12 text-sm pointer-events-none">
            🎉
          </div>

          {/* "2L" / Romantic Monogram Badge */}
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-200 via-pink-200 to-rose-200 border border-white/80 shadow-md flex items-center justify-center relative overflow-hidden group-hover:shadow-rose-200/60 transition-shadow">
            <span className="font-serif font-black text-rose-600 text-lg tracking-tighter drop-shadow-sm">
              2L
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="hidden sm:flex flex-col">
          <span className="font-serif font-bold text-slate-800 text-sm leading-tight group-hover:text-rose-600 transition-colors">
            For Anu ❤️
          </span>
          <span className="text-[11px] font-medium text-rose-500/80 tracking-wide uppercase">
            Birthday Special
          </span>
        </div>
      </motion.button>

      {/* Top Right Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Confetti Trigger */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onFireConfetti}
          className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/80 hover:bg-white border border-rose-100 shadow-sm text-rose-600 hover:text-rose-700 flex items-center gap-1.5 backdrop-blur-md transition-all text-xs font-semibold"
          title="Celebrate with Confetti!"
        >
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-300 animate-spin-slow" />
          <span className="hidden md:inline">Party Burst</span>
        </motion.button>

        {/* Music Player Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleMusic}
          className={`p-2 sm:px-3 sm:py-1.5 rounded-full border shadow-sm backdrop-blur-md flex items-center gap-1.5 transition-all text-xs font-semibold ${
            isMusicPlaying
              ? 'bg-rose-500 text-white border-rose-400 shadow-rose-300/50'
              : 'bg-white/80 hover:bg-white text-slate-700 border-rose-100'
          }`}
          title={isMusicPlaying ? 'Pause Melody' : 'Play Romantic Melody'}
        >
          {isMusicPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">Music On</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Play Song</span>
            </>
          )}
        </motion.button>

        {/* Dashboard Grid / Slide Mode Toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleView}
          className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/80 hover:bg-white border border-rose-100 shadow-sm text-slate-700 hover:text-rose-600 flex items-center gap-1.5 backdrop-blur-md transition-all text-xs font-semibold"
          title={currentView === 'grid' ? 'Switch to Story View' : 'View All 9 Surprises Grid'}
        >
          <LayoutGrid className="w-4 h-4 text-rose-500" />
          <span className="hidden md:inline">
            {currentView === 'grid' ? 'Slide View' : 'All Surprises'}
          </span>
        </motion.button>

        {/* Settings / Sliders Button (Matches the top-right button in screenshot) */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onOpenSettings}
          className="w-9 h-9 rounded-full bg-white/80 hover:bg-white border border-rose-100 shadow-sm text-slate-700 hover:text-rose-600 flex items-center justify-center backdrop-blur-md transition-all"
          title="Settings & Personalization"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-600 hover:text-rose-600" />
        </motion.button>
      </div>
    </header>
  );
}
