'use strict';

//Initial few tests, need to expand.

var chai = require('chai'),
	chaiModel = require('./helpers/canvas.js'),
	assert = require('chai').assert,
	expect = require('chai').expect;

chai.use(chaiModel);

var Canvas = require('../canvas/canvas.js');
var testJSON = require('./resources/importCanvas.json');

describe('Canvas', function() { 

	//var canvas=document.getElementById("canvas");

	//Test Canvas Creation
    describe('#new Canvas()', function () {
        var canvas = new Canvas();
        it('new canvas should be of the Canvas class', function (){
            expect(canvas).to.be.a.canvas(Canvas.type);
        });

        it('new canvas should be 800 high and 1200 wide', function (){
            var d = canvas.getDimensions();
            assert.equal(d.h, 800, 'Default height = 800');
            assert.equal(d.w, 1200, 'Default width = 1200');
        });

        it('new canvas should be in the stopped state', function (){
            assert.equal(canvas.getState(), 'stop', 'Canvas should be created in a stopped state');
        });

    });

    describe('#initialized Canvas()', function () {
        var canvas = new Canvas();
        var context = null;  // need to mock the context element
        canvas.initialize(context, 'new canvas');

        it('initialized canvas should be of the Canvas class', function (){
            expect(canvas).to.be.a.canvas(Canvas.type);
        });

        it('initialized canvas should be in the stopped state', function (){
            assert.equal(canvas.getState(), 'stop', 'Canvas should be created in a stopped state');
        });


		
	
    });

    describe('#import()', function () {
        var canvas = new Canvas();
        //console.log(testJSON);
        canvas.import(testJSON, function(err,res){
            /*if(err) {
                console.log(err)
            } else {
                console.log(res);
                canvas.getActiveObjects(function (err, res){console.log(res)});
            };*/
        });
        it('canvas should be of the Canvas class after import', function (){
            expect(canvas).to.be.a.canvas(Canvas.type);
        });

        it('imported canvas should be in the stopped state', function (){
            assert.equal(canvas.getState(), 'stop', 'Canvas should be created in a stopped state');
        });


        
    
    });


    describe('#export()', function () {
        var canvas = new Canvas();

        
    
    });

});
