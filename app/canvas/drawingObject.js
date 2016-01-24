'use strict';
var ParseJSON = require('../helpers/parseJSON');



/**
 * DrawingObject - Abstract class with main drawing functionality inherited by
 * 		all objects to be drawn to the canvas. 
 * Note: DrawingObject works on a basic style definition. If this was to be implemented
 * 		for a more complexly styled object, the "applyStyle" command would need to be 
 * 		overriden
 */
function DrawingObject() {
	
	//var style = {};  //will the get and set functions pick up on the private var?
	//var defaultStyle = {};

	//var defaultStyle(styleJSON) {
		//style = 
	//}
	//

	/**
	 * applyStyle uses the currently defined style and applies it to the canvas context.
	 * 		Child classes then need only worry about the specific shape to be drawn.
	 * @param  {[type]} context [description]
	 * @return {[type]}         [description]
	 */
	this.applyStyle = function(context) {
		for(var s in this.style) {
			if(this.style.hasOwnProperty(s)) {
				context[s] = this.style[s];
			}
		}
	};

	this.toJSON = function(callback) {
		throw('toJSON() was called in the abstract DrawingObject');
	};

	this.draw = function(context) {
		throw('draw() was called in the abstract DrawingObject');
	};

	this.greyOut = function() {
		throw('grey out has not yet been implemented');
	};

	this.setTransparency = function() {
		throw('transparency has not yet been implemented');
	};
};

Object.defineProperty(DrawingObject.prototype, 'style', {

    get: function() {
    	if(!this._style) {
    		this._style = {lineWidth:5, strokeStyle:'black'};
    	}
        return this._style;
    },
    set: function(jsonString) {
    	var j = ParseJSON(jsonString);
    	//ParseJSON returns false if the string is not valid JSON
        if (!j) {
            console.log('Style ' + jsonString.toString() + ' is not valid JSON!');
        }
        else {
            this._style = jsonString;
        }
    }
});


module.exports = DrawingObject;