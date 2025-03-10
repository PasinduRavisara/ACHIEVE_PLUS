import axios from 'axios';

const API_URL = 'http://localhost:8080/api/analytics';

export const getMetrics = async (dateRange, userId = null) => {
  try {
    let url = `${API_URL}/metrics?dateRange=${dateRange}`;
    if (userId) {
      url += `&userId=${userId}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    throw error;
  }
};

export const getChartData = async (dateRange, userId = null) => {
  try {
    let url = `${API_URL}/chart-data?dateRange=${dateRange}`;
    if (userId) {
      url += `&userId=${userId}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};