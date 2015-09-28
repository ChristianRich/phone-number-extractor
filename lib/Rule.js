/**
 * Encapsule rules for identifying phone numbers
 * 
 * @param name 				Name of the rule
 * @param data 				The array of numbers to be examined
 * @param testFunction 		The rule where the number crunching happens
 * @constructor
 */
var Rule = function(name, data, testFunction){
	this._name = name;
	this._testFunction = testFunction;
	this._res = [];
	this._data = data;
    this._itr = 0;
};

Rule.prototype = {

	/**
	 * Execute rules one by one
	 * @param callback
	 */
	run: function(callback){
        for(this._itr; this._itr < this._data.length; this._itr++) {
            this._testFunction.call(this, this._itr);
        }

        callback.call(this, this._res);
	},
	
	addResult: function(result){
		
		if(!result || String(result).length === 0){
			throw new Error('Cannot add null or zero length String to result');
		}
		
		this._res.push(result);
	},

    step: function(num){

        if(this._data[this._itr + num] === undefined){
            return;
        }

        this._itr += num;
    }
};

module.exports = Rule;
