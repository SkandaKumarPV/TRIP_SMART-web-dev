// middleware/authMiddleware.js
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      // User is authenticated
      next();
    } else {
      // Redirect to login page
      res.redirect("/users/login");
    }
  }
  
  module.exports = isAuthenticated;
  