var _ = require('underscore');


/*
The idea is a basic concept in this app. 
When it is placed onto to the screen it is added to the current 'view'.
This is then mapped to a labelledOval on a canvas.
An idea can be on multiple views.
*/
var Idea = function Idea(title, id) {
    
    'use strict';

    var body, tags, title, id;   

    /*get title () {
        return this.title;
    }*/

    return {
        initialize : function(title, id) {
            this.body = null;
            this.tags = [];
            this.title = title;
            this.id = id;
        }
        //title : title;  will this work?

    };
};


//todo : add error handling and proper logging

Object.defineProperty(Idea, 'title', {
    get: function() {
        return this.title;
    },
    set: function(str) {
        if (_.isString(str))
            this.title = str;
        else
            throw ('Title ' + str.toString() + ' is not a valid string!');
    }
});

Object.defineProperty(Idea, 'colour', {
    get: function() {
        return this.colour;
    },
    set: function(str) {
        if (_.isString(str))
            this.colour = str;
        else
            throw ('Colour ' + str.toString() + ' is not a valid string!');
    }
});

Object.defineProperty(Idea, 'body', {
    get: function() {
        return this.body;
    },
    set: function(str) {
        if (_.isString(str))
            this.body = str;
        else
            throw ('Colour ' + str.toString() + ' is not a valid string!');
    }
});


Object.defineProperty(Idea, 'id', {
    get: function() {
        return this.index;
    }
});

module.exports = Idea;
