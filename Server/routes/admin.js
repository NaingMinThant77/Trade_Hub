const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const adminController = require("../controllers/admin")
const authMiddleware = require("../middlewares/auth")
const adminMiddleware = require("../middlewares/isAdmin")

// get all products
// GET /admin/products
router.get("/products", authMiddleware, adminMiddleware, adminController.getAllProducts)

// Change product status (approve/reject)
// POST /admin/product-status/:id
router.post("/product-status/:id", authMiddleware, adminMiddleware, adminController.changeProductStatus)

// get user list
// GET /admin/users
router.get("/users", authMiddleware, adminMiddleware, adminController.getUsers)

// Change product status (approve/reject)
// POST /admin/user-status/:id
router.post("/user-status/:id", authMiddleware, adminMiddleware, adminController.changeUserStatus)



module.exports = router;
