'use strict';

//init chai
var chai = require('chai'), 
	chaiModel = require('./helpers/connector'),
	assert = require('chai').assert,
	expect = require('chai').expect;
chai.use(chaiModel);

var Connector = require('../canvas/connector.js');

describe('Connector', function() { 
    describe('#new Connector()', function () {
        var connector = new Connector();
        it('new connector should be of the Connector class', function (){
            expect(connector).to.be.a.connector(Connector.type);
        });

        it('new connector should have the colour "Blue"', function (){
            assert.equal(connector.colour, 'Blue', 'New Connector should be Blue');
            //expect(connector).to.be.a.connector(Connector.type);
        });

        //find easy way to match object parameters. Assert does not permit the following tests.
        it('new connector should have the points {a:{x:1, y:1}, b:{x:1,y:10}}', function (){
            assert.equal(connector.points, {a:{x:0, y:0}, b:{x:10, y:10}}, 'Connector should have the points {a:{x:1, y:1}, b:{x:1,y:10}}');
            //expect(connector).to.be.a.connector(Connector.type);
        });

        it('new connector should have the style {lineWidth:5, strokeStyle:"black"}', function (){
            assert.equal(connector.style, {lineWidth:5, strokeStyle:'black'}, 'Connector should have the style {lineWidth:5, strokeStyle:"black"}');
            //expect(connector).to.be.a.connector(Connector.type);
        });

    });


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
            assert.equal(connector.points, {a:{x:1, y:1}, b:{x:1,y:10}}, 'Connector should have the points {a:{x:1, y:1}, b:{x:1,y:10}}');
            //expect(connector).to.be.a.connector(Connector.type);
        });

    });
});


