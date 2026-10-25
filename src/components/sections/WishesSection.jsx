import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Plus, Heart, ArrowRight, X } from 'lucide-react';
import { initialWishes } from '../../data/wishes';
import { triggerConfetti } from '../../utils/confetti';
import { sound } from '../../utils/soundEffects';

export default function WishesSection({ onNext }) {
  const [wishes, setWishes] = useState(initialWishes);
  const [activeWish, setActiveWish] = useState(null);
  const [isAddingWish, setIsAddingWish] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');

  const handleMakeAWish = () => {
    sound.playTwinkle();
    triggerConfetti();
    const randomIndex = Math.floor(Math.random() * wishes.length);
    setActiveWish(wishes[randomIndex]);
  };

  const handleAddCustomWish = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) return;

    const createdWish = {
      id: Date.now(),
      title: newTitle.trim(),
      text: newText.trim(),
      color: '#ec4899',
      starType: 'glowing-pink'
    };

    setWishes([createdWish, ...wishes]);
    setActiveWish(createdWish);
    setNewTitle('');
    setNewText('');
    setIsAddingWish(false);
    sound.playChime();
    triggerConfetti();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-100 text-amber-800 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
          Surprise 4 of 9 • Wishes & Dreams
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mt-2">
          The Magical Wish Jar
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Each star holds a heartfelt wish for your happiness, dreams, and our future.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: The Glowing Wish Jar */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative w-64 h-80 flex items-center justify-center">
            {/* Soft Ambient Glow */}
            <div className="absolute inset-4 rounded-[40px] bg-gradient-to-t from-amber-200/50 via-rose-200/40 to-yellow-100/30 blur-2xl pointer-events-none" />

            {/* Glass Jar SVG Container */}
            <div className="relative w-52 h-72 rounded-[45px] border-4 border-white/90 bg-gradient-to-b from-white/40 via-amber-50/20 to-white/70 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col items-center justify-between p-4">
              {/* Jar Wooden Lid */}
              <div className="w-36 h-6 rounded-full bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 shadow-md border-b-2 border-amber-900/40 relative -mt-1 flex items-center justify-center">
                <div className="w-12 h-1 bg-amber-400/40 rounded-full" />
                {/* Tied Ribbon */}
                <div className="absolute -bottom-2 w-28 h-1.5 bg-rose-400 rounded-full shadow-sm" />
              </div>

              {/* Floating Stars Inside Jar */}
              <div className="relative w-full h-full my-2 flex items-center justify-center">
                {wishes.slice(0, 10).map((w, idx) => {
                  const x = (idx % 3) * 35 - 35;
                  const y = Math.floor(idx / 3) * 35 - 35;
                  return (
                    <motion.div
                      key={w.id}
                      animate={{
                        y: [y, y - 10, y],
                        x: [x, x + 6, x],
                        rotate: [0, 45, 0],
                        scale: [0.9, 1.15, 0.9]
                      }}
                      transition={{
                        duration: 3 + (idx % 3),
                        repeat: Infinity,
                        delay: idx * 0.3,
                        ease: "easeInOut"
                      }}
                      onClick={() => {
                        sound.playTwinkle();
                        setActiveWish(w);
                      }}
                      className="absolute cursor-pointer text-xl sm:text-2xl filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] hover:scale-125 transition-transform"
                      title={w.title}
                    >
                      ⭐
                    </motion.div>
                  );
                })}
              </div>

              {/* Jar Base Tag */}
              <div className="px-3 py-1 rounded-full bg-white/80 border border-amber-200/80 text-[11px] font-bold text-amber-800 shadow-sm flex items-center gap-1">
                <span>✨</span>
                <span>Anu's Jar</span>
              </div>
            </div>
          </div>

          {/* Action Buttons below jar */}
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMakeAWish}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-600 hover:to-pink-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-yellow-200 fill-yellow-200" />
              <span>Make a Wish ✨</span>
            </motion.button>

            <button
              onClick={() => setIsAddingWish(true)}
              className="px-3.5 py-2 rounded-full bg-white/80 hover:bg-white text-slate-700 text-xs font-semibold border border-rose-200 shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-rose-500" />
              <span>Add Wish</span>
            </button>
          </div>
        </div>

        {/* Right Column: Display Active Wish Scroll */}
        <div className="md:col-span-7">
          <AnimatePresence mode="wait">
            {activeWish ? (
              <motion.div
                key={activeWish.id}
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                className="bg-white/95 rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    Wish Pulled from the Jar
                  </span>
                  <button
                    onClick={() => setActiveWish(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">
                  {activeWish.title}
                </h3>

                <p className="text-slate-700 text-base leading-relaxed font-sans mb-6">
                  "{activeWish.text}"
                </p>

                <div className="pt-4 border-t border-amber-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-script text-lg text-rose-600 font-semibold">
                    May it all come true for you ❤️
                  </span>
                  <button
                    onClick={handleMakeAWish}
                    className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1"
                  >
                    Pull Another ⭐
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/60 border border-dashed border-rose-200 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
                  <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
                </div>
                <h4 className="font-serif font-bold text-slate-700 text-lg mb-1">
                  Tap "Make a Wish ✨" or Click a Star
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm max-w-sm">
                  Let the stars reveal the romantic wishes, hopes, and promises written for you.
                </p>
              </div>
            )}
          </AnimatePresence>

          {/* Quick List of All Wishes */}
          <div className="mt-6">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              All Wishes in the Jar ({wishes.length})
            </h5>
            <div className="flex flex-wrap gap-2">
              {wishes.map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    sound.playTwinkle();
                    setActiveWish(w);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                    activeWish?.id === w.id
                      ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                      : 'bg-white/70 hover:bg-white text-slate-700 border-rose-100'
                  }`}
                >
                  <span>⭐</span>
                  <span className="truncate max-w-[140px]">{w.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Custom Wish Modal */}
      <AnimatePresence>
        {isAddingWish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-rose-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif font-bold text-slate-800 text-lg flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Add a Star to the Wish Jar
                </h3>
                <button
                  onClick={() => setIsAddingWish(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddCustomWish} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Wish Title / Theme
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Trips to the beach"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Wish Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Write a warm hope, dream, or memory wish..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingWish(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-full shadow-md shadow-rose-500/20"
                  >
                    Seal Inside Jar ✨
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation Footer */}
      {onNext && (
        <div className="mt-8 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/30 flex items-center gap-2 transition-all"
          >
            <span>Next: Moments Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
