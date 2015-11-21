# fn.js

### javascript utility library      

*Another utility library?*

`fn` is a micro library, and is significantly smaller than most other libraries that offer a similar API. However, `fn` aims to be a toolbelt for functional programming in javascript as well as standard data manipulation.         

`fn` uses recursion instead of looping, implemented in the majority of the methods through the use of the `fn.each()` method, which serves as a base for many other functions.

---
`fn` has two faces, this first is a chaining api that allows for complex chains
of operations. A simple example would be something like This

```JavaScript
var nums = [1,2,3,4,5,6,7,8,9,10];

fn(nums)
  .map(x => x * 100)
  .filter(x => x > 400)
  .reduce((a, b) => a + b);

//=> 4500
```

Or you could you could use it in a 'functional' way, without any mutation.
Technically the first approach only mutates it's internal reference to the provided array, and never actually touches the array itself, but under the hood it's really just hooking in to this next approach.

```JavaScript
var nums = [1,2,3,4,5,6,7,8,9,10];

fn.reduce((a, b) => a + b)
  (fn.filter(x => x > 400)
    (fn.map(x => x * 100)
      (nums)))

//=> 4500
```
This works because each of these functions are curried, and only request the callback function up front. After that, you can apply whatever list you like, so this chain could be endless, as long as there is a list at the end to feed everything. Notice how with the second approach, we approach our problem from the outside in, opposite of the first. This looks much nicer with named functions for the handlers.      

#### *To Install*
```Shell
$ bower install fn
// or
$ node i -S fn-util
```       
`fn` is isomorphic, you can pull the source file from bower or npm and it doesn't care if you're on the client or the server.     

Currently only browsers and commonJs are supported, AMD coming soon.

---
### API
---
#### Public Methods     
*Lists*       
`fn.each(callback)(list) / fn.forEach(callback)(list)`     
`fn.filter(callback)(list)`             
`fn.reject(callback)(list)`      
`fn.where(object)(list)`      
`fn.map(callback)(list)`      
`fn.reduce(callback)(list, base)`     
`fn.collapse(list) / fn.flatten(list)`     
`fn.isArray(array)`      
`fn.isEmpty(array)`          

*Objects*       
`fn.extend(dest, src)`       
`fn.keys(object)`       
`fn.freeze(object)`

*Functions*     
`fn.curry(function)`       
`fn.bind(context)(function)`       

---

#### Chainable Methods
* \* Indicates the need to call `.get()`, if the particular method is the last in the chain      

`fn(array)`      
* `.each(function)`      
* `.reduce(function)`
* `*.collapse(object)`      
* `*.filter(function)`      
* `*.reject(function)`       
* `*.where(object)`      

---
#### Docs

`Each`


Executes `function` for each element in `list`.     
function is passed       
`function(element, index, list)`

```JavaScript
var nums = [1,2,3];

// Chain
fn(nums).each(num => console.log(num));
//=>
  1
  2
  3

// Pure
fn.each(num => console.log(num))(nums);
//=>
  1
  2
  3
```
---
`Get`      
*Only applies if you are using the chaining API*

Returns the array in it's current condition.      
If the final method call in the chain does not return a single result like `every, reduce, etc..`, then you *must* call `get()` to return the array
```JavaScript
var nums = [1,2,3];

fn(nums).filter(num => num > 1);
//=> the fn() object for chaining

fn(nums).filter(num => num > 1).get();
//=> [2,3]
```
---

`Filter`   

Returns a new array that only contains elements that 'function' returned true for       
Opposite of `Reject`
```JavaScript
var nums = [1,2,3];

// Chain
fn(nums).filter(num => num > 1).get();
//=> [2,3]

// Pure
fn.filter(num => num > 1)(nums);
//=> [2,3]
```

---

`Reject`   

Returns a new array that only contains elements that `function` returned false for      
Opposite of `Filter`
```JavaScript
var nums = [1,2,3];

// Chain
fn(nums).reject(num => num > 1).get();
//=> [1]

// Pure
fn.reject(num => num > 1)(nums);
//=> [1]
```
---

`Where`   

