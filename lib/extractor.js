var async = require('async')
	, _ = require('lodash')
	, utils = require('./util/common')
    , Promise = require('bluebird')
	, locale = require('./locale')
    , phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()
    , PNF = require('google-libphonenumber').PhoneNumberFormat
    , PNV = require('google-libphonenumber').PhoneNumberUtil.ValidationResult;

module.exports = {

    /**
     * Returns an array of possible phone number candidates for a specific country code
     * @param {string} text - Text string from where the phone numbers is extracted
     * @param {string} countryCode - au or us
     * @param {boolean=} useGooglePhoneLib - When true uses Google LibPhoneNumber to format the result
     * @return {Promise}
     */
    getCandidates: function(text, countryCode, useGooglePhoneLib){

        var that = this,
            resultsFormatted = [];

        return new Promise(function(resolve, reject){

            var data = utils.formatString(text),
                countryRules;

            if(_.isString(countryCode)){
                countryCode = countryCode.toUpperCase();
            }

            if(countryCode === 'AU'){
                countryRules = new locale.AU(data);
            }

            if(countryCode === 'US'){
                countryRules = new locale.US(data);
            }

            if(!countryRules){
                return reject('Unsupported county code "' + countryCode + '". Supported codes are "AU" (Australia) and "US" (United States)');
            }

            async.map(countryRules.getRules(), function(rule, cb){
                rule.run(function(result){
                    cb(null, result);
                });
            },

            function(err, results){

                results = _.flatten(results || []);

                if(useGooglePhoneLib === true){
                    _.each(results, function(n){
                        resultsFormatted.push(
                            that.formati18n(n, countryCode)
                        )
                    });

                    return resolve(resultsFormatted);
                }

                resolve(results);
            });
        });
    },

    /**
     * Uses Google LibPhoneNumber to format and verify the number
     * @param {number|string} n
     * @param {string} countryCode
     * @return {object}
     */
    formati18n: function(n, countryCode){

        var number = phoneUtil.parse(n, countryCode),
            isPossibleNumber = phoneUtil.isPossibleNumber(number);

        var res = {
            input: n,
            countryCode: countryCode,
            isPossibleNumber: isPossibleNumber,
            isPossibleNumberWithReason: phoneUtil.isPossibleNumberWithReason(number)
        };

        if(isPossibleNumber){
            res.isPossibleNumber = true;
            res.isNumberValid = phoneUtil.isValidNumber(number);
            res.countryCode = countryCode;
            res.formatted = phoneUtil.formatInOriginalFormat(number, countryCode);
            res.national = phoneUtil.format(number, PNF.NATIONAL);
            res.international = phoneUtil.format(number, PNF.INTERNATIONAL)
        }

        switch (phoneUtil.isPossibleNumberWithReason(number)){

            case PNV.IS_POSSIBLE:
                res.isPossibleNumberWithReason = 'IS_POSSIBLE';
            break;

            case PNV.INVALID_COUNTRY_CODE:
                res.isPossibleNumberWithReason = 'INVALID_COUNTRY_CODE';
            break;

            case PNV.TOO_SHORT:
                res.isPossibleNumberWithReason = 'TOO_SHORT';
            break;

            case PNV.TOO_LONG:
                res.isPossibleNumberWithReason = 'TOO_LONG';
            break;
        }

        return res;
    }
};
