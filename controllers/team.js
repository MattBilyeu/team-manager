// Has the various functions to manipulate the database

// Add Update
// Add Tip
// Add Escalation
// Remove Update
// Acknowlege Update
// Remove Tip
// Add Escalation
// Update Escalation
// Remove Escalation

const Team = require('../models/team');
const User = require('../models/user');

exports.createTeam = async (req, res, next) => {
    const name = req.body.name;
    if (req.session.role !== 'Admin') {
        console.log('Insufficient Permissions');
        return res.status(403).json({message: 'Contact an Admin to Create a Team'})
    };
    try {
        const newTeam = new Team({
            name: name,
            updates: [],
            tips: [],
            escalations: [],
            users: [],
        });
        await newTeam.save();
        return res.status(201).json({message: 'Team Created'});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Create Team Failed'});
    }
}

exports.assignUser = async (req, res, next) => {
    const userId = req.body.userId;
    const teamId = req.body.teamId;
    if (req.session.role !== 'Admin') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Admin to Update Users'});
    };
    try {
        const foundUser = await User.findById(userId);
        if (!foundUser) {
            console.log('User not found');
            return res.status(404).json({message: 'User not found'});
        };
        const team = await Team.findById(teamId);
        const alreadyExists = team.users.includes(userId);
        if (alreadyExists) {
            console.log('User is already a member of that team.');
            return res.status(400).json({message: 'User is already a member of that team.'})
        } else {
            team.users.push(userId);
            await team.save();
            return res.status(201).json({message: 'User successfully assigned to team.'})
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message: 'Assign user failed'})
    }
}

exports.addUpdate = async (req, res, next) => {
    if (req.session.role !== 'Manager') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Manager to add an update'});
    };
    if (!req.session.team) {
        console.log('Must be a member of a team to save an update.');
        return res.status(400).json({message: 'Must be a member of a team to save an update.'})
    };
    try {
        const updateCategory = req.body.category;
        const updateText = req.body.text;
        const update = {
            category: updateCategory,
            text: updateText,
            acknowledged: []
        };
        const team = await Team.findById(req.session.team._id);
        team.updates.push(update);
        await team.save();
        return res.status(201).json({message: 'Update Saved'})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Add update failed'});
    }
}