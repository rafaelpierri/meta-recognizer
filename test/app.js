'use strict';

var app = require('../app');
var expect = require('chai').expect;

describe('app', () => {
  describe('#app(string)', () => {
   it('should admit X=a|b. and recognize a', () => {
      var recognizer = app('X=a|b.');
      expect(recognizer.accept('a')).to.be.true;
    });
    it('should admit X=a|b. and recognize b too', () => {
      var recognizer = app('X=a|b.');
      expect(recognizer.accept('b')).to.be.true;
    });
    it('should admit X=a|b. and not reject ab', () => {
      var recognizer = app('X=a|b.');
      expect(recognizer.accept('ab')).to.be.false;
    });
    it('should admit X=a. and recognize a', () => {
      var recognizer = app('X=a.');
      expect(recognizer.accept('a')).to.be.true;
    });
    it('should admit X=ab. and recognize ab', () => {
      var recognizer = app('X=ab.');
      expect(recognizer.accept('ab')).to.be.true;
    });
  });
});
