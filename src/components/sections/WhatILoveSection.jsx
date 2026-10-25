import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  Sun, 
  Music, 
  MessageCircleHeart, 
  ShieldCheck, 
  Smile, 
  Gift, 
  Feather, 
  Crown,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  Eye
} from 'lucide-react';
import { whatILove } from '../../data/messages';
import { triggerConfetti } from '../../utils/confetti';
import { sound } from '../../utils/soundEffects';

const ICON_MAP = {
  Sparkles,
  HeartHandshake,
  Sun,
  Music,
  MessageCircleHeart,
  ShieldCheck,
  Smile,
  Gift,
  Feather,
  Crown
};

export default function WhatILoveSection({ onNext }) {
  const [revealedIds, setRevealedIds] = useState([1]); // First one revealed by default

  const toggleReveal = (id) => {
    sound.playPop();
    if (!revealedIds.includes(id)) {
      const next = [...revealedIds, id];
      setRevealedIds(next);
      if (next.length === whatILove.length) {
        sound.playChime();
        triggerConfetti();
      }
    }
  };

  const handleRevealAll = () => {
    sound.playChime();
    triggerConfetti();
    setRevealedIds(whatILove.map(item => item.id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-pink-100 text-pink-700 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          Surprise 2 of 9 • Reasons Why
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mt-2">
          What I Love About You
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Tap each card to reveal ten special things that make you so dear to me.
        </p>

        {/* Progress & Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-white/80 border border-rose-200 text-rose-700 shadow-sm flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
            <span>{revealedIds.length} of {whatILove.length} Revealed</span>
          </div>

          {revealedIds.length < whatILove.length && (
            <button
              onClick={handleRevealAll}
              className="text-xs font-medium px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              Reveal All Reasons
            </button>
          )}
        </div>
      </div>

      {/* Grid of 10 Interactive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {whatILove.map((item, idx) => {
          const isRevealed = revealedIds.includes(item.id);
          const Icon = ICON_MAP[item.icon] || Heart;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => toggleReveal(item.id)}
              className={`relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 min-h-[170px] flex flex-col justify-between overflow-hidden ${
                isRevealed
                  ? 'bg-white/90 border-rose-200 shadow-lg shadow-rose-500/5 hover:-translate-y-1'
                  : 'bg-white/50 border-white/80 hover:bg-white/70 shadow-sm hover:border-pink-200 hover:-translate-y-0.5'
              }`}
            >
              {/* Card Top: Tag + Icon */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-wider text-rose-500 uppercase bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                  {item.tag}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    isRevealed
                      ? 'bg-rose-100 text-rose-600'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {/* Card Content */}
              <div className="my-2">
                <h3 className="font-serif font-bold text-slate-800 text-base mb-1">
                  {item.title}
                </h3>
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.p
                      key="revealed"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0 }}
                      className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans"
                    >
                      "{item.text}"
                    </motion.p>
                  ) : (
                    <motion.div
                      key="hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1.5 text-xs text-rose-400 font-medium pt-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                      <span>Tap to reveal this reason ❤️</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom decorative bar */}
              <div className="flex justify-end items-center pt-2 border-t border-rose-50">
                <span className="text-[10px] text-slate-400 font-mono">
                  {isRevealed ? 'Revealed ✨' : 'Click to open'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Completion message banner */}
      {revealedIds.length === whatILove.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 border border-rose-200 text-center shadow-md"
        >
          <div className="font-serif text-rose-900 font-bold text-base sm:text-lg">
            "And every single day, I discover even more reasons."
          </div>
          <p className="text-xs text-rose-700 mt-1">
            You bring so much joy just by being you, Anu ❤️
          </p>
        </motion.div>
      )}

      {/* Navigation Footer */}
      {onNext && (
        <div className="mt-8 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/30 flex items-center gap-2 transition-all"
          >
            <span>Next: Our Story</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
