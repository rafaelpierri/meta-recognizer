'use strict';

var Generator = require('../generator');
var assert = require('chai').assert;

describe('Generator', function(){
  describe('#semantic01(token)', function(){
    var generator = new Generator();
    generator.semantic01('a');
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
  describe('#semantic02()', function(){
    var generator = new Generator();
    generator.semantic02();
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
  describe('#semantic03()', function(){
    var generator = new Generator();
    generator.semantic03();
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
  describe('#semantic04()', function(){
    var generator = new Generator();
    generator.semantic04();
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
  describe('#semantic05()', function(){
    var generator = new Generator();
    generator.stack.push({left: 4, right: 5});
    generator.semantic05();
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
  describe('#semantic06()', function(){
    var generator = new Generator();
    generator.stack.push({left: 4, right: 5});
    generator.semantic06();
    it('should add an epsilon transition from automatonState to right side of tuple on top of stack', function(){
      assert.isTrue(generator.automaton.rules[0]['Ø']==5);
    });
    it('should update automatonState with left side of tuple on top of stack', function(){
      assert.isTrue(generator.automatonState==4);
    });
  });
  describe('#semantic07()', function(){
    var generator = new Generator();
    generator.stack.push({left: 4, right: 5});
    generator.semantic07();
    it('should add an epsilon transition from automatonState to right side of tuple on top of stack', function(){
      assert.isTrue(generator.automaton.rules[0]['Ø']==5);
    });
    it('should update automatonState with right side of tuple on top of stack', function(){
      assert.isTrue(generator.automatonState==5);
    });
    it('should have the tuple removed from the stack', function(){
      assert.isTrue(generator.stack.length==0);
    });
    it('should make a submachine return', function(){
      assert.isTrue(false);
    });
  });
});
