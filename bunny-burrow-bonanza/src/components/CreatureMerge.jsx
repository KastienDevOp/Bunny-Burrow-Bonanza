import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { MERGE_COMBINATIONS, CREATURE_EMOJIS } from './constants';

const CreatureMerge = ({ purchasedCreatures, purchasedEpicSkins, onMerge, onClose }) => {
  const [selectedCreatures, setSelectedCreatures] = useState({});
  const [mergeableCreatures, setMergeableCreatures] = useState({});
  
  useEffect(() => {
    const mergeable = {...purchasedCreatures, ...purchasedEpicSkins};
    const mergeableCounts = Object.entries(mergeable).reduce((acc, [name, count]) => {
      if (count >= 3 && MERGE_COMBINATIONS[name]) {
        acc[name] = count;
      }
      return acc;
    }, {});
    setMergeableCreatures(mergeableCounts);
  }, [purchasedCreatures, purchasedEpicSkins]);

  const handleCreatureSelect = (creatureName) => {
    setSelectedCreatures(prev => {
      const currentCount = prev[creatureName] || 0;
      const availableCount = mergeableCreatures[creatureName] || 0;
      if (currentCount < 3 && currentCount < availableCount) {
        return { ...prev, [creatureName]: currentCount + 1 };
      } else if (currentCount > 0) {
        return { ...prev, [creatureName]: currentCount - 1 };
      }
      return prev;
    });
  };

  const handleMerge = () => {
    const [creatureName, count] = Object.entries(selectedCreatures)[0] || [];
    if (creatureName && count === 3) {
      const mergedResult = MERGE_COMBINATIONS[creatureName];
      onMerge(creatureName, mergedResult);
      setSelectedCreatures({});
      
      // Update mergeable creatures after merge
      setMergeableCreatures(prev => {
        const updated = { ...prev };
        updated[creatureName] -= 3;
        if (updated[creatureName] < 3) {
          delete updated[creatureName];
        }
        return updated;
      });
    } else {
      alert("Please select 3 of the same creature to merge.");
    }
  };

  const totalSelected = Object.values(selectedCreatures).reduce((sum, count) => sum + count, 0);

  const getCreatureEmoji = (creatureName) => {
    if (MERGE_COMBINATIONS[creatureName]) {
      return MERGE_COMBINATIONS[creatureName].emoji;
    }
    return CREATURE_EMOJIS[creatureName] || '🐾';
  };

  const getMergeResult = (creatureName) => {
    if (MERGE_COMBINATIONS[creatureName]) {
      return MERGE_COMBINATIONS[creatureName].name;
    }
    return 'Unknown';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#FFF8DC] p-6 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto fuzzy-border">
        <h2 className="text-3xl font-bold mb-4 text-[#8B4513] text-center">🧬 Creature Merge Lab</h2>
        
        <p className="mb-4 text-[#A0522D] text-center">Select 3 identical creatures to merge and unlock more powerful forms!</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {Object.entries(mergeableCreatures).map(([creatureName, count]) => (
            <motion.div
              key={creatureName}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg cursor-pointer ${
                (selectedCreatures[creatureName] || 0) > 0 ? 'bg-[#DEB887]' : 'bg-[#FFE4B5]'
              }`}
              onClick={() => handleCreatureSelect(creatureName)}
            >
              <p className="text-2xl mb-2">{getCreatureEmoji(creatureName)}</p>
              <p className="font-semibold text-[#8B4513]">{creatureName}</p>
              <p className="text-sm text-[#A0522D]">Available: {count}</p>
              <p className="text-sm font-bold text-[#8B4513]">Selected: {selectedCreatures[creatureName] || 0}</p>
              <p className="text-xs text-[#CD853F] mt-1">
                Merges into: {getMergeResult(creatureName)} {getCreatureEmoji(getMergeResult(creatureName))}
              </p>
            </motion.div>
          ))}
        </div>

        {Object.keys(selectedCreatures).length > 0 && (
          <div className="bg-[#FFEFD5] p-4 rounded-lg mb-4">
            <h3 className="font-bold text-[#8B4513] mb-2">Selected for Merge:</h3>
            {Object.entries(selectedCreatures).map(([creatureName, count]) => (
              <p key={creatureName} className="text-[#A0522D]">
                {getCreatureEmoji(creatureName)} {creatureName}: {count}
              </p>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <p className="text-[#8B4513]">Total Selected: {totalSelected}/3</p>
          <Button
            onClick={handleMerge}
            disabled={totalSelected !== 3}
            className="bg-[#FF6347] text-white hover:bg-[#FF4500] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Merge Creatures
          </Button>
        </div>

        <Button className="w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" onClick={onClose}>
          Close Merge Lab
        </Button>
      </div>
    </div>
  );
};

export default CreatureMerge;