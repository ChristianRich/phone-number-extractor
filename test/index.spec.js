var assert = require('assert')
	, expect = require('chai').expect
	, _ = require('lodash')
	, Extractor = require('../lib/Extractor')
	, mockData = require('./mockdata/au');

describe('Phone number extractor', function() {

    it('should extract phone number', function (done) {

        var extractor = new Extractor(mockData.realText1, 'au');

        extractor.run(function(err, res){
            assert(res[0] === '0434100200', 'Should be 0434 100200');
            done();
        });
    });
});
