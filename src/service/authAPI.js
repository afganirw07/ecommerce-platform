import axios from "axios";


const API_URL = "http://localhost:5000/api/auth";

// register user
export const register = (data) => {
    return axios.post(`${API_URL}/register`, data);
};

// login user
export const login = (data) => {
    return axios.post(`${API_URL}/login`, data);
};
