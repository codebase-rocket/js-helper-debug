# Debug Library #

This library provides interface to `console.log` and additional functions for debugging. Use configuration params to enable to disable logging for development and production environments.


**************************************************


Private Library
---------------
To use this library in a project, setup your Github SSH in development machine.


Setup SSH for you github account
--------------------------------
https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent


Test
----
* Install 'Test' project dependencies `$ npm install`
* Run 'test' script `$ node test.js`


**************************************************


Usage
-----
### Reference this library in your Project's package.json
```
"dependencies": {
  "js-helper-debug": "git+https://github.com/nopos-dev/js-helper-debug.git"
}
```


### Include this library in your Project
```javascript
const Debug = require('js-helper-debug');
```


### Override default configuration as per you development or production environment needs
```javascript
Debug.config({
  'NO_CASUAL_LOGGING': false,
  'NO_ERROR_LOGGING': true // Turn off 'Error' logging
});
```

**************************************************

Functions
---------
### Interface to `console.log`
```javascript
Debug.log('hello world');
```
Output:
```
hello world
```


### Log an Error with Stack-Trace
```javascript
var err = new Error('Intentional error for testing.');
Debug.logErrorForResearch(err);
```
Output:
```
==Error for research==
**Error**
Error: Intentional error for testing.
**Error Stack**
Error: Intentional error for testing.
    at Object.<anonymous> (.../.../example.js:18:11)
    at Module._compile (internal/modules/cjs/loader.js:702:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
    at Module.load (internal/modules/cjs/loader.js:612:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
    at Function.Module._load (internal/modules/cjs/loader.js:543:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:744:10)
    at startup (internal/bootstrap/node.js:238:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:572:3)

```


### Log execution time
```javascript
const request_start_time = new Date().getTime() ); // Unix Timestamp equivalant of current time in Milliseconds

Debug.timingAuditLog('Start', 'Process-A', request_start_time);
// ...process interval
Debug.timingAuditLog('End', 'Process-A', request_start_time);
```
Output:
```
[AUDIT] [Start] [Process-A] [0 ms] [1572602262225 ms]
[AUDIT] [End] [Process-A] [3004 ms] [1572602265230 ms]
```
