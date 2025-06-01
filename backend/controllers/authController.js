const User = require('../models/User');
const { generateToken } = require('../config/auth');

exports.register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const user = new User({ username, password, email, role });
        await user.save();

        const token = generateToken(user);
        res.status(201).json({ token, user: { id: user._id, username, email, role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};