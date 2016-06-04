'use strict';

var Generator = require('./generator');

class Gram {

  constructor(tokens){
    this.generator = null;
    this.tokens = tokens;
    this.currentState = 1;
    this.rules = {
      1 : { 'nonTerminal': {state: 2, callback: this.buildGenerator.bind(this) } },
      2 : { 'assign': {state: 4, callback: this.generator.newDefinition.bind(this.generator)}},
      4 : { 'dot': {state: 5, callback: this.generator.nonTerminalEnd.bind(this.generator)} },
      5 : { 'nonTerminal': {state: 2, callback: ()=>{}} }
    };
  }

  buildGenerator(){
    this.generator = new Generator();
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

}

module.exports = Gram;
