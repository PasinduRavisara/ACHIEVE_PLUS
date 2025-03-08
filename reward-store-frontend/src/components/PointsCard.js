import React from "react";

const PointsCard = ({ points }) => {
  return (
    <div className="points-card">
      <div className="points-label">Points Earned</div>
      <div className="points-value">{points.toLocaleString()} points</div>
    </div>
  );
};

export default PointsCard;
