const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageSchema = new Schema({
	'sender': {
		type: String,
		required: true
	},
	'recipient': {
		type: String,
		required: true
	},
	"subject": {
		type: String,
	},
	"message": {
		type: String,
	},
	"createdAt": {
		type: Date,
		default: Date.now()
	}
});
const Message = module.exports = mongoose.model("Message", messageSchema);
