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

const jwt_secret = 'jsknkjfdkjshdkfjhs'
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: POST, GET, OPTIONS
// Access-Control-Allow-Headers: Content-Type
const app = express();
app.use(cookieParser())
app.use(express.json())
app.set("view engine",'ejs')
app.use(express.urlencoded({extended:false}));
app.use(cors(
    {
        origin:"*",
        
        credentials:true,
        // credentials: true,
    // Set the allowed HTTP methods
    methods: ['POST', 'GET', 'OPTIONS'],
    // Set the allowed headers
    allowedHeaders: ['Content-Type']
    }
));


// const emailUser = process.env.EMAIL_USER;
// const emailPass = process.env.EMAIL_PASS;

const emailUser ='dudhabhatevaibhav@gmail.com'
const emailPass = 'uhmidniafrsfspqj'

// 20/nov
// app.post('/forgotPassword',async(req,res)=>{
//     const email = req.body.email;
//     // console.log(req.body.email ,email)
//     try {
//         const olduser = await studentModel.findOne({email});
//         console.log(olduser)
//         if(!olduser){
//             return res.json({status:"user not exists"})
//         }
//         const secret = jwt_secret + olduser.password;
//         const token = jwt.sign({email : olduser.email ,id:olduser._id},secret,{expiresIn : '5m'});
//         const link = `https://apiskarunawellnesshub.onrender.com/resetPassword/${olduser._id}/${token}`;
//         console.log('link',link)
//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: 'dudhabhatevaibhav@gmail.com',
//               pass: 'uhmidniafrsfspqj'
//             }
//           });
          
//           var mailOptions = {
//             from: emailUser,
//             to:email,
//             subject: 'Sending Email using Node.js',
//             // text: `${link}`,
//             html: `<p>Click this Link  <a href="${link}">here to forgot password </a> to visit the link.</p>`,
//           };
          
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//               console.log(error);
//             } else {
//               console.log('Email sent: ' + info.response);
//             }
//           });
//         res.send(link)
//     } catch (error) {
//         console.log(error)
//     }
// })

// 20/nov

// app.get("/resetPassword/:id/:token",async(req,res)=>{
//     const {id,token} = req.params;
//     // console.log(req.params);
//     const olduser = await studentModel.findOne({_id : id});
//         console.log(olduser)
//         if(!olduser){
//             return res.json({status:"user not exists"})
//         }
//         const secret = jwt_secret + olduser.password;
//         try {
//             const verify = jwt.verify(token,secret)
//             res.render('index',{email:verify.email,status:'Not verified'})
//             // res.send("verified")
//         } catch (error) {
//             console.log(error)
//             res.send('not Verified')
//         }
// })


// app.post("/resetPassword/:id/:token", async (req, res) => {
//     const { id, token } = req.params;
//     const { password } = req.body;

//     try {
//         const oldUser = await studentModel.findOne({ _id: id });
//         if (!oldUser) {
//             return res.status(404).json({ status: "user not found" });
//         }
//         const secret = jwt_secret + oldUser.password;
//         jwt.verify(token, secret, async (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ status: "token verification failed" });
//             }

//             await studentModel.updateOne(
//                 { _id: id },
//                 { $set: { password: password } }  
//             );

//             res.render("index",{ email:verify.email,status:'verified'})
//         });
//     } catch (error) {
//         console.error("Error resetting password:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// 20/nov
app.post("/resetPassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ status: "Passwords do not match" });
    }

    try {
        const user = await studentModel.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ status: "User not found" });
        }

        const secret = jwt_secret + user.password;

        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ status: "Invalid or expired token" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await studentModel.updateOne(
                { _id: id },
                { $set: { password: hashedPassword } }
            );

            res.json({ status: "Password updated successfully" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Internal server error" });
    }
});

app.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;
    console.log(emailUser)
    try {
        const user = await studentModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "User does not exist" });
        }

        const secret = jwt_secret + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '15m' });
        const link = `https://apiskarunawellnesshub.onrender.com/resetPassword/${user._id}/${token}`;
        console.log("Link",link)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        const mailOptions = {
            from: emailUser,
            to: email,
            subject: 'Password Reset Link',
            html: `<p>Click this <a href="${link}">link</a> to reset your password. This link is valid for 15 minutes.</p>`,
        };

        await transporter.sendMail(mailOptions);
        res.json({ status: "Password reset link sent to your email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Failed to send reset email" });
    }
});

// 20/nov 


