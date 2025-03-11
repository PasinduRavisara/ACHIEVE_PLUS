import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Sidebar from './components/Sidebar';
import RewardsAchievements from './components/RewardsAchievements';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <div className="top-bar">
          <div className="top-actions">
            <div className="notification-icon">
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </div>
            <div className="user-icon">
              <i className="bi bi-person-circle"></i>
            </div>
          </div>
        </div>
        <RewardsAchievements />
      </div>
    </div>
  );
}

export default App;