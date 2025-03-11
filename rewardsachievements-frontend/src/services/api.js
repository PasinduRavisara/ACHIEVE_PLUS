import axios from 'axios';

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service object with methods for each endpoint
const apiService = {
  // Dashboard data
  getDashboardData: async () => {
    try {
      const response = await apiClient.get('/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  },
  
  // Rewards endpoints
  getUserPoints: async () => {
    try {
      const response = await apiClient.get('/rewards/points');
      return response.data;
    } catch (error) {
      console.error('Error fetching user points:', error);
      throw error;
    }
  },
  
  getUserRewards: async () => {
    try {
      const response = await apiClient.get('/rewards/list');
      return response.data;
    } catch (error) {
      console.error('Error fetching user rewards:', error);
      throw error;
    }
  },
  
  claimReward: async (rewardId) => {
    try {
      const response = await apiClient.post(`/rewards/claim/${rewardId}`);
      return response.data;
    } catch (error) {
      console.error(`Error claiming reward ${rewardId}:`, error);
      throw error;
    }
  },
  
  // Tasks endpoints
  getCompletionRate: async () => {
    try {
      const response = await apiClient.get('/tasks/completion-rate');
      return response.data;
    } catch (error) {
      console.error('Error fetching completion rate:', error);
      throw error;
    }
  },
  
  completeTask: async (taskId) => {
    try {
      const response = await apiClient.post(`/tasks/${taskId}/complete`);
      return response.data;
    } catch (error) {
      console.error(`Error completing task ${taskId}:`, error);
      throw error;
    }
  }
};

export default apiService;