import React from "react";
import "../styles/Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-text">A+</span>
        <span className="logo-subtext">ACHIEVE+</span>
      </div>

      <nav className="nav-menu">
        <ul>
          <li className="nav-item active">
            <i className="nav-icon">🏠</i>
            <span className="nav-text">Home</span>
          </li>
          <li className="nav-item">
            <i className="nav-icon">📋</i>
            <span className="nav-text">Tasks</span>
          </li>
          <li className="nav-item">
            <i className="nav-icon">📊</i>
            <span className="nav-text">Statistics</span>
          </li>
          <li className="nav-item">
            <i className="nav-icon">🏆</i>
            <span className="nav-text">Achievements</span>
          </li>
          <li className="nav-item">
            <i className="nav-icon">👥</i>
            <span className="nav-text">Teams</span>
          </li>
          <li className="nav-item">
            <i className="nav-icon">⚙️</i>
            <span className="nav-text">Settings</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
