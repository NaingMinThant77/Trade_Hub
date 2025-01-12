const User = require("../models/User")
const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.register = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            isSuccess: false,
            message: errors.array()[0].msg,
        });
    }

    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Store the created user document
        const newUser = await User.create({ name, email, password: hashedPass });

        return res.status(201).json({
            isSuccess: true,
            message: "User created successfully",
            userId: newUser._id
        });
    } catch (err) {
        return res.status(409).json({
            isSuccess: false,
            message: err.message
        });
    }
};

exports.login = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            isSuccess: false,
            message: errors.array()[0].msg,
        });
    }

    const { email, password } = req.body;

    try {
        // isEmail exist
        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            throw new Error("E-mail does not exist!")
        }

        // check password
        const isMatch = await bcrypt.compare(password, userDoc.password);
        if (!isMatch) {
            // return res.status(401).json({ message: "Wrong user credentials" });
            throw new Error("Wrong user credentials!")
        }

        // make token with jwt
        const token = jwt.sign({ userId: userDoc._id, email: userDoc.email }, process.env.JWI_KEY, { expiresIn: "1d" })

        return res.status(200).json({
            isSuccess: true,
            token,
            userId: userDoc._id,
            user_mail: userDoc.email,
            message: "Login Successfully"
        })

    } catch (err) {
        return res.status(401).json({ // 401 is best
            isSuccess: false,
            message: err.message
        });
    }
}

exports.checkCurrentUser = async (req, res) => {
    try {//req.userId => from middleware
        const userDoc = await User.findById(req.userId).select("name email role")
        if (!userDoc) {
            throw new Error("Unauthorized User")
        }

        res.status(200).json({
            isSuccess: true,
            message: "User is authorized",
            userDoc
        })
    } catch (error) {
        return res.status(401).json({
            isSuccess: false,
            message: error.message
        });
    }
}