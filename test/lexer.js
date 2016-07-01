'use strict';

var Lexer = require('../lexer');
var assert = require('chai').assert;

var lexer = new Lexer();

describe('Lexer', function() {
  describe('#constructor', function(){
    it("should initialize an empty word", function(){
      assert.equal(lexer.word, '');
    });
    it("should initialize the first state as nonTerminalState", function(){
      assert.equal(lexer.state, lexer.nonTerminal);
    });
    it("should an empty token list", function(){
      assert.equal(lexer.tokens.length, 0);
    });
  });
  describe('#isUpperCase(string)', function(){
    it("should claim that a string is upper case if it is in upper case", function(){
      assert.isTrue(lexer.isUpperCase('A'));
    });
    it("should claim that a string is not upper case if it is not completly upper case", function(){
      assert.isFalse(lexer.isUpperCase('Ab'));
    });
    it("should claim that a string is not upper case if it is not in upper case", function(){
      assert.isFalse(lexer.isUpperCase('b'));
    });
  });
  describe('#isLowerCase(string)', function(){
    it("should claim that a string is lower case if it is in lower case", function(){
      assert.isTrue(lexer.isLowerCase('a'));
    });
    it("should claim that a string is not lower case if it is not completly lower case", function(){
      assert.isFalse(lexer.isLowerCase('Ab'));
    });
    it("should claim that a string is not lower case if it is not in lower case", function(){
      assert.isFalse(lexer.isLowerCase('B'));
    });
  });
  describe('#isAggregate(string)', function(){
    it("should return true if it recieves a '('", function(){
      assert.isTrue(lexer.isAggregate('('));
    });
    it("should return true if it recieves a ')'", function(){
      assert.isTrue(lexer.isAggregate(')'));
    });
    it("should return true if it recieves a '['", function(){
      assert.isTrue(lexer.isAggregate('['));
    });
    it("should return true if it recieves a ']'", function(){
      assert.isTrue(lexer.isAggregate(']'));
    });
    it("should return true if it recieves a '{'", function(){
      assert.isTrue(lexer.isAggregate('{'));
    });
    it("should return true if it recieves a '}'", function(){
      assert.isTrue(lexer.isAggregate('}'));
    });
    it("should return false if anything else is provided", function(){
      assert.isFalse(lexer.isAggregate('abc'));
    });
  });
  describe('#isAssign(string)', function(){
    it("should tell if the string is equal to '=' in case it is", function(){
      assert.isTrue(lexer.isAssign('='));
    });
    it("should tell if the string is equal to '=' in case it is not", function(){
      assert.isFalse(lexer.isAssign('P'));
    });
  });
  describe('#isPipe(string)', function(){
    it("should tell if the string is equal to '|' in case it is", function(){
      assert.isTrue(lexer.isPipe('|'));
    });
    it("should tell if the string is equal to '|' in case it is not", function(){
      assert.isFalse(lexer.isPipe('P'));
    });
  });
  describe('#isDot(string)', function(){
    it("should tell if the string is equal to '.' in case it is", function(){
      assert.isTrue(lexer.isDot('.'));
    });
    it("should tell if the string is equal to '.' in case it is not", function(){
      assert.isFalse(lexer.isDot('P'));
    });
  });
  describe('#isNotWhite(string)', function(){
    it("should return true if the character provided is not a white symbol", function(){
      assert.isTrue(lexer.isNotWhite('P'));
    });
    it("should return false if the character provided is a white symbol", function(){
      assert.isFalse(lexer.isNotWhite(' '));
    });
  });
  describe('#token(type, value)', function(){
    it("should create an object with type and value keys", function(){
      var token = lexer.token('a', 'b');
      assert.isTrue(token.type=='a'&&token.value=='b');
    });
  });
  describe('#nonTerminal(value)', function(){
    it("should create an object with nonTerminal type and a given value", function(){
      var token = lexer.nonTerminal('a');
      assert.isTrue(token.type=='nonTerminal'&&token.value=='a');
    });
  });
  describe('#terminal(value)', function(){
    it("should create an object with terminal type and a given value", function(){
      var token = lexer.terminal('a');
      assert.isTrue(token.type=='terminal'&&token.value=='a');
    });
  });
  describe('#assign()', function(){
    it("should create an object with assign type and assign value", function(){
      var token = lexer.assign();
      assert.isTrue(token.type=='assign'&&token.value=='=');
    });
  });
  describe('#pipe()', function(){
    it("should create an object with pipe type and pipe value", function(){
      var token = lexer.pipe();
      assert.isTrue(token.type=='pipe'&&token.value=='|');
    });
  });
  describe('#dot()', function(){
    it("should create an object with dot type and dot value", function(){
      var token = lexer.dot();
      assert.isTrue(token.type=='dot'&&token.value=='.');
    });
  });
  describe('#aggregate(value)', function(){
    it("should create an object with aggregate type and a given value", function(){
      var token = lexer.aggregate('(');
      assert.isTrue(token.type=='aggregate'&&token.value=='(');
    });
  });
  describe('#nextState(character)', function(){
    it("should return nonTerminal function if an upper case letter is given", function(){
      assert.isTrue(lexer.nextState('A')==lexer.nonTerminal);
    });
    it("should return terminal function if an lower case letter is given", function(){
      assert.isTrue(lexer.nextState('a')==lexer.terminal);
    });
    it("should return pipe function if a pipe character is given", function(){
      assert.isTrue(lexer.nextState('|')==lexer.pipe);
    });
    it("should return aggregate function if an aggregate character is given", function(){
      assert.isTrue(lexer.nextState('(')==lexer.aggregate);
    });
  });
  describe('#pushToken()', function(){
    it("should load a token to the token list with the current word", function(){
      var lexer = new Lexer();
      lexer.word = 'ABC';
      lexer.pushToken();
      assert.isTrue(lexer.tokens[0].value == 'ABC');
    });
  });
  describe('#generateToken(character)', function(){
    var lexer = new Lexer();
    it("should form a word with a sequence of upper case letters", function(){
      lexer.generateToken('A');
      lexer.generateToken('B');
      lexer.generateToken('C');
      assert.isTrue(lexer.word=='ABC');
    });
    it("should create a new nonTerminal token if a lower case character sequence is provided", function(){
      lexer.generateToken('a');
      lexer.generateToken('b');
      lexer.generateToken('c');
      assert.isTrue(lexer.word=='abc' && lexer.tokens[0].type=='nonTerminal');
    });
    it("should create a new terminal token and a pipe character", function(){
      lexer.generateToken('|');
      assert.isTrue(lexer.word=='|' && lexer.tokens[1].type=='terminal');
    });
    it("should create a new pipe token and a '(' character", function(){
      lexer.generateToken('(');
      assert.isTrue(lexer.word=='(' && lexer.tokens[2].type=='pipe');
    });
  });
  describe('#parse(string)', function(){
    it("should parse a string in wirth notation", function(){
      var tokens = lexer.tokenize('X=(a|b).');
      assert.isTrue(tokens[0].type=='nonTerminal' &&
                    tokens[1].type=='assign'      &&
                    tokens[2].type=='aggregate'   &&
                    tokens[3].type=='terminal'    &&
                    tokens[4].type=='pipe'        &&
                    tokens[5].type=='terminal'    &&
                    tokens[6].type=='aggregate'   &&
                    tokens[7].type=='dot');
    });
    it("should parse a string in a slightly more complex wirth notation", function(){
      var tokens = lexer.tokenize('X=(aa|b).');
      assert.isTrue(tokens[0].type=='nonTerminal' &&
                    tokens[1].type=='assign'      &&
                    tokens[2].type=='aggregate'   &&
                    tokens[3].type=='terminal'    &&
                    tokens[4].type=='pipe'        &&
                    tokens[5].type=='terminal'    &&
                    tokens[6].type=='aggregate'   &&
                    tokens[7].type=='dot');
    });
    it("should parse a string in wirth notation and ignore whites", function(){
      var tokens = lexer.tokenize('X=(a|   b).');
      assert.isTrue(tokens[0].type=='nonTerminal' &&
                    tokens[1].type=='assign'      &&
                    tokens[2].type=='aggregate'   &&
                    tokens[3].type=='terminal'    &&
                    tokens[4].type=='pipe'        &&
                    tokens[5].type=='terminal'    &&
                    tokens[6].type=='aggregate'   &&
                    tokens[7].type=='dot');
    });
  });
});
