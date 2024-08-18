const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const JWT_SECRET = 'your_secret_key_here';

const register = async(req, res) => {
    try {
        const {name, email, password, repeatPassword } = req.body;

        if( password != repeatPassword ){
            return res.status(400).json({message: 'Password do not match!!!'})
        } 
          
        // პაროლის ჰეშირება
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
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

        // console.log('Password matched, generating token');
        
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated successfully');
        res.json({ token });

    } catch (error) {
        console.log(req.body)
        res.status(500).json({ message: 'Error logging in' });
    }
}

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
}


module.exports = {
    register, 
    userLogin,
    auth 
}


// {
//    "name": "jibsi",
//    "email": "jibsitest@test.com",
//    "password": "jibsigurami123456",
//    "repeatPassword": "jibsigurami123456"
// }

// {
// 	"email": "test@test.com",
// 	"password": "gurami123456"
// }