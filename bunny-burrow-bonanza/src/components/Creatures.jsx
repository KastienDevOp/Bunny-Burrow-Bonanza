import React from 'react';
import { Button } from './ui/button';

const CREATURE_TYPES = {
  'Common Bunny': { baseCost: 50, costMultiplier: 1.1, resourceBonus: { type: 'carrots', amount: 0.2 }, emoji: '🐰' },
  'Nutty Squirrel': { baseCost: 100, costMultiplier: 1.15, resourceBonus: { type: 'nuts', amount: 0.3 }, emoji: '🐿️' },
  'Berry Fox': { baseCost: 150, costMultiplier: 1.2, resourceBonus: { type: 'berries', amount: 0.4 }, emoji: '🦊' },
  'Magic Hare': { baseCost: 500, costMultiplier: 1.25, resourceBonus: { type: 'specialResources', amount: 0.1 }, emoji: '🐇✨' },
  'Golden Rabbit': { baseCost: 1000, costMultiplier: 1.3, resourceBonus: { type: 'rareResources', amount: 0.05 }, emoji: '🐰✨' },
  'Resource Raccoon': { baseCost: 2000, costMultiplier: 1.35, resourceBonus: { type: 'all', amount: 0.05 }, emoji: '🦝' },
};

const Creatures = ({ onClose, onPurchase, resources, purchasedCreatures }) => {
  const calculateCost = (creatureName) => {
    const creature = CREATURE_TYPES[creatureName];
    const count = purchasedCreatures[creatureName] || 0;
    return Math.round(creature.baseCost * Math.pow(creature.costMultiplier, count));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#FFF8DC] p-6 rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto fuzzy-border">
        <h2 className="text-3xl font-bold mb-4 text-[#8B4513] text-center">🐾 Furry Friends</h2>
        
        <div className="mb-4 p-3 bg-[#FFEFD5] rounded-lg shadow-inner">
          <h3 className="font-bold mb-2 text-[#A0522D]">Available Resources:</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(resources).map(([resource, amount]) => (
              <div key={resource} className="flex justify-between items-center">
                <span className="capitalize text-[#8B4513]">{resource}:</span>
                <span className="font-semibold text-[#A0522D]">{Math.floor(amount)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(CREATURE_TYPES).map(([creatureName, creature]) => {
            const cost = calculateCost(creatureName);
            const count = purchasedCreatures[creatureName] || 0;
            return (
              <div key={creatureName} className="bg-[#FFF5E6] p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#8B4513] flex items-center">
                    {creature.emoji} {creatureName}
                  </span>
                  <Button 
                    variant="outline" 
                    onClick={() => onPurchase({ name: creatureName, ...creature }, cost)}
                    disabled={resources.carrots < cost}
                    className="bg-[#FFE4B5] text-[#8B4513] hover:bg-[#FFDAB9] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Adopt ({cost} 🥕)
                  </Button>
                </div>
                <p className="text-sm text-[#A0522D]">
                  Bonus: +{creature.resourceBonus.amount} {creature.resourceBonus.type} production
                </p>
                <span className="text-xs text-[#CD853F]">
                  (Owned: {count})
                </span>
              </div>
            );
          })}
        </div>
        <Button className="mt-6 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" onClick={onClose}>Close Creatures</Button>
      </div>
    </div>
  );
};

export default Creatures;