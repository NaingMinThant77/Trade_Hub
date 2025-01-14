const Product = require("../models/Product")
const { validationResult } = require("express-validator")

require("dotenv").config()
const { v2: cloudinary } = require('cloudinary');

// Configuration
cloudinary.config({
    cloud_name: 'dgyvgsue4',
    api_key: '314866484468419',
    api_secret: process.env.CLOUD_API // Click 'View API Keys' above to copy your API secret
});

exports.addNewProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            isSuccess: false,
            message: errors.array()[0].msg,
        });
    }

    const { product_name, product_description, product_price, product_category, product_used_for, product_details = [] } = req.body;

    try {
        const productDoc = await Product.create({
            name: product_name,
            description: product_description,
            price: product_price,
            category: product_category,
            usedFor: product_used_for,
            details: product_details,
            seller: req.userId, // from middleware
        });

        return res.status(201).json({
            isSuccess: true,
            message: "Product added to sell list.",
            productDoc
        });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: error.message
        });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const productDoc = await Product.find({ seller: req.userId }).sort({ createdAt: -1 })

        return res.status(200).json({
            isSuccess: true,
            productDoc
        });
    } catch (error) {
        return res.status(422).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.getOldProduct = async (req, res) => {
    try {
        const productDoc = await Product.findOne({ _id: req.params.id })

        return res.status(200).json({
            isSuccess: true,
            productDoc
        });
    } catch (error) {
        return res.status(404).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            isSuccess: false,
            message: errors.array()[0].msg,
        });
    }

    const { product_name, product_description, product_price, product_category, product_used_for, product_details, seller_id, product_id } = req.body;

    try {
        if (req.userId.toString() !== seller_id) {
            throw new Error("Authorization Failed")
        }

        const productDoc = await Product.findOne({ _id: product_id })
        productDoc.name = product_name;
        productDoc.description = product_description;
        productDoc.category = product_category;
        productDoc.price = product_price;
        productDoc.usedFor = product_used_for;
        productDoc.details = product_details;

        productDoc.save()

        return res.status(200).json({
            isSuccess: true,
            message: "Product details are updated",
            productDoc
        });
    } catch (error) {
        return res.status(422).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const productDoc = await Product.findOne({ _id: id })

        if (!productDoc) {
            return res.status(404).json({
                isSuccess: false,
                message: "Product not found."
            });
        }

        if (req.userId.toString() !== productDoc.seller.toString()) {
            throw new Error("Authorization Failed")
        }

        if (productDoc.images && Array.isArray(productDoc.images)) {
            // https://res.cloudinary.com/dgyvgsue4/image/upload/v1736780993/mu59fgom.jpg
            // mu59fgom.jpg
            // mu59fgom
            const deletePromis = productDoc.images.map(img => {
                const publicId = img.substring(img.lastIndexOf("/") + 1, img.lastIndexOf("."));
                return new Promise((resolve, reject) => {
                    cloudinary.uploader.destroy(publicId, (err, result) => {
                        if (err) {
                            reject(new Error("Destroy Failed."))
                        } else {
                            resolve(result)
                        }
                    })
                })
            })

            await Promise.all(deletePromis);
        }

        await Product.findByIdAndDelete(id)
        return res.status(202).json({
            isSuccess: true,
            message: "Product destroyed.",
        });
    } catch (error) {
        return res.status(422).json({
            isSuccess: false,
            message: error.message
        });
    }
}

// uploadImage
exports.uploadProductImages = async (req, res) => {
    const productImages = req.files;
    const productId = req.body.product_id
    let secureUrlArray = []

    try {
        productImages.forEach(img => {
            cloudinary.uploader.upload(img.path, async (err, result) => {
                if (!err) {
                    const url = result.secure_url;
                    secureUrlArray.push(url)

                    if (productImages.length === secureUrlArray.length) {
                        await Product.findByIdAndUpdate(productId, { $push: { images: secureUrlArray } })
                        return res.status(200).json({
                            isSuccess: true,
                            message: "Product Image saved.",
                            secureUrlArray
                        });
                    }
                } else {
                    throw new Error("Cloud upload Failed!")
                }
            })
        })
    } catch (err) {
        return res.status(404).json({
            isSuccess: false,
            message: err.message
        });
    }
}