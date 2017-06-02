const Rule = require('../rule')
    , areaCodes = require('./resources/usAreaCodes.json'); // US area codes do not include any overseas dependencies or territories

module.exports = function(data){

    /**
     * Returns true if area code exists
     * @param {string} s
     * @return {boolean}
     */
    const isValidAreaCode = function(s){
        s = s.substr(0, 3);
        return areaCodes.indexOf(parseInt(s, 10)) !== -1;
    };

    /**
     * Returns true number of digits is 10
     * @param {string} n
     * @return {boolean}
     */
    const isValidLandLine = function(n){

        // Examine international prefix
        if(n.substr(0,2) === '1'){
            return n.length === 11;
        }

        // Examine number of digits
        return n.length === 10;
    };

    const rules = [

        /**
         * Iterates from each position in the number array's current index and looks ahead until a valid number has been identified
         * If a number is identified we skip the number of steps it took to find this number and exit the loop
         */
        new Rule('RegExp', data, function (itr) {

            let testStr = '',
                steps = 0;

            for(let i = itr; i < data.length; i++){
                testStr += data[i];
                steps++;

                if(isValidAreaCode(testStr) && isValidLandLine(testStr)){
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
