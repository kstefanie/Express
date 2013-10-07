
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

// Load BEFORE app is instantiated
var namespace = require('express-namespace');
var resouce = require('express-resource');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.namespace('/articles', function() {

	app.get('/', function(req, res) {
		res.send('index of articles');
	});

	app.get('/new', function(req, res) {
		res.send('new article');
	});

	app.get('/edit/:id', function(req, res) {
		res.send('edit article ' + req.params.id);
	});

	app.get('/2013', function(req, res) {
		res.send('articles from 2013');
	});

	// Namespaces can be nested
	app.namespace('/2013/jan', function() {
		app.get('/', function(req, res) {
			res.send('articles from Jan 2013');
		});

		app.get('/nodejs', function(req, res) {
			res.send('articles about Node from jan 2013');
		});
	});
});

app.resource('users', require('./users.js'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
