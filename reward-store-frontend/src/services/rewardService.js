import api from "./api";

export const getAllRewards = async () => {
  try {
    const response = await api.get("/rewards");
    return response.data;
  } catch (error) {
    console.error("Error fetching rewards:", error);
    throw error;
  }
};

export const claimReward = async (userId, rewardId) => {
  try {
    console.log(
      `Sending claim request for user ${userId} and reward ${rewardId}`
    );
    const response = await api.post(
      `/claims/user/${userId}/reward/${rewardId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error claiming reward:", error);
    throw error;
  }
};
