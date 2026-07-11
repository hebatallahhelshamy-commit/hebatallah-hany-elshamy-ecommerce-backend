const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "اسم المنتج مطلوب"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "سعر المنتج مطلوب"]
    },
    description: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", 
        required: [true, "المنتج يجب أن ينتمي لتصنيف معين"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);