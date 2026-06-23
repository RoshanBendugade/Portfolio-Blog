import axios from "axios";

const API_BASE_URL = "http://localhost:8081/api";

export const getProjects = () => axios.get(`${API_BASE_URL}/projects`);
export const getBlogs = () => axios.get(`${API_BASE_URL}/blogs`);