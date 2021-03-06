'use strict';

var Lexer = require('./lexer');
var Gram = require('./gram');

module.exports = function(string){
  var lexer = new Lexer();
  var tokens = lexer.tokenize(string); 
  var grammar = new Gram(tokens); 
  grammar.consume();
  return grammar.generator.automaton;
}
