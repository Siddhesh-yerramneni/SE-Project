import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

// ------------------------ Auth APIs ------------------------

export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Signup failed" };
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Login failed" };
  }
};

// ------------------------ Book APIs ------------------------
export const fetchAllBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/getBooks`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to fetch books" };
  }
};
export const addBook = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/addBook`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to add book." };
  }
};

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/getBooks`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to fetch books." };
  }
};

export const getBook = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getBook/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to fetch book." };
  }
};

// ------------------------ Review APIs ------------------------

export const getReviews = async (bookId) => {
  try {
    const response = await axios.get(`${API_URL}/getReviews/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to fetch reviews." };
  }
};

export const addReview = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/addReview`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to add review." };
  }
};

export const editReview = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/editReview/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("editReview API error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteReview/${id}`);
    return response.data;
  } catch (error) {
    console.error("deleteReview API error:", error.response?.data || error.message);
    throw error;
  }
};

// ------------------------ Home Page API ------------------------

export const getHomePage = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to load home page." };
  }
};
