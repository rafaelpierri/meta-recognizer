'use strict';

var Automaton = require('../app.js');
var assert = require('chai').assert;

var grammarRules = {
  1: {'B': 2, 'C': 2},
  2: {'=': 3, 'Ø': 5},
  3: {'X': 4},
  4: {'.': 5},
  5: {'B': 2, 'C': 2}
}

var automaton = new Automaton(grammarRules, 1, [5]);

describe('Automaton', function() {
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
});
