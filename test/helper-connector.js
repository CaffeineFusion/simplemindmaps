"use strict";

//init chai
var chai = require("chai"), 
	chaiModel = require("./helpers/connector"),
	assert = require("chai").assert,
	expect = require("chai").expect;
chai.use(chaiModel);


var Connector = require("../helpers/connector.js");
var connector = new Connector();


//describe("LabelledOval", function() { 
//    describe("#initialize()", function () {
        expect(connector).to.be.a.connector();
//    });
//});

console.log(connector.getColour());
connector.initialize("rainbow",{a:{x:1, y:1}, b:{x:1,y:10}});
console.log(connector.getColour());

