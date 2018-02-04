const router = require("express").Router();
const passport = require('passport')

// Matches with "/api/user"
//=============================================================================
// AUTHENTICATION ROUTES =======================================================
// =============================================================================
  //process the login form
  router.post('/login', passport.authenticate('local-login'), function (req,res){
    let authObj = {user: req.user, isAuth: req.isAuthenticated()};
    //===================================================================================================
    console.log('authObj', authObj)
    //==================================================================================================
    return res.json(authObj);
  });

  // process the signup form
  router.post('/signup', passport.authenticate('local-signup'), function (req,res) {
    let authObj = {user: req.user, isAuth: req.isAuthenticated()};
    //======================================================================================================
    console.log('authObj ', authObj)
    //=======================================================================================================
    return res.json(authObj);
  });

  // process the logout request
  router.get('/logout', function(req, res) {
    console.log('9999999999999999999999999:', req.user)
    req.logout();
    req.session.destroy(function (err) {
      if (!err) {
        res.sendStatus(200).clearCookie('connect.sid', {path: '/'});
        console.log('no error')
      } else {
        console.log('Error from session destroy:', err)
      }
    });
  });

module.exports = router;
