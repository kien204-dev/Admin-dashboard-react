import api from "./api";
import axios from "axios";

const API_URL = "http://localhost:3001/api/users";

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    userData
  );

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};

// GET
export const getUsers = () => api.get("/users");

// POST (thêm user)
export const addUser = (data) => api.post("/users", data);

// PUT (sửa user)
export const updateUser = (id, data) =>
  api.put(`/users/${id}`, data);

// DELETE (xóa user)
export const deleteUser = (id) =>
  api.delete(`/users/${id}`);