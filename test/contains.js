'use strict';

var chai = require('chai'),
	//chaiModel = require('./helpers/contains.js'),
	assert = require('chai').assert,
	expect = require('chai').expect;

//chai.use(chaiModel);

var Contains = require('../app/helpers/contains.js');
var EllipseContains = Contains.EllipseContains;

var ellipseWrapper = function(point, ellipse) {
	return EllipseContains(point, {x:ellipse.x, y:ellipse.y}, ellipse.w, ellipse.h);
}


/**
* testGenerator takes an ellipse and determines the necessary testing points basid on the values passed in.
**/
var ellipseTestGenerator = function (e) {

	it('Point on left-most X', function () {
        assert.equal(ellipseWrapper({x:e.x-(e.w/2), y:e.y}, e),true, 'point on left-most X boundary should return true');
    });

	it('Point outside left-most X', function () {
        assert.equal(ellipseWrapper({x:e.x-(e.w/2)-1, y:e.y}, e),false, 'point beyond left-most X boundary should return false');
    });

	it('Point on top Y', function () {
       assert.equal(ellipseWrapper({x:e.x, y:e.y-(e.h/2)}, e),true, 'point on top-most Y point should return true');
    });

	it('Point outside top Y', function () {
       assert.equal(ellipseWrapper({x:e.x, y:e.y-(e.h/2)-1}, e),false, 'point above top-most Y point should return false');
    });

	it('Point on right-most X', function () {
        assert.equal(ellipseWrapper({x:e.x+(e.w/2), y:e.y}, e),true, 'point on right-most X point should return true');
    });

	it('Point outside right-most X', function () {
        assert.equal(ellipseWrapper({x:e.x+(e.w/2)+1, y:e.y}, e),false, 'point beyond right-most X point should return false');
    });

	it('Point on bottom-most Y', function () {
        assert.equal(ellipseWrapper({x:e.x, y:e.y+(e.h/2)}, e),true, 'point on bottom-most Y point should return true');
    });

	it('Point outside bottom-most Y', function () {
        assert.equal(ellipseWrapper({x:e.x, y:e.y+(e.h/2)+1}, e),false, 'point beyond bottom-most Y point should return false');
    });

	it('Point on center-point', function () {
        assert.equal(ellipseWrapper({x:e.x, y:e.y}, e),true, 'point on center-point should return true');
    });

};

describe('Contains', function () {
	describe('#EllipseContains()', function () {
		describe('Ellipse on X boundary', function() {
			var e = {x:10, y:10, w:20, h:5};
			ellipseTestGenerator(e);
		});

		describe('Ellipse on Y boundary', function() {
			var e = {x:10, y:10, w:2, h:20};
			ellipseTestGenerator(e);
		});

		describe('Ellipse on X and Y boundary', function() {
			var e = {x:10, y:10, w:20, h:20};
			ellipseTestGenerator(e);
		});

		describe('Tiny Ellipse', function() {
			var e = {x:10, y:10, w:2, h:4};
			ellipseTestGenerator(e);
		});

		describe('Large Ellipse', function() {
			var e = {x:100, y:100, w:200, h:200};
			ellipseTestGenerator(e);
		});

		describe('Overhanging X boundary', function() {
			var e = {x:5, y:100, w:20, h:20};
			ellipseTestGenerator(e);
		});

		describe('Overhanging Y boundary', function() {
			var e = {x:100, y:5, w:20, h:20};
			ellipseTestGenerator(e);
		});
	});
});