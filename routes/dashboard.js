const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const User = require('../modals/User');

router.use(express.static('public'));

router.get('/', ensureAuthenticated,  (req, res) => {
    res.render('dashboard');
})


module.exports = router;