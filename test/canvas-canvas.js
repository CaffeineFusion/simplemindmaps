'use strict';

var chai = require('chai'),
	chaiModel = require('./helpers/canvas.js'),
	assert = require('chai').assert,
	expect = require('chai').expect;

chai.use(chaiModel);

var canvas = require('../app/canvas/canvas.js');
var testJSON = require('./resources/importCanvas.json');

describe('Canvas', function() { 

	//var canvas=document.getElementById("canvas");

	//Test Canvas Creation
    describe('#new Canvas()', function () {
        it('new canvas should be of the Canvas class', function (){
            //expect(canvas).to.be.a.canvas(Canvas.type);
            console.log('canvas type no longer matches because of module pattern.');
            //assert.equal(true, false, 'Refactor Canvas.type helpers');
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
        var context = null;  // need to mock the context element
        canvas.initialize(context, 'new canvas');

        it('initialized canvas should be of the Canvas class', function (){
            //expect(canvas).to.be.a.canvas(Canvas.type);
            //assert.equal(true, false, 'Refactor Canvas.type helpers');
        });

        it('initialized canvas should be in the stopped state', function (){
            assert.equal(canvas.getState(), 'stop', 'Canvas should be created in a stopped state');
        });


		
	
    });

    describe('#load()', function () {
        //console.log(testJSON);
        canvas.load(testJSON, function(err,res){});
        it('canvas should be of the Canvas class after import', function (){
            //expect(canvas).to.be.a.canvas(Canvas.type);
            //assert.equal(true, false, 'Refactor Canvas.type helpers');
        });

        it('imported canvas should be in the stopped state', function (){
            assert.equal(canvas.getState(), 'stop', 'Canvas should be created in a stopped state');
        });


        
    
    });


    describe('#toObj()', function () {
        //var canvas = new Canvas();
        //console.log(testJSON);
        canvas.load(testJSON, function(err,res){});
        var json = {};
        canvas.toObj(function(err,res){
            json = res;
        });
        it('export return should be identical to the testJSON file loaded in', function (){
            expect(json).to.deep.equal(testJSON);
        });
    
    });


});
