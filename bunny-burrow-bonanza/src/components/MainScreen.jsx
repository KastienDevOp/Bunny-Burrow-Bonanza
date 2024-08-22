// MainScreen.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import RoamingCreature from './RoamingCreature';
import { MERGE_COMBINATIONS, CREATURE_EMOJIS } from './constants';

const HabitatCard = React.memo(({ habitat, index, onDragStart, onDragOver, onDrop }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', index);
    onDragStart(index);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      className="bg-[#8B4513] p-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-1 cursor-move"
    >
      <div className="text-3xl mb-1">{habitat.emoji}</div>
      <h3 className="text-lg font-bold text-[#FFE4B5] mb-1">{habitat.name}</h3>
      <p className="text-sm text-[#FFF8DC]">Count: {habitat.count}</p>
    </div>
  );
});

const MainScreen = ({ purchasedHabitats, purchasedCreatures, purchasedEpicSkins, shopItems, onHabitatReorder }) => {
  const [habitats, setHabitats] = useState([]);
  const [showEpicSkinInfo, setShowEpicSkinInfo] = useState(false);
  const [selectedEpicSkin, setSelectedEpicSkin] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    const habitatArray = Object.entries(purchasedHabitats)
      .filter(([_, count]) => count > 0)
      .map(([name, count]) => ({
        name,
        count,
        emoji: getHabitatEmoji(name),
      }));
    setHabitats(habitatArray);
  }, [purchasedHabitats]);

  const getHabitatEmoji = useCallback((habitatName) => {
    const emojiMap = {
      'Cozy Burrow': '🏠',
      'Carrot Patch': '🥕',
      'Nut Grove': '🌰',
      'Berry Bush': '🫐',
      'Potato Field': '🥔',
      'Mushroom Cave': '🍄',
      'Treehouse': '🌳',
      'Corn Maze': '🌽',
      'Tomato Greenhouse': '🍅',
      'Clover Field': '🍀',
      'Luxury Warren': '🏰',
      'Crystal Cave': '💎',
      'Sky Island': '☁️',
      'Time Warp Burrow': '⏳',
      'Enchanted Forest': '🌟',
    };
    return emojiMap[habitatName] || '🏡';
  }, []);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newHabitats = [...habitats];
    const [reorderedItem] = newHabitats.splice(draggedIndex, 1);
    newHabitats.splice(dropIndex, 0, reorderedItem);

    setHabitats(newHabitats);
    onHabitatReorder(newHabitats.map(habitat => habitat.name));
    setDraggedIndex(null);
  };

  const handleEpicSkinClick = (creatureName) => {
    setSelectedEpicSkin(creatureName);
    setShowEpicSkinInfo(true);
  };

  return (
    <div className="bg-[#2F4F4F] rounded-2xl p-4 shadow-xl overflow-hidden relative">
      <h2 className="text-2xl font-bold mb-4 text-[#FFE4B5] text-center">🐰 Your Fuzzy Burrow 🐿️</h2>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-2 left-2 text-5xl opacity-10">🍃</div>
        <div className="absolute bottom-2 right-2 text-5xl opacity-10">🌿</div>
        <div className="absolute top-1/2 left-1/4 text-3xl opacity-10">🌼</div>
        <div className="absolute bottom-1/4 right-1/3 text-3xl opacity-10">🍄</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-y-hidden max-h-[calc(100%-4rem)]">
        {habitats.map((habitat, index) => (
          <HabitatCard
            key={`habitat-${habitat.name}`}
            habitat={habitat}
            index={index}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
        {habitats.length === 0 && (
          <div className="col-span-full bg-[#3A5F5F] p-4 rounded-xl text-center">
            <p className="text-[#FFE4B5] text-lg">Your burrow is empty! 🐾</p>
            <p className="text-[#FFF8DC] text-sm">Visit the Habitats menu to start building your cozy home!</p>
          </div>
        )}
      </div>

      {/* Epic Skins Display */}
      <div className="mt-4 bg-[#3A5F5F] p-4 rounded-xl">
        <h3 className="text-xl font-bold mb-2 text-[#FFE4B5]">Epic Skins</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(purchasedEpicSkins).map(([creatureName, count]) => (
            count > 0 && (
              <motion.div
                key={`epic-${creatureName}`}
                className="bg-[#4A7F7F] p-2 rounded-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEpicSkinClick(creatureName)}
              >
                <span className="text-2xl mr-2">{MERGE_COMBINATIONS[creatureName].emoji}</span>
                <span className="text-[#FFE4B5]">{count}</span>
              </motion.div>
            )
          ))}
        </div>
      </div>

      {/* Roaming Creatures */}
      <div className="absolute inset-0 pointer-events-none">
        {Object.entries(purchasedCreatures).map(([creatureName, count]) => (
          Array.from({ length: count }).map((_, index) => (
            <RoamingCreature 
              key={`${creatureName}-${index}`} 
              type={creatureName} 
              emoji={CREATURE_EMOJIS[creatureName]}
            />
          ))
        ))}
        {Object.entries(purchasedEpicSkins).map(([creatureName, count]) => (
          Array.from({ length: count }).map((_, index) => (
            <RoamingCreature 
              key={`epic-${creatureName}-${index}`} 
              type={`Epic${creatureName}`} 
              emoji={MERGE_COMBINATIONS[creatureName].emoji}
            />
          ))
        ))}
      </div>

      {/* Epic Skin Info Modal */}
      {showEpicSkinInfo && selectedEpicSkin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowEpicSkinInfo(false)}
        >
          <div className="bg-[#FFF8DC] p-6 rounded-xl max-w-md" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-2 text-[#8B4513]">{MERGE_COMBINATIONS[selectedEpicSkin].name}</h3>
            <p className="text-6xl mb-4">{MERGE_COMBINATIONS[selectedEpicSkin].emoji}</p>
            <p className="text-[#A0522D] mb-4">
              This epic skin was created by merging three {selectedEpicSkin} creatures.
            </p>
            <button
              className="bg-[#8B4513] text-white px-4 py-2 rounded-full hover:bg-[#A0522D] transition-colors"
              onClick={() => setShowEpicSkinInfo(false)}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MainScreen;