import React, { useState } from 'react';
import { Button } from './ui/button';
import useAuth from '../hooks/useAuth';

const SETTINGS = {
  Audio: [
    { name: 'Music', type: 'toggle', defaultValue: true, emoji: '🎵' },
    { name: 'Sound Effects', type: 'toggle', defaultValue: true, emoji: '🔊' },
  ],
  Gameplay: [
    { name: 'Notifications', type: 'toggle', defaultValue: true, emoji: '🔔' },
    { name: 'Auto-save', type: 'toggle', defaultValue: true, emoji: '💾' },
    { name: 'Difficulty', type: 'select', defaultValue: 'Normal', options: ['Easy', 'Normal', 'Hard'], emoji: '🎚️' },
  ],
  Display: [
    { name: 'Language', type: 'select', defaultValue: 'English', options: ['English', 'Spanish', 'French', 'German'], emoji: '🌐' },
    { name: 'Theme', type: 'select', defaultValue: 'Light', options: ['Light', 'Dark', 'Auto'], emoji: '🎨' },
    { name: 'Font Size', type: 'select', defaultValue: 'Medium', options: ['Small', 'Medium', 'Large'], emoji: '🔤' },
  ],
};

const Settings = ({ onClose, onSaveSettings }) => {
  const [activeCategory, setActiveCategory] = useState('Audio');
  const [settingsState, setSettingsState] = useState(() => {
    const initialState = {};
    Object.values(SETTINGS).flat().forEach(setting => {
      initialState[setting.name] = setting.defaultValue;
    });
    return initialState;
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login, logout, register } = useAuth();

  const handleSettingChange = (settingName, value) => {
    setSettingsState(prevState => ({
      ...prevState,
      [settingName]: value
    }));
  };

  const handleSaveSettings = () => {
    onSaveSettings(settingsState);
    onClose();
  };

  const handleLogin = async () => {
    try {
      await login(username, password);
      setUsername('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register(username, password);
      setUsername('');
      setPassword('');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#FFF8DC] p-6 rounded-xl max-w-2xl w-full fuzzy-border">
        <h2 className="text-3xl font-bold mb-4 text-[#8B4513] text-center">⚙️ Cozy Settings</h2>
        
        {/* User Authentication Section */}
        <div className="mb-6 p-4 bg-[#FFF5E6] rounded-lg">
          {user ? (
            <div>
              <p className="mb-2 text-[#8B4513]">Logged in as: {user.username}</p>
              <Button onClick={handleLogout} className="w-full bg-[#DEB887] text-white hover:bg-[#D2691E]">
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-2 rounded-md border border-[#DEB887] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-2 rounded-md border border-[#DEB887] focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
              />
              <div className="flex justify-between">
                <Button onClick={handleLogin} className="bg-[#DEB887] text-white hover:bg-[#D2691E]">
                  Login
                </Button>
                <Button onClick={handleRegister} className="bg-[#DEB887] text-white hover:bg-[#D2691E]">
                  Register
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Existing Settings */}
        <div className="mb-4">
          {Object.keys(SETTINGS).map(category => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`mr-2 ${activeCategory === category ? 'bg-[#DEB887] text-white' : 'bg-[#FFE4B5] text-[#8B4513]'} hover:bg-[#FFDAB9]`}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {SETTINGS[activeCategory] && SETTINGS[activeCategory].map((setting) => (
            <div key={setting.name} className="flex justify-between items-center bg-[#FFF5E6] p-3 rounded-lg shadow-sm">
              <span className="font-semibold text-[#8B4513] flex items-center">
                {setting.emoji} {setting.name}
              </span>
              {setting.type === 'toggle' ? (
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name={setting.name}
                    id={setting.name}
                    checked={settingsState[setting.name]}
                    onChange={(e) => handleSettingChange(setting.name, e.target.checked)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor={setting.name}
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              ) : (
                <select
                  value={settingsState[setting.name]}
                  onChange={(e) => handleSettingChange(setting.name, e.target.value)}
                  className="form-select mt-1 block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {setting.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
          </div>
        <Button className="mt-6 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default Settings;