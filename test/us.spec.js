var assert = require('assert')
	, _ = require('lodash')
	, extractor = require('../lib/extractor')
	, mockData = require('./mockdata/us');

describe('United States', function() {

    it('should extract 3 numbers', function (done) {

        extractor.getCandidates(
            mockData.advert1,
            'us'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 3, 'Result length should be 3');
            assert(res[0] === '9304630800');
            assert(res[1] === '3477213178');
            assert(res[2] === '7185909000');
            done();
        })

        .catch(done);
    });

    it('should extract 1 number', function (done) {

        extractor.getCandidates(
            mockData.advert2,
            'us'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 1, 'Result length should be 1');
            assert(res[0] === '6313353997');
            done();
        })

        .catch(done);
    });

    it('should extract 1 number', function (done) {

        extractor.getCandidates(
            mockData.advert3,
            'us'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 1, 'Result length should be 1');
            assert(res[0] === '6315909707');
            done();
        })

        .catch(done);
    });

    it('should extract 1 number with +1 prefix', function (done) {

        extractor.getCandidates(
            mockData.intnlPrefix,
            'us'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 1, 'Result length should be 1');
            assert(res[0] === '3231234567');
            done();
        })

        .catch(done);
    });
});
