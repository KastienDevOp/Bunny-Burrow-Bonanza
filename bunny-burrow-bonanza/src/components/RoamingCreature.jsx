import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CREATURE_EMOJIS = {
  'Common Bunny': '🐰',
  'Nutty Squirrel': '🐿️',
  'Berry Fox': '🦊',
  'Magic Hare': '🐇✨',
  'Golden Rabbit': '🐰✨',
  'Resource Raccoon': '🦝',
  'EpicCommon Bunny': '👑🐰',
  'EpicNutty Squirrel': '🤖🐿️',
  'EpicBerry Fox': '🔥🦊',
  'EpicMagic Hare': '🌟🐇',
  'EpicGolden Rabbit': '💎🐰',
  'EpicResource Raccoon': '🦾🦝',
};

const RoamingCreature = ({ type, emoji }) => {
  const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
  const [direction, setDirection] = useState({ x: Math.random() - 0.5, y: Math.random() - 0.5 });

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prevPos => {
        let newX = prevPos.x + direction.x;
        let newY = prevPos.y + direction.y;

        // Bounce off the edges
        if (newX < 0 || newX > 100) {
          setDirection(prevDir => ({ ...prevDir, x: -prevDir.x }));
          newX = Math.max(0, Math.min(100, newX));
        }
        if (newY < 0 || newY > 100) {
          setDirection(prevDir => ({ ...prevDir, y: -prevDir.y }));
          newY = Math.max(0, Math.min(100, newY));
        }

        return { x: newX, y: newY };
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [direction]);

  // Change direction randomly
  useEffect(() => {
    const changeDirectionInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setDirection({ x: Math.random() - 0.5, y: Math.random() - 0.5 });
      }
    }, 1000);

    return () => clearInterval(changeDirectionInterval);
  }, []);

  const isEpic = type.startsWith('Epic');

  return (
    <motion.div
      className={`absolute text-2xl transition-all duration-200 ease-in-out ${isEpic ? 'z-10' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) scale(${0.5 + Math.random() * 0.5})`,
      }}
      animate={{
        x: position.x + '%',
        y: position.y + '%',
        rotate: Math.random() * 360,
      }}
      transition={{ type: 'spring', damping: 10, stiffness: 100 }}
    >
      {isEpic ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
        >
          {emoji}
        </motion.div>
      ) : (
        emoji
      )}
    </motion.div>
  );
};

export default RoamingCreature;