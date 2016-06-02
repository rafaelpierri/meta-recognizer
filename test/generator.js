'use strict';

var Generator = require('../generator');
var assert = require('chai').assert;
var Automaton = require('../app');
var RegexMap = require('../regexMap');

describe('Generator', function(){

  describe('#constructor(automatonState, automatonNextState)', function(){
    var generator = new Generator();
    it('should create an stack', function(){
      assert.instanceOf(generator.stack, Array);
    });
    it('should assign 0 to automatonState if no value is provided', function(){
      assert.isTrue(generator.automatonState==0);
    });
    it('should assign 1 to automatonNextState if no value is provided', function(){
      assert.isTrue(generator.automatonNextState==1);
    });
    it('should create an automaton', function(){
      assert.instanceOf(generator.automaton, Automaton);
    });
  });

  describe('#newTerminal(token)', function(){
    var generator = new Generator();
    generator.newTerminal('a');
    it('should create a new state transition from automatonState to automatonNextState for a given token', function(){
      assert.isTrue(generator.automaton.rules[0]['a']==1);
    });
    it('should have automatonNextState incremented', function(){
      assert.isTrue(generator.automatonNextState==2);
    });
    it('should have automatonState with the value of automatonNextState', function(){
      assert.isTrue(generator.automatonState==1);
    });
  });
  describe('#newDefinition()', function(){
    var generator = new Generator();
    generator.newDefinition();
    it('should push automatonState and automatonNextState to the stack', function(){
      assert.isTrue(generator.stack[0].left==0&&generator.stack[0].right==1);
    });
    it('should have automatonNextState incremented', function(){
      assert.isTrue(generator.automatonNextState==2);
    });
    it('should keep automatonState with same value', function(){
      assert.isTrue(generator.automatonState==0);
    });
  });
  describe('#newOptionalSection()', function(){
    var generator = new Generator();
    generator.newOptionalSection();
    it('should keep automatonState with same value', function(){
      assert.isTrue(generator.automatonState==0);
    });
    it('should add an epsilon transition from automatonState to automatonNextState', function(){
      assert.isTrue(generator.automaton.rules[0]['Ø']==1);
    });
    it('should push automatonState and automatonNextState to the stack', function(){
      assert.isTrue(generator.stack[0].left==0&&generator.stack[0].right==1);
    });
    it('should have automatonNextState incremented', function(){
      assert.isTrue(generator.automatonNextState==2);
    });
  });
  describe('#newZeroOrMoreSection()', function(){
    var generator = new Generator();
    generator.newZeroOrMoreSection();
    it('should add an epsilon transition from automatonState to automatonNextState', function(){
      assert.isTrue(generator.automaton.rules[0]['Ø']==1);
    });
    it('should update automatonState with automatonNextState value', function(){
      assert.isTrue(generator.automatonState==1);
    });
    it('should push automatonState and automatonNextState to the stack', function(){
      assert.isTrue(generator.stack[0].left==1&&generator.stack[0].right==1);
    });
    it('should have automatonNextState incremented', function(){
      assert.isTrue(generator.automatonNextState==2);
    });
  });
  describe('#definitionEnd()', function(){
    var generator = new Generator();
    generator.stack.push({left: 4, right: 5});
    generator.definitionEnd();
    it('should add an epsilon transition from automatonState to right side of tuple on top of stack', function(){
      assert.isTrue(generator.automaton.rules[0]['Ø']==5);
    });
    it('should update automatonState with right side of tuple on top of stack', function(){
      assert.isTrue(generator.automatonState==5);
    });
    it('should have the tuple removed from the stack', function(){
      assert.isTrue(generator.stack.length==0);
    });
  });
  describe('#optionEnd()', function(){
    var generator = new Generator();
    generator.stack.push({left: 4, right: 5});
    generator.optionEnd();
    it('should add an epsilon transition from automatonState to right side of tuple on top of stack', function(){
      assert.isTrue(generator.automaton.rules[0]['Ø']==5);
    });
    it('should update automatonState with left side of tuple on top of stack', function(){
      assert.isTrue(generator.automatonState==4);
    });
  });
  describe('#nonTerminalEnd()', function(){
    var generator = new Generator();
    generator.stack.push({left: 4, right: 5});
    generator.nonTerminalEnd();
    it('should add an epsilon transition from automatonState to right side of tuple on top of stack', function(){
      assert.isTrue(generator.automaton.rules[0]['Ø']==5);
    });
    it('should update automatonState with right side of tuple on top of stack', function(){
      assert.isTrue(generator.automatonState==5);
    });
    it('should have the tuple removed from the stack', function(){
      assert.isTrue(generator.stack.length==0);
    });
  });
});
