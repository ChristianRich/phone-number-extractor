var _ = require('lodash');

/**
 * Phone numbers are typically written as groups of ciphers, aka blocks.
 * Essentially this class provides shortcut methods to examine array contents, combine parts of an array and get the length of characters across indexes.
 * All to help identify phone numbers
 */
var self = module.exports = {
	
	/**
	 * Returns the concatenated contents of an arbitrary number of array indexes
	 * If a single index is supplied the contents of that position is returned
	 * If multiple indexed are supplied the results are concatenated into a string
	 *
	 * E.g
	 * var myArray = ['hello', 'how', 'are', 'you]
	 * concatIndex(myArray, 0) // 'hello'
	 * concatIndex(myArray, 0, 1, 2); // 'hellohoware'
	 * 
	 * @param arr
	 * @params {arguments} One or more indexes seperated by comma
	 * @returns {String}
	 */
	concatIndex: function(arr){

		if(!_.isArray(arguments[0])){
			throw new Error('Array expected for first argument');
		}

		if(_.isUndefined(arguments[1])){
			throw new Error('Expected at least one position to be returned');
		}
		
		var index;
	
		if(arguments.length === 2){
			index = arguments[1];
	
			if(!_.isNumber(index)){
				throw new Error('Number expected for index ' + index);
			}
	
			if(_.isUndefined(arr[index])){
				throw new Error('Attempt to access undefined position in Array ' + index);
			}
	
			return arr[index];
		}
	
		var concat = '';
	
		for(var i = 1; i < arguments.length; i++){
			
			if(_.isUndefined(arr[arguments[i]])){
				throw new Error('Attempt to access undefined position in Array ' + arguments[i]);
			}
	
			concat += arr[arguments[i]];
		}
	
		return concat;
	},

	/**
	 * Examines an array and returns true if all of the arbitrary positions supplied are not undefined
	 *
	 * E.g
	 * var myArray = ['hello', 'there']
	 * hasIndex(myArray, 0, 1) // true because position 0 and 1 are not undefined
	 * hasIndex(myArray, 0, 1, 2) // false because position 2 is undefined
	 *
	 * @param {array} arr 
	 * @params {arguments}
	 * @returns {boolean}
	 */
	hasIndex: function(arr){

		if(!_.isArray(arguments[0])){
			throw new Error('Array expected for first argument');
		}

		if(_.isUndefined(arguments[1])){
			throw new Error('Expected at least one position to be examined');
		}

		for(var i = 1; i < arguments.length; i++){
			if(_.isUndefined(arr[arguments[i]])){
				return false;
			}
		}

		return true;
	},

	/**
	 * Similar to concatIndex only this method accepts a specific number of arguments
	 * 
	 * E.g
	 * var myArray = ['1', '2', '3', '4', '5', '6'];
	 * concatIndexByCount(myArray, 0, 3); // '123'
	 * 
	 * @param {array} arr
	 * @param {number} startPos		Where the iterator starts
	 * @param {number} numPos 		Number of positions to look ahead
	 * @returns {string}
	 */
	concatIndexByCount: function(arr, startPos, numPos){

		if(!_.isArray(arr)){
			throw new Error('Array expected for parameter arr');
		}

		if(!_.isNumber(startPos)){
			throw new Error('Number expected for parameter iterator');
		}

		if(!_.isNumber(numPos)){
			throw new Error('Number expected for parameter count');
		}
	
		var res = '';
	
		for(var i = startPos; i < startPos + numPos; i++){
			res += self.concatIndex(arr, i);
		}
	
		return res;
	},
	
	/**
	 * Counts the number of characters in an arbitrary number of array indexes and returns the total character length
	 * Think of this as an easy way to count the character length over multipe indexes
	 * 
	 * E.g
	 * var myArray = ['23', '41', '04', '34', '232', '197', '21']
	 * getBlockSize(myArray, 2, 4); // 10 because the total length of characters between index 2 and 4 is 10 (start and end index included)
	 * 
	 * @param arr
	 * @param startIndex
	 * @param numIndexes
	 * @returns {number}
	 */
	getBlockSize: function(arr, startIndex, numIndexes){

		if(!_.isArray(arr)){
			throw new Error('Array expected for parameter arr');
		}

		if(!_.isNumber(startIndex)){
			throw new Error('Number expected for parameter startIndex');
		}

		if(!_.isNumber(numIndexes)){
			throw new Error('Number expected for parameter numIndexes');
		}

		var res = 0;

		for(var i = startIndex; i < startIndex + numIndexes; i++){

			if(_.isUndefined(arr[i])){
				return -1;
			}
			
			res += String(arr[i]).length;
		}
		
		return res;
	}
};
