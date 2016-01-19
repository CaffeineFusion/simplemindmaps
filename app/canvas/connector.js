module.exports = function Connector() {
	'use strict';

	this.colour = 'Blue';
	this.points = {a:{x:0, y:0}, b:{x:10, y:10}};
	this.style = {lineWidth:5, strokeStyle:'black'};

	this.initialize = function (clr, points) {
		this.colour = clr;
		this.points = points;
		this.setStyle({lineWidth:5, strokeStyle:'black'});
	};

	this.getColour = function() {
		return this.colour;
	};

	this.setStyle = function(style) {
		this.style = style;
	};

	this.getStyle = function() {
		return this.style;
	};

	//todo: seperate style into loadable format
	this.applyStyle = function(context) {
	    context.fillStyle = this.style.fillStyle;
	    context.fill();
	    context.lineWidth = this.style.lineWidth;
	    context.strokeStyle = this.style.strokeStyle;
	};

	this.draw = function(context) {

		/*context.save();
		context.beginPath();
		context.arc(dimensions.x, dimensions.y, 0 , 2 * Math.PI, false);
		context.restore();
		this.applyStyle(context);
		context.stroke();*/

	};
		
	this.greyOut = function() {
		throw('grey out has not yet been implemented');
	};

	this.setTransparency = function() {
		throw('transparency has not yet been implemented');
	};
};