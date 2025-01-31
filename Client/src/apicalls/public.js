import { axiosInstance } from "./axiosInstance"

// get all product
export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get("/api/products")
        return response.data
    } catch (error) {
        return error.message;
    }
}

// get product by filters
export const getProductsByFilters = async (key, value) => {
    try {
        const response = await axiosInstance.get(`/api/products/filters?${key}=${value}`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}

export const getProductsById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/products/${id}`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}