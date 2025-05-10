import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <span>ACHIEVE+</span>
      </div>
      <div className="user-profile">
        <div className="user-avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
