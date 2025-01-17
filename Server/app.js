const express = require("express");
const cors = require("cors");
require("./config/db"); // Modularized DB connection
const bodyParser = require("body-parser")

const multer = require("multer")

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

const fileFilterConfigure = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/jfif") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storageConfigure = multer.diskStorage({
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '_' + file.originalname);
    },
});

app.use(multer({ storage: storageConfigure, fileFilter: fileFilterConfigure }).array("product_images"));

// routes
const authRoutes = require("./routes/auth");
app.use(authRoutes);

const productRoutes = require("./routes/product");
app.use(productRoutes);

app.listen(4000, () => {
    console.log("Server is running at port 4000");
});
