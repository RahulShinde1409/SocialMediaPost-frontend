import axios from "axios";


const axioshttp = axios.create({
    baseURL: "https://socialmedia-backend-ashy.vercel.app/api/v1",
    withCredentials: true
})
export default axioshttp;