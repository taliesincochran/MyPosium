const router = require("express").Router();
const db = require("../../models/")


//Create new messages
router.post('/create', function (req,res){
  console.log(req.body);
  let { sender, recipient, subject, message } = req.body;
  let newMessage = { sender: sender.username, recipient, subject, message };
  db.Message
    //Message formatted sending to database
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

//route to populate a users message page
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


//route to get a SENT message
router.get('/getOneSent/:id', function (req,res){
  db.Message
    .findOne({_id: req.params.id})
    .then(result => {
      res.json(result)
    })
})

//route to get a RECEIVED  message, changes status to read
router.get('/getOneReceived/:id', function (req,res){
  db.Message
    .findOneAndUpdate({_id: req.params.id}, {read:true})
    .then(result => {
      console.log('result from findOneAndUpdate', result)
      res.json(result)
    })
})

//route to check for new messages
router.get('/checkForNewMessage', function(req,res){
  db.Message
    .find({read: false})
    .then(results => {
      console.log(results)
      res.json(results)
    })
    .catch(err => console.log(err));
})

module.exports = router;
