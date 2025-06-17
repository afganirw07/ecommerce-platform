import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// register user
export const register = (data) => {
  return axios.post(`${API_URL}/register`, data);
};

// login user
export const login = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

// update user with token

export const updateUser = async (userId, formData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error("User not logged in");

  const res = await axios.put(
    `http://localhost:5000/api/auth/update/${userId}`,
    formData
  );

  return res.data.user; // langsung kembalikan data user-nya
};


