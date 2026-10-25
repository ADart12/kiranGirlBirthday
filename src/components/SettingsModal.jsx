import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sliders, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { triggerGrandCelebration } from '../utils/confetti';
import { sound } from '../utils/soundEffects';

export default function SettingsModal({ isOpen, onClose, onResetExplored }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-7 w-full max-w-md shadow-2xl border border-rose-100"
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                <Sliders className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-bold text-slate-800 text-lg">
                Personalization & Controls
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 text-xs sm:text-sm">
            {/* Confetti Explosion */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-50/60 border border-rose-100">
              <div>
                <div className="font-bold text-slate-800">Grand Confetti Blast</div>
                <div className="text-[11px] text-slate-500">Launch a multi-colored celebration</div>
              </div>
              <button
                onClick={() => {
                  sound.playPop();
                  triggerGrandCelebration();
                }}
                className="px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Burst
              </button>
            </div>

            {/* Sound Chime test */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-50/60 border border-purple-100">
              <div>
                <div className="font-bold text-slate-800">Play Romantic Chime</div>
                <div className="text-[11px] text-slate-500">Soft acoustic bells</div>
              </div>
              <button
                onClick={() => sound.playChime()}
                className="px-3 py-1.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Play
              </button>
            </div>

            {/* Reset progress */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <div className="font-bold text-slate-800">Reset Explored Badges</div>
                <div className="text-[11px] text-slate-500">Start discovery experience fresh</div>
              </div>
              <button
                onClick={() => {
                  if (onResetExplored) onResetExplored();
                  sound.playPop();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>
          </div>

          {/* Dedicated Credits Footer */}
          <div className="mt-6 pt-4 border-t border-rose-100 text-center">
            <p className="font-serif italic text-rose-600 text-xs">
              "Made with love from Kiran to Anu ❤️"
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
