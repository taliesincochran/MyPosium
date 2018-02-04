const db = require("../models");

// Defining methods for the booksController
module.exports = {
  getMessages: (req,res) => {
    db.Message.find({to: req.user.email})
    	.then(messages => res.json(messages))
    	.catch(err=> res.status(422).json(err));
  },
  getOneMessage: (req,res) => {
  	db.Message.findByID(req.params.id)
  		.then(message=> res.json(message));
  },
  sendMessage: (req,res) => {
   	db.Message.create(req.body)
   		.then(message=> res.json(message))
   		.catch(err=> res.status(422).json(err));
  },
  deleteMessage: (req,res) => {  
  	db.Message.findById({_id: req.params.id})
  		.then(messageModel=> message.Model.remove())
  		.catch(err=> res.status(422).json(err));	
  }
}
export default messageController;
