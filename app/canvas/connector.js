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

	var points = {a:{x:0, y:0}, b:{x:10, y:10}};
	this.style = {lineWidth:5, strokeStyle:'black'};

	/**
	 * [initialize description]
	 * @param  {colour} clr takes the Colour for the connector
	 * @param  {object} pts takes the two points to define the line {a:{x,y}, b:{x,y}}
	 * @return {null}     	currently no return
	 */
	this.initialize = function (pts) {

		points = pts;
		//this.setStyle({lineWidth:5, strokeStyle:'black'});
	};


	//applyStyle is part of the drawing logic.
	//  It takes the current style and applies it to the drawing that has just been made onto the context.
	
	//todo : make apply Style a private function.

	this.applyStyle = function(context) {
		this.parent.applyStyle();		//Note: parent is added via Extend()
	};


	//How will the context passing function when async?
	this.draw = function(context) {

		context.beginPath();
		context.moveTo(points.a.x, points.a.y);
		context.lineTo(points.b.x, points.b.y);
		this.applyStyle(context);
		context.stroke();

	};
		
	this.greyOut = function() {
		throw('grey out has not yet been implemented');
	};

	this.setTransparency = function() {
		throw('transparency has not yet been implemented');
	};

	this.getPoints = function() {
		return points;
	};
};


/*Object.defineProperty(Connector, 'style', {

    get: function() {
    	if(!this.style)
    		this.style = {lineWidth:5, strokeStyle:'black'};
        return this.style;
    },
    set: function(jsonString) {
    	var j = ParseJSON(jsonString);
    	//ParseJSON returns false if the string is not valid JSON
        if (!j)
            console.log('Style ' + jsonString.toString() + ' is not valid JSON!');
        else
            this.style = jsonString;
    }
});*/

//Set up DrawingObject as parent on prototype chain.
Connector = Extend(DrawingObject, Connector, null);

module.exports = Connector;