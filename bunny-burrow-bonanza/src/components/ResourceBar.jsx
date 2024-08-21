// ResourceBar.jsx
import React from 'react';
import { Button } from '../components/ui/button';

const ResourceBar = ({ resources, onResourceClick }) => {
  const resourceEmoji = {
    carrots: '🥕',
    nuts: '🌰',
    berries: '🫐',
    specialResources: '✨',
    rareResources: '💎',
  };

  return (
    <div className="flex justify-around bg-[#FFF8DC] p-2 shadow-md">
      {Object.entries(resources).map(([resourceType, amount]) => (
        <Button
          key={resourceType}
          variant="ghost"
          onClick={() => onResourceClick(resourceType)}
          className="flex flex-col items-center text-[#8B4513] hover:bg-[#FFEFD5] transition-colors duration-200"
        >
          <span className="text-xl mb-1">{resourceEmoji[resourceType]}</span>
          <span className="capitalize font-semibold text-sm">{resourceType}</span>
          <span className="text-xs">{Math.floor(amount)}</span>
        </Button>
      ))}
    </div>
  );
};

export default ResourceBar;