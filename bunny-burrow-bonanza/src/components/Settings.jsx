import React from 'react';
import { Button } from './ui/button';

const Settings = ({ onClose }) => {
  const settings = [
    { name: 'Music', type: 'toggle', value: true },
    { name: 'Sound Effects', type: 'toggle', value: true },
    { name: 'Notifications', type: 'toggle', value: true },
    { name: 'Language', type: 'select', value: 'English', options: ['English', 'Spanish', 'French', 'German'] },
    { name: 'Theme', type: 'select', value: 'Light', options: ['Light', 'Dark', 'Auto'] },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="space-y-4">
          {settings.map((setting, index) => (
            <div key={index} className="flex justify-between items-center">
              <span>{setting.name}</span>
              {setting.type === 'toggle' ? (
                <input
                  type="checkbox"
                  checked={setting.value}
                  onChange={() => console.log(`Toggled ${setting.name}`)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              ) : (
                <select
                  value={setting.value}
                  onChange={(e) => console.log(`Changed ${setting.name} to ${e.target.value}`)}
                  className="form-select mt-1 block w-full"
                >
                  {setting.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
        <Button className="mt-6 w-full" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default Settings;