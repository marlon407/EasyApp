// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Contest', new Schema({ 
    business_desc: String,
    industry: Number,
		content_detail: String,
		more_detail: String,
		title: String,
		duration: Date
}));