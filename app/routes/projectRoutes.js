module.exports = function(app, Project, Images_Project, User, Contest) {
	app.post('/uploadProject', function(req, res) {
		var project = new Project({
			title: req.body.title,
			description: req.body.description,
			date: req.body.date,
			user_id: req.body.user_id,
			contest_id: req.body.contest_id,
		});
		project.save(function(err) {
      if (err) throw err;
      console.log('project created successfully');
      res.json({ success: true, id: project._id });
    });
	});
	
	app.post('/saveProjectImages', function(req, res) {
		for(var i = 0; i< req.body.image_ids.length; i++){
			var images_project = new Images_Project({
				project_id: req.body.project_id,
				image_id:req.body.image_ids[i]
			});
			images_project.save(function(err) {
				if (err) throw err;
				console.log('images saved successfully');
			});	
		}
		res.json({ success: true});
	});
	
	app.get('/getProjectById', function(req, res) {
		var projectId = req.headers['id']
    Project.find({_id: projectId},function(err, project) {
			console.log(project);
			Images_Project.find({project_id: projectId},function(err, images) {
				User.find({_id: project[0].user_id}, function(error, user){
					console.log(user);
					Contest.find({_id:project[0].contest_id}, function(error, contest){
						res.json({project:project, images:images, user:user, contest:contest});
					});
				});
			})
    });
	});
}