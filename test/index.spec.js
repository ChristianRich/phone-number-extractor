var assert = require('assert')
	, expect = require('chai').expect
	, _ = require('lodash')
	, Extractor = require('../lib/Extractor')
	, mockData = require('./mockdata/au');

describe('Australia', function() {

    it('should extract 1 mobile number (real text)', function (done) {

        var extractor = new Extractor(mockData.realText1, 'au');

        extractor.run(function(err, res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 1, 'Result length should be 1');
            done();
        });
    });

    it('should extract 1 mobile number and 1 landline (real text)', function (done) {

        var extractor = new Extractor(mockData.realText2, 'au');

        extractor.run(function(err, res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 2, 'Result length should be 2');
            assert(res[0] === '0266771102', 'Should be 0266771102');
            assert(res[1] === '0422150394', 'Should be 0422150394');
            done();
        });
    });

    it('should not extract any numbers (real text)', function (done) {

        var extractor = new Extractor(mockData.realText3, 'au');

        extractor.run(function(err, res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 0, 'Result length should be 0');
            done();
        });
    });

    it('should  extract 1 number (real text)', function (done) {

        var extractor = new Extractor(mockData.realText4, 'au');

        extractor.run(function(err, res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 1, 'Result length should be 1');
            done();
        });
    });

    it('should extract 2 obfuscated mobile numbers', function (done) {

        var extractor = new Extractor(mockData.obfuscated, 'au');

        extractor.run(function(err, res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 2, 'Result length should be 2');
            assert(res[0] === '0410542543', 'Should be 0410542543');
            assert(res[1] === '0410541451', 'Should be 0410541451');
            done();
        });
    });

    it('should extract 14 mobile numbers', function (done) {

        var extractor = new Extractor(mockData.mobile, 'au');

        extractor.run(function(err, res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 14, 'Result length should be 64');
            done();
        });
    });

    it('should extract 64 mobile numbers with an international prefix', function (done) {

        var extractor = new Extractor(mockData.mobileInternationalPrefix, 'au');

        extractor.run(function(err, res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 52, 'Result length should be 64');
            done();
        });
    });

    it('should extract 16 landline numbers', function (done) {

        var extractor = new Extractor(mockData.landline, 'au');

        extractor.run(function(err, res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 16, 'Result length should be 64');
            done();
        });
    });

    it('should extract 64 landline numbers with an international prefix', function (done) {

        var extractor = new Extractor(mockData.landlineInternationalPrefix, 'au');

        extractor.run(function(err, res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 64, 'Result length should be 64');
            done();
        });
    });

    it('should not extract invalid numbers / false positives', function (done) {

        var extractor = new Extractor(mockData.invalid, 'au');

        extractor.run(function(err, res){
            assert(_.isArray(res), 'Result should be type Array');
            assert(res.length === 0, 'Result length should 0');
            done();
        });
    });
});
