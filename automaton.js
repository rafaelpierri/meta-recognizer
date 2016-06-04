'use strict';

class Automaton {

  constructor(initialState, finalStates, rules){
    this.currentState = initialState;
    this.finalStates = new Set(finalStates);
    this.rules = rules || {};
  }

  accept(string){
    var tokens = string.split('');
    try {
      this.consume(tokens);
    }catch(e){
      return false;
    }
    return this.finalStates.has(this.currentState);
  }

  consume(tokens){
    for(var i = 0; i < tokens.length; i++){
      var rule = this.rules[this.currentState];
      if(rule){
        if(!rule[tokens[i]]){
          var nextState = rule['Ø'];  
          i--;
        }else{
          var nextState = rule[tokens[i]];
        }
        if(nextState){
          this.currentState = nextState;
        }else{
          throw new Error('Automaton rejected: no next state for given token');
        }
      }else{
        throw new Error('Automaton rejected: no rule for current state');
      }
    }
    this.makeLastEpsilonTransitions();
  }

  nextEpsilonTransition(){
    return this.rules[this.currentState] && this.rules[this.currentState]['Ø'];
  }

  makeEpsilonTransition(){
    this.currentState = this.rules[this.currentState]['Ø'];
  }

  makeLastEpsilonTransitions(){
    while(this.nextEpsilonTransition()){ this.makeEpsilonTransition(); }
  }

  addRule(currentState, token, nextState){
    var rule = {} 
    rule[token] = nextState;
    this.rules[currentState] = rule; 
  }

}

module.exports = Automaton;
