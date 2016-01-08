var _ = require('underscore');

var View = function() {
    this.ideas = [];


}

Object.defineProperty(View, 'name', {
    get: function() {
        return this.name;
    },
    set: function(str) {
        if(_.isString(str))
            this.name = str;
        else
            throw("Name " + str.toString() + " is not a valid string!"); 
    }
});

module.exports = View;
