var Canvas = require('./canvas/canvas.js');
var ExampleJSON = require('../test/resources/importCanvas.json');
//var view = require('../server/models/view.js');

var initialize = function (htmlCanvas) {
    var example;

    var c = new Canvas();
    console.log(htmlCanvas);
    c.initialize(htmlCanvas, 'myNewMindMap');

    c.import(ExampleJSON, function(err, res) { 
        if(err) { console.log(err); return; }
        c.run();
    });

    /*ParseJSON.loadJSON('localhost', 'examples/importCanvas.json', function(err, res) {
        if(err) { console.log(err); return; }
        c.import(res, function(err, res) { 
            if(err) { console.log(err); return; }
            c.run();
        });
    });*/
};

initialize();

  