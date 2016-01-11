// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Contest', new Schema({ 
		companyName: String,
    business_desc: String,
    industry: Number,
		content_detail: String,
		more_detail: String,
		title: String,
		duration: Date,
		user_id: String,
		username: String,
		type: Number,
		price: Number,
		status: Number,// {0: not ready, 1: paid, 2: closed}
		sizex: Number,
		sizey: Number,
		size_unit: String
}));