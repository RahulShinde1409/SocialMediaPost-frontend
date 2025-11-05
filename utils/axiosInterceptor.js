import axios from "axios";


const axioshttp = axios.create({
    baseURL: "https://social-media-post-backend.vercel.app/api/v1",
    withCredentials: true
})
export default axioshttp;