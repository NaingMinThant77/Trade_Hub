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

// get all products
// GET / products
router.get("/products", authMiddleware, productController.getAllProducts)

// get single product
// GET / products/:id
router.get("/products/:id", authMiddleware, productController.getOldProduct)

// update product
// POST /update-products/:id
router.post("/update-product", authMiddleware, [ // body() name from client
    body("product_name").trim().notEmpty().withMessage("Product name is required"),
    body("product_description").trim().notEmpty().withMessage("Product description is required"),
    body("product_price").trim().notEmpty().withMessage("Product price is required"),
    body("product_category").trim().notEmpty().withMessage("Product category is required"),
    body("product_used_for").trim().notEmpty().withMessage("Product usedFor is required"),
    body("product_details").isArray().withMessage("Product details must be array"),
], productController.updateProduct)

// delete product
// DELETE /products/:id
router.delete("/products/:id", authMiddleware, productController.deleteProduct)


module.exports = router;
