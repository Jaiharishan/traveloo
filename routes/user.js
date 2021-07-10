const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../modals/User');

router.use(express.static('public'));

// base page
router.get('/', (req, res) => {
    res.render('register');
});

// reigister page GET
router.get('/register', (req, res) => {
    res.render('register');
})

// login page GET
router.get('/login', (req, res) => {
    res.render('login');
})


// register page POST
router.post('/register', (req, res) => {
    const {username, email, country, age, gender, password, password2, check} = req.body;

    // console.log(username, email, country, age, gender, password, password2, check);
    // for showing errors in registering

    let errors = [];

    if(!username || !email || !country || !age || !gender || !password || !password2) {
        errors.push({msg: 'Fill all the credentials'});
    }

    if (password !== password2) {
        errors.push({msg: 'Passoword does not match'});
    }

    if (password.length < 6) {
        errors.push({msg:'Password length is too small'});
    }

    if (age < 18) {
        errors.push({msg:'You should be above 18 to register'});
    }

    // console.log(errors);
    // if we find any errors from the above conditons

    if(errors.length > 0) {

        // we render the page again too fill the right credentials
        // with all the past filled details
        res.render('register', {
            errors,
            username,
            email,
            country,
            age,
            gender,
            password,
            password2,
            check
        });
    }
    else {
        User.findOne({email:'email'})
            .then(user => {
                if(user){
                    errors.push({msg:'user already exists'});

                    res.render('register', {
                        errors,
                        username,
                        email,
                        country,
                        age,
                        gender,
                        password,
                        password2,
                        check
                    });
                }
                else {
                    const newUser = new User({
                        username,
                        email,
                        country,
                        age,
                        gender,
                        password,
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;

                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/user/login');
                                })

                                .catch(err => console.log(err));

                        })
                    })
                }
            })
            .catch(err => console.log(err));
    }
});


// login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next);

});

// logout 
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Logged out successfully');
    res.redirect('/user/login');
})





module.exports = router;