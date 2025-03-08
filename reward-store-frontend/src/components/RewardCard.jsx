import React from "react";

const RewardCard = ({ reward, onClaim, userPoints }) => {
  const canClaim = userPoints >= reward.pointsCost;

  const handleClaim = () => {
    if (canClaim) {
      onClaim(reward.id);
    }
  };

  return (
    <div className="reward-card">
      <div className="reward-image">
        <img
          src={reward.imageUrl}
          alt={reward.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/placeholder.jpg";
          }}
        />
      </div>
      <div className="reward-info">
        <h3 className="reward-name">{reward.name}</h3>
        <p className="reward-points">
          {reward.pointsCost.toLocaleString()} Points
        </p>
        <button
          className="claim-button"
          onClick={handleClaim}
          disabled={!canClaim}
        >
          Claim
        </button>
      </div>
    </div>
  );
};

export default RewardCard;
