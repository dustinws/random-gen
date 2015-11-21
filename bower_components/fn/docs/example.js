var fn = require('fn-util');
// You can use fn the functional way, or by chaining.
// To use a method on it's own, call it from the fn object
var nest = [1, [2, [[4, 4, 5, [5]], [7, 4]], [[[4, 5, [5,67]]]]]];
fn.collapse(nest);
//=> [1, 2, 4, 4, 5, 7, 4, 5, 4, 5, 5, 67]

var nums = [1,2,3,4,5];
// this returns a new function that accepts your list
fn.map(x => x * 100);
// You can call it direcly with fn.map(x => x * 100)(array)
// Or assign it to a variable
var times100 = fn.map(x => x * 100);
times100(nums);
//=> [100, 200, 300, 400, 500]

// Or to chain, pass the array to fn instead
fn(nums).map(x => x * 100).get();
//=> [100, 200, 300, 400, 500]
// When chaining, you must call get() at the end. This is
// because fn returns itself for further chaining.
