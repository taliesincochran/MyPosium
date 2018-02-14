const db = require('../models')

module.exports = {
  getUser: (req,res) => {
  db.User.findOne({ 'username' :  req.body.username })
    .then(user=> res.json(user))
    .catch(err=>console.log(err));
  },
  createUser: (req,res) => {
    db.User
      .create(req.body)
      .then(user => res.json(user))
      .catch(err => res.json(err));
  },
  updateUser: (data) => {
    let query = { username: data.username };
    return db.User
      .findOneAndUpdate(query, { $set: {
        interests: data.interests,
        zipcode: data.zipcode,
        age: data.age,
        img: data.img,
        aboutMe: data.aboutMe
      }})
  },
  deleteUser: (req,res) => {
    db.User
      .findOneAndUpdate({_id: req.params.id})
        .then(user=> user.remove())
        .then(user=> res.json(user))
        .catch(err=> res.status(422).res.json(err));
  },
  // login: (req, username, password, done) => {
  //   //passport config?
  // },
  // signup: (req, username, password, done) => {
  //   //passport config?
  // },
  // logout: (req,res) => {
  //   //passport config?
  // }
}
