const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin")
const authMiddleware = require("../middlewares/auth")
const adminMiddleware = require("../middlewares/isAdmin")

// get all products
// GET /admin/products
router.get("/products", authMiddleware, adminMiddleware, adminController.getAllProducts)

router.get("/paginationproducts", authMiddleware, adminMiddleware, adminController.getAllProductsWithPagination)

// Change product status (approve/reject)
// POST /admin/product-status/:id
router.post("/product-status/:id", authMiddleware, adminMiddleware, adminController.changeProductStatus)

// get user list
// GET /admin/users
router.get("/users", authMiddleware, adminMiddleware, adminController.getUsers)

router.get("/paginationusers", authMiddleware, adminMiddleware, adminController.getAllUsersWithPagination)

// Change product status (approve/reject)
// POST /admin/user-status/:id
router.post("/user-status/:id", authMiddleware, adminMiddleware, adminController.changeUserStatus)

module.exports = router;
