# Dedupe problem with factor-bundle
Bug example for using factor-bundle when dedupe happens

## Versions

* browserify: 11.0.1
* factor-bundle: 2.5.0

## Source and build directory

```
⌘ tree src/
src/
├── a.js
├── b.js
├── c.js
└── dups
    └── c.js

```

```
⌘ tree build/
build/
├── a.js
├── b.js
└── common.js
```

### src/a.js

```javascript
require('./c');
module.exports = 'a';

```

### src/b.js

```javascript
require('./dups/c');
module.exports = 'b';

```

### src/c.js

```javascript
module.exports = 'c';

```

### build/a.js

```javascript
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./c');
module.exports = 'a';

},{"./c":3}]},{},[1]);

```

### build/b.js

```javascript
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({2:[function(require,module,exports){
require('./dups/c');
module.exports = 'b';

},{"./dups/c":4}],4:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}]},{},[2]);

```

### build/common.js

```javascript
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({3:[function(require,module,exports){
module.exports = 'c';

},{}]},{},[]);

```

## index.html

```html
<html>
  <head>
    <meta charset='utf-8'>
    <script src="build/common.js"></script>
    <script src="build/a.js"></script>
    <script src="build/b.js"></script>
  </head>
  <body>
    <h1>Dedupe problem with factor-bundle</h1>
    <ul>
      <li>browserify: 11.0.1</li>
      <li>factor-bundle: 2.5.0</li>
    </ul>
  </body>
</html>
```

### Error message

```
Uncaught TypeError: Cannot read property '0' of undefined
```

`c.js` is deduped into `common.js`, so `arguments[4][3]` in `b.js` will be `undefined`
