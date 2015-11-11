var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express= require('express');

module.exports = function(app, User) {

  // =======================
  // routes ================
  // =======================
  // basic route
  app.get('/', function(req, res) {
      res.sendfile('./public/index.html'); // load our public/index.html file
  });

  app.get('/setup', function(req, res) {
    // create a sample user
    var nick = new User({ 
      name: 'admin', 
      password: 'admin',
      admin: true,
			role: 0
    });

    // save the sample user
    nick.save(function(err) {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true });
    });
  });
	
	//Get all users designers
	app.get('/getAllDesigners', function(req, res) {
    User.find({role:0}, function(err, users) {
      res.json(users);
    });
  });
	
	app.post('/createUser', function(req, res) {
    // create a sample user
    var user = new User({ 
      name: req.body.name, 
      password: req.body.password,
      admin: false,
			role: req.body.role
    });

    // save the sample user
    user.save(function(err) {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true });
    });
  });

  // API ROUTES -------------------

  // get an instance of the router for api routes
  var apiRoutes = express.Router(); 

  // route to authenticate a user (POST http://localhost:8080/api/authenticate)
  apiRoutes.post('/authenticate', function(req, res) {
    // find the user
    User.findOne({
      name: req.body.name
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
	
	// route to show a random message (GET http://localhost:8080/api/)
  apiRoutes.get('/getUser', function(req, res) {
    User.findOne({
      name: req.headers['username']
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) res.json({user: user});
    });
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