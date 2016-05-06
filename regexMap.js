'use strict';

class RegexMap {

  constructor(){
    this.map = {};
    this.regexKeys = [];
    Array.from(arguments).forEach((argument) => {
      this.add(argument[0], argument[1]);
    });
  }

  add(key, value){
    if(key instanceof RegExp)
      this.regexKeys.push(key);
    this.map[key] = value;
  }
  
  get(key){
    var result = undefined;
    this.regexKeys.forEach((k) => {
      if(k.test(key))
        result = this.map[k]; 
    });
    if(!result)
      result = this.map[key];
    return result;
  }

}

module.exports = RegexMap;
