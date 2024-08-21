import React, { useState } from 'react';
import { Button } from './ui/button';
import CarrotHarvest from './CarrotHarvest';
import NutGathering from './NutGathering';
import BerryPicking from './BerryPicking';
import BunnyHop from './BunnyHop';
import WarrenMaze from './WarrenMaze';

const MINI_GAMES = {
  Beginner: [
    { name: 'Carrot Harvest', component: CarrotHarvest, reward: 'Extra carrots', emoji: '🥕' },
    { name: 'Nut Gathering', component: NutGathering, reward: 'Extra nuts', emoji: '🌰' },
    { name: 'Berry Picking', component: BerryPicking, reward: 'Extra berries', emoji: '🫐' },
  ],
  Intermediate: [
    { name: 'Bunny Hop', component: BunnyHop, reward: 'Special resources', emoji: '🐰' },
    { name: 'Warren Maze', component: WarrenMaze, reward: 'Rare resources', emoji: '🏰' },
  ],
  Advanced: [
    { name: 'Creature Care', component: null, reward: 'Creature happiness boost', emoji: '🐾' },
    { name: 'Resource Rush', component: null, reward: 'Random resource boost', emoji: '🌪️' },
    { name: 'Burrow Builder', component: null, reward: 'Habitat upgrade materials', emoji: '🏗️' },
  ],
};

const MiniGames = ({ onClose, onGameComplete }) => {
  const [activeCategory, setActiveCategory] = useState('Beginner');
  const [activeGame, setActiveGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = MINI_GAMES[activeCategory].filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameComplete = (score) => {
    onGameComplete(activeGame, score);
    setActiveGame(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFF8DC] p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto fuzzy-border">
        <h2 className="text-3xl font-bold mb-4 text-[#8B4513] text-center">🎮 Fuzzy Fun Games</h2>
        
        {activeGame ? (
          <div>
            {React.createElement(MINI_GAMES[activeCategory].find(game => game.name === activeGame).component, { onComplete: handleGameComplete })}
            <Button 
              className="mt-4 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" 
              onClick={() => setActiveGame(null)}
            >
              Back to Games
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              {Object.keys(MINI_GAMES).map(category => (
                <Button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`mr-2 ${activeCategory === category ? 'bg-[#DEB887] text-white' : 'bg-[#FFE4B5] text-[#8B4513]'} hover:bg-[#FFDAB9]`}
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded-md border border-[#DEB887] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map((game, index) => (
                <div key={index} className="bg-[#FFF5E6] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
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
                      disabled={!game.component}
                      className="bg-[#FFE4B5] text-[#8B4513] hover:bg-[#FFDAB9] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {game.component ? 'Play' : 'Coming Soon'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <Button className="mt-6 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" onClick={onClose}>Close Games</Button>
      </div>
    </div>
  );
};

export default MiniGames;