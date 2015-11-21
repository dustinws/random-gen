;(function() {
  // Reference to the global object
  var root = this;
  var fn;

  var random = {};

  var nums = '1234567890';
  var lowerC = 'abcdefghijklmnopqrstuvwxyz';
  var upperC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var syms = '$!';

  // Provides a random int between 0 and n
  // Expects to be provided the `length` of whatever
  // charset is used to get a full spectrum of indices
  function possibleIndex(n) {
    return Math.floor(Math.random() * n);
  }

  // Creates a new array of length `n` and adds a random digit to the result
  // string for each iteration. Uses `possibleIndex` to get a random index
  random.number = function number(n) {
    n || (n = 8);
    // Base result set
    var res = '';
    var numsArr = nums.split('');
    fn.each(function() {
      res = res + numsArr[possibleIndex(numsArr.length)];
    })(Array(n));
    return res;
  };

  random.lower = function lower(n) {
    n || (n = 8);
    // Base result set
    var res = '';
    var lowArr = lowerC.split('');
    fn.each(function() {
      res = res + lowArr[possibleIndex(lowArr.length)];
    })(Array(n));
    return res;
  }

  random.upper = function upper(n) {
    n || (n = 8);
    // Base result set
    var res = '';
    var upArr = upperC.split('');
    fn.each(function() {
      res = res + upArr[possibleIndex(upArr.length)];
    })(Array(n));
    return res;
  }

  random.letters = function letters(n) {
    n || (n = 8);
    // Base result set
    var res = '';
    var lowArr = upperC.split('').concat(lowerC.split(''));
    fn.each(function() {
      res = res + lowArr[possibleIndex(lowArr.length)];
    })(Array(n));
    return res;
  }

  random.any = function any(n) {
    n || (n = 8);
    // Base result set
    var res = '';
    var lowArr = lowerC
      .split('')
      .concat(upperC
        .split('').concat(
          nums.split('')
            .concat(syms.split('')
          )));


    fn.each(function() {
      res = res + lowArr[possibleIndex(lowArr.length)];
    })(Array(n));
    return res;
  }


  random.alphaNum = function alphaNum(n) {
    n || (n = 8);
    // Base result set
    var res = '';
    var lowArr = lowerC
      .split('')
      .concat(upperC.split('')
      .concat(nums.split('')
    ));

    fn.each(function() {
      res = res + lowArr[possibleIndex(lowArr.length)];
    })(Array(n));
    return res;
  }

  // Exports
  if (typeof module !== 'undefined' && module.exports) {
    fn = require('fn-util');
    module.exports = random;
  } else if (typeof window !== 'undefined') {
    fn = root.fn;
    root.random = random;
  } else {
    return random;
  }

}).call(this);
