import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { SECTIONS } from './BottomNavDock';
import { config } from '../data/config';
import { sound } from '../utils/soundEffects';

export default function DashboardGrid({ onSelectSection, exploredSections = [] }) {
  const completedCount = exploredSections.length;
  const progressPercent = Math.round((completedCount / SECTIONS.length) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto py-2 sm:py-6 px-4">
      {/* Dashboard Heading & Subtitle as specified in readme */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-100 text-rose-700 shadow-sm mb-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
          A Little World Made For You
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-800 tracking-tight"
        >
          {config.dashboardTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 text-sm sm:text-base font-medium mt-2 max-w-lg mx-auto"
        >
          {config.dashboardSubtitle}
        </motion.p>

        {/* Progress Tracker Bar */}
        <div className="mt-5 max-w-xs mx-auto bg-white/80 p-3 rounded-2xl border border-rose-200/80 shadow-sm backdrop-blur-sm">
          <div className="flex justify-between items-center text-xs font-bold mb-1.5 text-slate-600">
            <span>Exploration Progress</span>
            <span className="text-rose-600">{completedCount} of 9 Unlocked</span>
          </div>
          <div className="w-full h-2 bg-rose-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* 9 Attractive Clickable Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SECTIONS.map((sec, idx) => {
          const isExplored = exploredSections.includes(sec.id);

          return (
            <motion.div
              key={sec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                sound.playPop();
                onSelectSection(idx);
              }}
              className="group relative cursor-pointer rounded-3xl p-6 bg-white/85 hover:bg-white border border-rose-100 hover:border-rose-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Corner soft glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100/50 to-transparent pointer-events-none group-hover:from-rose-200/60 transition-colors" />

              {/* Card Top: Number + Emoji + Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 group-hover:bg-rose-100 text-2xl flex items-center justify-center transition-colors shadow-sm">
                  <span>{sec.emoji}</span>
                </div>

                {isExplored ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Explored
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-rose-500 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                    #{sec.id}
                  </span>
                )}
              </div>

              {/* Card Title & Preview */}
              <div className="my-1">
                <h3 className="font-serif text-xl font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                  {sec.id}. {sec.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-sans mt-1 leading-relaxed">
                  {sec.preview}
                </p>
              </div>

              {/* Card Bottom CTA */}
              <div className="mt-4 pt-3 border-t border-rose-50 flex items-center justify-between text-xs font-bold text-rose-500 group-hover:text-rose-600">
                <span>Open Surprise</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
