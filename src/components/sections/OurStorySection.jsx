import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MessageCircle, 
  Heart, 
  Camera, 
  Smile, 
  Cake, 
  Compass, 
  Calendar, 
  ArrowRight,
  X,
  Maximize2
} from 'lucide-react';
import { timelineStory } from '../../data/timeline';

const ICON_MAP = {
  Sparkles,
  MessageCircle,
  Heart,
  Camera,
  Smile,
  Cake,
  Compass
};

export default function OurStorySection({ onNext }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-6 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-purple-100 text-purple-700 shadow-sm">
          <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500" />
          Surprise 3 of 9 • Our Story
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mt-2">
          Milestones of Our Journey
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          From the very first glance to this special birthday and all the days ahead.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Central Vertical Line (hidden on very small screens, visible on md) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-rose-200 via-pink-300 to-purple-200 transform -translate-x-1/2" />

        {/* Timeline Items */}
        <div className="space-y-8 md:space-y-12">
          {timelineStory.map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || Heart;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card (Half Width on md) */}
                <div className="w-full md:w-1/2 md:px-6">
                  <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-rose-100 shadow-xl shadow-rose-900/5 hover:shadow-rose-900/10 transition-shadow">
                    {/* Category & Date badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                        {item.category}
                      </span>
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-rose-400" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-800 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-4">
                      {item.description}
                    </p>

                    {/* Attached Real Couple Photo */}
                    {item.photo && (
                      <div
                        onClick={() => setSelectedPhoto(item.photo)}
                        className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[16/10] bg-rose-50 border border-rose-100 shadow-sm"
                      >
                        <img
                          src={item.photo}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 text-xs font-semibold backdrop-blur-[2px]">
                          <Maximize2 className="w-4 h-4" />
                          <span>View Photo</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Central Pin Icon */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-rose-400 shadow-md items-center justify-center z-10 text-rose-500">
                  <Icon className="w-5 h-5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal for Photo viewing */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-2"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedPhoto}
                alt="Memory preview"
                className="w-full h-full max-h-[80vh] object-contain rounded-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Navigation Footer */}
      {onNext && (
        <div className="mt-10 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-rose-500/30 flex items-center gap-2 transition-all"
          >
            <span>Next: Wishes & Dreams</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
