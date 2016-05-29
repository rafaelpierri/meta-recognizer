'use strict';

var Automaton = require('./app');

class Gram {

  constructor(generator, tokens){
    this.tokens = tokens;
    this.currentState = 1;
    this.rules = {
      1 : { 'nonTerminal': {state: 2, callback: ()=>{}} },
      2 : { 'assign': {state: 4, callback: ()=>{}}},
      4 : { 'dot': {state: 5, callback: ()=>{}} },
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

}

module.exports = Gram;
