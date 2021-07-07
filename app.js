// all imports
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');


// dbkey
const db = require('./config/dbkey').mongoURI;

// routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');


// passport


// setting mongoose
// mongoose connect is a promise
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=> console.log('dbconnected'))
    .catch(err => console.log(err));


// setting ejs and ejs layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');


// body parser
app.use(express.urlencoded({extended: true}));


app.use(express.static('public'));
// express session passport middleware and global vars should be added

// // Express session
// app.use(
//     session({
//         secret: 'secret',
//         resave: true,
//         saveUninitialized: true
//     })
//   );
  
// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());
  
// // Connect flash
// app.use(flash());
  
// // Global variables
// app.use(function(req, res, next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });

// routers
app.use('/', indexRouter);



app.use('/user', userRouter);

// port
const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`running on port ${PORT}`));