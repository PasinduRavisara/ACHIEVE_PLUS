import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = {
  getLeaderboard: async () => {
    try {
      const response = await axios.get(`${API_URL}/leaderboard`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
      throw error;
    }
  },
  
  addUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/leaderboard/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },
  
  updatePoints: async (userId, points) => {
    try {
      const response = await axios.put(`${API_URL}/leaderboard/users/${userId}/points`, { points });
      return response.data;
    } catch (error) {
      console.error('Error updating points:', error);
      throw error;
    }
  },
  
  deleteUser: async (userId) => {
    try {
      await axios.delete(`${API_URL}/leaderboard/users/${userId}`);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};

export default api;