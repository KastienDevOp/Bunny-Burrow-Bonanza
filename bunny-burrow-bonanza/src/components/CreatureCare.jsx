import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const creatures = ['🐰', '🐿️', '🦊', '🐇', '🦌', '🐾'];

const CreatureCare = ({ onComplete }) => {
  const [activeCreature, setActiveCreature] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 950);
      return () => clearTimeout(timer);
    } else {
      onComplete(score);
    }
  }, [timeLeft, score, onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCreature(creatures[Math.floor(Math.random() * creatures.length)]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleCare = () => {
    if (activeCreature) {
      setScore(score + 1);
      setActiveCreature(null);
    }
  };

  return (
    <div className="text-center bg-[#FFF8DC] p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-[#8B4513]">Creature Care</h3>
      <p className="mb-4 text-[#A0522D]">Care for the creatures when they appear!</p>
      <p className="mb-2 text-lg font-semibold text-[#8B4513]">Time left: {timeLeft}s</p>
      <p className="mb-4 text-xl font-bold text-[#FF6347]">Score: {score}</p>
      <div className="h-32 flex items-center justify-center mb-4">
        {activeCreature && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-6xl"
          >
            {activeCreature}
          </motion.div>
        )}
      </div>
      <Button 
        onClick={handleCare}
        disabled={!activeCreature}
        className="bg-[#FF6347] hover:bg-[#FF4500] text-white font-bold py-2 px-4 rounded-full text-lg"
      >
        Care for Creature
      </Button>
    </div>
  );
};

export default CreatureCare;