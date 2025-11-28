# Node.js: The Comprehensive Guide 
<img src="NodejsBook.avif"/> 


## regular expression in js

### match for single word

```js
let regExpr = /Test/i;
let str = "this is some test for the reg expr";
console.log(regExpr.test(str));// true      
```
###  the /i in the end makes the search case insensitive

### match for multiple words    
```js
let regExpr = /Test|reg|expr/i;
let str = " this is some test for the reg expr";
console.log(regExpr.test(str));  // true
```


### match for any character using dot(.)
### dot just tell the regex that there is unknow char in this place and we do not care
```js
let regExpr = /te./i;
let str = " this is some test for the reg expr";
console.log(regExpr.test(str));  // true // because the test match the te. we do not care if ther eis another char after the te. or not if you want to add the boundary you can use \b


let regExpr = /\bte.\b/i;
let str = " this is some test for the reg expr";
console.log(regExpr.test(str));  // false  //  now the word test should be exactly 3 char long starting with te and ending with any char
``` 

### match with the []
```js
let regExpr = /t[ih]s/i; // match any vowel
let str = " this is some test for the reg expr";
console.log(regExpr.test(str));  // true  // it will match this  

let regExpr = /t[a-z]s/i; // match any char between a to z  
let str = " this is some tes for the reg expr";
console.log(regExpr.test(str));  // true  // it will match tes  


let regExpr = /\bte..\b/ig; // when you add g in the end of the expression
// it will return all the matches in an array




// Finds the first character that IS NOT a digit (0-9)
let containsNonDigit = /[^0-9]/.test("123a456"); 
console.log(containsNonDigit); // true (because of the 'a')

//  Outside of Brackets: String Anchor (Start of String)
// When the ^ is placed at the very beginning of the regular expression pattern 

// Regex	Matches  	Does NOT Match
// ^cat	    "cat"   	 "The cat is brown"
// ^The 	"The dog..." "Where is The dog?


let regExpr = /\b^te..\b/ig; 
let str = " this is some tes for the reg expr"; 
console.log(regExpr.test(str));  // false  // it will not match because the word tes is preceded by space


let regExpr = /\b^th..\b/ig; 
let str = "this is some tes for the reg expr"; 
console.log(regExpr.test(str));  // true  


```
### the * wild card 

```js




```





