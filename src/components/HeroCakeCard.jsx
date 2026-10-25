import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Heart } from 'lucide-react';
import CakeIllustration from './CakeIllustration';
import { triggerConfetti, triggerGrandCelebration } from '../utils/confetti';
import { sound } from '../utils/soundEffects';
import { config } from '../data/config';

export default function HeroCakeCard({ onOpenGift, onStartTour }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (candlesLit) {
      sound.playBreeze();
      setCandlesLit(false);
      setWishMade(true);
      triggerConfetti();
    } else {
      sound.playPop();
      setCandlesLit(true);
      setWishMade(false);
    }
  };

  const handleOpenMyGift = () => {
    sound.playChime();
    triggerGrandCelebration();
    if (onOpenGift) onOpenGift();
  };

  return (
    <div className="relative w-full max-w-md sm:max-w-lg mx-auto bg-gradient-to-b from-white/90 via-rose-50/60 to-white/95 rounded-[36px] sm:rounded-[44px] p-6 sm:p-9 shadow-2xl border-4 border-white/90 backdrop-blur-xl flex flex-col items-center text-center overflow-hidden">
      {/* Decorative background spots */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-rose-200/40 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />

      {/* 1. Subheading: A GIFT FOR YOU */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[12px] sm:text-xs font-bold tracking-[0.25em] text-rose-600 uppercase mb-2 flex items-center gap-1.5"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        {config.heroSubheading}
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
      </motion.div>

      {/* 2. Heading: Happy birthday, Anuskha! */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight"
      >
        Happy birthday,{' '}
        <span className="text-rose-600 block mt-0.5">
          {config.recipientName}!
        </span>
      </motion.h1>

      {/* 3. Handwritten line: for being so wonderful */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-script text-2xl sm:text-3xl text-slate-700 mt-2 mb-1 flex items-center justify-center gap-1.5"
      >
        <span>for being so</span>{' '}
        <span className="text-amber-500 font-bold underline decoration-wavy decoration-rose-300 decoration-1">
          wonderful
        </span>
      </motion.div>

      {/* 4. Subtitle: +55 threw a little party just for you */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide mb-3"
      >
        {config.heroPartyText}
      </motion.p>

      {/* 5. 3D Cake Illustration with glowing candles */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="my-1 sm:my-3 w-full flex flex-col items-center relative"
      >
        <CakeIllustration
          candlesLit={candlesLit}
          onBlowCandles={handleBlowCandles}
          className="cursor-pointer transition-transform hover:scale-105"
        />

        {/* Wish feedback notification */}
        {wishMade && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs font-semibold text-rose-600 bg-rose-100/80 px-3.5 py-1 rounded-full border border-rose-200 shadow-sm flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            Make a silent wish in your heart! May all your dreams come true ✨
          </motion.div>
        )}
      </motion.div>

      {/* 6. Pill Button: Open my gift (matching screenshot style) */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpenMyGift}
        className="mt-4 sm:mt-5 px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-base shadow-xl shadow-rose-600/35 flex items-center gap-2.5 transition-all group"
      >
        <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span>Open my gift</span>
      </motion.button>
    </div>
  );
}
