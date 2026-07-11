const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Database Connected");
  })
  .catch((err) => {
    console.log("Name:", err.name);
    console.log("Message:", err.message);
  });

// Middleware
app.use(express.json());

// categories
const categoryRoutes = require("./routes/categoryRoutes");
app.use("/categories", categoryRoutes);

// products
const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

// cart
const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

// orders
const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);




app.get("/", (req, res) => {
  res.send("API is running");
});

console.log("🔥 APP FILE LOADED SUCCESSFULLY");

const globalErrorHandler = require("./config/db");


app.use(globalErrorHandler);

module.exports = app;
