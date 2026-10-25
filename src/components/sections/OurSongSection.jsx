import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Heart, 
  Sparkles, 
  ArrowRight,
  Headphones,
  Tv,
  FileText,
  ExternalLink
} from 'lucide-react';
import { config } from '../../data/config';
import { tuChahiyeLyrics } from '../../data/lyrics';
import { useMusic } from '../../context/MusicContext';
import { triggerConfetti } from '../../utils/confetti';

export default function OurSongSection({ onNext }) {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    showVideo,
    setShowVideo,
    toggleSong,
    seekTo,
    setVolume,
    toggleMute
  } = useMusic();

  const [activeTab, setActiveTab] = useState('lyrics'); // 'lyrics' or 'video'
  const lyricsContainerRef = useRef(null);

  // Time format helper
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e) => {
    const newPercent = parseFloat(e.target.value);
    const newTime = (newPercent / 100) * duration;
    seekTo(newTime);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-2 sm:py-6 px-4">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-pink-100 text-pink-700 shadow-sm">
          <Music className="w-3.5 h-3.5 text-pink-500" />
          Surprise 8 of 9 • Our Special Song
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mt-2">
          {config.music.title}
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-md mx-auto">
          by <span className="font-semibold text-rose-600">{config.music.artist}</span>
        </p>

        {/* View Mode Toggle: Lyrics vs Video */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="bg-white/80 p-1 rounded-full border border-pink-200 shadow-sm flex items-center">
            <button
              onClick={() => {
                setActiveTab('lyrics');
                setShowVideo(false);
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'lyrics'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Sing-Along Lyrics</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('video');
                setShowVideo(true);
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === 'video'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Watch Lyrical Video</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Music Player Card */}
      <div className="bg-white/95 rounded-[36px] p-6 sm:p-9 border border-pink-200 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Spinning Vinyl Record & Cover */}
          <div className="md:col-span-5 flex flex-col justify-center items-center">
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center">
              {/* Spinning Vinyl Record Disk behind album */}
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className={`absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-slate-900 border-4 border-slate-800 shadow-2xl flex items-center justify-center transition-all ${
                  isPlaying ? 'translate-x-6 sm:translate-x-8' : 'translate-x-0'
                }`}
              >
                {/* Vinyl Grooves */}
                <div className="w-40 h-40 rounded-full border border-slate-700/60" />
                <div className="w-32 h-32 rounded-full border border-slate-700/50" />
                <div className="w-24 h-24 rounded-full border border-slate-700/40" />

                {/* Center Record Label */}
                <div className="absolute w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-600 border-2 border-white flex flex-col items-center justify-center text-white text-[9px] font-bold text-center p-1 shadow-inner">
                  <span>Tu Chahiye</span>
                  <span className="text-[7px] opacity-80">Atif Aslam</span>
                </div>
                <div className="absolute w-3 h-3 rounded-full bg-white border border-slate-900" />
              </motion.div>

              {/* Album Cover Art Front */}
              <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-rose-100 flex-shrink-0">
                <img
                  src={config.music.cover}
                  alt={config.music.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <div className="text-xs font-bold leading-tight">
                    Tu Chahiye ❤️
                  </div>
                  <div className="text-[10px] text-rose-200">
                    For Anu, with love
                  </div>
                </div>
              </div>
            </div>

            {/* Note banner under album */}
            <a
              href={config.music.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-[11px] font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
            >
              <span>{config.music.sourceName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Right Column: Player Controls & Lyrics Stream */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* Romantic Quote Card */}
            <div className="bg-gradient-to-br from-rose-50/90 to-pink-50/70 rounded-2xl p-4 border border-rose-100 mb-4 relative shadow-sm">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block mb-1">
                A Dedication For You
              </span>
              <p className="font-serif italic text-sm text-slate-800 leading-relaxed">
                “{config.music.note}”
              </p>
              <div className="mt-2 text-[11px] text-slate-500 font-sans">
                {config.music.personalDedication}
              </div>
            </div>

            {/* If Video mode active, show video player box here */}
            {activeTab === 'video' ? (
              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-rose-200 mb-4 bg-black relative">
                <iframe
                  src={`https://www.youtube.com/embed/${config.music.youtubeId}?autoplay=1&enablejsapi=1`}
                  title={config.music.sourceName}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              /* Lyrics Reader with live scroll */
              <div
                ref={lyricsContainerRef}
                className="w-full h-44 overflow-y-auto rounded-2xl bg-slate-50/80 p-3 sm:p-4 border border-rose-100 mb-4 font-sans text-xs sm:text-sm space-y-2 text-slate-600 scroll-smooth shadow-inner"
              >
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest sticky top-0 bg-slate-50/90 pb-1">
                  Lyrics • Tu Chahiye
                </div>
                {tuChahiyeLyrics.map((line, idx) => (
                  <p
                    key={idx}
                    className="hover:text-rose-600 transition-colors py-0.5"
                  >
                    <span className="font-mono text-[10px] text-rose-400 mr-2">
                      {line.time}
                    </span>
                    <span className="font-medium text-slate-700">
                      {line.text}
                    </span>
                  </p>
                ))}
              </div>
            )}

            {/* Progress Slider */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercent || 0}
                onChange={handleSeek}
                className="w-full h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls & Volume */}
            <div className="flex items-center justify-between">
              {/* Main Play / Pause Button */}
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    toggleSong();
                    if (!isPlaying) triggerConfetti();
                  }}
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 transition-all p-3.5"
                  title={isPlaying ? "Pause Tu Chahiye" : "Play Tu Chahiye"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-white" />
                  ) : (
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  )}
                </motion.button>

                <div>
                  <div className="text-xs font-bold text-slate-800">
                    {isPlaying ? (
                      <span className="text-rose-600 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        Playing Atif Aslam
                      </span>
                    ) : (
                      <span>Play "Tu Chahiye"</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    Continuous playback across website
                  </div>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-rose-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-slate-600" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 sm:w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>
            </div>
          </div>
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
            <span>Next: A Final Surprise</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
