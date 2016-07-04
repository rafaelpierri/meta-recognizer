'use strict';

var app = require('../app');
var expect = require('chai').expect;

describe('app', () => {
  describe('#app(string)', () => {
    it('should admit X=ab. and recognize ab', () => {
      var recognizer = app('X=a.');
      expect(recognizer.accept('a')).to.be.true;
    });
  });
});
