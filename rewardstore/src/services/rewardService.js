import axios from "axios";

const BASE_URL = "http://localhost:8080/api/rewards";

export const RewardService = {
  getAllRewards: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching rewards:", error);
      return [];
    }
  },

  claimReward: async (username, rewardId) => {
    try {
      const response = await axios.post(`${BASE_URL}/claim`, null, {
        params: { username, rewardId },
      });
      return response.data;
    } catch (error) {
      console.error("Error claiming reward:", error);
      return false;
    }
  },
};
