import cartModel from "../model/cartModel.js";
import productModel from "../model/productModel.js";
import studentModel from "../model/studentModel.js";
import jwt from "jsonwebtoken";

export const addToCartController = async(req,res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authorization token is required' });
        }

        const token = authHeader.split(' ')[1]; 

        const decoded = jwt.verify(token, 'jwt-access-token-secret-key');
        const userId = decoded.userId;

        // Validate the user
        const user = await studentModel.exists({ _id: userId });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        // Validate the product
        const productId = req.body.productId;
        if (!productId) {
            return res.status(400).json({ success: false, message: 'Invalid product' });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check for existing cart and update or create it
        let cart = await cartModel.findOne({ userId });

        if (cart) {
            let itemIndex = cart.products.findIndex((p) => p.productId == productId);

            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                productItem.quantity += 1;
                cart.products[itemIndex] = productItem;
            } else {
                cart.products.push({ productId, quantity: 1 });
            }
            cart = await cart.save();
            // Fetch all products in the cart with details
            const cartWithProductDetails = await Promise.all(
                cart.products.map(async (item) => {
                    const productDetails = await productModel.findById(item.productId);
                    return { ...item._doc, productDetails };
                })
            );

            const total = cartWithProductDetails.length
            console.log(total)

            return res.status(200).json({
                success: true,
                message: 'Cart updated successfully',
                updatedCart: { ...cart._doc, products: cartWithProductDetails, total: total }
            });
        } else {
            const newCart = await cartModel.create({
                userId,
                products: [{ productId, quantity: 1 }],
            });

            const productDetails = await productModel.findById(productId);

            return res.status(201).json({
                success: true,
                message: 'Cart created successfully',
                newCart: {
                    ...newCart._doc,
                    products: [{ ...newCart.products[0]._doc, productDetails }]
                }
            });
        }
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}

export const getCartController = async(req,res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authorization token is required' });
        }

        const token = authHeader.split(' ')[1]; 

        // Verify the token and extract the userId
        const decoded = jwt.verify(token, 'jwt-access-token-secret-key');
        const userId = decoded.userId;

        // Validate the user
        const user = await studentModel.exists({ _id: userId });

        if (!userId || !isValidObjectId(userId) || !user) {
            return res.status(400).send({ status: false, message: "Invalid user ID" });
        }

        let cart = await cartModel.findOne({ userId: userId });

        if (!cart) {
            return res
                .status(404)
                .send({ status: false, message: "Cart not found for this user" });
        }

        const cartWithProductDetails = await Promise.all(
            cart.products.map(async (item) => {
                const productDetails = await productModel.findById(item.productId);
                if (!productDetails) {
                    return { ...item._doc, productDetails: null }; 
                }
                return { ...item._doc, productDetails };
            })
        );

        const total = cartWithProductDetails.length; 

        res.status(200).send({
            status: true,
            cart: {
                ...cart._doc,
                products: cartWithProductDetails,
                total,
            },
        });
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}

export const decreaseQuantityController = async(req,res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authorization token is required' });
        }

        const token = authHeader.split(' ')[1]; // Get the token part after "Bearer"

        // Verify the token and extract the userId
        const decoded = jwt.verify(token, 'jwt-access-token-secret-key');
        const userId = decoded.userId;

        let user = await studentModel.exists({ _id: userId });
        let productId = req.body.productId;

        if (!userId || !isValidObjectId(userId) || !user) {
            return res.status(400).send({ status: false, message: "Invalid user ID" });
        }

        let cart = await cartModel.findOne({ userId: userId });
        let total = cart.products.length
        if (!cart) {
            return res
                .status(404)
                .send({ status: false, message: "Cart not found for this user" });
        }

        let itemIndex = cart.products.findIndex((p) => p.productId == productId);

        if (itemIndex > -1) {
            let productItem = cart.products[itemIndex];
            productItem.quantity -= 1;
            cart.products[itemIndex] = productItem;
            if (productItem.quantity == 0) {
                cart.products.splice(itemIndex, 1);
                cart = await cart.save();
            }
            cart = await cart.save();
            return res.status(200).send({ status: true, updatedCart: { ...cart._doc, total: total } });
        }
        res
            .status(400)
            .send({ status: false, message: "Item does not exist in cart" });
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}

export const removeCartItemController = async(req,res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authorization token is required' });
        }

        const token = authHeader.split(' ')[1]; // Get the token part after "Bearer"

        // Verify the token and extract the userId
        const decoded = jwt.verify(token, 'jwt-access-token-secret-key');
        const userId = decoded.userId;
        let user = await studentModel.exists({ _id: userId });
        let productId = req.body.productId;

        if (!userId || !isValidObjectId(userId) || !user) {
            return res.status(400).send({ status: false, message: "Invalid user ID" });
        }

        let cart = await cartModel.findOne({ userId: userId });

        if (!cart) {
            return res
                .status(404)
                .send({ status: false, message: "Cart not found for this user" });
        }

        let itemIndex = cart.products.findIndex((p) => p.productId == productId);
        if (itemIndex > -1) {
            cart.products.splice(itemIndex, 1);
            cart = await cart.save();
            let total = cart.products.length
            return res.status(200).send({ status: true, updatedCart: { ...cart._doc, total: total } });
        }
        res
            .status(400)
            .send({ status: false, message: "Item does not exist in cart" });
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}