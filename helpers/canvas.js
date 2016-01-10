"use strict"
var _ = require('underscore');
var drawingObject = require('../helpers/drawingObject.js');

//Create drawingObject parent class

var Canvas = function Canvas() {

	var context;
	var activeObjects;
	var height, width;

	return {
		initialize : function(ctx, height, width) {
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
		removeDrawObject: function(drawObject) {
			var ix = this.activeObjects.indexOf(drawObject);
			if(index > -1) {
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


module.exports = new Canvas(); 
