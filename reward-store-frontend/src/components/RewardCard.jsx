import React, { useState } from "react";
import "../styles/RewardCard.css";
import { claimReward } from "../services/rewardService";

const RewardCard = ({ reward, userId, onRewardClaimed, onClaimError }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Safely extract reward properties
  const name = reward?.name || "Unknown Reward";
  const pointsCost = reward?.pointsCost || 0;
  const imageUrl = reward?.imageUrl || "/placeholder.jpg";
  const id = reward?.id;

  const handleClaim = async () => {
    if (isProcessing || !userId || !id) {
      if (!userId) {
        onClaimError("User information is missing. Please refresh the page.");
      }
      if (!id) {
        onClaimError("Reward information is missing. Please refresh the page.");
      }
      return;
    }

    try {
      setIsProcessing(true);
      await claimReward(userId, id);
      onRewardClaimed(pointsCost);
    } catch (error) {
      console.error("Error claiming reward:", error);
      onClaimError(
        error.message ||
          "Failed to claim reward. Please check your points balance."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="reward-card">
      <div className="reward-image">
        <img
          src={imageUrl}
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/placeholder.jpg";
          }}
        />
      </div>
      <div className="reward-name">{name}</div>
      <div className="reward-points">{pointsCost.toLocaleString()} Points</div>
      <button
        className="claim-button"
        onClick={handleClaim}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Claim"}
      </button>
    </div>
  );
};

export default RewardCard;
