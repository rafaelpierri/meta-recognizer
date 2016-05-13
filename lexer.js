'use strict';

class Lexer {

  constructor(){
    this.word = "";
    this.state = this.nonTerminal; 
    this.tokens = [];
  }

  tokenize(string){
    for(var i = 0; i < string.length; i++){
      var character = string.charAt(i);
      if(this.isNotWhite(character))
        this.generateToken(character);       
    } 
    this.pushToken();
    return this.tokens;
  }

  generateToken(character){
    var nextState = this.nextState(character);
    if(this.state==nextState){
      this.word += character;
    }else{
      this.pushToken();
      this.state = nextState;
      this.word = character;
    }
  }

  pushToken(){
    var token = this.state.bind(this);
    this.tokens.push(token(this.word));  
  }
  
  nextState(character){
    if(this.isAssign(character))
      return this.assign;
    if(this.isPipe(character))
      return this.pipe;
    if(this.isDot(character))
      return this.dot;
    if(this.isAggregate(character))
      return this.aggregate;
    if(this.isUpperCase(character))
      return this.nonTerminal;
    if(this.isLowerCase(character))
      return this.terminal;
    return undefined;
  }

  //recognizers

  isUpperCase(string){ return string == string.toUpperCase(); }

  isLowerCase(string){ return string == string.toLowerCase(); }

  isAggregate(string){ return /\(|\)|\[|\]|\{|\}/g.test(string); }

  isAssign(string){ return string == '='; }

  isPipe(string){ return string == '|'; }
  
  isDot(string){ return string == '.'; }

  isNotWhite(string){ return ! /\s/g.test(string); }

  //token template

  token(type, value){ return {type: type, value: value}; }

  //states
  
  nonTerminal(value){ return this.token('nonTerminal', value); }

  terminal(value){ return this.token('terminal', value); }

  assign(){ return this.token('assign', '='); }
  
  pipe(){ return this.token('pipe', '|'); }
  
  dot(){ return this.token('dot', '.'); }
    
  aggregate(value){ return this.token('aggregate', value); }
  
}

module.exports = Lexer;
