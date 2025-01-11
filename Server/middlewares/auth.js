const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Bearer token
        if (!token) {
            throw new Error("No token provided")
        }

        const decoded = jwt.verify(token, process.env.JWI_KEY);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({
            isSuccess: false,
            message: err.message
        })
    }
}