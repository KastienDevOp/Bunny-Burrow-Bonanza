import React from 'react';
import { Button } from './ui/button';

const Shop = ({ onClose, onPurchase, resources, shopItems }) => {
  const calculateCost = (item) => {
    return Math.round(item.baseCost * Math.pow(item.costMultiplier, item.count));
  };

  const getEmoji = (itemName) => {
    const emojiMap = {
      'Carrot Seeds': '🥕',
      'Nut Tree': '🌰',
      'Berry Bush': '🫐',
      'Magic Fertilizer': '✨',
      'Golden Carrot': '🥕✨',
      'Carrot Harvester': '🚜',
      'Nut Cracker': '🔨',
      'Berry Picker': '🧺',
      'Resource Multiplier': '🌟',
    };
    return emojiMap[itemName] || '🛒';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#FFF8DC] p-6 rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto fuzzy-border">
        <h2 className="text-3xl font-bold mb-4 text-[#8B4513] text-center">🛍️ Fuzzy Shop</h2>
        
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
          {Object.entries(shopItems).map(([itemName, item]) => {
            const cost = calculateCost(item);
            return (
              <div key={itemName} className="flex justify-between items-center bg-[#FFF5E6] p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div>
                  <span className="font-bold text-[#8B4513] flex items-center">
                    {getEmoji(itemName)} {itemName}
                  </span>
                  <p className="text-sm text-[#A0522D]">
                    +{item.productionIncrease.amount} {item.productionIncrease.resource} production
                  </p>
                  <span className="text-xs text-[#CD853F]">
                    (Owned: {item.count})
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => onPurchase(itemName, cost)}
                  disabled={resources.carrots < cost}
                  className="bg-[#FFE4B5] text-[#8B4513] hover:bg-[#FFDAB9] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Buy ({cost} 🥕)
                </Button>
              </div>
            );
          })}
        </div>
        <Button className="mt-6 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" onClick={onClose}>Close Shop</Button>
      </div>
    </div>
  );
};

export default Shop;