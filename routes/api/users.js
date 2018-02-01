const router = require("express").Router();
const passport = require('passport')

// Matches with "/api/user"
//=============================================================================
// AUTHENTICATION ROUTES =======================================================
// =============================================================================

  router.post('/login', passport.authenticate('local-login', {
      successRedirect : '/dashboard', // redirect to the secure user dashboard section
      failureRedirect : '/login', // redirect back to the login page if there is an error
      failureFlash : true // allow flash messages
  }));
  // process the signup form
  router.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the profile create section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  // LOGOUT ==============================
  router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy(function (err) {
      if (!err) {
          res.status(200).clearCookie('connect.sid', {path: '/'}).redirect('/');
      } else {
          console.log('Error from session destroy:', err)
      }
    });
  });

module.exports = router;
