import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUser = async (username = "demouser") => {
  try {
    const response = await api.get(`/users/by-username/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getRewards = async () => {
  try {
    const response = await api.get("/rewards/active");
    return response.data;
  } catch (error) {
    console.error("Error fetching rewards:", error);
    throw error;
  }
};

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
