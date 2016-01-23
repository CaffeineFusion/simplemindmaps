'use strict';
var http = require('http');
/**
 * parseJSON This function takes an unformatted string and transforms it into JSON.
 *     If the string is not a valid JSON object, it returns false.
 *     Currently, no error logging or handling has been implemented
 * @param  {string} jsonString      the string format of some JSON object
 * @return {JSON or false}        returns either the parsed JSON string, or false if it is not valid JSON
 */
 var ParseJSON = function ParseJSON (jsonString) {

    try {
        var j = JSON.parse(jsonString);

        if (j && typeof j === 'object' && j !== null) {
            return j;
        }
    }
    catch (e) { }

    return false;

};

module.exports = ParseJSON;

/**
 * Replica of the JQuery loadJSON function
 * @param  {Function} callback [description]
 * @return {null}            [description]
 */
module.exports.LoadJSON = function LoadJSON(host, filePath, callback) {   
	return http.get({
        host: host,
        path: '/' + filePath
    	}, 
    	function(response) {
	        // Continuously update stream with data
	        var body = '';
	        response.on('data', function(d) {
	            body += d;
        	});
    		response.on('end', function() {
    			callback(null, ParseJSON(body));
	        });
	    }
    );

};