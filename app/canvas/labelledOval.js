/*	todo:
	object transparency
	highlight function for mouse over
	greyed out for transparent mode for dragging
	links to connectors
*/

'use strict';
var Label = require('./label');
var DrawingObject = require('./drawingObject');
var Extend = require('../helpers/extend');
var Contains = require('../helpers/contains');

/**
 * LabelledOval The LabelledOval is the basic drawing object which visually represents 
 * 		an idea model and renders it on the canvas object
 * @return {object} LabelledOval returns a new LabelledOval object. The
 *      implementation is slightly different to the connector object and one needs
 *      to be updated to align with the other.
 */
var LabelledOval = function LabelledOval() {

	//todo: Add ID.
	//		Make Private. Provide facade. Track changes to dimensions
	this.dimensions = {x:0, y:0, h:10, w:10};  
	this._style = {fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'};

	//Because everyone *loves* Radians
	//todo: how does the return value handle the decimal?
	var degreesToRadians = function(degrees) {
		return degrees * (Math.PI / 180);
	};
	
	this.greyOut = function() {
		throw('grey out has not yet been implemented');
	};

	this.setTransparency = function() {
		throw('transparency has not yet been implemented');
	};


	this.draw = function(context) {
		context.save();
		//context.translate(50, 40); //todo: un-hardbake
		//this.scaleRatio = {h:this.dimensions.h, w:this.dimensions.w};
		context.scale(this.scaleRatio.w, this.scaleRatio.h);
		context.beginPath();
		//todo: fix the scaleRatio setting of x and y
		context.arc(this.dimensions.x/this.scaleRatio.w, this.dimensions.y/this.scaleRatio.h, 
			(this.dimensions.h + this.dimensions.w)/4, degreesToRadians(360), false);
		context.restore();
		this.applyStyle(context);
		context.fill();
		context.stroke();
		//context.stroke();
	};
};





//Functions to add to prototype.

var applyStyle = function(context ) {
	
	this.parent.applyStyle.call(this, context);
};

//initialize(str, {x,y,h,w})
//
var initialize = function (lbl, dimensions) {
	this.title = lbl; 
	this.dimensions = dimensions;
	this.scaleRatio = {h:dimensions.h, w:dimensions.w};
};


var toObj = function(callback) {
	var res = {};//this.parent.toJSON(callback(err, res){});
	res.type = this.constructor.name;
	res.style = this.style;
	res.title = this.title;
	res.dimensions = this.dimensions;
	callback(null, res);
	return res;
};

var contains = function(point, callback) {
	callback(null, Contains.EllipseContains(point, {x:this.dimensions.x, y:this.dimensions.y}, 
		this.dimensions.w, this.dimensions.h)); 
}



//Create Inheritance and Add Functions to Prototype
LabelledOval = Extend(DrawingObject, LabelledOval, {applyStyle:applyStyle, initialize:initialize, 
	toObj:toObj, contains:contains});




//Define Getters and Setters
//Note: would be overriden by Extend.
Object.defineProperty(LabelledOval.prototype, 'title', {
	get: function() {
		if(!this._title) {
			return null;
		}
		return this._title.text;
	},
	set: function(title) {
		if(!this._title) {
			this._title = new Label();
			console.log('todo: add initialization logic for label');
		}
		this._title.text = title;
	}
});


//todo: caching result
Object.defineProperty(LabelledOval.prototype, 'scaleRatio', {

	get: function() {
		if(!this._scaleRatio){
			return null;
		}
		return this._scaleRatio;
	},
	set: function(d) {
		var base = 2/(d.h + d.w);
		this._scaleRatio = {h:base*d.h, w:base*d.w};
	}
});



module.exports = LabelledOval;