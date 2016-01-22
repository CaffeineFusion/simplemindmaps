'use strict';
var express = require('express');
exports.index = function(req, res){
  res.render('home', { title: 'Simple Mind Maps' });
};