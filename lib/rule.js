const _ = require('lodash');

/**
 * Encapsulate rules for identifying phone numbers
 * @param {string }name - Name of the rule
 * @param {array} data - The array of numbers to be examined
 * @param {function} testFunction - The rule where the number crunching happens
 * @constructor
 */
const Rule = function(name, data, testFunction){

    if(!_.isString(name)){
        throw new Error('String expected for parameter name');
    }

    if(!_.isArray(data)){
        throw new Error('Array expected for parameter data');
    }

    if(!_.isFunction(testFunction)){
        throw new Error('Function expected for parameter testFunction');
    }

	this._name = name;
	this._testFunction = testFunction;
	this._res = [];
	this._data = data;
    this._itr = 0;
};

Rule.prototype = {

	/**
	 * Execute the rules one by one
	 * @param {function} callback
	 * @return {void}
	 */
	run: function(callback){
        for(this._itr; this._itr < this._data.length; this._itr++) {
            this._testFunction.call(this, this._itr);
        }

        callback.call(this, this._res);
	},

    /**
     * Adds a valid phone number to the results
     * @param {string} result
     * @return {void}
     */
	addResult: function(result){
		if(!result || String(result).length === 0){
			throw new Error('Cannot add null or zero length String to result');
		}
		
		this._res.push(result);
	},

    /**
     * Once a phone number is found, advance the array iterator by the length of the previous examined blocks so these are excluded from the next iteration (chunk-wise stepping)
     * @param {number} n - number of steps to advance
     * @return {void}
     */
    step: function(n){

    	if(!_.isNumber(n)){
            return;
	    }

        // Avoid stepping over
        if(this._data[this._itr + n] === undefined){
            return;
        }

        // Advance num steps
        this._itr += n;
    }
};

module.exports = Rule;
