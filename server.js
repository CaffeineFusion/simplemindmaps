var express = require('express');
var app = express();

app.get('/', function(req, res) {
   res.send('Not yet implemented');
});


console.log("express web server listening on port 3000");
app.listen(3000);
