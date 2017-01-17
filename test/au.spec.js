var assert = require('assert')
	, _ = require('lodash')
	, extractor = require('../lib/extractor')
	, mockData = require('./mockdata/au');

describe('Australia', function() {

    it('should extract 1 mobile number (real text)', function (done) {

        extractor.getCandidates(
            mockData.realText1,
            'au'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 1, 'Result length should be 1');
            done();
        })

        .catch(done);
    });

    it('should extract 1 mobile number and 1 land line (real text)', function (done) {

        extractor.getCandidates(
            mockData.realText2,
            'au'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 2, 'Result length should be 2');
            assert(res[0] === '0266771102', 'Should be 0266771102');
            assert(res[1] === '0422150394', 'Should be 0422150394');
            done();
        })

        .catch(done);
    });

    it('should not extract any numbers (real text)', function (done) {

        extractor.getCandidates(
            mockData.realText3,
            'au'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 0, 'Result length should be 0');
            done();
        })

        .catch(done);
    });

    it('should extract 1 number (real text)', function (done) {

        extractor.getCandidates(
            mockData.realText4,
            'au'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 1, 'Result length should be 1');
            done();
        })

        .catch(done);
    });

    it('should extract 2 obfuscated mobile numbers', function (done) {

        extractor.getCandidates(
            mockData.obfuscated,
            'au'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 2, 'Result length should be 2');
            assert(res[0] === '0410542543', 'Should be 0410542543');
            assert(res[1] === '0410541451', 'Should be 0410541451');
            done();
        })

        .catch(done);
    });

    it('should extract 14 mobile numbers', function (done) {

        extractor.getCandidates(
            mockData.mobile,
            'au'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 14, 'Result length should be 64');
            done();
        })

        .catch(done);
    });

    it('should extract 64 mobile numbers with an international prefix', function (done) {

        extractor.getCandidates(
            mockData.mobileInternationalPrefix,
            'au'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 52, 'Result length should be 64');
            done();
        })

        .catch(done);
    });

    it('should extract 16 land line numbers', function (done) {

        extractor.getCandidates(
            mockData.landline,
            'au'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 16, 'Result length should be 64');
            done();
        })

        .catch(done);
    });

    it('should extract 64 land line numbers with an international prefix', function (done) {

        extractor.getCandidates(
            mockData.landlineInternationalPrefix,
            'au'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 64, 'Result length should be 64');
            done();
        })

        .catch(done);
    });

    it('should not extract invalid numbers / false positives', function (done) {

        extractor.getCandidates(
            mockData.invalid,
            'au'
        )

        .then(function(res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 0, 'Result length should 0');
            done();
        })

        .catch(done);
    });
});
