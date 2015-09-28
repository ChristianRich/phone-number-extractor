var Rule = require('../Rule');

/**
 * Common Australian phone number patterns covering mobile and landline including international prefixes in various formats
 * Does not cater for special numbers like 1300 and 1800
 * @param {array} data Array of numbers
 */
module.exports = function(data) {

    /**
     * Returns true if the start of the number is a valid prefix
     * @param s
     * @returns {boolean}
     */
    var isValidPrefix = function(s){
        if (s.substr(0, 2) === '02' || s.substr(0, 2) === '03' || s.substr(0, 2) === '04' || s.substr(0, 2) === '07' || s.substr(0, 2) === '08') return true;
        if (s.substr(0, 2) === '61') return true;
        if (s.substr(0, 4) === '0061') return true;
        return false;
    };

    /**
     * Regular expression for mobile and landline numbers including checks for international prefixes
     * This expression is not perfect and sometimes identifies false positives. Hence some crude manual checks are run in conjuction with the this check
     * http://www.alectang.com/blog/archive/2009/05/11/regular-expression-for-validating-australian-phone-numbers-29.aspx
     * @type {RegExp}
     */
    var r = new RegExp(/^\({0,1}((0|61|0061)(2|3|4|7|8)){0,1}\){0,1}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{2}(\ |-){0,1}[0-9]{1}(\ |-){0,1}[0-9]{3}$/);

    var isPhoneNumber = function(n){

        var firstTest = isValidPrefix(n) && r.test(n);

        if(!firstTest){
            return false;
        }

        // 61 434 500 600 (11)
        if(n.substr(0,2) === '61'){
            return n.length === 11;
        }

        // 0061 434 500 600 (13)
        if(n.substr(0,4) === '0061'){
            return n.length === 13;
        }

        return n.length === 10;
    };

	var rules = [

        /**
         * Iterates from each position in the numbers array's current index and looks forward until a valid number has been identified
         * If a number is identified we skip the number of steps it took to find this number and exit the loop
         */
        new Rule('RegExp', data, function (itr) {

            var testStr = '',
                steps = 0;

            for(var i = itr; i < data.length; i++){
                testStr += data[i];
                steps++;

                if(isPhoneNumber(testStr)){
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
