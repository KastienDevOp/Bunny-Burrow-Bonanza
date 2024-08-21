import React from 'react';
import { Button } from './ui/button';

const Settings = ({ onClose }) => {
  const settings = [
    { name: 'Music', type: 'toggle', value: true, emoji: '🎵' },
    { name: 'Sound Effects', type: 'toggle', value: true, emoji: '🔊' },
    { name: 'Notifications', type: 'toggle', value: true, emoji: '🔔' },
    { name: 'Language', type: 'select', value: 'English', options: ['English', 'Spanish', 'French', 'German'], emoji: '🌐' },
    { name: 'Theme', type: 'select', value: 'Light', options: ['Light', 'Dark', 'Auto'], emoji: '🎨' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#FFF8DC] p-6 rounded-xl max-w-md w-full fuzzy-border">
        <h2 className="text-3xl font-bold mb-4 text-[#8B4513] text-center">⚙️ Cozy Settings</h2>
        <div className="space-y-4">
          {settings.map((setting, index) => (
            <div key={index} className="flex justify-between items-center bg-[#FFF5E6] p-3 rounded-lg shadow-sm">
              <span className="font-semibold text-[#8B4513] flex items-center">
                {setting.emoji} {setting.name}
              </span>
              {setting.type === 'toggle' ? (
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name={setting.name}
                    id={setting.name}
                    checked={setting.value}
                    onChange={() => console.log(`Toggled ${setting.name}`)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor={setting.name}
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              ) : (
                <select
                  value={setting.value}
                  onChange={(e) => console.log(`Changed ${setting.name} to ${e.target.value}`)}
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
        <Button className="mt-6 w-full bg-[#DEB887] text-white hover:bg-[#D2691E]" onClick={onClose}>Save Settings</Button>
      </div>
    </div>
  );
};

export default Settings;