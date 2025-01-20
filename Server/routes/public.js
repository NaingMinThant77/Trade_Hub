const express = require("express");
const router = express.Router();
const publicController = require("../controllers/public");

// get all products
// GET / api/products
router.get("/products", publicController.getAllProducts)

module.exports = router;
