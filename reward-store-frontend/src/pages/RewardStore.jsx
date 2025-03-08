import React, { useState, useEffect } from "react";
import RewardCard from "../components/RewardCard";
import userService from "../services/userService";
import rewardService from "../services/rewardService";

const RewardStore = () => {
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Username is hardcoded as 'demouser' from the backend DataInitializer
  const username = "demouser";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userData = await userService.getUserByUsername(username);
        setUser(userData);

        // Fetch active rewards
        const rewardsData = await rewardService.getActiveRewards();
        setRewards(rewardsData);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleClaimReward = async (rewardId) => {
    if (!user) return;

    try {
      // Call the API to claim the reward
      await rewardService.claimReward(user.id, rewardId);

      // Fetch updated user data (to get updated points)
      const updatedUser = await userService.getUserById(user.id);
      setUser(updatedUser);

      // Show success message
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
      {user && (
        <div className="points-card">
          <h2 className="points-title">Points Earned</h2>
          <div className="points-value">
            {user.points.toLocaleString()} points
          </div>
        </div>
      )}

      <div className="rewards-container">
        {rewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            onClaim={handleClaimReward}
            userPoints={user ? user.points : 0}
          />
        ))}
      </div>

      <img
        src="/images/reward-box.png"
        alt="Rewards Illustration"
        className="rewards-illustration"
      />
    </div>
  );
};

export default RewardStore;
