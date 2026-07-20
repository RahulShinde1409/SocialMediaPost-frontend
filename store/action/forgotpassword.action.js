import axios from "axios";

const API_URL = "https://socialmedia-backend-ashy.vercel.app/api/v1";

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/forget-password`, {
    email,
  });

  return response.data;
};