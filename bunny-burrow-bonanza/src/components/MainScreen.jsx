import React from 'react';

const MainScreen = ({ purchasedHabitats }) => {
  return (
    <div className="bg-green-100 rounded-lg p-4 mb-4 h-96">
      <h2 className="text-2xl font-bold mb-2">Your Burrow</h2>
      <div className="h-80 overflow-y-auto pr-2">
        {Object.entries(purchasedHabitats).length === 0 ? (
          <div className="bg-yellow-200 h-full rounded-lg flex items-center justify-center">
            <p className="text-gray-600">No habitats purchased yet. Visit the Habitats menu to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(purchasedHabitats).map(([habitatName, count]) => (
              count > 0 && (
                <div key={habitatName} className="bg-yellow-200 p-4 rounded-lg">
                  <h3 className="font-bold">{habitatName}</h3>
                  <p>Count: {count}</p>
                  {/* You can add more details or functionality here */}
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainScreen;