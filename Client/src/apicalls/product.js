import { axiosInstance } from "./axiosInstance"

// sell product
export const sellProduct = async (payload) => {
    try {
        const response = await axiosInstance.post("/create-product", payload)

        return response.data
    } catch (error) {
        return error.message; // from server
    }
}

// get all product
export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get("/products")
        return response.data
    } catch (error) {
        return error.message;
    }
}

// get old product
export const getOldProduct = async (id) => {
    try {
        const response = await axiosInstance.get(`/products/${id}`)
        return response.data
    } catch (error) {
        return error.message;
    }
}

// update products
export const updateProduct = async (payload) => {
    try {
        const response = await axiosInstance.post(`/update-product`, payload)
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete products
export const deleteProduct = async (id) => {
    try {
        const response = await axiosInstance.delete(`/products/${id}`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}

// upload image
export const uploadProductImage = async (formData) => {
    try {
        const response = await axiosInstance.post(`/upload`, formData, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}