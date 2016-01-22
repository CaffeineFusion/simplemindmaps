/*	todo:
	object transparency
	highlight function for mouse over
	greyed out for transparent mode for dragging
*/

'use strict';
var Label = require('./label');
var DrawingObject = require('./drawingObject');
var Extend = require('../helpers/extend');

/**
 * LabelledOval The LabelledOval is the basic drawing object which visually represents 
 * 		an idea model and renders it on the canvas object
 * @return {object} LabelledOval returns a new LabelledOval object. The
 *      implementation is slightly different to the connector object and one needs
 *      to be updated to align with the other.
 */
var LabelledOval = function LabelledOval() {

	//todo: Add ID.
	this.dimensions = {x:0, y:0, h:10, w:10};
	this.style = {fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'};

	this.draw = function(context) {
		context.beginPath();
		context.arc(this.dimensions.x, this.dimensions.y, 0 , degreesToRadians(360), false);
		this.applyStyle(context);
		context.stroke();
	};
	
	this.greyOut = function() {
		throw('grey out has not yet been implemented');
	};

	this.setTransparency = function() {
		throw('transparency has not yet been implemented');
	};

	//Because everyone *loves* Radians
	//todo: how does the return value handle the decimal?
	var degreesToRadians = function(degrees) {
		return degrees * (Math.PI / 180);
	};

};

//Getters and Setters
Object.defineProperty(LabelledOval, 'title', {
	get: function() {
		if(!this.title) {
			return null;
		}
		return this.title.text;
	},
	set: function(title) {
		if(!this.title) {
			this.title = new Label();
			console.log('todo: add initialization logic for label');
		}
		this.title.text = title;
	}
});

//Functions to add to prototype.

var applyStyle = function(context) {
	this.parent.applyStyle(context);		//Note: parent is added via Extend();
    context.fill();
};

//initialize(str, {x,y,h,w})
//
var initialize = function (lbl, dimensions) {
	this.title = lbl; 
	this.dimensions = dimensions;
};


Extend(DrawingObject, LabelledOval, {applyStyle:applyStyle, initialize:initialize});

module.exports = LabelledOval;