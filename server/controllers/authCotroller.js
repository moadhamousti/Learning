// server/controllers/authController.js
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('Test is working');
};

const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: 'Password is required and should be at least 6 characters' });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: 'Email is already taken' });
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            password: hashedPassword,
            email,
            isAdmin: false
        });

        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'No user found with this email' });
        }

        const match = await comparePassword(password, user.password);
        if (match) {
            const token = jwt.sign(
                { email: user.email, id: user._id, name: user.name, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                { expiresIn: '1h' } // Token expiration
            );
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,  // Set to true by default
                sameSite: 'None'
            });
            return res.json({ email: user.email, id: user._id, name: user.name, isAdmin: user.isAdmin }); // Return user details
        } else {
            return res.status(401).json({ error: 'Password does not match' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }
};



const getProfile = (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(401).json({ error: 'Invalid token' });
            }
            res.json(user); // Send user data
        });
    } else {
        res.status(401).json({ error: 'No token provided' });
    }
};


const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser
};