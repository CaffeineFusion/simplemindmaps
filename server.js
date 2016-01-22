'use strict';
/*global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};*/

var express = require('express'),
	routes = require('./server/routes');
var hbs = require('express-handlebars');


var app = express();

app.set('views', __dirname + "/server/views");
app.engine('handlebars', hbs({defaultLayout: __dirname + '/server/views/layouts/main'})); //, layout:'app/views/layouts'}));
app.set('view engine', 'handlebars');
app.locals.title = 'Simple Mind Maps';
app.use(express.static(__dirname + '/public'));


app.get('/', routes.index);//function(req, res) {
   
   //res.render('home');
   //res.send();
//});

app.use(express.static('app'));


app.listen(3000, function() {
	console.log('express web server listening on port %d on localhost in %s mode', 3000, app.settings.env);});
