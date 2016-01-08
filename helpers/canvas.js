var _ = require('underscore');
var drawingObject = require('../helpers/drawingObject.js');

//Create drawingObject parent class

var Canvas = function Canvas() {
	var context;
	var activeObjects;

	return {
		initialize : function(ctx) {
			this.context = ctx;
			this.activeObjects = [];
		},

		addDrawObject: function(obj) {
			this.activeObjects.push(obj);
		},
		draw: function() {
			for(var o of activeObjects) {
				o.draw(context);
			}
		}
		



	}
}


module.exports = new Canvas(); 