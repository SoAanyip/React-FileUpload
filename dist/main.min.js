(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-fileupload"] = factory(require("react"));
	else
		root["react-fileupload"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_26__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isDescriptor */
/* harmony export (immutable) */ __webpack_exports__["c"] = decorate;
/* harmony export (immutable) */ __webpack_exports__["g"] = metaFor;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getOwnKeys; });
/* harmony export (immutable) */ __webpack_exports__["e"] = getOwnPropertyDescriptors;
/* harmony export (immutable) */ __webpack_exports__["b"] = createDefaultSetter;
/* harmony export (immutable) */ __webpack_exports__["a"] = bind;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return warn; });
/* harmony export (immutable) */ __webpack_exports__["f"] = internalDeprecation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lazy_initialize__ = __webpack_require__(5);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



var defineProperty = Object.defineProperty,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getOwnPropertyNames = Object.getOwnPropertyNames,
    getOwnPropertySymbols = Object.getOwnPropertySymbols;


function isDescriptor(desc) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  var keys = ['value', 'initializer', 'get', 'set'];

  for (var i = 0, l = keys.length; i < l; i++) {
    if (desc.hasOwnProperty(keys[i])) {
      return true;
    }
  }

  return false;
}

function decorate(handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor.apply(undefined, _toConsumableArray(entryArgs).concat([[]]));
  } else {
    return function () {
      return handleDescriptor.apply(undefined, Array.prototype.slice.call(arguments).concat([entryArgs]));
    };
  }
}

var Meta = (_class = function Meta() {
  _classCallCheck(this, Meta);

  _initDefineProp(this, 'debounceTimeoutIds', _descriptor, this);

  _initDefineProp(this, 'throttleTimeoutIds', _descriptor2, this);

  _initDefineProp(this, 'throttlePreviousTimestamps', _descriptor3, this);

  _initDefineProp(this, 'throttleTrailingArgs', _descriptor4, this);

  _initDefineProp(this, 'profileLastRan', _descriptor5, this);
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'debounceTimeoutIds', [__WEBPACK_IMPORTED_MODULE_0__lazy_initialize__["a" /* default */]], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'throttleTimeoutIds', [__WEBPACK_IMPORTED_MODULE_0__lazy_initialize__["a" /* default */]], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'throttlePreviousTimestamps', [__WEBPACK_IMPORTED_MODULE_0__lazy_initialize__["a" /* default */]], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'throttleTrailingArgs', [__WEBPACK_IMPORTED_MODULE_0__lazy_initialize__["a" /* default */]], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'profileLastRan', [__WEBPACK_IMPORTED_MODULE_0__lazy_initialize__["a" /* default */]], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class);


var META_KEY = typeof Symbol === 'function' ? Symbol('__core_decorators__') : '__core_decorators__';

function metaFor(obj) {
  if (obj.hasOwnProperty(META_KEY) === false) {
    defineProperty(obj, META_KEY, {
      // Defaults: NOT enumerable, configurable, or writable
      value: new Meta()
    });
  }

  return obj[META_KEY];
}

var getOwnKeys = getOwnPropertySymbols ? function (object) {
  return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
} : getOwnPropertyNames;

function getOwnPropertyDescriptors(obj) {
  var descs = {};

  getOwnKeys(obj).forEach(function (key) {
    return descs[key] = getOwnPropertyDescriptor(obj, key);
  });

  return descs;
}

function createDefaultSetter(key) {
  return function set(newValue) {
    Object.defineProperty(this, key, {
      configurable: true,
      writable: true,
      // IS enumerable when reassigned by the outside word
      enumerable: true,
      value: newValue
    });

    return newValue;
  };
}

function bind(fn, context) {
  if (fn.bind) {
    return fn.bind(context);
  } else {
    return function __autobind__() {
      return fn.apply(context, arguments);
    };
  }
}

var warn = function () {
  if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) !== 'object' || !console || typeof console.warn !== 'function') {
    return function () {};
  } else {
    return bind(console.warn, console);
  }
}();

var seenDeprecations = {};
function internalDeprecation(msg) {
  if (seenDeprecations[msg] !== true) {
    seenDeprecations[msg] = true;
    warn('DEPRECATION: ' + msg);
  }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = lazyInitialize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);

var defineProperty = Object.defineProperty;


function handleDescriptor(target, key, descriptor) {
  var configurable = descriptor.configurable,
      enumerable = descriptor.enumerable,
      initializer = descriptor.initializer,
      value = descriptor.value;

  return {
    configurable: configurable,
    enumerable: enumerable,

    get: function get() {
      // This happens if someone accesses the
      // property directly on the prototype
      if (this === target) {
        return;
      }

      var ret = initializer ? initializer.call(this) : value;

      defineProperty(this, key, {
        configurable: configurable,
        enumerable: enumerable,
        writable: true,
        value: ret
      });

      return ret;
    },


    set: Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["b" /* createDefaultSetter */])(key)
  };
}

function lazyInitialize() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(2);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp; /**
                                            * Created by cheesu on 2015/8/17.
                                            */

/**
 * React文件上传组件，兼容IE8+
 * 现代浏览器采用AJAX（XHR2+File API）上传。低版本浏览器使用form+iframe上传。
 * 使用到ES6，需要经babel转译
 */

/*eslint indent: 0 */


var _coreDecorators = __webpack_require__(8);

var _react = __webpack_require__(26);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(27);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var emptyFunction = function emptyFunction() {};
/*当前IE上传组的id*/
var currentIEID = 0;
/*存放当前IE上传组的可用情况*/
var IEFormGroup = [true];
/*当前xhr的数组（仅有已开始上传之后的xhr）*/
var xhrList = [];
var currentXHRID = 0;

var FileUpload = (_class = (_temp = _class2 = function (_Component) {
    _inherits(FileUpload, _Component);

    function FileUpload(props) {
        _classCallCheck(this, FileUpload);

        var _this = _possibleConstructorReturn(this, (FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call(this, props));

        _this.state = {
            chooseBtn: {}, //选择按钮。如果chooseAndUpload=true代表选择并上传。
            uploadBtn: {}, //上传按钮。如果chooseAndUpload=true则无效。
            before: [], //存放props.children中位于chooseBtn前的元素
            middle: [], //存放props.children中位于chooseBtn后，uploadBtn前的元素
            after: [] //存放props.children中位于uploadBtn后的元素,
        };
        return _this;
    }

    _createClass(FileUpload, [{
        key: 'storeFileUploaderRef',
        value: function storeFileUploaderRef(ref) {
            this.ajaxUploadFileInput = ref;
        }
    }, {
        key: '_updateProps',
        value: function _updateProps(props) {
            var _this2 = this;

            this.isIE = !(this.checkIE() < 0 || this.checkIE() >= 10);
            var options = props.options;
            this.baseUrl = options.baseUrl; //域名
            this.param = options.param; //get参数
            this.chooseAndUpload = options.chooseAndUpload || false; //是否在用户选择了文件之后立刻上传
            this.paramAddToField = options.paramAddToField || undefined; //需要添加到FormData的对象。不支持IE
            /*upload success 返回resp的格式*/
            this.dataType = 'json';
            options.dataType && options.dataType.toLowerCase() === 'text' && (this.dataType = 'text');
            this.wrapperDisplay = options.wrapperDisplay || 'inline-block'; //包裹chooseBtn或uploadBtn的div的display
            this.timeout = typeof options.timeout === 'number' && options.timeout > 0 ? options.timeout : 0; //超时时间
            this.accept = options.accept || ''; //限制文件后缀
            this.multiple = options.multiple || false;
            this.numberLimit = options.numberLimit || false; //允许多文件上传时，选择文件数量的限制
            this.fileFieldName = options.fileFieldName || false; //文件附加到formData上时的key，传入string指定一个file的属性名，值为其属性的值。不支持IE
            this.withCredentials = options.withCredentials || false; //跨域时是否使用认证信息
            this.requestHeaders = options.requestHeaders || false; //要设置的请求头键值对

            /*生命周期函数*/
            /**
             * beforeChoose() : 用户选择之前执行，返回true继续，false阻止用户选择
             * @param  null
             * @return  {boolean} 是否允许用户进行选择
             */
            this.beforeChoose = options.beforeChoose || emptyFunction;
            /**
             * chooseFile(file) : 用户选择文件后的触发的回调函数
             * @param file {File | string} 现代浏览器返回File对象，IE返回文件名
             * @return
             */
            this.chooseFile = options.chooseFile || emptyFunction;
            /**
             * beforeUpload(file,mill) : 用户上传之前执行，返回true继续，false阻止用户选择
             * @param file {File | string} 现代浏览器返回File对象，IE返回文件名
             * @param mill {long} 毫秒数，如果File对象已有毫秒数则返回一样的
             * @return  {boolean || object} 是否允许用户进行上传 (hack:如果是obj{
             *     assign:boolean 默认true
             *     param:object
             * }), 则对本次的param进行处理
             */
            this.beforeUpload = options.beforeUpload || emptyFunction;
            /**
             * doUpload(file,mill) : 上传动作(xhr send | form submit)执行后调用
             * @param file {File | string} 现代浏览器返回File对象，IE返回文件名
             * @param mill {long} 毫秒数，如果File对象已有毫秒数则返回一样的
             * @return
             */
            this.doUpload = options.doUpload || emptyFunction;
            /**
             * uploading(progress) : 在文件上传中的时候，浏览器会不断触发此函数。IE中使用每200ms触发的假进度
             * @param progress {Progress} progress对象，里面存有例如上传进度loaded和文件大小total等属性
             * @return
             */
            this.uploading = options.uploading || emptyFunction;
            /**
             * uploadSuccess(resp) : 上传成功后执行的回调（针对AJAX而言）
             * @param resp {json | string} 根据options.dataType指定返回数据的格式
             * @return
             */
            this.uploadSuccess = options.uploadSuccess || emptyFunction;
            /**
             * uploadError(err) : 上传错误后执行的回调（针对AJAX而言）
             * @param err {Error | object} 如果返回catch到的error，其具有type和message属性
             * @return
             */
            this.uploadError = options.uploadError || emptyFunction;
            /**
             * uploadFail(resp) : 上传失败后执行的回调（针对AJAX而言）
             * @param resp {string} 失败信息
             */
            this.uploadFail = options.uploadFail || emptyFunction;
            /**
             * onabort(mill, xhrID) : 主动取消xhr进程的响应
             * @param mill {long} 毫秒数，本次上传时刻的时间
             * @param xhrID {int} 在doUpload时会返回的当次xhr代表ID
             */
            this.onabort = options.onabort || emptyFunction;

            this.files = options.files || this.files || false; //保存需要上传的文件
            /*特殊内容*/

            /*IE情况下，由于上传按钮被隐藏的input覆盖，不能进行disabled按钮处理。
             * 所以当disabledIEChoose为true（或者func返回值为true）时，禁止IE上传。
             */
            this.disabledIEChoose = options.disabledIEChoose || false;

            this._withoutFileUpload = options._withoutFileUpload || false; //不带文件上传，为了给秒传功能使用，不影响IE
            this.filesToUpload = options.filesToUpload || []; //使用filesToUpload()方法代替
            this.textBeforeFiles = options.textBeforeFiles || false; //make this true to add text fields before file data
            /*使用filesToUpload()方法代替*/
            if (this.filesToUpload.length && !this.isIE) {
                this.filesToUpload.forEach(function (file) {
                    _this2.files = [file];
                    _this2.commonUpload();
                });
            }

            /*放置虚拟DOM*/
            var chooseBtn = void 0,
                uploadBtn = void 0,
                flag = 0;
            var before = [],
                middle = [],
                after = [];
            if (this.chooseAndUpload) {
                _react2.default.Children.forEach(props.children, function (child) {
                    if (child && child.ref === 'chooseAndUpload') {
                        chooseBtn = child;
                        flag++;
                    } else {
                        flag === 0 ? before.push(child) : flag === 1 ? middle.push(child) : '';
                    }
                });
            } else {
                _react2.default.Children.forEach(props.children, function (child) {
                    if (child && child.ref === 'chooseBtn') {
                        chooseBtn = child;
                        flag++;
                    } else if (child && child.ref === 'uploadBtn') {
                        uploadBtn = child;
                        flag++;
                    } else {
                        flag === 0 ? before.push(child) : flag === 1 ? middle.push(child) : after.push(child);
                    }
                });
            }
            this.setState({
                chooseBtn: chooseBtn,
                uploadBtn: uploadBtn,
                before: before,
                middle: middle,
                after: after
            });
        }

        /*触发隐藏的input框选择*/

    }, {
        key: 'commonChooseFile',
        value: function commonChooseFile() {
            var jud = this.beforeChoose();
            if (jud !== true && jud !== undefined) return;
            this.ajaxUploadFileInput.click();
        }

        /*现代浏览器input change事件。File API保存文件*/

    }, {
        key: 'commonChange',
        value: function commonChange(e) {
            var files = void 0;
            e.dataTransfer ? files = e.dataTransfer.files : e.target ? files = e.target.files : '';

            /*如果限制了多文件上传时的数量*/
            var numberLimit = typeof this.numberLimit === 'function' ? this.numberLimit() : this.numberLimit;
            if (this.multiple && numberLimit && files.length > numberLimit) {
                var newFiles = {};
                for (var i = 0; i < numberLimit; i++) {
                    newFiles[i] = files[i];
                }newFiles.length = numberLimit;
                files = newFiles;
            }
            this.files = files;
            this.chooseFile(files);
            this.chooseAndUpload && this.commonUpload();
        }
    }, {
        key: 'commonUpload',
        value: function commonUpload() {
            var _this3 = this;

            /*mill参数是当前时刻毫秒数，file第一次进行上传时会添加为file的属性，也可在beforeUpload为其添加，之后同一文件的mill不会更改，作为文件的识别id*/
            var mill = this.files.length && this.files[0].mill || new Date().getTime();
            var jud = this.beforeUpload(this.files, mill);
            if (jud !== true && jud !== undefined && (typeof jud === 'undefined' ? 'undefined' : _typeof(jud)) !== 'object') {
                /*清除input的值*/
                this.ajaxUploadFileInput.value = '';
                return;
            }

            if (!this.files) return;
            if (!this.baseUrl) throw new Error('baseUrl missing in options');

            /*用于存放当前作用域的东西*/
            var scope = {};
            /*组装FormData*/
            var formData = new FormData();
            /*If we need to add fields before file data append here*/
            if (this.textBeforeFiles) {
                formData = this.appendFieldsToFormData(formData);
            }
            if (!this._withoutFileUpload) {
                var fieldNameType = _typeof(this.fileFieldName);

                /*判断是用什么方式作为formdata item 的 name*/
                Object.keys(this.files).forEach(function (key) {
                    if (key === 'length') return;

                    if (fieldNameType === 'function') {
                        var file = _this3.files[key];
                        var fileFieldName = _this3.fileFieldName(file);
                        formData.append(fileFieldName, file);
                    } else if (fieldNameType === 'string') {
                        var _file = _this3.files[key];
                        formData.append(_this3.fileFieldName, _file);
                    } else {
                        var _file2 = _this3.files[key];
                        formData.append(_file2.name, _file2);
                    }
                });
            }
            /*If we need to add fields after file data append here*/
            if (!this.textBeforeFiles) {
                formData = this.appendFieldsToFormData(formData);
            }
            var baseUrl = this.baseUrl;

            /*url参数*/
            /*如果param是一个函数*/
            var param = typeof this.param === 'function' ? this.param(this.files) : this.param;

            var paramStr = '';

            if (param) {
                var paramArr = [];
                param['_'] = mill;
                Object.keys(param).forEach(function (key) {
                    return paramArr.push(key + '=' + param[key]);
                });
                paramStr = '?' + paramArr.join('&');
            }
            var targeturl = baseUrl + paramStr;

            /*AJAX上传部分*/
            var xhr = new XMLHttpRequest();
            xhr.open('POST', targeturl, true);

            /*跨域是否开启验证信息*/
            xhr.withCredentials = this.withCredentials;
            /*是否需要设置请求头*/
            var rh = this.requestHeaders;
            rh && Object.keys(rh).forEach(function (key) {
                return xhr.setRequestHeader(key, rh[key]);
            });

            /*处理超时。用定时器判断超时，不然xhr state=4 catch的错误无法判断是超时*/
            if (this.timeout) {
                xhr.timeout = this.timeout;
                xhr.ontimeout = function () {
                    _this3.uploadError({ type: 'TIMEOUTERROR', message: 'timeout' });
                    scope.isTimeout = false;
                };
                scope.isTimeout = false;
                setTimeout(function () {
                    scope.isTimeout = true;
                }, this.timeout);
            }

            xhr.onreadystatechange = function () {
                /*xhr finish*/
                try {
                    if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 400) {
                        var resp = _this3.dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                        _this3.uploadSuccess(resp);
                    } else if (xhr.readyState === 4) {
                        /*xhr fail*/
                        var _resp = _this3.dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                        _this3.uploadFail(_resp);
                    }
                } catch (e) {
                    /*超时抛出不一样的错误，不在这里处理*/
                    !scope.isTimeout && _this3.uploadError({ type: 'FINISHERROR', message: e.message });
                }
            };
            /*xhr error*/
            xhr.onerror = function () {
                try {
                    var resp = _this3.dataType === 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                    _this3.uploadError({ type: 'XHRERROR', message: resp });
                } catch (e) {
                    _this3.uploadError({ type: 'XHRERROR', message: e.message });
                }
            };
            /*这里部分浏览器实现不一致，而且IE没有这个方法*/
            xhr.onprogress = xhr.upload.onprogress = function (progress) {
                _this3.uploading(progress, mill);
            };

            /*不带文件上传，给秒传使用*/
            this._withoutFileUpload ? xhr.send(null) : xhr.send(formData);

            /*保存xhr id*/
            xhrList.push(xhr);
            var cID = xhrList.length - 1;
            currentXHRID = cID;

            /*有响应abort的情况*/
            xhr.onabort = function () {
                return _this3.onabort(mill, cID);
            };

            /*trigger执行上传的用户回调*/
            this.doUpload(this.files, mill, currentXHRID);

            /*清除input的值*/
            this.ajaxUploadFileInput.value = '';
        }

        /*组装自定义添加到FormData的对象*/

    }, {
        key: 'appendFieldsToFormData',
        value: function appendFieldsToFormData(formData) {
            var field = typeof this.paramAddToField === 'function' ? this.paramAddToField() : this.paramAddToField;
            field && Object.keys(field).map(function (index) {
                return formData.append(index, field[index]);
            });
            return formData;
        }

        /*iE选择前验证*/

        /*触发beforeChoose*/

    }, {
        key: 'IEBeforeChoose',
        value: function IEBeforeChoose(e) {
            var jud = this.beforeChoose();
            jud !== true && jud !== undefined && e.preventDefault();
        }

        /*IE需要用户真实点击上传按钮，所以使用透明按钮*/

        /*触发chooseFile*/

    }, {
        key: 'IEChooseFile',
        value: function IEChooseFile(e) {
            this.fileName = e.target.value.substring(e.target.value.lastIndexOf('\\') + 1);
            this.chooseFile(this.fileName);
            /*先执行IEUpload，配置好action等参数，然后submit*/
            this.chooseAndUpload && this.IEUpload() !== false && document.getElementById('ajax_upload_file_form_' + this.IETag + currentIEID).submit();
            e.target.blur();
        }

        /*IE处理上传函数*/

    }, {
        key: 'IEUpload',
        value: function IEUpload(e) {
            var _this4 = this;

            var mill = new Date().getTime();
            var jud = this.beforeUpload(this.fileName, mill);
            if (!this.fileName || jud !== true && jud !== undefined) {
                e && e.preventDefault();
                return false;
            }
            var that = this;

            /*url参数*/
            var baseUrl = this.baseUrl;

            var param = typeof this.param === 'function' ? this.param(this.fileName) : this.param;
            var paramStr = '';

            if (param) {
                var paramArr = [];
                param['_'] = mill;
                param['ie'] === undefined && (param['ie'] = 'true');
                for (var key in param) {
                    if (param[key] !== undefined) paramArr.push(key + '=' + param[key]);
                }
                paramStr = '?' + paramArr.join('&');
            }
            var targeturl = baseUrl + paramStr;

            document.getElementById('ajax_upload_file_form_' + this.IETag + currentIEID).setAttribute('action', targeturl);
            /*IE假的上传进度*/
            var getFakeProgress = this.fakeProgress();
            var loaded = 0,
                count = 0;

            var progressInterval = setInterval(function () {
                loaded = getFakeProgress(loaded);
                _this4.uploading({
                    loaded: loaded,
                    total: 100
                }, mill);
                /*防止永久执行，设定最大的次数。暂时为30秒(200*150)*/
                ++count >= 150 && clearInterval(progressInterval);
            }, 200);

            /*当前上传id*/
            var partIEID = currentIEID;
            /*回调函数*/
            window.attachEvent ? document.getElementById('ajax_upload_file_frame_' + this.IETag + partIEID).attachEvent('onload', handleOnLoad) : document.getElementById('ajax_upload_file_frame_' + this.IETag + partIEID).addEventListener('load', handleOnLoad);

            function handleOnLoad() {
                /*clear progress interval*/
                clearInterval(progressInterval);
                try {
                    that.uploadSuccess(that.IECallback(that.dataType, partIEID));
                } catch (e) {
                    that.uploadError(e);
                } finally {
                    /*清除输入框的值*/
                    var oInput = document.getElementById('ajax_upload_hidden_input_' + that.IETag + partIEID);
                    oInput.outerHTML = oInput.outerHTML; // WTF ???
                }
            }

            this.doUpload(this.fileName, mill);
            /*置为非空闲*/
            IEFormGroup[currentIEID] = false;
        }

        /*IE回调函数*/

        //TODO 处理Timeout

    }, {
        key: 'IECallback',
        value: function IECallback(dataType, frameId) {
            /*回复空闲状态*/
            IEFormGroup[frameId] = true;

            var frame = document.getElementById('ajax_upload_file_frame_' + this.IETag + frameId);
            var resp = {};
            var content = frame.contentWindow ? frame.contentWindow.document.body : frame.contentDocument.document.body;
            if (!content) throw new Error('Your browser does not support async upload');
            try {
                resp.responseText = content.innerHTML || 'null innerHTML';
                resp.json = JSON ? JSON.parse(resp.responseText) : eval('(' + resp.responseText + ')');
            } catch (e) {
                /*如果是包含了<pre>*/
                if (e.message && e.message.indexOf('Unexpected token') >= 0) {
                    /*包含返回的json*/
                    if (resp.responseText.indexOf('{') >= 0) {
                        var msg = resp.responseText.substring(resp.responseText.indexOf('{'), resp.responseText.lastIndexOf('}') + 1);
                        return JSON ? JSON.parse(msg) : eval('(' + msg + ')');
                    }
                    return { type: 'FINISHERROR', message: e.message };
                }
                throw e;
            }
            return dataType === 'json' ? resp.json : resp.responseText;
        }

        /*外部调用方法，主动触发选择文件（等同于调用btn.click()), 仅支持现代浏览器*/

    }, {
        key: 'forwardChoose',
        value: function forwardChoose() {
            if (this.isIE) return false;
            this.commonChooseFile();
        }

        /**
         * 外部调用方法，当多文件上传时，用这个方法主动删除列表中某个文件
         * TODO: 此方法应为可以任意操作文件数组
         * @param func 用户调用时传入的函数，函数接收参数files（filesAPI 对象）
         * @return Obj File API 对象
         * File API Obj:
         * {
         *   0 : file,
         *   1 : file,
         *   length : 2
         * }
         */

    }, {
        key: 'forwardRemoveFile',
        value: function forwardRemoveFile(func) {
            this.files = func(this.files);
        }

        /*外部调用方法，传入files（File API）对象可以立刻执行上传动作，IE不支持。调用随后会触发beforeUpload*/

    }, {
        key: 'filesToUpload',
        value: function filesToUpload(files) {
            if (this.isIE) return;
            this.files = files;
            this.commonUpload();
        }

        /*外部调用方法，取消一个正在进行的xhr，传入id指定xhr（doupload时返回）或者默认取消最近一个。*/

    }, {
        key: 'abort',
        value: function abort(id) {
            id === undefined ? xhrList[currentXHRID].abort() : xhrList[id].abort();
        }

        /*判断ie版本*/

    }, {
        key: 'checkIE',
        value: function checkIE() {
            var userAgent = this.userAgent;
            var version = userAgent.indexOf('MSIE');
            if (version < 0) return -1;

            return parseFloat(userAgent.substring(version + 5, userAgent.indexOf(';', version)));
        }

        /*生成假的IE上传进度*/

    }, {
        key: 'fakeProgress',
        value: function fakeProgress() {
            var add = 6;
            var decrease = 0.3,
                end = 98,
                min = 0.2;
            return function (lastTime) {
                var start = lastTime;
                if (start >= end) return start;

                start += add;
                add = add - decrease;
                add < min && (add = min);

                return start;
            };
        }
    }, {
        key: 'getUserAgent',
        value: function getUserAgent() {
            var userAgentString = this.props.options && this.props.options.userAgent;
            var navigatorIsAvailable = typeof navigator !== 'undefined';
            if (!navigatorIsAvailable && !userAgentString) {
                throw new Error('\`options.userAgent\` must be set rendering react-fileuploader in situations when \`navigator\` is not defined in the global namespace. (on the server, for example)');
            }
            return navigatorIsAvailable ? navigator.userAgent : userAgentString;
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.userAgent = this.getUserAgent();
            this.isIE = !(this.checkIE() < 0 || this.checkIE() >= 10);
            /*因为IE每次要用到很多form组，如果在同一页面需要用到多个<FileUpload>可以在options传入tag作为区分。并且不随后续props改变而改变*/
            var tag = this.props.options && this.props.options.tag;
            this.IETag = tag ? tag + '_' : '';

            this._updateProps(this.props);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {}
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            this._updateProps(newProps);
        }
    }, {
        key: 'render',
        value: function render() {
            return this._packRender();
        }

        /*打包render函数*/

    }, {
        key: '_packRender',
        value: function _packRender() {
            var _this5 = this;

            /*IE用iframe表单上传，其他用ajax Formdata*/
            var render = '';
            if (this.isIE) {
                render = this._multiIEForm();
            } else {
                var restAttrs = {
                    accept: this.accept,
                    multiple: this.multiple
                };

                render = _react2.default.createElement(
                    'div',
                    { className: this.props.className, style: this.props.style },
                    this.state.before,
                    _react2.default.createElement(
                        'div',
                        { onClick: this.commonChooseFile,
                            style: { overflow: 'hidden', postion: 'relative', display: this.wrapperDisplay }
                        },
                        this.state.chooseBtn
                    ),
                    this.state.middle,
                    _react2.default.createElement(
                        'div',
                        { onClick: this.commonUpload,
                            style: {
                                overflow: 'hidden',
                                postion: 'relative',
                                display: this.chooseAndUpload ? 'none' : this.wrapperDisplay
                            }
                        },
                        this.state.uploadBtn
                    ),
                    this.state.after,
                    _react2.default.createElement('input', _extends({
                        name: 'ajax_upload_file_input',
                        ref: function ref(input) {
                            _this5.ajaxUploadFileInput = input;
                        },
                        type: 'file',
                        style: { display: 'none' }, onChange: this.commonChange
                    }, restAttrs))
                );
            }
            return render;
        }
    }, {
        key: '_multiIEForm',
        value: function _multiIEForm() {
            var formArr = [];
            var hasFree = false;

            /* IE情况下，由于上传按钮被隐藏的input覆盖，不能进行disabled按钮处理。
             * 所以当disabledIEChoose为true（或者func返回值为true）时，禁止IE上传。
             */
            var isDisabled = typeof this.disabledIEChoose === 'function' ? this.disabledIEChoose() : this.disabledIEChoose;

            /*这里IEFormGroup的长度会变，所以不能存len*/
            for (var i = 0; i < IEFormGroup.length; i++) {
                _insertIEForm.call(this, formArr, i);
                /*如果当前上传组是空闲，hasFree=true，并且指定当前上传组ID*/
                if (IEFormGroup[i] && !hasFree) {
                    hasFree = true;
                    currentIEID = i;
                }
                /*如果所有上传组都不是空闲状态，push一个新增组*/
                i === IEFormGroup.length - 1 && !hasFree && IEFormGroup.push(true);
            }

            return _react2.default.createElement(
                'div',
                { className: this.props.className, style: this.props.style, id: 'react-file-uploader' },
                formArr
            );

            function _insertIEForm(formArr, i) {
                /*如果已经push了空闲组而当前也是空闲组*/
                if (IEFormGroup[i] && hasFree) return;
                /*是否display*/
                var isShow = IEFormGroup[i];
                /*Input内联样式*/
                var style = {
                    position: 'absolute',
                    left: '-30px',
                    top: 0,
                    zIndex: '50',
                    fontSize: '80px',
                    width: '200px',
                    opacity: 0,
                    filter: 'alpha(opacity=0)'
                };

                /*是否限制了文件后缀，以及是否disabled*/
                var restAttrs = {
                    accept: this.accept,
                    disabled: isDisabled
                };

                var input = _react2.default.createElement('input', _extends({ type: 'file', name: 'ajax_upload_hidden_input_' + i, id: 'ajax_upload_hidden_input_' + i,
                    ref: 'ajax_upload_hidden_input_' + i, onChange: this.IEChooseFile, onClick: this.IEBeforeChoose,
                    style: style }, restAttrs));

                i = '' + this.IETag + i;
                formArr.push(_react2.default.createElement(
                    'form',
                    { id: 'ajax_upload_file_form_' + i, method: 'post', target: 'ajax_upload_file_frame_' + i,
                        key: 'ajax_upload_file_form_' + i,
                        encType: 'multipart/form-data', ref: 'form_' + i, onSubmit: this.IEUpload,
                        style: { display: isShow ? 'block' : 'none' }
                    },
                    this.state.before,
                    _react2.default.createElement(
                        'div',
                        { style: { overflow: 'hidden', position: 'relative', display: 'inline-block' } },
                        this.state.chooseBtn,
                        input
                    ),
                    this.state.middle,
                    _react2.default.createElement(
                        'div',
                        { style: {
                                overflow: 'hidden',
                                position: 'relative',
                                display: this.chooseAndUpload ? 'none' : this.wrapperDisplay
                            }
                        },
                        this.state.uploadBtn,
                        _react2.default.createElement('input', { type: 'submit',
                            style: {
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                fontSize: '50px',
                                width: '200px',
                                opacity: 0
                            }
                        })
                    ),
                    this.state.after
                ));
                formArr.push(_react2.default.createElement('iframe', { id: 'ajax_upload_file_frame_' + i,
                    name: 'ajax_upload_file_frame_' + i,
                    key: 'ajax_upload_file_frame_' + i,
                    className: 'ajax_upload_file_frame',
                    style: {
                        display: 'none',
                        width: 0,
                        height: 0,
                        margin: 0,
                        border: 0
                    }
                }));
            }
        }
    }]);

    return FileUpload;
}(_react.Component), _class2.propTypes = {
    options: _propTypes2.default.shape({
        /*basics*/
        baseUrl: _propTypes2.default.string.isRequired,
        param: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
        dataType: _propTypes2.default.string,
        chooseAndUpload: _propTypes2.default.bool,
        paramAddToField: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func]),
        wrapperDisplay: _propTypes2.default.string,
        timeout: _propTypes2.default.number,
        accept: _propTypes2.default.string,
        multiple: _propTypes2.default.bool,
        numberLimit: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.func]),
        fileFieldName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
        withCredentials: _propTypes2.default.bool,
        requestHeaders: _propTypes2.default.object,
        /*specials*/
        tag: _propTypes2.default.string,
        userAgent: _propTypes2.default.string,
        disabledIEChoose: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
        _withoutFileUpload: _propTypes2.default.bool,
        filesToUpload: _propTypes2.default.arrayOf(_propTypes2.default.object),
        textBeforeFiles: _propTypes2.default.bool,
        /*funcs*/
        beforeChoose: _propTypes2.default.func,
        chooseFile: _propTypes2.default.func,
        beforeUpload: _propTypes2.default.func,
        doUpload: _propTypes2.default.func,
        uploading: _propTypes2.default.func,
        uploadSuccess: _propTypes2.default.func,
        uploadError: _propTypes2.default.func,
        uploadFail: _propTypes2.default.func,
        onabort: _propTypes2.default.func
    }).isRequired,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'storeFileUploaderRef', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'storeFileUploaderRef'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_updateProps', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_updateProps'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'commonChooseFile', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'commonChooseFile'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'commonChange', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'commonChange'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'commonUpload', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'commonUpload'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'IEUpload', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'IEUpload'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'IECallback', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'IECallback'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'forwardChoose', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'forwardChoose'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'forwardRemoveFile', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'forwardRemoveFile'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'filesToUpload', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'filesToUpload'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getUserAgent', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'getUserAgent'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_packRender', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_packRender'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_multiIEForm', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_multiIEForm'), _class.prototype)), _class);


