'use strict';

/**
 * Extend is used for prototypal inheritance between classes.
 * @param  {object} parent    The parent class to be inherited from
 * @param  {object} child     The child class to extend
 * @param  {{function, [...]}} overrides Takes a list of functions to append to 
 *                             			 the child prototype
 * @return {constructor}      passes the new constructor for the child object
 */
modules.export = function Extend(parent, child, overrides) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
  child.parent = parent.prototype;
 
  // Copy the methods passed in to the prototype
  for (var name in methods) {
    child.prototype[name] = methods[name];
  }
  // so we can define the constructor inline
  return child;
}


//Kudos to Juan Mendes
//adapted from: http://js-bits.blogspot.com.au/2010/08/javascript-inheritance-done-right.html