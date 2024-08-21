// WarrenMaze.jsx
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const WarrenMaze = ({ onComplete }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [maze, setMaze] = useState([]);
  const [moves, setMoves] = useState(0);

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
  }, []);

  const handleMove = (dx, dy) => {
    const newX = position.x + dx;
    const newY = position.y + dy;

    if (
      newX >= 0 &&
      newX < 5 &&
      newY >= 0 &&
      newY < 5 &&
      !maze[newY][newX]
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
      <div className="grid grid-cols-5 gap-1 mb-4 max-w-xs mx-auto">
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-12 h-12 flex items-center justify-center text-2xl ${
                cell ? 'bg-[#8B4513]' : 
                x === position.x && y === position.y ? 'bg-[#FF6347]' :
                x === 4 && y === 4 ? 'bg-[#32CD32]' :
                'bg-[#DEB887]'
              }`}
            >
              {x === position.x && y === position.y ? '🐰' : 
               x === 4 && y === 4 ? '🏠' : ''}
            </div>
          ))
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 w-48 mx-auto mb-4">
        <Button onClick={() => handleMove(0, -1)} className="bg-[#FF6347] hover:bg-[#FF4500]">↑</Button>
        <Button onClick={() => handleMove(-1, 0)} className="bg-[#FF6347] hover:bg-[#FF4500]">←</Button>
        <Button onClick={() => handleMove(1, 0)} className="bg-[#FF6347] hover:bg-[#FF4500]">→</Button>
        <div></div>
        <Button onClick={() => handleMove(0, 1)} className="bg-[#FF6347] hover:bg-[#FF4500]">↓</Button>
      </div>
      <p className="text-lg font-semibold text-[#8B4513]">Moves: {moves}</p>
    </div>
  );
};

export default WarrenMaze;