import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const resources = ['🥕', '🌰', '🫐', '🥔', '🍅', '🌽', '💎', '✨'];

const ResourceRush = ({ onComplete }) => {
  const [activeResources, setActiveResources] = useState([]);
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
      setActiveResources(prevResources => [
        ...prevResources,
        {
          id: Date.now(),
          type: resources[Math.floor(Math.random() * resources.length)],
          position: Math.random() * 80 + 10,
        },
      ].slice(-5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCollect = (id) => {
    setActiveResources(prevResources => prevResources.filter(r => r.id !== id));
    setScore(score + 1);
  };

  return (
    <div className="text-center bg-[#FFF8DC] p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-[#8B4513]">Resource Rush</h3>
      <p className="mb-4 text-[#A0522D]">Collect the resources as they appear!</p>
      <p className="mb-2 text-lg font-semibold text-[#8B4513]">Time left: {timeLeft}s</p>
      <p className="mb-4 text-xl font-bold text-[#FF6347]">Score: {score}</p>
      <div className="h-48 relative mb-4 bg-[#F0FFF0] rounded-lg overflow-hidden">
        {activeResources.map((resource) => (
          <motion.div
            key={resource.id}
            initial={{ y: -50 }}
            animate={{ y: 200 }}
            transition={{ duration: 3 }}
            style={{ left: `${resource.position}%` }}
            className="absolute text-3xl cursor-pointer"
            onClick={() => handleCollect(resource.id)}
          >
            {resource.type}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResourceRush;