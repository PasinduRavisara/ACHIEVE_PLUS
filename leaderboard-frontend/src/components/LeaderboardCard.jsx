import React, { useState, useEffect } from "react";
import { fetchLeaderboard } from "../services/api";
import TopUsers from "./TopUsers";
import UserList from "./UserList";
import "../styles/LeaderboardCard.scss";

const LeaderboardCard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLeaderboardData = async () => {
      try {
        const data = await fetchLeaderboard();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load leaderboard data. Please try again later.");
        setLoading(false);
      }
    };

    getLeaderboardData();
  }, []);

  if (loading) {
    return <div className="loading">Loading leaderboard data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="leaderboard-card">
      <h1 className="leaderboard-title">LEADERBOARD</h1>
      <div className="leaderboard-content">
        <TopUsers users={users} />
        <UserList users={users} />
      </div>
    </div>
  );
};

export default LeaderboardCard;
