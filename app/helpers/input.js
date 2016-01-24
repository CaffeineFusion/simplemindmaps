'use strict';

var inputState = function inputState() {
	this.mouseOver = null;
	this.offSet = {x:0, y:0};
};

function Bind(obj) {

	obj.onclick = OnClick;
	obj.onmousemove = OnMouseMove;
	obj.onmouseover = OnMouseOver;
	obj.onmouseout = OnMouseOut;


};

function OnClick(e) {

};

function OnMouseMove(e) {

};

function OnMouseOver(e) {
	inputState.mouseOver = true;
};

function OnMouseOut(e) {
	inputState.mouseOver = false;
};

module.exports.bind = Bind;