var async = require('async')
	, _ = require('lodash')
	, utils = require('./util/common')
	, locale = require('./locale');

/**
 * Creates a new extractor instance
 * @param {string} text
 * @param {string} countryCode
 */
var Extractor = function(text, countryCode) {

    if(_.isUndefined(text)){
        throw new Error('Expected parameter text');
    }

    if(!_.isString(text)){
        throw new Error('Type String expected parameter text');
    }

    if(_.isUndefined(countryCode)){
        throw new Error('Expected parameter country');
    }

    if(!_.isString(countryCode)){
        throw new Error('Type String expected parameter country');
    }

    this._text = text;
    this._countryCode = countryCode;
    return this;
};

Extractor.prototype = {

    /**
     * Starts the extraction process
     * @param callback
     */
    run : function(callback){

        if(!_.isFunction(callback)){
            throw new Error('Expected parameter callback to be a function');
        }

        var data = utils.formatString(this._text),
            countryRules;

        if(this._countryCode.toLowerCase() === 'au'){
            countryRules = new locale.AU(data);
        }

        if(!this._countryCode){
            throw new Error('Unsupported county code ' + this._countryCode);
        }

        async.map(countryRules.getRules(), function(rule, callback){
            rule.run(function(result){
                callback(null, result);
            });
        },

        function(err, results){
            callback(_.flatten(results || []));
        });
    }
};

module.exports = Extractor;
