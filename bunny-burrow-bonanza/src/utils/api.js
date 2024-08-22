// api.js
import { openDB } from 'idb';

const DB_NAME = 'BunnyBurrowBonanza';
const USER_STORE = 'users';
const GAME_STATE_STORE = 'gameStates';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(USER_STORE, { keyPath: 'username' });
    db.createObjectStore(GAME_STATE_STORE, { keyPath: 'username' });
  },
});

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const initializeGameState = (username) => ({
  username,
  resources: {
    carrots: 100,
    nuts: 0,
    berries: 0,
    // ... add other initial resources
  },
  purchasedCreatures: {},
  purchasedHabitats: {},
  shopItems: {},
  habitatOrder: [],
  settings: {},
  lastSaved: new Date().toISOString()
});

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
      ...gameState,
      lastSaved: new Date().toISOString()
    };
    await db.put(GAME_STATE_STORE, fullGameState);
  },

  loadGameState: async (username) => {
    const db = await dbPromise;
    let gameState = await db.get(GAME_STATE_STORE, username);
    if (!gameState) {
      gameState = initializeGameState(username);
      await db.put(GAME_STATE_STORE, gameState);
    }
    return gameState;
  },

  exportData: async (username) => {
    const db = await dbPromise;
    let gameState = await db.get(GAME_STATE_STORE, username);
    
    if (!gameState) {
      gameState = initializeGameState(username);
      await db.put(GAME_STATE_STORE, gameState);
    }
    
    const blob = new Blob([JSON.stringify(gameState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `bunny_burrow_bonanza_${username}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
  },

  importData: async (username, jsonData) => {
    const db = await dbPromise;
    const gameState = JSON.parse(jsonData);
    
    if (gameState.username !== username) {
      throw new Error('This save file belongs to a different user');
    }
    
    await db.put(GAME_STATE_STORE, gameState);
  },

  devAddResource: async (username, resourceType, amount) => {
    const db = await dbPromise;
    const tx = db.transaction(GAME_STATE_STORE, 'readwrite');
    const store = tx.objectStore(GAME_STATE_STORE);
    let gameState = await store.get(username);
    
    if (!gameState) {
      gameState = initializeGameState(username);
    }

    gameState.resources[resourceType] = (gameState.resources[resourceType] || 0) + amount;
    await store.put(gameState);
    await tx.done;

    return gameState;
  },

  devRemoveResource: async (username, resourceType, amount) => {
    const db = await dbPromise;
    const tx = db.transaction(GAME_STATE_STORE, 'readwrite');
    const store = tx.objectStore(GAME_STATE_STORE);
    let gameState = await store.get(username);
    
    if (!gameState) {
      gameState = initializeGameState(username);
    }

    gameState.resources[resourceType] = Math.max(0, (gameState.resources[resourceType] || 0) - amount);
    await store.put(gameState);
    await tx.done;

    return gameState;
  },

  devAddCreature: async (username, creatureType, amount) => {
    const db = await dbPromise;
    const tx = db.transaction(GAME_STATE_STORE, 'readwrite');
    const store = tx.objectStore(GAME_STATE_STORE);
    let gameState = await store.get(username);
    
    if (!gameState) {
      gameState = initializeGameState(username);
    }

    gameState.purchasedCreatures[creatureType] = (gameState.purchasedCreatures[creatureType] || 0) + amount;
    await store.put(gameState);
    await tx.done;

    return gameState;
  },

  devRemoveCreature: async (username, creatureType, amount) => {
    const db = await dbPromise;
    const tx = db.transaction(GAME_STATE_STORE, 'readwrite');
    const store = tx.objectStore(GAME_STATE_STORE);
    let gameState = await store.get(username);
    
    if (!gameState) {
      gameState = initializeGameState(username);
    }

    gameState.purchasedCreatures[creatureType] = Math.max(0, (gameState.purchasedCreatures[creatureType] || 0) - amount);
    await store.put(gameState);
    await tx.done;

    return gameState;
  },

  devPurgeAllData: async () => {
    const db = await dbPromise;
    const tx = db.transaction([USER_STORE, GAME_STATE_STORE], 'readwrite');
    await tx.objectStore(USER_STORE).clear();
    await tx.objectStore(GAME_STATE_STORE).clear();
    await tx.done;
  },
};

export default api;