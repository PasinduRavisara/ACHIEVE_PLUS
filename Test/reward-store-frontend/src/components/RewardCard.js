import React from "react";

const RewardCard = ({ reward, onClaim, userPoints }) => {
  const handleClaim = () => {
    if (userPoints >= reward.pointsCost) {
      onClaim(reward.id);
    } else {
      alert("Not enough points to claim this reward");
    }
  };

  return (
    <div className="reward-card">
      <img
        src={reward.imageUrl || `/images/${reward.id}.jpg`}
        alt={reward.name}
        className="reward-image"
      />
      <div className="reward-details">
        <div className="reward-name">{reward.name}</div>
        <div className="reward-points">
          {reward.pointsCost.toLocaleString()} Points
        </div>
        <button
          className="claim-button"
          onClick={handleClaim}
          disabled={userPoints < reward.pointsCost}
        >
          Claim
        </button>
      </div>
    </div>
  );
};

export default RewardCard;
