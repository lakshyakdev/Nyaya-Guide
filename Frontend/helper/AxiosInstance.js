import axios from "axios";

// const BASE_URL = "https://codecast-backend-vsg5.onrender.com/api/v4/";
const BASE_URL = "http://localhost:8080/api/v4/";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;