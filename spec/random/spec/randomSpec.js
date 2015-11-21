var random = require('../../../random-gen');
var data = require('../src/data');
// Regular Expressions
var numRE = /^[0-9]*$/;
var lowerRE = /^[a-z]*$/;
var upperRE = /^[A-Z]*$/;
var lettersRE = /^[a-zA-Z]*$/;
var alphaNumRE = /^[a-zA-Z0-9]*$/;
var anyRE = /^[a-zA-Z0-9\$\!]*$/;

describe('random-gen.js', function () {
  // random.number()
  it('Should produce a random integer that doesnt include any other chars', function () {
     var test1 = random.number();
     expect(test1.length).toBe(8);
     expect(numRE.test(test1)).toBe(true);
     expect(data.lower).not.toContain(test1.split(''));
     expect(data.upper).not.toContain(test1.split(''));
     expect(data.syms).not.toContain(test1.split(''));
  });

  // random.lower()
  it('Should produce a random lowercase string that doesnt include any other chars', function () {
     var test1 = random.lower();
     expect(test1.length).toBe(8);
     expect(lowerRE.test(test1)).toBe(true);
     expect(data.nums).not.toContain(test1.split(''));
     expect(data.upper).not.toContain(test1.split(''));
     expect(data.syms).not.toContain(test1.split(''));
  });

  // random.upper()
  it('Should produce a random upperCase string that doesnt include any other chars', function () {
     var test1 = random.upper();
     expect(test1.length).toBe(8);
     expect(upperRE.test(test1)).toBe(true);
     expect(data.nums).not.toContain(test1.split(''));
     expect(data.lower).not.toContain(test1.split(''));
     expect(data.syms).not.toContain(test1.split(''));
  });

  // random.letters()
  it('Should produce a random upper / lower case string that doesnt include any other chars', function () {
     var test1 = random.letters();
     expect(test1.length).toBe(8);
     expect(lettersRE.test(test1)).toBe(true);
     expect(data.nums).not.toContain(test1.split(''));
     expect(data.syms).not.toContain(test1.split(''));
  });

  // random.alphaNum()
  it('Should produce a random alpha-numeric string that doesnt include symbols', function () {
     var test1 = random.alphaNum();
     expect(test1.length).toBe(8);
     expect(alphaNumRE.test(test1)).toBe(true);
     expect(data.syms).not.toContain(test1.split(''));
  });

  // random.any()
  it('Should produce a random alpha-numeric string includes symbols', function () {
     var test1 = random.any();
     expect(test1.length).toBe(8);
     expect(anyRE.test(test1)).toBe(true);
  });
});
