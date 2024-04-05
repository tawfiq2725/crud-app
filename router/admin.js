const express = require('express');
const adminController = require('../controller/admincontroller');
const router = express.Router();


// Middleware to check if the user is logged in
function isAuthenticated(req, res, next) {
  if (req.session && req.session.admin) {
    // User is logged in, proceed to the next middleware
    next();
  } else {
    // User is not logged in, redirect to the login page with an error message
    req.flash("errorMessage", "Please log in to access the page.");
    res.redirect("/admin/login");
  }
}
//   Logged out
const isLoggedOut = (req,res,next) => {
  if (req.session && req.session.user) {
    // User is logged in, redirect to the login page
    res.redirect("/admin/home");
  } else {
    // User is not logged in, redirect to the login page with an error message
    next();
  }
}  

// Login page
router.get("/login", isLoggedOut,(req,res)=>{
  const locals = {
    title: 'Login Page'
  }
  res.render("adminLogin", {
    locals, 
    errorMessage: req.flash("errorMessage"), 
    successMessage: req.flash("successMessage") 
  });
});
// post request
router.post("/login", adminController.checkCredentials);

// logout
router.get('/logout',adminController.adminLogout);

// Home page (requires authentication)
router.get("/home", isAuthenticated, (req, res) => {

  const locals = {
    title: 'Home Page'
  }
  res.render("adminHome", { 
    locals,
    successMessage: req.flash("successMessage"),
    errorMessage: req.flash("errorMessage"),
    admin : req.session.admin
  });
});
module.exports = router;
