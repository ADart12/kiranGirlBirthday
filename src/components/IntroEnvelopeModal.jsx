import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Gift } from 'lucide-react';
import { triggerConfetti, triggerHeartShower } from '../utils/confetti';
import { sound } from '../utils/soundEffects';
import { config } from '../data/config';

export default function IntroEnvelopeModal({ isOpen, onClose }) {
  const [isOpened, setIsOpened] = useState(false);

  if (!isOpen) return null;

  const handleOpenSurprise = () => {
    sound.playChime();
    triggerConfetti({ x: 0.5, y: 0.5 });
    triggerHeartShower();
    setIsOpened(true);
  };

  const handleEnterExperience = () => {
    sound.playPop();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-white via-rose-50/40 to-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/80 overflow-hidden text-center"
        >
          {/* Subtle close button in corner if already opened */}
          {isOpened && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {!isOpened ? (
            /* State 1: Sealed Envelope with Heart */
            <div className="flex flex-col items-center">
              {/* Teaser Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-100 text-rose-700">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
                  Special Delivery
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-slate-800">
                  {config.introTeaser}
                </h2>
                <p className="mt-1 text-sm sm:text-base font-script text-rose-600 text-xl">
                  {config.introSubtext}
                </p>
              </motion.div>

              {/* Animated Envelope Visual */}
              <div className="relative my-6 w-56 h-36 sm:w-64 sm:h-40 flex items-center justify-center">
                {/* Envelope Base */}
                <div className="w-full h-full bg-gradient-to-br from-rose-200 to-pink-300 rounded-2xl shadow-lg border-2 border-white relative overflow-hidden flex items-center justify-center">
                  {/* Flap lines */}
                  <div className="absolute inset-0 border-b-[80px] sm:border-b-[90px] border-b-rose-100/40 border-x-[110px] sm:border-x-[125px] border-x-transparent" />
                  <div className="absolute top-0 left-0 right-0 border-t-[75px] sm:border-t-[85px] border-t-rose-300 border-x-[110px] sm:border-x-[125px] border-x-transparent shadow-sm" />

                  {/* Red Wax Seal */}
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenSurprise}
                    className="relative z-10 w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-rose-300 cursor-pointer"
                  >
                    <Heart className="w-7 h-7 fill-white drop-shadow-sm" />
                    <span className="absolute -bottom-6 text-[10px] font-bold text-rose-700 uppercase tracking-widest whitespace-nowrap bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
                      Tap Seal
                    </span>
                  </motion.div>
                </div>
              </div>

              {/* Open Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenSurprise}
                className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-base shadow-lg shadow-rose-500/30 flex items-center gap-2"
              >
                <Gift className="w-5 h-5" />
                {config.introButtonText}
              </motion.button>
            </div>
          ) : (
            /* State 2: Unfolded Romantic Greeting */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-3 shadow-inner">
                <Heart className="w-6 h-6 fill-rose-500" />
              </div>

              <div className="parchment p-6 sm:p-7 rounded-2xl border border-rose-100 text-left w-full my-2 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-2xl opacity-20 pointer-events-none">
                  💌
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-rose-800 mb-3">
                  {config.introRevealedMessage.greeting}
                </h3>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans mb-4">
                  {config.introRevealedMessage.body}
                </p>

                <div className="mt-4 pt-3 border-t border-rose-200/60 flex justify-between items-end">
                  <div className="font-script text-xl sm:text-2xl text-rose-700 font-semibold whitespace-pre-line">
                    {config.introRevealedMessage.closing}
                  </div>
                  <span className="text-xs text-rose-400 font-mono">Special Edition</span>
                </div>
              </div>

              {/* Continue button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnterExperience}
                className="mt-5 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold text-base shadow-lg shadow-rose-500/30 flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-yellow-200" />
                {config.introRevealedMessage.continueButton}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
