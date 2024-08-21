import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Button } from './components/ui/button';
import MainScreen from './components/MainScreen';
import ResourceBar from './components/ResourceBar';
import Menu from './components/Menu';
import Shop from './components/Shop';
import Habitats from './components/Habitats';
import Creatures from './components/Creatures';
import MiniGames from './components/MiniGames';
import Settings from './components/Settings';

const INITIAL_RESOURCES = {
  carrots: 1000,
  nuts: 0,
  berries: 0,
  potatoes: 0,
  tomatoes: 0,
  corn: 0,
  specialResources: 0,
  rareResources: 0,
  happiness: 0,
  luck: 0,
  time: 0,
  magic: 0,
};

const INITIAL_PRODUCTION_RATES = {
  carrots: 1,
  nuts: 0.5,
  berries: 0.3,
  potatoes: 0.4,
  tomatoes: 0.25,
  corn: 0.35,
  specialResources: 0.1,
  rareResources: 0.01,
  happiness: 0.1,
  luck: 0.02,
  time: 0.03,
  magic: 0.04,
};

const INITIAL_SHOP_ITEMS = {
  'Carrot Seeds': { count: 0, productionIncrease: { resource: 'carrots', amount: 0.5 } },
  'Nut Seeds': { count: 0, productionIncrease: { resource: 'nuts', amount: 0.3 } },
  'Berry Seeds': { count: 0, productionIncrease: { resource: 'berries', amount: 0.2 } },
  'Potato Seeds': { count: 0, productionIncrease: { resource: 'potatoes', amount: 0.4 } },
  'Tomato Seeds': { count: 0, productionIncrease: { resource: 'tomatoes', amount: 0.25 } },
  'Corn Seeds': { count: 0, productionIncrease: { resource: 'corn', amount: 0.35 } },
  'Magic Fertilizer': { count: 0, productionIncrease: { resource: 'specialResources', amount: 0.1 } },
  'Golden Carrot': { count: 0, productionIncrease: { resource: 'rareResources', amount: 0.05 } },
  'Resource Multiplier': { count: 0, productionIncrease: { resource: 'all', amount: 0.1 } },
  'Lucky Charm': { count: 0, productionIncrease: { resource: 'luck', amount: 0.02 } },
  'Time Warp': { count: 0, productionIncrease: { resource: 'time', amount: 0.03 } },
  'Mystic Crystal': { count: 0, productionIncrease: { resource: 'magic', amount: 0.04 } },
};

const HABITAT_TYPES = {
  'Cozy Burrow': { resourceBonus: { type: 'carrots', amount: 0.2 } },
  'Carrot Patch': { resourceBonus: { type: 'carrots', amount: 0.5 } },
  'Nut Grove': { resourceBonus: { type: 'nuts', amount: 0.3 } },
  'Berry Bush': { resourceBonus: { type: 'berries', amount: 0.4 } },
  'Potato Field': { resourceBonus: { type: 'potatoes', amount: 0.35 } },
  'Mushroom Cave': { resourceBonus: { type: 'specialResources', amount: 0.2 } },
  'Treehouse': { resourceBonus: { type: 'all', amount: 0.1 } },
  'Corn Maze': { resourceBonus: { type: 'corn', amount: 0.6 } },
  'Tomato Greenhouse': { resourceBonus: { type: 'tomatoes', amount: 0.55 } },
  'Clover Field': { resourceBonus: { type: 'luck', amount: 0.15 } },
  'Luxury Warren': { resourceBonus: { type: 'all', amount: 0.2 } },
  'Crystal Cave': { resourceBonus: { type: 'rareResources', amount: 0.3 } },
  'Sky Island': { resourceBonus: { type: 'all', amount: 0.25 } },
  'Time Warp Burrow': { resourceBonus: { type: 'time', amount: 0.4 } },
  'Enchanted Forest': { resourceBonus: { type: 'magic', amount: 0.5 } },
};

const CREATURE_TYPES = {
  'Common Bunny': { resourceBonus: { type: 'carrots', amount: 0.2 } },
  'Nutty Squirrel': { resourceBonus: { type: 'nuts', amount: 0.3 } },
  'Berry Fox': { resourceBonus: { type: 'berries', amount: 0.4 } },
  'Magic Hare': { resourceBonus: { type: 'specialResources', amount: 0.1 } },
  'Golden Rabbit': { resourceBonus: { type: 'rareResources', amount: 0.05 } },
  'Resource Raccoon': { resourceBonus: { type: 'all', amount: 0.05 } },
};

