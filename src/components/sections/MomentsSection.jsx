import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Maximize2, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Heart, 
  Sparkles, 
  ArrowRight,
  Layers,
  Star
} from 'lucide-react';
import { allPhotos, featuredPhotos, olivePhotos } from '../../data/photos';
import { sound } from '../../utils/soundEffects';

export default function MomentsSection({ onNext }) {
  // Default to 'all' so every single one of the 18 images is visible on the website!
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'olive', 'featured'

  const currentPhotos = 
    activeTab === 'olive' 
      ? olivePhotos 
      : (activeTab === 'featured' ? featuredPhotos : allPhotos);

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);

  // Slideshow auto-advance effect
  useEffect(() => {
    let timer;
    if (isPlayingSlideshow) {
      timer = setInterval(() => {
        setLightboxIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % currentPhotos.length;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlayingSlideshow, currentPhotos.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % currentPhotos.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, currentPhotos.length]);

  const openLightbox = (index) => {
    sound.playPop();
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsPlayingSlideshow(false);
  };

  const nextPhoto = (e) => {
    e?.stopPropagation();
    sound.playPop();
    setLightboxIndex((prev) => (prev + 1) % currentPhotos.length);
  };

  const prevPhoto = (e) => {
    e?.stopPropagation();
    sound.playPop();
    setLightboxIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length);
  };

  const toggleSlideshow = () => {
    sound.playChime();
    if (!isPlayingSlideshow) {
      if (lightboxIndex === null) setLightboxIndex(0);
      setIsPlayingSlideshow(true);
    } else {
      setIsPlayingSlideshow(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-2 sm:py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-rose-100 text-rose-700 shadow-sm">
          <Camera className="w-3.5 h-3.5 text-rose-500" />
          Surprise 5 of 9 • Captured Moments
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mt-2">
          Memories With You
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-lg mx-auto">
          Every photo tells a story, with special priority for our favorite moments and every cherished memory kept right here.
        </p>

        {/* Tab Filter Switcher & Slideshow Trigger */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <div className="bg-white/85 p-1 rounded-full border border-rose-200 shadow-sm flex items-center gap-1">
            <button
              onClick={() => {
                setActiveTab('all');
                setLightboxIndex(null);
              }}
              className={`px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 18 Photos ({allPhotos.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('olive');
                setLightboxIndex(null);
              }}
              className={`px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'olive'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-amber-700 hover:text-amber-800 bg-amber-50/60'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-200" />
              <span>Olive Favorites ⭐ ({olivePhotos.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('featured');
                setLightboxIndex(null);
              }}
              className={`px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'featured'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Top 10</span>
            </button>
          </div>

          <button
            onClick={toggleSlideshow}
            className={`px-4 py-1.5 rounded-full border text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              isPlayingSlideshow
                ? 'bg-rose-500 text-white border-rose-400'
                : 'bg-white/85 hover:bg-white text-rose-600 border-rose-200'
            }`}
          >
            {isPlayingSlideshow ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Slideshow</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                <span>Play Slideshow</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Gallery Grid of Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentPhotos.map((photo, idx) => {
          const isOlive = photo.isOlive;

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.04, 0.4) }}
              onClick={() => openLightbox(idx)}
              className={`group relative cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col ${
                isOlive
                  ? 'border-2 border-amber-300 ring-2 ring-amber-100/70 shadow-amber-200/40'
                  : 'border border-rose-100 hover:border-rose-300'
              }`}
            >
              {/* Image Box */}
              <div className="relative aspect-[4/3] overflow-hidden bg-rose-50">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover view overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5" />
                    View Fullscreen
                  </span>
                </div>

                {/* Index & Olive Priority Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-rose-700 shadow-sm">
                    #{idx + 1}
                  </span>

                  {isOlive && (
                    <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold text-[10px] tracking-wide shadow-md flex items-center gap-1 uppercase">
                      <Star className="w-3 h-3 fill-white" />
                      {photo.badge || "Olive Priority ⭐"}
                    </span>
                  )}
                </div>
              </div>

              {/* Caption Card Body */}
              <div
                className={`p-4 flex-1 flex flex-col justify-between ${
                  isOlive
                    ? 'bg-gradient-to-b from-amber-50/40 via-white to-rose-50/20'
                    : 'bg-gradient-to-b from-white to-rose-50/20'
                }`}
              >
                <p className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed italic">
                  "{photo.caption}"
                </p>

                <div className="mt-3 pt-2 border-t border-rose-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className={`font-serif font-medium ${isOlive ? 'text-amber-700 font-bold' : 'text-rose-500'}`}>
                    {photo.title || "Special Moment"}
                  </span>
                  <div className="flex items-center gap-1">
                    {isOlive && <span className="text-xs">⭐</span>}
                    <Heart className="w-3.5 h-3.5 text-rose-300 group-hover:text-rose-500 group-hover:fill-rose-500 transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900/85 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col items-center justify-between p-3 sm:p-5"
            >
              {/* Top Bar inside Lightbox */}
              <div className="w-full flex items-center justify-between px-2 text-white/80 text-xs sm:text-sm mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-rose-400">
                    Photo {lightboxIndex + 1} of {currentPhotos.length}
                  </span>

                  {currentPhotos[lightboxIndex].isOlive && (
                    <span className="bg-amber-400/90 text-slate-900 font-bold px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-slate-900" />
                      Olive Special
                    </span>
                  )}

                  {isPlayingSlideshow && (
                    <span className="text-[11px] bg-rose-500/80 px-2 py-0.5 rounded-full text-white animate-pulse">
                      Playing Slideshow
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleSlideshow}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                    title={isPlayingSlideshow ? "Pause" : "Play Slideshow"}
                  >
                    {isPlayingSlideshow ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={closeLightbox}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Photo with Nav Arrows */}
              <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden my-2">
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 sm:left-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg"
                  title="Previous photo (Left arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <img
                  src={currentPhotos[lightboxIndex].url}
                  alt={currentPhotos[lightboxIndex].caption}
                  className="max-h-[62vh] sm:max-h-[68vh] max-w-full object-contain rounded-2xl shadow-xl select-none"
                />

                <button
                  onClick={nextPhoto}
                  className="absolute right-2 sm:right-4 z-10 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-lg"
                  title="Next photo (Right arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Caption Footer in Lightbox */}
              <div className="w-full text-center px-4 py-2 bg-black/50 rounded-2xl backdrop-blur-md">
                <p className="font-serif text-white text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  "{currentPhotos[lightboxIndex].caption}"
                </p>
                <div className="text-[11px] text-rose-300 mt-1 font-sans">
                  {currentPhotos[lightboxIndex].title} • {currentPhotos[lightboxIndex].location || "With You"}
                </div>
              </div>
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
            <span>Next: Places We Love</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
