var Rule = require('../Rule')
    , regExpAUNumber = new RegExp(/^\({0,1}((0|61|0061)(2|3|4|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/);

/**
 * Common Australian phone number patterns covering mobile and land line including international prefixes in various formats
 * Does not cater for special numbers / business numbers like 1300 and 1800
 * @param {array} data - Array of numbers
 */
module.exports = function(data) {

    /**
     * Returns true if the area code or prefix exhibits AU number characteristics
     * @param {string} s
     * @returns {boolean}
     */
    var isValidPrefix = function(s){
        if (s.substr(0, 2) === '02' || s.substr(0, 2) === '03' || s.substr(0, 2) === '04' || s.substr(0, 2) === '07' || s.substr(0, 2) === '08') return true;
        return (s.substr(0, 2) === '61') || (s.substr(0, 4) === '0061');
    };

    /**
     * Returns true if land line part of the number exhibits AU number characteristics
     * @param {string} n
     * @return {boolean}
     */
    var isValidLandLine = function(n){

        // Examine international prefix
        if(n.substr(0,2) === '61'){
            return n.length === 11;
        }

        // Examine international prefix
        if(n.substr(0,4) === '0061'){
            return n.length === 13;
        }

        // Examine number of digits
        return n.length === 10;
    };

    /**
     * Returns true if string passes AU regexp (the other checks are in place because the RegExp rule can't stand on its own)
     * @param {string} s
     * @return {boolean}
     */
    var passRegExp = function(s){
        return regExpAUNumber.test(s);
    };

	var rules = [

        /**
         * Iterates from each position in the number array's current index and looks ahead until a valid number has been identified
         * If a number is identified we skip the number of steps it took to find this number and exit the loop
         */
        new Rule('RegExp', data, function (itr) {

            var testStr = '',
                steps = 0;

            for(var i = itr; i < data.length; i++){
                testStr += data[i];
                steps++;

                if(isValidPrefix(testStr) && isValidLandLine(testStr) && passRegExp(testStr)){
                    this.addResult(testStr);
                    this.step(steps - 1);
                    break;
                }
            }
        })
	];

	this.getRules = function(){
		return rules;
	}
};
