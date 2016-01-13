
'use strict';

module.exports = function Canvas() { 

	//bind this to Canvas object
	var construct = function() {
		this.context = null;
		this.canvas = null;
		this.activeObjects = [];
		this.height = 800; 
		this.width = 1200;
		this.needRedraw =true;
	};
	construct();

	return {
		initialize : function(canvas, ctx, width, height) {
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
			if(!this.needRedraw) { return; }

			//clearRect seems like an ugly implementation, hunt down alt.
			this.context.clearRect(0, 0, this.width, this.height);
			this.activeObjects.forEach(function (o, index) {
				//o.draw(this.context);
				//need to bind this.
			});
			/*
			//"of" not functioning for some reason.
			for(let o of this.activeObjects) {
				o.draw(this.context);
			}*/
			this.needRedraw = false;
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
	};
};



//Experimentation with ES6 class implementation
/*

'use strict';

module.exports = function() {};

class Canvas { 

	constructor() {
		this.context = null;
		this.activeObjects = [];
		this.height = 800; 
		this.width = 1200;
		this.needRedraw =true;
	}

	initialize(ctx, width, height) {
		this.context = ctx;
		this.activeObjects = [];
		this.needRedraw = true;
		this.width = width;
		this.height = height;
	}

	addDrawObject(obj) {
		this.activeObjects.push(obj);
	}

	draw() { 
		if(!this.needRedraw) { return; }

		//This seems like an ugly implementation, hunt down alt.
		this.context.clearRect(0, 0, this.width, this. height);
		for(var o of this.activeObjects) {
			o.draw(this.context);
		}
		this.needRedraw = false;
	}

	removeDrawObject(drawObject) {
		var ix = this.activeObjects.indexOf(drawObject);
		if(ix > -1) {
			this.activeObjects.splice(ix, 1);
		}
	}

	//how to track whether a redraw is necessary:
	// opt1: force  all updates to pass through the canvas draw object, have a simple flag.
	//	upside - keeps drawing logic segregated from business logic. Simple flag to update and check
	//	downside - passes all updates through this function. Has the potential to inhibit more complex update functions. 
	//		seperates view logic too far from controlling entity.
	// opt2: tie drawing objects to their appropriate
	// 
	// Update currently functions by replacing the object
	// 		Alt: call an update on the drawObject
	updateDrawObject(drawObject) {
		var ix = this.activeObjects.indexOf(drawObject);
		this.activeObjects[ix] = drawObject;
	}
}

module.exports.Canvas = Canvas;*/

//alt module.exports default Canvas?