'use strict';
/*global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};*/

var express = require('express');
var hbs = require('express-handlebars');


var app = express();
app.set('views', __dirname + "/app/views");
app.engine('handlebars', hbs({defaultLayout: __dirname + '/app/views/layouts/main'})); //, layout:'app/views/layouts'}));
app.set('view engine', 'handlebars');

app.locals.title = 'Simple Mind Maps';

app.get('/', function(req, res) {
   res.render('home');
   //res.send();
});


console.log('express web server listening on port 3000');
app.listen(3000);
