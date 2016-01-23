'use strict';
var _ = require('underscore');
var ParseJSON = require('../helpers/parseJSON');

var Label = function Label() {

	//this.colour = 'Blue';
	//this.style = {lineWidth:5, strokeStyle:'black'};

	//Todo : What should the initial params be for Label?
	//		Need to include boundary
	this.initialize = function (clr, text, point) {
		this.colour = clr;
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
Object.defineProperty(Label, 'text', {
    get: function() {
    	if(!this.text) {
    		return '30px Arial';
        }
        return this.text;
    },
    set: function(str) {
        if (_.isString(str)) {
            this.text = str;
        }
        else {
            console.log('Label ' + str.toString() + ' is not a valid string!');
        }
    }
});

Object.defineProperty(Label, 'font', {
    get: function() {
    	if(!this.font) {
    		return '';
        }
        return this.font;
    },
    set: function(str) {
        if (_.isString(str)) {
            this.font = str;
        }
        else {
            console.log('Label ' + str.toString() + ' is not a valid string!');
        }
    }
});


//todo : add error handling and proper logging
//		 default is currently hardbaked for colour and style. Seperate to external style doc
Object.defineProperty(Label, 'colour', {
    get: function() {
    	if(!this.colour) {
    		return 'Blue';
        }
        return this.colour;
    },
    set: function(str) {
        if (_.isString(str)) {
            this.colour = str;
        }
        else {
            console.log('Colour ' + str.toString() + ' is not a valid string!');
        }
    }
});



Object.defineProperty(Label, 'style', {
    get: function() {
    	if(!this.style) {
    		return {lineWidth:5, strokeStyle:'black'};
        }
        return this.style;
    },
    set: function(jsonString) {
    	var j = ParseJSON(jsonString);
    	//ParseJSON returns false if the string is not valid JSON
        if (!j) {
            console.log('Style ' + jsonString.toString() + ' is not valid JSON!');
        }
        else {
            this.style = jsonString;
        }
    }
});



Object.defineProperty(Label, 'point', {
    get: function() {
    	if(!this.point) {
    		return {x:0, y:0};
        }
        return this.point;
    },
    //No error handling!
    set: function(position) {
    	this.point = position;
    }
});



Object.defineProperty(Label, 'align', {
    get: function() {
    	if(!this.align) {
    		return 'center';
        }
        return this.align;
    },
    //No error handling!
    set: function(alignment) {
    	this.align = alignment;
    }
});


module.exports = Label;