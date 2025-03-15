import React from "react";

const UserList = ({ users }) => {
  // Skip top 3 users as they are displayed in TopUsers component
  const remainingUsers = users.slice(3);

  return (
    <div className="user-list">
      {remainingUsers.map((user) => (
        <div key={user.id} className="user-list-item">
          <div className="rank-circle small">{user.rank}</div>
          <img
            src={
              user.profileImageUrl || `https://i.pravatar.cc/150?u=${user.id}`
            }
            alt={`${user.name}'s avatar`}
            className="user-avatar small"
          />
          <div className="user-name">{user.name}</div>
          <div className="user-points">{user.points} Points</div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
