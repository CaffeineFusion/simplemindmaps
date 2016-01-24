'use strict';
var Idea = require('../models/idea.js');
var ParseJSON = require('../helpers/parseJSON');
var Canvas = require('../canvas/canvas');


/**
 * Important Note: This View class is *not* to do with the presentation layer.
 *     Rather, it is the basic container - a "view" of the underlying data.
 *     Think, instead, of data warehousing and data reports.
 *     Multiple views of the underlying data structures will allow the same
 *         concepts to be mapped in different ways for canvas presentation.
 * 
 * The view is a particular selection of ideas mapped out together.
 *     This should be able to loaded and saved.
 *     When a view is selected, the associated ideas are mapped to canvas objects.
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

    this.clear = function() {

        ideas = [];
        ideasCount = 0;

    };

    //get name() { return this.name; };
    //
    /**
     * [load load takes a JSON representation of the view and all of it's associated ideas]
     * @param  {[string]} view [JSON as string - representation of the view and associated ideas]
     * @return {[type]}      [description]
     */
    this.load = function(view, callback) {

        this.clear();
        name = view.title;
        for(var i in view.ideas) {
            this.addIdea(i.title, {id:i.id, tags:i.tags, body:i.body});
        }

    };

    this.toJSON = function() {

        var currentIdeas = [];
        for(var i in ideas) {
            currentIdeas.push(i.toJSON());
        }
        return { title:name, ideas:currentIdeas };
    };

    this.loadToCanvas = function(canvas, callback) {

        var objects = [];
        for(var i in ideas) {
            objects.push(i.toJSON());
        }

        try {
            //refactor
            callback(null, canvas.load(objects, this.name, 
                function(err, res) { 
                    if(err) {
                        console.log(err);
                    }
                    else {
                        console.log(res);
                    }
                }));
        }
        catch (err) {
            callback(err);
        }
    };

    /**
     * createConnectors Private function to map out the connections between ideas 
     *     once all of the ideas are loaded into the view.
     * Note: relies on the correlation of tags with the names of ideas that are 
     *     already in the View. If the idea is not yet in the view, then the tag
     *     will be ignored and no connector drawn.
     * 
     * @return {[type]} [description]
     */
    var createConnectors = function() {
        console.log('createConnectors() has not been implemented yet');
    };

};


/*Object.defineProperty(View, 'name', {
    get: function() {
        return this._name;
    },
    set: function(str) {
        if(_.isString(str))
            this._name = str;
        else
            throw('Name ' + str.toString() + ' is not a valid string!'); 
    }
});*/




module.exports = new View();
