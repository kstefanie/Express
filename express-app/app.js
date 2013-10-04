// Include the node HTTP library
var http = require('http');
// Include the Express module
var express = require('express');
// Create an instance of Express
var app = express();

// Load the iniparser module
var iniparser = require('iniparser');
// Read the ini file and populate the content on the config object
var config = iniparser.parseSync('./config.ini');

// Set the view engine
app.set('view engine', 'jade');
// Where to find the view files
app.set('views', './views');

// Mark the public dir as a static dir
app.use(express.static('./public'));
// Add the responseTime middleware
app.use(express.responseTime());
// Expliciyly add the router middleware
app.use(app.router);


// Setup for production environment
if ('production' === app.get('env')) {
	app.get('/', function(req, res) {
		res.render('index', {title:config.title, message:config.message});
	});
}

// Setup for development environment
if ('development' === app.get('env')) {
	// Add the errorHandler middleware
	app.use(express.errorHandler());
	app.get('/', function(req, res) {
		res.send('development mode test');
	});
}
// A route for the home page - will render a view
app.get('/test', function(req, res) {
	res.send('works on all environment');
});

// A route for /say-hello - will render a view
app.get('/say-hello', function(req, res){
	res.render('hello');
});

app.get('/test', function(req, res){
	res.send('this is a test');
});

app.get('/fail', function(req, res){
	fail();
});

//start the app
http.createServer(app).listen(3000, function() {
	console.log('App started on port ' + config.port);
});