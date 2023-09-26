
// Delete User
// Change Password - Admin Only Function
// Assign Tasks

const User = require('../models/user');

exports.createUser = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password; // Hash and salt passwords for live production
    const role = req.body.role;
    const teamId = req.body.teamId;
    const existingUser = await User.findOne({email: email});
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
            res.json({message: 'User Created'})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'User Creation Failed'})
        })
};

exports.changePassword = async (req, res, next) => {
    const email = req.body.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    try {
        let user = await User.findOne({email: email});
        if (!user || oldPassword !== user.password) {
            return res.status(401).json({message: 'Email/Password Combination Not Found'})
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
        const user = await User.findOne({email: email});
        await User.findOneAndUpdate(
            {email: email},
            {
                primaryTask: primaryTask,
                floatTask: floatTask
            }
        );
        return res.status(200).json({message: 'Update Successful'})
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: 'Update Failed'})
    }
}