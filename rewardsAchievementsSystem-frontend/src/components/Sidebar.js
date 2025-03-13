import React from "react";
import "./Sidebar.css";
import { Tooltip } from "react-tooltip";

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
        <div className="nav-item active" data-tooltip-id="home-tooltip">
          <i className="bi bi-house-door-fill"></i>
        </div>
        <Tooltip id="home-tooltip" place="right" content="Home" />

        <div className="nav-item" data-tooltip-id="tasks-tooltip">
          <i className="bi bi-list-check"></i>
        </div>
        <Tooltip id="tasks-tooltip" place="right" content="Tasks" />

        <div className="nav-item" data-tooltip-id="analytics-tooltip">
          <i className="bi bi-bar-chart-fill"></i>
        </div>
        <Tooltip id="analytics-tooltip" place="right" content="Analytics" />

        <div className="nav-item" data-tooltip-id="ideas-tooltip">
          <i className="bi bi-lightbulb"></i>
        </div>
        <Tooltip id="ideas-tooltip" place="right" content="Ideas" />

        <div className="nav-item" data-tooltip-id="users-tooltip">
          <i className="bi bi-people-fill"></i>
        </div>
        <Tooltip id="users-tooltip" place="right" content="Users" />

        <div className="nav-item" data-tooltip-id="dashboard-tooltip">
          <i className="bi bi-grid-1x2-fill"></i>
        </div>
        <Tooltip id="dashboard-tooltip" place="right" content="Dashboard" />

        <div className="nav-item" data-tooltip-id="settings-tooltip">
          <i className="bi bi-gear-fill"></i>
        </div>
        <Tooltip id="settings-tooltip" place="right" content="Settings" />
      </div>
    </div>
  );
};

export default Sidebar;
