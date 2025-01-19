import { axiosInstance } from "./axiosInstance"

// get all product
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

// get all products
export const getAllPaginationProducts = async ({ page }) => {
    try {
        const response = await axiosInstance.get("/admin/paginationproducts", {
            params: { page },
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

export const getAllPaginationUsers = async ({ page }) => {
    try {
        const response = await axiosInstance.get("/admin/paginationusers", {
            params: { page },
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