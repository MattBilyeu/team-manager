const mongoose = require('mongoose');
const User = require('../models/user');

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email}).populate('teamId')
        .then(foundUser => {
            if (!foundUser || foundUser.password !== password) {
                return res.status(401).json({message: 'Email/Password Combination Not Found'})
            }
            req.session.isLoggedIn = true;
            req.session.loginId = foundUser._id;
            req.session.role = foundUser.role;
            req.session.team = foundUser.teamId;
            return res.status(200).json(foundUser)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'An error occurred' });
        })
}