const router = require("express").Router();
const passport = require('passport');
const UC = require('../../controllers/userController');
const db = require('../../models/')
const axios = require('axios')

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
    let authObj = {user: req.user, isAuth: req.isAuthenticated()};
    return res.json(authObj);
  });
  // process the logout request
  router.get('/logout', function(req, res) {
    // if(req.sessions !== undefined) {
      req.logout();
      req.session.destroy(function (err) {
        if (!err) {
          res.clearCookie('connect.sid', {path: '/'}).sendStatus(200);
        } else {
          console.log('Error from session destroy:', err)
        }
      });
    // }
  });

//Authentication route to check for passport requirements satisfied
  router.get('/checkAuth', function (req,res){
    let authObj = {};
    authObj.user = req.user || null;
    authObj.isAuth = req.isAuthenticated();
    res.json(authObj);
  })

//Route to check if username is unique
  router.get('/checkUsername/:username', function(req,res) {
    db.User.findOne({username: req.params.username}).then(result => {
      res.json(result)
    })
  })


  //Route to update profile, post because multiple points can be edited
  router.post('/updateprofile', function(req, res) {
    UC.updateUser(req.body).then(result=> {
      db.User
        .findOne({username: req.user.username})
        .then(user => {
          res.json(user)
        })
      })
  });

//The route used to populate the events I believe
  router.get('/:username', function(req,res) {
    db.User.findOne({username: req.params.username}).then(result=> {
      res.json(result)
    }).catch(err=>console.log(err))
  })


module.exports = router;
