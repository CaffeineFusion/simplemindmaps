'use strict';

//init chai
var chai = require('chai'), 
    chaiModel = require('./helpers/labelledOval'),
    assert = require('chai').assert,
    expect = require('chai').expect;
chai.use(chaiModel);


var LabelledOval = require('../canvas/labelledOval.js');
console.log(new LabelledOval());

//var oval = new LabelledOval();

//LabelledOval.initialize();

//expect(oval).to.be.a.labelledOval(LabelledOval.type);

//console.log(labelledOval.toString());

//v = new view('newView');
//console.log(v.getIdea());
/*

describe('LabelledOval', function() {
  describe('#initialize()', function () {
    it('The label, colour, dimensions should be initialized ' +
     'as requested and the default style applied', function () {

     	(console.log(this.oval))();
     	//this.oval.initialize('soup', 'soup', {x:1,y:1,length:1,width:1});
     	(console.log(this.oval.style()))();
     	//assert.equal(this.oval.getStyle(), {fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'}, 'default style');
    });
  });


  describe('#style()', function () {
    it('Change the style of the oval', function () {
     	//oval.initialize('soup', 'soup', {x:1,y:1,length:1,width:1});
     	var style = oval.style();
     	//expect(style).to.be({fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'}, 'default style');
     	//oval.style({fillStyle:'#AAAAAA', lineWidth:7, strokeStyle:'orange'});
     	style = oval.style();
     	//expect(style).to.be({fillStyle:'#AAAAAA', lineWidth:7, strokeStyle:'orange'}, 'default style');
    });
  });
});
*/

//assert.equal(view.addIdea('testIdea1'), 0, 'first idea created with id = 0');
