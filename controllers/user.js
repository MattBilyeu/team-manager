const User = require('../models/user');
const Team = require('../models/team');

exports.createUser = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password; // Hash and salt passwords for live production
    const role = req.body.role;
    const teamId = req.body.teamId;
    const existingUser = await User.findOne({email: email});
    const team = await Team.findById(teamId);
    if (existingUser) {
        return res.status(409).json({message: 'A user with that email already exists.'})
    };
    const newUser = new User({
        name: name,
        email: email,
        password: password,
        role: role,
        teamId: teamId,
        primaryTask: '',
        floatTask: ''
    });
    newUser.save()
        .then(result => {
            console.log('User Created');
            const newUser = User.findOne({email: email});
            team.users.push(newUser._Id);
            team.save();
            res.json({message: 'User Created'});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'User Creation Failed'})
        })
};

exports.findUserById = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);
        user.password = 'redacted';
        res.status(200).json(user);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: 'Find User Failed'})
    }
}

exports.changePassword = async (req, res, next) => {
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    try {
        let user = await User.findOne({email: email});
        if (!user || oldPassword !== user.password) {
            return res.status(404).json({message: 'Email/Password Combination Not Found'})
        }
        user.password = newPassword;
        await user.save();
        console.log('User updated');
        res.status(200).json({message: 'Password Updated'})
    }

    catch(err) {
        console.log(err);
        res.status(500).json({message: 'Password Update Unsuccessful'})
    }
};

exports.assignTasks = async (req, res, next) => {
    const email = req.body.email;
    const primaryTask = req.body.primaryTask;
    const floatTask = req.body.floatTask;
    try {
        const updatedUser = await User.findOneAndUpdate(
            {email: email},
            {
                primaryTask: primaryTask,
                floatTask: floatTask
            }
        );
        if (!updatedUser) {
            console.log('User not found');
            return res.status(404).json({message: 'User not found'});
        };
        return res.status(200).json({message: 'Update Successful'})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: 'Update Failed'})
    }
}

exports.deleteUser = async (req, res, next) => {
    const email = req.body.email;
    try {
        const deletedUser = await User.findOneAndDelete({email: email});
        if (!deletedUser) {
            console.log('User not found');
            return res.status(404).json({message: 'User not found'});
        }
        console.log('User Deleted');
        res.status(200).json({message: 'User Deleted'});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Delete User Failed'});
    }
}

exports.updateUser = async (req, res, next) => {
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
    try {
        const updatedUser = await User.findOneAndUpdate({email: oldEmail}, {
            name: name,
            email: newEmail,
            password: password,
            role: role,
            teamId: teamId
        });
        if (!updatedUser) {
            console.log('User not found');
            return res.status(404).json({message: 'User not found'});
        };
        console.log('User Updated');
        return res.status(200).json({message: 'User updated'})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: 'Update failed'})
    }
}

exports.repopulateUser = async (req, res, next) => {
    if (!req.session.loggedIn) {
        console.log('Must be logged in');
        res.status(400).json({message: 'Must be logged in'})
    };
    try {
        const foundUser = await User.findById(req.session.loginId).populate('teamId');
        req.session.role = foundUser.role;
        req.session.team = foundUser.teamId;
        return res.status(200).json(foundUser);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: 'Repopulate User Failed'})
    }
}

exports.returnAllUsers = async (req, res, next) => {
    if (req.session.role !== 'Admin') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Admin to access all users data'});
    };
    try {
        const users = await User.find().toArray();
        users.forEach(user => {
            user.password = 'redacted';
        });
        return res.status(200).json(users);
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: 'Get users failed'})
    }
}