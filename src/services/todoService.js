// todoService.js
import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:8050/api/todos';

const config = {
  headers: { Authorization: `Bearer ${getToken()}` },
};

export const getTodos = async () => {
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_URL, todo, config);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/${id}`, todo, config);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};