module.exports = FileUpload;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__override__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "override", function() { return __WEBPACK_IMPORTED_MODULE_0__override__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__deprecate__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deprecate", function() { return __WEBPACK_IMPORTED_MODULE_1__deprecate__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "deprecated", function() { return __WEBPACK_IMPORTED_MODULE_1__deprecate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__suppress_warnings__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "suppressWarnings", function() { return __WEBPACK_IMPORTED_MODULE_2__suppress_warnings__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__memoize__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "memoize", function() { return __WEBPACK_IMPORTED_MODULE_3__memoize__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__autobind__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return __WEBPACK_IMPORTED_MODULE_4__autobind__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__readonly__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "readonly", function() { return __WEBPACK_IMPORTED_MODULE_5__readonly__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__enumerable__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "enumerable", function() { return __WEBPACK_IMPORTED_MODULE_6__enumerable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__nonenumerable__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "nonenumerable", function() { return __WEBPACK_IMPORTED_MODULE_7__nonenumerable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__nonconfigurable__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "nonconfigurable", function() { return __WEBPACK_IMPORTED_MODULE_8__nonconfigurable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__debounce__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return __WEBPACK_IMPORTED_MODULE_9__debounce__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__throttle__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return __WEBPACK_IMPORTED_MODULE_10__throttle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__decorate__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "decorate", function() { return __WEBPACK_IMPORTED_MODULE_11__decorate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__mixin__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mixin", function() { return __WEBPACK_IMPORTED_MODULE_12__mixin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mixins", function() { return __WEBPACK_IMPORTED_MODULE_12__mixin__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__lazy_initialize__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "lazyInitialize", function() { return __WEBPACK_IMPORTED_MODULE_13__lazy_initialize__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__time__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "time", function() { return __WEBPACK_IMPORTED_MODULE_14__time__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__extendDescriptor__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "extendDescriptor", function() { return __WEBPACK_IMPORTED_MODULE_15__extendDescriptor__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__profile__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "profile", function() { return __WEBPACK_IMPORTED_MODULE_16__profile__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__applyDecorators__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "applyDecorators", function() { return __WEBPACK_IMPORTED_MODULE_17__applyDecorators__["a"]; });
/**
 * core-decorators.js
 * (c) 2017 Jay Phelps and contributors
 * MIT Licensed
 * https://github.com/jayphelps/core-decorators.js
 * @license
 */


















// Helper to apply decorators to a class without transpiler support


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = override;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var GENERIC_FUNCTION_ERROR = '{child} does not properly override {parent}';
var FUNCTION_REGEXP = /^function ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?(\([^\)]*\))[\s\S]+$/;

var SyntaxErrorReporter = function () {
  _createClass(SyntaxErrorReporter, [{
    key: '_getTopic',
    value: function _getTopic(descriptor) {
      if (descriptor === undefined) {
        return null;
      }

      if ('value' in descriptor) {
        return descriptor.value;
      }

      if ('get' in descriptor) {
        return descriptor.get;
      }

      if ('set' in descriptor) {
        return descriptor.set;
      }
    }
  }, {
    key: '_extractTopicSignature',
    value: function _extractTopicSignature(topic) {
      switch (typeof topic === 'undefined' ? 'undefined' : _typeof(topic)) {
        case 'function':
          return this._extractFunctionSignature(topic);
        default:
          return this.key;
      }
    }
  }, {
    key: '_extractFunctionSignature',
    value: function _extractFunctionSignature(fn) {
      var _this = this;

      return fn.toString().replace(FUNCTION_REGEXP, function (match) {
        var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.key;
        var params = arguments[2];
        return name + params;
      });
    }
  }, {
    key: 'key',
    get: function get() {
      return this.childDescriptor.key;
    }
  }, {
    key: 'parentNotation',
    get: function get() {
      return this.parentKlass.constructor.name + '#' + this.parentPropertySignature;
    }
  }, {
    key: 'childNotation',
    get: function get() {
      return this.childKlass.constructor.name + '#' + this.childPropertySignature;
    }
  }, {
    key: 'parentTopic',
    get: function get() {
      return this._getTopic(this.parentDescriptor);
    }
  }, {
    key: 'childTopic',
    get: function get() {
      return this._getTopic(this.childDescriptor);
    }
  }, {
    key: 'parentPropertySignature',
    get: function get() {
      return this._extractTopicSignature(this.parentTopic);
    }
  }, {
    key: 'childPropertySignature',
    get: function get() {
      return this._extractTopicSignature(this.childTopic);
    }
  }]);

  function SyntaxErrorReporter(parentKlass, childKlass, parentDescriptor, childDescriptor) {
    _classCallCheck(this, SyntaxErrorReporter);

    this.parentKlass = parentKlass;
    this.childKlass = childKlass;
    this.parentDescriptor = parentDescriptor;
    this.childDescriptor = childDescriptor;
  }

  _createClass(SyntaxErrorReporter, [{
    key: 'assert',
    value: function assert(condition) {
      var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (condition !== true) {
        this.error(GENERIC_FUNCTION_ERROR + msg);
      }
    }
  }, {
    key: 'error',
    value: function error(msg) {
      var _this2 = this;

      msg = msg
      // Replace lazily, because they actually might not
      // be available in all cases
      .replace('{parent}', function (m) {
        return _this2.parentNotation;
      }).replace('{child}', function (m) {
        return _this2.childNotation;
      });
      throw new SyntaxError(msg);
    }
  }]);

  return SyntaxErrorReporter;
}();

function getDescriptorType(descriptor) {
  if (descriptor.hasOwnProperty('value')) {
    return 'data';
  }

  if (descriptor.hasOwnProperty('get') || descriptor.hasOwnProperty('set')) {
    return 'accessor';
  }

  // If none of them exist, browsers treat it as
  // a data descriptor with a value of `undefined`
  return 'data';
}

function checkFunctionSignatures(parent, child, reporter) {
  reporter.assert(parent.length === child.length);
}

function checkDataDescriptors(parent, child, reporter) {
  var parentValueType = _typeof(parent.value);
  var childValueType = _typeof(child.value);

  if (parentValueType === 'undefined' && childValueType === 'undefined') {
    // class properties can be any expression, which isn't ran until the
    // the instance is created, so we can't reliably get type information
    // for them yet (per spec). Perhaps when Babel includes flow-type info
    // in runtime? Tried regex solutions, but super hacky and only feasible
    // on primitives, which is confusing for usage...
    reporter.error('descriptor values are both undefined. (class properties are are not currently supported)\'');
  }

  if (parentValueType !== childValueType) {
    var isFunctionOverUndefined = childValueType === 'function' && parentValueType === undefined;
    // Even though we don't support class properties, this
    // will still handle more than just functions, just in case.
    // Shadowing an undefined value is an error if the inherited
    // value was undefined (usually a class property, not a method)
    if (isFunctionOverUndefined || parentValueType !== undefined) {
      reporter.error('value types do not match. {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
    }
  }

  // Switch, in preparation for supporting more types
  switch (childValueType) {
    case 'function':
      checkFunctionSignatures(parent.value, child.value, reporter);
      break;

    default:
      reporter.error('Unexpected error. Please file a bug with: {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
      break;
  }
}

function checkAccessorDescriptors(parent, child, reporter) {
  var parentHasGetter = typeof parent.get === 'function';
  var childHasGetter = typeof child.get === 'function';
  var parentHasSetter = typeof parent.set === 'function';
  var childHasSetter = typeof child.set === 'function';

  if (parentHasGetter || childHasGetter) {
    if (!parentHasGetter && parentHasSetter) {
      reporter.error('{parent} is setter but {child} is getter');
    }

    if (!childHasGetter && childHasSetter) {
      reporter.error('{parent} is getter but {child} is setter');
    }

    checkFunctionSignatures(parent.get, child.get, reporter);
  }

  if (parentHasSetter || childHasSetter) {
    if (!parentHasSetter && parentHasGetter) {
      reporter.error('{parent} is getter but {child} is setter');
    }

    if (!childHasSetter && childHasGetter) {
      reporter.error('{parent} is setter but {child} is getter');
    }

    checkFunctionSignatures(parent.set, child.set, reporter);
  }
}

function checkDescriptors(parent, child, reporter) {
  var parentType = getDescriptorType(parent);
  var childType = getDescriptorType(child);

  if (parentType !== childType) {
    reporter.error('descriptor types do not match. {parent} is "' + parentType + '", {child} is "' + childType + '"');
  }

  switch (childType) {
    case 'data':
      checkDataDescriptors(parent, child, reporter);
      break;

    case 'accessor':
      checkAccessorDescriptors(parent, child, reporter);
      break;
  }
}

var suggestionTransforms = [function (key) {
  return key.toLowerCase();
}, function (key) {
  return key.toUpperCase();
}, function (key) {
  return key + 's';
}, function (key) {
  return key.slice(0, -1);
}, function (key) {
  return key.slice(1, key.length);
}];

function findPossibleAlternatives(superKlass, key) {
  for (var i = 0, l = suggestionTransforms.length; i < l; i++) {
    var fn = suggestionTransforms[i];
    var suggestion = fn(key);

    if (suggestion in superKlass) {
      return suggestion;
    }
  }

  return null;
}

function handleDescriptor(target, key, descriptor) {
  descriptor.key = key;
  var superKlass = Object.getPrototypeOf(target);
  var superDescriptor = Object.getOwnPropertyDescriptor(superKlass, key);
  var reporter = new SyntaxErrorReporter(superKlass, target, superDescriptor, descriptor);

  if (superDescriptor === undefined) {
    var suggestedKey = findPossibleAlternatives(superKlass, key);
    var suggestion = suggestedKey ? '\n\n  Did you mean "' + suggestedKey + '"?' : '';
    reporter.error('No descriptor matching {child} was found on the prototype chain.' + suggestion);
  }

  checkDescriptors(superDescriptor, descriptor, reporter);

  return descriptor;
}

function override() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = deprecate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var DEFAULT_MSG = 'This function will be removed in future versions.';

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      _ref2$ = _ref2[0],
      msg = _ref2$ === undefined ? DEFAULT_MSG : _ref2$,
      _ref2$2 = _ref2[1],
      options = _ref2$2 === undefined ? {} : _ref2$2;

  if (typeof descriptor.value !== 'function') {
    throw new SyntaxError('Only functions can be marked as deprecated');
  }

  var methodSignature = target.constructor.name + '#' + key;

  if (options.url) {
    msg += '\n\n    See ' + options.url + ' for more details.\n\n';
  }

  return _extends({}, descriptor, {
    value: function deprecationWrapper() {
      Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["h" /* warn */])('DEPRECATION ' + methodSignature + ': ' + msg);
      return descriptor.value.apply(this, arguments);
    }
  });
}

function deprecate() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = suppressWarnings;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



function suppressedWarningNoop() {
  // Warnings are currently suppressed via @suppressWarnings
}

function applyWithoutWarnings(context, fn, args) {
  if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) === 'object') {
    var nativeWarn = console.warn;
    console.warn = suppressedWarningNoop;
    var ret = fn.apply(context, args);
    console.warn = nativeWarn;
    return ret;
  } else {
    return fn.apply(context, args);
  }
}

