'use strict';

var assert = require('chai').assert;
var expect = require('chai').expect;
var Expr = require('../expr');
var Generator = require('../generator');

describe('Expr', function() {
  describe('#constructor(generator, tokens)', function(){
    it('should build a new Expr submachine', function(){
      var generator = new Generator();    
      var tokens = [];
      var expr = new Expr(generator, tokens);
      assert.instanceOf(expr, Expr);
    }); 
  }); 
  describe('#merge(obj, src)', function(){
    it('should merge two objects', function(){
      var obj = { a: 1 };
      var src = { b: 2 };
      var result = Expr.prototype.merge(obj, src); 
      expect(result['a']).to.be.equal(1);
      expect(result['b']).to.be.equal(2);
    }); 
  });
}); 
