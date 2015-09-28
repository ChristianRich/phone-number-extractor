var common = {

	/**
	 * Returns the numeric portion of a string
	 * @param s
	 * @returns {String}
	 */
    getDigits : function (s) {
		if(!s) return '';
        return s.replace (/[^\d]/g, ' ');
    },

	/**
	 * Collapse multiple spaces to single spaces
	 * @param s
	 * @returns {String}
	 */
    reduceSpaces: function(s) {
        if(!s) return '';
		return s.replace(/\s{2,}/g, ' ');
    },
	
	/**
	 * Extract digits from a string and return them in an Array
	 * @param s
	 * @returns {Array}
	 */
	formatString: function(s){
		if(!s) return [];
		var digits = common.reduceSpaces(common.getDigits(s)).trim();
		return digits.split(' ');
	},

	/**
     * TODO
	 * Detect commonly used patterns where users replace numbers with letters like O for 0 and l for 1
	 * @param s
	 * @returns {string}
	 */
	lettersToNumbersSwap: function(s){
		
		if(!s) return '';

		var t = s.toLowerCase().split('');

		for(var i = 0; i < t.length; i++){

			// Replace the letter 'O' with 0 in O434 000000
			if(t[i] === 'o' && t[i + 1] === '4'){
				t[i] = '0';
			}

			// Replace the letter 'l' with 1 in 0434 5l27254 9
			if(t[i] === 'l' && common.isDigitOnly(t[i - 1]) && common.isDigitOnly(t[i + 1])){
				t[i] = '1';
			}
		}

		return t.join('');
	}
};

module.exports = common;
