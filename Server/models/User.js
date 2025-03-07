const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, default: "active" }
}, { timestamps: true })

const userModel = model("User", userSchema)

module.exports = userModel;