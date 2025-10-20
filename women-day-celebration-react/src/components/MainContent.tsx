import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './MainContent.css';

interface UserData {
  name: string;
  wishes: string;
  poem: string;
}

interface MainContentProps {
  userData: UserData;
}

const MainContent: React.FC<MainContentProps> = ({ userData }) => {
  const [displayWishes, setDisplayWishes] = useState('');
  const [displayPoem, setDisplayPoem] = useState('');
  const [showPoem, setShowPoem] = useState(false);

  useEffect(() => {
    // Typewriter effect for wishes
    let i = 0;
    const typeWishes = () => {
      if (i < userData.wishes.length) {
        setDisplayWishes(userData.wishes.substring(0, i + 1));
        i++;
        setTimeout(typeWishes, 50);
      } else {
        // Show poem after wishes are complete
        setTimeout(() => setShowPoem(true), 1000);
      }
    };
    
    setTimeout(typeWishes, 500);
  }, [userData.wishes]);

  useEffect(() => {
    if (showPoem) {
      // Typewriter effect for poem
      let i = 0;
      const typePoem = () => {
        if (i < userData.poem.length) {
          setDisplayPoem(userData.poem.substring(0, i + 1));
          i++;
          setTimeout(typePoem, 30);
        }
      };
      
      setTimeout(typePoem, 200);
    }
  }, [showPoem, userData.poem]);

  return (
    <motion.div
      className="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        className="welcome-title glow"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          delay: 0.5 
        }}
      >
        Chào mừng <span className="user-name text-shimmer">{userData.name}</span>! 
        <span className="celebration-emoji bounce">🎉</span>
      </motion.h1>
      
      <motion.div 
        className="wishes-section pulse"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="wishes-text">
          {displayWishes}
        </div>
      </motion.div>

      {showPoem && (
        <motion.div 
          className="poetry-section pulse"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="poetry-title text-shimmer">
            📝 Bài thơ dành tặng bạn
          </h2>
          <div className="poetry-content">
            {displayPoem}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MainContent;
