'use strict';

//Initial few tests, need to expand.

//Init chai
var chai = require('chai'), 
	chaiModel = require('./helpers/connector'),
	assert = require('chai').assert,
	expect = require('chai').expect;
chai.use(chaiModel);

var Connector = require('../canvas/connector.js');

describe('Connector', function() { 


    //Test Connector Creation
    describe('#new Connector()', function () {
        var connector = new Connector();
        it('new connector should be of the Connector class', function (){
            expect(connector).to.be.a.connector(Connector.type);
        });

        it('new connector should have the colour "Blue"', function (){
            assert.equal(connector.colour, 'Blue', 'New Connector should be Blue');
        });

        //find easy way to match object parameters. Assert does not permit the following tests.
        it('new connector should have the points {a:{x:0, y:0}, b:{x:10,y:10}}', function (){
            expect(connector.getPoints()).to.deep.equal({a:{x:0, y:0}, b:{x:10, y:10}});
        });

        it('new connector should have the style {lineWidth:5, strokeStyle:"black"}', function (){
            expect(connector.style).to.deep.equal({lineWidth:5, strokeStyle:'black'});
            //expect(connector).to.be.a.connector(Connector.type);
        });

    });


    //Test Connector Initialization
    describe('#initialize()', function () {

        var connector = new Connector();
        connector.initialize('Rainbow',{a:{x:1, y:1}, b:{x:1,y:10}});

        it('initialized connector should be of the Connector class', function (){
            expect(connector).to.be.a.connector(Connector.type);
        });

        it('initialized connector should have the colour "Rainbow"', function (){
            assert.equal(connector.colour, 'Rainbow', 'Connector initialized with the colour Rainbow');
            //expect(connector).to.be.a.connector(Connector.type);
        });

        it('initialized connector should have the points {a:{x:1, y:1}, b:{x:1,y:10}}', function (){
            expect(connector.getPoints()).to.deep.equal({a:{x:1, y:1}, b:{x:1,y:10}});
            //expect(connector).to.be.a.connector(Connector.type);
        });

    });
});


