var _ = require('underscore');

var Idea = function(title) {
    body = null;
    tags = [];
}

Object.defineProperty(Idea, 'title', {
    get: function() {
        return this.title;
    },
    set: function(str) {
        if(_.isString(str))
            this.title = str;
        else
            throw("Title " + str.toString() + " is not a valid string!"); 
    }
});

Object.defineProperty(Idea, 'colour', {
    get: function() {
        return this.colour;
    },
    set: function(str) {
        if(_.isString(str))
            this.colour = colour;
        else
            throw("Colour " + str.toString() + " is not a valid string!");
    }
});

module.exports = Idea;
