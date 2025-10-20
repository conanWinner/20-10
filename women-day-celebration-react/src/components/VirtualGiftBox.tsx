import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './VirtualGiftBox.css';

interface GiftMessage {
  id: number;
  message: string;
  emoji: string;
}

const VirtualGiftBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentGift, setCurrentGift] = useState<GiftMessage | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const giftMessages: GiftMessage[] = [
    {
      id: 1,
      message: "Chúc chị em xinh đẹp như hoa hồng, thông minh như Einstein, và luôn hạnh phúc như... một con mèo được ăn cá! 🐱",
      emoji: "🌹"
    },
    {
      id: 2,
      message: "20/10 này chúc các chị em: Tiền nhiều như lá mùa thu, tình yêu đẹp như phim Hàn, và... không bao giờ bị mụn! 😂",
      emoji: "💰"
    },
    {
      id: 3,
      message: "Chúc mừng ngày Phụ nữ! Chúc chị em luôn xinh đẹp, thành công, và... không bao giờ phải đợi thang máy! 🚀",
      emoji: "✨"
    },
    {
      id: 4,
      message: "20/10 vui vẻ! Chúc chị em luôn trẻ trung như... filter Instagram, và hạnh phúc như... được mua sắm miễn phí! 🛍️",
      emoji: "🎉"
    },
    {
      id: 5,
      message: "Chúc các chị em: Sức khỏe dồi dào, công việc thuận lợi, và... WiFi luôn mạnh! 📶",
      emoji: "💪"
    },
    {
      id: 6,
      message: "Ngày 20/10 đặc biệt! Chúc chị em luôn xinh đẹp, thông minh, và... không bao giờ bị lag khi chơi game! 🎮",
      emoji: "🎁"
    },
    {
      id: 7,
      message: "Chúc mừng ngày Phụ nữ Việt Nam! Chúc chị em luôn rạng rỡ như... đèn LED, và hạnh phúc như... được ăn buffet! 🍰",
      emoji: "💡"
    },
    {
      id: 8,
      message: "20/10 vui vẻ! Chúc chị em luôn trẻ trung, xinh đẹp, và... không bao giờ bị mất sóng điện thoại! 📱",
      emoji: "🌸"
    }
  ];

  const openGift = () => {
    if (!isOpen) {
      const randomGift = giftMessages[Math.floor(Math.random() * giftMessages.length)];
      setCurrentGift(randomGift);
      setIsOpen(true);
      setShowConfetti(true);
      
      // Hide confetti after 3 seconds
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const closeGift = () => {
    setIsOpen(false);
    setCurrentGift(null);
  };

  const getNewGift = () => {
    const randomGift = giftMessages[Math.floor(Math.random() * giftMessages.length)];
    setCurrentGift(randomGift);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="virtual-gift-box">
      <motion.div
        className="gift-container"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
      >
        <motion.div
          className={`gift-box ${isOpen ? 'opened' : ''}`}
          onClick={openGift}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isOpen ? { rotateY: 180 } : { rotateY: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="gift-lid">
            <div className="gift-bow">🎀</div>
          </div>
          <div className="gift-body">
            <div className="gift-pattern">💝</div>
          </div>
        </motion.div>

        <motion.div
          className="gift-label"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {isOpen ? '🎁 Mở lại để nhận quà mới!' : '🎁 Click để mở quà!'}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && currentGift && (
          <motion.div
            className="gift-message"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              delay: 0.3 
            }}
          >
            <div className="message-header">
              <span className="gift-emoji">{currentGift.emoji}</span>
              <h3>Lời chúc đặc biệt!</h3>
            </div>
            <div className="message-content">
              {currentGift.message}
            </div>
            <div className="message-actions">
              <motion.button
                className="new-gift-btn"
                onClick={getNewGift}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🎁 Quà mới
              </motion.button>
              <motion.button
                className="close-gift-btn"
                onClick={closeGift}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ❌ Đóng
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="gift-confetti"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="confetti-piece"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#ff9a9e'][Math.floor(Math.random() * 5)]
                }}
                initial={{ y: -100, rotate: 0, scale: 0 }}
                animate={{ 
                  y: window.innerHeight + 100, 
                  rotate: 360,
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualGiftBox;
