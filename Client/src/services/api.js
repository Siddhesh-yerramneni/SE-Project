import axios from "axios";

const API_URL = "http://127.0.0.1:3000";

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
export const addBook = (data) => axios.post(`${API_URL}/addBook`, data);
export const getHomePage = () => axios.get(`${API_URL}/`);
