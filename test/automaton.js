'use strict';

var Automaton = require('../automaton.js');
var assert = require('chai').assert;

var grammarRules = {
  1: {'B': 2, 'C': 2},
  2: {'=': 3, 'Ø': 5},
  3: {'X': 4},
  4: {'.': 5},
  5: {'B': 2, 'C': 2}
}

var automaton = new Automaton(1, [5], grammarRules);

describe('Automaton', function() {
  describe('#constructor(initialState, finalStates, grammarRules)', function(){
    it("should be able to instantiate a new Automaton even if no rule is provided", function(){
      var automaton = new Automaton(1, [5]);
      assert.instanceOf(automaton, Automaton, 'this is an instance of an Automaton');
    });
  });
  describe('#recognize(string)', function () {
    it("should accept a grammar's sentence", function () {
      assert.isTrue(automaton.accept('B=X.') && automaton.accept('B=X.C=X.'));
    });
    it("should make empty transitions in the middle of a sentence", function () {
      assert.isTrue(automaton.accept('B=X.CB=X.'));
    });
    it("should make empty transitions in the end of a sentence", function () {
      assert.isTrue(automaton.accept('B=X.C')) && assert.isTrue(automaton.accept('B=X.CCCCCC'));
    });
    it("should reject a grammar's sentence", function () {
      assert.isFalse(automaton.accept('2'));
    });
  });
  describe('#addRule(currentState, token, nextState)', function () {
    it("should add a new rule to the automaton", function () {
      automaton.addRule(6, 'b', 7);
      assert(automaton.rules[6]['b']==7);
    });
  });
  describe('#nextEpsilonTransition()', function () {
    var grammarRules = {
      0: {'a': 2},
      2: {'b': 3},
      3: {'Ø': 1}
    }
    var automaton = new Automaton(3, [1], grammarRules);
    it("should should whether there is an available epsilon transition or not", function () {
      assert.isTrue(automaton.nextEpsilonTransition()==1);   
    });
  });
});
