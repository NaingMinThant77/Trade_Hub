const { Schema, model } = require("mongoose")

const notificationSchema = new Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    product_id: { type: String, required: true },
    owner_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isRead: { type: Boolean, default: false },
    phone_number: { type: String, required: true }
}, { timestamps: true })

const notificationModel = model("Notification", notificationSchema)

module.exports = notificationModel;