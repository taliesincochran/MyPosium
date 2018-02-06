const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
	'title': {
		type: String,
		// required: true
	},
	'zipcode': {
		type: String,
		// required: true
	},
	'username': {
		type: String,
		// required: true
	},
	'date':{
		type:String,
		// required:true
	},
	'time': {
		type: String,
		// required: true
	},
	'isRemote': {
		type: Boolean,
		// default: false
	},
	'cost': {
		type: String,
		// required: true
	},
	'category': {
		type: String,
		// required: true
	},
	'imgURL': {
		type: String,
		// required: true
	},
	'description': {
		type: String,
		// required:true
	},
	'minAttending':{
		type: Number,
		// required:true
	},
	'maxAttending':{
		type: Number,
		// required:true
	},
	'attendees': [
		{
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	],
	"createdAt": {
		type: Date,
		default: Date.now()
	}
});
const Event = module.exports = mongoose.model("Event", eventSchema);
