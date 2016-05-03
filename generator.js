'use strict';

var RegexMap = require('./regexMap');
var Automaton = require('./app');

class Generator {

  constructor(automatonState, automatonNextState){
    this.stack = [];
    this.finalStates = [5];
    //i dont know what i wrote up above
    this.automatonState = automatonState || 0;
    this.automatonNextState = automatonNextState || 1;
    this.stateCounter = this.automatonNextState;
    this.automaton = new Automaton(this.automatonState, [this.automatonNextState]);
  }

  rules(token) {
    var nonTerminal = new RegExp('[A-Z]');
    var terminal = new RegExp('[a-z]');
    var epsilon = 'Ø';
    var r = {
      1: new RegexMap([nonTerminal, {nextState: 2, callback: () => {}}]),
      2: new RegexMap(['=', {nextState: 6, callback: () => {}}]),
      6: new RegexMap([terminal, {nextState: 7, callback: () => {}}],
                      [epsilon, {nextState: 7, callback: () => {}}],
                      ['(', {nextState: 8, callback: () => {}}],
                      ['[', {nextState: 10, callback: () => {}}],
                      ['{', {nextState: 12, callback: () => {}}]),
      7: new RegexMap([terminal, {nextState: 7, callback: () => {}}],
                      [epsilon, {nextState: 7, callback: () => {}}],
                      ['|',{nextState: 6, callback: () => {}}],
                      ['(',{nextState: 8, callback: () => {}}],
                      ['[',{nextState: 10, callback: () => {}}],
                      ['{',{nextState: 12, callback: () => {}}]
                      ['.',{nextState: 5, callback: () => {}}]),
      8: new RegexMap([epsilon, 9]),
      10: new RegexMap([epsilon, 11]),
      12: new RegexMap([epsilon, 13])
    };
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
    //TODO: make a submachine return (???)
  }
}

module.exports = Generator;
