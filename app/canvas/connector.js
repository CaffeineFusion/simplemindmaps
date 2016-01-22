'use strict';
var _ = require('underscore');
var ParseJSON = require('../helpers/parseJSON');
var DrawingObject = require('./drawingObject');
var Extend = require('../helpers/extend');

/**
 * Connector The Connector object is the basic drawing element to connect two 
 * 		labelled Ovals together
 */
var Connector = function Connector() {

	this.points = {a:{x:0, y:0}, b:{x:10, y:10}};
	this.style = {lineWidth:5, strokeStyle:'black'};

	var applyStyle = function(context) {
		this.parent.applyStyle();		//Note: parent is added via Extend()
	};

	this.greyOut = function() {
		throw('grey out has not yet been implemented');
	};

	this.setTransparency = function() {
		throw('transparency has not yet been implemented');
	};
};



//Functions to add to prototype

/**
 * [initialize description]
 * @param  {object} pts takes the two points to define the line {a:{x,y}, b:{x,y}}
 * @return {Connector} this    	returns self.
 */
var initialize = function (pts) {
	this.points = pts;
	return this;
};

var getPoints = function() {
	return this.points;
};

//How will the context passing function when async?
var draw = function(context) {
	context.beginPath();
	context.moveTo(this.points.a.x, this.points.a.y);
	context.lineTo(this.points.b.x, this.points.b.y);
	applyStyle(context);
	context.stroke();
};


var toJSON = function(callback) {
	var res = {};// this.parent.toJSON(callback(err, res){});
	res.type = this.constructor.name;
	res.style = this.style;
	res.points = this.points;		
	callback(null, res);
	return res;
}

//Set up DrawingObject as parent on prototype chain.
//	note: Extend takes the passed functions and adds them to the prototype.
Connector = Extend(DrawingObject, Connector, {initialize:initialize, 
	getPoints:getPoints, draw:draw, toJSON:toJSON});

module.exports = Connector;