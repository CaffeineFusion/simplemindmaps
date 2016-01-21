'use strict';
var Idea = require('../models/idea.js');
var ParseJSON = require('../helpers/parseJSON');
var Canvas = require('../canvas/canvas');


/**
 * The view is a particular selection of ideas mapped out together.
 *     This should be able to loaded and saved.
 *     When that view is selected, those ideas are mapped to canvas objects.
 * @param {string} viewName name of the view
 */
var View = function View(viewName){
    this.ideas = [];
    this.ideasCount = 0;
    this.name = viewName;

    this.addIdea = function(title) {
        console.log('ideas: ' + this.ideas.toString());
        this.ideas.push(new idea.Idea(title, this.ideasCount));
        return this.ideasCount++;
    };

    this.removeIdea = function(id) { 
        console.log('view.removeIdea() has not been implemented yet');
        //target = 
        //ix= _.findIndex(this.ideas, function() {});
        //if(ix > -1) { ideas.splice(ix,1); } 
        //else { Error('Idea #' + id + 'was no longer found in View'); }
    };

    this.getIdea = function(id) {
        console.log('view.getIdea() has not been implemented yet');
        //return ...; 
    };

    //get name() { return this.name; };
    //
    /**
     * [load load takes a JSON representation of the view and all of it's associated ideas]
     * @param  {[string]} view [JSON as string - representation of the view and associated ideas]
     * @return {[type]}      [description]
     */
    this.load = function(view, callback) {
        console.log('view.load() has not been implemented yet');

        try {
            var j = ParseJSON(view);
            this.name = j.name;
            this.ideas = j.ideas;
            this.ideasCount = j.ideasCount;
            callback(null, this);
            //return this;
        }
        catch(e) {
            console.log(e);
            callback(e);
            //return false;
        }

    };

    this.loadToCanvas = function(canvas) {
        
    };

};


/*Object.defineProperty(View, 'name', {
    get: function() {
        return this.name;
    },
    set: function(str) {
        if(_.isString(str))
            this.name = str;
        else
            throw('Name ' + str.toString() + ' is not a valid string!'); 
    }
});*/




module.exports = new View();
