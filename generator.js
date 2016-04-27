'use strict';

var RegexMap = require('./regexMap');

class Generator {

  stack: [],
  currentState: 1,
  finalStates: [5],

  automatonState: 0,
  nextAutomatonState: 1,

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

}
