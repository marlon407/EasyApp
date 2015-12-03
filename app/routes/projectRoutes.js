module.exports = function(app, Project, Images_Project) {
	app.post('/uploadProject', function(req, res) {
		var project = new Project({
			title: req.body.title,
			description: req.body.description,
			date: req.body.date,
			user_id: req.body.user_id,
		});
		console.log(project);
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
			Images_Project.find({project_id: projectId},function(err, images) {
				res.json({project:project, images:images});
			})
    });
	});
}