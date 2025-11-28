// let haveTest = /Test/i;
// let str = "this is some test for the reg expr";
//
// console.log(haveTest.test(str));

// console.log(str.match(haveTest));

let regExpr = /^t.* /i;
let str = "this is some tes for the reg expr";
console.log(regExpr.test(str));  // true   // the regexpr mean start with t end with s and in the middle zero or more of any char



