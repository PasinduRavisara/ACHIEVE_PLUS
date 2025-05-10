import React, { useState, useEffect } from "react";
import RewardCard from "../components/RewardCard";
import { getUser, getRewards, claimReward } from "../services/api";

const RewardStore = () => {
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user and rewards data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await getUser();
        const rewardsData = await getRewards();

        setUser(userData);
        setRewards(rewardsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Handle claim reward
  const handleClaimReward = async (rewardId) => {
    if (!user) return;

    try {
      await claimReward(user.id, rewardId);

      // Update user points after claiming
      const rewardClaimed = rewards.find((r) => r.id === rewardId);
      if (rewardClaimed) {
        setUser((prev) => ({
          ...prev,
          points: prev.points - rewardClaimed.pointsCost,
        }));
      }

      // Show success message (could add toast notification here)
      alert("Reward claimed successfully!");
    } catch (err) {
      console.error("Error claiming reward:", err);
      alert("Failed to claim reward. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="reward-store">
      <h1 className="reward-store-title">REWARD STORE</h1>

      <div className="points-container">
        <div className="points-label">Points Earned</div>
        <div className="points-value">
          {user?.points.toLocaleString()} points
        </div>
      </div>

      <div className="rewards-grid">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            userPoints={user?.points || 0}
            onClaimReward={handleClaimReward}
          />
        ))}
      </div>

      <img
        src="/images/reward-box.png"
        alt="Reward Box"
        className="illustration"
      />
    </div>
  );
};

export default RewardStore;
