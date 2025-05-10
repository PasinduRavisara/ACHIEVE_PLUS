import React from "react";
import RewardCard from "./RewardCard";

const RewardList = ({ rewards, onClaimReward, userPoints }) => {
  return (
    <div className="rewards-container">
      {rewards.map((reward) => (
        <RewardCard
          key={reward.id}
          reward={reward}
          onClaim={onClaimReward}
          userPoints={userPoints}
        />
      ))}
    </div>
  );
};

export default RewardList;
