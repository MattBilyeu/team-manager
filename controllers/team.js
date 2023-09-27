// Acknowlege Update
// Remove tip
// Remove escalation

// Update code to update the team object before saving rather than saving the team from the session.  
// This will protect in case two people are updating the team at the same time.
// Create a 'updateSessionTeam' function and call it at the beginning?

const Team = require('../models/team');
const User = require('../models/user');

peerReviewerFound = async function(team) {
    try {
        const populatedTeam = await team.populate('users');
        let peerReviewer;
        for (let user of populatedTeam.users) {
            if(user.role === 'Peer Reviewer') {
                peerReviewer = user;
            }
        };
        return peerReviewer;
    }
    catch(err) {
        console.log(err);
    }
};

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
            // Add code to ensure the userId doesn't exist on any team.
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

exports.addTip = async (req, res, next) => {
    if (req.session.role !== 'Manager') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Manager to add a tip'});
    };
    if (!req.session.team) {
        console.log('Must be a member of a team to save an Tip.');
        return res.status(400).json({message: 'Must be a member of a team to save a tip.'})
    };
    try {
        const tipCategory = req.body.category;
        const tipText = req.body.text;
        const tip = {
            category: tipCategory,
            text: tipText
        };
        const team = await Team.findById(req.session.team._id);
        team.tips.push(tip);
        await team.save();
        return res.status(201).json({message: 'Tip Saved'})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Add tip failed'});
    }
}

exports.addEscalation = async (req, res, next) => {
    if (!req.session.team) {
        console.log('Must be a member of a team to add an escalation.');
        return res.status(400).json({message: 'Must be a member of a team to add an escalation.'})
    };
    try {
        const title = req.body.title;
        const text = req.body.text;
        const ownerId = req.body.userId;
        let stage = 'Peer Review';
        if (!peerReviewerFound(req.session.team)) {
            stage = 'Manager'
        };
        const escalation = {
            title: title,
            text: text,
            stage: stage,
            owner: ownerId
        };
        req.session.team.escalations.push(escalation);
        await req.session.team.save();
        console.log('Escalation added');
        return res.status(201).json({message: 'Escalation added'})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Add escalation failed'});
    }
}

exports.advanceEscalation = async (req, res, next) => {
    try {
        const i = req.body.escalationIndex;
        let team = req.session.team;
        let peerReview = peerReviewerFound(team);
        if (team.escalations[i].stage === 'Member' && peerReview) {
            team.escalations[i].stage = 'Peer Review';
        } else if (team.escalations[i].stage === 'Member' && !peerReview || team.escalations[i].stage === 'Peer Review') {
            team.escalations[i].stage = 'Manager'
        } else {
            team.escalations[i].stage = 'Member'
        } 
        await team.save();
        console.log('Escalation advanced');
        return res.status(201).json({message: 'Escalation advanced'})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Add escalation failed'});
    }
};

exports.removeUpdate = async (req, res, next) => {
    if (!req.session.team) {
        console.log('Must be a member of a team to remove an update.');
        return res.status(400).json({message: 'Must be a member of a team to remove an update.'})
    };
    try {
        const updateIndex = req.body.updateIndex;
        let team = req.session.team;
        team.updates.splice(updateIndex, 1);
        await team.save();
        console.log('Update removed');
        return res.status(201).json({message: 'Update removed'})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Remove update failed'});
    }
}