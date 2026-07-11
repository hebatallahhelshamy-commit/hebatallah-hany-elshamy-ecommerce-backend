const Product = require("../models/Product");

// 1. إضافة منتج جديد
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 2. جلب كل المنتجات مع الـ populate
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};