function handleDescriptor(target, key, descriptor) {
  return _extends({}, descriptor, {
    value: function suppressWarningsWrapper() {
      return applyWithoutWarnings(this, descriptor.value, arguments);
    }
  });
}

function suppressWarnings() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = memoize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function toObject(cache, value) {
  if (value === Object(value)) {
    return value;
  }
  return cache[value] || (cache[value] = {});
}

function applyAndCache(context, fn, args, cache, signature) {
  var ret = fn.apply(context, args);
  cache[signature] = ret;
  return ret;
}

function metaForDescriptor(descriptor) {
  var fn = void 0,
      wrapKey = void 0;

  // This is ugly code, but way faster than other
  // ways I tried that *looked* pretty

  if (descriptor.value) {
    fn = descriptor.value;
    wrapKey = 'value';
  } else if (descriptor.get) {
    fn = descriptor.get;
    wrapKey = 'get';
  } else if (descriptor.set) {
    fn = descriptor.set;
    wrapKey = 'set';
  }

  return { fn: fn, wrapKey: wrapKey };
}

function handleDescriptor(target, key, descriptor) {
  var _metaForDescriptor = metaForDescriptor(descriptor),
      fn = _metaForDescriptor.fn,
      wrapKey = _metaForDescriptor.wrapKey;

  var argumentCache = new WeakMap();
  var signatureCache = Object.create(null);
  var primativeRefCache = Object.create(null);
  var argumentIdCounter = 0;

  return _extends({}, descriptor, _defineProperty({}, wrapKey, function memoizeWrapper() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var signature = '0';

    for (var i = 0, l = args.length; i < l; i++) {
      var arg = args[i];
      var argRef = toObject(primativeRefCache, arg);
      var argKey = argumentCache.get(argRef);

      if (argKey === undefined) {
        argKey = ++argumentIdCounter;
        argumentCache.set(argRef, argKey);
      }

      signature += argKey;
    }

    return signatureCache[signature] || applyAndCache(this, fn, arguments, signatureCache, signature);
  }));
}

