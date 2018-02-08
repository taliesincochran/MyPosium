const router = require("express").Router();
const passport = require('passport');
const UC = require('../../controllers/userController');

// Matches with "/api/users"
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
    console.log('(((((((((((((((((((((((((((((((((((((')
    let authObj = {user: req.user, isAuth: req.isAuthenticated()};
    return res.json(authObj);
  });

  // process the logout request
  router.get('/logout', function(req, res) {
    req.logout();
    console.log("User routes are working");
    req.session.destroy(function (err) {
      if (!err) {
        res.clearCookie('connect.sid', {path: '/'}).sendStatus(200);
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

  router.post('/updateprofile', function(req, res) {
    console.log(req.body);
    UC.updateUser(req.body);
    res.status(200).end();
  });

module.exports = router;
