"use strict";

//init chai
var chai = require("chai"), 
	chaiModel = require("./helpers/connector"),
	assert = require("chai").assert,
	expect = require("chai").expect;
chai.use(chaiModel);


var Connector = require("../helpers/connector.js");
var connector = new Connector();


describe("Connector", function() { 
    describe("#new Connector()", function () {
        expect(connector).to.be.a.connector(Connector.type);
    });

    describe("#initialize()", function () {
        expect(connector).to.be.a.connector();
    });
});

//assert.equal(this.oval.getStyle(), {fillStyle:"#8ED6FF", lineWidth:5, strokeStyle:"black"}, "default style");
console.log(connector.getColour());
connector.initialize("Rainbow",{a:{x:1, y:1}, b:{x:1,y:10}});
console.log(connector.getColour());

