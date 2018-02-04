const db = require("../models");

// Defining methods for the booksController
module.exports = {
    findAllEvents: (req,res) => {
      const userLocation = req.user.zipcode;
      const metersPerMile = 1609.344;
      const travelMiles = req.user.maxDistance;
      const travelMeters = travelDistance * metersPerMile;
      var destinations = '&destinations=';
      const queryURL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation}&destinations=${destinations}&key=AIzaSyDpwnTjzyOwCRmPRQhpu0eREKplFV0TCDI`
      const myEvents =[];
      db.Events.find({})
        .then(events => {
          events.map(location => {
            destinations += location.zipcode + "|";
          })
          axios.get(queryURL).then(distances => {
            distances.rows.elements.forEach((differance, i) => {              
              if(differance.value <= travelMeters) {
                myEvents.push(events[i])
              }
            })
            res.json(myEvents);
          })
        })
        .catch(err=> res.status(422).json(err));
    },
    findOneEvent: (req,res) => {
      const eventID = req.body._id;
      db.Event.findById(eventID).then(event => 
          res.json(event);
        )
    },
    createEvent: (req,res) => {
      db.Event.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    },
    cancelEvent: (req,res) => {
      db.Event.findById({_id: req.params.id})
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err=>res.status(422).res.json(err));
    },
    updateEvent: (req,res) => {
      db.Event
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
export default eventController;
