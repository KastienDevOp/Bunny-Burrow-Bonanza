import React, { useState, useEffect, useCallback } from 'react';
import RoamingCreature from './RoamingCreature';

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

const MainScreen = ({ purchasedHabitats, purchasedCreatures, shopItems, onHabitatReorder }) => {
  const [habitats, setHabitats] = useState([]);
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

{/* Roaming Creatures */}
<div className="absolute inset-0 pointer-events-none">
  {Object.entries(purchasedCreatures).map(([creatureName, count]) => (
    Array.from({ length: count }).map((_, index) => (
      <RoamingCreature key={`${creatureName}-${index}`} type={creatureName} />
    ))
  ))}
</div>
</div>
);
};

export default MainScreen;
