"use strict"

/*	object transparency
	highlight function for mouse over
	greyed out for 
	transparent mode for dragging
*/

var LabelledOval = function LabelledOval() {
	var label;
	var colour;
	//object {x, y, l, w}
	var dimensions;
	return {
		//initialize(str, hex, {x,y,l,w})
		initialize : function (lbl, clr, dim) {
			this.label = lbl;
			this.colour = clr;
			this.dimensions = dim;
		},

		setStyle: function(style) {
			Error("setStyle() has not been developed yet");
		}

		//todo: seperate style into loadable format
		applyStyle: function(context) {
		    context.fillStyle = '#8ED6FF';
		    context.fill();
		    context.lineWidth = 5;
		    context.strokeStyle = 'black';
		},

		draw: function(context) {
			context.save();
			context.beginPath();
			context.arc(dimensions.x, dimensions.y, 0 , 2 * Math.PI, false);
			//border for oval
			context.restore();
			this.applyStyle(context);
			context.stroke();
		}
		
		greyOut: function() {
			Error("grey out has not yet been implemented");
		}

		setTransparency: function() {
			Error("transparency has not yet been implemented");
		}
	}
}

module.exports = new LabelledOval();
