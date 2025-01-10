const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

const { body } = require("express-validator");
const User = require("../models/User")

// create new user
// POST => /register
router.post("/register", [
    body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 3 }).withMessage("Name must have at least 3 characters ").custom(async (value) => {
        const userDoc = await User.findOne({ name: value });
        if (userDoc) {
            throw new Error("username already exists.");
        }
    }),
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Please enter a valid email address").custom(async (value) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
            throw new Error("Email already exists.");
        }
    }),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({ min: 5 }).withMessage("Password must have at least 5 characters"),
], authController.register);

// login user
// POST => /login
router.post("/login", [
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Please enter a valid email address"),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({ min: 5 }).withMessage("Password must have at least 5 characters"),
], authController.login);

module.exports = router;
