const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error("Database connection error:", err));

module.exports = mongoose;