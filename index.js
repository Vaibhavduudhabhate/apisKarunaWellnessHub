import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import studentModel from "./model/studentModel.js"
import productModel from "./model/productModel.js";
import nodemailer from 'nodemailer';
import crypto, { verify } from 'crypto';
import bcrypt from 'bcrypt';
import cartModel from "./model/cartModel.js";
import { isValidObjectId } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const jwt_secret = 'jsknkjfdkjshdkfjhs'
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: POST, GET, OPTIONS
// Access-Control-Allow-Headers: Content-Type
const app = express();
app.use(cookieParser())
app.use(express.json())
app.set("view engine", 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(cors(
    {
        origin: "*",
        credentials: true,
        methods: ['POST', 'GET', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));


const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// const emailUser = 'dudhabhatevaibhav@gmail.com'
// const emailPass = 'uhmidniafrsfspqj'

// Forgot Password Logic starts Here
app.post("/sendpasswordlink", async (req, res) => {
    console.log(req.body)

    const { email } = req.body;

    if (!email) {
        res.status(401).json({ status: 401, message: "Enter Your Email" })
    }

    try {
        const userfind = await studentModel.findOne({ email: email });
        console.log(userfind._id)
        // token generate for reset password
        const token = jwt.sign({ _id: userfind._id }, jwt_secret, {
            expiresIn: "300s"
        });
        console.log(token)
        // const setusertoken = await studentModel.findByIdAndUpdate({_id:userfind._id},{verifytoken:token});


        if (token) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: emailUser,
                    pass: emailPass,
                },
            });
            const mailOptions = {
                from: emailUser,
                to: email,
                subject: "Sending Email For password Reset",
                text: `This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind._id}/${token}`
            }
            console.log(mailOptions)
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(401).json({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    res.status(201).json({ status: 201, message: "Email sent Succsfully" })
                }
            })

        }

    } catch (error) {
        res.status(400).json({ status: 400, message: "invalid user" })
    }

});

app.get("/forgotpassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    try {
        const validuser = await studentModel.findOne({ _id: id });

        const verifyToken = jwt.verify(token, jwt_secret);

        console.log("verifyToken",verifyToken)

        if (validuser && verifyToken._id) {
            res.status(201).json({ status: 201, validuser })
        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }

    } catch (error) {
        res.status(400).json({ status: 400, error })
    }
});

app.post("/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    const { password } = req.body;

    try {
        const validuser = await studentModel.findOne({ _id: id });

        const verifyToken = jwt.verify(token, jwt_secret);


        if (validuser && verifyToken._id) {
            const newpassword = await bcrypt.hash(password, 10);

            const setnewuserpass = await studentModel.findByIdAndUpdate({ _id: id }, { password: newpassword });

            setnewuserpass.save();
            res.status(201).json({ status: 201, setnewuserpass })

        } else {
            res.status(401).json({ status: 401, message: "user not valid" })
        }
    } catch (error) {
        res.status(400).json({ status: 400, error })
    }
})
// Forgot Password Logic ends Here


// Register and login starts Here
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if a user with the given email already exists
        const existingUser = await studentModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await studentModel.create({
            name,
            email,
            password: hashedPassword, // Save the hashed password
        });

        return res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await studentModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ email, userId: user._id }, 'jwt-access-token-secret-key', { expiresIn: '1d' });
        const refreshToken = jwt.sign({ email, userId: user._id }, 'jwt-refresh-token-secret-key', { expiresIn: '5d' });

        res.cookie('accessToken', accessToken, { maxAge: 86400000, httpOnly: true, secure: true, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { maxAge: 432000000, httpOnly: true, secure: true, sameSite: 'strict' });

        return res.json({ success: true, message: 'Login successful', user: { _id: user._id, name: user.name, email: user.email, token: accessToken } });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});
// Register and login ends Here

async function hashExistingPasswords() {
    const users = await studentModel.find({});
    for (const user of users) {
        if (!user.password.startsWith("$2b$")) { // Check if already hashed
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await studentModel.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
        }
    }
    console.log("Rehashed passwords for all users");
}

hashExistingPasswords();

const verifyuser = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        if (renewToken(req, res)) {
            next()
        }
    } else {
        jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: 'Invalid Token' })
            } else {
                req.email = decoded.email
                next()
            }
        })
    }
}

const renewToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    let exit = false
    if (!refreshToken) {
        return res.json({ valid: false, message: "no refresh token" })
    } else {
        jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err, decoded) => {
            if (err) {
                return res.json({ valid: false, message: 'Invalid refresh Token' })
            } else {
                const accessToken = jwt.sign({ email: decoded.email },
                    'jwt-access-token-secret-key', { expiresIn: '1m' });
                res.cookie('accessToken', accessToken, { maxAge: 60000 });
                exit = true;
            }
        })
    }
    return exit;
}

app.get('/dashboard', verifyuser, (req, res) => {
    return res.json({ valid: true, message: "authorized" })
})
// Products Logic Starts here
app.get('/allproducts', (req, res) => {
    productModel.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err));
})

app.get('/product/:id', (req, res) => {
    const productId = req.params.id; 
    productModel.findById(productId)
        .then(product => {
            if (product) {
                res.json(product); 
            } else {
                res.status(404).json({ message: "Product not found" }); 
            }
        })
        .catch(err => res.status(500).json({ error: "Error retrieving product", details: err }));
});
// Products Logic ends here

// Add to cart logic start here
app.post('/add_to_cart', async (req, res) => {
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
});

app.get('/get_cart', async (req, res) => {
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
})

app.patch("/decrease_quantity", async (req, res) => {
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
})

app.delete('/remove_item', async (req, res) => {
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
})
// Add to cart logic ends here
async function connectMongoDb(url) {
    return mongoose.connect(url)
}
connectMongoDb('mongodb+srv://admin:admin1234@cluster0.w3huoar.mongodb.net/practiceDatabase').then(() => console.log("mongodb connected"))

export default {
    connectMongoDb,
}

app.listen(8080, () => {
    console.log("server is running");
})

