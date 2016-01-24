'use strict';

module.exports.EllipseContains = function EllipseContains(point, center, width, height) {
	//todo: refactor with error handling
	return (((point.x - center.x)^2)/((width/2)^2)) + (((point.y - center.y)^2)/((height/2)^2)) <= 1 ? true : false;
}