import axios from "axios";

const API_URL = "https://orgliv-backend.onrender.com/api/auth";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  return response.data;
};
