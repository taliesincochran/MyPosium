const router = require("express").Router();
const db = require("../../models/")
const eventController = require("../../controllers/");

// Matches with "/api/event"
 //Cancels event, deletes from database
  router.get("/cancelEvent/:id", (req,res) => {
    db.Event.findOneAndRemove({_id: req.params.id}).then(result=> {
      res.json(result)
    })
  });

  //Event Create Route
  router.post('/create', (req,res) => {
    let newEvent = req.body;
    db.Event.create(newEvent).then(result => res.json(result))
  });

//Pulls down all attendees from an event. Primarily used for messages
  router.get('/attendees/:id', function(req, res){
    db.Event.findOne({_id: req.params.id})
    .populate('attendees', 'username')
    .then(result=>{
      res.json(result);
    })
  })

  //Used to filter events by distance, I think--VR
  router.post('/distances', (req,res) => {
    var query = req.params.query;
    axios.get(query).then(result=> {
      res.send(result)
    })
  })

//Route to add attendees
  router.post('/:id', (req,res) => {
    db.Event.findOneAndUpdate({_id : req.params.id}, {$push: { attendees: req.user._id}})
      .then(result => {
        db.User.findOneAndUpdate({_id: req.user._id}, {$push: { attending: req.params.id}})
          .then(data=> {
            res.send({"result": result, "data": data})

          })
      })
  })

  //Route to get events and populate event suggestion
  router.get("/", (req,res) =>{
    db.Event.find({}).then(result=> res.json(result))
  })

module.exports = router;
