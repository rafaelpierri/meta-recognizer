'use strict';

class Expr {

  constructor(generator, tokens){
    this.tokens = tokens;
    this.currentState = 6;
    this.rules = {
      6 : { 'terminal': {state: 7, callback: ()=>{}},
            'nonTerminal': {state: 7, callback: ()=>{}},
            'Ø': {state: 7, callback: ()=>{}},
            '(': {state: 8, callback: ()=>{}}, 
            '[': {state: 10, callback: ()=>{}}, 
            '{': {state: 12, callback: ()=>{}} },
      7 : { 'terminal': {state: 7, callback: ()=>{}},
            'nonTerminal': {state: 7, callback: ()=>{}},
            'Ø': {state: 7, callback: ()=>{}}, 
            '|': {state: 6, callback: ()=>{}},
            '(': {state: 8, callback: ()=>{}}, 
            '[': {state: 10, callback: ()=>{}}, 
            '{': {state: 12, callback: ()=>{}} },
      8 : { ')': {state: 7, callback: ()=>{}}},
      10 : { ']': {state: 7, callback: ()=>{}} },
      12 : { '}': {state: 7, callback: ()=>{}} }
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

module.exports = Expr;
