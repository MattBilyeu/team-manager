// Has the various functions to manipulate the database


// Create Team
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

exports.createTeam = async (req, res, next) {
    const teamId = req.body.teamId;
    if (req.session.role !== 'Admin') {
        console.log('Insufficient Permissions');
        return res.status(400).json({message: 'Contact an Admin to Create a Team'})
    };
    try {
        // Code
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: 'Create Team Failed'});
    }
}