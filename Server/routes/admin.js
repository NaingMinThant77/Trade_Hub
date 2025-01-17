const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const adminController = require("../controllers/admin")
const authMiddleware = require("../middlewares/auth")
const adminMiddleware = require("../middlewares/isAdmin")

// get all products
// GET /admin/products
router.get("/products", authMiddleware, adminMiddleware, adminController.getAllProducts)

module.exports = router;
