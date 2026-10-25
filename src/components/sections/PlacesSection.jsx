import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Heart, 
  ArrowRight, 
  X, 
  List, 
  Map as MapIcon 
} from 'lucide-react';
import { specialPlaces } from '../../data/places';
import { sound } from '../../utils/soundEffects';

export default function PlacesSection({ onNext }) {
  const [selectedPlace, setSelectedPlace] = useState(specialPlaces[0]);
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'

  const handleSelectPlace = (place) => {
    sound.playPop();
    setSelectedPlace(place);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-2 sm:py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-teal-100 text-teal-800 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-teal-600" />
          Surprise 6 of 9 • Special Places
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mt-2">
          Our Map of Memories
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Every place we’ve been, and all the destinations waiting for our footsteps.
        </p>

        {/* View Mode Switcher */}
        <div className="mt-4 flex justify-center">
          <div className="bg-white/80 p-1 rounded-full border border-teal-200 shadow-sm flex items-center">
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'map'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Interactive Map</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Postcard Cards</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'map' ? (
        /* Interactive Illustrated Map Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Stylized Illustrated Map Canvas */}
          <div className="lg:col-span-7 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl p-4 sm:p-6 border-2 border-teal-100 shadow-xl relative min-h-[380px] sm:min-h-[440px] overflow-hidden flex flex-col justify-between">
            {/* Map Background SVG Graphics (Islands, contours, water waves, compass rose) */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0d9488" strokeWidth="0.5" strokeOpacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Dotted paths connecting the pins */}
              <path
                d="M 120 130 Q 180 80 260 100 T 200 240 T 320 300 T 380 180"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />

              {/* Water contours */}
              <circle cx="80" cy="80" r="60" fill="#ccfbf1" opacity="0.3" />
              <circle cx="340" cy="320" r="90" fill="#cffafe" opacity="0.3" />
            </svg>

            {/* Compass Rose at top right of map */}
            <div className="absolute top-4 right-4 flex flex-col items-center opacity-70 pointer-events-none">
              <span className="text-[10px] font-bold text-teal-800 font-mono">N</span>
              <Compass className="w-8 h-8 text-teal-700 animate-spin-slow" />
            </div>

            {/* Map Header Label */}
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/80 text-[11px] font-bold text-teal-800 border border-teal-200 shadow-sm flex items-center gap-1 w-fit">
                <span>📍</span> Tap any glowing pin to reveal memory
              </span>
            </div>

            {/* Animated Interactive Pins */}
            <div className="relative w-full h-80 my-auto">
              {specialPlaces.map((place) => {
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <motion.div
                    key={place.id}
                    style={{ left: `${place.pinX}%`, top: `${place.pinY}%` }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
                    whileHover={{ scale: 1.25 }}
                    onClick={() => handleSelectPlace(place)}
                  >
                    {/* Pulsing ring */}
                    <div
                      className={`absolute -inset-2 rounded-full animate-ping pointer-events-none ${
                        isSelected ? 'bg-rose-400 opacity-75' : 'bg-teal-400 opacity-40'
                      }`}
                    />

                    {/* Pin Marker */}
                    <div
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white transition-all ${
                        isSelected
                          ? 'bg-rose-600 text-white scale-125'
                          : 'bg-teal-600 text-white hover:bg-teal-700'
                      }`}
                    >
                      <MapPin className="w-4 h-4 fill-white" />
                    </div>

                    {/* Small label below pin */}
                    <div className="absolute top-9 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-800 shadow-sm border border-teal-100 pointer-events-none">
                      {place.name.split(' ')[0]}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Footer Note */}
            <div className="relative z-10 flex justify-between items-center text-[11px] text-teal-800/80 font-mono">
              <span>Coordinates: Special Memories</span>
              <span>Always With You ❤️</span>
            </div>
          </div>

          {/* Right Postcard Preview Card */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {selectedPlace && (
                <motion.div
                  key={selectedPlace.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-teal-100 shadow-xl overflow-hidden"
                >
                  {/* Photo of the place */}
                  {selectedPlace.photo && (
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4 bg-teal-50 border border-teal-100 shadow-sm">
                      <img
                        src={selectedPlace.photo}
                        alt={selectedPlace.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/85 text-xs font-bold text-teal-800 backdrop-blur-sm shadow-sm">
                        {selectedPlace.mood}
                      </div>
                    </div>
                  )}

                  {/* Header Details */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                      {selectedPlace.tagline}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedPlace.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-slate-800 mb-2">
                    {selectedPlace.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-4">
                    {selectedPlace.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-script text-base text-rose-500 font-semibold">
                      A place etched in heart
                    </span>
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* List Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {specialPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-3xl p-5 border border-teal-100 shadow-md hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              {place.photo && (
                <div className="rounded-2xl overflow-hidden aspect-[16/10] mb-3 bg-teal-50">
                  <img
                    src={place.photo}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                  {place.mood}
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-800 mt-1 mb-1">
                  {place.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {place.description}
                </p>
              </div>
            </div>
          ))}
        </div>
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
            <span>Next: Our Date & Counter</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
