import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const NutGathering = ({ onComplete }) => {
  const [nuts, setNuts] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onComplete(score);
          return 0;
        }
        return prevTime - 1;
      });
    }, 950);

    return () => clearInterval(timer);
  }, [score, onComplete]);

  const handleNutClick = (index) => {
    if (!nuts[index]) {
      const newNuts = [...nuts];
      newNuts[index] = true;
      setNuts(newNuts);
      setScore(score + 1);
    }
  };

  return (
    <div className="text-center bg-[#FFF8DC] p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-[#8B4513]">Nut Gathering</h3>
      <p className="mb-4 text-[#A0522D]">Click on all the nuts to gather them!</p>
      <p className="mb-2 text-lg font-semibold text-[#8B4513]">Time left: {timeLeft}s</p>
      <p className="mb-4 text-xl font-bold text-[#FF6347]">Score: {score}</p>
      <div className="grid grid-cols-3 gap-2 mb-4 max-w-xs mx-auto">
        {nuts.map((isGathered, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={() => handleNutClick(index)}
              disabled={isGathered || timeLeft === 0}
              className={`h-16 w-16 text-2xl ${isGathered ? 'bg-[#D2691E] text-white' : 'bg-[#DEB887] hover:bg-[#CD853F]'}`}
            >
              {isGathered ? '✓' : '🌰'}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NutGathering;