function memoize() {
  Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["f" /* internalDeprecation */])('@memoize is deprecated and will be removed shortly. Use @memoize from lodash-decorators.\n\n  https://www.npmjs.com/package/lodash-decorators');

  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = autobind;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }


var defineProperty = Object.defineProperty,
    getPrototypeOf = Object.getPrototypeOf;


var mapStore = void 0;

function getBoundSuper(obj, fn) {
  if (typeof WeakMap === 'undefined') {
    throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()\n      See https://github.com/jayphelps/core-decorators.js/issues/20');
  }

  if (!mapStore) {
    mapStore = new WeakMap();
  }

  if (mapStore.has(obj) === false) {
    mapStore.set(obj, new WeakMap());
  }

  var superStore = mapStore.get(obj);

  if (superStore.has(fn) === false) {
    superStore.set(fn, Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["a" /* bind */])(fn, obj));
  }

  return superStore.get(fn);
}

function autobindClass(klass) {
  var descs = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["e" /* getOwnPropertyDescriptors */])(klass.prototype);
  var keys = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["d" /* getOwnKeys */])(descs);

  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    var desc = descs[key];

    if (typeof desc.value !== 'function' || key === 'constructor') {
      continue;
    }

    defineProperty(klass.prototype, key, autobindMethod(klass.prototype, key, desc));
  }
}

