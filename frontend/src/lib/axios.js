import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1",
    withCredentials: true, // cookies / sessions
});

// ADD THIS 👇
export default axiosInstance;
