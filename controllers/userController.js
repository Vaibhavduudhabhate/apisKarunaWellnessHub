import studentModel from "../model/studentModel.js";
import bcrypt from 'bcrypt';

export const registerController = async (req, res) => {
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
}

export const loginController = async (req, res) => {
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
}

export const dashboardAuthorizationController = (req, res) => {
    return res.json({ valid: true, message: "authorized" })
}