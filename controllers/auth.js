const mongoose = require('mongoose');
const team = require('../models/team');

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const teamName = req.body.teamName;
    team.findOne({title: teamName})
        .then(team => {
            if(!team) {
                return res.status(400).json({ message: 'Team not found' });
            };
            const user = team.users.find(p => p.email === email);
            if (!user || user.password !== password) {
                return res.status(401).json({message: 'Email/Password Combination Not Found'})
            } else {
                req.session.team = team;
                req.session.isLoggedIn = true;
                return res.status(200).json({message: 'Login Successful'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'An error occurred' });
        });    
}