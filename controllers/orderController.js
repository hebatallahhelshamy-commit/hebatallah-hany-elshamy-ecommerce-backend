const Order = require("../models/Order");
const Cart = require("../models/Cart");

// إتمام الشراء وتحويل السلة لطلب رسمي
exports.checkout = async (req, res, next) => {
    try {
        // 1. هنجيب السلة الحالية بالمنتجات اللي جواها
        const cart = await Cart.findOne();
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "سلة المشتريات فارغة" });
        }

        // 2. إنشاء الـ Document (الفاتورة) server-side للطلب الجديد
        const order = await Order.create({
            items: cart.items,
            totalPrice: cart.totalPrice
        });

        // 3. مسح محتويات السلة بعد ما الشراء تم بنجاح
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({
            message: "تم تسجيل الطلب بنجاح وعمل الفاتورة!",
            order
        });
    } catch (error) {
        next(error);
    }
};