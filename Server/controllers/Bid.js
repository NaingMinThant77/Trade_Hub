const Bid = require("../models/Bid")

exports.savedNewBid = async (req, res) => {
    const { message, phone, product_id, seller_id, buyer_id } = req.body;
    try {

        await Bid.create({
            product_id, seller_id, buyer_id, text: message,
            phone_number: phone
        })
        res.status(201).json({
            isSuccess: true,
            message: "Your bid is placed."
        })
    } catch (error) {
        return res.status(401).json({
            isSuccess: false,
            message: error.message
        });
    }
}

exports.getAllBids = async (req, res) => {
    const { product_id } = req.params;
    try {
        const bidDocs = await Bid.find({ product_id }).select("text phone_number createdAt")
            .populate("buyer_id", "name").sort({createdAt: -1})

        if (!bidDocs || bidDocs.length === 0) {
            throw new Error("No bids are not placed yet")
        }

        return res.status(200).json({
            isSuccess: true,
            bidDocs
        });
    } catch (error) {
        return res.status(500).json({ // multi-reason => 500(server-error)
            isSuccess: false,
            message: error.message
        });
    }
}