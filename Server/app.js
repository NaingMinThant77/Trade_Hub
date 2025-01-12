const express = require("express");
const cors = require("cors");
require("./config/db"); // Modularized DB connection
const bodyParser = require("body-parser")

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// routes
const authRoutes = require("./routes/auth");
app.use(authRoutes);

const productRoutes = require("./routes/product");
app.use(productRoutes);

app.listen(4000, () => {
    console.log("Server is running at port 4000");
});
