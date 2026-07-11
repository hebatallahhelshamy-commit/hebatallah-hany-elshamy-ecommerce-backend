const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// 1. الاتصال بقاعدة البيانات
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database Connected");
  })
  .catch((err) => {
    console.log("Name:", err.name);
    console.log("Message:", err.message);
  });

// 2. الـ Middleware الأساسي لقراءة الـ JSON
app.use(express.json());

// 3. استدعاء الـ Routes 
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes"); // 👈 ضفنا السطر ده هنا مع زمايله فوق

// 4. ربط الـ Routes بالسيرفر
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes); // 👈 ضفنا السطر ده هنا مع زمايله تحت

// 5. الـ Route الأساسي للتأكد أن السيرفر شغال
app.get("/", (req, res) => {
  res.send("API is running");
});

console.log("🔥 APP FILE LOADED SUCCESSFULLY");

// استدعاء ملف الأخطاء من فولدر الـ config
const globalErrorHandler = require("./config/db");

// تشغيله كـ Middleware في آخر السيرفر دايماً
app.use(globalErrorHandler);

module.exports = app;