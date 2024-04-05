  const credentials = {
    username: "Tawfiq",
    password: "admin@123",
  };

const checkCredentials = (req,res)=>{
    if (req.body) {
        const { username, password } = req.body;
        if (username === credentials.username) {
          if (password === credentials.password) {
            req.flash("successMessage", "You have successfully logged in.");
            req.session.admin = username ;
            res.redirect("/admin/home");
          }
        } else {
          req.flash("errorMessage", "Invalid Username or Please Fill");
          res.redirect("/admin/login");
        }
      } else {
        req.flash("errorMessage", "Please enter username and password");
        res.redirect("/admin/login");
      }
}
const adminLogout = (req,res)=>{
    req.flash("successMessage", "You have been logged out.");
    req.session.destroy();  
     res.redirect("/admin/login");
}

module.exports = {
    checkCredentials,
    adminLogout
};
