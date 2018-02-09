const router = require("express").Router();
const db = require("../../models/")

router.post('/create', function (req,res){
  console.log(req.body);
  let { sender, recipient, subject, message } = req.body;
  let newMessage = { sender, recipient, subject, message };
  db.Message
    .create(newMessage)
    .then(result => {
      console.log(result)
      res.json(result);
    })
    .catch(err => console.log(err));
})

module.exports = router;
