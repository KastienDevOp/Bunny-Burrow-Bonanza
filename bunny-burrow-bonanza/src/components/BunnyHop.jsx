// BunnyHop.jsx
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const BunnyHop = ({ onComplete }) => {
  const [position, setPosition] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prevObstacles) => {
        const newObstacles = prevObstacles
          .map((obs) => ({ ...obs, x: obs.x - 5 }))
          .filter((obs) => obs.x > -10);

        if (Math.random() < 0.05) {
          newObstacles.push({ x: 100, y: Math.random() < 0.5 ? 0 : 50 });
        }

        return newObstacles;
      });

      if (!gameOver) {
        setPosition((prevPosition) => Math.max(0, prevPosition - 1));
        setScore((prevScore) => prevScore + 1);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [gameOver]);

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
      <div className="relative h-32 w-full border border-[#8B4513] mb-4 bg-[#F0FFF0] rounded-lg overflow-hidden">
        <div
          className="absolute w-8 h-8 text-2xl"
          style={{ bottom: `${position}%`, left: '10%' }}
        >
          🐰
        </div>
        {obstacles.map((obs, index) => (
          <div
            key={index}
            className="absolute w-4 h-8 bg-[#8B4513]"
            style={{ bottom: `${obs.y}%`, left: `${obs.x}%` }}
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
      <p className="text-xl font-bold text-[#8B4513]">Score: {score}</p>
      {gameOver && <p className="mt-4 text-lg font-semibold text-[#FF6347]">Game Over!</p>}
    </div>
  );
};

export default BunnyHop;