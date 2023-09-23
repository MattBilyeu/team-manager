const path = require('path');

const express = require('express');

const datacontroller = require('../controllers/data');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('../public/index.html')
});

router.get('/team', datacontroller.getTeam);