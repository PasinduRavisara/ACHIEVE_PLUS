import React from "react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="triangle">▲</span>
        <span className="plus">+</span>
        <div className="logo-text">ACHIEVE+</div>
      </div>

      <div className="menu-items">
        <div className="menu-item active">
          <i className="icon home-icon">⌂</i>
        </div>
        <div className="menu-item">
          <i className="icon list-icon">≡</i>
        </div>
        <div className="menu-item">
          <i className="icon chart-icon">📊</i>
        </div>
        <div className="menu-item">
          <i className="icon award-icon">🏆</i>
        </div>
        <div className="menu-item">
          <i className="icon group-icon">👥</i>
        </div>
        <div className="menu-item">
          <i className="icon settings-icon">⚙</i>
        </div>
        <div className="menu-item">
          <i className="icon profile-icon">👤</i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
