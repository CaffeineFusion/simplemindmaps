'use strict';
/**
 * parseJSON This function takes an unformatted string and transforms it into JSON.
 *     If the string is not a valid JSON object, it returns false.
 *     Currently, no error logging or handling has been implemented
 * @param  {string} jsonString      the string format of some JSON object
 * @return {JSON or false}        returns either the parsed JSON string, or false if it is not valid JSON
 */
module.exports = function parseJSON (jsonString) {

    try {
        var j = JSON.parse(jsonString);

        if (j && typeof j === "object" && j !== null) {
            return j;
        }
    }
    catch (e) { }

    return false;

};