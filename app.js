var express = require('express')
  , app = express() // Web framework to handle routing requests
  , cons = require('consolidate') // Templating library adapter for Express
  , swiq = require('swig')
  , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
  , routes = require('./routes'); // Routes for our application
  
var path = require('path');

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
    "use strict";
    if(err) throw err;

    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

	/* Tell swig where to look for templates when one extends another. */
	swig.init({ root: __dirname + '/views' });
    
	// Express middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());

    // Express middleware to populate 'req.body' so we can access POST variables
    app.use(express.bodyParser());
	
	//add public paths
	app.use("/images", express.static(path.join(__dirname, '/public/images')));
	app.use("/css", express.static(path.join(__dirname, '/public/css')));
	app.use("/js", express.static(path.join(__dirname, '/public/js')));
	app.use("/fonts", express.static(path.join(__dirname, '/public/fonts')));

    // Application routes
    routes(app, db);

    app.listen(80);
    console.log('Express server listening on port 80');
});
