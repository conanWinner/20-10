import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects: React.FC = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [flowers, setFlowers] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  // Create floating hearts
  useEffect(() => {
    const createHeart = () => {
      const newHeart = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 6
      };
      setHearts(prev => [...prev.slice(-10), newHeart]);
    };

    const interval = setInterval(createHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  // Create flower bursts
  useEffect(() => {
    const createFlowerBurst = () => {
      const newFlowers = Array.from({ length: 20 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }));
      setFlowers(prev => [...prev.slice(-50), ...newFlowers]);
    };

    const interval = setInterval(createFlowerBurst, 3000);
    return () => clearInterval(interval);
  }, []);

  // Create falling petals
  useEffect(() => {
    const createPetal = () => {
      const newPetal = {
        id: Date.now(),
        x: Math.random() * 100,
        delay: Math.random() * 2
      };
      setPetals(prev => [...prev.slice(-30), newPetal]);
    };

    const interval = setInterval(createPetal, 4000);
    return () => clearInterval(interval);
  }, []);

  // Create sparkles
  useEffect(() => {
    const createSparkle = () => {
      const newSparkle = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      };
      setSparkles(prev => [...prev.slice(-15), newSparkle]);
    };

    const interval = setInterval(createSparkle, 2000);
    return () => clearInterval(interval);
  }, []);

  const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '💐', '🌿'];
  const petalEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '💐', '🌿', '🍀', '🌱'];

  return (
    <>
      {/* Background Hearts */}
      <div className="background-heart">💖</div>
      <div className="background-heart">💕</div>
      <div className="background-heart">💗</div>
      <div className="background-heart">💝</div>
      <div className="background-heart">💖</div>

      {/* Floating Hearts */}
      <div className="floating-hearts">
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              animationDelay: `${heart.delay}s`
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: -100 }}
            transition={{ duration: 6, ease: "easeInOut" }}
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Flower Bursts */}
      <div className="flower-burst">
        {flowers.map(flower => (
          <motion.div
            key={flower.id}
            className="flower"
            style={{
              left: `${flower.x}%`,
              top: `${flower.y}%`,
              animationDelay: `${flower.delay}s`
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1, 0.3], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            {flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)]}
          </motion.div>
        ))}
      </div>

      {/* Falling Petals */}
      {petals.map(petal => (
        <motion.div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.x}%`,
            animationDelay: `${petal.delay}s`,
            fontSize: `${Math.random() * 15 + 15}px`
          }}
          initial={{ y: -100, opacity: 1 }}
          animate={{ y: window.innerHeight + 100, opacity: 0 }}
          transition={{ duration: 4 + Math.random() * 2, ease: "easeInOut" }}
        >
          {petalEmojis[Math.floor(Math.random() * petalEmojis.length)]}
        </motion.div>
      ))}

      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.delay}s`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      ))}
    </>
  );
};

export default BackgroundEffects;
