'use strict';

var Label = require('./label');
var LabelledOval = require('./labelledOval');
var Connector = require('./connector');
var ParseJSON = require('../helpers/parseJSON')

/**
 * Canvas The canvas object holds all of the drawing objects which are to be 
 * 		rendered to the HTML5 Canvas. The Canvas correlates to the active "View" model.
 *
 * Todo: Refactor connectors
 */
module.exports = function Canvas() { 

	var context = null;
	var canvas = null;
	var activeObjects = [];
	var height = 800; 
	var width = 1200;
	var needRedraw = true;
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
		
		/*
		if(!this.canvas) {
			console.log('No HTML5 canvas was passed to the Canvas initialize function');
		}
		 */

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
		label.initialize('Black', viewName, {x:0, y:0});
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
	 * @param  {Function} 		callback 
	 * @return {null}           no return at this stage.
	 */
	var draw = function(callback) { 

		if(state == 'stop') {
			callback(null, 'Stop request passed to canvas - draw cycle terminated');
			return;
		}
		if(state == 'loading') {
			console.log("canvas loading. Drawing paused. Checking at next draw cycle");
			window.requestAnimationFrame(draw.bind(this, callback));
			return;	
		}

		//Check to see if image is unmodified before clearing/redrawing
		if(!needRedraw) { 
			window.requestAnimationFrame(draw.bind(this)); 
			return;
		}

		context.clearRect(0, 0, width, height);   //Clear canvas

		for (var o in activeObjects) {
			o.draw(context); 
	    }

		needRedraw = false;		//Not really async, fix.

		window.requestAnimationFrame(draw.bind(this, callback));	  //recode to pass in callback
	};

	this.run = function() {
		state = 'run';	//Need to create an async implementation of this
		
		window.requestAnimationFrame(draw.bind(this));   //recode to pass in callback
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
		this.clear();

		label.text = json.title;
		for(var o in json.activeObjects) {

			switch(o.type) {
				case LabelledOval.type :
					var l = new LabelledOval();
					l.initialize(o.title, o.dimensions);
					break;
				case Connector.type :
					var c = new Connector();
					c.initialize(o.points);
					break;
				case default :
					console.log('Object ' + obj.type + ' was passed to import, but was not recognised');
					callback('Bad object was passed to canvas.import()', null);
					return;
			}
			//style?
			this.addDrawObject(l);
		}
		callback(null, this);
		return this;
	};


	this.export = function(callback) {
		var json = {};
		json.title = label.text;
		json.activeObjects = [];
		for(var o in activeObjects) {
			var obj = {};
			obj.type = o.type;
			obj.style = o.style;
			switch(obj.type) {
				case LabelledOval.type :
					obj.title = o.title;
					obj.dimensions = o.dimensions;
					//Todo: Do I need to export text styles? 
					break;
				case Connector.type :
					obj.points = o.points;
					break;
				case default :
					console.log('Object ' + obj.type + ' was passed to export, but was not recognised');
					callback('Bad object was passed to canvas.export()', null);
					return;
			}
			json.activeObjects.push(obj);
		}
		callback(null, json);
		return json;
	};
};