import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import '../styles/RewardsSection.css';

const RewardsSection = () => {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user points
        const pointsData = await apiService.getUserPoints();
        setPoints(pointsData);
        
        // Fetch user rewards
        const rewardsData = await apiService.getUserRewards();
        setRewards(rewardsData);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load rewards data');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchData();
  }, []);

  const handleClaimReward = async (rewardId) => {
    try {
      await apiService.claimReward(rewardId);
      
      // Refresh data after claiming
      const pointsData = await apiService.getUserPoints();
      setPoints(pointsData);
      
      const rewardsData = await apiService.getUserRewards();
      setRewards(rewardsData);
    } catch (err) {
      setError('Failed to claim reward');
      console.error(err);
    }
  };

  if (loading) return <div>Loading rewards...</div>;
  if (error) return <div>{error}</div>;

  // For demo purposes, use static rewards if none are available
  const displayRewards = rewards.length > 0 ? rewards : [
    { id: 1, name: "REWARD 01", claimed: false },
    { id: 2, name: "REWARD 02", claimed: false },
    { id: 3, name: "REWARD 03", claimed: false }
  ];

  return (
    <div className="rewards-section">
      <h3>REWARDS</h3>
      
      <div className="points-display">
        <div className="points">
          <h1>{points}</h1>
          <p>Points</p>
        </div>
      </div>
      
      <div className="rewards-list">
        {displayRewards.map((reward) => (
          <div key={reward.id} className="reward-item">
            <div className="reward-name">{reward.name}</div>
            <button 
              className={`claim-button ${reward.claimed ? 'claimed' : ''}`}
              onClick={() => handleClaimReward(reward.id)}
              disabled={reward.claimed}
            >
              {reward.claimed ? 'Claimed' : 'Claim'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsSection;