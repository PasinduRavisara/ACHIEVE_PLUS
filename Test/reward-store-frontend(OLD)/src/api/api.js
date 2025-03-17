import axios from "axios";

const API_URL = "http://localhost:8080/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// User related API calls
export const fetchUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Rewards related API calls
export const fetchRewards = async () => {
  try {
    const response = await api.get("/rewards/active");
    return response.data;
  } catch (error) {
    console.error("Error fetching rewards:", error);
    throw error;
  }
};

// Claim reward API call
export const claimReward = async (userId, rewardId) => {
  try {
    const response = await api.post(
      `/claims/user/${userId}/reward/${rewardId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error claiming reward:", error);
    throw error;
  }
};

export default api;
