import axios from "axios";

// Create axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add auth token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle responses globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export const albumsAPI = {
  add: (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return apiClient.post("/api/albums", formData, config);
  },
  list: () => apiClient.get("/api/albums"),
  remove: (songId) => apiClient.delete(`/api/albums/${songId}`),
};

export const songsAPI = {
  add: (formData) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return apiClient.post("/api/songs", formData, config);
  },
  list: () => apiClient.get("/api/songs"),
  remove: (songId) => apiClient.delete(`/api/songs/${songId}`),
};

export default apiClient;
