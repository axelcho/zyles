//npm includes files
var express = require('express'), app = express(), cons = require('consolidate'), swig = require('swig'), MongoClient = require('mongodb').MongoClient, routes = require('./routes'); 

//set up path variable
var path = require('path');

MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
    "use strict";
    if(err) throw err;

    //Swig template engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
	
	//default swig directory, more work required here
	swig.init({ root: __dirname + '/views' });
    
	//cookie
    app.use(express.cookieParser());

    //body parser
    app.use(express.bodyParser());
	
	//add public paths
	app.use("/images", express.static(path.join(__dirname, '/public/images')));
	app.use("/css", express.static(path.join(__dirname, '/public/css')));
	app.use("/js", express.static(path.join(__dirname, '/public/js')));
	app.use("/fonts", express.static(path.join(__dirname, '/public/fonts')));
	
	//add favicon
	app.use(express.favicon(path.join(__dirname, '/public/images/favicon.ico'))); 

    // Application routes
    routes(app, db);

    var io = require('socket.io').listen(app.listen(80));
	
	io.sockets.on('connection', function (socket) {
		socket.emit('message', { message: 'Welcome to the Zyles.' });
		socket.on('send', function (data) {
			io.sockets.emit('message', data);
		});
	});
    console.log('Express server listening on port 80');
});
