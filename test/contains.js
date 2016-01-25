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

describe('Contains', function () {
	describe('#EllipseContains()', function () {
		describe('Ellipse on X boundary', function() {
			var e = {x:10, y:10, w:20, h:5};

			it('Point on X boundary', function () {
	            assert.equal(ellipseWrapper({x:0, y:10}, e),true, 'point on X boundary should return true');
	        });

			it('Point on top Y', function () {
	            assert.equal(ellipseWrapper({x:10, y:5}, e),true, 'point on top-most Y point should return true');
	        });

			it('Point on right-most X', function () {
	            assert.equal(ellipseWrapper({x:20, y:10}, e),true, 'point on right-most X point should return true');
	        });

			it('Point on bottom-most Y', function () {
	            assert.equal(ellipseWrapper({x:10, y:15}, e),true, 'point on bottom-most Y point should return true');
	        });

			it('Point on center-point', function () {
	            assert.equal(ellipseWrapper({x:10, y:10}, e),true, 'point on center-point should return true');
	        });

		});
		describe('Ellipse on Y boundary', function() {

		});
	});
});