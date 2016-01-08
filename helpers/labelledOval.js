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
			context.restore();
			this.applyStyle(context);
			context.stroke();
		}
	}
}

module.exports = new LabelledOval();