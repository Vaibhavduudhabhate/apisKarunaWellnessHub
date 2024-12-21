import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import studentModel from "../model/studentModel.js";

export const authorize = async (req, res, next) => {
    console.log('entered')
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authorization token is required' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, 'jwt-access-token-secret-key'); // Replace with your actual secret key
        const userId = decoded.userId;

        if (!userId || !isValidObjectId(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        const user = await studentModel.exists({ _id: userId });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }

        // Attach the userId to the request object for use in controllers
        req.userId = userId;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        return res.status(500).json({ success: false, message: 'Server error', error: err.message });
    }
};
