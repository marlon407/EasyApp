
module.exports = function(app, Contest, Images_Contest) {
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
			active: 1,
    });

    console.log("creating contest"+ contest.type);
    contest.save(function(err) {
      if (err) throw err;
      console.log('Contest created successfully');
      res.json({ success: true, id: contest._id });
    });
	});
	
	app.post('/saveImage', function(req, res) {
    console.log("saving image");
		console.log(req.body);
    var image_contest = new Images_Contest({
			contest_id: req.body.contest_id,
			image_id:req.body.image_id
		});
		image_contest.save(function(err) {
      if (err) throw err;
      console.log('images saved successfully');
      res.json({ success: true});
    });
	});
	
	app.get('/getContests', function(req, res) {
    console.log("getting contests");
    Contest.find(function(err, all) {
      res.json(all);
    });
	});
	
	app.get('/getContestById', function(req, res) {
		var contestId = req.headers['id']
		console.log("finding "+ contestId);
    Contest.find({_id: contestId},function(err, contest) {
			Images_Contest.find({contest_id: parseInt(contestId)},function(err, images) {
				res.json({contest:contest, images:images});
			})
    });
	});
}