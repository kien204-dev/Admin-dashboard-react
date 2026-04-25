import api from "./api";

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