'use strict';

var assert = require('chai').assert;
var Gram = require('../gram');

describe('Gram', function() {
  describe('#constructor()', function(){
    it('should build a new Gram submachine', function(){
      var gram = new Gram(null);
      assert.instanceOf(gram, Gram);
    });
  });
  describe('#changeState(token)', function(){
    it('should change to state #2 if nonTerminal type is provided, when currentState=1', function(){
      var gram = new Gram(null);
      gram.changeState({type: 'nonTerminal'});
      assert.equal(gram.currentState, 2);
    });
  });
  describe('#getRule()', function(){
    it('should retrieve a rule for the current state', function(){
      var gram = new Gram(null);
      assert.equal(gram.getRule(), gram.rules[1]);
    });
  });
  describe('#getNextState()', function(){
    it('should retrieve the next state for a given token type, considering the implicit current state', function(){
      var gram = new Gram(null);
      assert.equal(gram.getNextState('nonTerminal'), gram.rules[1]['nonTerminal']);
    });
  });
});

