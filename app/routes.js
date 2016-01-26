var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express= require('express');
var nodemailer = require('nodemailer'); //Send email
var config = require('../config'); // get our config file

module.exports = function(app, User, Contest, Project, Intention) {

  // =======================
  // routes ================
  // =======================
  // basic route
  app.get('/', function(req, res) {
      res.sendfile('./public/index.html'); // load our public/index.html file
  });
	
	// route to show a random message (GET http://localhost:8080/api/)
  app.get('/getUser', function(req, res) {
    User.findOne({
      name: req.headers['username']
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user){
				Contest.find({user_id: user._id},function(err, contests) {
					Project.find({user_id: user._id},function(err, projects) {
						res.json({user: user, contests:contests, projects:projects, success:true});
					});
				});
			};
    });
  });

	//Get all users designers
	app.get('/getAllDesigners', function(req, res) {
    User.find({role:1}, function(err, users) {
      res.json(users);
    });
  });
	
	app.post('/createUser', function(req, res) {
		 User.find({name:req.body.name}, function(err, user) {
			 console.log(user.length);
      if (user.length > 0){
				console.log('Username taken '+ req.body.name);
				res.json({ success: false });
			}
			 else{
					var user = new User({ 
						email: req.body.email,
						name: req.body.name,
						first_name: req.body.first_name,
						last_name: req.body.last_name,
						password: req.body.password,
						admin: false,
						active: false,
						role: req.body.role,
						created: new Date(),
						place: "Planeta terra",
						bio: "Sem biografia"
					});

					user.save(function(err) {
						if (err) throw err;
						console.log('User saved successfully');
						//Send confirm email
						var transpoter = nodemailer.createTransport(config.email);
						var mailOptions = {
							from: config.email.auth.user, 
							to: user.email
						};
						mailOptions.subject = config.confirEmail.subject;
						mailOptions.html = "<h2>Olá "+user.first_name+"</h2>"+config.confirEmail.text;
						transpoter.sendMail(mailOptions, function(error, res){
							if(error)	throw error;
							else console.log("Email sent to "+user.email);
						})
						res.json({ success: true });
					});
			 }
    });
  });
	
	app.post('/updateUser', function(req, res) {
		var userid = req.body._id;
		User.findOne({
      _id: userid
    }, function(err, user) {
				user.name= req.body.name;
				user.place= req.body.place;
				user.bio= req.body.bio;
				user.website= req.body.website;
				user.first_name= req.body.first_name;
				user.last_name= req.body.last_name;
				user.phone= req.body.phone;
				user.save(function(err) {
					if (err) throw err;
					console.log('User saved successfully');
					res.json({ success: true });
				});
			});
	});
	
	app.post('/activeuser', function(req, res) {
		var userid = req.body._id;
		User.findOne({
      _id: userid
    }, function(err, user) {
				user.active= true;
				user.save(function(err) {
					if (err) throw err;
					console.log('User activeted successfully');
					res.json({ success: true });
				});
			});
	});

  // API ROUTES -------------------

  // get an instance of the router for api routes
  var apiRoutes = express.Router(); 

  // route to authenticate a user (POST http://localhost:8080/api/authenticate)
  apiRoutes.post('/authenticate', function(req, res) {
    // find the user
    User.findOne({
      email: req.body.email
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        // check if password matches
        if (user.password != req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.get('superSecret'), {
            expiresInMinutes: 1440 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            user: user,
						token:token
          });
        }   

      }

    });
  });

  // TODO: route middleware to verify a token
  apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });

    } else {
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      }); 
    }
  });

  // route to show a random message (GET http://localhost:8080/api/)
  apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
  });

  // route to return all users (GET http://localhost:8080/api/users)
  apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });   
  // apply the routes to our application with the prefix /api
  app.use('/api', apiRoutes);
}