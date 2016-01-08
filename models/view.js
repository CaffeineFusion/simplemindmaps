var _ = require('underscore');
var idea = require('../models/idea.js');

var View = function View(viewName){
    this.ideas = [];
    this.ideasCount = 0;
    this.name = viewName;

    this.addIdea = function(title) {
        console.log("ideas: " + this.ideas.toString());
        this.ideas.push(new idea.Idea(title, this.ideasCount));
        return this.ideasCount++;
    };

    this.removeIdea = function(id) { 
        Error("removeIdea has not been implemented yet");
        //target = 
        //ix= _.findIndex(this.ideas, function() {});
        //if(ix > -1) { ideas.splice(ix,1); } 
        //else { Error("Idea #" + id + "was no longer found in View"); }
    };

    this.getIdea = function(id) {
        Error("getIdea has not been implemented yet");
        //return ...; 
    };

    //get name() { return this.name; };

}


/*Object.defineProperty(View, 'name', {
    get: function() {
        return this.name;
    },
    set: function(str) {
        if(_.isString(str))
            this.name = str;
        else
            throw("Name " + str.toString() + " is not a valid string!"); 
    }
});*/




module.exports = new View();
