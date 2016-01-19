module.exports = function parseJSON (jsonString) {

    'use strict';

    try {
        var j = JSON.parse(jsonString);

        if (j && typeof j === "object" && j !== null) {
            return j;
        }
    }
    catch (e) { }

    return false;

};