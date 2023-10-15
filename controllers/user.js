const User = require('../models/user');
const Team = require('../models/team');

exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password; // Hash and salt passwords for live production
    const role = req.body.role;
    const teamId = req.body.teamId;
    User.findOne({email: email}).then(existingUser => {
        if (existingUser) {
            return res.status(409).json({message: 'A user with that email already exists.'})
        } else {
            team.findById(teamId).then(team => {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    teamId: teamId,
                    primaryTask: 'unassigned',
                    floatTask: 'unassigned'
                });
                newUser.save()
                    .then(result => {
                        console.log('User Created');
                        User.findOne({email: email}).then(user => {
                            team.users.push(newUser._Id);
                            team.save();
                            res.json({message: 'User Created'});
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({message: 'User Creation Failed'})
                    })
                })
            }
        })
}

exports.findUserById = (req, res, next) => {
    const userId = req.body.userId;
    User.findById(userId).then(user => {
            user.password = 'redacted';
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Find User Failed'})
        })
}

exports.changePassword = (req, res, next) => {
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    User.findOne({email: email}).then(user => {
        if (!user || oldPassword !== user.password) {
            return res.status(404).json({message: 'Email/Password Combination Not Found'})
        }
        user.password = newPassword;
        user.save().then(result => res.status(200).json({message: 'Password Updated'}))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Password Update Unsuccessful'})
        })
};

exports.assignTasks = (req, res, next) => {
    const email = req.body.email;
    const primaryTask = req.body.primaryTask;
    const floatTask = req.body.floatTask;
    User.findOne({email: email}).then(user => {
        user.primaryTask = primaryTask;
        user.floatTask = floatTask;
        user.save().then(result => res.status(200).json({message: 'Update Successful'}))
        })
        .catch(err => {
            console.log(err);
            return res.status(404).json({message: 'Assign tasks unsuccessful'});
        })
}

exports.deleteUser = (req, res, next) => {
    const email = req.body.email;
    User.findOne({email: email})
        .then(user => {
            if (!user) {
                console.log('User not found');
                return res.status(404).json({message: 'User not found'});
            } else {
                user.deleteOne({email: email})
                    .then(result => res.status(200).json({message: 'User Deleted'}))
            }
        })
}

exports.updateUser = (req, res, next) => {
    if (req.session.role !== 'Admin') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Admin to Update Users'});
    };
    const name = req.body.name;
    const newEmail = req.body.newEmail;
    const oldEmail = req.body.oldEmail;
    const password = req.body.password; // Hash and salt passwords for live production
    const role = req.body.role;
    const teamId = req.body.teamId;
    User.findOneAndUpdate({email: oldEmail}, {
        name: name,
        email: newEmail,
        password: password,
        role: role,
        teamId: teamId
    }).then(result => {
        if(result) {
            console.log('User Updated');
            return res.status(200).json({message: 'User updated'})
        } else {
            console.log('User not found');
            return res.status(404).json({message: 'User not found'});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({message: 'Update failed'})
    })
}

exports.repopulateUser = (req, res, next) => {
    if (!req.session.loggedIn) {
        console.log('Must be logged in');
        res.status(400).json({message: 'Must be logged in'})
    };
    User.findById(req.session.loginId).populate('teamId')
        .then(user => {
            req.session.role = foundUser.role;
            req.session.team = foundUser.teamId;
            return res.status(200).json(foundUser);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Repopulate User Failed'})
        })
}

exports.returnAllUsers = (req, res, next) => {
    if (req.session.role !== 'Admin') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Admin to access all users data'});
    };
    User.find().toArray().then(users => {
        users.forEach(user => {
            user.password = 'redacted';
        });
        res.status(200).json(users)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Get users failed'})
        })
}