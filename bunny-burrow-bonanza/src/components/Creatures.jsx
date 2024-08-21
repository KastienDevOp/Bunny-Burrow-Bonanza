import React from 'react';
import { Button } from './ui/button';

const CREATURE_TYPES = {
  'Common Bunny': { baseCost: 50, costMultiplier: 1.1, resourceBonus: { type: 'carrots', amount: 0.2 } },
  'Nutty Squirrel': { baseCost: 100, costMultiplier: 1.15, resourceBonus: { type: 'nuts', amount: 0.3 } },
  'Berry Fox': { baseCost: 150, costMultiplier: 1.2, resourceBonus: { type: 'berries', amount: 0.4 } },
  'Magic Hare': { baseCost: 500, costMultiplier: 1.25, resourceBonus: { type: 'specialResources', amount: 0.1 } },
  'Golden Rabbit': { baseCost: 1000, costMultiplier: 1.3, resourceBonus: { type: 'rareResources', amount: 0.05 } },
  'Resource Raccoon': { baseCost: 2000, costMultiplier: 1.35, resourceBonus: { type: 'all', amount: 0.05 } },
};

const Creatures = ({ onClose, onPurchase, resources, purchasedCreatures }) => {
  const calculateCost = (creatureName) => {
    const creature = CREATURE_TYPES[creatureName];
    const count = purchasedCreatures[creatureName] || 0;
    return Math.round(creature.baseCost * Math.pow(creature.costMultiplier, count));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Creatures</h2>
        
        {/* Display available resources */}
        <div className="mb-4 p-2 bg-gray-100 rounded">
          <h3 className="font-bold mb-2">Available Resources:</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(resources).map(([resource, amount]) => (
              <div key={resource} className="flex justify-between">
                <span className="capitalize">{resource}:</span>
                <span>{Math.floor(amount)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(CREATURE_TYPES).map(([creatureName, creature]) => {
            const cost = calculateCost(creatureName);
            const count = purchasedCreatures[creatureName] || 0;
            return (
              <div key={creatureName} className="flex justify-between items-center">
                <div>
                  <span className="font-bold">{creatureName}</span>
                  <p className="text-sm text-gray-600">
                    Bonus: +{creature.resourceBonus.amount} {creature.resourceBonus.type} production
                  </p>
                  <span className="text-sm text-gray-500">
                    (Owned: {count})
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => onPurchase({ name: creatureName, ...creature }, cost)}
                  disabled={resources.carrots < cost}
                >
                  Adopt ({cost} carrots)
                </Button>
              </div>
            );
          })}
        </div>
        <Button className="mt-6 w-full" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default Creatures;