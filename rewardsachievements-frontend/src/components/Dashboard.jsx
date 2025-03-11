import React from 'react';
import Sidebar from './Sidebar';
import RewardsSection from './RewardsSection';
import AchievementSection from './AchievementSection';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="main-content">
        <div className="header">
          <h2>REWARDS & ACHIEVEMENTS</h2>
          <div className="header-actions">
            <div className="theme-toggle">
              {/* Theme toggle icons */}
              <span className="dark-mode-icon">🌙</span>
              <span className="light-mode-icon">☀️</span>
            </div>
            <div className="profile-icon">
              {/* Profile icon/avatar */}
              👤
            </div>
          </div>
        </div>
        
        <div className="dashboard-sections">
          <RewardsSection />
          <AchievementSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;