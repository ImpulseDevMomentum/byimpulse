"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [songs, setSongs] = useState<string[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isDragDisabled, setIsDragDisabled] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const dragConstraintsRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('/api/music');
        if (!response.ok) throw new Error('Failed to fetch song(s)');
        const data = await response.json();
        setSongs(data.songs);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && songs.length > 0) {
      audioRef.current.src = `/music/${songs[currentSongIndex]}`;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio err:", e));
      } else {
        audioRef.current.load();
      }
    }
  }, [currentSongIndex, songs]);

  useEffect(() => {
    if (audioRef.current && songs.length > 0) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Play err:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, songs.length]);

  const togglePlayPause = () => setIsPlaying(prev => !prev);

  const playNext = useCallback(() => {
    setCurrentSongIndex(prev => (prev + 1) % songs.length);
  }, [songs.length]);

  const playPrev = useCallback(() => {
    setCurrentSongIndex(prev => (prev === 0 ? songs.length - 1 : prev - 1));
  }, [songs.length]);

  const getSongName = (filename: string) =>
    filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');

  const getVolumeIcon = () => {
    if (volume === 0) {
      return (
        <motion.svg
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-5 h-5 text-white/70"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        </motion.svg>
      );
    } else if (volume < 0.5) {
      return (
        <motion.svg
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-5 h-5 text-white/70"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 9v6h4l5 5V4l-5 5H7z" />
        </motion.svg>
      );
    } else {
      return (
        <motion.svg
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-5 h-5 text-white/70"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </motion.svg>
      );
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-8 right-8 z-50 bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-white/10"
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/70 text-sm"
        >
          Loading...
        </motion.span>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-8 right-8 z-50 bg-black/30 backdrop-blur-md rounded-full px-6 py-3 border border-red-500/30"
      >
        <span className="text-red-400 text-sm">Error: {error}</span>
      </motion.div>
    );
  }

  if (songs.length === 0) return null;

  return (
    <div ref={dragConstraintsRef} className="fixed inset-0 z-50 pointer-events-none">
      <motion.div
        layout
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-8 right-8 z-50 pointer-events-auto"
        drag={!isDragDisabled}
        dragConstraints={dragConstraintsRef}
        dragElastic={0.2}
        dragMomentum={false}
      >
        <motion.div className="cursor-grab">
          <motion.div className="bg-black/30 backdrop-blur-md rounded-full border border-white/10 overflow-hidden shadow-2xl pointer-events-auto">
            <audio ref={audioRef} onEnded={playNext} />

            <div className="flex items-center gap-4 py-3 px-5">
              <motion.button
                onClick={togglePlayPause}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-10 h-10 rounded-full bg-white hover:bg-white/90 flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-lg"
              >
                <AnimatePresence mode="wait">
                  {isPlaying ? (
                    <motion.svg
                      key="pause"
                      initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="w-4 h-4 text-black"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="play"
                      initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="w-4 h-4 text-black ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="flex items-center gap-4 overflow-hidden">
                <motion.button
                  onClick={playPrev}
                  whileHover={{ scale: 1.15, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-white/70 hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>

                <motion.div className="flex flex-col min-w-[150px] max-w-[200px]">
                  <motion.p
                    key={currentSongIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="text-white text-sm font-medium truncate"
                  >
                    {getSongName(songs[currentSongIndex])}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-white/40 text-xs"
                  >
                    {currentSongIndex + 1} / {songs.length}
                  </motion.p>
                </motion.div>

                <motion.button
                  onClick={playNext}
                  whileHover={{ scale: 1.15, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-white/70 hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                <motion.div className="flex items-center gap-2 pl-4 border-l border-white/10">
                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {getVolumeIcon()}
                  </motion.div>

                  <motion.input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    onPointerDown={() => setIsDragDisabled(true)}
                    onPointerUp={() => setIsDragDisabled(false)}
                    onPointerLeave={() => setIsDragDisabled(false)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:w-3
                      [&::-webkit-slider-thumb]:h-3
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-white
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:shadow-lg
                      [&::-webkit-slider-thumb]:hover:scale-125
                      [&::-moz-range-thumb]:w-3
                      [&::-moz-range-thumb]:h-3
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-white
                      [&::-moz-range-thumb]:border-0"
                    style={{
                      background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MusicPlayer;