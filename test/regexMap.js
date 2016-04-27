'use strict';

var RegexMap = require('../regexMap');
var assert = require('chai').assert;


describe('RegexMap', function() {
  describe('#constructor(keyValueTuples)', function () {
    it("should build a new RegexMap", function () {
      var map = new RegexMap([[new RegExp('t'), 'q'], [1,2]]);
      assert(map.get('t')=='q' && map.get(1)==2);
    });
  });
  describe('#add(key, value)', function () {
    var map = new RegexMap();
    it("should add a pair to the Map", function () {
      map.add('a','b');
      assert(map.get('a')=='b');
    });
    it("should add a regex-value pair to the Map", function () {
      map.add(new RegExp('x|y|z'),'c');
      assert(map.get('x')=='c');
    });
  });
});

