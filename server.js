'use strict';
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
};

var express = require('express');
var hbs = require('express-handlebars');


var app = express();

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
   res.render('home');
   //res.send();
});


console.log('express web server listening on port 3000');
app.listen(3000);
