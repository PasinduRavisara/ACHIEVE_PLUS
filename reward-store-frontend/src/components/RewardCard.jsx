import React, { useState } from "react";
import "../styles/RewardCard.css";
import { claimReward } from "../services/rewardService";

const RewardCard = ({ reward, userId, onRewardClaimed }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClaim = async () => {
    if (!userId) {
      alert("User information not available. Please refresh the page.");
      return;
    }

    if (isProcessing) return;

    try {
      setIsProcessing(true);
      console.log(`Attempting to claim reward ${reward.id} for user ${userId}`);
      const response = await claimReward(userId, reward.id);
      console.log("Claim response:", response);
      alert("Reward claimed successfully!");
      onRewardClaimed();
    } catch (error) {
      console.error("Error claiming reward:", error);
      alert(
        `Failed to claim reward: ${
          error.response?.data || "Please check your points balance."
        }`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="reward-card">
      <div className="reward-image">
        <img src={reward.imageUrl} alt={reward.name} />
      </div>
      <div className="reward-name">{reward.name}</div>
      <div className="reward-points">
        {reward.pointsCost.toLocaleString()} Points
      </div>
      <button
        className={`claim-button ${isProcessing ? "processing" : ""}`}
        onClick={handleClaim}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Claim"}
      </button>
    </div>
  );
};

export default RewardCard;
