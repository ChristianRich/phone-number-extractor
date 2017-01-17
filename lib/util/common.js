var _ = require('lodash');

module.exports = {

    /**
     * Returns the numeric portion of a string
     * @param {string} s
     * @returns {string}
     */
    getDigits : function (s) {
        if(!_.isString(s)) return '';
        return s.replace (/[^\d]/g, ' ');
    },

    /**
     * Collapse multiple spaces to single spaces
     * @param {string} s
     * @returns {string}
     */
    reduceSpaces: function(s) {
        if(!_.isString(s)) return '';
        return s.replace(/\s{2,}/g, ' ');
    },

    /**
     * Extract digits from a string and return them in an Array
     * @param {string} s
     * @returns {Array}
     */
    formatString: function(s){
        if(!_.isString(s)) return [];
        var digits = this.reduceSpaces(this.getDigits(s)).trim();
        return digits.split(' ');
    }
};
