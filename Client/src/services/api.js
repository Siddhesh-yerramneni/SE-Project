import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

// Signup API call
export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Signup failed" };
  }
};

// Login API call
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Login failed" };
  }
};

// Add Book API call
export const addBook = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/addBook`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to add book." };
  }
};

// Home Page API call (optional)
export const getHomePage = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to load home page." };
  }
};
