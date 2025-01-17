import { axiosInstance } from "./axiosInstance"

// get all products
export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get("/admin/products", {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message; // from server
    }
}

// Change product status (approve or reject)
export const changeProductStatus = async (productId, action) => {
    try {
        const response = await axiosInstance.post(`/admin/product-status/${productId}`, { action }, {
            validateStatus: () => true
        });
        return response.data;
    } catch (error) {
        return error.message; // from server
    }
}

// get all users
export const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get("/admin/users", {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message; // from server
    }
}

// Change user status (active or banned)
export const changeUserStatus = async (userId, action) => {
    try {
        const response = await axiosInstance.post(`/admin/user-status/${userId}`, { action }, {
            validateStatus: () => true
        });
        return response.data;
    } catch (error) {
        return error.message; // from server
    }
}