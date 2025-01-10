import axios from "axios" // npm install axios

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
})