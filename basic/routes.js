module.exports = function(app) {
	
	app.get('/', function(req, res) {
		res.send('Welcome!');
	});

	app.get('/hello.text', function(req, res) {
		res.send('Hola!');
	});

	app.get('/contact'. function(req, res) {
		res.render('contact');
	});
}