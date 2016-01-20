/*	object transparency
	highlight function for mouse over
	greyed out for 
	transparent mode for dragging

	experimented with different module structures
*/

'use strict';

/**
 * LabelledOval The LabelledOval is the basic drawing object which visually represents 
 * 		an idea model and renders it on the canvas object
 * @return {object} LabelledOval returns a new LabelledOval object. The
 *      implementation is slightly different to the connector object and one needs
 *      to be updated to align with the other.
 */
module.exports = function LabelledOval() {
	var LabelledOval = {

		label:'New Idea',
		colour:'Blue',
		//object {x, y, h, w}
		dimensions:{x:0, y:0, h:10, w:10},
		//console.log(this);
		//initialize(str, hex, {x,y,h,w})
		initialize: function (lbl, clr, dimensions) {
			this.label = lbl; 
			this.colour = clr;
			this.dimensions = dimensions;
			this.style({fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'});
		},

		set style(style) {
			this.style = style;
		},

		get style() {
			if(!this.style)
				return {fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'};
			return this.style;
		},

		//todo: seperate style into loadable format
		applyStyle: function(context) {
		    context.fillStyle = this.style.fillStyle;
		    context.fill();
		    context.lineWidth = this.style.lineWidth;
		    context.strokeStyle = this.style.strokeStyle;
		},

		draw: function(context) {
			//context.save(); //place current context onto stack
			context.beginPath();
			context.arc(this.dimensions.x, this.dimensions.y, 0 , 2 * Math.PI, false);
			//context.restore();  //retrieve context from stack
			this.applyStyle(context);
			context.stroke();
		},
		
		greyOut: function() {
			throw('grey out has not yet been implemented');
		},

		setTransparency: function() {
			throw('transparency has not yet been implemented');
		},

		//Because everyone *loves* Radians
		degreesToRadians: function(degrees) {
			return degrees * (Math.PI / 180);
		}
	};
	return LabelledOval;
};



/*function LabelledOval() {
	this.label = 'New Idea';
	this.colour = 'Blue';
	//object {x, y, h, w}
	this.dimensions = {x:0, y:0, h:10, w:10};
	this.style = {fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'};
	//console.log(this);
}

LabelledOval.prototype = {
	//initialize(str, hex, {x,y,h,w})
	initialize: function (lbl, clr, dimensions) {
		this.label = lbl;
		this.colour = clr;
		this.dimensions = dimensions;
		this.style({fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'});
	},

	set style(style) {
		this.style = style;
	},

	get style() {
		return this.style;
	},

	//todo: seperate style into loadable format
	applyStyle: function(context) {
	    context.fillStyle = this.style.fillStyle;
	    context.fill();
	    context.lineWidth = this.style.lineWidth;
	    context.strokeStyle = this.style.strokeStyle;
	},

	draw: function(context) {
		context.save();
		context.beginPath();
		context.arc(this.dimensions.x, this.dimensions.y, 0 , 2 * Math.PI, false);
		context.restore();
		this.applyStyle(context);
		context.stroke();
	},
	
	greyOut: function() {
		throw('grey out has not yet been implemented');
	},

	setTransparency: function() {
		throw('transparency has not yet been implemented');
	}
};

module.exports = LabelledOval;
*/

/*module.exports = function LabelledOval() {
	'use strict';

	this.label = 'New Idea';
	this.colour = 'Blue';
	//object {x, y, h, w}
	this.dimensions = {x:0, y:0, h:10, w:10};
	this.style = {fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'};

	return {
		//initialize(str, hex, {x,y,h,w})
		initialize: function (lbl, clr, dimensions) {
			this.label = lbl;
			this.colour = clr;
			this.dimensions = dimensions;
			this.style({fillStyle:'#8ED6FF', lineWidth:5, strokeStyle:'black'});
		},

		set style(style) {
			this.style = style;
		},

		get style() {
			return this.style;
		},

		//todo: seperate style into loadable format
		applyStyle: function(context) {
		    context.fillStyle = this.style.fillStyle;
		    context.fill();
		    context.lineWidth = this.style.lineWidth;
		    context.strokeStyle = this.style.strokeStyle;
		},

		draw: function(context) {
			context.save();
			context.beginPath();
			context.arc(this.dimensions.x, this.dimensions.y, 0 , 2 * Math.PI, false);
			context.restore();
			this.applyStyle(context);
			context.stroke();
		},
		
		greyOut: function() {
			throw('grey out has not yet been implemented');
		},

		setTransparency: function() {
			throw('transparency has not yet been implemented');
		}
	};
};*/

//module.exports = new LabelledOval();
