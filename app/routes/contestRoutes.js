var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express= require('express');

module.exports = function(app, Contest) {
	app.post('/newContest', function(req, res) {
		var contest = new Contest({ 
      title: req.body.title, 
      business_desc: req.body.business_desc,
      industry: req.body.industry,
			content_detail: req.body.content_detail,
			more_detail: req.body.more_detail,
			duration: req.body.duration,
			user_id: req.body.user,
			username: req.body.username,
			companyName: req.body.companyName,
			price: req.body.price,
			type: req.body.type,
			active: 1
    });

    console.log("creating contest"+ contest.type);
    contest.save(function(err) {
      if (err) throw err;
      console.log('Contest created successfully');
      res.json({ success: true });
    });
	});
	
	app.get('/getContests', function(req, res) {
    console.log("getting contests");
    Contest.find(function(err, all) {
      res.json(all);
    });
	});
	
	app.get('/getContestById', function(req, res) {
    Contest.find({_id: req.headers['id']},function(err, contest) {
      res.json(contest);
    });
	});
}