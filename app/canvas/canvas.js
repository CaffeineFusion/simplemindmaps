'use strict';

/**
 * Canvas The canvas object holds all of the drawing objects which are to be 
 * 		rendered to the HTML5 Canvas. The Canvas correlates to the active "View" model.
 *
 */
module.exports = function Canvas() { 

	this.context = null;
	this.canvas = null;
	this.activeObjects = [];
	this.height = 800; 
	this.width = 1200;
	this.needRedraw = true;
	this.state = 'stop';

	/**
	 * initialize 	Configures the canvas representation using the html canvas element.
	 * @param  {canvas} canvas  pass in document.getElementById('my-canvas-name')
	 * @return {null}         currently returns nothing
	 *
	 * We could get the context and canvas by a document call here, but I'd prefer
	 * 		to keep this code ambivalent to the DOM namings etc.
	 *
	 * Todo: implement error handling on canvas load.
	 */
	this.initialize = function(canvas) {
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
		this.activeObjects = [];
		this.needRedraw = true;
		this.width = canvas.width;
		this.height = canvas.height;
	};

	this.addDrawObject = function(obj) {
		this.activeObjects.push(obj);
	};

	/**
	 * draw() is the prime drawing logic of this app.
	 * It is a recursive function that deposits a request on the next AnimationFrame
	 * 		of the browser. When the canvas has been updated since last draw (needRedraw)
	 * 		it will clear the context (clearRect) and then call the draw function on
	 * 		each drawingObject (in activeObjects)
	 * At the moment it is coded to only call the callback on termination.
	 * @param  {Function} 		callback 
	 * @return {null}           no return at this stage.
	 */
	this.draw = function(callback) { 

		if(this.state == 'stop') {
			callback(null, 'Stop request passed to canvas - draw cycle terminated');
		}

		//Check to see if image is unmodified before clearing/redrawing
		if(!this.needRedraw) { 
			window.requestAnimationFrame(this.draw.bind(this)); 
		}


		//clearRect seems like an ugly implementation, hunt down alt.
		this.context.clearRect(0, 0, this.width, this.height);
		this.activeObjects.forEach(function (o, index) {
			o.draw(this.context);  //need to bind context
		});

		/*
		//"of" not functioning for some reason.
		for(let o of this.activeObjects) {
			o.draw(this.context);
		}*/

		this.needRedraw = false;

		window.requestAnimationFrame(this.draw.bind(this, callback));	  //recode to pass in callback
	};

	this.run = function() {
		this.state = 'run';	//Need to create an async implementation of this
		
		window.requestAnimationFrame(this.draw.bind(this));   //recode to pass in callback
	};

	this.stop = function() {
		this.state = 'stop';
	};

	this.removeDrawObject = function(drawObject) {
		var ix = this.activeObjects.indexOf(drawObject);
		if(ix > -1) {
			this.activeObjects.splice(ix, 1);
		}
	};

	//how to track whether a redraw is necessary:
	// opt1: force  all updates to pass through the canvas draw object, have a simple flag.
	//	upside - keeps drawing logic segregated from business logic. Simple flag to update and check
	//	downside - passes all updates through this function. Has the potential to inhibit more complex update functions. 
	//		seperates view logic too far from controlling entity.
	// opt2: tie drawing objects to their appropriate
	// 
	// Update currently functions by replacing the object
	// 		Alt: call an update on the drawObject
	this.updateDrawObject = function(drawObject) {
		var ix = this.activeObjects.indexOf(drawObject);
		this.activeObjects[ix] = drawObject;
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