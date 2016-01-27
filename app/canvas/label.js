'use strict';
var _ = require('underscore');
var ParseJSON = require('../helpers/parseJSON');

var Label = function Label() {

	//this.colour = 'Blue';
	//this.style = {lineWidth:5, strokeStyle:'black'};

	//Todo : What should the initial params be for Label?
	//		Need to include boundary
	this.initialize = function (text, point) {
		this.text = text;
		this.point = point;
		//this.points = points;
		//this.setStyle({lineWidth:5, strokeStyle:'black'});
	};


	//applyStyle is part of the drawing logic.
	//  It takes the current style and applies it to the drawing that has just been made onto the context.
	
	//todo : make apply Style a private function.
	this.applyStyle = function(context) {
		context.font = this.font;
		context.align = this.align;
	};


	//How will the context passing function when async?
	this.draw = function(context) {

		this.applyStyle(context);
		context.fillText = (this.text, this.point.x, this.point.y);

	};
		
	this.greyOut = function() {
		throw('grey out has not yet been implemented');
	};

	this.setTransparency = function() {
		throw('transparency has not yet been implemented');
	};
};


//Todo: Make Label module into basic object declaration so that getter and setter 
//		objects	can be more simply defined?

//Todo: cleaning text input
//		move out default text type - currently hardbaked
Object.defineProperty(Label.prototype, 'text', {
    get: function() {
    	if(!this._text) {
    		return 'no text has been set';
        }
        return this._text;
    },
    set: function(str) {
        if (_.isString(str)) {
            this._text = str;
        }
        else {
            console.log('Label ' + str.toString() + ' is not a valid string!');
        }
    }
});

Object.defineProperty(Label.prototype, 'font', {
    get: function() {
    	if(!this._font) {
    		return '';
        }
        return this._font;
    },
    set: function(str) {
        if (_.isString(str)) {
            this._font = str;
        }
        else {
            console.log('Label ' + str.toString() + ' is not a valid string!');
        }
    }
});


Object.defineProperty(Label.prototype, 'style', {
    get: function() {
    	if(!this._style) {
    		return {lineWidth:5, strokeStyle:'black'};
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



Object.defineProperty(Label.prototype, 'point', {
    get: function() {
    	if(!this._point) {
    		return {x:0, y:0};
        }
        return this._point;
    },
    //No error handling!
    set: function(position) {
    	this._point = position;
    }
});



Object.defineProperty(Label.prototype, 'align', {
    get: function() {
    	if(!this._align) {
    		return 'center';
        }
        return this._align;
    },
    //No error handling!
    set: function(alignment) {
    	this._align = alignment;
    }
});


module.exports = Label;