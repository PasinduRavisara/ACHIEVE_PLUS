import { useState, useEffect } from 'react';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const UserSelector = ({ onUserChange }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Fetch users when component mounts
    axios.get('http://localhost:8080/api/analytics/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleUserChange = (e) => {
    const userId = e.target.value === 'all' ? null : parseInt(e.target.value);
    setSelectedUserId(userId);
    onUserChange(userId);
  };

  return (
    <div className="user-selector">
      <label htmlFor="user-select">Select User: </label>
      <select 
        id="user-select" 
        onChange={handleUserChange} 
        value={selectedUserId || 'all'}
        className="form-select"
      >
        <option value="all">All Users</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name} ({user.department})
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelector;