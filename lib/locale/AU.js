var Rule = require('../Rule')
	, arrayUtil = require('../util/array');

/**
 * Common Australian phone number patterns covering mobile and landline, but not special numbers like 1300 and 1800
 * @param {array} data Array of numbers
 */
module.exports = function(data) {
	
	var expextedLength = 10; // Australian mobile and landline numbers have a length of exactly 10 digits

	var rules = [
		
		new Rule('AU mobile prefix 04 single string', data, function (itr, currentChar) {
			if (currentChar.length === expextedLength && currentChar.substr(0, 2) === '04') {
				this.addResult(currentChar)
			}
		}),
		
		new Rule('AU mobile prefix 04 with block lengths of 1-5', data, function (itr, currentChar) {
			if (currentChar === '04') {
				for (var j = 1; j < 6; j++) {
					if (arrayUtil.getBlockSize(this.data, itr, j) === expextedLength) {
						this.addResult(arrayUtil.concatIndexByCount(this.data, itr, j));
					}
				}
			}
		}),
        
		new Rule('AU mobile prefix 04x,with block lengths of 1-5', data, function (itr, currentChar) {
			if (currentChar.length === 3 && currentChar.substr(0, 2) === '04') {
				for (var j = 1; j < 6; j++) {
					if (arrayUtil.getBlockSize(this.data, itr, j) === expextedLength) {
						this.addResult(arrayUtil.concatIndexByCount(this.data, itr, j));
					}
				}
			}
		}),
        
		new Rule('AU mobile prefix 04xx with block lengths of 1-5', data, function(itr, currentChar){
			if(currentChar.length === 4 && currentChar.substr(0, 2) === '04'){
				for(var j = 1; j < 6; j++){
					if(arrayUtil.getBlockSize(this.data, itr, j) === expextedLength){
						this.addResult(arrayUtil.concatIndexByCount(this.data, itr, j));
					}
				}
			}
		}),

		/**
		 * INTERNATIONAL AU PHONE PREFIX
		 */
		
		new Rule('AU mobile international prefix 614 single block (e.g. +61481220288)', data, function(itr, currentChar){
			if(currentChar.length === 11 && currentChar.substr(0, 3) === '614'){
				this.addResult('0' + currentChar.substr(2, 11)); // Convert to local number
			}
		}),
		
		new Rule('AU mobile international prefix 61 with block length 1-4 (e.g +61 481220288, +61 481 220 288)', data, function(itr, currentChar){
			
			// Check that current character is '61', a next character exists and the first character of the next character is '4'
			// This confirms the pattern of ['61', '4....']
			if(currentChar === '61' && arrayUtil.hasIndex(this.data, itr + 1) && arrayUtil.concatIndex(this.data, itr + 1).substr(0, 1) === '4'){

				for(var j = 1; j < 5; j++){
					if(arrayUtil.getBlockSize(this.data, itr, j) === 11){
						var n = arrayUtil.concatIndexByCount(this.data, itr, j);
						this.addResult('0' + n.substr(2, 11)); // Convert to local number
					}
				}
			}
		}),
		
		new Rule('AU mobile international prefix 00614 single block (e.g. 0061481220288)', data, function(itr, currentChar){
			if(currentChar.length === 13 && currentChar.substr(0, 5) === '00614'){
				this.addResult('0' + currentChar.substr(2, 13)); // Convert to local number
			}
		}),
		
		new Rule('AU mobile international prefix 0061 with block length 1-4 (e.g 0061 481220288, 0061 481 220 288)', data, function(itr, currentChar){

			// Check that current character is '61', a next character exists and the first character of the next character is '4'
			// This confirms the pattern of ['61', '4....']
			if(currentChar === '0061' && arrayUtil.hasIndex(this.data, itr + 1) && arrayUtil.concatIndex(this.data, itr + 1).substr(0, 1) === '4'){

				for(var j = 1; j < 5; j++){
					if(arrayUtil.getBlockSize(this.data, itr, j) === 13){
						var n = arrayUtil.concatIndexByCount(this.data, itr, j);
						
						this.addResult('0' + n.substr(4, 13)); // Convert to local number
					}
				}
			}
		}),

		/**
		 * LANDLINES
		 */
		new Rule('Landline prefix 02, 03, 07, 08 single string', data, function (itr, currentChar) {
			if (currentChar.length === expextedLength && (currentChar.substr(0, 2) === '02' || currentChar.substr(0, 2) === '03' || currentChar.substr(0, 2) === '07' || currentChar.substr(0, 2) === '08')) {
				if(currentChar.length === expextedLength){
					this.res.push(currentChar);	
				}
			}
		}),
		
		new Rule('AU landline prefix 02, 03, 07, 08 with block lengths of 1-4', data, function(itr, currentChar){
			if (currentChar.length === 2 && (currentChar.substr(0, 2) === '02' || currentChar.substr(0, 2) === '03' || currentChar.substr(0, 2) === '07' || currentChar.substr(0, 2) === '08')) {
				for(var j = 1; j < 5; j++){
					if(arrayUtil.getBlockSize(this.data, itr, j) === expextedLength){
						this.res.push(arrayUtil.concatIndexByCount(this.data, itr, j));
					}
				}
			}
		})
	];
	
	this.getRules = function(){
		return rules;
	}
};
