'use strict';

var Lexer = require('./lexer');
var Gram = require('./gram');

var app = function(string){
  var lexer = new Lexer();
  var tokens = lexer.tokenize(string); 
  debugger;
  var grammar = new Gram(tokens); 
  grammar.consume();
  return grammar.generator.automaton;
}

module.exports = app;
