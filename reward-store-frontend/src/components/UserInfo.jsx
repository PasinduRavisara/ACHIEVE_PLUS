import React from "react";
import "../styles/UserInfo.css";

const UserInfo = ({ points }) => {
  return (
    <div className="user-info">
      <h2>Points Earned</h2>
      <div className="points-display">
        <span className="points-value">{points.toLocaleString()} points</span>
      </div>
    </div>
  );
};

export default UserInfo;
