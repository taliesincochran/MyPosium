const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
	'title': {
		type: String,
		required: true
	},
	'location': {
		type: String,
		required: true
	},
	'organizer': {
		type: String,
		required: true
	},
	'time': {
		type: String,
		required: true
	},
	'isRemote': {
		type: Boolean,
		default: false
	},
	'cost': {
		type: String,
		required: true
	},
	'category': [],
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
