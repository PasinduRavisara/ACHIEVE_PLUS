import React from 'react';

const LeaderboardCard = ({ user, position }) => {
  return (
    <div className={`user-card ${position === 1 ? 'top' : ''}`}>
      <div className="rank-badge">{position}</div>
      {position === 1 && <div className="crown">👑</div>}
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

export default LeaderboardCard;