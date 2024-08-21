import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const WarrenMaze = ({ onComplete }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [maze, setMaze] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // Generate a new maze when the component mounts
    const newMaze = Array(5)
      .fill()
      .map(() =>
        Array(5)
          .fill()
          .map(() => Math.random() < 0.3)
      );
    newMaze[0][0] = false; // Ensure start is clear
    newMaze[4][4] = false; // Ensure end is clear
    setMaze(newMaze);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onComplete(moves);
          return 0;
        }
        return prevTime - 1;
      });
    }, 950);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleMove = (dx, dy) => {
    const newX = position.x + dx;
    const newY = position.y + dy;

    if (
      newX >= 0 &&
      newX < 5 &&
      newY >= 0 &&
      newY < 5 &&
      !maze[newY][newX] &&
      timeLeft > 0
    ) {
      setPosition({ x: newX, y: newY });
      setMoves(moves + 1);

      if (newX === 4 && newY === 4) {
        onComplete(100 - moves);
      }
    }
  };

  return (
    <div className="text-center bg-[#FFF8DC] p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-[#8B4513]">Warren Maze</h3>
      <p className="mb-4 text-[#A0522D]">Navigate through the maze to reach the exit!</p>
      <p className="mb-2 text-lg font-semibold text-[#8B4513]">Time left: {timeLeft}s</p>
      <p className="mb-4 text-xl font-bold text-[#FF6347]">Moves: {moves}</p>
      <div className="grid grid-cols-5 gap-1 mb-4 max-w-xs mx-auto">
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <motion.div
              key={`${x}-${y}`}
              className={`w-12 h-12 flex items-center justify-center text-2xl ${
                cell ? 'bg-[#8B4513]' : 
                x === position.x && y === position.y ? 'bg-[#FF6347]' :
                x === 4 && y === 4 ? 'bg-[#32CD32]' :
                'bg-[#DEB887]'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {x === position.x && y === position.y ? '🐰' : 
               x === 4 && y === 4 ? '🏠' : ''}
            </motion.div>
          ))
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 w-48 mx-auto mb-4">
        <Button onClick={() => handleMove(0, -1)} disabled={timeLeft === 0} className="bg-[#FF6347] hover:bg-[#FF4500]">↑</Button>
        <Button onClick={() => handleMove(-1, 0)} disabled={timeLeft === 0} className="bg-[#FF6347] hover:bg-[#FF4500]">←</Button>
        <Button onClick={() => handleMove(1, 0)} disabled={timeLeft === 0} className="bg-[#FF6347] hover:bg-[#FF4500]">→</Button>
        <div></div>
        <Button onClick={() => handleMove(0, 1)} disabled={timeLeft === 0} className="bg-[#FF6347] hover:bg-[#FF4500]">↓</Button>
      </div>
    </div>
  );
};

export default WarrenMaze;