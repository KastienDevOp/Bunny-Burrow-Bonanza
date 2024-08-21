// CarrotHarvest.jsx
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const CarrotHarvest = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete(score);
    }
  }, [timeLeft, score, onComplete]);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="text-center bg-[#FFF8DC] p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-[#8B4513]">Carrot Harvest</h3>
      <p className="mb-4 text-[#A0522D]">Click as fast as you can to harvest carrots!</p>
      <p className="mb-2 text-lg font-semibold text-[#8B4513]">Time left: {timeLeft}s</p>
      <p className="mb-4 text-xl font-bold text-[#FF6347]">Score: {score}</p>
      <Button 
        onClick={handleClick} 
        disabled={timeLeft === 0}
        className="bg-[#FF6347] hover:bg-[#FF4500] text-white font-bold py-2 px-4 rounded-full text-lg"
      >
        Harvest Carrot 🥕
      </Button>
    </div>
  );
};

export default CarrotHarvest;