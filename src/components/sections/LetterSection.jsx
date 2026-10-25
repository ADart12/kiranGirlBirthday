import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart, Sparkles, ArrowRight, Share2 } from 'lucide-react';
import { theLetter } from '../../data/messages';
import { triggerConfetti } from '../../utils/confetti';
import { sound } from '../../utils/soundEffects';

export default function LetterSection({ onNext }) {
  const [isUnfolded, setIsUnfolded] = useState(true);

  const handleSealClick = () => {
    sound.playChime();
    triggerConfetti();
    setIsUnfolded(!isUnfolded);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-2 sm:py-6 px-4">
      {/* Header Badge */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-100 text-rose-700 shadow-sm">
          <Mail className="w-3.5 h-3.5 text-rose-500" />
          Surprise 1 of 9 • The Letter
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mt-2">
          From My Heart to Yours
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Words that mean more than I can ever say out loud.
        </p>
      </div>

      {/* Parchment Letter Container */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="parchment relative rounded-3xl p-6 sm:p-10 border border-amber-100/80 shadow-2xl overflow-hidden"
      >
        {/* Decorative corner ribbons & vintage wax seal mark */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100/60 to-transparent pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-rose-200/20 rounded-full blur-xl pointer-events-none" />

        {/* Wax seal interactive badge at top right */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">
              A Personal Note
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSealClick}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-700 to-rose-500 text-white flex items-center justify-center shadow-lg border-2 border-rose-300 relative group"
            title="Click to toggle letter seal"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span className="absolute -bottom-6 text-[10px] text-rose-600 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Wax Seal
            </span>
          </motion.button>
        </div>

        {/* Salutation */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-2xl sm:text-3xl font-bold text-rose-900 mb-5"
        >
          {theLetter.salutation}
        </motion.h3>

        {/* Letter Paragraphs */}
        <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed font-sans">
          {theLetter.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              className="text-slate-700/90"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Signoff */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 pt-6 border-t border-rose-200/50 flex flex-col sm:flex-row justify-between sm:items-end gap-3"
        >
          <div>
            <div className="text-xs text-slate-400 font-medium tracking-wide uppercase">
              Always and forever,
            </div>
            <div className="font-script text-3xl sm:text-4xl text-rose-700 font-bold mt-1">
              {theLetter.signature}
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-white/80 rounded-full border border-rose-200 text-xs font-serif italic text-rose-600">
              For Anu’s Birthday ❤️
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation Footer */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => {
            sound.playChime();
            triggerConfetti();
          }}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-white/70 hover:bg-white px-4 py-2 rounded-full border border-rose-200 shadow-sm flex items-center gap-1.5 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Send Love & Sparkles
        </button>

        {onNext && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/30 flex items-center gap-2 transition-all"
          >
            <span>Next: What I Love</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
