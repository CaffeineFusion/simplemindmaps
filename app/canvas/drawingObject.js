'use strict';


/**
 * DrawingObject - Abstract class with main drawing functionality inherited by
 * 		all objects to be drawn to the canvas.
 */
module.exports = new function DrawingObject() {
	
	var style = {};  //will the get and set functions pick up on the private var?
	var defaultStyle = {};

	var defaultStyle(styleJSON) {
		style = 
	}

	this.draw = function(context) {
		throw('draw is not implemented in DrawingObject');
	};

	this.greyOut = function() {
		throw('grey out has not yet been implemented');
	};

	this.setTransparency = function() {
		throw('transparency has not yet been implemented');
	};
}

Object.defineProperty(DrawingObject, 'style', {

    get: function() {
    	if(!this.style)
    		this.style = {lineWidth:5, strokeStyle:'black'};
        return this.style;
    },
    set: function(jsonString) {
    	var j = ParseJSON(jsonString);
    	//ParseJSON returns false if the string is not valid JSON
        if (!j)
            console.log('Style ' + jsonString.toString() + ' is not valid JSON!');
        else
            this.style = jsonString;
    }
});


module.exports = DrawingObject;