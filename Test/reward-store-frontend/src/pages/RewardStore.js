import React, { useState, useEffect } from "react";
import PointsCard from "../components/PointsCard";
import RewardList from "../components/RewardList";
import { fetchUser, fetchRewards, claimReward } from "../api/api";

const RewardStore = () => {
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = 1;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load user data
        const userData = await fetchUser(userId);
        setUser(userData || { points: 0 });

        // Load rewards
        const rewardsData = await fetchRewards();
        setRewards(rewardsData);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleClaimReward = async (rewardId) => {
    try {
      await claimReward(userId, rewardId);

      // Update user points after claiming
      const userData = await fetchUser(userId);
      setUser(userData || { points: 0 });

      alert("Reward claimed successfully!");
    } catch (err) {
      alert("Failed to claim reward. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="main-content">
      <div className="header">
        <h1>REWARD STORE</h1>
        <div className="user-profile">U</div>
      </div>

      <div style={{ display: "flex" }}>
        <div>
          <PointsCard points={user.points} />
          <RewardList
            rewards={rewards}
            onClaimReward={handleClaimReward}
            userPoints={user.points}
          />
        </div>

        <img src="/images/gift-box.png" alt="Gift box" className="gift-image" />
      </div>
    </div>
  );
};

export default RewardStore;
