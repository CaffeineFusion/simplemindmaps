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
	var state = 'stop';
	var label = new Label(); 

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
		this.needRedraw = true;
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
	this.draw = function() { 

		console.log('screenRefreshed');
		context.clearRect(0, 0, width, height);   //Clear canvas

		activeObjects.forEach(function (o) {
			o.draw(context, function(err, res){
				if(err) {
					console.log(err);
				}
			});
		});
	};

	this.run = function() {
		state = 'run';	//Need to create an async implementation of this
		console.log('called draw from run');
		window.requestAnimationFrame(this.draw.bind(this));   //recode to pass in callback
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
		return this.toObj(function (err, res) {
			if(!err) {
				callback(null, JSON.stringify(res));
			}
			else {
				callback(err, null);
			}
		});
	};

	this.toObj = function(callback) {
		//todo : pause the canvas cycle?
		var obj = {};
		obj.title = label.text;
		obj.activeObjects = [];
		activeObjects.forEach(function(o) {
			o.toObj( function(err, res) {obj.activeObjects.push(res); });
		});
		callback(null, obj);
		return obj;
	};




	//todo: inefficient, refactor
	this.getObject = function(point, callback) {

		var found = false;
		activeObjects.forEach(function(o) {
			if(!found && o.contains(point)) {
				callback(null, o);
				found = true;
				return;
			}
		});
		if(!found) {
			callback(null,false);
		}
	};
};



Canvas.prototype.onMouseMove = function(e, inputState, callback) {

	var point = {x:e.clientX + inputState.offSet.x, y: e.clientY + inputState.offSet.y};
	var that = this;
	this.getObject(point, function(err, obj){
		if(!obj) {
			console.log(that);
			that.unfocus();
		}
		else if(obj) {
			obj.onMouseOver(function(err, res) { that.focus(obj); console.log('onMouseMove'); console.log(that);});
		}
	});
	//todo: callback*/
};

Canvas.prototype.onClick = function (e, inputState, callback) {
	//this = canvas
	var that = this;
	var point = {x:e.clientX + inputState.offSet.x, y: e.clientY + inputState.offSet.y};
	this.getObject(point, function(err, obj) {
		if(!obj) {
			this.selectedObject = null;
		}
		else if(obj) {
			obj.onClick(function(err, res) { that.selectedObject = obj; });
		}
		//todo: initiate callback
	});
};

Canvas.prototype.redraw = function () {

	switch(this.state) {
		case 'stop' || 'loading':
			return;
		default:
			window.requestAnimationFrame(this.draw.bind(this));	
			return;
	}
};

Canvas.prototype.unfocus = function () {
	this.focussedObject = null;
};

Canvas.prototype.focus = function (obj) {
	this.focussedObject = obj;
};

//Getters and Setters
Object.defineProperty(Canvas, 'title', {
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


Object.defineProperties(Canvas.prototype, {
	'needRedraw': {
		get: function() {
			return this._needRedraw;
		},
		set: function(bool) {
			if(bool) {
				this._needRedraw = bool;
				window.requestAnimationFrame(this.draw.bind(this));	
				return;
			}
			this._needRedraw = bool;
		}
	},
	'focussedObject': {
		get: function() {
			return this._focussedObject;
		},
		set: function(obj) {
			if(this._focussedObject === obj) {
				return;
			}
			if(this._focussedObject && this._focussedObject !== obj) {
				this._focussedObject.onMouseOut();
			}

			this._focussedObject = obj;
			this.redraw();
		}
	},
	'selectedObject': {
		get: function() {
			return this._selectedObject;
		},
		set: function(obj) {

			if(this._selectedObject === obj) {
				return;
			}
			if(this._selectedObject) {
				this._selectedObject.onDeselect();
			}

			this._selectedObject = obj;
			this.redraw();
		}
	}
});

module.exports = Canvas;
