import axios from "axios" // npm install axios

const getrefreshLocalStorage = () => {
    const refreshToken = localStorage.getItem("token")
    return refreshToken;
}

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        Authorization: `Bearer ${getrefreshLocalStorage()}`
    }
})