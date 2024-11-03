import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const register = async (data) => {
  return axios.post(`${API_BASE_URL}/register`, data);
};

export const login = async (data) => {
  return axios.post(`${API_BASE_URL}/login`, data);
};
