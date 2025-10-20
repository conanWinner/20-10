import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import './App.css';

// Components
import NameDialog from './components/NameDialog';
import MainContent from './components/MainContent';
import BackgroundEffects from './components/BackgroundEffects';
import AudioPlayer from './components/AudioPlayer';
import MessageWall from './components/MessageWall';
import VirtualGiftBox from './components/VirtualGiftBox';
import SocialShare from './components/SocialShare';

// Types
interface UserData {
  name: string;
  wishes: string;
  poem: string;
}

function App() {
  const [showDialog, setShowDialog] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto play music after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNameSubmit = (name: string) => {
    // Generate wishes
    const wishes = generateWishes(name);
    
    // Generate poem (simplified for now)
    const poem = generatePoem(name);
    
    setUserData({ name, wishes, poem });
    
    // Show confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    
    // Hide dialog
    setTimeout(() => {
      setShowDialog(false);
    }, 1500);
  };

  const generateWishes = (name: string): string => {
    const wishesList = [
      `Chúc ${name} luôn xinh đẹp, rạng rỡ như những bông hoa mùa xuân! 🌸`,
      `Mong ${name} luôn mạnh mẽ, tự tin và thành công trong mọi việc! 💪`,
      `Chúc ${name} có một ngày 20/10 thật ý nghĩa và hạnh phúc! 🎊`,
      `Mong ${name} luôn được yêu thương và trân trọng! 💕`,
      `Chúc ${name} luôn tỏa sáng với nụ cười tươi tắn! ✨`,
      `Mong ${name} luôn khỏe mạnh, vui vẻ và may mắn! 🍀`,
      `Chúc ${name} luôn tự tin và theo đuổi ước mơ của mình! 🌟`,
      `Mong ${name} luôn được bao quanh bởi những người yêu thương! 💖`
    ];
    
    return wishesList[Math.floor(Math.random() * wishesList.length)];
  };

  const generatePoem = (name: string): string => {
    const poems = [
      `Chúc mừng ${name} ngày 20/10\nTươi đẹp như hoa, rạng rỡ như sao\nMong bạn luôn vui vẻ, hạnh phúc\nVà thành công trong mọi việc làm!`,
      `${name} ơi, ngày phụ nữ đã về\nChúc bạn luôn xinh đẹp, khỏe mạnh\nMong bạn luôn tự tin, mạnh mẽ\nVà tỏa sáng như ánh mặt trời!`,
      `Gửi lời chúc đến ${name} thân yêu\nNgày 20/10 thật ý nghĩa\nChúc bạn luôn hạnh phúc, vui vẻ\nVà thành công trong cuộc sống!`
    ];
    
    return poems[Math.floor(Math.random() * poems.length)];
  };

  return (
    <div className="app">
      {/* Background Effects */}
      <BackgroundEffects />
      
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1']}
        />
      )}
      
      {/* Audio Player */}
      <AudioPlayer isPlaying={isPlaying} onToggle={setIsPlaying} />
      
      {/* Main Content */}
      <AnimatePresence mode="wait">
        {showDialog ? (
          <NameDialog key="dialog" onSubmit={handleNameSubmit} />
        ) : (
          <div className="main-app-content">
            <MainContent key="main" userData={userData!} />
            
            {/* New Features */}
            <div className="features-section">
              <VirtualGiftBox />
              <MessageWall />
              <SocialShare userName={userData?.name} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;