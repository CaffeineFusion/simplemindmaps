"use strict";

//init chai
var chai = require("chai"), 
	chaiModel = require("./helpers/labelledOval"),
	assert = require("chai").assert,
	expect = require("chai").expect;
chai.use(chaiModel);


var LabelledOval = require("../helpers/labelledOval.js");
var oval = new LabelledOval();

/*expect(oval).to.be.a.labelledOval();

//console.log(labelledOval.toString());

//v = new view('newView');
//console.log(v.getIdea());


describe("LabelledOval", function() {
  describe("#initialize()", function () {
    it("The label, colour, dimensions should be initialized " +
     "as requested and the default style applied", function () {
     	this.oval.initialize("soup", "soup", {x:1,y:1,length:1,width:1});
     	(console.log(this.oval.getStyle()))();
     	assert.equal(this.oval.getStyle(), {fillStyle:"#8ED6FF", lineWidth:5, strokeStyle:"black"}, "default style");
    });
  });


  describe("#setStyle()", function () {
    it("Change the style of the oval", function () {
     	this.oval.initialize("soup", "soup", {x:1,y:1,length:1,width:1});
     	var style = oval.getStyle();
     	expect(style).to.be({fillStyle:"#8ED6FF", lineWidth:5, strokeStyle:"black"}, "default style");
     	this.oval.setStyle({fillStyle:"#AAAAAA", lineWidth:7, strokeStyle:"orange"});
     	style = oval.getStyle();
     	expect(style).to.be({fillStyle:"#AAAAAA", lineWidth:7, strokeStyle:"orange"}, "default style");
    });
  });
});
*/

//assert.equal(view.addIdea('testIdea1'), 0, 'first idea created with id = 0');
