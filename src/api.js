// src/api.js
import axios from "axios";

// Base URL (backend)
const API = axios.create({
    baseURL: "https://orgliv-backend.onrender.com/api",
});

// ----------------------------------
// REQUEST INTERCEPTOR
// ----------------------------------
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------------------
// RESPONSE INTERCEPTOR (OPTIONAL)
// ----------------------------------
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Auto logout if token expired
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default API;
