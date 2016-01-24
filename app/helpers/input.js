'use strict';

var inputState =  {
	mouseOver:null,
	offSet:{x:0, y:0}
};

function Bind(obj, controller, callback) {

	this.controller = controller;

	function onClick(e) {
		console.log('click!');
		//console.log('mouse has clicked on x:%s y:%s', e.pageX, e.pageY);
		controller.onClick(e, inputState, function(err, res) {
			//callback(err, res);
		});
	}

	function onMouseMove(e) {
		//console.log('mouse has moved to x:%s y:%s', e.pageX, e.pageY);
		controller.onMouseMove(e, inputState, function(err, res) {
			//callback(err, res);
		});
	}

	function onMouseOver(e) {
		inputState.mouseOver = true;
	}

	function onMouseOut(e) {
		inputState.mouseOver = false;
	}

	inputState.offSet.x = obj.offsetLeft;
	inputState.offSet.y = obj.offsetTop; 
	obj.onclick = onClick;
	obj.onmousemove = onMouseMove;
	obj.onmouseover = onMouseOver;
	obj.onmouseout = onMouseOut;

}

module.exports.Bind = Bind;