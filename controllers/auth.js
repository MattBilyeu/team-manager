const mongoose = require('mongoose');
const User = require('../models/user');

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const foundUser = await User.findOne({ email: email }).populate('teamId');
        if (!foundUser || foundUser.password !== password) {
            return res.status(401).json({message: 'Email/Password Combination Not Found'})
        }
        req.session.isLoggedIn = true;
        req.session.role = foundUser.role;
        return res.status(200).json(foundUser)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ message: 'An error occurred' });
    }
}