const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/create-user', userController.createTeam);

router.post('/change-password', userController.changePassword);

router.post('/assign-tasks', userController.assignTasks);

router.post('/delete-user', userController.deleteUser);

router.post('/update-user', userController.updateUser);

router.post('/find-user', userController.findUserById);

router.post('/repopulate-user', userController.repopulateUser);

router.post('/get-users', userController.returnAllUsers);