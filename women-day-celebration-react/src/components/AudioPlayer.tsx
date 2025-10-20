import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AudioPlayer.css';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: (playing: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onToggle }) => {
  const [volume, setVolume] = useState(50);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  }, [isPlaying]);

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
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
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
