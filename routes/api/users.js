const router = require("express").Router();
const passport = require('passport')

// Matches with "/api/user"
//=============================================================================
// AUTHENTICATION ROUTES =======================================================
// =============================================================================
  //process the login form
  router.post('/login', passport.authenticate('local-login'), function (req,res){
    let authObj = {user: req.user, isAuth: req.isAuthenticated()};
    return res.json(authObj);
  });

  // process the signup form
  router.post('/signup', passport.authenticate('local-signup'), function (req,res) {
    let authObj = {user: req.user, isAuth: req.isAuthenticated()};
    return res.json(authObj);
  });

  // process the logout request
  router.get('/logout', function(req, res) {
    req.logout();
    req.session.destroy(function (err) {
      if (!err) {
        res.clearCookie('connect.sid', {path: '/'}).send(200);  //.redirect('/');
        console.log('no error')
      } else {
        console.log('Error from session destroy:', err)
      }
    });
  });

  router.get('/checkAuth', function (req,res){
    let authObj = {};
    authObj.user = req.user || null;
    authObj.isAuth = req.isAuthenticated();
    res.json(authObj);
  })

module.exports = router;
