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
    var ideas = [];
    var ideasCount = 0;
    var name = viewName;


    /**
     * Creates a new Idea or recreates and adds an existing Idea
     * @param {string} title Basic label for the Idea. This is referenced by tags 
     *                       (ie. this determines which ideas will be connected on the 
     *                       canvas)
     * @param {object} opts  Allows an existing idea to be imported. Updates counter
     *                       if the id of the added Idea is greater than the current
     *                       id counter.
     *                       Currently takes {id,tags:[], body} as the required form
     *                       of the optional arg.
     */
    this.addIdea = function(title, opts) {
        if(typeof opts !== undefined) {
            var i = new Idea.Idea(title, opts.id);          //clunky, refactor Idea
            i.tags = opts.tags;
            i.body = opts.body;
            ideas.push(i);
            ideasCount = (i.id > ideasCount ? i.id : ideasCount);   //Make sure that counter is higher than the highest id.
            return i.id;
        }
        else {
            console.log('ideas: ' + ideas.toString());
            ideas.push(new Idea.Idea(title, ideasCount));

            return ideasCount++; //return current id then increment
        }
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

        name = view.title;
        for(var i in ideas) {
            this.addIdea(i.title, {id:i.id, tags:i.tags, body:i.body});
        }

        //ideasCount needs to be set to the highest id + 1

        /*try {
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
        }*/

    };

    this.toJSON = function() {
        return {title:name, ideas:[]};
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
