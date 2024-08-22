import React, { useState } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ResourceCategory = ({ category, resources, emojis, onResourceClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalValue = Object.values(resources).reduce((sum, value) => sum + value, 0);

  return (
    <div className="bg-[#FFF5E6] rounded-lg p-2 mb-2">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center text-[#8B4513] hover:bg-[#FFEFD5]"
      >
        <span className="font-semibold">{category}</span>
        <div className="flex items-center">
          <span className="mr-2">{Math.floor(totalValue)}</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </Button>
      {isExpanded && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {Object.entries(resources).map(([resourceType, amount]) => (
            <Button
              key={resourceType}
              variant="ghost"
              onClick={() => onResourceClick(resourceType)}
              className="flex flex-col items-center p-1 text-[#8B4513] hover:bg-[#FFEFD5]"
            >
              <span className="text-xl mb-1">{emojis[resourceType] || '🔹'}</span>
              <span className="capitalize text-xs">{resourceType.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="text-xs font-semibold">{Math.floor(amount)}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

const ResourceBar = ({ resources, onResourceClick }) => {
  const resourceCategories = {
    'Crops': ['carrots', 'nuts', 'berries', 'potatoes', 'tomatoes', 'corn', 'pumpkins', 'apples', 'watermelons', 'strawberries'],
    'Vegetables': ['cucumbers', 'beets', 'spinach', 'lettuce', 'radishes', 'onions', 'garlic', 'peas', 'beans', 'chilis', 'eggplants', 'broccoli', 'cabbage', 'cauliflower', 'zucchini', 'sweetPotatoes'],
    'Special': ['specialResources', 'rareResources'],
    'Attributes': ['happiness', 'luck', 'time', 'magic']
  };

  const resourceEmoji = {
    carrots: '🥕', nuts: '🌰', berries: '🫐', potatoes: '🥔', tomatoes: '🍅', corn: '🌽',
    pumpkins: '🎃', apples: '🍎', watermelons: '🍉', strawberries: '🍓', cucumbers: '🥒',
    beets: '🥗', spinach: '🥬', lettuce: '🥗', radishes: '🥗', onions: '🧅', garlic: '🧄',
    peas: '🥗', beans: '🥗', chilis: '🌶️', eggplants: '🍆', broccoli: '🥦', cabbage: '🥗',
    cauliflower: '🥗', zucchini: '🥒', sweetPotatoes: '🍠', specialResources: '✨',
    rareResources: '💎', happiness: '😊', luck: '🍀', time: '⏳', magic: '🔮'
  };

  return (
    <div className="bg-[#FFF8DC] p-2 shadow-md">
      <h2 className="text-xl font-bold mb-2 text-center text-[#8B4513]">Resources</h2>
      
      {/* Carrots display */}
      <div className="bg-[#FFE4B5] rounded-lg p-3 mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-3xl mr-2">🥕</span>
          <span className="font-bold text-lg text-[#8B4513]">Carrots</span>
        </div>
        <span className="text-2xl font-bold text-[#8B4513]">{Math.floor(resources.carrots)}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {Object.entries(resourceCategories).map(([category, categoryResources]) => (
          <ResourceCategory
            key={category}
            category={category}
            resources={Object.fromEntries(categoryResources.map(r => [r, resources[r] || 0]))}
            emojis={resourceEmoji}
            onResourceClick={onResourceClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ResourceBar;