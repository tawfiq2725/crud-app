const express = require('express');
const Userroutes = require('./router/user')
const Adminroutes = require('./router/admin');
const Indexroutes = require('./router/index');
const expressEjsLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const nocache  = require('nocache')
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5555;


// App
const app = express();
// Static files
app.use(express.static('public')); 

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  }));

// Template Engine
app.use(expressEjsLayouts);
app.set('layout','./layouts/main')
app.set('view engine','ejs')

app.use(nocache())
app.use(flash());
app.use(morgan('dev'))
// Routers
app.use('/',Indexroutes)
app.use('/user',Userroutes)
app.use('/admin',Adminroutes)

// custom middleware
app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage');
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

// Listen
app.listen(PORT , ()=>{
    console.log(`Server is on http://localhost:${PORT}`);
})
