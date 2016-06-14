'use strict';

class Expr {

  merge(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
  }

  constructor(generator, tokens){
    this.generator = generator;
    this.tokens = tokens;
    this.currentState = 6;
    var expressionRule = {
      'terminal': {state: 7, callback: this.generator.newTerminal.bind(this.generator)},
      'nonTerminal': {state: 7, callback: ()=>{}},
      'Ø': {state: 7, callback: ()=>{}},
      '(': {state: 8, callback: this.generator.newDefinition.bind(this.generator)}, 
      '[': {state: 10, callback: this.generator.newOptionalSection.bind(this.generator)}, 
      '{': {state: 12, callback: this.generator.newZeroOrMoreSection.bind(this.generator)},
      ')': {state: 666, callback: this.abort.bind(this)},
      ']': {state: 666, callback: this.abort.bind(this)},
      '}': {state: 666, callback: this.abort.bind(this)}
    };
    var orRule = {'|': {state: 6, callback: this.generator.optionEnd.bind(this.generator)}};
    this.rules = {
      6 : this.expressionRule,
      7 : this.merge(expressionRule, orRule),
      8 : {  ')': {state: 7, callback: this.generator.definitionEnd.bind(this.generator)}},
      10 : { ']': {state: 7, callback: this.generator.definitionEnd.bind(this.generator)} },
      12 : { '}': {state: 7, callback: this.generator.definitionEnd.bind(this.generator)} }
    };
  }

  changeState(token){
    var state = this.getNextState(token.type);
    this.currentState = state.state;
    state.callback();
    return this.currentState==666;
  }

  abort(token){
    this.tokens.unshift(token);
  }

  getRule(){ return this.rules[this.currentState]; }

  getNextState(tokenType){
    return this.getRule()[tokenType];
  }

  consumeTokens(){
    while(this.tokens.length > 0){
      var token = this.tokens.shift();
      var aborted = this.changeState(token);
      if(aborted)
        break;
    }
  }

}

module.exports = Expr;
