# random-gen

Easily create random strings of any length.

---

#### *API*      
`random.number(n)`        
`random.lower(n)`        
`random.upper(n)`        
`random.letters(n)`        
`random.alphaNum(n)`        
`random.any(n)`        

`n` represents the desired length of the string, but `random` will use 8 by default if you choose not to pass anything.         



#### *DOCS*       
---
`random.number(n)`      

Returns an integer of `n` length
```JavaScript
random.number(16)
//=> "7753750611098561"
```
---
`random.lower(n)`      

Returns a lowercase string of `n` length
```JavaScript
random.lower(16)
//=> "mcgjmlihofwxjfsx"
```
---
`random.upper(n)`      

Returns an uppercase string of `n` length
```JavaScript
random.upper(16)
//=> "TKTTVSDZYEGBVMMV"
```
---
`random.letters(n)`      

Returns an upper / lower case string of `n` length
```JavaScript
random.letters(16)
//=> "ahWfDPoyOrVSaKYg"
```
---
`random.alphaNum(n)`      

Returns an alpha-numeric string of `n` length
```JavaScript
random.alphaNum(16)
//=> "lEJYcbYznCU5ORdj"
```
---
`random.any(n)`      

Same as `random.alphaNum` with the addition of the `$ and !` characters
```JavaScript
random.any(16)
//=> "f$KgcADOIrEyxE!o"
```
