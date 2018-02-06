const db = require("../models");

// Defining methods for the booksController
module.exports = {
  getMessages: (req,res) => {
  	db.User.findOne({_id: req.params.id})
  		.populate('sentMessages', 'recievedMessages')
    	.then(messages => res.json(messages))
    	.catch(err=> res.status(422).json(err));
  },
  getOneMessage: (req,res) => {
  	db.Message.findByID(req.params.id)
  		.then(message=> res.json(message));
  },
  sendMessage: (req,res) => {
  	var { sender, reciever } = req.body
   	db.Message.create(req.body)
   		.then(message=> {
   			 db.User.findOneAndUpdate({username: sender}, {$push:{sentMessages: message._id }});
   			 db.User.findOneAndUpdate({username: reciever}, {$push:{recievedMessages: message._id}});
   			res.json(message);
   		})
   		.catch(err=> res.status(422).json(err));
  },
  deleteMessage: (req,res) => {  
  	db.Message.findById({_id: req.params.id})
  		.then(messageModel=> message.Model.remove())
  		.catch(err=> res.status(422).json(err));	
  }
}
export default messageController;
