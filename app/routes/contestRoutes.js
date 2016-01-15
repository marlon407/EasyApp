
module.exports = function(app, Contest, Images_Contest, Intention, Project) {
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
			status: 0,
			size_unit: req.body.size_unit,
			sizex: req.body.sizex,
			sizey: req.body.sizey,
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
		for(var i = 0; i< req.body.image_ids.length; i++){
			var image_contest = new Images_Contest({
				contest_id: req.body.contest_id,
				image_id:req.body.image_ids[i]
			});
			image_contest.save(function(err) {
				if (err) throw err;
				console.log('images saved successfully');
			});	
		}
		res.json({ success: true});
	});
	
	app.get('/getContests', function(req, res) {
    console.log("getting contests");
    Contest.find({status: 0},function(err, all) {
      res.json(all);
    });
	});
	
	app.post('/getAllProjectsByContest', function(req, res) {
    console.log("getting projects by contest");
		var contest_Id = req.body.contest_id
    Project.find({contest_id: contest_Id},function(err, projects) {
      res.json({projects:projects});
    });
	});
	
	app.get('/getClosedContests', function(req, res) {
    console.log("getting contests");
    Contest.find({status: { $gt: 1 }},function(err, closed) {
      res.json(closed);
    });
	});
	
	app.get('/getContestById', function(req, res) {
		var contestId = req.headers['id']
		console.log("finding "+ contestId);
    Contest.find({_id: contestId},function(err, contest) {
			Images_Contest.find({contest_id: contestId},function(err, images) {
				res.json({contest:contest, images:images});
			})
    });
	});
	app.post('/setIntention', function(req, res) {
    var intend = new Intention({
			contest_id: req.body.contest_id,
			user_id: req.body.user_id
		});
		intend.save(function(err) {
      if (err) throw err;
      console.log('intention created successfully');
			Intention.find({contest_id: req.body.contest_id},function(err, all) {
				res.json({ success: true, count:all.length});
			});
    });
	});
	
	app.post('/setContestWinner', function(req, res) {
		var contest_id = req.body.contest_id;
		var project_id = req.body.project_id;
		Project.update({_id: project_id}, {place:1}, function(){
			Contest.update(	{_id: contest_id}, {status:3}, function(){
				console.log('Project wiiner chose');
				res.json({sucess:0});	
			});	
		});
	});
	
	app.post('/getIntentions', function(req, res) {
		console.log('getIntentions');
		console.log(req.body.contest_id);
		console.log(req.body.user_id);
		Intention.find({contest_id: req.body.contest_id},function(err, allByContest) {
			Intention.find({user_id: req.body.user_id},function(err, allbyUser) {
				console.log(allByContest);
				res.json({ allByContest: allByContest.length, isPlaying:allbyUser.length > 0});	
			});
		});
	});
	
}