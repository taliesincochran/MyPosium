const router = require("express").Router();
import eventController from "../../controllers";

// Matches with "/api/event"
 //process the event creation
  router.post('/', function (req,res){
    let newEvent = {event: req.event};
    //===================================================================================================
    console.log("Event is:" newEvent)
    //==================================================================================================
    eventController.createEvent(newEvent);
    return res.json(newEvent);
  });

module.exports = router;
