'use strict';

//Initial few tests, need to expand.

var chai = require('chai'),
	chaiModel = require('./helpers/canvas.js'),
	assert = require('chai').assert,
	expect = require('chai').expect;

chai.use(chaiModel);

var Canvas = require('../canvas/canvas.js');

console.log('canvas tests yet to be fully implemented');
//note: working on canvas-connector tests first.

describe('Canvas', function() { 

	//var canvas=document.getElementById("canvas");

	//Test Canvas Creation
    describe('#new Canvas()', function () {
        var canvas = new Canvas();
        it('new canvas should be of the Canvas class', function (){
            expect(canvas).to.be.a.canvas(Canvas.type);
        });

        it('initialized canvas should start in the stopped state', function (){
            d = canvas.getDimensions();
            assert.equal(d.height, 800, 'Default height = 800');
            assert.equal(d.width, 1200, 'Default width = 1200');
            //expect(connector).to.be.a.connector(Connector.type);
        });

        /*

        it('new connector should have the colour "Blue"', function (){
            assert.equal(connector.colour, 'Blue', 'New Connector should be Blue');
            //expect(connector).to.be.a.connector(Connector.type);
        });
		*/

    });

    describe('#initialized Canvas()', function () {
        var canvas = new Canvas();
        var context = null;  // need to mock the context element
        canvas.initialize(context, 'new canvas');

        it('initialized canvas should be of the Canvas class', function (){
            expect(canvas).to.be.a.canvas(Canvas.type);
        });

        it('initialized canvas should start in the stopped state', function (){
            assert.equal(canvas.getState, 'stop', 'Canvas should be created in a stopped state');
            //expect(connector).to.be.a.connector(Connector.type);
        });


		
	
    });

});
