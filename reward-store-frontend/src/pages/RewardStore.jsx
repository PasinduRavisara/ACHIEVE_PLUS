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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [refreshKey, setRefreshKey] = useState(0); // Add this to force re-render

  const fetchData = async () => {
    try {
      setLoading(true);
      const userData = await getUserByUsername("demouser");
      const rewardsData = await getAllRewards();

      // Safely handle the user data
      if (userData && typeof userData === "object") {
        setUser(userData);
      } else {
        console.error("Invalid user data received:", userData);
        showModal("Error", "Failed to load user data correctly.");
      }

      // Safely handle the rewards data
      if (Array.isArray(rewardsData)) {
        setRewards(rewardsData);
      } else {
        console.error("Invalid rewards data received:", rewardsData);
        showModal("Error", "Failed to load rewards data correctly.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      showModal("Error", "Failed to load data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]); // Add refreshKey as dependency

  const showModal = (title, message) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleRewardClaimed = async (pointsCost) => {
    try {
      // Show success message
      showModal("Success", "Reward claimed successfully!");

      // Update locally to give immediate feedback
      if (user) {
        setUser({
          ...user,
          points: Math.max(0, user.points - pointsCost),
        });
      }

      // Wait for the modal to be shown before refreshing data
      setTimeout(() => {
        // Refresh data by changing the refreshKey
        setRefreshKey((prevKey) => prevKey + 1);
      }, 1500);
    } catch (error) {
      console.error("Error handling reward claim:", error);
      showModal("Error", "Something went wrong while updating your points.");
    }
  };

  const handleClaimError = (message) => {
    showModal(
      "Claim Failed",
      message || "Failed to claim reward. Please check your points balance."
    );
  };

  if (loading && !user) {
    return <div className="loading">Loading...</div>;
  }

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
              {Array.isArray(rewards) &&
                rewards.map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    userId={user?.id}
                    onRewardClaimed={handleRewardClaimed}
                    onClaimError={handleClaimError}
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
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};

export default RewardStore;
