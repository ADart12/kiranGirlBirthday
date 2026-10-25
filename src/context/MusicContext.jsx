import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { config } from '../data/config';
import { sound } from '../utils/soundEffects';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(272); // ~4m 32s standard length of Tu Chahiye
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [playerMode, setPlayerMode] = useState('youtube'); // 'youtube' or 'local'

  const ytPlayerRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // 1. Initialize YouTube IFrame API
  useEffect(() => {
    // Check if script already inserted
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      try {
        ytPlayerRef.current = new window.YT.Player('youtube-global-player', {
          height: '100%',
          width: '100%',
          videoId: config.music.youtubeId,
          playerVars: {
            playsinline: 1,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            enablejsapi: 1,
          },
          events: {
            onReady: (event) => {
              setIsPlayerReady(true);
              event.target.setVolume(volume * 100);
            },
            onStateChange: (event) => {
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                const d = ytPlayerRef.current.getDuration();
                if (d) setDuration(d);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                setIsPlaying(false);
              }
            },
            onError: () => {
              // Fallback to local audio or synth
              setPlayerMode('local');
            }
          }
        });
      } catch (e) {
        console.warn('YouTube player init failed, falling back:', e);
        setPlayerMode('local');
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // 2. Track current play time every second
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        if (playerMode === 'youtube' && ytPlayerRef.current && ytPlayerRef.current.getCurrentTime) {
          try {
            const curr = ytPlayerRef.current.getCurrentTime();
            setCurrentTime(curr);
          } catch {
            // Player might not be ready
          }
        } else if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playerMode]);

  const playSong = () => {
    if (playerMode === 'youtube' && ytPlayerRef.current && isPlayerReady) {
      try {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
        return;
      } catch (err) {
        console.warn(err);
      }
    }

    // Local / fallback
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        sound.startRomanticBgm();
        setIsPlaying(true);
      });
    } else {
      sound.startRomanticBgm();
      setIsPlaying(true);
    }
  };

  const pauseSong = () => {
    if (playerMode === 'youtube' && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.pauseVideo();
      } catch (err) {
        console.warn(err);
      }
    }
    if (audioRef.current) {
      audioRef.current.pause();
    }
    sound.stopRomanticBgm();
    setIsPlaying(false);
  };

  const toggleSong = () => {
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  };

  const seekTo = (seconds) => {
    if (playerMode === 'youtube' && ytPlayerRef.current && ytPlayerRef.current.seekTo) {
      try {
        ytPlayerRef.current.seekTo(seconds, true);
        setCurrentTime(seconds);
      } catch (e) {
        console.warn(e);
      }
    } else if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  };

  const setVolume = (val) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (clamped > 0) setIsMuted(false);

    if (playerMode === 'youtube' && ytPlayerRef.current && ytPlayerRef.current.setVolume) {
      try {
        ytPlayerRef.current.setVolume(clamped * 100);
      } catch (e) {
        console.warn(e);
      }
    }
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
    sound.setVolume(clamped);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(volume || 0.6);
      setIsMuted(false);
    } else {
      if (playerMode === 'youtube' && ytPlayerRef.current && ytPlayerRef.current.mute) {
        try {
          ytPlayerRef.current.mute();
        } catch {}
      }
      if (audioRef.current) audioRef.current.muted = true;
      sound.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        showVideo,
        setShowVideo,
        playerMode,
        setPlayerMode,
        playSong,
        pauseSong,
        toggleSong,
        seekTo,
        setVolume,
        toggleMute
      }}
    >
      {children}

      {/* Hidden/Persistent Global YouTube Player Container */}
      {/* Offscreen when not in video mode, or moved into Section 8 via portal/re-parenting */}
      <div
        className={`fixed transition-opacity duration-300 pointer-events-auto ${
          showVideo
            ? 'bottom-20 right-4 z-50 w-72 sm:w-80 h-44 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-rose-400 bg-black opacity-100'
            : 'top-[-9999px] left-[-9999px] w-1 h-1 opacity-0 pointer-events-none'
        }`}
      >
        <div id="youtube-global-player" className="w-full h-full" />
      </div>

      {/* Fallback Local Audio Tag */}
      <audio
        ref={audioRef}
        src={config.music.audioSrc}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration || 272);
          }
        }}
      />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
