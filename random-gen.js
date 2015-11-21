;(function() {
  // Reference to the global object
  var root = this;
  var fn;
  // All of our character sets to work with. mmmmm..

  // Numerics
  var nums = [
    '1', '2', '3', '4',
    '5', '6', '7', '8',
    '9', '0'
  ];
  // Lower Case Letters
  var lowerC = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];
  // Upper Case Letters
  var upperC = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  // Symbols
  var syms = [
    '!', '$'
  ];

  // Provides a random int between 0 and n
  // Expects to be provided the `length` of whatever
  // charset is used to get a full spectrum of indices
  function possibleIndex(n) {
    return Math.floor(Math.random() * n);
  }

  // The main `Engine`.
  // Accepts an array of characters `chars` and returns a random string
  // of `n` length using only those characters
  function randomGen(n, chars) {
    n || (n = 8);
    // Base result set
    var res = '';
    fn.each(function() {
      res = res + chars[possibleIndex(chars.length)];
    })(Array(n));
    return res;
  }

  // Main random-gen object
  random = {
    number: function(n) {
      return randomGen(n, nums);
    },
    lower: function(n) {
      return randomGen(n, lowerC);
    },
    upper: function(n) {
      return randomGen(n, upperC);
    },
    letters: function(n) {
      var arr = upperC
        .concat(lowerC);

      return randomGen(n, arr);
    },
    alphaNum: function(n) {
      var arr = lowerC
        .concat(upperC)
        .concat(nums);

      return randomGen(n, arr);
    },
    any: function(n) {
      var arr = lowerC
        .concat(upperC)
        .concat(nums)
        .concat(syms);

      return randomGen(n, arr);
    }
  };


  // Exports
  //--------

  if (typeof module !== 'undefined' && module.exports) {
    // node
    fn = require('fn-util');
    module.exports = random;
  } else if (typeof window !== 'undefined') {
    // browser
    fn = root.fn;
    root.random = random;
  } else {
    return random;
  }
}).call(this);
