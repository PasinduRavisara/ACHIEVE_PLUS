import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">A+</div>
      <div className="nav-item active">
        <i className="fas fa-home">🏠</i>
      </div>
      <div className="nav-item">
        <i className="fas fa-list">📋</i>
      </div>
      <div className="nav-item">
        <i className="fas fa-chart-bar">📊</i>
      </div>
      <div className="nav-item">
        <i className="fas fa-trophy">🏆</i>
      </div>
      <div className="nav-item">
        <i className="fas fa-users">👥</i>
      </div>
      <div className="nav-item">
        <i className="fas fa-cog">⚙️</i>
      </div>
    </div>
  );
};

export default Sidebar;