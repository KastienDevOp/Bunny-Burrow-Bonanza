import React from 'react';
import { Button } from '../components/ui/button';


const ResourceBar = ({ resources, onResourceClick }) => {
  return (
    <div className="flex justify-around bg-white rounded-lg p-2 mb-4">
      {Object.entries(resources).map(([resourceType, amount]) => (
        <Button
          key={resourceType}
          variant="outline"
          onClick={() => onResourceClick(resourceType)}
          className="flex flex-col items-center"
        >
          <span className="capitalize">{resourceType}</span>
          <span>{Math.floor(amount)}</span>
        </Button>
      ))}
    </div>
  );
};

export default ResourceBar;