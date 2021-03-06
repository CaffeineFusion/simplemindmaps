'use strict';
var _ = require('underscore');

//Todo: Add proper input checking

/**
 * Idea The idea is a basic concept in this app. 
 *     When it is placed onto the screen it is added to the current 'view'.
 *     This is then mapped to a labelledOval on a canvas.
 *     An idea can be on multiple views.
 * @param {string} title The title (label) for the Idea
 * @param {string} id    The unique identified for the Idea
 * @return {object}      Constructor: returns the Idea object
 */
var Idea = function Idea(title, id) {
    
    this.body = null;
    this.tags = [];
    this.title = title;
    this.id = id;

    //Duplication - Refactor with labelledOval
    this.colour = "Blue";
    this.dimensions = {x:0, y:0, h:10, w:10};

    this.toJSON = function() {
        return { id:this.id, title:this.title,  tags:this.tags, body:this.body, 
            colour:this.colour, dimensions:this.dimensions};
    }
    
};


//todo : add error handling and proper logging
Object.defineProperty(Idea, 'title', {
    get: function() {
        return this._title;
    },
    set: function(str) {
        if (_.isString(str))
            this._title = str;
        else
            throw ('Title ' + str.toString() + ' is not a valid string!');
    }
});

Object.defineProperty(Idea, 'colour', {
    get: function() {
        return this._colour;
    },
    set: function(str) {
        if (_.isString(str))
            this._colour = str;
        else
            throw ('Colour ' + str.toString() + ' is not a valid string!');
    }
});

Object.defineProperty(Idea, 'body', {
    get: function() {
        return this._body;
    },
    set: function(str) {
        if (_.isString(str))
            this._body = str;
        else
            throw ('Body ' + str.toString() + ' is not a valid string!');
    }
});


Object.defineProperty(Idea, 'id', {
    get: function() {
        return this._index;
    }
});

module.exports = Idea;
