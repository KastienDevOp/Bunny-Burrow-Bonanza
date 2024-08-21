// This is a mock API service that simulates backend functionality
// In a real application, these functions would make HTTP requests to a server

const STORAGE_KEY = 'bunnyBurrowBonanza_';

export const api = {
  login: async (username, password) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem(`${STORAGE_KEY}users`) || '{}');
    if (users[username] && users[username].password === password) {
      return { username };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  register: async (username, password) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem(`${STORAGE_KEY}users`) || '{}');
    if (users[username]) {
      throw new Error('Username already exists');
    } else {
      users[username] = { password };
      localStorage.setItem(`${STORAGE_KEY}users`, JSON.stringify(users));
      return { username };
    }
  },

  saveGameState: async (username, gameState) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));

    localStorage.setItem(`${STORAGE_KEY}gameState_${username}`, JSON.stringify(gameState));
  },

  loadGameState: async (username) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));

    const gameState = localStorage.getItem(`${STORAGE_KEY}gameState_${username}`);
    return gameState ? JSON.parse(gameState) : null;
  },
};

export default api;