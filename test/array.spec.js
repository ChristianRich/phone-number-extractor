var assert = require('assert')
	, expect = require('chai').expect
	, _ = require('lodash')
	, util = require('../lib/util/array');

describe('PhoneNumberExtractor array utils', function() {
	
	describe('hasIndex', function () {

		var arr;

		before(function(){
			arr = [ '24', '8', '5', '2', '38', '30', '150', '60', '200', '0410272698' ];
		});
		
		it('should return true for pos 1', function (done) {
			var res = util.hasIndex(arr, 1);
			assert(!_.isUndefined(res), 'Should not be undefined');
			assert(res === true, 'Should be true');
			done();
		});

		it('should return true for pos 1,2,3,4', function (done) {
			var res = util.hasIndex(arr, 1,2,3,4);
			assert(!_.isUndefined(res), 'Should not be undefined');
			assert(res === true, 'Should be true');
			done();
		});

		it('should return true for pos 1,2,3,4,16', function (done) {
			var res = util.hasIndex(arr, 1,2,3,4,16);
			assert(!_.isUndefined(res), 'Should not be undefined');
			assert(res === false, 'Should be false');
			done();
		});

		it('should throw an error (missing required args)', function (done) {

			expect(function(){
				util.hasIndex(arr);
			}).to.throw('Expected at least one position to be examined');
			
			done();
		});
	});

	describe('concatIndex', function () {

		var arr;

		before(function(){
			arr = [ '24', '8', '5', '2', '38', '30', '150', '60', '200', '0410272698' ];
		});

		it('should return the correct data for requested positions', function (done) {
			var res = util.concatIndex(arr, 0);
			assert(!_.isUndefined(res), 'Should not be undefined');
			assert(res === '24', 'Should be 24');
			done();
		});

		it('should return the correct data for requested positions', function (done) {
			var res = util.concatIndex(arr, 0, 1, 2);
			assert(!_.isUndefined(res), 'Should not be undefined');
			assert(res === '2485', 'Should be 2485');
			done();
		});

		it('should return the correct data for requested positions', function (done) {
			var res = util.concatIndex(arr, 4, 6, 8);
			assert(!_.isUndefined(res), 'Should not be undefined');
			assert(res === '38150200', 'Should be 38150200');
			done();
		});

		it('should throw an error (querying positions in empty array', function (done) {

			expect(function(){
				util.concatIndex([], 4, 6, 8);
			}).to.throw('Attempt to access undefined position in Array 4');
			
			done();
		});

		it('should throw an error (missing required args)', function (done) {

			expect(function(){
				util.concatIndex();
			}).to.throw('Array expected for first argument');

			done();
		});

		it('should throw an error (missing required args)', function (done) {

			expect(function(){
				util.concatIndex(arr);
			}).to.throw('Expected at least one position to be returned');

			done();
		});
	});

	describe('concatIndexByCount', function () {

		var arr;

		before(function(){
			arr = [ '24', '8', '5', '2', '38', '30', '150', '60', '200', '0410272698' ];
		});

		it('should return the correct data for requested positions', function (done) {
			var res = util.concatIndexByCount(arr, 0, 3);
			assert(!_.isUndefined(res), 'Should not be undefined');
			assert(res === '2485', 'Should be 2485');
			done();
		});

		it('should return the correct data for requested positions', function (done) {
			var res = util.concatIndexByCount(arr, 4, 4);
			assert(!_.isUndefined(res), 'Should not be undefined');
			assert(res === '383015060', 'Should be 383015060');
			done();
		});
	});

	describe('getBlockSize', function () {

		var arr;

		before(function(){
			arr = ['23', '41', '04', '34', '232', '197', '21']
		});

		it('should return true for the requested sum / positions', function (done) {
			var res = util.getBlockSize(arr, 2, 4);
			assert(!_.isUndefined(res), 'Should not be undefined');
			assert(res === 10, 'Should be 10');
			done();
		});

		it('should return true for the requested sum / positions', function (done) {
			var res = util.getBlockSize(arr, 5, 2);
			assert(!_.isUndefined(res), 'Should not be undefined');
			assert(res === 5, 'Should be 5');
			done();
		});

		it('should throw an error (missing required args)', function (done) {
        
			expect(function(){
				util.getBlockSize();
			}).to.throw('Array expected for parameter arr');
        
			done();
		});

		it('should throw an error (invalid type)', function (done) {
        
			expect(function(){
				util.getBlockSize(arr, 'hello');
			}).to.throw('Number expected for parameter startIndex');
        
			done();
		});
		

		it('should throw an error (invalid type)', function (done) {
        
			expect(function(){
				util.getBlockSize(arr, 5, []);
			}).to.throw('Number expected for parameter numIndexes');
        
			done();
		});
	});
});
