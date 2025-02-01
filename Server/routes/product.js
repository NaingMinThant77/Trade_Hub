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

router.get("/paginationproducts", authMiddleware, productController.getAllProductsWithPagination)

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

// upload product images
// POST /upload
router.post("/upload", authMiddleware, productController.uploadProductImages)

// get saved product images
// GET /product-images/:id
router.get("/product-images/:id", authMiddleware, productController.getSavedImages)

// delete product image
// DELETE /products/images/destroy/:productId/:imgToDelete
router.delete("/products/images/destroy/:productId/:imgToDelete", authMiddleware, productController.deleteProductImages)

// save product
// POST /saved-products/:id
router.post("/saved-products/:id", authMiddleware, productController.savedProduct)

// get save product
// GET /saved-products
router.get("/saved-products", authMiddleware, productController.getSavedProduct)

// delete save product
// DELETE /unsaved-products/:id
router.delete("/unsaved-products/:id", authMiddleware, productController.unSavedProduct)

module.exports = router;
