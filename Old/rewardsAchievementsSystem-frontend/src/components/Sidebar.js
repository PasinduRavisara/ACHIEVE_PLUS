import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">
          A<sup>+</sup>
        </div>
        <span className="logo-text">ACHIEVE+</span>
      </div>
      <div className="nav-links">
        <div className="nav-item active">
          <i className="bi bi-house-door-fill"></i>
        </div>
        <div className="nav-item">
          <i className="bi bi-list-check"></i>
        </div>
        <div className="nav-item">
          <i className="bi bi-bar-chart-fill"></i>
        </div>
        <div className="nav-item">
          <i className="bi bi-lightbulb"></i>
        </div>
        <div className="nav-item">
          <i className="bi bi-people-fill"></i>
        </div>
        <div className="nav-item">
          <i className="bi bi-grid-1x2-fill"></i>
        </div>
        <div className="nav-item">
          <i className="bi bi-gear-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
