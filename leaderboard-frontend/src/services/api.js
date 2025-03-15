import axios from "axios";

const API_URL = "http://localhost:8080/api/leaderboard";

export const fetchLeaderboard = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

export const updateUserPoints = async (userId, points) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/points`, {
      points,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user points:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/users/${userId}`);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
