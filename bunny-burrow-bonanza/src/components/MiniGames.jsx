import React, { useState } from 'react';
import { Button } from './ui/button';

// Game components
const CarrotHarvest = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  React.useEffect(() => {
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
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Carrot Harvest</h3>
      <p className="mb-4">Click as fast as you can to harvest carrots!</p>
      <p className="mb-2">Time left: {timeLeft}s</p>
      <p className="mb-4">Score: {score}</p>
      <Button onClick={handleClick} disabled={timeLeft === 0}>Harvest Carrot</Button>
    </div>
  );
};

const NutGathering = ({ onComplete }) => {
  const [nuts, setNuts] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);

  const handleNutClick = (index) => {
    if (!nuts[index]) {
      const newNuts = [...nuts];
      newNuts[index] = true;
      setNuts(newNuts);
      setScore(score + 1);

      if (score + 1 === 9) {
        onComplete(score + 1);
      }
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Nut Gathering</h3>
      <p className="mb-4">Click on all the nuts to gather them!</p>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {nuts.map((isGathered, index) => (
          <Button
            key={index}
            onClick={() => handleNutClick(index)}
            disabled={isGathered}
            className={`h-16 ${isGathered ? 'bg-gray-300' : 'bg-brown-500'}`}
          >
            {isGathered ? '✓' : '🌰'}
          </Button>
        ))}
      </div>
      <p>Score: {score}/9</p>
    </div>
  );
};

const BerryPicking = ({ onComplete }) => {
  const [berries, setBerries] = useState([]);
  const [misses, setMisses] = useState(0);

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  const handleBerryClick = (id) => {
    setBerries((prevBerries) => prevBerries.filter((berry) => berry.id !== id));
    if (berries.length === 1) {
      onComplete(20 - misses);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Berry Picking</h3>
      <p className="mb-4">Click on the berries before they fall!</p>
      <div className="relative h-64 w-full border border-gray-300 mb-4">
        {berries.map((berry) => (
          <div
            key={berry.id}
            className="absolute w-6 h-6 bg-red-500 rounded-full cursor-pointer"
            style={{ left: `${berry.x}%`, top: `${berry.y}%` }}
            onClick={() => handleBerryClick(berry.id)}
          />
        ))}
      </div>
      <p>Berries missed: {misses}</p>
    </div>
  );
};

const BunnyHop = ({ onComplete }) => {
  const [position, setPosition] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  React.useEffect(() => {
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
      }
    }, 50);

    return () => clearInterval(interval);
  }, [gameOver]);

  React.useEffect(() => {
    const collision = obstacles.some(
      (obs) => obs.x < 10 && obs.x > 0 && Math.abs(obs.y - position) < 20
    );

    if (collision) {
      setGameOver(true);
      onComplete(obstacles.length);
    }
  }, [obstacles, position, onComplete]);

  const handleJump = () => {
    if (!gameOver) {
      setPosition((prevPosition) => Math.min(100, prevPosition + 30));
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Bunny Hop</h3>
      <p className="mb-4">Press the button to make the bunny jump over obstacles!</p>
      <div className="relative h-32 w-full border border-gray-300 mb-4">
        <div
          className="absolute w-8 h-8 bg-gray-500 rounded-full"
          style={{ bottom: `${position}%`, left: '10%' }}
        />
        {obstacles.map((obs, index) => (
          <div
            key={index}
            className="absolute w-4 h-8 bg-red-500"
            style={{ bottom: `${obs.y}%`, left: `${obs.x}%` }}
          />
        ))}
      </div>
      <Button onClick={handleJump} disabled={gameOver}>
        Jump
      </Button>
      {gameOver && <p className="mt-4">Game Over! Score: {obstacles.length}</p>}
    </div>
  );
};

const WarrenMaze = ({ onComplete }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [maze] = useState(
    Array(5)
      .fill()
      .map(() =>
        Array(5)
          .fill()
          .map(() => Math.random() < 0.3)
      )
  );

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

      if (newX === 4 && newY === 4) {
        onComplete(100);
      }
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-2">Warren Maze</h3>
      <p className="mb-4">Navigate through the maze to reach the exit!</p>
      <div className="grid grid-cols-5 gap-1 mb-4">
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-8 h-8 ${
                cell ? 'bg-gray-500' : x === position.x && y === position.y
                  ? 'bg-blue-500'
                  : x === 4 && y === 4
                  ? 'bg-green-500'
                  : 'bg-white border border-gray-300'
              }`}
            />
          ))
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 w-32 mx-auto">
        <Button onClick={() => handleMove(0, -1)}>↑</Button>
        <Button onClick={() => handleMove(-1, 0)}>←</Button>
        <Button onClick={() => handleMove(1, 0)}>→</Button>
        <Button onClick={() => handleMove(0, 1)}>↓</Button>
      </div>
    </div>
  );
};

const MiniGames = ({ onClose, onGameComplete }) => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { name: 'Carrot Harvest', component: CarrotHarvest, reward: 'Extra carrots', emoji: '🥕' },
    { name: 'Nut Gathering', component: NutGathering, reward: 'Extra nuts', emoji: '🌰' },
    { name: 'Berry Picking', component: BerryPicking, reward: 'Extra berries', emoji: '🫐' },
    { name: 'Bunny Hop', component: BunnyHop, reward: 'Special resources', emoji: '🐰' },
    { name: 'Warren Maze', component: WarrenMaze, reward: 'Rare resources', emoji: '🏰' },
  ];

  const handleGameComplete = (score) => {
    onGameComplete(activeGame, score);
    setActiveGame(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#FFF8DC] p-6 rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto fuzzy-border">
        <h2 className="text-3xl font-bold mb-4 text-[#8B4513] text-center">🎮 Fuzzy Fun Games</h2>
        {activeGame ? (
          <div>
            {React.createElement(games.find(game => game.name === activeGame).component, { onComplete: handleGameComplete })}
            <Button 
              className="mt-4 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" 
              onClick={() => setActiveGame(null)}
            >
              Back to Games
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {games.map((game, index) => (
              <div key={index} className="bg-[#FFF5E6] p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#8B4513] flex items-center">
                      {game.emoji} {game.name}
                    </span>
                    <p className="text-sm text-[#A0522D]">Reward: {game.reward}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveGame(game.name)}
                    className="bg-[#FFE4B5] text-[#8B4513] hover:bg-[#FFDAB9]"
                  >
                    Play
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Button className="mt-6 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" onClick={onClose}>Close Games</Button>
      </div>
    </div>
  );
};

export default MiniGames;