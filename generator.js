'use strict';

var RegexMap = require('./regexMap');
var Automaton = require('./app');

class Generator {

  constructor(automatonState, automatonNextState){
    this.stack = [];
    this.generatorState = 1;
    this.automatonState = automatonState || 0;
    this.automatonNextState = automatonNextState || 1;
    this.automaton = new Automaton(this.automatonState, [this.automatonNextState]);
    this.rules = this.createRules();
  }

  buildAutomaton(string){
    var tokens = string.split('');
    for(var i = 0; i < tokens.length; i++){
      var token = tokens[i];
      var rule = this.rules[this.generatorState];
      if(rule){
        if(!rule.get(token)){
          var value = rule.get('Ø');  
          i--;
        }else{
          var value= rule.get(token);
        }
        if(value){
          this.generatorState = value.nextState;
          value.callback(token);
        }else{
          throw new Error('Automaton rejected: no next state for given token');
        }
      }else{
        throw new Error('Automaton rejected: no rule for current state');
      }
    }
    return this.automaton;
  }

  createRules() {
    var nonTerminal = new RegExp('[A-Z]');
    var terminal = new RegExp('[a-z]');
    var epsilon = 'Ø';
    var r = {
      1: new RegexMap([nonTerminal, {nextState: 2, callback: () => {}}]),
      2: new RegexMap(['=', {nextState: 6, callback: this.semantic02.bind(this)}]),
      6: new RegexMap([terminal, {nextState: 7, callback: this.semantic01.bind(this)}],
                      [epsilon, {nextState: 7, callback: this.semantic01.bind(this)}],
                      ['(', {nextState: 8, callback: this.semantic02.bind(this)}],
                      ['[', {nextState: 10, callback: this.semantic03.bind(this)}],
                      ['{', {nextState: 12, callback: this.semantic04.bind(this)}]),
      7: new RegexMap([terminal, {nextState: 7, callback: this.semantic01.bind(this)}],
                      [epsilon, {nextState: 7, callback: this.semantic01.bind(this)}],
                      ['(',{nextState: 8, callback: this.semantic02.bind(this)}],
                      ['[',{nextState: 10, callback: this.semantic03.bind(this)}],
                      ['{',{nextState: 12, callback: this.semantic04.bind(this)}],
                      ['.',{nextState: 5, callback: this.semantic05.bind(this)}],
                      ['|',{nextState: 6, callback: this.semantic06.bind(this)}]),
      8: new RegexMap([epsilon, {nextState: 9, callback: () => {}}]),
      9: new RegexMap([')', {nextState: 7, callback: this.semantic05.bind(this)}]),
      10: new RegexMap([epsilon, {nextState: 11, callback: () => {}}]),
      11: new RegexMap([']', {nextState: 7, callback: this.semantic05.bind(this)}]),
      12: new RegexMap([epsilon, {nextState: 13, callback: () => {}}]),
      13: new RegexMap(['}', {nextState: 7, callback: this.semantic05.bind(this)}])
    };
    return r;
  }

  semantic00(){

  }

  semantic01(token){
    this.automaton.addRule(this.automatonState, token, this.automatonNextState);
    this.automatonState = this.automatonNextState;
    this.automatonNextState++;
  }
  
  semantic02(token){
    this.stack.push({left: this.automatonState, right: this.automatonNextState});
    this.automatonNextState++;
  }

  semantic02(token){
    this.stack.push({left: this.automatonState, right: this.automatonNextState});
    this.automatonNextState++;
  }

  semantic03(token){
    this.automaton.addRule(this.automatonState, 'Ø', this.automatonNextState);
    this.stack.push({left: this.automatonState, right: this.automatonNextState});
    this.automatonNextState++;
  }

  semantic04(token){
    this.automaton.addRule(this.automatonState, 'Ø', this.automatonNextState);
    this.automatonState = this.automatonNextState;
    this.stack.push({left: this.automatonState, right: this.automatonNextState});
    this.automatonNextState++;
  }
  
  semantic05(token){
    var tuple = this.stack.pop();
    this.automaton.addRule(this.automatonState, 'Ø', tuple.right);
    this.automatonState = tuple.right;
  }

  semantic06(token){
    var tuple = this.stack[this.stack.length - 1]
    this.automaton.addRule(this.automatonState, 'Ø', tuple.right);
    this.automatonState = tuple.left;
  }

  semantic07(token){
    var tuple = this.stack.pop();
    this.automaton.addRule(this.automatonState, 'Ø', tuple.right);
    this.automatonState = tuple.right;
  }
}

module.exports = Generator;
