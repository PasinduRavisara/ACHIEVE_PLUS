import React from "react";

const TopUsers = ({ users }) => {
  // Get top 3 users
  const topUsers = users.slice(0, 3);

  // Arrange them in 2nd, 1st, 3rd order for display
  const displayOrder = [];
  if (topUsers[1]) displayOrder.push(topUsers[1]);
  if (topUsers[0]) displayOrder.push(topUsers[0]);
  if (topUsers[2]) displayOrder.push(topUsers[2]);

  return (
    <div className="top-users">
      {displayOrder.map((user, index) => {
        // Determine if this is the crowned user (the first in the original order)
        const isFirst = user.rank === 1;
        const position = index === 0 ? 2 : index === 1 ? 1 : 3;

        return (
          <div key={user.id} className={`top-user-card position-${position}`}>
            <div className="rank-circle">{user.rank}</div>
            <div className="user-avatar-container">
              {isFirst && <div className="crown">👑</div>}
              <img
                src={
                  user.profileImageUrl ||
                  `https://i.pravatar.cc/150?u=${user.id}`
                }
                alt={`${user.name}'s avatar`}
                className="user-avatar large"
              />
            </div>
            <div className="user-name">{user.name}</div>
            <div className="user-points">{user.points} Points</div>
          </div>
        );
      })}
    </div>
  );
};

export default TopUsers;
