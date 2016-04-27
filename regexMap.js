'use strict';

class RegexMap {

  constructor(keyValueTuples){
    this.map = {};
    this.regexKeys = [];
    if(keyValueTuples)
      keyValueTuples.forEach((tuple) => {
        this.add(tuple[0], tuple[1]);
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
