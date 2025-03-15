import React from 'react';

const LeaderboardItem = ({ user, rank }) => {
  return (
    <div className="user-item">
      <div className="rank-badge">{rank}</div>
      <img 
        className="profile-image" 
        src={user.profileImageUrl || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
        alt={user.name} 
      />
      <div className="user-name">{user.name}</div>
      <div className="user-points">{user.points} Points</div>
    </div>
  );
};

export default LeaderboardItem;