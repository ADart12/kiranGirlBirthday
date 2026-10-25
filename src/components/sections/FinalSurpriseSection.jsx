import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, Cake, RotateCcw, Share2 } from 'lucide-react';
import { finalSurprise } from '../../data/messages';
import { triggerGrandCelebration, triggerConfetti } from '../../utils/confetti';
import { sound } from '../../utils/soundEffects';
import CakeIllustration from '../CakeIllustration';

export default function FinalSurpriseSection({ onReplayFromStart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);

  const handleOpenGiftBox = () => {
    sound.playChime();
    triggerGrandCelebration();
    setIsOpen(true);
  };

  const handleBlowCandles = () => {
    if (candlesLit) {
      sound.playBreeze();
      setCandlesLit(false);
      triggerConfetti();
    } else {
      sound.playPop();
      setCandlesLit(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-2 sm:py-6 px-4 text-center">
      {/* Header */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-100 text-rose-700 shadow-sm">
          <Cake className="w-3.5 h-3.5 text-rose-500" />
          Surprise 9 of 9 • The Grand Finale
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mt-2">
          {finalSurprise.teaser}
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          A gift box sealed with all my love, just for you.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* State 1: Closed Animated Gift Box */
          <motion.div
            key="closed"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center justify-center my-8"
          >
            {/* 3D CSS Gift Box with Ribbon */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-rose-200/50 rounded-full blur-3xl pointer-events-none animate-pulse" />

              {/* Gift Box Container */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenGiftBox}
                className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 cursor-pointer flex items-center justify-center group select-none"
              >
                {/* Box Body */}
                <div className="absolute bottom-0 w-44 h-40 sm:w-52 sm:h-44 bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 rounded-3xl shadow-2xl border-4 border-white flex items-center justify-center overflow-hidden">
                  {/* Golden vertical ribbon */}
                  <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-sm" />
                  {/* Golden horizontal ribbon */}
                  <div className="absolute left-0 right-0 h-8 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-400 shadow-sm" />

                  {/* Sparkle badge */}
                  <div className="relative z-10 text-white font-serif font-bold text-xs uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    Tap to Open
                  </div>
                </div>

                {/* Box Lid */}
                <div className="absolute top-4 sm:top-2 w-48 h-14 sm:w-56 sm:h-16 bg-gradient-to-r from-rose-700 via-rose-600 to-pink-600 rounded-2xl shadow-lg border-4 border-white flex items-center justify-center">
                  <div className="w-8 h-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400" />
                </div>

                {/* Bow on Top */}
                <div className="absolute -top-3 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-white shadow-md transform -rotate-45" />
                  <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-white shadow-md transform rotate-45 -ml-4" />
                  <div className="absolute w-6 h-6 rounded-full bg-amber-300 border border-white shadow-sm" />
                </div>
              </motion.div>
            </div>

            {/* Click to open button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGiftBox}
              className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-base shadow-xl shadow-rose-600/30 flex items-center gap-2"
            >
              <Gift className="w-5 h-5 text-yellow-200" />
              <span>Unwrap the Final Surprise ✨</span>
            </motion.button>
          </motion.div>
        ) : (
          /* State 2: Revealed Grand Birthday Special */
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Interactive Birthday Cake with Candles */}
            <div className="my-4">
              <CakeIllustration
                candlesLit={candlesLit}
                onBlowCandles={handleBlowCandles}
                className="scale-105"
              />
            </div>

            {/* Beautiful Framed Couple Photo */}
            <div className="relative my-6 max-w-sm w-full bg-white p-4 rounded-3xl shadow-xl border-4 border-rose-100 transform -rotate-1 hover:rotate-0 transition-transform">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-rose-50 mb-3 shadow-inner">
                <img
                  src="/images/olive.jpeg"
                  alt="Special Memory with Anu"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-script text-xl text-rose-700 font-bold">
                "Forever my favorite smile ❤️"
              </div>
            </div>

            {/* Emotional Final Letter */}
            <div className="parchment rounded-3xl p-6 sm:p-10 border border-rose-200 shadow-2xl text-left max-w-2xl w-full my-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-rose-900 mb-4">
                {finalSurprise.greeting}
              </h3>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
                {finalSurprise.paragraphs.map((p, i) => (
                  <p key={i} className="text-slate-700/90">
                    {p}
                  </p>
                ))}
              </div>

              {/* Signoff */}
              <div className="mt-8 pt-6 border-t border-rose-200/60 flex flex-col sm:flex-row justify-between sm:items-end gap-3">
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    {finalSurprise.closing}
                  </div>
                  <div className="font-script text-3xl sm:text-4xl text-rose-700 font-bold mt-1">
                    {finalSurprise.signature}
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playChime();
                    triggerGrandCelebration();
                  }}
                  className="px-4 py-2 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold border border-rose-200 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Celebrate Again!
                </button>
              </div>
            </div>

            {/* Footer Badge required by readme: "Made with love, especially for Anuskha. ❤️" */}
            <div className="mt-8 mb-4">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 border border-rose-200 shadow-md text-sm font-serif font-bold text-rose-700">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>{finalSurprise.footerNote}</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              </div>
            </div>

            {/* Replay Tour Button */}
            {onReplayFromStart && (
              <button
                onClick={onReplayFromStart}
                className="text-xs font-semibold text-slate-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors my-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Dashboard & Relive Surprises</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
