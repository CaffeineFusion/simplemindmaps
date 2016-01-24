var Canvas = require('./canvas/canvas.js');
var ExampleJSON = require('../test/resources/importCanvas.json');
var Input = require('./helpers/input.js');
//var view = require('../server/models/view.js');

function Initialize (htmlCanvas) {

    var c = new Canvas();
    console.log('initializing');
    c.initialize(htmlCanvas, 'myNewMindMap');

    console.log('binding - not yet implemented');
    Input.Bind(htmlCanvas, c, function (err, res) {
        console.log(err); console.log(res); //For current debugging
    });

    console.log('importing');
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

}

Initialize(document.getElementById('mindmapCanvas'));

