const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const register = async(req, res) => {
    try {
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
}

const userLogin = async(req, res) => {

    try {
        const {email, password} = req.body;
        const user = await User.findOne({ email })

        if(!user){
            return res.status(400).json({ message: 'Invalid credentails'});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('Password matched, generating token');
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
      
        const JWT_SECRET = 'your_secret_key_here';
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated successfully');
        res.json({ token });

    } catch (error) {
        console.log(req.body)
        res.status(500).json({ message: 'Error logging in' });
    }
}

module.exports = {register, userLogin}