import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './AudioPlayer.css';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: (playing: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onToggle }) => {
  const [volume, setVolume] = useState(50);
  const [showNotification, setShowNotification] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const melodyIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Create background melody using Web Audio API
  const createBackgroundMelody = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    const audioContext = audioContextRef.current;
    
    // Giai điệu nhẹ nhàng cho ngày Phụ nữ (C major scale)
    const melody = [
      { freq: 261.63, duration: 800 }, // C4
      { freq: 293.66, duration: 400 }, // D4
      { freq: 329.63, duration: 400 }, // E4
      { freq: 349.23, duration: 800 }, // F4
      { freq: 392.00, duration: 400 }, // G4
      { freq: 440.00, duration: 400 }, // A4
      { freq: 493.88, duration: 800 }, // B4
      { freq: 523.25, duration: 1200 } // C5
    ];
    
    let noteIndex = 0;

    const playMelody = () => {
      if (!isPlaying) return;

      const note = melody[noteIndex];
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime);
      oscillator.type = 'sine';
      
      // Tạo hiệu ứng fade in/out mượt mà
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.08 * (volume / 100), audioContext.currentTime + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.08 * (volume / 100), audioContext.currentTime + note.duration/1000 - 0.1);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + note.duration/1000);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + note.duration/1000);
      
      noteIndex = (noteIndex + 1) % melody.length;
      
      melodyIntervalRef.current = setTimeout(playMelody, note.duration);
    };

    playMelody();
  };

  const stopMelody = () => {
    if (melodyIntervalRef.current) {
      clearTimeout(melodyIntervalRef.current);
      melodyIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      
      // Resume audio context if suspended (required by some browsers)
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      
      createBackgroundMelody();
    } else {
      stopMelody();
    }

    return () => {
      stopMelody();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, volume]);

  // Initialize audio context on first user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };

    // Initialize on first click/touch
    document.addEventListener('click', initAudio, { once: true });
    document.addEventListener('touchstart', initAudio, { once: true });

    return () => {
      document.removeEventListener('click', initAudio);
      document.removeEventListener('touchstart', initAudio);
    };
  }, []);

  const toggleMusic = () => {
    onToggle(!isPlaying);
  };

  const changeVolume = (value: number) => {
    setVolume(value);
  };

  return (
    <>
      {/* Music Notification */}
      {showNotification && (
        <motion.div
          className="music-notification"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          🎵 Nhạc nền đã tự động phát - Chúc mừng ngày Phụ nữ Việt Nam! 🌸
        </motion.div>
      )}

      {/* Audio Player */}
      <motion.div
        className="audio-player"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="music-controls">
          <motion.button
            className={`music-btn ${isPlaying ? 'playing' : ''}`}
            onClick={toggleMusic}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{isPlaying ? '⏸️' : '🎵'}</span>
          </motion.button>
          
          <div className="music-info">
            <div className="song-title">
              {isPlaying ? '🌸 Giai điệu mùa xuân' : 'Nhạc nền đã tắt'}
            </div>
            <div className="volume-control">
              <span>🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => changeVolume(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AudioPlayer;
