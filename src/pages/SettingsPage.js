import React from 'react';
import SearchBar from './SearchBar';
import './SettingsPage.css';

function SettingsPage() {
  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <div className="search-bar">
        <SearchBar />
      </div>
      <p>This is the settings page content.</p>
    </div>
  );
}

export default SettingsPage;
