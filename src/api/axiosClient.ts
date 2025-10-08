import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com", // base url for axios calls
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional interceptor for logging / error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default axiosClient;
