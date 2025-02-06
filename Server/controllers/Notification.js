const Notification = require("../models/Notification");

exports.pushNotification = async (req, res) => {
    const { message, title, product_id, owner_id, phone_number } = req.body;
    try {

        await Notification.create({
            title, owner_id, product_id, message,
            phone_number
        })
        res.status(201).json({
            isSuccess: true,
            message: "Notification is pushed."
        })
    } catch (error) {
        return res.status(401).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.getNotifications = async (req, res) => {
    try {
        const notiDocs = await Notification.find({ owner_id: req.userId }).sort({ createAt: -1 })

        if (!notiDocs) {
            throw new Error("No notification yet!")
        }
        res.status(200).json({
            isSuccess: true,
            notiDocs
        })
    } catch (error) {
        return res.status(401).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.markAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const notiDoc = await Notification.findById(id)
        if (!notiDoc) {
            throw new Error("Notification not found!")
        }

        notiDoc.isRead = true
        notiDoc.save()

        res.status(200).json({
            isSuccess: true,
            message: "Done"
        })
    } catch (error) {
        return res.status(401).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.deleteNoti = async (req, res) => {
    const { id } = req.params;
    try {
        await Notification.findByIdAndDelete(id)

        res.status(200).json({
            isSuccess: true,
            message: "Notification is deleted"
        })
    } catch (error) {
        return res.status(401).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.deleteAllNoti = async (req, res) => {
    try {
        await Notification.deleteMany({ owner_id: req.userId })

        res.status(200).json({
            isSuccess: true,
            message: "Notifications are clear"
        })
    } catch (error) {
        return res.status(401).json({
            isSuccess: false,
            message: error.message
        });
    }
}