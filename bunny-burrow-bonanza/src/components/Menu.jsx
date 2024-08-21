import React from 'react';
import { Button } from '../components/ui/button';

const Menu = ({ onMenuClick }) => {
  return (
    <div className="flex justify-around bg-white rounded-lg p-2">
      <Button variant="outline" onClick={() => onMenuClick('shop')}>Shop</Button>
      <Button variant="outline" onClick={() => onMenuClick('habitats')}>Habitats</Button>
      <Button variant="outline" onClick={() => onMenuClick('creatures')}>Creatures</Button>
      <Button variant="outline" onClick={() => onMenuClick('miniGames')}>Mini-Games</Button>
      <Button variant="outline" onClick={() => onMenuClick('settings')}>Settings</Button>
    </div>
  );
};

export default Menu;