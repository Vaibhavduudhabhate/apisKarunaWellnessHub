import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import studentModel from "./model/studentModel.js"
import crypto, { verify } from 'crypto';
import bcrypt from 'bcrypt';
import { addToCartController, decreaseQuantityController, getCartController, removeCartItemController } from "./controllers/addTocartController.js";
import { dashboardAuthorizationController, loginController, registerController } from "./controllers/userController.js";
import { getAllProductsController, getSingleProductController } from "./controllers/productsController.js";
import { resetPasswordController, sendPasswordLinkController, verifyResetPasswordUserController } from "./controllers/forgotPasswordController.js";
import { authorize } from "./middleware/authorization.js";

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
        methods: ['POST', 'GET', 'PATCH' , 'DELETE' ,'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));


// const emailUser = 'dudhabhatevaibhav@gmail.com'
// const emailPass = 'uhmidniafrsfspqj'

// Forgot Password Logic starts Here
app.post("/sendpasswordlink", sendPasswordLinkController);

app.get("/forgotpassword/:id/:token", verifyResetPasswordUserController);

app.post("/:id/:token", resetPasswordController)
// Forgot Password Logic ends Here


// Register and login starts Here
app.post('/register', registerController);


app.post('/login', loginController);
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

app.get('/dashboard', verifyuser, dashboardAuthorizationController)
// Products Logic Starts here
app.get('/allproducts', getAllProductsController)

app.get('/product/:id', getSingleProductController);
// Products Logic ends here

// Add to cart logic start here
app.post('/add_to_cart',authorize, addToCartController);

app.get('/get_cart',authorize,getCartController)

app.patch("/decrease_quantity",authorize,decreaseQuantityController)

app.delete('/remove_item',authorize,removeCartItemController)
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

