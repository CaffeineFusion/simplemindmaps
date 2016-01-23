var Canvas = require('./canvas/canvas.js');
var ExampleJSON = require('../test/resources/importCanvas.json');
//var view = require('../server/models/view.js');

function Initialize (htmlCanvas) {
    var example;

    var c = new Canvas();
    console.log(htmlCanvas);
    c.initialize(htmlCanvas, 'myNewMindMap');

    c.import(ExampleJSON, function(err, res) { 
        if(err) { console.log(err); return; }
        c.run();
    });

    console.log(c);

    /*ParseJSON.loadJSON('localhost', 'examples/importCanvas.json', function(err, res) {
        if(err) { console.log(err); return; }
        c.import(res, function(err, res) { 
            if(err) { console.log(err); return; }
            c.run();
        });
    });*/

};

Initialize(document.getElementById('mindmapCanvas'));

