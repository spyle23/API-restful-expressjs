
const express = require('express');


const UserCtrl = require('../controller/user');

const router = express.Router();

router.post('/signup', UserCtrl.signup);
router.post('/login', UserCtrl.login);

module.exports = router;