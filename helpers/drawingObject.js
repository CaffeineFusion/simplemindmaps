//Drawing Object is any object that can be drawn to the canvas. 
//It is intended to extend other classes from which various aspects of the interface are drawn.
var DrawingObject = function DrawingObject(){

	return {
		//Draw this object to 
		draw: function(ctx) {
			throw new TypeError("A drawing object has not implemented a draw function!");
		}
	}

}

module.exports = new DrawingObject();
