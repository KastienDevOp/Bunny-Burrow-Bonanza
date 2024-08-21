import React, { useState } from 'react';
import { Button } from './ui/button';

// Define shop categories and items
const SHOP_CATEGORIES = {
  Seeds: [
    { name: 'Carrot Seeds', baseCost: 10, costMultiplier: 1.1, productionIncrease: { resource: 'carrots', amount: 0.5 }, emoji: '🥕' },
    { name: 'Nut Seeds', baseCost: 25, costMultiplier: 1.15, productionIncrease: { resource: 'nuts', amount: 0.3 }, emoji: '🌰' },
    { name: 'Berry Seeds', baseCost: 20, costMultiplier: 1.12, productionIncrease: { resource: 'berries', amount: 0.2 }, emoji: '🫐' },
    { name: 'Potato Seeds', baseCost: 15, costMultiplier: 1.11, productionIncrease: { resource: 'potatoes', amount: 0.4 }, emoji: '🥔' },
    { name: 'Tomato Seeds', baseCost: 22, costMultiplier: 1.13, productionIncrease: { resource: 'tomatoes', amount: 0.25 }, emoji: '🍅' },
    { name: 'Corn Seeds', baseCost: 30, costMultiplier: 1.14, productionIncrease: { resource: 'corn', amount: 0.35 }, emoji: '🌽' },
    { name: 'Pumpkin Seeds', baseCost: 35, costMultiplier: 1.15, productionIncrease: { resource: 'pumpkins', amount: 0.3 }, emoji: '🎃' },
    { name: 'Apple Seeds', baseCost: 40, costMultiplier: 1.16, productionIncrease: { resource: 'apples', amount: 0.25 }, emoji: '🍎' },
    { name: 'Watermelon Seeds', baseCost: 45, costMultiplier: 1.17, productionIncrease: { resource: 'watermelons', amount: 0.2 }, emoji: '🍉' },
    { name: 'Strawberry Seeds', baseCost: 50, costMultiplier: 1.18, productionIncrease: { resource: 'strawberries', amount: 0.15 }, emoji: '🍓' },
    { name: 'Cucumber Seeds', baseCost: 55, costMultiplier: 1.19, productionIncrease: { resource: 'cucumbers', amount: 0.1 }, emoji: '🥒' },
    { name: 'Beet Seeds', baseCost: 60, costMultiplier: 1.2, productionIncrease: { resource: 'beets', amount: 0.2 }, emoji: '🥗' },
    { name: 'Spinach Seeds', baseCost: 65, costMultiplier: 1.21, productionIncrease: { resource: 'spinach', amount: 0.15 }, emoji: '🥬' },
    { name: 'Lettuce Seeds', baseCost: 70, costMultiplier: 1.22, productionIncrease: { resource: 'lettuce', amount: 0.1 }, emoji: '🥗' },
    { name: 'Radish Seeds', baseCost: 75, costMultiplier: 1.23, productionIncrease: { resource: 'radishes', amount: 0.15 }, emoji: '🥗' },
    { name: 'Onion Seeds', baseCost: 80, costMultiplier: 1.24, productionIncrease: { resource: 'onions', amount: 0.2 }, emoji: '🧅' },
    { name: 'Garlic Seeds', baseCost: 85, costMultiplier: 1.25, productionIncrease: { resource: 'garlic', amount: 0.15 }, emoji: '🧄' },
    { name: 'Pea Seeds', baseCost: 90, costMultiplier: 1.26, productionIncrease: { resource: 'peas', amount: 0.1 }, emoji: '🥗' },
    { name: 'Bean Seeds', baseCost: 95, costMultiplier: 1.27, productionIncrease: { resource: 'beans', amount: 0.15 }, emoji: '🥗' },
    { name: 'Chili Seeds', baseCost: 100, costMultiplier: 1.28, productionIncrease: { resource: 'chilis', amount: 0.1 }, emoji: '🌶️' },
    { name: 'Eggplant Seeds', baseCost: 105, costMultiplier: 1.29, productionIncrease: { resource: 'eggplants', amount: 0.15 }, emoji: '🍆' },
    { name: 'Broccoli Seeds', baseCost: 110, costMultiplier: 1.3, productionIncrease: { resource: 'broccoli', amount: 0.1 }, emoji: '🥦' },
    { name: 'Cabbage Seeds', baseCost: 115, costMultiplier: 1.31, productionIncrease: { resource: 'cabbage', amount: 0.15 }, emoji: '🥗' },
    { name: 'Cauliflower Seeds', baseCost: 120, costMultiplier: 1.32, productionIncrease: { resource: 'cauliflower', amount: 0.1 }, emoji: '🥗' },
    { name: 'Zucchini Seeds', baseCost: 125, costMultiplier: 1.33, productionIncrease: { resource: 'zucchini', amount: 0.15 }, emoji: '🥒' },
    { name: 'Sweet Potato Seeds', baseCost: 130, costMultiplier: 1.34, productionIncrease: { resource: 'sweetPotatoes', amount: 0.1 }, emoji: '🍠' },
  ],
  Tools: [
    { name: 'Carrot Harvester', baseCost: 200, costMultiplier: 1.18, productionIncrease: { resource: 'carrots', amount: 1 }, emoji: '🚜' },
    { name: 'Nut Cracker', baseCost: 150, costMultiplier: 1.16, productionIncrease: { resource: 'nuts', amount: 0.6 }, emoji: '🔨' },
    { name: 'Berry Picker', baseCost: 180, costMultiplier: 1.17, productionIncrease: { resource: 'berries', amount: 0.5 }, emoji: '🧺' },
    { name: 'Potato Digger', baseCost: 170, costMultiplier: 1.17, productionIncrease: { resource: 'potatoes', amount: 0.7 }, emoji: '🔧' },
    { name: 'Tomato Picker', baseCost: 190, costMultiplier: 1.18, productionIncrease: { resource: 'tomatoes', amount: 0.4 }, emoji: '🍴' },
    { name: 'Corn Harvester', baseCost: 220, costMultiplier: 1.19, productionIncrease: { resource: 'corn', amount: 0.6 }, emoji: '🌾' },
    { name: 'Pumpkin Harvester', baseCost: 250, costMultiplier: 1.2, productionIncrease: { resource: 'pumpkins', amount: 0.5 }, emoji: '🎃' },
    { name: 'Apple Picker', baseCost: 270, costMultiplier: 1.21, productionIncrease: { resource: 'apples', amount: 0.4 }, emoji: '🍎' },
    { name: 'Watermelon Slicer', baseCost: 290, costMultiplier: 1.22, productionIncrease: { resource: 'watermelons', amount: 0.35 }, emoji: '🍉' },
    { name: 'Strawberry Picker', baseCost: 310, costMultiplier: 1.23, productionIncrease: { resource: 'strawberries', amount: 0.3 }, emoji: '🍓' },
    { name: 'Cucumber Harvester', baseCost: 330, costMultiplier: 1.24, productionIncrease: { resource: 'cucumbers', amount: 0.25 }, emoji: '🥒' },
    { name: 'Beet Digger', baseCost: 350, costMultiplier: 1.25, productionIncrease: { resource: 'beets', amount: 0.3 }, emoji: '🥗' },
    { name: 'Spinach Picker', baseCost: 370, costMultiplier: 1.26, productionIncrease: { resource: 'spinach', amount: 0.25 }, emoji: '🥬' },
    { name: 'Lettuce Harvester', baseCost: 390, costMultiplier: 1.27, productionIncrease: { resource: 'lettuce', amount: 0.2 }, emoji: '🥗' },
    { name: 'Radish Digger', baseCost: 410, costMultiplier: 1.28, productionIncrease: { resource: 'radishes', amount: 0.25 }, emoji: '🥗' },
    { name: 'Onion Picker', baseCost: 430, costMultiplier: 1.29, productionIncrease: { resource: 'onions', amount: 0.3 }, emoji: '🧅' },
    { name: 'Garlic Harvester', baseCost: 450, costMultiplier: 1.3, productionIncrease: { resource: 'garlic', amount: 0.25 }, emoji: '🧄' },
    { name: 'Pea Picker', baseCost: 470, costMultiplier: 1.31, productionIncrease: { resource: 'peas', amount: 0.2 }, emoji: '🥗' },
    { name: 'Bean Harvester', baseCost: 490, costMultiplier: 1.32, productionIncrease: { resource: 'beans', amount: 0.25 }, emoji: '🥗' },
    { name: 'Chili Picker', baseCost: 510, costMultiplier: 1.33, productionIncrease: { resource: 'chilis', amount: 0.2 }, emoji: '🌶️' },
    { name: 'Eggplant Harvester', baseCost: 530, costMultiplier: 1.34, productionIncrease: { resource: 'eggplants', amount: 0.25 }, emoji: '🍆' },
    { name: 'Broccoli Picker', baseCost: 550, costMultiplier: 1.35, productionIncrease: { resource: 'broccoli', amount: 0.2 }, emoji: '🥦' },
    { name: 'Cabbage Harvester', baseCost: 570, costMultiplier: 1.36, productionIncrease: { resource: 'cabbage', amount: 0.25 }, emoji: '🥗' },
    { name: 'Cauliflower Harvester', baseCost: 590, costMultiplier: 1.37, productionIncrease: { resource: 'cauliflower', amount: 0.2 }, emoji: '🥗' },
    { name: 'Zucchini Picker', baseCost: 610, costMultiplier: 1.38, productionIncrease: { resource: 'zucchini', amount: 0.25 }, emoji: '🥒' },
    { name: 'Sweet Potato Digger', baseCost: 630, costMultiplier: 1.39, productionIncrease: { resource: 'sweetPotatoes', amount: 0.2 }, emoji: '🍠' },
  ],
  Magic: [
    { name: 'Magic Fertilizer', baseCost: 100, costMultiplier: 1.2, productionIncrease: { resource: 'specialResources', amount: 0.1 }, emoji: '✨' },
    { name: 'Golden Carrot', baseCost: 500, costMultiplier: 1.25, productionIncrease: { resource: 'rareResources', amount: 0.05 }, emoji: '🥕✨' },
    { name: 'Resource Multiplier', baseCost: 1000, costMultiplier: 1.3, productionIncrease: { resource: 'all', amount: 0.1 }, emoji: '🌟' },
    { name: 'Lucky Charm', baseCost: 300, costMultiplier: 1.22, productionIncrease: { resource: 'luck', amount: 0.02 }, emoji: '🍀' },
    { name: 'Time Warp', baseCost: 700, costMultiplier: 1.28, productionIncrease: { resource: 'time', amount: 0.03 }, emoji: '⏳' },
    { name: 'Mystic Crystal', baseCost: 1200, costMultiplier: 1.35, productionIncrease: { resource: 'magic', amount: 0.04 }, emoji: '💎' },
    { name: 'Enchanted Soil', baseCost: 800, costMultiplier: 1.27, productionIncrease: { resource: 'specialResources', amount: 0.15 }, emoji: '🌱✨' },
    { name: 'Rainbow Aura', baseCost: 1500, costMultiplier: 1.32, productionIncrease: { resource: 'all', amount: 0.12 }, emoji: '🌈' },
    { name: 'Lucky Horseshoe', baseCost: 400, costMultiplier: 1.23, productionIncrease: { resource: 'luck', amount: 0.03 }, emoji: '🐴🍀' },
    { name: 'Ancient Artifact', baseCost: 1800, costMultiplier: 1.37, productionIncrease: { resource: 'magic', amount: 0.05 }, emoji: '🏛️' },
    { name: 'Moonstone', baseCost: 2000, costMultiplier: 1.38, productionIncrease: { resource: 'specialResources', amount: 0.2 }, emoji: '🌙' },
    { name: 'Sunstone', baseCost: 2200, costMultiplier: 1.39, productionIncrease: { resource: 'specialResources', amount: 0.25 }, emoji: '☀️' },
    { name: 'Crystal Ball', baseCost: 2400, costMultiplier: 1.4, productionIncrease: { resource: 'magic', amount: 0.06 }, emoji: '🔮' },
    { name: 'Enchanted Mirror', baseCost: 2600, costMultiplier: 1.41, productionIncrease: { resource: 'luck', amount: 0.04 }, emoji: '🪞' },
    { name: 'Magic Wand', baseCost: 2800, costMultiplier: 1.42, productionIncrease: { resource: 'magic', amount: 0.07 }, emoji: '🪄' },
    { name: 'Phoenix Feather', baseCost: 3000, costMultiplier: 1.43, productionIncrease: { resource: 'specialResources', amount: 0.3 }, emoji: '🦅' },
    { name: 'Dragon Scale', baseCost: 3200, costMultiplier: 1.44, productionIncrease: { resource: 'magic', amount: 0.08 }, emoji: '🐉' },
    { name: 'Unicorn Horn', baseCost: 3400, costMultiplier: 1.45, productionIncrease: { resource: 'magic', amount: 0.09 }, emoji: '🦄' },
    { name: 'Fairy Dust', baseCost: 3600, costMultiplier: 1.46, productionIncrease: { resource: 'magic', amount: 0.1 }, emoji: '🧚‍♀️✨' },
    { name: 'Elixir of Life', baseCost: 3800, costMultiplier: 1.47, productionIncrease: { resource: 'specialResources', amount: 0.35 }, emoji: '🧪' },
    { name: 'Philosopher\'s Stone', baseCost: 4000, costMultiplier: 1.48, productionIncrease: { resource: 'all', amount: 0.15 }, emoji: '🔑' },
    { name: 'Infinity Gauntlet', baseCost: 4200, costMultiplier: 1.49, productionIncrease: { resource: 'magic', amount: 0.11 }, emoji: '🧤' },
    { name: 'Cosmic Energy', baseCost: 4400, costMultiplier: 1.5, productionIncrease: { resource: 'specialResources', amount: 0.4 }, emoji: '🌌' },
    { name: 'Time Crystal', baseCost: 4600, costMultiplier: 1.51, productionIncrease: { resource: 'time', amount: 0.04 }, emoji: '⏰' },
    { name: 'Eternal Flame', baseCost: 4800, costMultiplier: 1.52, productionIncrease: { resource: 'magic', amount: 0.12 }, emoji: '🔥' },
    { name: 'Divine Blessing', baseCost: 5000, costMultiplier: 1.53, productionIncrease: { resource: 'all', amount: 0.16 }, emoji: '🕊️' },
  ],
  Decorations: [
    { name: 'Flower Patch', baseCost: 50, costMultiplier: 1.1, productionIncrease: { resource: 'happiness', amount: 0.1 }, emoji: '🌼' },
    { name: 'Mushroom Circle', baseCost: 75, costMultiplier: 1.12, productionIncrease: { resource: 'happiness', amount: 0.15 }, emoji: '🍄' },
    { name: 'Fairy Lights', baseCost: 100, costMultiplier: 1.15, productionIncrease: { resource: 'happiness', amount: 0.2 }, emoji: '🎆' },
    { name: 'Garden Fountain', baseCost: 125, costMultiplier: 1.16, productionIncrease: { resource: 'happiness', amount: 0.25 }, emoji: '⛲' },
    { name: 'Bird Feeder', baseCost: 150, costMultiplier: 1.17, productionIncrease: { resource: 'happiness', amount: 0.3 }, emoji: '🐦' },
    { name: 'Wind Chimes', baseCost: 175, costMultiplier: 1.18, productionIncrease: { resource: 'happiness', amount: 0.35 }, emoji: '🎐' },
    { name: 'Garden Gnome', baseCost: 200, costMultiplier: 1.19, productionIncrease: { resource: 'happiness', amount: 0.4 }, emoji: '🧍‍♂️' },
    { name: 'Butterfly Garden', baseCost: 225, costMultiplier: 1.2, productionIncrease: { resource: 'happiness', amount: 0.45 }, emoji: '🦋' },
    { name: 'Zen Garden', baseCost: 250, costMultiplier: 1.21, productionIncrease: { resource: 'happiness', amount: 0.5 }, emoji: '🧘‍♂️' },
    { name: 'Rock Garden', baseCost: 275, costMultiplier: 1.22, productionIncrease: { resource: 'happiness', amount: 0.55 }, emoji: '🪨' },
    { name: 'Waterfall', baseCost: 300, costMultiplier: 1.23, productionIncrease: { resource: 'happiness', amount: 0.6 }, emoji: '🌊' },
    { name: 'Bamboo Forest', baseCost: 325, costMultiplier: 1.24, productionIncrease: { resource: 'happiness', amount: 0.65 }, emoji: '🎋' },
    { name: 'Koi Pond', baseCost: 350, costMultiplier: 1.25, productionIncrease: { resource: 'happiness', amount: 0.7 }, emoji: '🐠' },
    { name: 'Topiary', baseCost: 375, costMultiplier: 1.26, productionIncrease: { resource: 'happiness', amount: 0.75 }, emoji: '🌳' },
    { name: 'Hanging Plants', baseCost: 400, costMultiplier: 1.27, productionIncrease: { resource: 'happiness', amount: 0.8 }, emoji: '🪴' },
    { name: 'Bird Bath', baseCost: 425, costMultiplier: 1.28, productionIncrease: { resource: 'happiness', amount: 0.85 }, emoji: '🐦💦' },
    { name: 'Gazebo', baseCost: 450, costMultiplier: 1.29, productionIncrease: { resource: 'happiness', amount: 0.9 }, emoji: '🏞️' },
    { name: 'Pergola', baseCost: 475, costMultiplier: 1.3, productionIncrease: { resource: 'happiness', amount: 0.95 }, emoji: '🏞️' },
    { name: 'Arbor', baseCost: 500, costMultiplier: 1.31, productionIncrease: { resource: 'happiness', amount: 1 }, emoji: '🏞️' },
    { name: 'Trellis', baseCost: 525, costMultiplier: 1.32, productionIncrease: { resource: 'happiness', amount: 1.05 }, emoji: '🏞️' },
    { name: 'Greenhouse', baseCost: 550, costMultiplier: 1.33, productionIncrease: { resource: 'happiness', amount: 1.1 }, emoji: '🏡' },
    { name: 'Statue', baseCost: 575, costMultiplier: 1.34, productionIncrease: { resource: 'happiness', amount: 1.15 }, emoji: '🗽' },
    { name: 'Fountain', baseCost: 600, costMultiplier: 1.35, productionIncrease: { resource: 'happiness', amount: 1.2 }, emoji: '⛲' },
    { name: 'Pavilion', baseCost: 625, costMultiplier: 1.36, productionIncrease: { resource: 'happiness', amount: 1.25 }, emoji: '🏞️' },
    { name: 'Bridge', baseCost: 650, costMultiplier: 1.37, productionIncrease: { resource: 'happiness', amount: 1.3 }, emoji: '🌉' },
    { name: 'Lanterns', baseCost: 675, costMultiplier: 1.38, productionIncrease: { resource: 'happiness', amount: 1.35 }, emoji: '🏮' },
    { name: 'Pagoda', baseCost: 700, costMultiplier: 1.39, productionIncrease: { resource: 'happiness', amount: 1.4 }, emoji: '🏯' },
    { name: 'Temple', baseCost: 725, costMultiplier: 1.4, productionIncrease: { resource: 'happiness', amount: 1.45 }, emoji: '🕌' },
    { name: 'Castle', baseCost: 750, costMultiplier: 1.41, productionIncrease: { resource: 'happiness', amount: 1.5 }, emoji: '🏰' },
    { name: 'Palace', baseCost: 775, costMultiplier: 1.42, productionIncrease: { resource: 'happiness', amount: 1.55 }, emoji: '🏛️' },
    { name: 'Mansion', baseCost: 800, costMultiplier: 1.43, productionIncrease: { resource: 'happiness', amount: 1.6 }, emoji: '🏠' },
    { name: 'Villa', baseCost: 825, costMultiplier: 1.44, productionIncrease: { resource: 'happiness', amount: 1.65 }, emoji: '🏡' },
    { name: 'Chalet', baseCost: 850, costMultiplier: 1.45, productionIncrease: { resource: 'happiness', amount: 1.7 }, emoji: '🏡' },
    { name: 'Cottage', baseCost: 875, costMultiplier: 1.46, productionIncrease: { resource: 'happiness', amount: 1.75 }, emoji: '🏡' },
    { name: 'Bungalow', baseCost: 900, costMultiplier: 1.47, productionIncrease: { resource: 'happiness', amount: 1.8 }, emoji: '🏡' },
    { name: 'Farmhouse', baseCost: 925, costMultiplier: 1.48, productionIncrease: { resource: 'happiness', amount: 1.85 }, emoji: '🏡' },
    { name: 'Manor', baseCost: 950, costMultiplier: 1.49, productionIncrease: { resource: 'happiness', amount: 1.9 }, emoji: '🏡' },
    { name: 'Estate', baseCost: 975, costMultiplier: 1.5, productionIncrease: { resource: 'happiness', amount: 1.95 }, emoji: '🏡' },
    { name: 'Resort', baseCost: 1000, costMultiplier: 1.51, productionIncrease: { resource: 'happiness', amount: 2 }, emoji: '🏨' },
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
        const item = Object.values(SHOP_CATEGORIES).flat().find(i => i.name === itemName);
        for (let i = 0; i < quantity; i++) {
          onPurchase(item, calculateCost(item));
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

        {/* Resource display */}
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

        {/* Category buttons */}
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

        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-md border border-[#DEB887] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
          />
        </div>

        {/* Shop items grid */}
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

                {/* Shopping cart for the current item */}
                {cart[item.name] > 0 && (
                    <div className="mt-2 bg-[#FFEFD5] p-2 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span>{item.name} x{cart[item.name]}</span>
                        <div>
                          <Button
                            variant="outline"
                            onClick={() => removeFromCart(item.name)}
                            className="bg-[#FFE4B5] text-[#8B4513] hover:bg-[#FFDAB9] px-2 py-1 mr-2"
                          >
                            Remove
                          </Button>
                          <Button
                            onClick={() => handlePurchase(item.name)}
                            className="bg-[#8B4513] text-white hover:bg-[#A0522D]"
                          >
                            Purchase ({cart[item.name] * cost}                             🥕)
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
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

