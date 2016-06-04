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
    this.automaton.addRule(this.automatonState, token, this.automatonNextState);
    this.automatonState = this.automatonNextState;
    this.automatonNextState++;
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

  /*buildAutomaton(string){
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
  }*/

}

module.exports = Generator;
