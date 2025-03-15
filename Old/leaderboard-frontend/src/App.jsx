import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LeaderboardCard from './components/LeaderboardCard';
import LeaderboardItem from './components/LeaderboardItem';
import api from './services/api';
import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await api.getLeaderboard();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load leaderboard data');
      setLoading(false);
      console.error(err);
    }
  };

  // Get top 3 users for featured display
  const topUsers = users.slice(0, 3);
  
  // Get users ranked 4 and below for the list
  const otherUsers = users.slice(3);

  // Reorder top users to match the layout in the image (2nd, 1st, 3rd)
  const orderedTopUsers = topUsers.length === 3 
    ? [topUsers[1], topUsers[0], topUsers[2]] 
    : topUsers;

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="top-bar">
        <div className="top-bar-icon">📱</div>
        <div className="top-bar-icon">📩</div>
        <div className="top-bar-icon">
          <img className="user-avatar" src="https://ui-avatars.com/api/?name=User" alt="User" />
        </div>
      </div>
      
      <main className="main-content">
        <div className="header">
          <h1>LEADERBOARD</h1>
        </div>
        
        {loading ? (
          <p>Loading leaderboard data...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="leaderboard-container">
            <div className="top-users">
              {orderedTopUsers.map((user, index) => {
                // Calculate the actual position for the badge
                // For the reordered display: [2nd, 1st, 3rd]
                const position = index === 0 ? 2 : index === 1 ? 1 : 3;
                
                return (
                  <LeaderboardCard 
                    key={user.id} 
                    user={user} 
                    position={position} 
                  />
                );
              })}
            </div>
            
            <div className="other-users">
              {otherUsers.map((user) => (
                <LeaderboardItem 
                  key={user.id} 
                  user={user} 
                  rank={user.rank} 
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;