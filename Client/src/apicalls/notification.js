import { axiosInstance } from "./axiosInstance"

// add new notification
export const notify = async (payload) => {
    try {
        const response = await axiosInstance.post("/notify", payload, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}

// get all notification
export const getAllNoti = async () => {
    try {
        const response = await axiosInstance.get("/notifications", {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}

// markAsRead
export const makeRead = async (id) => {
    try {
        const response = await axiosInstance.get(`/notifications-read/${id}`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete noti
export const deleteNoti = async (id) => {
    try {
        const response = await axiosInstance.delete(`/notification-delete/${id}`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}

// delete all noti
export const deleteAllNoti = async () => {
    try {
        const response = await axiosInstance.delete(`/notification-delete-all`, {
            validateStatus: () => true
        })
        return response.data
    } catch (error) {
        return error.message;
    }
}