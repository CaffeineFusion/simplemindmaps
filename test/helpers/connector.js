'use strict';
var Connector = require('../../helpers/connector.js');

module.exports = function (chai, utils) {
	var Assertion = chai.Assertion;


	/*utils.addProperty(Assertion.prototype, 'isLabelledOval', function() {
		this.assert(
			this._obj instanceof LabelledOval,
			'expected #{this} to be a LabelledOval',
			'expected #{this} to not be a LabelledOval'
			);
	}); */

	Assertion.addMethod('connector', function(type) {
		var obj = this._obj;

		new Assertion(this._obj).to.be.instanceof(Connector);

		this.assert(
			obj._type === type,
			'expected #{this} to be of type #{exp} but got #{act}',
			'expected #{this} to be not of type #{act}',
			type, obj._type
		);

	});
	

};