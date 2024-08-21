import React from 'react';
import { Button } from './ui/button';

const HABITAT_TYPES = {
  'Cozy Burrow': { baseCost: 100, costMultiplier: 1.1, capacity: 2, resourceBonus: { type: 'carrots', amount: 0.2 }, emoji: '🏠' },
  'Carrot Patch': { baseCost: 200, costMultiplier: 1.15, capacity: 4, resourceBonus: { type: 'carrots', amount: 0.5 }, emoji: '🥕' },
  'Nut Grove': { baseCost: 300, costMultiplier: 1.2, capacity: 6, resourceBonus: { type: 'nuts', amount: 0.3 }, emoji: '🌰' },
  'Berry Field': { baseCost: 400, costMultiplier: 1.25, capacity: 8, resourceBonus: { type: 'berries', amount: 0.4 }, emoji: '🫐' },
  'Luxury Warren': { baseCost: 1000, costMultiplier: 1.3, capacity: 12, resourceBonus: { type: 'all', amount: 0.1 }, emoji: '🏰' },
};

const Habitats = ({ onClose, onPurchase, resources, purchasedHabitats }) => {
  const calculateCost = (habitatName) => {
    const habitat = HABITAT_TYPES[habitatName];
    const count = purchasedHabitats[habitatName] || 0;
    return Math.round(habitat.baseCost * Math.pow(habitat.costMultiplier, count));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#FFF8DC] p-6 rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto fuzzy-border">
        <h2 className="text-3xl font-bold mb-4 text-[#8B4513] text-center">🏡 Cozy Habitats</h2>
        
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
          {Object.entries(HABITAT_TYPES).map(([habitatName, habitat]) => {
            const cost = calculateCost(habitatName);
            const count = purchasedHabitats[habitatName] || 0;
            return (
              <div key={habitatName} className="bg-[#FFF5E6] p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#8B4513] flex items-center">
                    {habitat.emoji} {habitatName}
                  </span>
                  <Button 
                    variant="outline" 
                    onClick={() => onPurchase({ name: habitatName, ...habitat }, cost)}
                    disabled={resources.carrots < cost}
                    className="bg-[#FFE4B5] text-[#8B4513] hover:bg-[#FFDAB9] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Build ({cost} 🥕)
                  </Button>
                </div>
                <p className="text-sm text-[#A0522D]">Capacity: {habitat.capacity} critters</p>
                <p className="text-sm text-[#A0522D]">
                  Bonus: +{habitat.resourceBonus.amount} {habitat.resourceBonus.type} production
                </p>
                <span className="text-xs text-[#CD853F]">
                  (Owned: {count})
                </span>
              </div>
            );
          })}
        </div>
        <Button className="mt-6 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" onClick={onClose}>Close Habitats</Button>
      </div>
    </div>
  );
};

export default Habitats;