function autobindMethod(target, key, _ref) {
  var fn = _ref.value,
      configurable = _ref.configurable,
      enumerable = _ref.enumerable;

  if (typeof fn !== 'function') {
    throw new SyntaxError('@autobind can only be used on functions, not: ' + fn);
  }

  var constructor = target.constructor;


  return {
    configurable: configurable,
    enumerable: enumerable,

    get: function get() {
      // Class.prototype.key lookup
      // Someone accesses the property directly on the prototype on which it is
      // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
      if (this === target) {
        return fn;
      }

      // Class.prototype.key lookup
      // Someone accesses the property directly on a prototype but it was found
      // up the chain, not defined directly on it
      // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
      if (this.constructor !== constructor && getPrototypeOf(this).constructor === constructor) {
        return fn;
      }

      // Autobound method calling super.sameMethod() which is also autobound and so on.
      if (this.constructor !== constructor && key in this.constructor.prototype) {
        return getBoundSuper(this, fn);
      }

      var boundFn = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["a" /* bind */])(fn, this);

      defineProperty(this, key, {
        configurable: true,
        writable: true,
        // NOT enumerable when it's a bound method
        enumerable: false,
        value: boundFn
      });

      return boundFn;
    },

    set: Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["b" /* createDefaultSetter */])(key)
  };
}

