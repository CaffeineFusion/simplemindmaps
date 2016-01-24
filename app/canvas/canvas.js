'use strict';

var Label = require('./label');
var LabelledOval = require('./labelledOval');
var Connector = require('./connector');
//var ParseJSON = require('../helpers/parseJSON');

/**
 * Canvas The canvas object holds all of the drawing objects which are to be 
 * 		rendered to the HTML5 Canvas. The Canvas correlates to the active 'View' model.
 *
 * Todo: Refactor connectors
 */
var Canvas = function Canvas() { 

	var context = null;
	var canvas = null;
	var activeObjects = [];
	var height = 800; 
	var width = 1200;
	var needRedraw = true;
	var state = 'stop';
	var label = new Label(); 
	var focussedObject = null;
	var selectedObject = null;

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
	this.initialize = function(c, viewName) {
		canvas = c;
		
		if(!canvas) {
			console.log('No HTML5 canvas was passed to the Canvas initialize function');
		}

		//temporary try block until I set up proper mocking for the html5 canvas object
		try {
			context = canvas.getContext('2d');
			width = canvas.width;
			height = canvas.height;
		}
		catch(e) {
			console.log(e);
		}

		activeObjects = [];
		needRedraw = true;
		label.initialize('Black', viewName, {x:0, y:0}); //will this be broken by adding a getter and setter?
	};

	this.addDrawObject = function(obj) {
		activeObjects.push(obj);
	};

	/**
	 * draw() is the prime drawing logic of this app.
	 * It is a recursive function that deposits a request on the next AnimationFrame
	 * 		of the browser. When the canvas has been updated since last draw (needRedraw)
	 * 		it will clear the context (clearRect) and then call the draw function on
	 * 		each drawingObject (in activeObjects)
	 * At the moment it is coded to only call the callback on termination.
	 *
	 * Todo: current implementation runs once every animation frame. This is ugly, refactor to
	 * 		 call requestAnimationFrame only on update. 
	 * @param  {Function} 		callback 
	 * @return {null}           no return at this stage.
	 */
	var draw = function(callback) { 

		if(state === 'stop') {
			callback(null, 'Stop request passed to canvas - draw cycle terminated');
			return;
		}
		if(state === 'loading') {
			console.log('canvas loading. Drawing paused. Checking at next draw cycle');

			window.requestAnimationFrame(draw(callback).bind(this));
			return;	
		}

		//Check to see if image is unmodified before clearing/redrawing
		if(!needRedraw) { 
			window.requestAnimationFrame(draw(callback).bind(this)); 
			return;
		}

		context.clearRect(0, 0, width, height);   //Clear canvas

		activeObjects.forEach(function (o) {
			o.draw(context, function(err, res){
				if(err) {
					console.log(err);
				}
			});
		});

		needRedraw = false;		//Not really async, fix.

		window.requestAnimationFrame(draw(callback).bind(this));	 
	};

	this.run = function() {
		state = 'run';	//Need to create an async implementation of this
		
		window.requestAnimationFrame(draw(function (err, res) { 
			if(err) {console.log(err);}}).bind(this));   //recode to pass in callback
	};

	this.stop = function() {
		state = 'stop';
	};

	this.removeDrawObject = function(drawObject) {
		var ix = activeObjects.indexOf(drawObject);
		if(ix > -1) {
			activeObjects.splice(ix, 1);
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
		var ix = activeObjects.indexOf(drawObject);
		activeObjects[ix] = drawObject;
	};

	this.getActiveObjects = function(callback) {
		callback(null, activeObjects);
	};

	this.getState = function() {
		return state;
	};

	this.getDimensions = function() {
		return {h:height, w:width};
	};

	//Need to refactor for aSync
	this.clear = function() {
		this.stop();
		context.clearRect(0, 0, width, height);
		label = new Label();
		activeObjects = null; 
	};

	/**
	 * Import takes a JSON object containing the definition of all the canvas elements
	 * @param  {JSON} canvasJSON 	JSON representation of a canvas object
	 * @return {object} this        Return this Canvas object
	 */
	this.import = function(json, callback) {
		//this.clear();			//need to clear the canvas before we import. Disabled temporarily

		label.text = json.title;

		json.activeObjects.forEach(function(o) {
			var obj = {};
			switch(o.type) {
				case 'LabelledOval' :
					obj = new LabelledOval();
					obj.initialize(o.title, o.dimensions);
					break;
				case 'Connector' :
					obj = new Connector();
					obj.initialize(o.points);
					break;
				default :
					console.log('Object ' + obj.type + ' was passed to import, but was not recognised');
					callback('Bad object was passed to canvas.import()', null);
					return;
			}
			obj.style = o.style;
			this.addDrawObject(obj);
		}, this);
		callback(null, this);
		return this;
	};


	this.toJSON = function(callback) {
		//todo : pause the canvas cycle?
		var json = {};
		json.title = label.text;
		json.activeObjects = [];
		activeObjects.forEach(function(o) {
			o.toJSON( function(err, res) {json.activeObjects.push(res); });
		});
		callback(null, JSON.stringify(json));
		return JSON.stringify(json);
	};

	this.onClick = function (e, inputState, callback) {
		this.passToObject({x:e.clientX + inputState.offSet.x, y: e.clientY + inputState.offSet.y}, 
			function(err, obj){

			if(obj === false) {
				selectedObject = null;
				console.log('clicked on canvas. Todo: add new drawingObject');
			}
			else if(obj) {
				obj.onClick(function(err, res) { this.selectedObject = obj; }.bind(this));
			}
			//todo: initiate callback
		});
	};

	this.onMouseMove = function(e, inputState, callback) {
		this.passToObject({x:e.clientX + inputState.offSet.x, y: e.clientY + inputState.offSet.y}, 
			function(err, obj){
			if(obj) {
				obj.onMouseOver(function(err, res) { this.focussedObject = obj; }.bind(this));
			}
			else if(this.focussedObject) {
				this.focussedObject = null;
			}
		});
		console.log('you moved the mouse over the canvas');
		//todo: callback
	};

	//todo: inefficient, refactor
	this.passToObject = function(point, callback) {

		this.activeObjects.forEach(function(o) {

			if(o.contain(point)) {
				callback(null, o);
				return;
			}

		});
		callback(null,false);
	};
};


//Getters and Setters
Object.defineProperty(Canvas.prototype, 'title', {
	get: function() {
		if(!this._title) {
			this._title = new Label();
		}
		return this._title.text;
	},
	set: function(title) {
		if(!this._title) {
			this._title = new Label();
			console.log('todo: add initialization logic for label');
		}
		this._title.text = title;
	}
});

Object.defineProperty(Canvas.prototype, 'focussedObject', {
	get: function() {
		return this._focussedObject;
	},
	set: function(obj) {
		if(this._focussedObject) {
			this._focussedObject.onMouseOut();
		}
		this._focussedObject = obj;
	}
});


Object.defineProperty(Canvas.prototype, 'selectedObject', {
	get: function() {
		return this._selectedObject;
	},
	set: function(obj) {
		if(this._selectedObject) {
			this._selectedObject.onDeselect();
		}
		this._selectedObject = obj;
	}
});


module.exports = Canvas;
