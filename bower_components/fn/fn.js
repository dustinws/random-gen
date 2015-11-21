;(function (root) {

  // Shortcuts to handy methods
  var keys = Object.keys,
      freeze = Object.freeze,
      isArray = Array.isArray,
      slice = Array.prototype.slice;

  function _isEmpty(x) {
    return isArray(x) && x.length === 0;
  }

  // Copies each key / value pair from the src object to the dest object
  // Overwrites any previous values that belonged to dest, but doesn't
  // touch props that it doesn't have itself
  // *NOTE* Mutates the dest object, there is no return value.
  function _extend(dest, src) {
    _each(function (key) {
      return dest[key] = src[key];
    })(keys(src));
  }

  // Returns a bound function that can take any number of arguments
  function _bind(context) {
    return function (func) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return func.apply(context, args);
    };
  }

  function _curry(fx) {
    var arity = fx.length;

    return function f1() {
      var args = slice.call(arguments, 0);
      if (args.length >= arity) return fx.apply(null, args);

      return function f2() {
        var args2 = slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2));
      };
    };
  }

  function _matches(a) {
    return function (b) {
      var matches = true;
      _each(function (key, i, keys) {
        if (a[key] !== b[key]) matches = false;
      })(Object.keys(a));
      return matches;
    };
  }

  // Recursive each 'forEach'
  // Serves as the base for almost all list methods
  // Uses currying to accept the array after the initial
  // iteratee function 'func' for reusability.
  // Keeps track of the index internally to avoid tampering
  function _each(func) {
    var i = 0;
    return function _each(arr) {
      if (i === arr.length) return; // Base case
      func(arr[i], i, arr);
      i = i + 1;
      return _each(arr);
    };
  }

  // Accepts a function that returns true / false on a condition
  // Returns a function that accepts the list to filter through
  // Final return is a list of elements that passed TRUE on the condition
  // Opposite of reject
  function _filter(func) {
    return function (array) {
      var results = [];
      _each(function (el, i, l) {
        if (func(el, i, l)) results.push(el);
      })(array);
      return results;
    };
  }

  // Accepts a function that returns true / false on a condition
  // Returns a function that accepts the list to filter through
  // Final return is a list of elements that passed False on the condition
  // Opposite of filter
  function _reject(func) {
    return function (array) {
      var results = [];
      _each(function (el, i, l) {
        if (!func(el, i, l)) results.push(el);
      })(array);
      return results;
    };
  }

  // Where
  function _where(obj) {
    return function (list) {
      return _filter(function (el) {
        return _matches(obj)(el);
      })(list);
    };
  }

  // Accepts a function that reutrns a new value for that element
  // Returns a function that accepts the list for the map to process
  // Final return is a new list with the mapping applied
  function _map(func) {
    return function (array) {
      var results = [];
      _each(function (el, i, l) {
        return results.push(func(el, i, l));
      })(array);
      return results;
    };
  }

  // Reduce
  function _reduce(func) {
    return function (array, base) {
      var arr = [].concat(array);
      base || (base = arr.shift());
      _each(function (el, i) {
        return base = func(base, el, i);
      })(arr);
      return base;
    };
  }

  // Collapse / Flatten an array, no matter how many nested arrays
  // If an element is an array, it will add all of it's elements
  // to the resulting array, remove the element, and then call
  // itself recursively. This allows extremely deep nested arrays
  // to be broken down little by litte, until no elements in the
  // resulting array are themselves, arrays. This *WILL NOT* work
  // for arrays inside of objects, unless collapse is called on
  // that array direcly. This method ONLY accounts for real arrays
  // and does not interfere with anything else.
  function _collapse(array) {
    _each(function (el, i, list) {
      if (isArray(el)) {
        array.splice(i, 1);
        _each(function (x) {
          return array.push(x);
        })(el);
        return _collapse(array);
      }
    })(array);
    return array;
  }

  // The fn base class
  // Called whenever an array is passed to fn directly, this
  // lets users use the chaining api, which chains the functional
  // api together enforcing a 'get()' call at the end to declare
  // the end of the operation
  function fn(array) {
    var self = this;
    if (!(self instanceof fn)) return new fn(array);
    self.array = array;
    return self;
  }

  // The fn.prototype is really just making calls to the functional
  // api. The only difference is that each fn instance maintains it's
  // own 'array' variable. This is mutated pretty much everywhere,
  // but for those who don't like that, the standalone api is always
  // available on it's own
  _extend(fn.prototype, {
    each: function each(func) {
      var self = this;
      return _each(func)(self.array);
    },
    filter: function filter(func) {
      var self = this;
      self.array = _filter(func)(self.array);
      return self;
    },
    reject: function reject(func) {
      var self = this;
      self.array = _reject(func)(self.array);
      return self;
    },
    where: function where(obj) {
      var self = this;
      self.array = _where(obj)(self.array);
      return self;
    },
    map: function map(func) {
      var self = this;
      self.array = _map(func)(self.array);
      return self;
    },
    reduce: function reduce(func, base) {
      var self = this;
      return _reduce(func)(self.array, base);
    },
    collapse: function collapse() {
      var self = this;
      self.array = _collapse(self.array);
      return self;
    },
    get: function get() {
      var self = this;
      return self.array;
    }
  });

  // Attach the standalone api to the fn object
  // This lets users use the api in a pure way and be able
  // to compose their own functions, since the majority of
  // these are curried
  _extend(fn, {
    // Lists
    each: _each,
    forEach: _each,
    filter: _filter,
    reject: _reject,
    where: _where,
    map: _map,
    reduce: _reduce,
    collapse: _collapse,
    flatten: _collapse,
    isArray: isArray,
    isEmpty: _isEmpty,
    // Functions
    curry: _curry,
    bind: _bind,
    // Objects
    keys: keys,
    freeze: freeze,
    extend: _extend
  });

  // Export FN
  if (typeof module !== 'undefined' && module.exports) {
    // Node
    module.exports = fn;
  } else if (typeof window !== 'undefined' && window.document) {
    // Browser
    root.fn = fn;
  }
})(typeof window !== 'undefined' ? window : this);
