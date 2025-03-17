import api from "./api";

export const getUserByUsername = async (username) => {
  try {
    const response = await api.get(`/users/by-username/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const addPoints = async (userId, amount) => {
  try {
    const response = await api.post(
      `/users/${userId}/add-points?amount=${amount}`
    );
    return response.data;
  } catch (error) {
    console.error("Error adding points:", error);
    throw error;
  }
};
