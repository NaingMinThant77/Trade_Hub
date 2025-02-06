const Product = require("../models/Product")
const User = require("../models/User")

exports.getAllProducts = async (req, res) => {
    try {
        const productDocs = await Product.find().populate("seller", "name").sort({ createdAt: -1 });
        const pendingProducts = await Product.find({ status: "pending" }).countDocuments()
        return res.status(200).json({
            isSuccess: true,
            productDocs, pendingProducts
        });
    } catch (error) {
        return res.status(422).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.getAllProductsWithPagination = async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = 7;
    try {
        const totalProducts = await Product.countDocuments();
        const productDocs = await Product.find()
            .populate("seller", "name")
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * perPage) // Skipping previous pages
            .limit(perPage);  // Limiting number of products per page

        res.status(200).json({
            isSuccess: true,
            productDocs,
            totalProducts,
            totalPages: Math.ceil(totalProducts / perPage), // Calculate total pages
        });
    } catch (error) {
        return res.status(422).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.changeProductStatus = async (req, res) => {
    const { id } = req.params;
    const { action } = req.body; // 'approve' or 'pending'

    try {
        const productDoc = await Product.findById(id);
        if (!productDoc) {
            throw new Error("Product not found");
        }

        if (action !== 'approved' && action !== 'reject' && action !== 'pending') {
            throw new Error("Invalid action");
        }

        productDoc.status = action;
        await productDoc.save();

        return res.status(200).json({
            isSuccess: true,
            message: `Product was ${action}`
        });
    } catch (error) {
        return res.status(422).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const userDocs = await User.find().select("name email role createdAt status").sort({ createdAt: -1 });
        return res.status(200).json({
            isSuccess: true,
            userDocs
        });
    } catch (error) {
        return res.status(422).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.getAllUsersWithPagination = async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    const perPage = 5;
    try {
        const totalUsers = await User.countDocuments();
        const userDocs = await User.find()
            .select("name email role createdAt status")
            .sort({ createdAt: -1 })
            .skip((currentPage - 1) * perPage) // Skipping previous pages
            .limit(perPage);  // Limiting number of products per page
        res.status(200).json({
            isSuccess: true,
            userDocs,
            totalUsers,
            totalPages: Math.ceil(totalUsers / perPage), // Calculate total pages
        });
    } catch (error) {
        return res.status(422).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.changeUserStatus = async (req, res) => {
    const { id } = req.params;
    const { action } = req.body; // 'active' or 'banned'

    try {
        const userDoc = await User.findById(id);
        if (!userDoc) {
            throw new Error("User not found");
        }

        if (action !== 'active' && action !== 'banned') {
            throw new Error("Invalid action");
        }

        userDoc.status = action;
        await userDoc.save();

        return res.status(200).json({
            isSuccess: true,
            message: `User was ${action}`
        });
    } catch (error) {
        return res.status(422).json({
            isSuccess: false,
            message: error.message
        });
    }
}