//   app.post('/forgot-password', (req, res) => {
//     const { email } = req.body;
  
//     // Generate a unique reset token
//     const resetToken = crypto.randomBytes(20).toString('hex');
    
//     // Save the token to the user's document in the database
//     studentModel.findOneAndUpdate(
//       { email },
//       { resetToken, resetTokenExpiry: Date.now() + 3600000 }, // Token expires in 1 hour
//       { new: true }
//     ).then(user => {
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Send email with password reset link
//     //   const resetLink = `http://localhost:3002/reset-password/${resetToken}`;
//       const resetLink = `https://apiskarunawellnesshub.onrender.com/reset-password/${resetToken}`;

//     //   https://apiskarunawellnesshub.onrender.com
//       const mailOptions = {
//         from: 'dudhabhatevaibhav@gmail.com',
//         to: email,
//         subject: 'Password Reset Link',
//         text: `Click on this link to reset your password: ${resetLink}`
//       };
  
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           return res.status(500).json({ message: 'Failed to send email' });
//         }
//         console.log('Email sent: ' + info.response);
//         res.json({ message: 'Password reset link sent to your email' });
//       });
//     }).catch(err => res.status(500).json(err));
//   });
  

//   app.post('/reset-password/:token', (req, res) => {
//     const { token } = req.params;
//     const { newPassword } = req.body;
  
//     studentModel.findOneAndUpdate(
//       { resetToken: token, resetTokenExpiry: { $gt: Date.now() } },
//       { password: newPassword, resetToken: null, resetTokenExpiry: null },
//       { new: true }
//     ).then(user => {
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid or expired token' });
//       }
//       res.json({ message: 'Password reset successfully' });
//     }).catch(err => res.status(500).json(err));
//   });

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

        // Generate JWT tokens
        const accessToken = jwt.sign({ email }, 'jwt-access-token-secret-key', { expiresIn: '1d' });
        const refreshToken = jwt.sign({ email }, 'jwt-refresh-token-secret-key', { expiresIn: '5d' });

        // Set cookies for tokens
        res.cookie('accessToken', accessToken, { maxAge: 86400000, httpOnly: true, secure: true, sameSite: 'strict' });
        res.cookie('refreshToken', refreshToken, { maxAge: 432000000, httpOnly: true, secure: true, sameSite: 'strict' });

        return res.json({ success: true, message: 'Login successful', user: { _id: user._id, name: user.name, email: user.email ,token:accessToken } });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
});

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

const verifyuser = (req,res,next) =>{
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        if(renewToken(req,res)){
            next()
        }
    }else{
        jwt.verify(accessToken,'jwt-access-token-secret-key',(err,decoded)=>{
            if(err){
                return res.json({valid:false,message:'Invalid Token'})
            }else{
                req.email = decoded.email
                next()
            }
        })
    }
}

const renewToken = (req,res) =>{
    const refreshToken = req.cookies.refreshToken;
    let exit = false
    if(!refreshToken){
        return res.json({valid:false,message:"no refresh token"})
    }else{
        jwt.verify(refreshToken,'jwt-refresh-token-secret-key',(err,decoded)=>{
            if(err){
                return res.json({valid:false,message:'Invalid refresh Token'})
            }else{
                const accessToken = jwt.sign({email : decoded.email},
                    'jwt-access-token-secret-key',{expiresIn:'1m'});
                res.cookie('accessToken',accessToken ,{maxAge:60000});
                    exit = true;
            }
        })
    }
    return exit;
}

app.get('/dashboard',verifyuser,(req,res)=>{
    return res.json({valid:true,message:"authorized"})
})

app.get('/allproducts',(req,res)=>{
    productModel.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err));
})

app.get('/product/:id', (req, res) => {
    const productId = req.params.id; // Get the product ID from the URL parameter
    
    productModel.findById(productId)
        .then(product => {
            if (product) {
                res.json(product); // Return the product if found
            } else {
                res.status(404).json({ message: "Product not found" }); // Return 404 if not found
            }
        })
        .catch(err => res.status(500).json({ error: "Error retrieving product", details: err }));
});

async function connectMongoDb(url){
    return mongoose.connect(url)
}
connectMongoDb('mongodb+srv://admin:admin1234@cluster0.w3huoar.mongodb.net/practiceDatabase').then(()=>console.log("mongodb connected"))

export default{
    connectMongoDb,
}



app.listen(3001 ,()=>{
    console.log("server is running");
})

