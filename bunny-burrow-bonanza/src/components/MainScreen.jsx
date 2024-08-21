// MainScreen.jsx
import React from 'react';
import RoamingCreature from './RoamingCreature';

const HabitatCard = ({ name, count, emoji }) => (
  <div className="bg-[#8B4513] p-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:rotate-1 cursor-pointer">
    <div className="text-3xl mb-1">{emoji}</div>
    <h3 className="text-lg font-bold text-[#FFE4B5] mb-1">{name}</h3>
    <p className="text-sm text-[#FFF8DC]">Count: {count}</p>
  </div>
);

const MainScreen = ({ purchasedHabitats, purchasedCreatures }) => {
  const habitatEmojis = {
    'Cozy Burrow': '🏠',
    'Carrot Patch': '🥕',
    'Nut Grove': '🌰',
    'Berry Field': '🫐',
    'Luxury Warren': '🏰',
  };

  return (
    <div className="bg-[#2F4F4F] rounded-2xl p-4 shadow-xl overflow-hidden relative h-full">
      <h2 className="text-2xl font-bold mb-4 text-[#FFE4B5] text-center">🐰 Your Fuzzy Burrow 🐿️</h2>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-2 left-2 text-5xl opacity-10">🍃</div>
        <div className="absolute bottom-2 right-2 text-5xl opacity-10">🌿</div>
        <div className="absolute top-1/2 left-1/4 text-3xl opacity-10">🌼</div>
        <div className="absolute bottom-1/4 right-1/3 text-3xl opacity-10">🍄</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-auto max-h-[calc(100%-4rem)]">
        {Object.entries(purchasedHabitats).map(([habitatName, count]) => (
          count > 0 && (
            <HabitatCard
              key={habitatName}
              name={habitatName}
              count={count}
              emoji={habitatEmojis[habitatName]}
            />
          )
        ))}
      </div>

      {Object.values(purchasedHabitats).every(count => count === 0) && (
        <div className="bg-[#3A5F5F] p-4 rounded-xl text-center">
          <p className="text-[#FFE4B5] text-lg">Your burrow is empty! 🐾</p>
          <p className="text-[#FFF8DC] text-sm">Visit the Habitats menu to start building your cozy home!</p>
        </div>
      )}

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