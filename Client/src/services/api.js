import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

// Signup API call
export const signup = async (data) => {
    console.log("signup api=>", data);
    try {
        const response = await axios.post(`${API_URL}/signup`, data);
        console.log("Signup Response:", response.data);
        return response.data; //Return success response
    } catch (error) {
        console.error("Signup Error:", error.response ? error.response.data : error.message); 
        throw error.response ? error.response.data : { msg: "Signup failed" };   // Return error response
    }
};

// Login API call
export const login = async (data) => {
    console.log("login api=>", data);
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        console.log("Login Response:", response.data);
        return response.data; // Return success response
    } catch (error) {
        console.error("Login Error:", error.response ? error.response.data : error.message);
        // Return error response properly
        throw error.response ? error.response.data : { msg: "Login failed" };
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
  

export const getHomePage = () =>
    axios.get(`${API_URL}/`)
        .then(response => {
            console.log("HomePage Response:", response.data);
            return response.data;
        })
        .catch(error => {
            console.error("HomePage Error:", error.response ? error.response.data : error.message);
        });

          