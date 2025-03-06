import React from "react";
import {
  House,
  List,
  BarChart,
  GeoAlt,
  Shop,
  Camera,
} from "react-bootstrap-icons";

const Sidebar = () => {
  const iconSize = 24;
  const menuItems = [
    { icon: <House size={iconSize} />, text: "Home" },
    { icon: <List size={iconSize} />, text: "List" },
    { icon: <BarChart size={iconSize} />, text: "Charts" },
    { icon: <GeoAlt size={iconSize} />, text: "Location" },
    { icon: <Shop size={iconSize} />, text: "Store" },
    { icon: <Camera size={iconSize} />, text: "Media" },
  ];

  return (
    <div
      className="d-flex flex-column bg-primary text-white"
      style={{
        width: "80px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="text-center py-3 sidebar-item"
          style={{
            cursor: "pointer",
            opacity: item.text === "Store" ? 1 : 0.5,
          }}
        >
          {item.icon}
          <div className="small">{item.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