export default function App() {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [productionRates, setProductionRates] = useState(INITIAL_PRODUCTION_RATES);
  const [showAlert, setShowAlert] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);
  const [shopItems, setShopItems] = useState(INITIAL_SHOP_ITEMS);
  const [purchasedHabitats, setPurchasedHabitats] = useState({});
  const [purchasedCreatures, setPurchasedCreatures] = useState({});
  const [habitatOrder, setHabitatOrder] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResources(prevResources => {
        const newResources = { ...prevResources };
        Object.keys(productionRates).forEach(resource => {
          newResources[resource] += productionRates[resource];
        });
        return newResources;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [productionRates]);

  useEffect(() => {
    updateProductionRates();
  }, [shopItems, purchasedHabitats, purchasedCreatures]);

  const updateProductionRates = () => {
    setProductionRates(prevRates => {
      const newRates = { ...INITIAL_PRODUCTION_RATES };

      // Apply shop item bonuses
      Object.entries(shopItems).forEach(([itemName, item]) => {
        if (item.productionIncrease) {
          if (item.productionIncrease.resource === 'all') {
            Object.keys(newRates).forEach(resource => {
              newRates[resource] *= Math.pow(1 + item.productionIncrease.amount, item.count);
            });
          } else {
            newRates[item.productionIncrease.resource] += item.productionIncrease.amount * item.count;
          }
        }
      });

      // Apply habitat bonuses
      Object.entries(purchasedHabitats).forEach(([habitatName, count]) => {
        const habitat = HABITAT_TYPES[habitatName];
        if (habitat && habitat.resourceBonus) {
          if (habitat.resourceBonus.type === 'all') {
            Object.keys(newRates).forEach(resource => {
              newRates[resource] *= Math.pow(1 + habitat.resourceBonus.amount, count);
            });
          } else {
            newRates[habitat.resourceBonus.type] += habitat.resourceBonus.amount * count;
          }
        }
      });

      // Apply creature bonuses
      Object.entries(purchasedCreatures).forEach(([creatureName, count]) => {
        const creature = CREATURE_TYPES[creatureName];
        if (creature && creature.resourceBonus) {
          if (creature.resourceBonus.type === 'all') {
            Object.keys(newRates).forEach(resource => {
              newRates[resource] *= Math.pow(1 + creature.resourceBonus.amount, count);
            });
          } else {
            newRates[creature.resourceBonus.type] += creature.resourceBonus.amount * count;
          }
        }
      });

      return newRates;
    });
  };

  const handleResourceClick = (resourceType) => {
    setResources(prevResources => ({
      ...prevResources,
      [resourceType]: prevResources[resourceType] + 1,
    }));
  };

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  const handleCloseComponent = () => {
    setActiveComponent(null);
  };

  const handlePurchase = (item, cost) => {
    if (resources.carrots >= cost) {
      setResources(prevResources => ({
        ...prevResources,
        carrots: prevResources.carrots - cost
      }));

      setShopItems(prevItems => ({
        ...prevItems,
        [item.name]: {
          ...prevItems[item.name],
          count: (prevItems[item.name]?.count || 0) + 1
        }
      }));

      // Production rates will be updated via the useEffect hook
    } else {
      alert("Not enough carrots!");
    }
  };

  const handleHabitatPurchase = (habitat, cost) => {
    if (resources.carrots >= cost) {
      setResources(prevResources => ({
        ...prevResources,
        carrots: prevResources.carrots - cost
      }));
  
      setPurchasedHabitats(prevHabitats => {
        const updatedHabitats = {
          ...prevHabitats,
          [habitat.name]: (prevHabitats[habitat.name] || 0) + 1
        };
  
        // Update habitat order
        if (!habitatOrder.includes(habitat.name)) {
          setHabitatOrder(prevOrder => [...prevOrder, habitat.name]);
        }
  
        return updatedHabitats;
      });
  
      // Production rates will be updated via the useEffect hook
    } else {
      alert("Not enough carrots!");
    }
  };
  
  const handleHabitatReorder = (newOrder) => {
    console.log('Reordering habitats:', newOrder);
    setHabitatOrder(newOrder);
  };

  const handleCreaturePurchase = (creature, cost) => {
    if (resources.carrots >= cost) {
      setResources(prevResources => ({
        ...prevResources,
        carrots: prevResources.carrots - cost
      }));

      setPurchasedCreatures(prevCreatures => ({
        ...prevCreatures,
        [creature.name]: (prevCreatures[creature.name] || 0) + 1
      }));

      // Production rates will be updated via the useEffect hook
    } else {
      alert("Not enough carrots!");
    }
  };

  const handleGameComplete = (gameName, score) => {
    let reward = 0;
    let rewardType = '';

    switch (gameName) {
      case 'Carrot Harvest':
        reward = Math.floor(score * 1.5);
        rewardType = 'carrots';
        break;
      case 'Nut Gathering':
        reward = Math.floor(score * 2);
        rewardType = 'nuts';
        break;
      case 'Berry Picking':
        reward = Math.floor(score * 1.8);
        rewardType = 'berries';
        break;
      case 'Bunny Hop':
        reward = Math.floor(score * 0.5);
        rewardType = 'specialResources';
        break;
      case 'Warren Maze':
        reward = Math.floor(score * 0.2);
        rewardType = 'rareResources';
        break;
      default:
        break;
    }

    setResources(prevResources => ({
      ...prevResources,
      [rewardType]: prevResources[rewardType] + reward
    }));

    alert(`Congratulations! You earned ${reward} ${rewardType} from ${gameName}!`);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-b from-[#FFE4B5] to-[#FFB6C1] font-fredoka flex flex-col">
      <header className="p-4 bg-[#8B4513] text-[#FFE4B5] shadow-md">
        <h1 className="text-4xl font-bold text-center drop-shadow-lg">
          🐰 Bunny Burrow Bonanza 🐿️
        </h1>
      </header>

      <main className="flex-grow flex flex-col overflow-hidden">
        <ResourceBar resources={resources} onResourceClick={handleResourceClick} />

        <div className="flex-grow overflow-auto p-4">
        <MainScreen
          purchasedHabitats={purchasedHabitats}
          purchasedCreatures={purchasedCreatures}
          shopItems={shopItems}
          onHabitatReorder={handleHabitatReorder}
        />
        </div>

        {showAlert && (
          <Alert variant="info" className="m-4 fuzzy-border bg-[#FFF8DC] border-[#DEB887] text-[#8B4513]">
            <AlertCircle className="h-5 w-5 text-[#FF6347]" />
            <AlertTitle className="text-lg font-semibold">Welcome to Bunny Burrow Bonanza!</AlertTitle>
            <AlertDescription className="text-[#A0522D]">
              Start building your adorable rodent community. Collect resources, build habitats, and watch your furry friends thrive!
            </AlertDescription>
            <Button variant="outline" onClick={() => setShowAlert(false)} className="mt-2 bg-[#FFE4B5] text-[#8B4513] hover:bg-[#FFDAB9]">
              Let's get fuzzy!
            </Button>
          </Alert>
        )}

        <Menu onMenuClick={handleMenuClick} />

        {activeComponent === 'shop' && (
          <Shop
            onClose={handleCloseComponent}
            onPurchase={handlePurchase}
            resources={resources}
            shopItems={shopItems}
          />
        )}
        {activeComponent === 'habitats' && (
          <Habitats
            onClose={handleCloseComponent}
            onPurchase={handleHabitatPurchase}
            resources={resources}
            purchasedHabitats={purchasedHabitats}
          />
        )}
        {activeComponent === 'creatures' && (
          <Creatures
            onClose={handleCloseComponent}
            onPurchase={handleCreaturePurchase}
            resources={resources}
            purchasedCreatures={purchasedCreatures}
          />
        )}
        {activeComponent === 'miniGames' && (
          <MiniGames
            onClose={handleCloseComponent}
            onGameComplete={handleGameComplete}
          />
        )}
        {activeComponent === 'settings' && <Settings onClose={handleCloseComponent} />}
      </main>
    </div>
  );
}