const router = require("express").Router();

// Matches with "/api/event"
 //process the event creation
  router.post('/', function (req,res){
    let newEvent = {event: req.event};
    //===================================================================================================
    console.log("Event is:" newEvent)
    //==================================================================================================
    return res.json(newEvent);
  });

module.exports = router;
