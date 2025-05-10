import api from "./api";

export const getAllRewards = async () => {
  try {
    const response = await api.get("/rewards");
    return response.data;
  } catch (error) {
    console.error("Error fetching rewards:", error);
    // Return empty array instead of throwing to prevent rendering issues
    return [];
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
    if (error.response) {
      throw new Error(error.response.data || "Failed to claim reward");
    }
    throw new Error("Network error, please try again later");
  }
};
