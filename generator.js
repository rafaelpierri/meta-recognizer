'use strict';

var RegexMap = require('./regexMap');
var Automaton = require('./automaton');

class Generator {

  constructor(automatonState, automatonNextState){
    this.stack = [];
    this.generatorState = 1;
    this.automatonState = automatonState || 0;
    this.automatonNextState = automatonNextState || 1;
    this.automaton = new Automaton(this.automatonState, [this.automatonNextState]);
  }

  newTerminal(token){
    var characters = token.split('');
    characters.forEach((character) => {
      this.automaton.addRule(this.automatonState, character, this.automatonNextState);
      this.automatonState = this.automatonNextState;
      this.automatonNextState++;
    });
  }
  
  newDefinition(token){
    this.stack.push({left: this.automatonState, right: this.automatonNextState});
    this.automatonNextState++;
  }

  newOptionalSection(token){
    this.automaton.addRule(this.automatonState, 'Ø', this.automatonNextState);
    this.stack.push({left: this.automatonState, right: this.automatonNextState});
    this.automatonNextState++;
  }

  newZeroOrMoreSection(token){
    this.automaton.addRule(this.automatonState, 'Ø', this.automatonNextState);
    this.automatonState = this.automatonNextState;
    this.stack.push({left: this.automatonState, right: this.automatonNextState});
    this.automatonNextState++;
  }
  
  definitionEnd(token){
    var tuple = this.stack.pop();
    this.automaton.addRule(this.automatonState, 'Ø', tuple.right);
    this.automatonState = tuple.right;
  }

  optionEnd(token){
    var tuple = this.stack[this.stack.length - 1]
    this.automaton.addRule(this.automatonState, 'Ø', tuple.right);
    this.automatonState = tuple.left;
  }

  nonTerminalEnd(token){
    var tuple = this.stack.pop();
    this.automaton.addRule(this.automatonState, 'Ø', tuple.right);
    this.automatonState = tuple.right;
  }

}

module.exports = Generator;
