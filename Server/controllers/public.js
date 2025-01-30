const Product = require('../models/Product')

exports.getAllProducts = async (req, res) => {
    try {
        const productDocs = await Product.find({ status: "approved" }).sort({ createdAt: -1 })

        return res.status(200).json({
            isSuccess: true,
            productDocs
        });
    } catch (error) {
        return res.status(422).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.getProductsByFIlter = async (req, res) => {
    try {
        const { searchKey, category } = req.query;

        const query = {};

        if (searchKey) {
            query.name = { $regex: searchKey, $options: "i" }// incase-sensitive
        }

        if (category) {
            query.category = category
        }

        const productDocs = await Product.find(query)

        if (!productDocs || productDocs.length === 0) {
            throw new Error("Products not found.")
        }
        return res.status(200).json({
            isSuccess: true,
            productDocs
        });
    } catch (error) {
        return res.status(404).json({
            isSuccess: false,
            message: error.message
        });
    }
}