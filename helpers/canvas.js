var _ = require('underscore');
var drawingObject = require('../helpers/drawingObject.js');

//Create drawingObject parent class

var Canvas = function Canvas() {
	var context;
	var activeObjects;

	return {
		initialize : function(ctx) {
			this.context = ctx;
			this.activeObjects = [];
		},

		addDrawObject: function(obj) {
			this.activeObjects.push(obj);
		},
		draw: function() { 
			//Clear canvas
			for(var o of activeObjects) {
				o.draw(context);
			}
		},
		removeDrawObject: function() {
			Error("removeDrawObject not yet implemented");
		}
		//how to track whether a redraw is necessary:
		// opt1: force  all updates to pass through the canvas draw object, have a simple flag.
		//	upside - keeps drawing logic segregated from business logic. Simple flag to update and check
		//	downside - passes all updates through this function. Has the potential to inhibit more complex update functions. 
		//		seperates view logic too far from controlling entity.
		// opt2: tie drawing objects to their appropriate
		updateDrawObject: function() {
			Error("updateDrawObject not yet implemented");
		}



	}
}


module.exports = new Canvas(); 