Returns a new array that only contains elements that match all ob `object`'s key / value pairs     
Common use case of `Filter`
```JavaScript
var peeps = [
  {name: 'Tom', status: 'friends'},
  {name: 'Jim', status: 'friends'},
  {name: 'Betty', status: 'pending'}
];

// Chain
fn(peeps).where({ status: 'pending' }).get();
//=> [{name: 'Tom', status: 'pending'}, {name: 'Jim', status: 'pending'}]

// Pure
fn.where({ status: 'pending' })(peeps);
//=> [{name: 'Tom', status: 'pending'}, {name: 'Jim', status: 'pending'}]
```
---

`Map`   

Returns a new array that contains the results of `function` for each element in `list`
```JavaScript
var nums = [1,2,3,4,5];

// Chain
fn(nums).map(x => x * 100).get();
//=> [100, 200, 300, 400, 500]

// Pure
fn.map(x => x * 100)(nums);
//=> [100, 200, 300, 400, 500]
```
---

`Reduce`   

Returns a single result from an entire array
```JavaScript
var nums = [1,2,3,4,5];

// Chain
fn(nums).reduce((a, b) => a + b);
//=> 15

// Pure
fn.reduce((a, b) => a + b)(nums);
//=> 15
```
---

`Collapse / Flatten`   

Flattens all nested arrays into a single result containing no child arrays. Uses recursion to only go 1 level deep, before starting over again. This means that your nests could be endlessly deep. `Collapse` doesn't care, because it treats every array as if it only has one child array to collapse, and simply keeps calling itself until none are left. This allows for *Incredibly* deep nesting.        
#### *NOTE*     
This will not work on arrays nested in objects, `Collapse` ONLY cares about real arrays that are directly accessible to it.
```JavaScript
var nest = [1, [2, [[4, 4, 5, [5]], [7, 4]], [[[4, 5, [5,67]]]]]];

// Chain
fn(nest).collapse().get();
//=> [1, 2, 4, 4, 5, 7, 4, 5, 4, 5, 5, 67]    

// Pure
fn.collapse(nest);
//=> [1, 2, 4, 4, 5, 7, 4, 5, 4, 5, 5, 67]
```
---

`isArray`   

Shortcut to `Array.isArray`
```JavaScript
fn.isArray({});
//=> false

fn.isArray([]);
//=> true
```
---

`isEmpty`   

Returns true if the passed in value is both an array and has a length of 0.
```JavaScript
var nest = [1, [2, [[4, 4, 5, [5]], [7, 4]], [[[4, 5, [5,67]]]]]];

fn.isEmpty(nest);
//=> false

fn.isEmpty([]);
//=> true
```
---

`Extend`   

Copies all key / value pairs from the `src` and adds them to the `dest`.       
#### *Note*       
This mututates the `dest`, nothing is returned.
```JavaScript
var message = {
  body: 'Hello world!'
};

fn.extend(message, {
  sayHi() {
    return this.body;
  }
});

message.sayHi();
//=> 'Hello World!'
```
---

`Bind`   

Returns a bound function that can accept any amount of arguments
```JavaScript
var func = function() {
  return this.name;
}

var foo = { name: 'bar' };

var bound = fn.bind(foo)(func);
bound();
//=> 'bar'
```
---

`Curry`   

Keeps returning a new function until the arity has been satisfied. Arguments can be passed in any amount at a time.
```JavaScript
var func = function(a, b, c) {
  return a + b + c;
}

var sum = fn.curry(func);

sum(1,2,3);
//=> 6

sum(1,2)(3);
//=> 6

sum(1)(2,3);
//=> 6

sum(1)(2)(3);
//=> 6
```
---

`Keys`   

Shortcut to `Object.keys`
```JavaScript
var foo = { name: 'baz', bar: 'bing' };

fn.keys(foo);
//=> ['name', 'bar']
```
---

`Freeze`   

Shortcut to `Object.freeze`      
Renders an object `immutable` for most intents and purposes
```JavaScript
var foo = { name: 'baz', bar: 'bing' };

fn.freeze(foo);
foo.name = 'notHappening';
console.log(foo);
//=> { name: 'baz', bar: 'bing' }
```
