/*	object transparency
	highlight function for mouse over
	greyed out for 
	transparent mode for dragging
*/

module.exports = function LabelledOval() {
	"use strict";

	//var label = "New Idea";
	//var colour = "Blue";
	//object {x, y, h, w}
	//var dimensions = {x:0, y:0, h:10, w:10};
	//var style = {fillStyle:"#8ED6FF", lineWidth:5, strokeStyle:"black"};

	return {
		//initialize(str, hex, {x,y,h,w})
		initialize: function (lbl, clr, dimensions) {
			this.label = lbl;
			this.colour = clr;
			this.dimensions = dimensions;
			this.setStyle({fillStyle:"#8ED6FF", lineWidth:5, strokeStyle:"black"});
		},

		setStyle: function(style) {
			this.style = style;
		},

		getStyle: function() {
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
			context.arc(dimensions.x, dimensions.y, 0 , 2 * Math.PI, false);
			context.restore();
			this.applyStyle(context);
			context.stroke();
		},
		
		greyOut: function() {
			throw("grey out has not yet been implemented");
		},

		setTransparency: function() {
			throw("transparency has not yet been implemented");
		}
	};
};

//module.exports = new LabelledOval();
