const router = require("express").Router();
const db = require("../../models/")

router.post('/create', function (req,res){
  console.log(req.body);
  let { sender, recipient, subject, message } = req.body;
  let newMessage = { sender: sender.username, recipient, subject, message };
  db.Message
    .create(newMessage)
    .then(messageResult => {
      //push reference into senders sent messages
      db.User
      .findOneAndUpdate({_id: sender._id}, {$push:{sentMessages: messageResult._id}})
      .then(result => {
        //push reference into recipient's received messages
        db.User
        .findOneAndUpdate({username: recipient}, {$push:{receivedMessages: messageResult._id}})
        .then(asdf => {
        })
        res.json(messageResult);
      })
      .catch(err => console.log(err));

    })
    .catch(err => console.log(err));
})

router.get('/populate', function (req,res){
  db.User
    .findOne({username: req.user.username})
    .populate('sentMessages')
    .populate('receivedMessages')
    .then(result => {
      res.json(result)
    })
    .catch(err => console.log(err));
});

router.get('/getOne/:id', function (req,res){
  db.Message
    .findOne({_id: req.params.id})
    .then(result => {
      res.json(result)
    })
})

module.exports = router;