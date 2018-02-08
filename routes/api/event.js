const router = require("express").Router();

const eventController = require("../../controllers/");

// Matches with "/api/event"
 //process the event creation
  router.post('/', (req,res) => {
    let newEvent = req.body;
    //===================================================================================================
    console.log("Event is:", newEvent)
    //==================================================================================================
    eventController.createEvent(newEvent);
    res.json(newEvent);
  });

module.exports = router;
