'use strict';

var inputState =  {
	mouseOver:null,
	offSet:{x:0, y:0}
};

function Bind(obj, controller, callback) {


	function onClick(e) {
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
	obj.onclick = onClick.bind(controller);
	obj.onmousemove = onMouseMove.bind(controller);
	obj.onmouseover = onMouseOver.bind(controller);
	obj.onmouseout = onMouseOut.bind(controller);

}

module.exports.Bind = Bind;