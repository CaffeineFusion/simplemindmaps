'use strict';

//init chai
var chai = require('chai'), 
    chaiModel = require('./helpers/labelledOval'),
    assert = require('chai').assert,
    expect = require('chai').expect;
chai.use(chaiModel);


var LabelledOval = require('../canvas/labelledOval.js');

describe('LabelledOval', function() {

    describe('#new Labelled Oval()', function () {

        var oval = new LabelledOval();

        it('new oval should be of the LabelledOval class', function (){
            expect(oval).to.be.a.labelledOval(LabelledOval.type);
        });

        it('new oval should have the style {fillStyle:"#8ED6FF", lineWidth:5, strokeStyle:"black"}', function (){
            expect(oval.style).to.deep.equal({fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'});
        });

    });


    describe('#initialize()', function () {

        var oval = new LabelledOval();
        oval.initialize('soup', {x:0, y:0, h:10, w:10});

        it('Initialized oval should be of the LabelledOval class', function (){
            expect(oval).to.be.a.labelledOval(LabelledOval.type);
        });

        it('Initialized oval should have the dimensions {x:0, y:0, h:10, w:10}', function (){
            expect(oval.dimensions).to.deep.equal({x:0, y:0, h:10, w:10});
        });

        it('Initialized oval should have the label "soup"', function () {
            assert.equal(oval.title, 'soup', 'Initialized oval should have the label "soup"');
        });

    });


    describe('#style', function () {

        var oval = new LabelledOval();

        it('oval should have the style {fillStyle:"#8ED6FF", lineWidth:5, strokeStyle:"black"}', function (){
            expect(oval.style).to.deep.equal({fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'});
        });

        it('oval should have the style {fillStyle:"#8ED6FF", lineWidth:5, strokeStyle:"blue"}', function (){
            oval.style = {fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'blue'};
            expect(oval.style).to.deep.equal({fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'blue'});
        });

        it('oval should have the style {fillStyle:"#8ED6FF", lineWidth:1, strokeStyle:"blue"}', function (){
            oval.style = {fillStyle:'#8ED6FF', lineWidth:1, strokeStyle:'blue'};
            expect(oval.style).to.deep.equal({fillStyle:'#8ED6FF', lineWidth:1, strokeStyle:'blue'});
        });

        it('oval should have the style {fillStyle:"#AAAAAA", lineWidth:1, strokeStyle:"blue"}', function (){
            oval.style = {fillStyle:'#AAAAAA', lineWidth:1, strokeStyle:'blue'};
            expect(oval.style).to.deep.equal({fillStyle:'#AAAAAA', lineWidth:1, strokeStyle:'blue'});
        });

    });


    describe('#title', function () {

        var oval = new LabelledOval();

        it('title should return null for new oval', function (){
            assert.equal(oval.title, null, 'title should return null for new oval');
        });

        it('oval should return "bananas"', function (){
            oval.title = 'bananas';
            assert.equal(oval.title, 'bananas', 'title should return "bananas"');
        });

        it('test for internal label', function (){
            assert.equal(true,false, 'not implemented yet');
            console.log("todo: write tests for labels on LabelledOval");
        });
    });

    describe('#applyStyle()', function(){});

    describe('#draw()', function(){});
});


//assert.equal(view.addIdea('testIdea1'), 0, 'first idea created with id = 0');
