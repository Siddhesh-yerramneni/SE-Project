import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

export const signup = (data) => 
    axios.post(`${API_URL}/signup`, data)
    .then(response => {
        console.log("Signup Response:", response.data);
        return response.data;
    })
    .catch(error => {
        console.error("Signup Error:", error.response ? error.response.data : error.message);
    });

export const login = async (data) => {
    console.log("login api=>", data);
    try {
        const response = await axios.post(`${API_URL}/login`, data);
        console.log("Login Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response ? error.response.data : error.message);
    }
};

export const addBook = (data) => 
    axios.post(`${API_URL}/addBook`, data)
    .then(response => {
        console.log("AddBook Response:", response.data);
        return response.data;
    })
    .catch(error => {
        console.error("AddBook Error:", error.response ? error.response.data : error.message);
    });

export const getHomePage = () => 
    axios.get(`${API_URL}/`)
    .then(response => {
        console.log("HomePage Response:", response.data);
        return response.data;
    })
    .catch(error => {
        console.error("HomePage Error:", error.response ? error.response.data : error.message);
    });
