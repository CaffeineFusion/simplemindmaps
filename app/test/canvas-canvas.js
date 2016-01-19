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


	//Test Canvas Creation
    describe('#new Canvas()', function () {
        var canvas = new Canvas();
        it('new canvas should be of the Canvas class', function (){
            expect(canvas).to.be.a.canvas(Canvas.type);
        });

        /*

        it('new connector should have the colour "Blue"', function (){
            assert.equal(connector.colour, 'Blue', 'New Connector should be Blue');
            //expect(connector).to.be.a.connector(Connector.type);
        });
		*/

    });
});
