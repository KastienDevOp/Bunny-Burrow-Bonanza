// NutGathering.jsx
import React, { useState } from 'react';
import { Button } from './ui/button';

const NutGathering = ({ onComplete }) => {
  const [nuts, setNuts] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);

  const handleNutClick = (index) => {
    if (!nuts[index]) {
      const newNuts = [...nuts];
      newNuts[index] = true;
      setNuts(newNuts);
      const newScore = score + 1;
      setScore(newScore);

      if (newScore === 9) {
        onComplete(newScore);
      }
    }
  };

  return (
    <div className="text-center bg-[#FFF8DC] p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-[#8B4513]">Nut Gathering</h3>
      <p className="mb-4 text-[#A0522D]">Click on all the nuts to gather them!</p>
      <div className="grid grid-cols-3 gap-2 mb-4 max-w-xs mx-auto">
        {nuts.map((isGathered, index) => (
          <Button
            key={index}
            onClick={() => handleNutClick(index)}
            disabled={isGathered}
            className={`h-16 w-16 text-2xl ${isGathered ? 'bg-[#D2691E] text-white' : 'bg-[#DEB887] hover:bg-[#CD853F]'}`}
          >
            {isGathered ? '✓' : '🌰'}
          </Button>
        ))}
      </div>
      <p className="text-xl font-bold text-[#8B4513]">Score: {score}/9</p>
    </div>
  );
};

export default NutGathering;