const router = require("express").Router();
const db = require("../../models/")
const eventController = require("../../controllers/");

// Matches with "/api/event"
 //process the event creation
  router.get("/cancelEvent/:id", (req,res) => {
    console.log("cancel event fired", req.params.id);
    db.Event.findOneAndRemove({_id: req.params.id}).then(result=> {
      res.json(result)
    })
  });

  //Event Create Route
  router.post('/create', (req,res) => {
    let newEvent = req.body;
    db.Event.create(newEvent).then(result => res.json(result))
  });

  //Attending Route
  router.post('/attend', (req,res) => {
    db.Event.findOneAndUpdate({_id : req.body.eventId}, {$push: { attendees: req.body.username}})
      .then(result => {
        console.log("findAndUpdate result", result)
        db.User.findOneAndUpdate({_id: req.body.userId}, {$push: { attending: req.body.eventId}})
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
