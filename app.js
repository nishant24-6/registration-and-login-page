const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const jwt = require('jsonwebtoken');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });  

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users'));

//forget
app.get('/forget-password', (req, res, next) =>{
  res.render('forget-password');
})

app.post('/forget-password', (req, res, next) =>{
  const { email } = req.body;

  //make sure user exist in database
  if(email !== user.email){
    res.send('Email is Not register');
    return;
  }
});

app.get('/reset-password', (req, res, next) =>{})

app.post('/reset-password', (req, res, next) =>{})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on  ${PORT}`));

