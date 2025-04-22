import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

// ------------------------ Auth APIs ------------------------ //

// User registration / Signp API
export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Signup failed" };
  }
};

// User login API
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Login failed" };
  }
};

// ------------------------ Book APIs ------------------------ //

// Get all Books API
export const fetchAllBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/getBooks`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { msg: "Failed to fetch books" };
  }
};

// Add new book API
export const addBook = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/addBook`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to add book." };
  }
};

// Fetch an individual book based on Book ID
export const getBook = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getBook/${id}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { msg: "Failed to fetch book." };
  }
};

// Get Fiction Books API
export const fetchFictionBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/getBooks/fiction`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { msg: "Failed to fetch fiction books." };
  }
};

// Get Self-Help Books API
export const fetchSelfHelpBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/getBooks/selfhelp`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { msg: "Failed to fetch self-help books." };
  }
};

// Get Romance Books API
export const fetchRomanceBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/getBooks/romance`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { msg: "Failed to fetch romance books." };
  }
};

// ------------------------ Review APIs ------------------------ //

// Fetch all reviews for a give book ID
export const getReviews = async (bookId) => {
  try {
    const response = await axios.get(`${API_URL}/getReviews/${bookId}`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { msg: "Failed to fetch reviews." };
  }
};

// Add a new review for the given Book
export const addReview = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/addReview`, data);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { msg: "Failed to add review." };
  }
};

// Edit existing review for the Book
export const editReview = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/editReview/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(
      "editReview API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteReview/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "deleteReview API error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ------------------------ Home Page API ------------------------ //

export const getHomePage = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { msg: "Failed to load home page." };
  }
};

// ------------------------ Post APIs ------------------------ //

export const createPost = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/createPost`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to create post." };
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/getPosts`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to fetch posts." };
  }
};

export const getPostsByAuthor = async (authorID) => {
  try {
    const response = await axios.get(`${API_URL}/getPosts/${authorID}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to fetch author's posts." };
  }
};

export const editPost = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/editPost/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to edit post." };
  }
};

export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deletePost/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { msg: "Failed to delete post." };
  }
};
