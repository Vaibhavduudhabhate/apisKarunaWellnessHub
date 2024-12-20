import studentModel from "../model/studentModel.js";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
const jwt_secret = 'jsknkjfdkjshdkfjhs'
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

export const sendPasswordLinkController = async (req, res) => {
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

}

export const verifyResetPasswordUserController = async (req, res) => {
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
}

export const resetPasswordController = async (req, res) => {
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
}