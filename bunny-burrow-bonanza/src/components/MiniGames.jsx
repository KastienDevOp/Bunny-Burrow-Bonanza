import React, { useState } from 'react';
import { Button } from './ui/button';
import CarrotHarvest from './CarrotHarvest';
import NutGathering from './NutGathering';
import BerryPicking from './BerryPicking';
import BunnyHop from './BunnyHop';
import WarrenMaze from './WarrenMaze';
import CreatureCare from './CreatureCare';
import ResourceRush from './ResourceRush';
import { motion } from 'framer-motion';

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
    { name: 'Creature Care', component: CreatureCare, reward: 'Creature happiness boost', emoji: '🐾' },
    { name: 'Resource Rush', component: ResourceRush, reward: 'Random resource boost', emoji: '🌪️' },
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
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#FFF8DC] p-6 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto fuzzy-border"
      >
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
            <div className="mb-4 flex flex-wrap justify-center">
              {Object.keys(MINI_GAMES).map(category => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`m-1 px-4 py-2 rounded-full ${activeCategory === category ? 'bg-[#DEB887] text-white' : 'bg-[#FFE4B5] text-[#8B4513]'} hover:bg-[#FFDAB9] transition-colors duration-200`}
                >
                  {category}
                </motion.button>
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
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#FFF5E6] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-[#8B4513] flex items-center text-lg">
                        {game.emoji} {game.name}
                      </span>
                      <p className="text-sm text-[#A0522D] mt-1">Reward: {game.reward}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveGame(game.name)}
                      className="bg-[#FFE4B5] text-[#8B4513] hover:bg-[#FFDAB9] transition-colors duration-200"
                    >
                      Play
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
        <Button className="mt-6 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" onClick={onClose}>Close Games</Button>
      </motion.div>
    </div>
  );
};

export default MiniGames;