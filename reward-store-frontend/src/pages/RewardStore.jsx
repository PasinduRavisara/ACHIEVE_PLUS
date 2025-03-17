import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import RewardCard from "../components/RewardCard";
import UserInfo from "../components/UserInfo";
import { getUserByUsername } from "../services/userService";
import { getAllRewards } from "../services/rewardService";
import "../styles/RewardStore.css";
import giftBoxImage from "../assets/images/gift-box.png";

const RewardStore = () => {
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Get the demouser first
      const userData = await getUserByUsername("demouser");
      console.log("User data fetched:", userData); // Add this for debugging

      if (userData && userData.id) {
        setUser(userData);
        // Get rewards only after we have a valid user
        const rewardsData = await getAllRewards();
        setRewards(rewardsData);
      } else {
        console.error("User data is incomplete or invalid");
        alert("Error loading user data. Please check the console for details.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load data. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRewardClaimed = () => {
    fetchData(); // Refresh data after a reward is claimed
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="reward-store-container">
      <Sidebar />

      <div className="main-content">
        <div className="header">
          <h1>REWARD STORE</h1>
          <div className="header-icons">
            <span className="icon">📷</span>
            <span className="icon">💬</span>
            <span className="icon user-icon">👤</span>
          </div>
        </div>

        <div className="content">
          <div className="left-section">
            <UserInfo points={user?.points || 0} />

            <div className="rewards-grid">
              {rewards.map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  userId={user?.id}
                  onRewardClaimed={handleRewardClaimed}
                />
              ))}
            </div>
          </div>

          <div className="right-section">
            <img src={giftBoxImage} alt="Gift Box" className="gift-box-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardStore;
