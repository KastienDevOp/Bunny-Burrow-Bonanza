// BerryPicking.jsx
import React, { useState, useEffect } from 'react';

const BerryPicking = ({ onComplete }) => {
  const [berries, setBerries] = useState([]);
  const [misses, setMisses] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBerry = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: 0,
      };
      setBerries((prevBerries) => [...prevBerries, newBerry]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBerries((prevBerries) => {
        const newBerries = prevBerries.map((berry) => ({
          ...berry,
          y: berry.y + 5,
        }));
        const missedBerries = newBerries.filter((berry) => berry.y > 100);
        setMisses((prevMisses) => prevMisses + missedBerries.length);
        return newBerries.filter((berry) => berry.y <= 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (score >= 20) {
      onComplete(score - misses);
    }
  }, [score, misses, onComplete]);

  const handleBerryClick = (id) => {
    setBerries((prevBerries) => prevBerries.filter((berry) => berry.id !== id));
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div className="text-center bg-[#FFF8DC] p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-[#8B4513]">Berry Picking</h3>
      <p className="mb-4 text-[#A0522D]">Click on the berries before they fall!</p>
      <div className="relative h-64 w-full border border-[#8B4513] mb-4 bg-[#F0FFF0] rounded-lg overflow-hidden">
        {berries.map((berry) => (
          <div
            key={berry.id}
            className="absolute w-8 h-8 bg-[#8B0000] rounded-full cursor-pointer flex items-center justify-center text-lg"
            style={{ left: `${berry.x}%`, top: `${berry.y}%` }}
            onClick={() => handleBerryClick(berry.id)}
          >
            🫐
          </div>
        ))}
      </div>
      <p className="text-lg font-semibold text-[#8B4513]">Berries picked: {score}</p>
      <p className="text-lg font-semibold text-[#FF6347]">Berries missed: {misses}</p>
    </div>
  );
};

export default BerryPicking;