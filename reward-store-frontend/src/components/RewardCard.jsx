import React from "react";

const RewardCard = ({ reward, userPoints, onClaimReward }) => {
  const canClaim = userPoints >= reward.pointsCost;

  return (
    <div className="reward-card">
      <img src={reward.imageUrl} alt={reward.name} className="reward-image" />
      <div className="reward-name">{reward.name}</div>
      <div className="reward-points">{reward.pointsCost} Points</div>
      <button
        className="claim-button"
        onClick={() => onClaimReward(reward.id)}
        disabled={!canClaim}
      >
        Claim
      </button>
    </div>
  );
};

export default RewardCard;
