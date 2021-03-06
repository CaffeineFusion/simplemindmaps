'use strict';
//var ParseJSON = require('../helpers/parseJSON');



/**
 * DrawingObject - Abstract class with main drawing functionality inherited by
 * 		all objects to be drawn to the canvas. 
 * Note: DrawingObject works on a basic style definition. If this was to be implemented
 * 		for a more complexly styled object, the "applyStyle" command would need to be 
 * 		overriden
 */
function DrawingObject() {
	
	var useStyle = function(context, style) {
		for(var s in style) {
			if(style.hasOwnProperty(s)) {
				context[s] = style[s];
			}
		}
	};

	/**
	 * applyStyle uses the currently defined style and applies it to the canvas context.
	 * 		Child classes then need only worry about the specific shape to be drawn.
	 * @param  {[type]} context [description]
	 * @return {[type]}         [description]
	 */
	this.applyStyle = function(context) {
		if(this.isSelected) {
			useStyle(context, this.style.selected);
		}
		else if(this.isMouseOver) {
			useStyle(context, this.style.hasFocus);
		}
		else {
			useStyle(context, this.style.deselected);
		}

	};

	this.toObj = function(callback) {
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

	this.contains = function(point) {
		return false;
	};
}

Object.defineProperty(DrawingObject.prototype, 'style', {

    get: function() {
    	if(!this._style) {
    		this._style = {lineWidth:5, strokeStyle:'black'};
    	}
        return this._style;
    },
    set: function(styleObj) {
        this._style = styleObj;
    }
});

Object.defineProperty(DrawingObject.prototype, 'isMouseOver', {

	get: function() {
		if(this._isMouseOver === undefined){
			this._isMouseOver = false;
		}
		return this._isMouseOver;
	},
	set: function(bool) {
		this._isMouseOver = bool;
	}
});


Object.defineProperty(DrawingObject.prototype, 'isSelected', {

	get: function() {
		if(this._isSelected === undefined){
			this._isSelected = false;
		}
		return this._isSelected;
	},
	set: function(bool) {
		this._isSelected = bool;
	}
});

module.exports = DrawingObject;