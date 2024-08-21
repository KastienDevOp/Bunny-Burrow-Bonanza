// RoamingCreature.jsx
import React, { useState, useEffect } from 'react';

const CREATURE_EMOJIS = {
  'Common Bunny': '🐰',
  'Nutty Squirrel': '🐿️',
  'Berry Fox': '🦊',
  'Magic Hare': '🐇✨',
  'Golden Rabbit': '🐰✨',
  'Resource Raccoon': '🦝',
};

const RoamingCreature = ({ type }) => {
  const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
  const [direction, setDirection] = useState({ x: Math.random() - 0.5, y: Math.random() - 0.5 });

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPosition(prevPos => {
        let newX = prevPos.x + direction.x;
        let newY = prevPos.y + direction.y;

        // Bounce off the edges
        if (newX < 0 || newX > 100) {
          setDirection(prevDir => ({ ...prevDir, x: -prevDir.x }));
          newX = Math.max(0, Math.min(100, newX));
        }
        if (newY < 0 || newY > 100) {
          setDirection(prevDir => ({ ...prevDir, y: -prevDir.y }));
          newY = Math.max(0, Math.min(100, newY));
        }

        return { x: newX, y: newY };
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [direction]);

  // Change direction randomly
  useEffect(() => {
    const changeDirectionInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setDirection({ x: Math.random() - 0.5, y: Math.random() - 0.5 });
      }
    }, 1000);

    return () => clearInterval(changeDirectionInterval);
  }, []);

  return (
    <div
      className="absolute text-2xl transition-all duration-200 ease-in-out"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translate(-50%, -50%) scale(${0.5 + Math.random() * 0.5})`,
      }}
    >
      {CREATURE_EMOJIS[type]}
    </div>
  );
};

export default RoamingCreature;