var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
	'email': {
		type: String,
		unique: true,
		required: true
	},
	'name': {
		type: String,
		required: true
	},
	"password": {
		type: String,
		required: true
	},
	"intrests": [],
	"messages": 
		{
			type: Schema.types.ObjectId,
			ref: "Message"
		}
});
var User = mongoose.model("User", UserSchema);
module.exports = User;