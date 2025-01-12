const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const productController = require("../controllers/product");
const authMiddleware = require("../middlewares/auth")

// add product
// POST / create
router.post("/create-product", authMiddleware, [ // body() name from client
    body("product_name").trim().notEmpty().withMessage("Product name is required"),
    body("product_description").trim().notEmpty().withMessage("Product description is required"),
    body("product_price").trim().notEmpty().withMessage("Product price is required"),
    body("product_category").trim().notEmpty().withMessage("Product category is required"),
    body("product_used_for").trim().notEmpty().withMessage("Product usedFor is required"),
    body("product_details").isArray().withMessage("Product details must be array"),
], productController.addNewProduct)

module.exports = router;
