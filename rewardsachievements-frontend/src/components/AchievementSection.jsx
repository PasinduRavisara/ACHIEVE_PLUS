import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import trophyIcon from '../assets/trophy.png'; // You'll need to add this image
import '../styles/AchievementSection.css';

const AchievementSection = () => {
  const [completionRate, setCompletionRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletionRate = async () => {
      try {
        setLoading(true);
        const data = await apiService.getCompletionRate();
        setCompletionRate(data.completionRate);
        setLoading(false);
      } catch (err) {
        setError('Failed to load achievement data');
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchCompletionRate();
  }, []);

  if (loading) return <div>Loading achievements...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="achievement-section">
      <h3>ACHIEVEMENT</h3>
      
      <div className="trophy-container">
        <img src={trophyIcon} alt="Trophy" className="trophy-icon" />
      </div>
      
      <div className="completion-rate">
        <div className="percentage">
          <h1>{Math.round(completionRate)}%</h1>
          <p>Of Your Task Completion</p>
        </div>
      </div>
      
      <div className="time-period">
        <button className="period-button">Last 30 Days</button>
      </div>
    </div>
  );
};

export default AchievementSection;