import { axiosInstance } from "./axiosInstance"

// register new account
export const registerUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/register", payload)
        console.log(response)
        console.log(response.data)
        return response.data
    } catch (error) {
        return error.message; // from server
    }
}

// login account
export const loginUser = async (payload) => {
    try {
        const response = await axiosInstance.post("/login", payload, {
            validateStatus: () => true
        })
        console.log(response)
        console.log(response.data)
        return response.data
    } catch (error) {
        return error.message; // from server
    }
}
