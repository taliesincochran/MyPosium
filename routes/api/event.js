const router = require("express").Router();
import eventController from "../../controllers/eventController";

// Matches with "/api/event"
 //process the event creation
  router.post('/create', function (req,res){
    let newEvent = {event: req.event};
    //===================================================================================================
    console.log("Event is:" newEvent)
    //==================================================================================================
    eventController.createEvent(newEvent);
    return res.json(newEvent);
  });

module.exports = router;
