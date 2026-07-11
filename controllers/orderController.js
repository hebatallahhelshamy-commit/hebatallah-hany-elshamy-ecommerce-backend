const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.checkout = async (req, res, next) => {
    try {
        const cart = await Cart.findOne();
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "سلة المشتريات فارغة" });
        }

        const order = await Order.create({
            items: cart.items,
            totalPrice: cart.totalPrice
        });

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