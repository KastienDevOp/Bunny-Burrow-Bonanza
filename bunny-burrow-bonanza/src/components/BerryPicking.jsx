import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BerryPicking = ({ onComplete }) => {
  const [berries, setBerries] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const berryInterval = setInterval(() => {
      setBerries(prevBerries => [
        ...prevBerries,
        {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: 0,
        }
      ]);
    }, 1000);

    const moveInterval = setInterval(() => {
      setBerries(prevBerries => 
        prevBerries.map(berry => ({
          ...berry,
          y: berry.y + 5,
        })).filter(berry => berry.y <= 100)
      );
    }, 100);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          clearInterval(berryInterval);
          clearInterval(moveInterval);
          onComplete(score);
          return 0;
        }
        return prevTime - 1;
      });
    }, 950);

    return () => {
      clearInterval(timer);
      clearInterval(berryInterval);
      clearInterval(moveInterval);
    };
  }, [score, onComplete]);

  const handleBerryClick = (id) => {
    setBerries(prevBerries => prevBerries.filter(berry => berry.id !== id));
    setScore(prevScore => prevScore + 1);
  };

  return (
    <div className="text-center bg-[#FFF8DC] p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-[#8B4513]">Berry Picking</h3>
      <p className="mb-4 text-[#A0522D]">Click on the berries before they fall!</p>
      <p className="mb-2 text-lg font-semibold text-[#8B4513]">Time left: {timeLeft}s</p>
      <p className="mb-4 text-xl font-bold text-[#FF6347]">Score: {score}</p>
      <div className="relative h-64 w-full border border-[#8B4513] mb-4 bg-[#F0FFF0] rounded-lg overflow-hidden">
        {berries.map((berry) => (
          <motion.div
            key={berry.id}
            className="absolute w-8 h-8 bg-[#8B0000] rounded-full cursor-pointer flex items-center justify-center text-lg"
            style={{ left: `${berry.x}%`, top: `${berry.y}%` }}
            onClick={() => handleBerryClick(berry.id)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            🫐
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BerryPicking;