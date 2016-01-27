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
var Canvas = (function Canvas() { 

	var height = 800; 
	var width = 1200;
	var state = 'stop';
	var activeObjects = [];
	var context = null;
	var canvas = null;
	var self = null; 	//Added to counteract an unknown bug which was causing the binding of "this" to break in canvas internal callback passing 
						//(would hit the 2nd or 3rd layer and then the 'this' (or equivs) would not pass or bind)

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
	var initialize = function(c, viewName) {
		canvas = c;
		
		self = this;

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
		self.title = viewName;
		console.log('%s = %s', viewName, self.title);
	};

	var addDrawObject = function(obj) {
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
	var draw = function() { 

		console.log('screenRefreshed');
		context.clearRect(0, 0, width, height);   //Clear canvas
		var c = context;
		activeObjects.forEach(function (o) {
			o.draw(c, function(err, res){
				if(err) {
					console.log(err);
				}
			});
		});
	};

	var redraw = function () {

		switch(state) {
			case 'stop' || 'loading':
				return;
			default:
				window.requestAnimationFrame(draw.bind(this));	
				return;
		}
	};

	var unfocus = function () {
		self.focussedObject = null;
	};

	var focus = function (obj) {
		self.focussedObject = obj;
	};


	var run = function() {
		state = 'run';	//Need to create an async implementation of this
		console.log('called draw from run');
		window.requestAnimationFrame(draw.bind(this));   //recode to pass in callback
	};

	var stop = function() {
		state = 'stop';
	};

	var removeDrawObject = function(drawObject) {
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
	var updateDrawObject = function(drawObject) {
		var ix = activeObjects.indexOf(drawObject);
		activeObjects[ix] = drawObject;
	};

	var getActiveObjects = function(callback) {
		callback(null, activeObjects);
	};

	var getState = function() {
		return state;
	};

	var getDimensions = function() {
		return {h:height, w:width};
	};

	//Need to refactor for aSync
	var clear = function() {
		stop();
		//context.clearRect(0, 0, width, height); //disabled for testing - need to create canvas mock to allow context call
		//this.title = '';
		activeObjects = []; 
	};

	/**
	 * Import takes a JSON object containing the definition of all the canvas elements
	 * @param  {JSON} canvasJSON 	JSON representation of a canvas object
	 * @return {object} this        Return this Canvas object
	 */
	var load = function(json, callback) {
		clear();			//need to clear the canvas before we import. Disabled temporarily

		this.title = json.title;

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
			addDrawObject(obj);
		}, this);
		callback(null, this);
		return this;
	};


	var toJSON = function(callback) {
		return toObj(function (err, res) {
			if(!err) {
				callback(null, JSON.stringify(res));
			}
			else {
				callback(err, null);
			}
		});
	};

	var toObj = function(callback) {
		//todo : pause the canvas cycle?
		var obj = {};
		obj.title = self.title;
		obj.activeObjects = [];
		activeObjects.forEach(function(o) {
			o.toObj( function(err, res) {obj.activeObjects.push(res); });
		});
		callback(null, obj);
		return obj;
	};


	var onMouseMove = function(e, inputState, callback) {

		var point = {x:e.clientX + inputState.offSet.x, y: e.clientY + inputState.offSet.y};
		getObject(point, function(err, obj){
			if(!obj) {
				unfocus();
			}
			else if(obj) {
				//var that = this;
				obj.onMouseOver(function(err, res) { 
					focus(obj);//that.focus(obj); 
				});
			}
		});
		//todo: callback*/
	};

	var onClick = function (e, inputState, callback) {
		//this = canvas
		var point = {x:e.clientX + inputState.offSet.x, y: e.clientY + inputState.offSet.y};
		getObject(point, function(err, obj) {
			if(!obj) {
				self.selectedObject = null;
			}
			else if(obj) {
				obj.onClick(function(err, res) { self.selectedObject = obj; });
			}
			//todo: initiate callback
		});
	};




	//todo: inefficient, refactor
	var getObject = function(point, callback) {

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

	return {
		'getObject': getObject,
		'getDimensions': getDimensions,
		'getState': getState,

		'initialize': initialize,

		'toObj': toObj,
		'toJSON': toJSON,
		'load': load,

		//'getActiveObjects': getActiveObjects,
		//'updateDrawObject': updateDrawObject,
		//'removeDrawObject': removeDrawObject,
		//'addDrawObject': addDrawObject,
		//'focus': focus,
		//'unfocus': unfocus,

		'onMouseMove': onMouseMove,
		'onClick': onClick,

		'stop':stop, 'run':run, 'draw':draw, 'redraw':redraw, 'clear':clear

	};
})();


//Todo: find a better a way to do getters and setters.
//Problems with this commonly recommended way of doing getters and setters:
//		1. no access to internal properties
//		2. have to be accessed with 'this.property' which has the possibility of creating a new public var on the context if not carefully used
//		3. are not private to the object

Object.defineProperties(Canvas, {

    'title': {
		get: function() {
			if(!this._title) {
				this._title = new Label();
			}
			return this._title.text;
		},
		set: function(title) {
			if(!this._title) {
				this._title = new Label();
			}
			this._title.initialize(title, {x:0, y:0}); 
		}
	},

	'focussedObject': {
		get: function() {
			if(!this._focussedObject) {
				this._focussedObject = null;
			}

			return this._focussedObject;
		},
		set: function(obj) {
			if(!this._focussedObject) {
				this._focussedObject = null;
			}
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
			if(!this._selectedObject) {
				this._selectedObject = null;
			}
			return this._selectedObject;
		},
		set: function(obj) {
			if(!this._selectedObject) {
				this._selectedObject = null;
			}
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
