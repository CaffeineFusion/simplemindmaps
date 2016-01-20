
'use strict';

var Label = function Label() {


	//this.colour = 'Blue';
	//this.style = {lineWidth:5, strokeStyle:'black'};

	this.initialize = function (clr) {
		this.colour = clr;
		//this.points = points;
		//this.setStyle({lineWidth:5, strokeStyle:'black'});
	};


	//applyStyle is part of the drawing logic.
	//  It takes the current style and applies it to the drawing that has just been made onto the context.
	
	//todo : make apply Style a private function.

	this.applyStyle = function(context) {

	};


	//How will the context passing function when async?
	//Todo:
	this.draw = function(context) {

		/*context.save();
		context.beginPath();
		context.arc(dimensions.x, dimensions.y, 0 , 2 * Math.PI, false);
		context.restore();
		this.applyStyle(context);
		context.stroke();*/

	};
		
	this.greyOut = function() {
		throw('grey out has not yet been implemented');
	};

	this.setTransparency = function() {
		throw('transparency has not yet been implemented');
	};
};


//Todo: cleaning text input
Object.defineProperty(Label, 'text', {
    get: function() {
    	if(!this.text)
    		return '';
        return this.text;
    },
    set: function(str) {
        if (_.isString(str))
            this.text = str;
        else
            console.log('Label ' + str.toString() + ' is not a valid string!');
    }
});


//todo : add error handling and proper logging
//		 default is currently hardbaked for colour and style. Seperate to external style doc

Object.defineProperty(Connector, 'colour', {
    get: function() {
    	if(!this.colour)
    		return 'Blue';
        return this.colour;
    },
    set: function(str) {
        if (_.isString(str))
            this.colour = str;
        else
            console.log('Colour ' + str.toString() + ' is not a valid string!');
    }
});



Object.defineProperty(Connector, 'style', {
    get: function() {
    	if(!this.style)
    		return {lineWidth:5, strokeStyle:'black'};
        return this.style;
    },
    set: function(jsonString) {
    	j = ParseJSON(jsonString);
    	//ParseJSON returns false if the string is not valid JSON
        if (!j)
            console.log('Style ' + jsonString.toString() + ' is not valid JSON!');
        else
            this.style = jsonString;
    }
});

module.exports = Connector;