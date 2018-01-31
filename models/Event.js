var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var EventSchema = new Schema({
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
	attendees: [
		{
			type: Schema.types.ObjectId,
			ref: "User"
		}
	]

});
var Event = mongoose.model("Event", EventSchema);
module.exports = Event;