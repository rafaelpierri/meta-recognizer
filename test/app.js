'use strict';

var app = require('../app');
var expect = require('chai').expect;

describe('app', () => {
  describe('#app(string)', () => {
    it('should admit X={a}c. and recognize aaac', () => {
      var recognizer = app('X={a}c.');
      expect(recognizer.accept('aaac')).to.be.true;
    });
    it('should admit X=[a]c. and recognize ac', () => {
      var recognizer = app('X=[a]c.');
      expect(recognizer.accept('ac')).to.be.true;
    });
    it('should admit X=[a]c. and recognize c', () => {
      var recognizer = app('X=[a]c.');
      expect(recognizer.accept('c')).to.be.true;
    });
    it('should admit X=(aa|b)c. and recognize aac', () => {
      var recognizer = app('X=(aa|b)c.');
      expect(recognizer.accept('aac')).to.be.true;
    });
    it('should admit X=(a|b)c. and recognize bc', () => {
      var recognizer = app('X=(a|b)c.');
      expect(recognizer.accept('bc')).to.be.true;
    });
    it('should admit X=(a). and recognize a', () => {
      var recognizer = app('X=(a).');
      expect(recognizer.accept('a')).to.be.true;
    });
    it('should admit X=a|b|c. and recognize b', () => {
      var recognizer = app('X=a|b|c.');
      expect(recognizer.accept('a')).to.be.true;
    });
    it('should admit X=aa|b. and recognize a', () => {
      var recognizer = app('X=aa|b.');
      expect(recognizer.accept('aa')).to.be.true;
    });
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
