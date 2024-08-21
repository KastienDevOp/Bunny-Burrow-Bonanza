// Menu.jsx
import React from 'react';
import { Button } from '../components/ui/button';

const Menu = ({ onMenuClick }) => {
  return (
    <div className="flex justify-around bg-[#8B4513] p-2 shadow-md">
      <Button variant="ghost" onClick={() => onMenuClick('shop')} className="text-[#FFE4B5] hover:bg-[#A0522D]">Shop</Button>
      <Button variant="ghost" onClick={() => onMenuClick('habitats')} className="text-[#FFE4B5] hover:bg-[#A0522D]">Habitats</Button>
      <Button variant="ghost" onClick={() => onMenuClick('creatures')} className="text-[#FFE4B5] hover:bg-[#A0522D]">Creatures</Button>
      <Button variant="ghost" onClick={() => onMenuClick('miniGames')} className="text-[#FFE4B5] hover:bg-[#A0522D]">Mini-Games</Button>
      <Button variant="ghost" onClick={() => onMenuClick('settings')} className="text-[#FFE4B5] hover:bg-[#A0522D]">Settings</Button>
    </div>
  );
};

export default Menu;