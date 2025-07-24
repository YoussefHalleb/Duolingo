import React, { useState } from 'react';
import Layout from '../shared/layout';
import Button from '../shared/Button';
import './Settings.css';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDark = () => setDarkMode((prev) => !prev);

  return (
    <Layout>
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <div className="settings-section">
          <label className="settings-label">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleToggleDark}
            />
            Enable Dark Mode
          </label>
        </div>
        <Button onClick={() => alert('Settings saved!')}>Save Settings</Button>
      </div>
    </Layout>
  );
};

export default Settings;