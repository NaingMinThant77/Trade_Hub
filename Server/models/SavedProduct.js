const { Schema, model } = require("mongoose")

const savedProductSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    product_id: { type: Schema.Types.ObjectId, ref: "Product" },
})

const savedProductModel = model("SavedProduct", savedProductSchema)

module.exports = savedProductModel;