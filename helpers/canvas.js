module.exports = function Canvas() { 
	'use strict';

	var context;
	var activeObjects;
	var height, width;
	var needRedraw;

	return {
		initialize : function(ctx, width, height) {
			this.context = ctx;
			this.activeObjects = [];
			this.needRedraw = true;
			this.width = width;
			this.height = height;
		},
		addDrawObject: function(obj) {
			this.activeObjects.push(obj);
		},
		draw: function() { 
			if(!needRedraw) { return; }

			//This seems like an ugly implementation, hunt down alt.
			this.context.clearRect(0, 0, this.width, this. height);
			for(var o of activeObjects) {
				o.draw(context);
			}
			needRedraw = false;
		},
		removeDrawObject: function(drawObject) {
			var ix = this.activeObjects.indexOf(drawObject);
			if(ix > -1) {
				this.activeObjects.splice(ix, 1);
			}
		},
		//how to track whether a redraw is necessary:
		// opt1: force  all updates to pass through the canvas draw object, have a simple flag.
		//	upside - keeps drawing logic segregated from business logic. Simple flag to update and check
		//	downside - passes all updates through this function. Has the potential to inhibit more complex update functions. 
		//		seperates view logic too far from controlling entity.
		// opt2: tie drawing objects to their appropriate
		// 
		// Update currently functions by replacing the object
		// 		Alt: call an update on the drawObject
		updateDrawObject: function(drawObject) {
			var ix = this.activeObjects.indexOf(drawObject);
			this.activeObjects[ix] = drawObject;
		}
	}
}
