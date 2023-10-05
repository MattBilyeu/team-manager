const express = require('express');

const teamController = require('../controllers/team');

const router = express.Router();

router.post('/create-team', teamController.createTeam);

router.post('/assign-user', teamController.assignUser);

router.post('/add-update', teamController.addUpdate);

router.post('/acknowledge-update', teamController.acknowledgeUpdate);

router.post('/remove-update', teamController.removeUpdate);

router.post('/add-tip', teamController.addTip);

router.post('/remove-tip', teamController.removeTip);

router.post('/add-escalation', teamController.addEscalation);

router.post('/advance-escalation', teamController.advanceEscalation);

router.post('/remove-escalation', teamController.removeEscalation);

router.post('/delete-team', teamController.deleteTeam);

router.post('/get-teams', teamController.returnAllTeams);