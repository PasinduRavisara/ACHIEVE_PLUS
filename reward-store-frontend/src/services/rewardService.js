import api from "./api";

const rewardService = {
  // Get all active rewards
  getActiveRewards: async () => {
    try {
      const response = await api.get("/rewards/active");
      return response.data;
    } catch (error) {
      console.error("Error fetching rewards:", error);
      throw error;
    }
  },

  // Get all rewards
  getAllRewards: async () => {
    try {
      const response = await api.get("/rewards");
      return response.data;
    } catch (error) {
      console.error("Error fetching rewards:", error);
      throw error;
    }
  },

  // Claim a reward
  claimReward: async (userId, rewardId) => {
    try {
      const response = await api.post(
        `/claims/user/${userId}/reward/${rewardId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error claiming reward:", error);
      throw error;
    }
  },

  // Get user's claimed rewards
  getUserRewards: async (userId) => {
    try {
      const response = await api.get(`/claims/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user rewards:", error);
      throw error;
    }
  },
};

export default rewardService;
