var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
	'from': {
		type: String,
		required: true
	},
	'to': {
		type: String,
		required: true
	},
	{
	"header": {
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
var User = mongoose.model("Message", MessageSchema);
module.exports = User;