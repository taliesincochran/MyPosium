const db = require('../models')

module.exports = {
    getUser: (req,res) => {

    },
    createUser: (req,res) => {
      db.User
        .Create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err));
    },
    updateUser: (req,res) => {

    },
    deleteUser: (req,res) => {

    },
    login: (req,res) => {

    },
    logout: (req,res) => {

    },
    signup: (req,res) => {

    }
}
