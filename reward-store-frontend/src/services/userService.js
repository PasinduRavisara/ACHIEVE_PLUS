import api from "./api";

const userService = {
  // Get user by username
  getUserByUsername: async (username) => {
    try {
      const response = await api.get(`/users/by-username/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  // Add points to user
  addPoints: async (userId, amount) => {
    try {
      const response = await api.post(
        `/users/${userId}/add-points?amount=${amount}`
      );
      return response.data;
    } catch (error) {
      console.error("Error adding points:", error);
      throw error;
    }
  },
};

export default userService;
