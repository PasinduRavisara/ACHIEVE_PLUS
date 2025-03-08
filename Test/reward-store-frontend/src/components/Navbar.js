import React from "react";

const Navbar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-icon active">
        <i className="fas fa-home"></i>
      </div>
      <div className="sidebar-icon">
        <i className="fas fa-list"></i>
      </div>
      <div className="sidebar-icon">
        <i className="fas fa-chart-bar"></i>
      </div>
      <div className="sidebar-icon">
        <i className="fas fa-award"></i>
      </div>
      <div className="sidebar-icon">
        <i className="fas fa-users"></i>
      </div>
      <div className="sidebar-icon">
        <i className="fas fa-building"></i>
      </div>
      <div className="sidebar-icon">
        <i className="fas fa-cog"></i>
      </div>
    </div>
  );
};

export default Navbar;
