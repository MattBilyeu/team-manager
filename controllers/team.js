const Team = require('../models/team');
const User = require('../models/user');

peerReviewerFound = async function(team) {
    try {
        const populatedTeam = await Team.findById(team._id).populate('users');
        let peerReviewer;
        for (let user of populatedTeam.users) {
            if(user.role === 'Peer Reviewer') {
                peerReviewer = user;
                return peerReviewer;
            }
        };
        return null;
    }
    catch(err) {
        console.log(err);
    }
};

exports.createTeam = (req, res, next) => {
    const name = req.body.name;
    if (req.session.role !== 'Admin') {
        console.log('Insufficient Permissions');
        return res.status(403).json({message: 'Contact an Admin to Create a Team'})
    };
    const newTeam = new Team({
        name: name,
        updates: [],
        tips: [],
        escalations: [],
        users: [],
    });
    newTeam.save().then(result => res.status(201).json({message: 'Team Created'}))
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Create Team Failed'});
        });
}

exports.assignUser = (req, res, next) => {
    const userId = req.body.userId;
    const teamId = req.body.teamId;
    let user;
    if (req.session.role !== 'Admin') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Admin to Update Users'});
    };
    User.findById(userId).then(foundUser => {
        if (!foundUser) {
            console.log('User not found');
            return res.status(404).json({message: 'User not found'});
        };
        user = foundUser;
        Team.findById(teamId).then(team => {
            const alreadyExists = team.users.includes(userId);
            if (alreadyExists) {
                console.log('User is already a member of that team.');
                return res.status(400).json({message: 'User is already a member of that team.'})
            } else {
                Team.find().then(teams => {
                    teams.forEach(team => {
                        const foundIndex = team.users.findIndex(id => id === userId);
                        if (foundIndex !== -1) {
                            team.users.splice(foundIndex, 1);
                            team.save();
                        }
                    })
                });
                user.teamId = teamId;
                user.save();
            };
            team.users.push(userId);
            team.save().then(result => res.status(201).json({message: 'User successfully assigned to team.'}))
                .catch(err => {
                    console.log(err);
                    res.status(500).json({message: 'Assign user failed'})
                })
        })
    })
};

exports.addUpdate = (req, res, next) => {
    if (req.session.role !== 'Manager') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Manager to add an update'});
    };
    if (!req.session.team) {
        console.log('Must be a member of a team to save an update.');
        return res.status(400).json({message: 'Must be a member of a team to save an update.'})
    };
    const updateCategory = req.body.category;
    const updateText = req.body.text;
    const update = {
        category: updateCategory,
        text: updateText,
        acknowledged: []
    };
    Team.findById(req.session.team._id)
        .then(team => {
            team.updates.push(update);
            team.save().then(result => res.status(201).json({message: 'Update Saved'}))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Add update failed'});
        })
};

exports.acknowledgeUpdate = (req, res, next) => {
    const updateIndex = req.body.updateIndex;
    const userId = req.body.userId;
    Team.findById(req.session.team._id)
        .then(team => {
            team.updates.acknowledged[updateIndex].push(userId);
            team.save().then(result => res.status(201).json({message: 'Update acknowledged'}))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Acknowledge Update Failed'});
        })
};

exports.removeUpdate = (req, res, next) => {
    if (!req.session.team) {
        console.log('Must be a member of a team to remove an update.');
        return res.status(400).json({message: 'Must be a member of a team to remove an update.'})
    };
    const updateIndex = req.body.updateIndex;
    Team.findById(req.session.team._id)
        .then(team => {
            team.updates.splice(updateIndex, 1);
            team.save().then(result => res.status(201).json({message: 'Update removed'}))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Remove update failed'});
        })
};

exports.addTip = (req, res, next) => {
    if (req.session.role !== 'Manager') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Manager to add a tip'});
    };
    if (!req.session.team) {
        console.log('Must be a member of a team to save an Tip.');
        return res.status(400).json({message: 'Must be a member of a team to save a tip.'})
    };
    const tipCategory = req.body.category;
    const tipText = req.body.text;
    const tip = {
        category: tipCategory,
        text: tipText
    };
    Team.findById(req.session.team._id)
        .then(team => {
            team.tips.push(tip);
            team.save().then(result => res.status(201).json({message: 'Tip Saved'}))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Add tip failed'});
        })
};

exports.removeTip = (req, res, next) => {
    const tipIndex = req.body.tipIndex;
    Team.findById(req.session.team._id)
        .then(team => {
            team.tips.splice(tipIndex, 1);
            team.save().then(result => res.status(201).json({message: 'Tip removed'}))
        })
};

exports.addEscalation = (req, res, next) => {
    if (!req.session.team) {
        console.log('Must be a member of a team to add an escalation.');
        return res.status(400).json({message: 'Must be a member of a team to add an escalation.'})
    };
    const title = req.body.title;
    const text = req.body.text;
    const ownerId = req.body.userId;
    let stage = 'Peer Review';
    Team.findById(req.session.team._id)
        .then(team => {
            if (!peerReviewerFound(team)) {
                stage = 'Manager'
            };
            const escalation = {
                title: title,
                notes: [text],
                stage: stage,
                owner: ownerId
            };
            team.escalations.push(escalation);
            team.save().then(result => res.status(201).json({message: 'Escalation added'}))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Add escalation failed'}); 
        })
}

exports.advanceEscalation = (req, res, next) => {
    const i = req.body.escalationIndex;
    const note = req.body.note;
    Team.findById(req.session.team._id)
        .then(team => {
            if (team.escalations[i].stage === 'Member' && peerReview) {
                team.escalations[i].stage = 'Peer Review';
            } else if (team.escalations[i].stage === 'Member' && !peerReview || team.escalations[i].stage === 'Peer Review') {
                team.escalations[i].stage = 'Manager'
            } else {
                team.escalations[i].stage = 'Member'
            } 
            team.escalations[i].notes.push(note);
            team.save().then( result => {
                console.log('Escalation advanced')
                res.status(201).json({message: 'Escalation advanced'});
            })
            .catch(err => {
                console.log(err);
            })
        });
};

exports.removeEscalation = (req, res, next) => {
    const eI = req.body.escalationIndex;
    Team.findById(req.session.team._id)
        .then(team => {
            team.escalations.splice(eI, 1);
            team.save().then(result => res.status(201).json({message: 'Escalation removed'}))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Remove escalation failed'});
        })
};

exports.deleteTeam = (req, res, next) => {
    if (req.session.role !== 'Admin') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Admin to delete a team'}); 
    };
    const teamId = req.body.teamId;
    Team.findByIdAndDelete(teamId)
        .then(result => {
            return res.status(201).json({message: 'Team deleted'});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Delete team failed'});
        })
};

exports.returnAllTeams = (req, res, next) => {
    if (req.session.role !== 'Admin') {
        console.log('Insufficient User Permissions');
        return res.status(400).json({message: 'Contact an Admin to access all team data'}); 
    };
    Team.find().then(teams => res.status(200).json(teams))
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Team retrieval failed'});
        })
}