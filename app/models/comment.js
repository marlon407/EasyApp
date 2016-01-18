// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Comment', new Schema({ 
		contest_id: String,
    project_id: String,
		user_id: String,
		user_name: String,
		text: String,
}));