const express = require("express");
const router = express.Router();
const publicController = require("../controllers/public");

// get all products
// GET / api/products
router.get("/products", publicController.getAllProducts)

// get products by filters
// GET / api/products/filters
router.get("/products/filters", publicController.getProductsByFIlter)

module.exports = router;
