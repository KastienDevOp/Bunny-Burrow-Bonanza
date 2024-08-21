import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const BunnyHop = ({ onComplete }) => {
  const [position, setPosition] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const obstacleInterval = setInterval(() => {
      setObstacles(prevObstacles => {
        const newObstacles = prevObstacles
          .map(obs => ({ ...obs, x: obs.x - 5 }))
          .filter(obs => obs.x > -10);

        if (Math.random() < 0.1) {
          newObstacles.push({ x: 100, y: Math.random() < 0.5 ? 0 : 50 });
        }

        return newObstacles;
      });

      if (!gameOver) {
        setPosition(prevPosition => Math.max(0, prevPosition - 1));
        setScore(prevScore => prevScore + 1);
      }
    }, 50);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          clearInterval(obstacleInterval);
          setGameOver(true);
          onComplete(score);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(obstacleInterval);
      clearInterval(timer);
    };
  }, [gameOver, score, onComplete]);

  useEffect(() => {
    const collision = obstacles.some(
      (obs) => obs.x < 10 && obs.x > 0 && Math.abs(obs.y - position) < 20
    );

    if (collision) {
      setGameOver(true);
      onComplete(score);
    }
  }, [obstacles, position, score, onComplete]);

  const handleJump = () => {
    if (!gameOver) {
      setPosition((prevPosition) => Math.min(100, prevPosition + 30));
    }
  };

  return (
    <div className="text-center bg-[#FFF8DC] p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-[#8B4513]">Bunny Hop</h3>
      <p className="mb-4 text-[#A0522D]">Press the button to make the bunny jump over obstacles!</p>
      <p className="mb-2 text-lg font-semibold text-[#8B4513]">Time left: {timeLeft}s</p>
      <p className="mb-4 text-xl font-bold text-[#FF6347]">Score: {score}</p>
      <div className="relative h-32 w-full border border-[#8B4513] mb-4 bg-[#F0FFF0] rounded-lg overflow-hidden">
        <motion.div
          className="absolute w-8 h-8 text-2xl"
          style={{ bottom: `${position}%`, left: '10%' }}
          animate={{ y: position }}
        >
          🐰
        </motion.div>
        {obstacles.map((obs, index) => (
          <motion.div
            key={index}
            className="absolute w-4 h-8 bg-[#8B4513]"
            style={{ bottom: `${obs.y}%`, left: `${obs.x}%` }}
            initial={{ x: 100 }}
            animate={{ x: obs.x }}
          />
        ))}
      </div>
      <Button 
        onClick={handleJump} 
        disabled={gameOver}
        className="bg-[#FF6347] hover:bg-[#FF4500] text-white font-bold py-2 px-4 rounded-full text-lg mb-4"
      >
        Jump
      </Button>
      {gameOver && <p className="mt-4 text-lg font-semibold text-[#FF6347]">Game Over!</p>}
    </div>
  );
};

export default BunnyHop;