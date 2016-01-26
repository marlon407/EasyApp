// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
	name: String,
	first_name: String,
	last_name: String,
	email: String,
	password: String, 
	bio: String,
	place: String,
	phone: String,
	website: String,
	admin: Boolean,
	active: Boolean,
	created: Date,
	role: Number
}));