import React from 'react';
import { Button } from './ui/button';

const HABITAT_TYPES = {
  'Cozy Burrow': { baseCost: 100, costMultiplier: 1.1, capacity: 2, resourceBonus: { type: 'carrots', amount: 0.2 } },
  'Carrot Patch': { baseCost: 200, costMultiplier: 1.15, capacity: 4, resourceBonus: { type: 'carrots', amount: 0.5 } },
  'Nut Grove': { baseCost: 300, costMultiplier: 1.2, capacity: 6, resourceBonus: { type: 'nuts', amount: 0.3 } },
  'Berry Field': { baseCost: 400, costMultiplier: 1.25, capacity: 8, resourceBonus: { type: 'berries', amount: 0.4 } },
  'Luxury Warren': { baseCost: 1000, costMultiplier: 1.3, capacity: 12, resourceBonus: { type: 'all', amount: 0.1 } },
};

const Habitats = ({ onClose, onPurchase, resources, purchasedHabitats }) => {
  const calculateCost = (habitatName) => {
    const habitat = HABITAT_TYPES[habitatName];
    const count = purchasedHabitats[habitatName] || 0;
    return Math.round(habitat.baseCost * Math.pow(habitat.costMultiplier, count));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Habitats</h2>
        
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
          {Object.entries(HABITAT_TYPES).map(([habitatName, habitat]) => {
            const cost = calculateCost(habitatName);
            const count = purchasedHabitats[habitatName] || 0;
            return (
              <div key={habitatName} className="flex justify-between items-center">
                <div>
                  <span className="font-bold">{habitatName}</span>
                  <p className="text-sm text-gray-600">Capacity: {habitat.capacity}</p>
                  <p className="text-sm text-gray-600">
                    Bonus: +{habitat.resourceBonus.amount} {habitat.resourceBonus.type} production
                  </p>
                  <span className="text-sm text-gray-500">
                    (Owned: {count})
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => onPurchase({ name: habitatName, ...habitat }, cost)}
                  disabled={resources.carrots < cost}
                >
                  Build ({cost} carrots)
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

export default Habitats;