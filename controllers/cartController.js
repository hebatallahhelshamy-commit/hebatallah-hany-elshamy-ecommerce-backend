const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "المنتج غير موجود" });
        }

        let cart = await Cart.findOne();
        if (!cart) {
            cart = await Cart.create({ items: [], totalPrice: 0 });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        let total = 0;
        for (let item of cart.items) {
            const prod = await Product.findById(item.product);
            total += item.quantity * prod.price;
        }
        cart.totalPrice = total;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};