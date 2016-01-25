'use strict';

module.exports.EllipseContains = function EllipseContains(point, center, width, height) {
	//todo: refactor with error handling
	console.log('height: %d', height);
	//console.log('(%d - %d) ^ 2 = %d', point.x, center.x, pow(point.x - center.x, 2));
	console.log('(%d - %d) ^ 2 = %d', point.y, center.y, pow(point.y - center.y, 2));
	console.log('width/2 ^2 = %d, total = %d', pow((width/2),2), ((pow(point.x - center.x,2))/pow(width/2,2)));
	console.log('height/2 ^2 = %d, total = %d', pow(height/2,2), (pow(point.y - center.y,2)/pow(height/2,2)));
	console.log(((pow(point.x - center.x,2))/pow(width/2,2)) + (pow(point.y - center.y,2)/pow(height/2,2)));
	return ((pow(point.x - center.x,2))/pow(width/2,2)) + (pow(point.y - center.y,2)/pow(height/2,2)) <= 1 ? true : false;
};