function handle(args) {
  if (args.length === 1) {
    return autobindClass.apply(undefined, _toConsumableArray(args));
  } else {
    return autobindMethod.apply(undefined, _toConsumableArray(args));
  }
}

function autobind() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 0) {
    return function () {
      return handle(arguments);
    };
  } else {
    return handle(args);
  }
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = readonly;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);


function handleDescriptor(target, key, descriptor) {
  descriptor.writable = false;
  return descriptor;
}

function readonly() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = enumerable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);


function handleDescriptor(target, key, descriptor) {
  descriptor.enumerable = true;
  return descriptor;
}

function enumerable() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = nonenumerable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);


function handleDescriptor(target, key, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}

function nonenumerable() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = nonconfigurable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);


function handleDescriptor(target, key, descriptor) {
  descriptor.configurable = false;
  return descriptor;
}

function nonconfigurable() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = debounce;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var DEFAULT_TIMEOUT = 300;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      _ref2$ = _ref2[0],
      wait = _ref2$ === undefined ? DEFAULT_TIMEOUT : _ref2$,
      _ref2$2 = _ref2[1],
      immediate = _ref2$2 === undefined ? false : _ref2$2;

  var callback = descriptor.value;

  if (typeof callback !== 'function') {
    throw new SyntaxError('Only functions can be debounced');
  }

  return _extends({}, descriptor, {
    value: function value() {
      var _this = this;

      var _metaFor = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["g" /* metaFor */])(this),
          debounceTimeoutIds = _metaFor.debounceTimeoutIds;

      var timeout = debounceTimeoutIds[key];
      var callNow = immediate && !timeout;
      var args = arguments;

      clearTimeout(timeout);

      debounceTimeoutIds[key] = setTimeout(function () {
        delete debounceTimeoutIds[key];
        if (!immediate) {
          callback.apply(_this, args);
        }
      }, wait);

      if (callNow) {
        callback.apply(this, args);
      }
    }
  });
}

function debounce() {
  Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["f" /* internalDeprecation */])('@debounce is deprecated and will be removed shortly. Use @debounce from lodash-decorators.\n\n  https://www.npmjs.com/package/lodash-decorators');

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throttle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var DEFAULT_TIMEOUT = 300;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      _ref2$ = _ref2[0],
      wait = _ref2$ === undefined ? DEFAULT_TIMEOUT : _ref2$,
      _ref2$2 = _ref2[1],
      options = _ref2$2 === undefined ? {} : _ref2$2;

  var callback = descriptor.value;

  if (typeof callback !== 'function') {
    throw new SyntaxError('Only functions can be throttled');
  }

  if (options.leading !== false) {
    options.leading = true;
  }

  if (options.trailing !== false) {
    options.trailing = true;
  }

  return _extends({}, descriptor, {
    value: function value() {
      var _this = this;

      var meta = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["g" /* metaFor */])(this);
      var throttleTimeoutIds = meta.throttleTimeoutIds,
          throttlePreviousTimestamps = meta.throttlePreviousTimestamps;

      var timeout = throttleTimeoutIds[key];
      // last execute timestamp
      var previous = throttlePreviousTimestamps[key] || 0;
      var now = Date.now();

      if (options.trailing) {
        meta.throttleTrailingArgs = arguments;
      }

      // if first be called and disable the execution on the leading edge
      // set last execute timestamp to now
      if (!previous && options.leading === false) {
        previous = now;
      }

      var remaining = wait - (now - previous);

      if (remaining <= 0) {
        clearTimeout(timeout);
        delete throttleTimeoutIds[key];
        throttlePreviousTimestamps[key] = now;
        callback.apply(this, arguments);
      } else if (!timeout && options.trailing) {
        throttleTimeoutIds[key] = setTimeout(function () {
          throttlePreviousTimestamps[key] = options.leading === false ? 0 : Date.now();
          delete throttleTimeoutIds[key];
          callback.apply(_this, meta.throttleTrailingArgs);
          // don't leak memory!
          meta.throttleTrailingArgs = null;
        }, remaining);
      }
    }
  });
}

function throttle() {
  Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["f" /* internalDeprecation */])('@throttle is deprecated and will be removed shortly. Use @throttle from lodash-decorators.\n\n  https://www.npmjs.com/package/lodash-decorators');

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = decorate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }


var defineProperty = Object.defineProperty;


