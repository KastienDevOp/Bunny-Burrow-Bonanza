import { openDB } from 'idb';

const DB_NAME = 'BunnyBurrowBonanza';
const USER_STORE = 'users';
const GAME_STATE_STORE = 'gameStates';

// Initialize the database
const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(USER_STORE, { keyPath: 'username' });
    db.createObjectStore(GAME_STATE_STORE, { keyPath: 'username' });
  },
});

// Helper function to hash passwords
const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export const api = {
  login: async (username, password) => {
    const db = await dbPromise;
    const user = await db.get(USER_STORE, username);
    
    if (user) {
      const hashedPassword = await hashPassword(password);
      if (user.password === hashedPassword) {
        return { username };
      }
    }
    
    throw new Error('Invalid credentials');
  },

  register: async (username, password) => {
    const db = await dbPromise;
    const existingUser = await db.get(USER_STORE, username);
    
    if (existingUser) {
      throw new Error('Username already exists');
    }
    
    const hashedPassword = await hashPassword(password);
    await db.put(USER_STORE, { username, password: hashedPassword });
    return { username };
  },

  saveGameState: async (username, gameState) => {
    const db = await dbPromise;
    const fullGameState = {
      username,
      resources: gameState.resources,
      productionRates: gameState.productionRates,
      shopItems: gameState.shopItems,
      purchasedHabitats: gameState.purchasedHabitats,
      purchasedCreatures: gameState.purchasedCreatures,
      habitatOrder: gameState.habitatOrder,
      settings: gameState.settings,
      lastSaved: new Date().toISOString()
    };
    await db.put(GAME_STATE_STORE, fullGameState);
  },

  loadGameState: async (username) => {
    const db = await dbPromise;
    const gameState = await db.get(GAME_STATE_STORE, username);
    if (gameState) {
      return {
        resources: gameState.resources,
        productionRates: gameState.productionRates,
        shopItems: gameState.shopItems,
        purchasedHabitats: gameState.purchasedHabitats,
        purchasedCreatures: gameState.purchasedCreatures,
        habitatOrder: gameState.habitatOrder,
        settings: gameState.settings,
        lastSaved: gameState.lastSaved
      };
    }
    return null;
  },

  exportData: async () => {
    const db = await dbPromise;
    const users = await db.getAll(USER_STORE);
    const gameStates = await db.getAll(GAME_STATE_STORE);
    
    const data = {
      users: users.map(({ username, password }) => ({ username, password })),
      gameStates,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bunny_burrow_bonanza_data.json';
    a.click();
    
    URL.revokeObjectURL(url);
  },

  importData: async (jsonData) => {
    const db = await dbPromise;
    const data = JSON.parse(jsonData);
    
    const tx = db.transaction([USER_STORE, GAME_STATE_STORE], 'readwrite');
    const userStore = tx.objectStore(USER_STORE);
    const gameStateStore = tx.objectStore(GAME_STATE_STORE);
    
    for (const user of data.users) {
      await userStore.put(user);
    }
    
    for (const gameState of data.gameStates) {
      await gameStateStore.put(gameState);
    }
    
    await tx.done;
  },
};

export default api;