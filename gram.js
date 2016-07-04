'use strict';

var Generator = require('./generator');
var Expr = require('./expr');

class Gram {

  constructor(tokens){
    this.generator = new Generator();
    this.tokens = tokens;
    this.currentState = 1;
    this.rules = {
      1 : { 'nonTerminal': {state: 2, callback: () => {}}},
      2 : { 'assign': {state: 4, callback: this.assignAndConsumeExpression.bind(this)}},
      4 : { 'dot': {state: 5, callback: this.generator.nonTerminalEnd.bind(this.generator)}},
      5 : { 'nonTerminal': {state: 2, callback: ()=>{}} }
    };
  }

  changeState(token){
    var state = this.getNextState(token.type);
    this.currentState = state.state;
    state.callback();
  } 

  getRule(){ return this.rules[this.currentState]; }

  getNextState(tokenType){
    return this.getRule()[tokenType];
  }

  consume(){
    while(this.tokens.length > 0){
      var token = this.tokens.shift();
      this.changeState(token);
    }
  }

  assignAndConsumeExpression(token){
    this.generator.newDefinirion(token);
    var expr = new Expr(this.generator, this.tokens);
    expr.consumeTokens();
  }

}

module.exports = Gram;
