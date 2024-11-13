// profileService.js
import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:8050/api/users/profile';

const config = {
  headers: { Authorization: `Bearer ${getToken()}` },
};

export const getProfile = async () => {
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put(API_URL, profileData, config);
  return response.data;
};

export const deleteProfile = async () => {
  const response = await axios.delete(API_URL, config);
  return response.data;
};
