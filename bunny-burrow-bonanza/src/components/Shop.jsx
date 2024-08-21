import React from 'react';
import { Button } from './ui/button';

const Shop = ({ onClose, onPurchase, resources, shopItems }) => {
  const calculateCost = (item) => {
    return Math.round(item.baseCost * Math.pow(item.costMultiplier, item.count));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Shop</h2>
        
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
          {Object.entries(shopItems).map(([itemName, item]) => {
            const cost = calculateCost(item);
            return (
              <div key={itemName} className="flex justify-between items-center">
                <div>
                  <span className="font-bold">{itemName}</span>
                  <p className="text-sm text-gray-600">
                    Increases {item.productionIncrease.resource} production by {item.productionIncrease.amount}
                  </p>
                  <span className="text-sm text-gray-500">
                    (Owned: {item.count})
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => onPurchase(itemName, cost)}
                  disabled={resources.carrots < cost}
                >
                  Buy ({cost} carrots)
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

export default Shop;