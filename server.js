// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var http 				= require('http');
var jwt    			= require('jsonwebtoken'); // used to create, sign, and verify tokens
var config 			= require('./config'); // get our config file
var User   			= require('./app/models/user'); // get mongoose model
var Contest   	= require('./app/models/contest'); // get mongoose model
var Images_Contest = require('./app/models/images_contest'); // get mongoose model
var Intention    = require('./app/models/intention'); // get mongoose model
var Images_Project = require('./app/models/images_project'); // get mongoose model
var Project    = require('./app/models/project'); // get mongoose model
var Comment    = require('./app/models/comment'); // get mongoose model

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
require('./app/routes.js')(app, User, Contest, Project, Intention);
require('./app/routes/contestRoutes.js')(app, Contest, Images_Contest, Intention, Project, Comment);
require('./app/routes/projectRoutes.js')(app, Project, Images_Project, User, Contest);


app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
// =======================
// start the server ======
// =======================
app.listen(port);

console.log('Magic happens at http://localhost:' + port);