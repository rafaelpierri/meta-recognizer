'use strict';

class Expr {

  constructor(generator, tokens){
    this.tokens = tokens;
    this.currentState = 6;
    this.rules = {
      6 : { 'terminal': {state: 7, callback: this.generator.newTerminal.bind(this.generator)},
            'nonTerminal': {state: 7, callback: ()=>{}},
            'Ø': {state: 7, callback: ()=>{}},
            '(': {state: 8, callback: this.generator.newDefinition.bind(this.generator)}, 
            '[': {state: 10, callback: this.generator.newOptionalSection.bind(this.generator)}, 
            '{': {state: 12, callback: this.generator.newZeroOrMoreSection.bind(this.generator)} },
      7 : { 'terminal': {state: 7, callback: this.generator.newTerminal.bind(this.generator)},
            'nonTerminal': {state: 7, callback: ()=>{}},
            'Ø': {state: 7, callback: ()=>{}}, 
            '|': {state: 6, callback: this.generator.optionEnd.bind(this.generator)},
            '(': {state: 8, callback: this.generator.newDefinition.bind(this.generator)}, 
            '[': {state: 10, callback: this.generator.newOptionalSection.bind(this.generator)}, 
            '{': {state: 12, callback: this.generator.newZeroOrMoreSection.bind(this.generator)} },
      8 : { ')': {state: 7, callback: this.generator.definitionEnd.bind(this.generator)}},
      10 : { ']': {state: 7, callback: this.generator.definitionEnd.bind(this.generator)} },
      12 : { '}': {state: 7, callback: this.generator.definitionEnd.bind(this.generator)} }
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
