import { isValidObjectId } from "mongoose";
import cartModel from "../model/cartModel.js";
import productModel from "../model/productModel.js";
import studentModel from "../model/studentModel.js";
import crypto, { verify } from 'crypto';
import jwt from "jsonwebtoken";
import kitModel from "../model/kitModel.js";

export const addToCartController = async (req, res) => {
    try {
        const userId = req.userId;
        // Validate the product
        const productId = req.body.productId;

        if (productId) {
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }

        }

        //validate the kits
        const kitId = req.body.kitId;

        if (kitId) {
            const kits = await kitModel.findById(kitId);
            if (!kits) {
                return res.status(404).json({ success: false, message: 'kit not found' });
            }
        }
        // Check for existing cart and update or create it
        let cart = await cartModel.findOne({ userId });

        if (cart) {
            let itemIndex;
            let kitIndex;
            if (productId) {
                itemIndex = cart.products.findIndex((p) => p.productId == productId);
                if (itemIndex > -1) {
                    let productItem = cart.products[itemIndex];
                    productItem.quantity += 1;
                    cart.products[itemIndex] = productItem;
                } else {
                    cart.products.push({ productId, quantity: 1 });
                }
            }
            if (kitId) {
                kitIndex = cart.kits.findIndex((K) => K.kitId == kitId)
                console.log("entered if")
                if (kitIndex > -1) {
                    let kitsItem = cart.kits[kitIndex];
                    kitsItem.quantity += 1;
                    cart.kits[kitIndex] = kitsItem;
                } else {
                    console.log("entered else")
                    cart.kits.push({ kitId, quantity: 1 });
                }
            }
            console.log(kitIndex, itemIndex)

            let cartWithProductDetails = [];
            let cartWithkitsDetails = [];
            if (productId) {
                if (cart.products && cart.products.length > 0) {
                    cartWithProductDetails = await Promise.all(
                        cart.products.map(async (item) => {
                            const productDetails = await productModel.findById(item.productId);
                            return { ...item._doc, productDetails };
                        })
                    );
                    cartWithkitsDetails = cart.kits
                }
            }
            if (kitId) {
                cartWithkitsDetails = await Promise.all(
                    cart.kits.map(async (item) => {
                        const kitsDetails = await kitModel.findById(item.kitId);
                        return { ...item._doc, kitsDetails };
                    })
                );
                cartWithProductDetails = cart.products
            }

            cart = await cart.save();
            const total = cartWithProductDetails.length + cartWithkitsDetails.length

            return res.status(200).json({
                success: true,
                message: 'Cart updated successfully',
                updatedCart: { ...cart._doc, products: cartWithProductDetails, kits: cartWithkitsDetails, total: total }
            });
        } else {
            let newCart;

            if (productId && kitId) {
                newCart = await cartModel.create({
                    userId,
                    products: [{ productId, quantity: 1 }],
                    kits: [{ kitId, quantity: 1 }],
                });
            } else if (kitId) {
                newCart = await cartModel.create({
                    userId,
                    kits: [{ kitId, quantity: 1 }],
                });
            } else if (productId) {
                newCart = await cartModel.create({
                    userId,
                    products: [{ productId, quantity: 1 }],
                });
            }

            const productDetails = productId ? await productModel.findById(productId) : null;
            const kitsDetails = kitId ? await kitModel.findById(kitId) : null;
            let total = 1

            const response = {
                success: true,
                message: 'Cart created successfully',
                total: total,
                newCart: {
                    ...newCart._doc,
                    ...(productId && { products: [{ ...newCart.products[0]._doc, productDetails }] }),
                    ...(kitId && { kits: [{ ...newCart.kits[0]._doc, kitsDetails }] }),
                },
            };

            return res.status(201).json(response);
        }
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
}

export const getCartController = async (req, res) => {
    try {
        const userId = req.userId;

        let cart = await cartModel.findOne({ userId: userId });

        if (!cart) {
            return res
                .status(404)
                .send({ status: false, message: "Cart not found for this user" });
        }

        const cartWithProductDetails = await Promise.all(
            cart.products.map(async (item) => {
                const productDetails = await productModel.findById(item.productId);
                // console.log(productDetails)
                if (!productDetails) {
                    return { ...item._doc, productDetails: null };
                }
                return { ...item._doc, productDetails };
            })
        );

        const cartWithKitsDetails = await Promise.all(
            cart.kits.map(async (item) => {
                const kitsDetails = await kitModel.findById(item.kitId);
                if (!kitsDetails) {
                    return { ...item._doc, kitsDetails: null };
                }
                return { ...item._doc, kitsDetails };
            })
        );

        const total = cartWithProductDetails.length + cartWithKitsDetails.length;

        res.status(200).send({
            status: true,
            cart: {
                ...cart._doc,
                products: cartWithProductDetails,
                kits: cartWithKitsDetails,
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

export const decreaseQuantityController = async (req, res) => {
    try {
        const userId = req.userId;
        let productId = req.body.productId;
        let kitId = req.body.kitId;

        let cart = await cartModel.findOne({ userId: userId });
        let total = cart.products.length + cart.kits.length
        if (!cart) {
            return res
                .status(404)
                .send({ status: false, message: "Cart not found for this user" });
        }
        if (productId) {
            let itemIndex = cart.products.findIndex((p) => p.productId == productId);

            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                productItem.quantity -= 1;
                cart.products[itemIndex] = productItem;
                if (productItem.quantity == 0) {
                    cart.products.splice(itemIndex, 1);
                    cart = await cart.save();
                }
                let total = cart.products.length + cart.kits.length
                cart = await cart.save();
                return res.status(200).send({ status: true, updatedCart: { ...cart._doc, total: total } });
            }
        }
        if (kitId) {
            let kitIndex = cart.kits.findIndex((K) => K.kitId == kitId);

            if (kitIndex > -1) {
                let kitsItem = cart.kits[kitIndex];
                kitsItem.quantity -= 1;
                cart.kits[kitIndex] = kitsItem;
                if (kitsItem.quantity == 0) {
                    cart.kits.splice(kitIndex, 1);
                    cart = await cart.save();
                }
                let total = cart.products.length + cart.kits.length
                cart = await cart.save();
                return res.status(200).send({ status: true, updatedCart: { ...cart._doc, total: total } });
            }
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

export const removeCartItemController = async (req, res) => {
    try {
        const userId = req.userId;
        let productId = req.body.productId;
        let kitId = req.body.kitId;

        let cart = await cartModel.findOne({ userId: userId });

        if (!cart) {
            return res
                .status(404)
                .send({ status: false, message: "Cart not found for this user" });
        }

        if (productId) {
            let itemIndex = cart.products.findIndex((p) => p.productId == productId);
            if (itemIndex > -1) {
                cart.products.splice(itemIndex, 1);
                let total = cart.products.length + cart.kits.length
                cart = await cart.save();
                return res.status(200).send({ status: true, updatedCart: { ...cart._doc, total: total } });
            }
        }
        if (kitId) {
            let kitIndex = cart.kits.findIndex((K) => K.kitId == kitId);
            if (kitIndex > -1) {
                cart.kits.splice(kitIndex, 1);
                let total = cart.products.length + cart.kits.length
                cart = await cart.save();
                return res.status(200).send({ status: true, updatedCart: { ...cart._doc, total: total } });
            }
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