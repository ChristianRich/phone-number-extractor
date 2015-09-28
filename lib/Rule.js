/**
 * Encapsule rules for identifying phone numbers
 * 
 * @param name 				Name of the rule
 * @param data 				The array of numbers to be examined
 * @param testFunction 		The rule where the number crunching happens
 * @constructor
 */
var Rule = function(name, data, testFunction){
	this.name = name;
	this.testFunction = testFunction;
	this.res = [];
	this.data = data;
};

Rule.prototype = {

	/**
	 * Execute rules one by one
	 * @param callback
	 */
	run: function(callback){
		for(var i = 0; i < this.data.length; i++) {
			this.testFunction.call(this, i, this.data[i]);
		}

		callback(this.res);
	},
	
	addResult: function(result){
		
		if(!result || String(result).length === 0){
			throw new Error('Cannot add null or zero length String to result');
		}
		
		this.res.push(result);
	}
};

module.exports = Rule;
