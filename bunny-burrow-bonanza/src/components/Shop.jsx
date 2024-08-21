import React, { useState } from 'react';
import { Button } from './ui/button';

// Define shop categories and items
const SHOP_CATEGORIES = {
  Seeds: [
    { name: 'Carrot Seeds', baseCost: 10, costMultiplier: 1.1, productionIncrease: { resource: 'carrots', amount: 0.5 }, emoji: '🥕' },
    { name: 'Nut Seeds', baseCost: 25, costMultiplier: 1.15, productionIncrease: { resource: 'nuts', amount: 0.3 }, emoji: '🌰' },
    { name: 'Berry Seeds', baseCost: 20, costMultiplier: 1.12, productionIncrease: { resource: 'berries', amount: 0.2 }, emoji: '🫐' },
  ],
  Tools: [
    { name: 'Carrot Harvester', baseCost: 200, costMultiplier: 1.18, productionIncrease: { resource: 'carrots', amount: 1 }, emoji: '🚜' },
    { name: 'Nut Cracker', baseCost: 150, costMultiplier: 1.16, productionIncrease: { resource: 'nuts', amount: 0.6 }, emoji: '🔨' },
    { name: 'Berry Picker', baseCost: 180, costMultiplier: 1.17, productionIncrease: { resource: 'berries', amount: 0.5 }, emoji: '🧺' },
  ],
  Magic: [
    { name: 'Magic Fertilizer', baseCost: 100, costMultiplier: 1.2, productionIncrease: { resource: 'specialResources', amount: 0.1 }, emoji: '✨' },
    { name: 'Golden Carrot', baseCost: 500, costMultiplier: 1.25, productionIncrease: { resource: 'rareResources', amount: 0.05 }, emoji: '🥕✨' },
    { name: 'Resource Multiplier', baseCost: 1000, costMultiplier: 1.3, productionIncrease: { resource: 'all', amount: 0.1 }, emoji: '🌟' },
  ],
  Decorations: [
    { name: 'Flower Patch', baseCost: 50, costMultiplier: 1.1, productionIncrease: { resource: 'happiness', amount: 0.1 }, emoji: '🌼' },
    { name: 'Mushroom Circle', baseCost: 75, costMultiplier: 1.12, productionIncrease: { resource: 'happiness', amount: 0.15 }, emoji: '🍄' },
    { name: 'Fairy Lights', baseCost: 100, costMultiplier: 1.15, productionIncrease: { resource: 'happiness', amount: 0.2 }, emoji: '🎆' },
  ],
};

const Shop = ({ onClose, onPurchase, resources, shopItems }) => {
  const [activeCategory, setActiveCategory] = useState('Seeds');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState({});

  const calculateCost = (item) => {
    const count = shopItems[item.name]?.count || 0;
    return Math.round(item.baseCost * Math.pow(item.costMultiplier, count));
  };

  const filteredItems = SHOP_CATEGORIES[activeCategory].filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item) => {
    setCart(prevCart => ({
      ...prevCart,
      [item.name]: (prevCart[item.name] || 0) + 1
    }));
  };

  const removeFromCart = (itemName) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[itemName] > 1) {
        newCart[itemName]--;
      } else {
        delete newCart[itemName];
      }
      return newCart;
    });
  };

  const getTotalCost = () => {
    return Object.entries(cart).reduce((total, [itemName, quantity]) => {
      const item = Object.values(SHOP_CATEGORIES).flat().find(i => i.name === itemName);
      return total + calculateCost(item) * quantity;
    }, 0);
  };

  const handlePurchase = () => {
    const totalCost = getTotalCost();
    if (resources.carrots >= totalCost) {
      Object.entries(cart).forEach(([itemName, quantity]) => {
        for (let i = 0; i < quantity; i++) {
          onPurchase(itemName, calculateCost(SHOP_CATEGORIES[activeCategory].find(item => item.name === itemName)));
        }
      });
      setCart({});
    } else {
      alert("Not enough carrots!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#FFF8DC] p-6 rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto fuzzy-border">
        <h2 className="text-3xl font-bold mb-4 text-[#8B4513] text-center">🛍️ Fuzzy Shop</h2>
        
        <div className="mb-4 p-3 bg-[#FFEFD5] rounded-lg shadow-inner">
          <h3 className="font-bold mb-2 text-[#A0522D]">Available Resources:</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(resources).map(([resource, amount]) => (
              <div key={resource} className="flex justify-between items-center">
                <span className="capitalize text-[#8B4513]">{resource}:</span>
                <span className="font-semibold text-[#A0522D]">{Math.floor(amount)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          {Object.keys(SHOP_CATEGORIES).map(category => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`mr-2 ${activeCategory === category ? 'bg-[#DEB887] text-white' : 'bg-[#FFE4B5] text-[#8B4513]'} hover:bg-[#FFDAB9]`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-md border border-[#DEB887] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const cost = calculateCost(item);
            const count = shopItems[item.name]?.count || 0;
            return (
              <div key={item.name} className="bg-[#FFF5E6] p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#8B4513] flex items-center">
                    {item.emoji} {item.name}
                  </span>
                  <Button 
                    variant="outline" 
                    onClick={() => addToCart(item)}
                    className="bg-[#FFE4B5] text-[#8B4513] hover:bg-[#FFDAB9]"
                  >
                    Add to Cart ({cost} 🥕)
                  </Button>
                </div>
                <p className="text-sm text-[#A0522D]">
                  +{item.productionIncrease.amount} {item.productionIncrease.resource} production
                </p>
                <span className="text-xs text-[#CD853F]">
                  (Owned: {count})
                </span>
              </div>
            );
          })}
        </div>

        {Object.keys(cart).length > 0 && (
          <div className="mt-6 bg-[#FFEFD5] p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-[#8B4513]">Shopping Cart:</h3>
            {Object.entries(cart).map(([itemName, quantity]) => (
              <div key={itemName} className="flex justify-between items-center mb-2">
                <span>{itemName} x{quantity}</span>
                <Button 
                  variant="outline" 
                  onClick={() => removeFromCart(itemName)}
                  className="bg-[#FFE4B5] text-[#8B4513] hover:bg-[#FFDAB9] px-2 py-1"
                >
                  Remove
                </Button>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">Total Cost: {getTotalCost()} 🥕</span>
              <Button 
                onClick={handlePurchase}
                className="bg-[#8B4513] text-white hover:bg-[#A0522D]"
              >
                Purchase
              </Button>
            </div>
          </div>
        )}

        <Button className="mt-6 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" onClick={onClose}>Close Shop</Button>
      </div>
    </div>
  );
};

export default Shop;