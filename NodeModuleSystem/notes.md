### start with ch4 because ch3 is just not imprtaont for me at this point


## the curNode core modules

<img  src="curNode_core_modules_imgs/node_core_modules1.png"/>
<img  src="curNode_core_modules_imgs/node_core_modules2.png"/>
<img  src="curNode_core_modules_imgs/node_core_modules3.png"/>
<img  src="curNode_core_modules_imgs/node_core_modules4.png"/>
<img  src="curNode_core_modules_imgs/node_core_modules5.png"/>
<img  src="curNode_core_modules_imgs/node_core_modules6.png"/>
<img  src="curNode_core_modules_imgs/node_core_modules7.png"/>
<img  src="curNode_core_modules_imgs/node_core_modules8.png"/>

<hr/>

### original module system in curNode.js is CommonJS
```javascript
// Loading the entire module
const os = require('os');
console.log(os.uptime());
// Loading the module and extracting certain functions by means of destructuring
const { uptime } = require('os');
console.log(uptime());

```


<hr/>


### ES6 modules

```javascript

import os from 'os';
console.log(os.uptime());

import { uptime } from 'os';
console.log(uptime());
```

<hr/>

### require is a function that loads a module and returns its exports
### import is a statement that tells the JavaScript engine to load a module 
### and make its exports available in the current scope

### we can use require without any extra configuration
### but we need to use in out package.json file "type": "module" to use import
### or to use .mjs file extension



<img  src="curNode_core_modules_imgs/node_core_modules9.png"/> 

<img  src="curNode_core_modules_imgs/node_core_modules10.png"/> 

## this objects are avilable by default in any .ts or .js file 

<img  src="curNode_core_modules_imgs/node_core_modules11.png"/> 
<img  src="curNode_core_modules_imgs/node_core_modules12.png"/> 

#### Two variables that are very useful in application development are
#### __filename and __dirname. As the names of these variables already
#### suggest, both contain information about the location of the file, which
#### stores the source code of the currently executed script. The string in
#### __filename is the absolute path and file name of the script. __dirname
#### is just the path
#### this is the reademe file so we need to configure it 








