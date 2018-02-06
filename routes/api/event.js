const router = require("express").Router();
import eventController from "../../controllers";

// Matches with "/api/event"
 //process the event creation
  router.post('/', function (req,res){
    //===================================================================================================
    console.log("event should be" + req.body);
    //==================================================================================================
    eventController.createEvent(req.body);
    return res.json(newEvent);
  });

module.exports = router;
