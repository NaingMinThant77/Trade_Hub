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

// get all products
export const getAllPaginationProducts = async ({ page }) => {
    try {
        const response = await axiosInstance.get("/paginationproducts", {
            params: { page },
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message; // from server
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

// get product saved Images

export const getSavedImages = async (id) => {
    try {
        const response = await axiosInstance.get(`/product-images/${id}`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete product saved images
export const deleteSavedImages = async (payload) => {
    try {
        const { productId, imgToDelete } = payload;
        const encodeImgToDelete = encodeURIComponent(imgToDelete)

        const response = await axiosInstance.delete(`/products/images/destroy/${productId}/${encodeImgToDelete}`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}

// save product
export const savedProduct = async (id) => {
    try {
        const response = await axiosInstance.post(`/saved-products/${id}`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}

// get saved products
export const getSavedProducts = async () => {
    try {
        const response = await axiosInstance.get(`/saved-products`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete saved product
export const unsavedProducts = async (id) => {
    try {
        const response = await axiosInstance.delete(`/unsaved-products/${id}`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}