const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const User = require('../modals/User');

router.use(express.static('public'));

let self;
router.get('/', ensureAuthenticated,  (req, res) => {
    res.render('dashboard',{
        user:req.user
    });
    self = req.user
})

router.get('/all', (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            res.send('something went wrong');
        }



        res.render('allusers', {
            users,
            self,
        })
        console.log(users[2].email)
        
    })
})

module.exports = router;

