const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const Schema = mongoose.Schema;
const userSchema = new Schema({
	'username': {
		type: String,
		required: true
	},
	"password": {
		type: String,
		required: true
	},
	zipcode: {
		type: String,
		required: true
	},
	"interests": [],
	"sentMessages": {
			type: Schema.Types.ObjectId,
			ref: "Message"
	},
	"receivedMessages": {
		type: Schema.Types.ObjectId,
		ref: "message"
	}
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = module.exports = mongoose.model("User", userSchema);
