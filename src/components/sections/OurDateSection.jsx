import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarHeart, 
  Clock, 
  Sparkles, 
  Heart, 
  Edit3, 
  Check, 
  ArrowRight,
  Gift
} from 'lucide-react';
import { config } from '../../data/config';
import { sound } from '../../utils/soundEffects';

export default function OurDateSection({ onNext }) {
  // Configurable date stored in state / localStorage
  const [startDateStr, setStartDateStr] = useState(() => {
    const saved = localStorage.getItem('romantic_special_date');
    if (saved && !saved.includes('2024-01-14')) {
      return saved;
    }
    return config.specialDate;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editInput, setEditInput] = useState(startDateStr.split('T')[0]);

  // Live time units
  const [timeUnits, setTimeUnits] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    totalHours: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDateStr).getTime();
      const now = new Date().getTime();
      let diff = Math.max(0, now - start);

      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const totalHours = Math.floor(diff / (1000 * 60 * 60));

      const years = Math.floor(totalDays / 365);
      const remainingDaysAfterYears = totalDays % 365;
      const months = Math.floor(remainingDaysAfterYears / 30);
      const days = remainingDaysAfterYears % 30;

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeUnits({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
        totalDays,
        totalHours
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDateStr]);

  const handleSaveDate = (e) => {
    e.preventDefault();
    if (!editInput) return;
    const newIso = `${editInput}T00:00:00`;
    setStartDateStr(newIso);
    localStorage.setItem('romantic_special_date', newIso);
    setIsEditing(false);
    sound.playChime();
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-6 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-100 text-rose-700 shadow-sm">
          <CalendarHeart className="w-3.5 h-3.5 text-rose-500" />
          Surprise 7 of 9 • Our Special Time
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mt-2">
          Every Second Counting
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          A live journey of all the moments, minutes, and days we’ve shared.
        </p>
      </div>

      {/* Main Counter Card */}
      <div className="bg-white/95 rounded-[36px] p-6 sm:p-10 border border-rose-200/80 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Counter Top Bar: Date info + Config button */}
        <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-rose-100 gap-2">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
              Journey Since
            </span>
            <div className="font-serif text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>{new Date(startDateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Customize this date"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Real-Time
            </span>
          </div>
        </div>

        {/* Date Edit Form */}
        <AnimatePresence>
          {isEditing && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleSaveDate}
              className="mb-6 p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-wrap items-center gap-3 overflow-hidden"
            >
              <div className="text-xs font-semibold text-rose-800">
                Set Journey Date:
              </div>
              <input
                type="date"
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-rose-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-sm flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                Update Counter
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-xs text-slate-500 hover:underline"
              >
                Cancel
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* 6 Digit Unit Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 text-center">
          {[
            { label: 'Years', val: timeUnits.years },
            { label: 'Months', val: timeUnits.months },
            { label: 'Days', val: timeUnits.days },
            { label: 'Hours', val: timeUnits.hours },
            { label: 'Minutes', val: timeUnits.minutes },
            { label: 'Seconds', val: timeUnits.seconds, highlight: true }
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 border transition-all ${
                item.highlight
                  ? 'bg-gradient-to-b from-rose-50 to-pink-100/60 border-rose-300 shadow-md'
                  : 'bg-white/80 border-rose-100 shadow-sm'
              }`}
            >
              <motion.div
                key={item.val}
                initial={{ scale: 1.15, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-serif text-3xl sm:text-4xl font-black text-rose-600"
              >
                {String(item.val).padStart(2, '0')}
              </motion.div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Milestones Statistics Row */}
        <div className="mt-8 pt-6 border-t border-rose-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 text-center">
            <div className="font-serif text-2xl font-black text-rose-700">
              {timeUnits.totalDays.toLocaleString()}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">
              Days Together
            </div>
          </div>

          <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100 text-center">
            <div className="font-serif text-2xl font-black text-purple-700">
              {timeUnits.totalHours.toLocaleString()}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">
              Hours of Connection
            </div>
          </div>

          <div className="bg-pink-50/50 rounded-2xl p-4 border border-pink-100 text-center">
            <div className="font-serif text-2xl font-black text-pink-700">
              ∞
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">
              Memories Ahead
            </div>
          </div>
        </div>

        {/* Birthday Note Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-between shadow-lg shadow-rose-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">
              🎂
            </div>
            <div>
              <div className="font-serif font-bold text-base">
                Celebrating Anu's Birthday Today!
              </div>
              <div className="text-xs text-rose-100">
                Another wonderful chapter begins right here.
              </div>
            </div>
          </div>
          <Heart className="w-6 h-6 fill-white" />
        </div>
      </div>

      {/* Navigation Footer */}
      {onNext && (
        <div className="mt-8 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/30 flex items-center gap-2 transition-all"
          >
            <span>Next: Our Song</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
