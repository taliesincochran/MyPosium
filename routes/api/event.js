const router = require("express").Router();
const db = require("../../models/")
const eventController = require("../../controllers/");

// Matches with "/api/event"
 //process the event creation
  router.get("/", (req,res) =>{
  	db.Event.find({}).then(result=> res.json(result))
  })
  router.post('/create', (req,res) => {
    let newEvent = req.body;
    db.Event.create(newEvent).then(result => res.json(result))
  });
  router.post('/:id', (req,res) => {
  	console.log("id", req.params.id)
  	console.log("user", req.user._id)
  	db.Event.findOneAndUpdate({_id : req.params.id}, {$push: { attendees: req.user._id}})
  	  .then(result => {
  	  	db.User.findOneAndUpdate({_id: req.user._id}, {$push: { attending: req.params.id}})
  	  		.then(data=> {
  	  			res.send({"result": result, "data": data})

  	  		})
  	  })
  })

module.exports = router;
