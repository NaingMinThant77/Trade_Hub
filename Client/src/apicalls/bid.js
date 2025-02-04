import { axiosInstance } from "./axiosInstance"

// add new bid
export const saveNewBid = async (payload) => {
    try {
        const response = await axiosInstance.post("/add-bid", payload, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message; // from server
    }
}

// get all bids
export const getAllBids = async (product_id) => {
    try {
        const response = await axiosInstance.get(`/bids/${product_id}`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message; // from server
    }
}