function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _toArray(_ref),
      decorator = _ref2[0],
      args = _ref2.slice(1);

  var configurable = descriptor.configurable,
      enumerable = descriptor.enumerable,
      writable = descriptor.writable;

  var originalGet = descriptor.get;
  var originalSet = descriptor.set;
  var originalValue = descriptor.value;
  var isGetter = !!originalGet;

  return {
    configurable: configurable,
    enumerable: enumerable,
    get: function get() {
      var fn = isGetter ? originalGet.call(this) : originalValue;
      var value = decorator.call.apply(decorator, [this, fn].concat(_toConsumableArray(args)));

      if (isGetter) {
        return value;
      } else {
        var desc = {
          configurable: configurable,
          enumerable: enumerable
        };

        desc.value = value;
        desc.writable = writable;

        defineProperty(this, key, desc);

        return value;
      }
    },

    set: isGetter ? originalSet : Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["b" /* createDefaultSetter */])()
  };
}

function decorate() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var defineProperty = Object.defineProperty,
    getPrototypeOf = Object.getPrototypeOf;


function buggySymbol(symbol) {
  return Object.prototype.toString.call(symbol) === '[object Symbol]' && (typeof symbol === 'undefined' ? 'undefined' : _typeof(symbol)) === 'object';
}

function hasProperty(prop, obj) {
  // We have to traverse manually prototypes' chain for polyfilled ES6 Symbols
  // like "in" operator does.
  // I.e.: Babel 5 Symbol polyfill stores every created symbol in Object.prototype.
  // That's why we cannot use construction like "prop in obj" to check, if needed
  // prop actually exists in given object/prototypes' chain.
  if (buggySymbol(prop)) {
    do {
      if (obj === Object.prototype) {
        // Polyfill assigns undefined as value for stored symbol key.
        // We can assume in this special case if there is nothing assigned it doesn't exist.
        return typeof obj[prop] !== 'undefined';
      }
      if (obj.hasOwnProperty(prop)) {
        return true;
      }
    } while (obj = getPrototypeOf(obj));
    return false;
  } else {
    return prop in obj;
  }
}

function handleClass(target, mixins) {
  if (!mixins.length) {
    throw new SyntaxError('@mixin() class ' + target.name + ' requires at least one mixin as an argument');
  }

  for (var i = 0, l = mixins.length; i < l; i++) {
    var descs = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["e" /* getOwnPropertyDescriptors */])(mixins[i]);
    var keys = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["d" /* getOwnKeys */])(descs);

    for (var j = 0, k = keys.length; j < k; j++) {
      var key = keys[j];

      if (!hasProperty(key, target.prototype)) {
        defineProperty(target.prototype, key, descs[key]);
      }
    }
  }
}

function mixin() {
  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
    mixins[_key] = arguments[_key];
  }

  Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["f" /* internalDeprecation */])('@mixin is deprecated and will be removed shortly. Use @mixin from lodash-decorators.\n\n  https://www.npmjs.com/package/lodash-decorators');

  if (typeof mixins[0] === 'function') {
    return handleClass(mixins[0], []);
  } else {
    return function (target) {
      return handleClass(target, mixins);
    };
  }
}

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultConsole */
/* harmony export (immutable) */ __webpack_exports__["a"] = time;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var labels = {};

// Exported for mocking in tests
var defaultConsole = {
  time: console.time ? console.time.bind(console) : function (label) {
    labels[label] = new Date();
  },
  timeEnd: console.timeEnd ? console.timeEnd.bind(console) : function (label) {
    var timeNow = new Date();
    var timeTaken = timeNow - labels[label];
    delete labels[label];
    console.log(label + ': ' + timeTaken + 'ms');
  }
};

var count = 0;

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      _ref2$ = _ref2[0],
      prefix = _ref2$ === undefined ? null : _ref2$,
      _ref2$2 = _ref2[1],
      console = _ref2$2 === undefined ? defaultConsole : _ref2$2;

  var fn = descriptor.value;

  if (prefix === null) {
    prefix = target.constructor.name + '.' + key;
  }

  if (typeof fn !== 'function') {
    throw new SyntaxError('@time can only be used on functions, not: ' + fn);
  }

  return _extends({}, descriptor, {
    value: function value() {
      var label = prefix + '-' + count;
      count++;
      console.time(label);

      try {
        return fn.apply(this, arguments);
      } finally {
        console.timeEnd(label);
      }
    }
  });
}

function time() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extendDescriptor;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


var getPrototypeOf = Object.getPrototypeOf,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;


function handleDescriptor(target, key, descriptor) {
  var superKlass = getPrototypeOf(target);
  var superDesc = getOwnPropertyDescriptor(superKlass, key);

  return _extends({}, superDesc, {
    value: descriptor.value,
    initializer: descriptor.initializer,
    get: descriptor.get || superDesc.get,
    set: descriptor.set || superDesc.set
  });
}

function extendDescriptor() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultConsole */
/* harmony export (immutable) */ __webpack_exports__["a"] = profile;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__private_utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



var oc = console;

// Exported for mocking in tests
var defaultConsole = {
  profile: console.profile ? Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["a" /* bind */])(console.profile, console) : function () {},
  profileEnd: console.profileEnd ? Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["a" /* bind */])(console.profileEnd, console) : function () {},
  warn: __WEBPACK_IMPORTED_MODULE_0__private_utils__["h" /* warn */]
};

function handleDescriptor(target, key, descriptor, _ref) {
  var _ref2 = _slicedToArray(_ref, 3),
      _ref2$ = _ref2[0],
      prefix = _ref2$ === undefined ? null : _ref2$,
      _ref2$2 = _ref2[1],
      onceThrottleOrFunction = _ref2$2 === undefined ? false : _ref2$2,
      _ref2$3 = _ref2[2],
      console = _ref2$3 === undefined ? defaultConsole : _ref2$3;

  if (!profile.__enabled) {
    if (!profile.__warned) {
      console.warn('console.profile is not supported. All @profile decorators are disabled.');
      profile.__warned = true;
    }
    return descriptor;
  }

  var fn = descriptor.value;

  if (prefix === null) {
    prefix = target.constructor.name + '.' + key;
  }

  if (typeof fn !== 'function') {
    throw new SyntaxError('@profile can only be used on functions, not: ' + fn);
  }

  return _extends({}, descriptor, {
    value: function value() {
      var now = Date.now();
      var meta = Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["g" /* metaFor */])(this);
      if (onceThrottleOrFunction === true && !meta.profileLastRan || onceThrottleOrFunction === false || typeof onceThrottleOrFunction === 'number' && now - meta.profileLastRan > onceThrottleOrFunction || typeof onceThrottleOrFunction === 'function' && onceThrottleOrFunction.apply(this, arguments)) {
        console.profile(prefix);
        meta.profileLastRan = now;
      }

      try {
        return fn.apply(this, arguments);
      } finally {
        console.profileEnd(prefix);
      }
    }
  });
}

function profile() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__private_utils__["c" /* decorate */])(handleDescriptor, args);
}

// Only Chrome, Firefox, and Edge support profile.
// Exposing properties for testing.
profile.__enabled = !!console.profile;
profile.__warned = false;

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyDecorators;
var defineProperty = Object.defineProperty,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;


function applyDecorators(Class, props) {
  var prototype = Class.prototype;


  for (var key in props) {
    var decorators = props[key];

    for (var i = 0, l = decorators.length; i < l; i++) {
      var decorator = decorators[i];

      defineProperty(prototype, key, decorator(prototype, key, getOwnPropertyDescriptor(prototype, key)));
    }
  }

  return Class;
}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(28)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(30)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var warning = __webpack_require__(6);

var ReactPropTypesSecret = __webpack_require__(4);
var checkPropTypes = __webpack_require__(29);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(3);
  var warning = __webpack_require__(6);
  var ReactPropTypesSecret = __webpack_require__(4);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var ReactPropTypesSecret = __webpack_require__(4);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ })
/******/ ]);
});