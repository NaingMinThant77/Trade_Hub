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