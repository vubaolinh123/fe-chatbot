import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://contentta.cloud",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to extract data and handle errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return only the data part of the response
    return response.data;
  },
  (error: AxiosError) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const errorData = error.response.data as any;
      const errorMessage =
        errorData?.message ||
        errorData?.error ||
        `Error: ${error.response.status}`;
      console.error("API Error:", errorMessage);
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Request made but no response received
      console.error("No response from server:", error.request);
      return Promise.reject(new Error("No response from server"));
    } else {
      // Error in request setup
      console.error("Request error:", error.message);
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;

