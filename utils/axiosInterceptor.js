import axios from "axios";


const axioshttp = axios.create({
    baseURL: "https://socialmedia-backend-ashy.vercel.app/api/v1/post",
    withCredentials: true
})

axioshttp.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default axioshttp;