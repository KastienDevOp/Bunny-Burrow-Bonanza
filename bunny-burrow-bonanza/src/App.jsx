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
  specialResources: 0,
  rareResources: 0,
};

const INITIAL_PRODUCTION_RATES = {
  carrots: 1,
  nuts: 0.5,
  berries: 0.3,
  specialResources: 0.1,
  rareResources: 0.01,
};

const INITIAL_SHOP_ITEMS = {
  'Carrot Seeds': { count: 0, baseCost: 10, costMultiplier: 1.1, productionIncrease: { resource: 'carrots', amount: 0.5 } },
  'Nut Tree': { count: 0, baseCost: 50, costMultiplier: 1.15, productionIncrease: { resource: 'nuts', amount: 0.3 } },
  'Berry Bush': { count: 0, baseCost: 30, costMultiplier: 1.12, productionIncrease: { resource: 'berries', amount: 0.2 } },
  'Magic Fertilizer': { count: 0, baseCost: 100, costMultiplier: 1.2, productionIncrease: { resource: 'specialResources', amount: 0.1 } },
  'Golden Carrot': { count: 0, baseCost: 500, costMultiplier: 1.25, productionIncrease: { resource: 'rareResources', amount: 0.05 } },
  'Carrot Harvester': { count: 0, baseCost: 200, costMultiplier: 1.18, productionIncrease: { resource: 'carrots', amount: 1 } },
  'Nut Cracker': { count: 0, baseCost: 150, costMultiplier: 1.16, productionIncrease: { resource: 'nuts', amount: 0.6 } },
  'Berry Picker': { count: 0, baseCost: 180, costMultiplier: 1.17, productionIncrease: { resource: 'berries', amount: 0.5 } },
  'Resource Multiplier': { count: 0, baseCost: 1000, costMultiplier: 1.3, productionIncrease: { resource: 'all', amount: 0.1 } },
};

const INITIAL_HABITATS = {
  'Cozy Burrow': 0,
  'Carrot Patch': 0,
  'Nut Grove': 0,
  'Berry Field': 0,
  'Luxury Warren': 0,
};

const INITIAL_CREATURES = {
  'Common Bunny': 0,
  'Nutty Squirrel': 0,
  'Berry Fox': 0,
  'Magic Hare': 0,
  'Golden Rabbit': 0,
  'Resource Raccoon': 0,
};

const HABITAT_TYPES = {
  'Cozy Burrow': { baseCost: 100, costMultiplier: 1.1, capacity: 2, resourceBonus: { type: 'carrots', amount: 0.2 } },
  'Carrot Patch': { baseCost: 200, costMultiplier: 1.15, capacity: 4, resourceBonus: { type: 'carrots', amount: 0.5 } },
  'Nut Grove': { baseCost: 300, costMultiplier: 1.2, capacity: 6, resourceBonus: { type: 'nuts', amount: 0.3 } },
  'Berry Field': { baseCost: 400, costMultiplier: 1.25, capacity: 8, resourceBonus: { type: 'berries', amount: 0.4 } },
  'Luxury Warren': { baseCost: 1000, costMultiplier: 1.3, capacity: 12, resourceBonus: { type: 'all', amount: 0.1 } },
};

const CREATURE_TYPES = {
  'Common Bunny': { baseCost: 50, costMultiplier: 1.1, resourceBonus: { type: 'carrots', amount: 0.2 } },
  'Nutty Squirrel': { baseCost: 100, costMultiplier: 1.15, resourceBonus: { type: 'nuts', amount: 0.3 } },
  'Berry Fox': { baseCost: 150, costMultiplier: 1.2, resourceBonus: { type: 'berries', amount: 0.4 } },
  'Magic Hare': { baseCost: 500, costMultiplier: 1.25, resourceBonus: { type: 'specialResources', amount: 0.1 } },
  'Golden Rabbit': { baseCost: 1000, costMultiplier: 1.3, resourceBonus: { type: 'rareResources', amount: 0.05 } },
  'Resource Raccoon': { baseCost: 2000, costMultiplier: 1.35, resourceBonus: { type: 'all', amount: 0.05 } },
};

export default function App() {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [productionRates, setProductionRates] = useState(INITIAL_PRODUCTION_RATES);
  const [showAlert, setShowAlert] = useState(true);
  const [activeComponent, setActiveComponent] = useState(null);
  const [shopItems, setShopItems] = useState(INITIAL_SHOP_ITEMS);
  const [purchasedHabitats, setPurchasedHabitats] = useState(INITIAL_HABITATS);
  const [purchasedCreatures, setPurchasedCreatures] = useState(INITIAL_CREATURES);

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
  }, [purchasedHabitats, purchasedCreatures, shopItems]);

  const updateProductionRates = () => {
    setProductionRates(prevRates => {
      const newRates = { ...INITIAL_PRODUCTION_RATES };
      
      // Apply shop item bonuses
      Object.entries(shopItems).forEach(([itemName, item]) => {
        if (item.productionIncrease.resource === 'all') {
          Object.keys(newRates).forEach(resource => {
            newRates[resource] *= Math.pow(1 + item.productionIncrease.amount, item.count);
          });
        } else {
          newRates[item.productionIncrease.resource] += item.productionIncrease.amount * item.count;
        }
      });

      // Apply habitat bonuses
      Object.entries(purchasedHabitats).forEach(([habitatName, count]) => {
        const habitat = HABITAT_TYPES[habitatName];
        if (habitat.resourceBonus.type === 'all') {
          Object.keys(newRates).forEach(resource => {
            newRates[resource] *= Math.pow(1 + habitat.resourceBonus.amount, count);
          });
        } else {
          newRates[habitat.resourceBonus.type] += habitat.resourceBonus.amount * count;
        }
      });

      // Apply creature bonuses
      Object.entries(purchasedCreatures).forEach(([creatureName, count]) => {
        const creature = CREATURE_TYPES[creatureName];
        if (creature.resourceBonus.type === 'all') {
          Object.keys(newRates).forEach(resource => {
            newRates[resource] *= Math.pow(1 + creature.resourceBonus.amount, count);
          });
        } else {
          newRates[creature.resourceBonus.type] += creature.resourceBonus.amount * count;
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

  const handlePurchase = (itemName, cost) => {
    if (resources.carrots >= cost) {
      setResources(prevResources => ({
        ...prevResources,
        carrots: prevResources.carrots - cost
      }));

      setShopItems(prevItems => {
        const updatedItems = { ...prevItems };
        const item = updatedItems[itemName];
        item.count += 1;
        return updatedItems;
      });
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

      setPurchasedHabitats(prevHabitats => ({
        ...prevHabitats,
        [habitat.name]: (prevHabitats[habitat.name] || 0) + 1
      }));
    } else {
      alert("Not enough carrots!");
    }
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
    <div className="h-screen bg-gradient-to-b from-green-200 to-green-400 p-4">
      <h1 className="text-4xl font-bold text-center mb-4">Bunny Burrow Bonanza</h1>
      
      {showAlert && (
        <Alert variant="info" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Welcome to Bunny Burrow Bonanza!</AlertTitle>
          <AlertDescription>
            Start building your adorable rodent community. Collect resources, build habitats, and watch your creatures thrive!
          </AlertDescription>
          <Button variant="outline" onClick={() => setShowAlert(false)} className="mt-2">
            Got it!
          </Button>
        </Alert>
      )}

      <ResourceBar resources={resources} onResourceClick={handleResourceClick} />
      <MainScreen purchasedHabitats={purchasedHabitats} purchasedCreatures={purchasedCreatures} />
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
    </div>
  );
}