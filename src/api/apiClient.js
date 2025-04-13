import axios from "axios";
import { logout } from "./developers/api";
import toast from "react-hot-toast";
import { getAuthSetters } from "../context/authController";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

// Add a request interceptor
apiClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  response => response, // If the request is successful, return the response
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized), try to refresh the access token
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.errors?.name === "TokenExpiredError" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark this request as retried

      try {
        // Request a new access token using the refresh token
        const refreshResponse = await apiClient.post('/users/refresh-token', {}, { withCredentials: true });

        const newAccessToken = refreshResponse.data.data.accessToken;

        // Update the Authorization header with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        localStorage.setItem('token', newAccessToken)

        // Retry the original request with the new token
        return apiClient(originalRequest);

      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);

        toast('Your session has expired. Please log in again.')

        // Remove any tokens from localStorage
        await logout()
        localStorage.removeItem('token');
        localStorage.removeItem('dev-user');

        // Clear auth context
        const { setUser, setIsAuthenticated } = getAuthSetters();
        setUser(null);
        setIsAuthenticated(false);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;