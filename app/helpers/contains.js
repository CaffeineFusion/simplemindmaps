'use strict';

module.exports.EllipseContains = function EllipseContains(point, center, width, height) {
	//todo: refactor with error handling
	//console.log('point: %s, center: %s, height: %d, width: %d', JSON.stringify(point), JSON.stringify(center), height, width);
	try {
		var pow = Math.pow;
		return ((pow(point.x - center.x,2))/pow(width/2,2)) + (pow(point.y - center.y,2)/pow(height/2,2)) <= 1 ? true : false;
	}
	catch(err){
		console.log(err);
	}
};