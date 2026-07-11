const Cart = require("../models/Cart");
const Product = require("../models/Product");

// إضافة منتج للسلة وحساب الإجمالي تلقائيًا
exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        // التأكد إن المنتج موجود فعلاً وجلب سعره
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "المنتج غير موجود" });
        }

        // هنجيب السلة (بما إن مفيش نظام تسجيل دخول حالياً، هنجيب أول سلة في الداتابيز أو نكريت واحدة)
        let cart = await Cart.findOne();
        if (!cart) {
            cart = await Cart.create({ items: [], totalPrice: 0 });
        }

        // التأكد لو المنتج موجود قبل كده في السلة عشان نزود الكمية بس
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        // 👈 حساب الإجمالي تلقائياً (الكمية × السعر) لكل المنتجات اللي في السلة
        let total = 0;
        for (let item of cart.items) {
            const prod = await Product.findById(item.product);
            total += item.quantity * prod.price;
        }
        cart.totalPrice = total;

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        next(error); // هيبعت الخطأ لملف الأخطاء (db.js) اللي عملناه زى المستر!
    }
};