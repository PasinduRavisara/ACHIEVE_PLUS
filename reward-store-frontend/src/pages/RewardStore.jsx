import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import RewardCard from "../components/RewardCard";
import UserInfo from "../components/UserInfo";
import Modal from "../components/Modal";
import { getUserByUsername } from "../services/userService";
import { getAllRewards } from "../services/rewardService";
import "../styles/RewardStore.css";
import giftBoxImage from "../assets/images/gift-box.png";

const RewardStore = () => {
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "" });

  const fetchData = async () => {
    try {
      setLoading(true);
      const userData = await getUserByUsername("demouser");
      console.log("User data:", userData);

      if (userData) {
        setUser(userData);
        const rewardsData = await getAllRewards();
        setRewards(rewardsData);
      } else {
        showModal("Error", "Failed to load user data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showModal("Error", "Failed to load data from the server");
    } finally {
      setLoading(false);
    }
  };

  const showModal = (title, message) => {
    setModal({ isOpen: true, title, message });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
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
            <span className="icon camera-icon">📷</span>
            <span className="icon message-icon">💬</span>
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

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default RewardStore;
