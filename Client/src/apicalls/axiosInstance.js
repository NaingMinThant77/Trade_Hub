import axios from "axios" // npm install axios

const getrefreshLocalStorage = () => {
    return localStorage.getItem("token")
}

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        Authorization: `Bearer ${getrefreshLocalStorage()}`
    }
})