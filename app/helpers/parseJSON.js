'use strict';
/**
 * parseJSON This function takes an unformatted string and transforms it into JSON.
 *     If the string is not a valid JSON object, it returns false.
 *     Currently, no error logging or handling has been implemented
 * @param  {string} jsonString      the string format of some JSON object
 * @return {JSON or false}        returns either the parsed JSON string, or false if it is not valid JSON
 */
module.exports = function ParseJSON (jsonString) {

    try {
        var j = JSON.parse(jsonString);

        if (j && typeof j === 'object' && j !== null) {
            return j;
        }
    }
    catch (e) { }

    return false;

};


/**
 * Replica of the JQuery loadJSON function
 * @param  {Function} callback [description]
 * @return {null}            [description]
 */
module.exports.LoadJSON = function LoadJSON(filePath, callback) {   

	var xobj = new XMLHttpRequest();
	    xobj.overrideMimeType("application/json");
	xobj.open('GET', filePath, true); 
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {
		// Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
			callback(null, xobj.responseText);
		}
	};
	xobj.send(null);  
};