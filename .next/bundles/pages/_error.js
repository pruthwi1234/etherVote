
          window.__NEXT_REGISTER_PAGE('/_error', function() {
            var comp = module.exports =
webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.8' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(8);
var hide = __webpack_require__(9);
var has = __webpack_require__(11);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(38)('wks');
var uid = __webpack_require__(27);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var IE8_DOM_DEFINE = __webpack_require__(58);
var toPrimitive = __webpack_require__(35);
var dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(25);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(33);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(36);
var defined = __webpack_require__(33);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(85);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = __webpack_require__(126);
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(89)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(34)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(60);
var enumBugKeys = __webpack_require__(39);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var call = __webpack_require__(73);
var isArrayIter = __webpack_require__(74);
var anObject = __webpack_require__(7);
var toLength = __webpack_require__(30);
var getIterFn = __webpack_require__(51);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7);
var dPs = __webpack_require__(91);
var enumBugKeys = __webpack_require__(39);
var IE_PROTO = __webpack_require__(37)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(47)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(72).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(95);
var global = __webpack_require__(3);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(14);
var TO_STRING_TAG = __webpack_require__(2)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(32);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(24);
var TAG = __webpack_require__(2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(19);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(59);
var hide = __webpack_require__(9);
var Iterators = __webpack_require__(14);
var $iterCreate = __webpack_require__(90);
var setToStringTag = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(61);
var ITERATOR = __webpack_require__(2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(24);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(38)('keys');
var uid = __webpack_require__(27);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(19) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(52);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(2);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(27)('meta');
var isObject = __webpack_require__(6);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(5).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(10)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var LIBRARY = __webpack_require__(19);
var wksExt = __webpack_require__(43);
var defineProperty = __webpack_require__(5).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(119);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(123);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(52);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {



/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(9);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(31);
var ITERATOR = __webpack_require__(2)('iterator');
var Iterators = __webpack_require__(14);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(110);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(112);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  var invariant = __webpack_require__(66);
  var warning = __webpack_require__(67);
  var ReactPropTypesSecret = __webpack_require__(69);
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
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
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


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
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
  module.exports = __webpack_require__(127)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require('./factoryWithThrowingShims')();
}


/***/ }),
/* 56 */,
/* 57 */,
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(10)(function () {
  return Object.defineProperty(__webpack_require__(47)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(13);
var arrayIndexOf = __webpack_require__(92)(false);
var IE_PROTO = __webpack_require__(37)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(12);
var IE_PROTO = __webpack_require__(37)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(24);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(60);
var hiddenKeys = __webpack_require__(39).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(29);
var createDesc = __webpack_require__(20);
var toIObject = __webpack_require__(13);
var toPrimitive = __webpack_require__(35);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(58);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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

if (true) {
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

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(68);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
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

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(169), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(14);
var ITERATOR = __webpack_require__(2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var fails = __webpack_require__(10);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadGetInitialProps = undefined;

var _regenerator = __webpack_require__(86);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(87);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = __webpack_require__(76);

var _assign2 = _interopRequireDefault(_assign);

var loadGetInitialProps = exports.loadGetInitialProps = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(Component, ctx) {
    var props, compName, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (Component.getInitialProps) {
              _context.next = 2;
              break;
            }

            return _context.abrupt('return', {});

          case 2:
            _context.next = 4;
            return Component.getInitialProps(ctx);

          case 4:
            props = _context.sent;

            if (!(!props && (!ctx.res || !ctx.res.finished))) {
              _context.next = 9;
              break;
            }

            compName = getDisplayName(Component);
            message = '"' + compName + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
            throw new Error(message);

          case 9:
            return _context.abrupt('return', props);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function loadGetInitialProps(_x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.warn = warn;
exports.execOnce = execOnce;
exports.deprecated = deprecated;
exports.printAndExit = printAndExit;
exports.getDisplayName = getDisplayName;
exports.getLocationOrigin = getLocationOrigin;
exports.getURL = getURL;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function warn(message) {
  if (true) {
    console.error(message);
  }
}

function execOnce(fn) {
  var _this = this;

  var used = false;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!used) {
      used = true;
      fn.apply(_this, args);
    }
  };
}

function deprecated(fn, message) {
  if (false) return fn;

  var warned = false;
  var newFn = function newFn() {
    if (!warned) {
      warned = true;
      console.error(message);
    }

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fn.apply(this, args);
  };

  // copy all properties
  (0, _assign2.default)(newFn, fn);

  return newFn;
}

function printAndExit(message) {
  var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  if (code === 0) {
    console.log(message);
  } else {
    console.error(message);
  }

  process.exit(code);
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Unknown';
}

function getLocationOrigin() {
  var _window$location = window.location,
      protocol = _window$location.protocol,
      hostname = _window$location.hostname,
      port = _window$location.port;

  return protocol + '//' + hostname + (port ? ':' + port : '');
}

function getURL() {
  var href = window.location.href;

  var origin = getLocationOrigin();
  return href.substring(origin.length);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(128)))

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(25);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var dP = __webpack_require__(5);
var DESCRIPTORS = __webpack_require__(4);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(176), __esModule: true };

/***/ }),
/* 81 */,
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(155);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 83 */,
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(98);
exports.encode = exports.stringify = __webpack_require__(99);


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(167);


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(70);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 88 */,
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32);
var defined = __webpack_require__(33);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(26);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(22);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(9)(IteratorPrototype, __webpack_require__(2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(7);
var getKeys = __webpack_require__(21);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13);
var toLength = __webpack_require__(30);
var toAbsoluteIndex = __webpack_require__(93);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(32);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(96);
var step = __webpack_require__(62);
var Iterators = __webpack_require__(14);
var toIObject = __webpack_require__(13);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(34)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 97 */,
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(4), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 104 */,
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(1);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(107) });


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(4);
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(29);
var toObject = __webpack_require__(12);
var IObject = __webpack_require__(36);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(10)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109);
module.exports = __webpack_require__(0).Object.getPrototypeOf;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(12);
var $getPrototypeOf = __webpack_require__(61);

__webpack_require__(75)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(28);
module.exports = __webpack_require__(43).f('iterator');


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(114);
__webpack_require__(48);
__webpack_require__(117);
__webpack_require__(118);
module.exports = __webpack_require__(0).Symbol;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(4);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(59);
var META = __webpack_require__(44).KEY;
var $fails = __webpack_require__(10);
var shared = __webpack_require__(38);
var setToStringTag = __webpack_require__(22);
var uid = __webpack_require__(27);
var wks = __webpack_require__(2);
var wksExt = __webpack_require__(43);
var wksDefine = __webpack_require__(45);
var enumKeys = __webpack_require__(115);
var isArray = __webpack_require__(63);
var anObject = __webpack_require__(7);
var isObject = __webpack_require__(6);
var toObject = __webpack_require__(12);
var toIObject = __webpack_require__(13);
var toPrimitive = __webpack_require__(35);
var createDesc = __webpack_require__(20);
var _create = __webpack_require__(26);
var gOPNExt = __webpack_require__(116);
var $GOPD = __webpack_require__(65);
var $GOPS = __webpack_require__(40);
var $DP = __webpack_require__(5);
var $keys = __webpack_require__(21);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(64).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(29).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(19)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(21);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(29);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(13);
var gOPN = __webpack_require__(64).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45)('asyncIterator');


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45)('observable');


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(121);
module.exports = __webpack_require__(0).Object.setPrototypeOf;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(1);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(122).set });


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(6);
var anObject = __webpack_require__(7);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(8)(Function.call, __webpack_require__(65).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(125);
var $Object = __webpack_require__(0).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(1);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(26) });


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__(53);
var checkPropTypes = __webpack_require__(54);

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.8.6';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;

var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

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

var validateFormat = function () {};

{
  validateFormat = function (format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error = void 0;
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

// Relying on the `invariant()` implementation lets us
// preserve the format and params in the www builds.

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warningWithoutStack = function () {};

{
  warningWithoutStack = function (condition, format) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (args.length > 8) {
      // Check before the condition to catch violations early.
      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
    }
    if (condition) {
      return;
    }
    if (typeof console !== 'undefined') {
      var argsWithFormat = args.map(function (item) {
        return '' + item;
      });
      argsWithFormat.unshift('Warning: ' + format);

      // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610
      Function.prototype.apply.call(console.error, console, argsWithFormat);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  };
}

var warningWithoutStack$1 = warningWithoutStack;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warningWithoutStack$1(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var emptyObject = {};
{
  Object.freeze(emptyObject);
}

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };
  {
    Object.seal(refObject);
  }
  return refObject;
}

/**
 * Keeps track of the current dispatcher.
 */
var ReactCurrentDispatcher = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

var describeComponentFrame = function (name, source, ownerName) {
  var sourceInfo = '';
  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');
    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);
        if (match) {
          var pathBeforeSlash = match[1];
          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }
    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }
  return '\n    in ' + (name || 'Unknown') + sourceInfo;
};

var Resolved = 1;


function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + '(' + functionName + ')' : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }
  {
    if (typeof type.tag === 'number') {
      warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }
  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case REACT_CONCURRENT_MODE_TYPE:
      return 'ConcurrentMode';
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';
    case REACT_PORTAL_TYPE:
      return 'Portal';
    case REACT_PROFILER_TYPE:
      return 'Profiler';
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';
    case REACT_SUSPENSE_TYPE:
      return 'Suspense';
  }
  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';
      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';
      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);
          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }
        }
    }
  }
  return null;
}

var ReactDebugCurrentFrame = {};

var currentlyValidatingElement = null;

function setCurrentlyValidatingElement(element) {
  {
    currentlyValidatingElement = element;
  }
}

{
  // Stack implementation injected by the current renderer.
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = '';

    // Add an extra top frame while an element is being validated
    if (currentlyValidatingElement) {
      var name = getComponentName(currentlyValidatingElement.type);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
    }

    // Delegate to the injected renderer-specific implementation
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentOwner: ReactCurrentOwner,
  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
  assign: _assign
};

{
  _assign(ReactSharedInternals, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = warningWithoutStack$1;

{
  warning = function (condition, format) {
    if (condition) {
      return;
    }
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();
    // eslint-disable-next-line react-internal/warning-and-invariant-args

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    warningWithoutStack$1.apply(undefined, [false, format + '%s'].concat(args, [stack]));
  };
}

var warning$1 = warning;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown = void 0;
var specialPropRefWarningShown = void 0;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warningWithoutStack$1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warningWithoutStack$1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

  var propName = void 0;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps = void 0;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child = void 0;
  var nextName = void 0;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step = void 0;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
      return c;
    });
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children) {
  return traverseAllChildren(children, function () {
    return null;
  }, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
    return child;
  });
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warningWithoutStack$1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };

  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    };
    // $FlowFixMe: Flow complains about not setting a value, which is intentional here
    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;
            warning$1(false, 'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }
          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;
            warning$1(false, 'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }
          return context.Consumer;
        }
      }
    });
    // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty
    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

function lazy(ctor) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null
  };

  {
    // In production, this would just set it on the object.
    var defaultProps = void 0;
    var propTypes = void 0;
    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          warning$1(false, 'React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          defaultProps = newDefaultProps;
          // Match production behavior more closely:
          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          warning$1(false, 'React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');
          propTypes = newPropTypes;
          // Match production behavior more closely:
          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
  }

  return lazyType;
}

function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      warningWithoutStack$1(false, 'forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
    } else if (typeof render !== 'function') {
      warningWithoutStack$1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      !(
      // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
      render.length === 0 || render.length === 2) ? warningWithoutStack$1(false, 'forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.') : void 0;
    }

    if (render != null) {
      !(render.defaultProps == null && render.propTypes == null) ? warningWithoutStack$1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
    }
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      warningWithoutStack$1(false, 'memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
}

function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;
  !(dispatcher !== null) ? invariant(false, 'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.') : void 0;
  return dispatcher;
}

function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();
  {
    !(unstable_observedBits === undefined) ? warning$1(false, 'useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '') : void 0;

    // TODO: add a more generic warning for invalid values.
    if (Context._context !== undefined) {
      var realContext = Context._context;
      // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.
      if (realContext.Consumer === Context) {
        warning$1(false, 'Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        warning$1(false, 'Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }
  return dispatcher.useContext(Context, unstable_observedBits);
}

function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}

function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}

function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}

function useEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, inputs);
}

function useLayoutEffect(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, inputs);
}

function useCallback(callback, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, inputs);
}

function useMemo(create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, inputs);
}

function useImperativeHandle(ref, create, inputs) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, inputs);
}

function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

var propTypesMisspellWarningShown = void 0;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner.type) + '.';
  }

  setCurrentlyValidatingElement(element);
  {
    warning$1(false, 'Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
  }
  setCurrentlyValidatingElement(null);
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step = void 0;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var type = element.type;
  if (type === null || type === undefined || typeof type === 'string') {
    return;
  }
  var name = getComponentName(type);
  var propTypes = void 0;
  if (typeof type === 'function') {
    propTypes = type.propTypes;
  } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||
  // Note: Memo only checks outer props here.
  // Inner props are checked in the reconciler.
  type.$$typeof === REACT_MEMO_TYPE)) {
    propTypes = type.propTypes;
  } else {
    return;
  }
  if (propTypes) {
    setCurrentlyValidatingElement(element);
    checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
    setCurrentlyValidatingElement(null);
  } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warningWithoutStack$1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof type.getDefaultProps === 'function') {
    !type.getDefaultProps.isReactClassApproved ? warningWithoutStack$1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  setCurrentlyValidatingElement(fragment);

  var keys = Object.keys(fragment.props);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key !== 'children' && key !== 'key') {
      warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
      break;
    }
  }

  if (fragment.ref !== null) {
    warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');
  }

  setCurrentlyValidatingElement(null);
}

function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);

  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString = void 0;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;
  // Legacy hook: remove it
  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

// Helps identify side effects in begin-phase lifecycle hooks and setState reducers:


// In some cases, StrictMode should also double-render lifecycles.
// This can be confusing for tests though,
// And it can be bad for performance in production.
// This feature flag can be used to control the behavior:


// To preserve the "Pause on caught exceptions" behavior of the debugger, we
// replay the begin phase of a failed component inside invokeGuardedCallback.


// Warn about deprecated, async-unsafe lifecycles; relates to RFC #6:


// Gather advanced timing metrics for Profiler subtrees.


// Trace which interactions trigger each commit.


// Only used in www builds.
 // TODO: true? Here it might just be false.

// Only used in www builds.


// Only used in www builds.


// React Fire: prevent the value and checked attributes from syncing
// with their related DOM properties


// These APIs will no longer be "unstable" in the upcoming 16.7 release,
// Control this behavior with a flag to support 16.6 minor releases in the meanwhile.
var enableStableConcurrentModeAPIs = false;

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  createRef: createRef,
  Component: Component,
  PureComponent: PureComponent,

  createContext: createContext,
  forwardRef: forwardRef,
  lazy: lazy,
  memo: memo,

  useCallback: useCallback,
  useContext: useContext,
  useEffect: useEffect,
  useImperativeHandle: useImperativeHandle,
  useDebugValue: useDebugValue,
  useLayoutEffect: useLayoutEffect,
  useMemo: useMemo,
  useReducer: useReducer,
  useRef: useRef,
  useState: useState,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,
  unstable_Profiler: REACT_PROFILER_TYPE,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
};

// Note: some APIs are added with feature flags.
// Make sure that stable builds for open source
// don't modify the React object to avoid deopts.
// Also let's not expose their names in stable builds.

if (enableStableConcurrentModeAPIs) {
  React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  React.Profiler = REACT_PROFILER_TYPE;
  React.unstable_ConcurrentMode = undefined;
  React.unstable_Profiler = undefined;
}



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3.default || React$3;

module.exports = react;
  })();
}


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(68);
var invariant = __webpack_require__(66);
var warning = __webpack_require__(67);
var assign = __webpack_require__(53);

var ReactPropTypesSecret = __webpack_require__(69);
var checkPropTypes = __webpack_require__(54);

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
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
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
    if (true) {
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
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
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
       true ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
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
       true ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
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

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
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


/***/ }),
/* 128 */
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
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(7);
var aFunction = __webpack_require__(25);
var SPECIES = __webpack_require__(2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(8);
var invoke = __webpack_require__(171);
var html = __webpack_require__(72);
var cel = __webpack_require__(47);
var global = __webpack_require__(3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(24)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7);
var isObject = __webpack_require__(6);
var newPromiseCapability = __webpack_require__(78);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(5).f;
var create = __webpack_require__(26);
var redefineAll = __webpack_require__(50);
var ctx = __webpack_require__(8);
var anInstance = __webpack_require__(49);
var forOf = __webpack_require__(23);
var $iterDefine = __webpack_require__(34);
var step = __webpack_require__(62);
var setSpecies = __webpack_require__(79);
var DESCRIPTORS = __webpack_require__(4);
var fastKey = __webpack_require__(44).fastKey;
var validate = __webpack_require__(71);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var $export = __webpack_require__(1);
var meta = __webpack_require__(44);
var fails = __webpack_require__(10);
var hide = __webpack_require__(9);
var redefineAll = __webpack_require__(50);
var forOf = __webpack_require__(23);
var anInstance = __webpack_require__(49);
var isObject = __webpack_require__(6);
var setToStringTag = __webpack_require__(22);
var dP = __webpack_require__(5).f;
var each = __webpack_require__(135)(0);
var DESCRIPTORS = __webpack_require__(4);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(8);
var IObject = __webpack_require__(36);
var toObject = __webpack_require__(12);
var toLength = __webpack_require__(30);
var asc = __webpack_require__(136);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(137);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(6);
var isArray = __webpack_require__(63);
var SPECIES = __webpack_require__(2)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(31);
var from = __webpack_require__(139);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(23);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(1);
var aFunction = __webpack_require__(25);
var ctx = __webpack_require__(8);
var forOf = __webpack_require__(23);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(156), __esModule: true };

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(157);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(8);
var $export = __webpack_require__(1);
var toObject = __webpack_require__(12);
var call = __webpack_require__(73);
var isArrayIter = __webpack_require__(74);
var toLength = __webpack_require__(30);
var createProperty = __webpack_require__(158);
var getIterFn = __webpack_require__(51);

$export($export.S + $export.F * !__webpack_require__(94)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5);
var createDesc = __webpack_require__(20);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(168);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 168 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48);
__webpack_require__(18);
__webpack_require__(28);
__webpack_require__(170);
__webpack_require__(174);
__webpack_require__(175);
module.exports = __webpack_require__(0).Promise;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(19);
var global = __webpack_require__(3);
var ctx = __webpack_require__(8);
var classof = __webpack_require__(31);
var $export = __webpack_require__(1);
var isObject = __webpack_require__(6);
var aFunction = __webpack_require__(25);
var anInstance = __webpack_require__(49);
var forOf = __webpack_require__(23);
var speciesConstructor = __webpack_require__(129);
var task = __webpack_require__(130).set;
var microtask = __webpack_require__(172)();
var newPromiseCapabilityModule = __webpack_require__(78);
var perform = __webpack_require__(131);
var userAgent = __webpack_require__(173);
var promiseResolve = __webpack_require__(132);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(50)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(22)($Promise, PROMISE);
__webpack_require__(79)(PROMISE);
Wrapper = __webpack_require__(0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(94)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 171 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var macrotask = __webpack_require__(130).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(24)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(1);
var core = __webpack_require__(0);
var global = __webpack_require__(3);
var speciesConstructor = __webpack_require__(129);
var promiseResolve = __webpack_require__(132);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(1);
var newPromiseCapability = __webpack_require__(78);
var perform = __webpack_require__(131);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48);
__webpack_require__(18);
__webpack_require__(28);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
module.exports = __webpack_require__(0).Set;


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(133);
var validate = __webpack_require__(71);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(134)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(1);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(138)('Set') });


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(140)('Set');


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(141)('Set');


/***/ }),
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _set = __webpack_require__(80);

var _set2 = _interopRequireDefault(_set);

var _toConsumableArray2 = __webpack_require__(82);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(41);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.defaultHead = defaultHead;

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(55);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sideEffect = __webpack_require__(190);

var _sideEffect2 = _interopRequireDefault(_sideEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Head = function (_React$Component) {
  (0, _inherits3.default)(Head, _React$Component);

  function Head() {
    (0, _classCallCheck3.default)(this, Head);
    return (0, _possibleConstructorReturn3.default)(this, (Head.__proto__ || (0, _getPrototypeOf2.default)(Head)).apply(this, arguments));
  }

  (0, _createClass3.default)(Head, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return Head;
}(_react2.default.Component);

Head.contextTypes = {
  headManager: _propTypes2.default.object
};
function defaultHead() {
  return [_react2.default.createElement('meta', { charSet: 'utf-8', className: 'next-head' })];
}

function reduceComponents(components) {
  var _components$map$map$r;

  return (_components$map$map$r = components.map(function (c) {
    return c.props.children;
  }).map(function (children) {
    return _react2.default.Children.toArray(children);
  }).reduce(function (a, b) {
    return a.concat(b);
  }, []).reverse()).concat.apply(_components$map$map$r, (0, _toConsumableArray3.default)(defaultHead())).filter(function (c) {
    return !!c;
  }).filter(unique()).reverse().map(function (c) {
    var className = (c.className ? c.className + ' ' : '') + 'next-head';
    return _react2.default.cloneElement(c, { className: className });
  });
}

function mapOnServer(head) {
  return head;
}

function onStateChange(head) {
  if (this.context && this.context.headManager) {
    this.context.headManager.updateHead(head);
  }
}

var METATYPES = ['name', 'httpEquiv', 'charSet', 'itemProp', 'property'];

// returns a function for filtering head child elements
// which shouldn't be duplicated, like <title/>.

function unique() {
  var tags = new _set2.default();
  var metaTypes = new _set2.default();
  var metaCategories = {};

  return function (h) {
    switch (h.type) {
      case 'title':
      case 'base':
        if (tags.has(h.type)) return false;
        tags.add(h.type);
        break;
      case 'meta':
        for (var i = 0, len = METATYPES.length; i < len; i++) {
          var metatype = METATYPES[i];
          if (!h.props.hasOwnProperty(metatype)) continue;

          if (metatype === 'charSet') {
            if (metaTypes.has(metatype)) return false;
            metaTypes.add(metatype);
          } else {
            var category = h.props[metatype];
            var categories = metaCategories[metatype] || new _set2.default();
            if (categories.has(category)) return false;
            categories.add(category);
            metaCategories[metatype] = categories;
          }
        }
        break;
    }
    return true;
  };
}

exports.default = (0, _sideEffect2.default)(reduceComponents, onStateChange, mapOnServer)(Head);

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(41);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _toConsumableArray2 = __webpack_require__(82);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _set = __webpack_require__(80);

var _set2 = _interopRequireDefault(_set);

exports.default = withSideEffect;

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _utils = __webpack_require__(77);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withSideEffect(reduceComponentsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reduceComponentsToState !== 'function') {
    throw new Error('Expected reduceComponentsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = new _set2.default();
    var state = void 0;

    function emitChange(component) {
      state = reduceComponentsToState([].concat((0, _toConsumableArray3.default)(mountedInstances)));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient.call(component, state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      (0, _inherits3.default)(SideEffect, _Component);

      function SideEffect() {
        (0, _classCallCheck3.default)(this, SideEffect);
        return (0, _possibleConstructorReturn3.default)(this, (SideEffect.__proto__ || (0, _getPrototypeOf2.default)(SideEffect)).apply(this, arguments));
      }

      (0, _createClass3.default)(SideEffect, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          mountedInstances.add(this);
          emitChange(this);
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          emitChange(this);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          mountedInstances.delete(this);
          emitChange(this);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(
            WrappedComponent,
            null,
            this.props.children
          );
        }
      }], [{
        key: 'peek',
        value: function peek() {
          return state;
        }

        // Expose canUseDOM so tests can monkeypatch it

        // Try to use displayName of wrapped component

      }, {
        key: 'rewind',
        value: function rewind() {
          if (SideEffect.canUseDOM) {
            throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
          }

          var recordedState = state;
          state = undefined;
          mountedInstances.clear();
          return recordedState;
        }
      }]);
      return SideEffect;
    }(_react.Component);

    SideEffect.displayName = 'SideEffect(' + (0, _utils.getDisplayName)(WrappedComponent) + ')';
    SideEffect.contextTypes = WrappedComponent.contextTypes;
    SideEffect.canUseDOM = typeof window !== 'undefined';


    return SideEffect;
  };
}

/***/ }),
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(364);


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

module.exports = __webpack_require__(365);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcbmV4dFxcZGlzdFxccGFnZXNcXF9lcnJvci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEFBQVAsVUFBaUIsQUFBakIiLCJmaWxlIjoiX2Vycm9yLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6IkM6L1VzZXJzL3VzZXIvRGVza3RvcC9FdGhlclZvdGUifQ==
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(84)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/_error")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(41);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(15);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(16);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(42);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(17);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(55);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _httpStatus = __webpack_require__(366);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _head = __webpack_require__(189);

var _head2 = _interopRequireDefault(_head);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = function (_React$Component) {
  (0, _inherits3.default)(Error, _React$Component);

  function Error() {
    (0, _classCallCheck3.default)(this, Error);
    return (0, _possibleConstructorReturn3.default)(this, (Error.__proto__ || (0, _getPrototypeOf2.default)(Error)).apply(this, arguments));
  }

  (0, _createClass3.default)(Error, [{
    key: 'render',
    value: function render() {
      var statusCode = this.props.statusCode;

      var title = statusCode === 404 ? 'This page could not be found' : _httpStatus2.default[statusCode] || 'An unexpected error has occurred';

      return _react2.default.createElement(
        'div',
        { style: styles.error },
        _react2.default.createElement(
          _head2.default,
          null,
          _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' })
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: 'body { margin: 0 }' } }),
          statusCode ? _react2.default.createElement(
            'h1',
            { style: styles.h1 },
            statusCode
          ) : null,
          _react2.default.createElement(
            'div',
            { style: styles.desc },
            _react2.default.createElement(
              'h2',
              { style: styles.h2 },
              title,
              '.'
            )
          )
        )
      );
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var res = _ref.res,
          err = _ref.err;

      var statusCode = res ? res.statusCode : err ? err.statusCode : null;
      return { statusCode: statusCode };
    }
  }]);
  return Error;
}(_react2.default.Component);

Error.propTypes = {
  statusCode: _propTypes2.default.number
};
exports.default = Error;


var styles = {
  error: {
    color: '#000',
    background: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  desc: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: '49px',
    verticalAlign: 'middle'
  },

  h1: {
    display: 'inline-block',
    borderRight: '1px solid rgba(0, 0, 0,.3)',
    margin: 0,
    marginRight: '20px',
    padding: '10px 23px 10px 0',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top'
  },

  h2: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0
  }
};

/***/ }),
/* 366 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.10.0
module.exports = {
  100: 'Continue',
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi Status',
  208: 'Already Reported',
  226: 'IM Used',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: 'Switch Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Time-out',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Large',
  415: 'Unsupported Media Type',
  416: 'Requested Range not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot',
  421: 'Misdirected Request',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  451: 'Unavailable For Legal Reasons',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Time-out',
  505: 'HTTP Version not Supported',
  506: 'Variant Also Negotiates',
  507: 'Insufficient Storage',
  508: 'Loop Detected',
  510: 'Not Extended',
  511: 'Network Authentication Required',
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTI_STATUS: 207,
  ALREADY_REPORTED: 208,
  IM_USED: 226,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  SWITCH_PROXY: 306,
  TEMPORARY_REDIRECT: 307,
  PERMANENT_REDIRECT: 308,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  REQUEST_ENTITY_TOO_LARGE: 413,
  REQUEST_URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  REQUESTED_RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_ENTITY: 422,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NOT_EXTENDED: 510,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};


/***/ })
],[363]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlc1xccGFnZXNcXF9lcnJvci5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcz9mMzBkOTY2Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzPzlhZDMyYWQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MuanM/MGFlY2EzZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcz81NDQwNzY5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanM/NTQ0MDc2OSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcz81NDQwNzY5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzPzU0NDA3NjkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanM/NTQ0MDc2OSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcz8xYTMwOTRlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcz8xYTMwOTRlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanM/MWEzMDk0ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcz82ZGMxYzcxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzPzZkYzFjNzEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzPzZkYzFjNzEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanM/NmRjMWM3MSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzPzZkYzFjNzEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcz82ZGMxYzcxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWFjdC9pbmRleC5qcz82ZGMxYzcxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzPzZkYzFjNzEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzPzZkYzFjNzEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzP2E1MzE0ZjEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcz84YjQ3NTY3Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXRvLXN0cmluZy10YWcuanM/ZjE5NmZmZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Zvci1vZi5qcz9mMTk2ZmZlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzP2YxOTZmZmUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzP2YxOTZmZmUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzP2YxOTZmZmUiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanM/ZjE5NmZmZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qcz9mMTk2ZmZlIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcz80Y2Q5YzBkIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzPzRjZDljMGQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzPzRjZDljMGQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzPzRjZDljMGQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzPzRjZDljMGQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcz80Y2Q5YzBkIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzPzNjYjM1NzMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzPzNjYjM1NzMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzPzNjYjM1NzMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanM/M2NiMzU3MyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanM/M2NiMzU3MyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzP2EzMmQ1ZjEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcz9hMzJkNWYxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcz81MWY0NGM4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcz81MWY0NGM4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcz81MWY0NGM4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcz81MWY0NGM4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanM/NTFmNDRjOCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanM/NTFmNDRjOCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLWluc3RhbmNlLmpzPzM2ZGFmMWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS1hbGwuanM/MzZkYWYxYyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzPzM2ZGFmMWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90eXBlb2YuanM/MzZkYWYxYyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcz8zNmRhZjFjIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzPzM2ZGFmMWMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanM/MzZkYWYxYyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzPzliMWY4YjMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcz85YjFmOGIzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanM/N2QwZmQ3ZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanM/ZDZkYjllMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcz9iNWZjN2M2Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanM/YjVmYzdjNiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzP2I1ZmM3YzYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcz9iNWZjN2M2Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanM/MDU2NjYwOSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcz8wNTY2NjA5Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzPzA1NjY2MDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzPzA1NjY2MDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzPzA1NjY2MDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL192YWxpZGF0ZS1jb2xsZWN0aW9uLmpzPzA1NjY2MDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzPzA1NjY2MDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanM/MDU2NjYwOSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanM/N2U2YzljMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanM/N2U2YzljMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanM/N2U2YzljMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2xpYi91dGlscy5qcz83ZTZjOWMxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbmV3LXByb21pc2UtY2FwYWJpbGl0eS5qcz83ZTZjOWMxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXNwZWNpZXMuanM/N2U2YzljMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3NldC5qcz83ZTZjOWMxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanM/NzdhYTY0OSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzP2NiM2Q5N2QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzP2NiM2Q5N2QiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanM/MDU0OTk1ZCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3IuanM/MDU0OTk1ZCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qcz8wNTQ5OTVkIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanM/MDU0OTk1ZCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanM/MDU0OTk1ZCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzPzA1NDk5NWQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcz8wNTQ5OTVkIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanM/MDU0OTk1ZCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzPzM0YzIyNWQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanM/MzRjMjI1ZCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qcz8yZDkzYjMxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzPzJkOTNiMzEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzPzJkOTNiMzEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzPzRkNTBkYjgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzPzRkNTBkYjgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzPzRkNTBkYjgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzPzRkNTBkYjgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcz80ZDUwZGI4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanM/NGQ1MGRiOCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcz80ZDUwZGI4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzPzIzOGM3NWIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanM/MjM4Yzc1YiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qcz8yMzhjNzViIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzPzIzOGM3NWIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanM/MjM4Yzc1YiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qcz8yMzhjNzViIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzPzIzOGM3NWIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcz8zZjhjNWEwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanM/M2Y4YzVhMCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzPzNmOGM1YTAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcz8zZjhjNWEwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzPzNmOGM1YTAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzPzNmOGM1YTAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzPzNmOGM1YTAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlLmpzPzNmOGM1YTAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlYWN0L2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcz8zZjhjNWEwIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzP2ViMTk4M2YiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanM/ZWIxOTgzZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanM/ZWIxOTgzZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanM/ZWIxOTgzZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanM/NWJhNzMzMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb21pc2UtcmVzb2x2ZS5qcz81YmE3MzMxIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi1zdHJvbmcuanM/NWJhNzMzMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvbGxlY3Rpb24uanM/NWJhNzMzMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanM/NWJhNzMzMSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzPzViYTczMzEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzPzViYTczMzEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLXRvLWpzb24uanM/OGZkYTUwNCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWZyb20taXRlcmFibGUuanM/OGZkYTUwNCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1jb2xsZWN0aW9uLW9mLmpzPzhmZGE1MDQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtY29sbGVjdGlvbi1mcm9tLmpzP2NkOGYyNGEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzP2MwZWQxY2IiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzP2MwZWQxY2IiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzP2MwZWQxY2IiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanM/YzBlZDFjYiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLW1vZHVsZS5qcz8xODc2ODJmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanM/MTg3NjgyZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanM/MTg3NjgyZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanM/MTg3NjgyZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qcz8xODc2ODJmIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWljcm90YXNrLmpzPzE4NzY4MmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191c2VyLWFnZW50LmpzPzE4NzY4MmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanM/MTg3NjgyZiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnByb21pc2UudHJ5LmpzPzE4NzY4MmYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zZXQuanM/YjIzMmU4NSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnNldC5qcz9iMjMyZTg1Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc2V0LnRvLWpzb24uanM/YjIzMmU4NSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnNldC5vZi5qcz9iMjMyZTg1Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc2V0LmZyb20uanM/YjIzMmU4NSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2xpYi9oZWFkLmpzP2EwNGMxZDMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9saWIvc2lkZS1lZmZlY3QuanM/YTA0YzFkMyIsIndlYnBhY2s6Ly8vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9wYWdlcy9fZXJyb3IuanM/ZWIxOTlhNSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2xpYi9lcnJvci5qcz9lYjE5OWE1Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9odHRwLXN0YXR1cy9saWIvaW5kZXguanM/ZWIxOTlhNSJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi42LjgnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBoYXMoZXhwb3J0cywga2V5KSkgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbDtcbnZhciBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0ge307XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcycpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24gKGl0ZXJhdGVkKSB7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIgaW5kZXggPSB0aGlzLl9pO1xuICB2YXIgcG9pbnQ7XG4gIGlmIChpbmRleCA+PSBPLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIHRhZywgc3RhdCkge1xuICBpZiAoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSkgZGVmKGl0LCBUQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgQlJFQUsgPSB7fTtcbnZhciBSRVRVUk4gPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUikge1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSk7XG4gIHZhciBmID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmIChpc0FycmF5SXRlcihpdGVyRm4pKSBmb3IgKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG52YXIgRE9NSXRlcmFibGVzID0gKCdDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LCcgK1xuICAnRE9NVG9rZW5MaXN0LERhdGFUcmFuc2Zlckl0ZW1MaXN0LEZpbGVMaXN0LEhUTUxBbGxDb2xsZWN0aW9uLEhUTUxDb2xsZWN0aW9uLEhUTUxGb3JtRWxlbWVudCxIVE1MU2VsZWN0RWxlbWVudCwnICtcbiAgJ01lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsJyArXG4gICdTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCwnICtcbiAgJ1RleHRUcmFja0xpc3QsVG91Y2hMaXN0Jykuc3BsaXQoJywnKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBET01JdGVyYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBET01JdGVyYWJsZXNbaV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmIHR5cGVvZiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246IGNvcmUudmVyc2lvbixcbiAgbW9kZTogcmVxdWlyZSgnLi9fbGlicmFyeScpID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTkgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShjYWxsKSkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4uanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL193a3MtZXh0LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmIChuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKSBkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7IHZhbHVlOiB3a3NFeHQuZihuYW1lKSB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9jcmVhdGVcIik7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgQ29uc3RydWN0b3IsIG5hbWUsIGZvcmJpZGRlbkZpZWxkKSB7XG4gIGlmICghKGl0IGluc3RhbmNlb2YgQ29uc3RydWN0b3IpIHx8IChmb3JiaWRkZW5GaWVsZCAhPT0gdW5kZWZpbmVkICYmIGZvcmJpZGRlbkZpZWxkIGluIGl0KSkge1xuICAgIHRocm93IFR5cGVFcnJvcihuYW1lICsgJzogaW5jb3JyZWN0IGludm9jYXRpb24hJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1pbnN0YW5jZS5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIHNhZmUpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzYWZlICYmIHRhcmdldFtrZXldKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO1xuICAgIGVsc2UgaGlkZSh0YXJnZXQsIGtleSwgc3JjW2tleV0pO1xuICB9IHJldHVybiB0YXJnZXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgIT0gdW5kZWZpbmVkKSByZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbiAgdmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG4gIHZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG4gIHZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/RnVuY3Rpb259IGdldFN0YWNrIFJldHVybnMgdGhlIGNvbXBvbmVudCBzdGFjay5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUHJvcFR5cGVzKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZ2V0U3RhY2spIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICAgaW52YXJpYW50KHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICd0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJXNgLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKTtcbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgd2FybmluZyghZXJyb3IgfHwgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciwgJyVzOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJXMgYCVzYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgKyAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJXMuICcgKyAnWW91IG1heSBoYXZlIGZvcmdvdHRlbiB0byBwYXNzIGFuIGFyZ3VtZW50IHRvIHRoZSB0eXBlIGNoZWNrZXIgJyArICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgKyAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgbG9jYXRpb24sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIGVycm9yKTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHdhcm5pbmcoZmFsc2UsICdGYWlsZWQgJXMgdHlwZTogJXMlcycsIGxvY2F0aW9uLCBlcnJvci5tZXNzYWdlLCBzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9uZXh0L25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoTykge1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmIChoYXMoTywgSUVfUFJPVE8pKSByZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmICh0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZG9uZSwgdmFsdWUpIHtcbiAgcmV0dXJuIHsgdmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmUgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZykge1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanNcbi8vIG1vZHVsZSBpZCA9IDY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbmV4dC9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanNcbi8vIG1vZHVsZSBpZCA9IDY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRZUEUpIHtcbiAgaWYgKCFpc09iamVjdChpdCkgfHwgaXQuX3QgIT09IFRZUEUpIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdmFsaWRhdGUtY29sbGVjdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qc1xuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMpIHtcbiAgdmFyIGZuID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldO1xuICB2YXIgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24gKCkgeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzXG4vLyBtb2R1bGUgaWQgPSA3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubG9hZEdldEluaXRpYWxQcm9wcyA9IHVuZGVmaW5lZDtcblxudmFyIF9yZWdlbmVyYXRvciA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3InKTtcblxudmFyIF9yZWdlbmVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWdlbmVyYXRvcik7XG5cbnZhciBfYXN5bmNUb0dlbmVyYXRvcjIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvcicpO1xuXG52YXIgX2FzeW5jVG9HZW5lcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXN5bmNUb0dlbmVyYXRvcjIpO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduJyk7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbnZhciBsb2FkR2V0SW5pdGlhbFByb3BzID0gZXhwb3J0cy5sb2FkR2V0SW5pdGlhbFByb3BzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgX3JlZiA9ICgwLCBfYXN5bmNUb0dlbmVyYXRvcjMuZGVmYXVsdCkoIC8qI19fUFVSRV9fKi9fcmVnZW5lcmF0b3IyLmRlZmF1bHQubWFyayhmdW5jdGlvbiBfY2FsbGVlKENvbXBvbmVudCwgY3R4KSB7XG4gICAgdmFyIHByb3BzLCBjb21wTmFtZSwgbWVzc2FnZTtcbiAgICByZXR1cm4gX3JlZ2VuZXJhdG9yMi5kZWZhdWx0LndyYXAoZnVuY3Rpb24gX2NhbGxlZSQoX2NvbnRleHQpIHtcbiAgICAgIHdoaWxlICgxKSB7XG4gICAgICAgIHN3aXRjaCAoX2NvbnRleHQucHJldiA9IF9jb250ZXh0Lm5leHQpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBpZiAoQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcykge1xuICAgICAgICAgICAgICBfY29udGV4dC5uZXh0ID0gMjtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfY29udGV4dC5hYnJ1cHQoJ3JldHVybicsIHt9KTtcblxuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA0O1xuICAgICAgICAgICAgcmV0dXJuIENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHMoY3R4KTtcblxuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHByb3BzID0gX2NvbnRleHQuc2VudDtcblxuICAgICAgICAgICAgaWYgKCEoIXByb3BzICYmICghY3R4LnJlcyB8fCAhY3R4LnJlcy5maW5pc2hlZCkpKSB7XG4gICAgICAgICAgICAgIF9jb250ZXh0Lm5leHQgPSA5O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29tcE5hbWUgPSBnZXREaXNwbGF5TmFtZShDb21wb25lbnQpO1xuICAgICAgICAgICAgbWVzc2FnZSA9ICdcIicgKyBjb21wTmFtZSArICcuZ2V0SW5pdGlhbFByb3BzKClcIiBzaG91bGQgcmVzb2x2ZSB0byBhbiBvYmplY3QuIEJ1dCBmb3VuZCBcIicgKyBwcm9wcyArICdcIiBpbnN0ZWFkLic7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG5cbiAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuYWJydXB0KCdyZXR1cm4nLCBwcm9wcyk7XG5cbiAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICByZXR1cm4gX2NvbnRleHQuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgX2NhbGxlZSwgdGhpcyk7XG4gIH0pKTtcblxuICByZXR1cm4gZnVuY3Rpb24gbG9hZEdldEluaXRpYWxQcm9wcyhfeDIsIF94Mykge1xuICAgIHJldHVybiBfcmVmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59KCk7XG5cbmV4cG9ydHMud2FybiA9IHdhcm47XG5leHBvcnRzLmV4ZWNPbmNlID0gZXhlY09uY2U7XG5leHBvcnRzLmRlcHJlY2F0ZWQgPSBkZXByZWNhdGVkO1xuZXhwb3J0cy5wcmludEFuZEV4aXQgPSBwcmludEFuZEV4aXQ7XG5leHBvcnRzLmdldERpc3BsYXlOYW1lID0gZ2V0RGlzcGxheU5hbWU7XG5leHBvcnRzLmdldExvY2F0aW9uT3JpZ2luID0gZ2V0TG9jYXRpb25PcmlnaW47XG5leHBvcnRzLmdldFVSTCA9IGdldFVSTDtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gd2FybihtZXNzYWdlKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBleGVjT25jZShmbikge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHZhciB1c2VkID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaWYgKCF1c2VkKSB7XG4gICAgICB1c2VkID0gdHJ1ZTtcbiAgICAgIGZuLmFwcGx5KF90aGlzLCBhcmdzKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGRlcHJlY2F0ZWQoZm4sIG1lc3NhZ2UpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHJldHVybiBmbjtcblxuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIHZhciBuZXdGbiA9IGZ1bmN0aW9uIG5ld0ZuKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICB3YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfTtcblxuICAvLyBjb3B5IGFsbCBwcm9wZXJ0aWVzXG4gICgwLCBfYXNzaWduMi5kZWZhdWx0KShuZXdGbiwgZm4pO1xuXG4gIHJldHVybiBuZXdGbjtcbn1cblxuZnVuY3Rpb24gcHJpbnRBbmRFeGl0KG1lc3NhZ2UpIHtcbiAgdmFyIGNvZGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDE7XG5cbiAgaWYgKGNvZGUgPT09IDApIHtcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG5cbiAgcHJvY2Vzcy5leGl0KGNvZGUpO1xufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5TmFtZShDb21wb25lbnQpIHtcbiAgcmV0dXJuIENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnVW5rbm93bic7XG59XG5cbmZ1bmN0aW9uIGdldExvY2F0aW9uT3JpZ2luKCkge1xuICB2YXIgX3dpbmRvdyRsb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbixcbiAgICAgIHByb3RvY29sID0gX3dpbmRvdyRsb2NhdGlvbi5wcm90b2NvbCxcbiAgICAgIGhvc3RuYW1lID0gX3dpbmRvdyRsb2NhdGlvbi5ob3N0bmFtZSxcbiAgICAgIHBvcnQgPSBfd2luZG93JGxvY2F0aW9uLnBvcnQ7XG5cbiAgcmV0dXJuIHByb3RvY29sICsgJy8vJyArIGhvc3RuYW1lICsgKHBvcnQgPyAnOicgKyBwb3J0IDogJycpO1xufVxuXG5mdW5jdGlvbiBnZXRVUkwoKSB7XG4gIHZhciBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG5cbiAgdmFyIG9yaWdpbiA9IGdldExvY2F0aW9uT3JpZ2luKCk7XG4gIHJldHVybiBocmVmLnN1YnN0cmluZyhvcmlnaW4ubGVuZ3RoKTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0Jztcbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xuXG5mdW5jdGlvbiBQcm9taXNlQ2FwYWJpbGl0eShDKSB7XG4gIHZhciByZXNvbHZlLCByZWplY3Q7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBDKGZ1bmN0aW9uICgkJHJlc29sdmUsICQkcmVqZWN0KSB7XG4gICAgaWYgKHJlc29sdmUgIT09IHVuZGVmaW5lZCB8fCByZWplY3QgIT09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKCdCYWQgUHJvbWlzZSBjb25zdHJ1Y3RvcicpO1xuICAgIHJlc29sdmUgPSAkJHJlc29sdmU7XG4gICAgcmVqZWN0ID0gJCRyZWplY3Q7XG4gIH0pO1xuICB0aGlzLnJlc29sdmUgPSBhRnVuY3Rpb24ocmVzb2x2ZSk7XG4gIHRoaXMucmVqZWN0ID0gYUZ1bmN0aW9uKHJlamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiAoQykge1xuICByZXR1cm4gbmV3IFByb21pc2VDYXBhYmlsaXR5KEMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5LmpzXG4vLyBtb2R1bGUgaWQgPSA3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3NldFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zZXQuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9wcm9taXNlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvcHJvbWlzZVwiKTtcblxudmFyIF9wcm9taXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb21pc2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ2VuID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gbmV3IF9wcm9taXNlMi5kZWZhdWx0KGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGZ1bmN0aW9uIHN0ZXAoa2V5LCBhcmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgICAgICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gX3Byb21pc2UyLmRlZmF1bHQucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBzdGVwKFwidGhyb3dcIiwgZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RlcChcIm5leHRcIik7XG4gICAgfSk7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChUT19TVFJJTkcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBwb3MpIHtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKTtcbiAgICB2YXIgaSA9IHRvSW50ZWdlcihwb3MpO1xuICAgIHZhciBsID0gcy5sZW5ndGg7XG4gICAgdmFyIGEsIGI7XG4gICAgaWYgKGkgPCAwIHx8IGkgPj0gbCkgcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc3RyaW5nLWF0LmpzXG4vLyBtb2R1bGUgaWQgPSA4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBnZXRLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpID0gMDtcbiAgdmFyIFA7XG4gIHdoaWxlIChsZW5ndGggPiBpKSBkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qc1xuLy8gbW9kdWxlIGlkID0gOTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDkzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgSVRFUkFUT1IgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKTtcbnZhciBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbiAoKSB7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby10aHJvdy1saXRlcmFsXG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYywgc2tpcENsb3NpbmcpIHtcbiAgaWYgKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IFs3XTtcbiAgICB2YXIgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB7IGRvbmU6IHNhZmUgPSB0cnVlIH07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSA5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgc3RlcCA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGtpbmQgPSB0aGlzLl9rO1xuICB2YXIgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmICghTyB8fCBpbmRleCA+PSBPLmxlbmd0aCkge1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gJ2tleXMnKSByZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmIChraW5kID09ICd2YWx1ZXMnKSByZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDk1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDk2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG4vLyBvYmouaGFzT3duUHJvcGVydHkocHJvcCkgd2lsbCBicmVhay5cbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy8xNzA3XG5mdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHFzLCBzZXAsIGVxLCBvcHRpb25zKSB7XG4gIHNlcCA9IHNlcCB8fCAnJic7XG4gIGVxID0gZXEgfHwgJz0nO1xuICB2YXIgb2JqID0ge307XG5cbiAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHZhciByZWdleHAgPSAvXFwrL2c7XG4gIHFzID0gcXMuc3BsaXQoc2VwKTtcblxuICB2YXIgbWF4S2V5cyA9IDEwMDA7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1heEtleXMgPT09ICdudW1iZXInKSB7XG4gICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcbiAgfVxuXG4gIHZhciBsZW4gPSBxcy5sZW5ndGg7XG4gIC8vIG1heEtleXMgPD0gMCBtZWFucyB0aGF0IHdlIHNob3VsZCBub3QgbGltaXQga2V5cyBjb3VudFxuICBpZiAobWF4S2V5cyA+IDAgJiYgbGVuID4gbWF4S2V5cykge1xuICAgIGxlbiA9IG1heEtleXM7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIHggPSBxc1tpXS5yZXBsYWNlKHJlZ2V4cCwgJyUyMCcpLFxuICAgICAgICBpZHggPSB4LmluZGV4T2YoZXEpLFxuICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcbiAgICAgIHZzdHIgPSB4LnN1YnN0cihpZHggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAga3N0ciA9IHg7XG4gICAgICB2c3RyID0gJyc7XG4gICAgfVxuXG4gICAgayA9IGRlY29kZVVSSUNvbXBvbmVudChrc3RyKTtcbiAgICB2ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZzdHIpO1xuXG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGspKSB7XG4gICAgICBvYmpba10gPSB2O1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmpba10pKSB7XG4gICAgICBvYmpba10ucHVzaCh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2RlY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gOThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gbWFwKG9ialtrXSwgZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuZnVuY3Rpb24gbWFwICh4cywgZikge1xuICBpZiAoeHMubWFwKSByZXR1cm4geHMubWFwKGYpO1xuICB2YXIgcmVzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICByZXMucHVzaChmKHhzW2ldLCBpKSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSByZXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2VuY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gOTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMTAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDEwM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSB7XG4gICAgICBrZXkgPSBrZXlzW2orK107XG4gICAgICBpZiAoIURFU0NSSVBUT1JTIHx8IGlzRW51bS5jYWxsKFMsIGtleSkpIFRba2V5XSA9IFNba2V5XTtcbiAgICB9XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDEwOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCkge1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSAxMDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX3drcy1leHQnKS5mKCdpdGVyYXRvcicpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC5qc1xuLy8gbW9kdWxlIGlkID0gMTEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDExM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIE1FVEEgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZO1xudmFyICRmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xudmFyIHdrcyA9IHJlcXVpcmUoJy4vX3drcycpO1xudmFyIHdrc0V4dCA9IHJlcXVpcmUoJy4vX3drcy1leHQnKTtcbnZhciB3a3NEZWZpbmUgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJyk7XG52YXIgZW51bUtleXMgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIF9jcmVhdGUgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyk7XG52YXIgZ09QTkV4dCA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpO1xudmFyICRHT1BEID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKTtcbnZhciAkR09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgJERQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUEQgPSAkR09QRC5mO1xudmFyIGRQID0gJERQLmY7XG52YXIgZ09QTiA9IGdPUE5FeHQuZjtcbnZhciAkU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciAkSlNPTiA9IGdsb2JhbC5KU09OO1xudmFyIF9zdHJpbmdpZnkgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG52YXIgSElEREVOID0gd2tzKCdfaGlkZGVuJyk7XG52YXIgVE9fUFJJTUlUSVZFID0gd2tzKCd0b1ByaW1pdGl2ZScpO1xudmFyIGlzRW51bSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xudmFyIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKTtcbnZhciBBbGxTeW1ib2xzID0gc2hhcmVkKCdzeW1ib2xzJyk7XG52YXIgT1BTeW1ib2xzID0gc2hhcmVkKCdvcC1zeW1ib2xzJyk7XG52YXIgT2JqZWN0UHJvdG8gPSBPYmplY3RbUFJPVE9UWVBFXTtcbnZhciBVU0VfTkFUSVZFID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJyAmJiAhISRHT1BTLmY7XG52YXIgUU9iamVjdCA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGRQKHRoaXMsICdhJywgeyB2YWx1ZTogNyB9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uIChpdCwga2V5LCBEKSB7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZiAocHJvdG9EZXNjKSBkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmIChwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKSBkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpIHtcbiAgaWYgKGl0ID09PSBPYmplY3RQcm90bykgJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYgKGhhcyhBbGxTeW1ib2xzLCBrZXkpKSB7XG4gICAgaWYgKCFELmVudW1lcmFibGUpIHtcbiAgICAgIGlmICghaGFzKGl0LCBISURERU4pKSBkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkgaXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7IGVudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpIH0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApIHtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpO1xuICB2YXIgaSA9IDA7XG4gIHZhciBsID0ga2V5cy5sZW5ndGg7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsID4gaSkgJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCkge1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSkge1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZiAodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpIHtcbiAgaXQgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZiAoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKSByZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYgKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSkgRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCkge1xuICB2YXIgbmFtZXMgPSBnT1BOKHRvSU9iamVjdChpdCkpO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBpID0gMDtcbiAgdmFyIGtleTtcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIHtcbiAgICBpZiAoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKSByZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgdmFyIElTX09QID0gaXQgPT09IE9iamVjdFByb3RvO1xuICB2YXIgbmFtZXMgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIga2V5O1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkge1xuICAgIGlmIChoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpIHJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKSB0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgaWYgKHRoaXMgPT09IE9iamVjdFByb3RvKSAkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZiAoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSkgdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZiAoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKSBzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXQgfSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gICRHT1BTLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKSB7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfTtcbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgeyBTeW1ib2w6ICRTeW1ib2wgfSk7XG5cbmZvciAodmFyIGVzNlN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaiA9IDA7IGVzNlN5bWJvbHMubGVuZ3RoID4gajspd2tzKGVzNlN5bWJvbHNbaisrXSk7XG5cbmZvciAodmFyIHdlbGxLbm93blN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBrID0gMDsgd2VsbEtub3duU3ltYm9scy5sZW5ndGggPiBrOykgd2tzRGVmaW5lKHdlbGxLbm93blN5bWJvbHNbaysrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioc3ltKSB7XG4gICAgaWYgKCFpc1N5bWJvbChzeW0pKSB0aHJvdyBUeXBlRXJyb3Ioc3ltICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gICAgZm9yICh2YXIga2V5IGluIFN5bWJvbFJlZ2lzdHJ5KSBpZiAoU3ltYm9sUmVnaXN0cnlba2V5XSA9PT0gc3ltKSByZXR1cm4ga2V5O1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uICgpIHsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbiAoKSB7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIENocm9tZSAzOCBhbmQgMzkgYE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHNgIGZhaWxzIG9uIHByaW1pdGl2ZXNcbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTM0NDNcbnZhciBGQUlMU19PTl9QUklNSVRJVkVTID0gJGZhaWxzKGZ1bmN0aW9uICgpIHsgJEdPUFMuZigxKTsgfSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogRkFJTFNfT05fUFJJTUlUSVZFUywgJ09iamVjdCcsIHtcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpIHtcbiAgICByZXR1cm4gJEdPUFMuZih0b09iamVjdChpdCkpO1xuICB9XG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7IGE6IFMgfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KSB7XG4gICAgdmFyIGFyZ3MgPSBbaXRdO1xuICAgIHZhciBpID0gMTtcbiAgICB2YXIgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZSAoYXJndW1lbnRzLmxlbmd0aCA+IGkpIGFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgJHJlcGxhY2VyID0gcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmICghaXNPYmplY3QocmVwbGFjZXIpICYmIGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKSByZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICBpZiAoIWlzQXJyYXkocmVwbGFjZXIpKSByZXBsYWNlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mICRyZXBsYWNlciA9PSAnZnVuY3Rpb24nKSB2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgZ09QUyA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJyk7XG52YXIgcElFID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIHJlc3VsdCA9IGdldEtleXMoaXQpO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYgKGdldFN5bWJvbHMpIHtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpO1xuICAgIHZhciBpc0VudW0gPSBwSUUuZjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAoc3ltYm9scy5sZW5ndGggPiBpKSBpZiAoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpIHJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgZ09QTiA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZjtcbnZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KSB7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qc1xuLy8gbW9kdWxlIGlkID0gMTE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDExN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDExOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzXG4vLyBtb2R1bGUgaWQgPSAxMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2YuanNcbi8vIG1vZHVsZSBpZCA9IDEyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHsgc2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldCB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qc1xuLy8gbW9kdWxlIGlkID0gMTIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24gKE8sIHByb3RvKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBpZiAoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCkgdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24gKHRlc3QsIGJ1Z2d5LCBzZXQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoIChlKSB7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYgKGJ1Z2d5KSBPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzXG4vLyBtb2R1bGUgaWQgPSAxMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCkge1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7IGNyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDEyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi44LjZcbiAqIHJlYWN0LmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcycpO1xuXG4vLyBUT0RPOiB0aGlzIGlzIHNwZWNpYWwgYmVjYXVzZSBpdCBnZXRzIGltcG9ydGVkIGR1cmluZyBidWlsZC5cblxudmFyIFJlYWN0VmVyc2lvbiA9ICcxNi44LjYnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcblxudmFyIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuY29uY3VycmVudF9tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmZvcndhcmRfcmVmJykgOiAweGVhZDA7XG52YXIgUkVBQ1RfU1VTUEVOU0VfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlJykgOiAweGVhZDE7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcblxudmFyIE1BWUJFX0lURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xudmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InO1xuXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgaWYgKG1heWJlSXRlcmFibGUgPT09IG51bGwgfHwgdHlwZW9mIG1heWJlSXRlcmFibGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIG1heWJlSXRlcmF0b3IgPSBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtNQVlCRV9JVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdO1xuICBpZiAodHlwZW9mIG1heWJlSXRlcmF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gbWF5YmVJdGVyYXRvcjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gKCkge307XG5cbntcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvciA9IHZvaWQgMDtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuLy8gUmVseWluZyBvbiB0aGUgYGludmFyaWFudCgpYCBpbXBsZW1lbnRhdGlvbiBsZXRzIHVzXG4vLyBwcmVzZXJ2ZSB0aGUgZm9ybWF0IGFuZCBwYXJhbXMgaW4gdGhlIHd3dyBidWlsZHMuXG5cbi8qKlxuICogRm9ya2VkIGZyb20gZmJqcy93YXJuaW5nOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2ZianMvYmxvYi9lNjZiYTIwYWQ1YmU0MzNlYjU0NDIzZjJiMDk3ZDgyOTMyNGQ5ZGU2L3BhY2thZ2VzL2ZianMvc3JjL19fZm9ya3NfXy93YXJuaW5nLmpzXG4gKlxuICogT25seSBjaGFuZ2UgaXMgd2UgdXNlIGNvbnNvbGUud2FybiBpbnN0ZWFkIG9mIGNvbnNvbGUuZXJyb3IsXG4gKiBhbmQgZG8gbm90aGluZyB3aGVuICdjb25zb2xlJyBpcyBub3Qgc3VwcG9ydGVkLlxuICogVGhpcyByZWFsbHkgc2ltcGxpZmllcyB0aGUgY29kZS5cbiAqIC0tLVxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICBsb3dQcmlvcml0eVdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYGxvd1ByaW9yaXR5V2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBsb3dQcmlvcml0eVdhcm5pbmckMSA9IGxvd1ByaW9yaXR5V2FybmluZztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmdXaXRob3V0U3RhY2sgPSBmdW5jdGlvbiAoKSB7fTtcblxue1xuICB3YXJuaW5nV2l0aG91dFN0YWNrID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmdXaXRob3V0U3RhY2soY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGlmIChhcmdzLmxlbmd0aCA+IDgpIHtcbiAgICAgIC8vIENoZWNrIGJlZm9yZSB0aGUgY29uZGl0aW9uIHRvIGNhdGNoIHZpb2xhdGlvbnMgZWFybHkuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3dhcm5pbmdXaXRob3V0U3RhY2soKSBjdXJyZW50bHkgc3VwcG9ydHMgYXQgbW9zdCA4IGFyZ3VtZW50cy4nKTtcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgYXJnc1dpdGhGb3JtYXQgPSBhcmdzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICByZXR1cm4gJycgKyBpdGVtO1xuICAgICAgfSk7XG4gICAgICBhcmdzV2l0aEZvcm1hdC51bnNoaWZ0KCdXYXJuaW5nOiAnICsgZm9ybWF0KTtcblxuICAgICAgLy8gV2UgaW50ZW50aW9uYWxseSBkb24ndCB1c2Ugc3ByZWFkIChvciAuYXBwbHkpIGRpcmVjdGx5IGJlY2F1c2UgaXRcbiAgICAgIC8vIGJyZWFrcyBJRTk6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMTM2MTBcbiAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUuZXJyb3IsIGNvbnNvbGUsIGFyZ3NXaXRoRm9ybWF0KTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxudmFyIHdhcm5pbmdXaXRob3V0U3RhY2skMSA9IHdhcm5pbmdXaXRob3V0U3RhY2s7XG5cbnZhciBkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnQgPSB7fTtcblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAge1xuICAgIHZhciBfY29uc3RydWN0b3IgPSBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IF9jb25zdHJ1Y3RvciAmJiAoX2NvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IF9jb25zdHJ1Y3Rvci5uYW1lKSB8fCAnUmVhY3RDbGFzcyc7XG4gICAgdmFyIHdhcm5pbmdLZXkgPSBjb21wb25lbnROYW1lICsgJy4nICsgY2FsbGVyTmFtZTtcbiAgICBpZiAoZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50W3dhcm5pbmdLZXldKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgXCJDYW4ndCBjYWxsICVzIG9uIGEgY29tcG9uZW50IHRoYXQgaXMgbm90IHlldCBtb3VudGVkLiBcIiArICdUaGlzIGlzIGEgbm8tb3AsIGJ1dCBpdCBtaWdodCBpbmRpY2F0ZSBhIGJ1ZyBpbiB5b3VyIGFwcGxpY2F0aW9uLiAnICsgJ0luc3RlYWQsIGFzc2lnbiB0byBgdGhpcy5zdGF0ZWAgZGlyZWN0bHkgb3IgZGVmaW5lIGEgYHN0YXRlID0ge307YCAnICsgJ2NsYXNzIHByb3BlcnR5IHdpdGggdGhlIGRlc2lyZWQgc3RhdGUgaW4gdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjb21wb25lbnROYW1lKTtcbiAgICBkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnRbd2FybmluZ0tleV0gPSB0cnVlO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgKlxuICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IGNhbGxlck5hbWUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgKlxuICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBjYWxsZXJOYW1lIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAncmVwbGFjZVN0YXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBUaGlzIG9ubHkgZXhpc3RzIGJlY2F1c2UgX3BlbmRpbmdTdGF0ZSBpc1xuICAgKiBpbnRlcm5hbC4gVGhpcyBwcm92aWRlcyBhIG1lcmdpbmcgc3RyYXRlZ3kgdGhhdCBpcyBub3QgYXZhaWxhYmxlIHRvIGRlZXBcbiAgICogcHJvcGVydGllcyB3aGljaCBpcyBjb25mdXNpbmcuIFRPRE86IEV4cG9zZSBwZW5kaW5nU3RhdGUgb3IgZG9uJ3QgdXNlIGl0XG4gICAqIGR1cmluZyB0aGUgbWVyZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBzdGF0ZS5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBOYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcbntcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIC8vIElmIGEgY29tcG9uZW50IGhhcyBzdHJpbmcgcmVmcywgd2Ugd2lsbCBhc3NpZ24gYSBkaWZmZXJlbnQgb2JqZWN0IGxhdGVyLlxuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrKSB7XG4gICEodHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyB8fCBwYXJ0aWFsU3RhdGUgPT0gbnVsbCkgPyBpbnZhcmlhbnQoZmFsc2UsICdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcy4nKSA6IHZvaWQgMDtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbn07XG5cbi8qKlxuICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gKlxuICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gKlxuICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAqXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHVwZGF0ZSBpcyBjb21wbGV0ZS5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5Db21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbntcbiAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgIGlzTW91bnRlZDogWydpc01vdW50ZWQnLCAnSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIHBlbmRpbmcgcmVxdWVzdHMgaW4gJyArICdjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy4nXSxcbiAgICByZXBsYWNlU3RhdGU6IFsncmVwbGFjZVN0YXRlJywgJ1JlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlICcgKyAnaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS4nXVxuICB9O1xuICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50LnByb3RvdHlwZSwgbWV0aG9kTmFtZSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvd1ByaW9yaXR5V2FybmluZyQxKGZhbHNlLCAnJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBDb21wb25lbnREdW1teSgpIHt9XG5Db21wb25lbnREdW1teS5wcm90b3R5cGUgPSBDb21wb25lbnQucHJvdG90eXBlO1xuXG4vKipcbiAqIENvbnZlbmllbmNlIGNvbXBvbmVudCB3aXRoIGRlZmF1bHQgc2hhbGxvdyBlcXVhbGl0eSBjaGVjayBmb3Igc0NVLlxuICovXG5mdW5jdGlvbiBQdXJlQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgLy8gSWYgYSBjb21wb25lbnQgaGFzIHN0cmluZyByZWZzLCB3ZSB3aWxsIGFzc2lnbiBhIGRpZmZlcmVudCBvYmplY3QgbGF0ZXIuXG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG52YXIgcHVyZUNvbXBvbmVudFByb3RvdHlwZSA9IFB1cmVDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG5wdXJlQ29tcG9uZW50UHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUHVyZUNvbXBvbmVudDtcbi8vIEF2b2lkIGFuIGV4dHJhIHByb3RvdHlwZSBqdW1wIGZvciB0aGVzZSBtZXRob2RzLlxuX2Fzc2lnbihwdXJlQ29tcG9uZW50UHJvdG90eXBlLCBDb21wb25lbnQucHJvdG90eXBlKTtcbnB1cmVDb21wb25lbnRQcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuXG4vLyBhbiBpbW11dGFibGUgb2JqZWN0IHdpdGggYSBzaW5nbGUgbXV0YWJsZSB2YWx1ZVxuZnVuY3Rpb24gY3JlYXRlUmVmKCkge1xuICB2YXIgcmVmT2JqZWN0ID0ge1xuICAgIGN1cnJlbnQ6IG51bGxcbiAgfTtcbiAge1xuICAgIE9iamVjdC5zZWFsKHJlZk9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIHJlZk9iamVjdDtcbn1cblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBkaXNwYXRjaGVyLlxuICovXG52YXIgUmVhY3RDdXJyZW50RGlzcGF0Y2hlciA9IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsXG59O1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuICAvKipcbiAgICogQGludGVybmFsXG4gICAqIEB0eXBlIHtSZWFjdENvbXBvbmVudH1cbiAgICovXG4gIGN1cnJlbnQ6IG51bGxcbn07XG5cbnZhciBCRUZPUkVfU0xBU0hfUkUgPSAvXiguKilbXFxcXFxcL10vO1xuXG52YXIgZGVzY3JpYmVDb21wb25lbnRGcmFtZSA9IGZ1bmN0aW9uIChuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSkge1xuICB2YXIgc291cmNlSW5mbyA9ICcnO1xuICBpZiAoc291cmNlKSB7XG4gICAgdmFyIHBhdGggPSBzb3VyY2UuZmlsZU5hbWU7XG4gICAgdmFyIGZpbGVOYW1lID0gcGF0aC5yZXBsYWNlKEJFRk9SRV9TTEFTSF9SRSwgJycpO1xuICAgIHtcbiAgICAgIC8vIEluIERFViwgaW5jbHVkZSBjb2RlIGZvciBhIGNvbW1vbiBzcGVjaWFsIGNhc2U6XG4gICAgICAvLyBwcmVmZXIgXCJmb2xkZXIvaW5kZXguanNcIiBpbnN0ZWFkIG9mIGp1c3QgXCJpbmRleC5qc1wiLlxuICAgICAgaWYgKC9eaW5kZXhcXC4vLnRlc3QoZmlsZU5hbWUpKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHBhdGgubWF0Y2goQkVGT1JFX1NMQVNIX1JFKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgdmFyIHBhdGhCZWZvcmVTbGFzaCA9IG1hdGNoWzFdO1xuICAgICAgICAgIGlmIChwYXRoQmVmb3JlU2xhc2gpIHtcbiAgICAgICAgICAgIHZhciBmb2xkZXJOYW1lID0gcGF0aEJlZm9yZVNsYXNoLnJlcGxhY2UoQkVGT1JFX1NMQVNIX1JFLCAnJyk7XG4gICAgICAgICAgICBmaWxlTmFtZSA9IGZvbGRlck5hbWUgKyAnLycgKyBmaWxlTmFtZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgc291cmNlSW5mbyA9ICcgKGF0ICcgKyBmaWxlTmFtZSArICc6JyArIHNvdXJjZS5saW5lTnVtYmVyICsgJyknO1xuICB9IGVsc2UgaWYgKG93bmVyTmFtZSkge1xuICAgIHNvdXJjZUluZm8gPSAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKSc7XG4gIH1cbiAgcmV0dXJuICdcXG4gICAgaW4gJyArIChuYW1lIHx8ICdVbmtub3duJykgKyBzb3VyY2VJbmZvO1xufTtcblxudmFyIFJlc29sdmVkID0gMTtcblxuXG5mdW5jdGlvbiByZWZpbmVSZXNvbHZlZExhenlDb21wb25lbnQobGF6eUNvbXBvbmVudCkge1xuICByZXR1cm4gbGF6eUNvbXBvbmVudC5fc3RhdHVzID09PSBSZXNvbHZlZCA/IGxhenlDb21wb25lbnQuX3Jlc3VsdCA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldFdyYXBwZWROYW1lKG91dGVyVHlwZSwgaW5uZXJUeXBlLCB3cmFwcGVyTmFtZSkge1xuICB2YXIgZnVuY3Rpb25OYW1lID0gaW5uZXJUeXBlLmRpc3BsYXlOYW1lIHx8IGlubmVyVHlwZS5uYW1lIHx8ICcnO1xuICByZXR1cm4gb3V0ZXJUeXBlLmRpc3BsYXlOYW1lIHx8IChmdW5jdGlvbk5hbWUgIT09ICcnID8gd3JhcHBlck5hbWUgKyAnKCcgKyBmdW5jdGlvbk5hbWUgKyAnKScgOiB3cmFwcGVyTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWUodHlwZSkge1xuICBpZiAodHlwZSA9PSBudWxsKSB7XG4gICAgLy8gSG9zdCByb290LCB0ZXh0IG5vZGUgb3IganVzdCBpbnZhbGlkIHR5cGUuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAge1xuICAgIGlmICh0eXBlb2YgdHlwZS50YWcgPT09ICdudW1iZXInKSB7XG4gICAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdSZWNlaXZlZCBhbiB1bmV4cGVjdGVkIG9iamVjdCBpbiBnZXRDb21wb25lbnROYW1lKCkuICcgKyAnVGhpcyBpcyBsaWtlbHkgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLicpO1xuICAgIH1cbiAgfVxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgbnVsbDtcbiAgfVxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTpcbiAgICAgIHJldHVybiAnQ29uY3VycmVudE1vZGUnO1xuICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgIHJldHVybiAnRnJhZ21lbnQnO1xuICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICByZXR1cm4gJ1BvcnRhbCc7XG4gICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgcmV0dXJuICdQcm9maWxlcic7XG4gICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgcmV0dXJuICdTdHJpY3RNb2RlJztcbiAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N1c3BlbnNlJztcbiAgfVxuICBpZiAodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgc3dpdGNoICh0eXBlLiQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgcmV0dXJuICdDb250ZXh0LkNvbnN1bWVyJztcbiAgICAgIGNhc2UgUkVBQ1RfUFJPVklERVJfVFlQRTpcbiAgICAgICAgcmV0dXJuICdDb250ZXh0LlByb3ZpZGVyJztcbiAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgcmV0dXJuIGdldFdyYXBwZWROYW1lKHR5cGUsIHR5cGUucmVuZGVyLCAnRm9yd2FyZFJlZicpO1xuICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lKHR5cGUudHlwZSk7XG4gICAgICBjYXNlIFJFQUNUX0xBWllfVFlQRTpcbiAgICAgICAge1xuICAgICAgICAgIHZhciB0aGVuYWJsZSA9IHR5cGU7XG4gICAgICAgICAgdmFyIHJlc29sdmVkVGhlbmFibGUgPSByZWZpbmVSZXNvbHZlZExhenlDb21wb25lbnQodGhlbmFibGUpO1xuICAgICAgICAgIGlmIChyZXNvbHZlZFRoZW5hYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZShyZXNvbHZlZFRoZW5hYmxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbnZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0ge307XG5cbnZhciBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCA9IG51bGw7XG5cbmZ1bmN0aW9uIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpIHtcbiAge1xuICAgIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gZWxlbWVudDtcbiAgfVxufVxuXG57XG4gIC8vIFN0YWNrIGltcGxlbWVudGF0aW9uIGluamVjdGVkIGJ5IHRoZSBjdXJyZW50IHJlbmRlcmVyLlxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldEN1cnJlbnRTdGFjayA9IG51bGw7XG5cbiAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzdGFjayA9ICcnO1xuXG4gICAgLy8gQWRkIGFuIGV4dHJhIHRvcCBmcmFtZSB3aGlsZSBhbiBlbGVtZW50IGlzIGJlaW5nIHZhbGlkYXRlZFxuICAgIGlmIChjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50LnR5cGUpO1xuICAgICAgdmFyIG93bmVyID0gY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQuX293bmVyO1xuICAgICAgc3RhY2sgKz0gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudC5fc291cmNlLCBvd25lciAmJiBnZXRDb21wb25lbnROYW1lKG93bmVyLnR5cGUpKTtcbiAgICB9XG5cbiAgICAvLyBEZWxlZ2F0ZSB0byB0aGUgaW5qZWN0ZWQgcmVuZGVyZXItc3BlY2lmaWMgaW1wbGVtZW50YXRpb25cbiAgICB2YXIgaW1wbCA9IFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0Q3VycmVudFN0YWNrO1xuICAgIGlmIChpbXBsKSB7XG4gICAgICBzdGFjayArPSBpbXBsKCkgfHwgJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xufVxuXG52YXIgUmVhY3RTaGFyZWRJbnRlcm5hbHMgPSB7XG4gIFJlYWN0Q3VycmVudERpc3BhdGNoZXI6IFJlYWN0Q3VycmVudERpc3BhdGNoZXIsXG4gIFJlYWN0Q3VycmVudE93bmVyOiBSZWFjdEN1cnJlbnRPd25lcixcbiAgLy8gVXNlZCBieSByZW5kZXJlcnMgdG8gYXZvaWQgYnVuZGxpbmcgb2JqZWN0LWFzc2lnbiB0d2ljZSBpbiBVTUQgYnVuZGxlczpcbiAgYXNzaWduOiBfYXNzaWduXG59O1xuXG57XG4gIF9hc3NpZ24oUmVhY3RTaGFyZWRJbnRlcm5hbHMsIHtcbiAgICAvLyBUaGVzZSBzaG91bGQgbm90IGJlIGluY2x1ZGVkIGluIHByb2R1Y3Rpb24uXG4gICAgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTogUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSxcbiAgICAvLyBTaGltIGZvciBSZWFjdCBET00gMTYuMC4wIHdoaWNoIHN0aWxsIGRlc3RydWN0dXJlZCAoYnV0IG5vdCB1c2VkKSB0aGlzLlxuICAgIC8vIFRPRE86IHJlbW92ZSBpbiBSZWFjdCAxNy4wLlxuICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2s6IHt9XG4gIH0pO1xufVxuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IHdhcm5pbmdXaXRob3V0U3RhY2skMTtcblxue1xuICB3YXJuaW5nID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGNvbmRpdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZSA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlJlYWN0RGVidWdDdXJyZW50RnJhbWU7XG4gICAgdmFyIHN0YWNrID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKCk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWludGVybmFsL3dhcm5pbmctYW5kLWludmFyaWFudC1hcmdzXG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHdhcm5pbmdXaXRob3V0U3RhY2skMS5hcHBseSh1bmRlZmluZWQsIFtmYWxzZSwgZm9ybWF0ICsgJyVzJ10uY29uY2F0KGFyZ3MsIFtzdGFja10pKTtcbiAgfTtcbn1cblxudmFyIHdhcm5pbmckMSA9IHdhcm5pbmc7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHZvaWQgMDtcbnZhciBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHZvaWQgMDtcblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ2tleScpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdrZXknKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcua2V5ICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nS2V5ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24pIHtcbiAgICAgIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgIHdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgJyVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICB9XG4gIH07XG4gIHdhcm5BYm91dEFjY2Vzc2luZ0tleS5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ2tleScsIHtcbiAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ0tleSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICB2YXIgd2FybkFib3V0QWNjZXNzaW5nUmVmID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24pIHtcbiAgICAgIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICAgIHdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgJyVzOiBgcmVmYCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKTtcbiAgICB9XG4gIH07XG4gIHdhcm5BYm91dEFjY2Vzc2luZ1JlZi5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ3JlZicsIHtcbiAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ1JlZixcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlYWN0IGVsZW1lbnQuIFRoaXMgbm8gbG9uZ2VyIGFkaGVyZXMgdG9cbiAqIHRoZSBjbGFzcyBwYXR0ZXJuLCBzbyBkbyBub3QgdXNlIG5ldyB0byBjYWxsIGl0LiBBbHNvLCBubyBpbnN0YW5jZW9mIGNoZWNrXG4gKiB3aWxsIHdvcmsuIEluc3RlYWQgdGVzdCAkJHR5cGVvZiBmaWVsZCBhZ2FpbnN0IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB0byBjaGVja1xuICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7Kn0ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHJlZlxuICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSB0aGUgYG93bmVyYCB3aGVuIFJlYWN0LmNyZWF0ZUVsZW1lbnQgaXMgY2FsbGVkLCBzbyB0aGF0IHdlXG4gKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICogY2hhbmdlIGluIGJlaGF2aW9yLlxuICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICogQHBhcmFtIHsqfSBvd25lclxuICogQHBhcmFtIHsqfSBwcm9wc1xuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gIHZhciBlbGVtZW50ID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93cyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG5cbiAgICAvLyBCdWlsdC1pbiBwcm9wZXJ0aWVzIHRoYXQgYmVsb25nIG9uIHRoZSBlbGVtZW50XG4gICAgdHlwZTogdHlwZSxcbiAgICBrZXk6IGtleSxcbiAgICByZWY6IHJlZixcbiAgICBwcm9wczogcHJvcHMsXG5cbiAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgIF9vd25lcjogb3duZXJcbiAgfTtcblxuICB7XG4gICAgLy8gVGhlIHZhbGlkYXRpb24gZmxhZyBpcyBjdXJyZW50bHkgbXV0YXRpdmUuIFdlIHB1dCBpdCBvblxuICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgLy8gVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCBhIFdlYWtNYXAgb25jZSB0aGV5IGFyZSBpbXBsZW1lbnRlZCBpblxuICAgIC8vIGNvbW1vbmx5IHVzZWQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzLlxuICAgIGVsZW1lbnQuX3N0b3JlID0ge307XG5cbiAgICAvLyBUbyBtYWtlIGNvbXBhcmluZyBSZWFjdEVsZW1lbnRzIGVhc2llciBmb3IgdGVzdGluZyBwdXJwb3Nlcywgd2UgbWFrZVxuICAgIC8vIHRoZSB2YWxpZGF0aW9uIGZsYWcgbm9uLWVudW1lcmFibGUgKHdoZXJlIHBvc3NpYmxlLCB3aGljaCBzaG91bGRcbiAgICAvLyBpbmNsdWRlIGV2ZXJ5IGVudmlyb25tZW50IHdlIHJ1biB0ZXN0cyBpbiksIHNvIHRoZSB0ZXN0IGZyYW1ld29ya1xuICAgIC8vIGlnbm9yZXMgaXQuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQuX3N0b3JlLCAndmFsaWRhdGVkJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogZmFsc2VcbiAgICB9KTtcbiAgICAvLyBzZWxmIGFuZCBzb3VyY2UgYXJlIERFViBvbmx5IHByb3BlcnRpZXMuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBzZWxmXG4gICAgfSk7XG4gICAgLy8gVHdvIGVsZW1lbnRzIGNyZWF0ZWQgaW4gdHdvIGRpZmZlcmVudCBwbGFjZXMgc2hvdWxkIGJlIGNvbnNpZGVyZWRcbiAgICAvLyBlcXVhbCBmb3IgdGVzdGluZyBwdXJwb3NlcyBhbmQgdGhlcmVmb3JlIHdlIGhpZGUgaXQgZnJvbSBlbnVtZXJhdGlvbi5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zb3VyY2UnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogc291cmNlXG4gICAgfSk7XG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2NyZWF0ZWVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZSA9IHZvaWQgMDtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBwcm9wcyA9IHt9O1xuXG4gIHZhciBrZXkgPSBudWxsO1xuICB2YXIgcmVmID0gbnVsbDtcbiAgdmFyIHNlbGYgPSBudWxsO1xuICB2YXIgc291cmNlID0gbnVsbDtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICBzZWxmID0gY29uZmlnLl9fc2VsZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NlbGY7XG4gICAgc291cmNlID0gY29uZmlnLl9fc291cmNlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc291cmNlO1xuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHtcbiAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgIE9iamVjdC5mcmVlemUoY2hpbGRBcnJheSk7XG4gICAgICB9XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcbiAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHtcbiAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuICAgICAgaWYgKGtleSkge1xuICAgICAgICBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKHJlZikge1xuICAgICAgICBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIFJlYWN0RWxlbWVudHMgb2YgYSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNjcmVhdGVmYWN0b3J5XG4gKi9cblxuXG5mdW5jdGlvbiBjbG9uZUFuZFJlcGxhY2VLZXkob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG5cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQ2xvbmUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgdXNpbmcgZWxlbWVudCBhcyB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2Nsb25lZWxlbWVudFxuICovXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnQoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICAhIShlbGVtZW50ID09PSBudWxsIHx8IGVsZW1lbnQgPT09IHVuZGVmaW5lZCkgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5jbG9uZUVsZW1lbnQoLi4uKTogVGhlIGFyZ3VtZW50IG11c3QgYmUgYSBSZWFjdCBlbGVtZW50LCBidXQgeW91IHBhc3NlZCAlcy4nLCBlbGVtZW50KSA6IHZvaWQgMDtcblxuICB2YXIgcHJvcE5hbWUgPSB2b2lkIDA7XG5cbiAgLy8gT3JpZ2luYWwgcHJvcHMgYXJlIGNvcGllZFxuICB2YXIgcHJvcHMgPSBfYXNzaWduKHt9LCBlbGVtZW50LnByb3BzKTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBrZXkgPSBlbGVtZW50LmtleTtcbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICAvLyBTZWxmIGlzIHByZXNlcnZlZCBzaW5jZSB0aGUgb3duZXIgaXMgcHJlc2VydmVkLlxuICB2YXIgc2VsZiA9IGVsZW1lbnQuX3NlbGY7XG4gIC8vIFNvdXJjZSBpcyBwcmVzZXJ2ZWQgc2luY2UgY2xvbmVFbGVtZW50IGlzIHVubGlrZWx5IHRvIGJlIHRhcmdldGVkIGJ5IGFcbiAgLy8gdHJhbnNwaWxlciwgYW5kIHRoZSBvcmlnaW5hbCBzb3VyY2UgaXMgcHJvYmFibHkgYSBiZXR0ZXIgaW5kaWNhdG9yIG9mIHRoZVxuICAvLyB0cnVlIG93bmVyLlxuICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlO1xuXG4gIC8vIE93bmVyIHdpbGwgYmUgcHJlc2VydmVkLCB1bmxlc3MgcmVmIGlzIG92ZXJyaWRkZW5cbiAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIC8vIFNpbGVudGx5IHN0ZWFsIHRoZSByZWYgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBvdmVycmlkZSBleGlzdGluZyBwcm9wc1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB2b2lkIDA7XG4gICAgaWYgKGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICBkZWZhdWx0UHJvcHMgPSBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzO1xuICAgIH1cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBpZiAoY29uZmlnW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkICYmIGRlZmF1bHRQcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0RWxlbWVudChlbGVtZW50LnR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcyk7XG59XG5cbi8qKlxuICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjaXN2YWxpZGVsZW1lbnRcbiAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgUmVhY3RFbGVtZW50LlxuICogQGZpbmFsXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuXG52YXIgU0VQQVJBVE9SID0gJy4nO1xudmFyIFNVQlNFUEFSQVRPUiA9ICc6JztcblxuLyoqXG4gKiBFc2NhcGUgYW5kIHdyYXAga2V5IHNvIGl0IGlzIHNhZmUgdG8gdXNlIGFzIGEgcmVhY3RpZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gYmUgZXNjYXBlZC5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGVzY2FwZWQga2V5LlxuICovXG5mdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gIHZhciBlc2NhcGVSZWdleCA9IC9bPTpdL2c7XG4gIHZhciBlc2NhcGVyTG9va3VwID0ge1xuICAgICc9JzogJz0wJyxcbiAgICAnOic6ICc9MidcbiAgfTtcbiAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG5cbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG52YXIgUE9PTF9TSVpFID0gMTA7XG52YXIgdHJhdmVyc2VDb250ZXh0UG9vbCA9IFtdO1xuZnVuY3Rpb24gZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0KG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICBpZiAodHJhdmVyc2VDb250ZXh0UG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gdHJhdmVyc2VDb250ZXh0UG9vbC5wb3AoKTtcbiAgICB0cmF2ZXJzZUNvbnRleHQucmVzdWx0ID0gbWFwUmVzdWx0O1xuICAgIHRyYXZlcnNlQ29udGV4dC5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gICAgdHJhdmVyc2VDb250ZXh0LmZ1bmMgPSBtYXBGdW5jdGlvbjtcbiAgICB0cmF2ZXJzZUNvbnRleHQuY29udGV4dCA9IG1hcENvbnRleHQ7XG4gICAgdHJhdmVyc2VDb250ZXh0LmNvdW50ID0gMDtcbiAgICByZXR1cm4gdHJhdmVyc2VDb250ZXh0O1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICByZXN1bHQ6IG1hcFJlc3VsdCxcbiAgICAgIGtleVByZWZpeDoga2V5UHJlZml4LFxuICAgICAgZnVuYzogbWFwRnVuY3Rpb24sXG4gICAgICBjb250ZXh0OiBtYXBDb250ZXh0LFxuICAgICAgY291bnQ6IDBcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbGVhc2VUcmF2ZXJzZUNvbnRleHQodHJhdmVyc2VDb250ZXh0KSB7XG4gIHRyYXZlcnNlQ29udGV4dC5yZXN1bHQgPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQua2V5UHJlZml4ID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmZ1bmMgPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQuY29udGV4dCA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5jb3VudCA9IDA7XG4gIGlmICh0cmF2ZXJzZUNvbnRleHRQb29sLmxlbmd0aCA8IFBPT0xfU0laRSkge1xuICAgIHRyYXZlcnNlQ29udGV4dFBvb2wucHVzaCh0cmF2ZXJzZUNvbnRleHQpO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0geyFzdHJpbmd9IG5hbWVTb0ZhciBOYW1lIG9mIHRoZSBrZXkgcGF0aCBzbyBmYXIuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2sgdG8gaW52b2tlIHdpdGggZWFjaCBjaGlsZCBmb3VuZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBVc2VkIHRvIHBhc3MgaW5mb3JtYXRpb24gdGhyb3VnaG91dCB0aGUgdHJhdmVyc2FsXG4gKiBwcm9jZXNzLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCBuYW1lU29GYXIsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgY2hpbGRyZW47XG5cbiAgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgIC8vIEFsbCBvZiB0aGUgYWJvdmUgYXJlIHBlcmNlaXZlZCBhcyBudWxsLlxuICAgIGNoaWxkcmVuID0gbnVsbDtcbiAgfVxuXG4gIHZhciBpbnZva2VDYWxsYmFjayA9IGZhbHNlO1xuXG4gIGlmIChjaGlsZHJlbiA9PT0gbnVsbCkge1xuICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgc3dpdGNoIChjaGlsZHJlbi4kJHR5cGVvZikge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgICAgICBpbnZva2VDYWxsYmFjayA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoaW52b2tlQ2FsbGJhY2spIHtcbiAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLFxuICAgIC8vIElmIGl0J3MgdGhlIG9ubHkgY2hpbGQsIHRyZWF0IHRoZSBuYW1lIGFzIGlmIGl0IHdhcyB3cmFwcGVkIGluIGFuIGFycmF5XG4gICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkcmVuLCAwKSA6IG5hbWVTb0Zhcik7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgY2hpbGQgPSB2b2lkIDA7XG4gIHZhciBuZXh0TmFtZSA9IHZvaWQgMDtcbiAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbik7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB7XG4gICAgICAgIC8vIFdhcm4gYWJvdXQgdXNpbmcgTWFwcyBhcyBjaGlsZHJlblxuICAgICAgICBpZiAoaXRlcmF0b3JGbiA9PT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICAgICFkaWRXYXJuQWJvdXRNYXBzID8gd2FybmluZyQxKGZhbHNlLCAnVXNpbmcgTWFwcyBhcyBjaGlsZHJlbiBpcyB1bnN1cHBvcnRlZCBhbmQgd2lsbCBsaWtlbHkgeWllbGQgJyArICd1bmV4cGVjdGVkIHJlc3VsdHMuIENvbnZlcnQgaXQgdG8gYSBzZXF1ZW5jZS9pdGVyYWJsZSBvZiBrZXllZCAnICsgJ1JlYWN0RWxlbWVudHMgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXAgPSB2b2lkIDA7XG4gICAgICB2YXIgaWkgPSAwO1xuICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICBjaGlsZCA9IHN0ZXAudmFsdWU7XG4gICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgYWRkZW5kdW0gPSAnJztcbiAgICAgIHtcbiAgICAgICAgYWRkZW5kdW0gPSAnIElmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgJyArICdpbnN0ZWFkLicgKyBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKTtcbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZHJlblN0cmluZyA9ICcnICsgY2hpbGRyZW47XG4gICAgICBpbnZhcmlhbnQoZmFsc2UsICdPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBSZWFjdCBjaGlsZCAoZm91bmQ6ICVzKS4lcycsIGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZywgYWRkZW5kdW0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWJ0cmVlQ291bnQ7XG59XG5cbi8qKlxuICogVHJhdmVyc2VzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCwgYnV0XG4gKiBtaWdodCBhbHNvIGJlIHNwZWNpZmllZCB0aHJvdWdoIGF0dHJpYnV0ZXM6XG4gKlxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmNoaWxkcmVuLCAuLi4pYFxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmxlZnRQYW5lbENoaWxkcmVuLCAuLi4pYFxuICpcbiAqIFRoZSBgdHJhdmVyc2VDb250ZXh0YCBpcyBhbiBvcHRpb25hbCBhcmd1bWVudCB0aGF0IGlzIHBhc3NlZCB0aHJvdWdoIHRoZVxuICogZW50aXJlIHRyYXZlcnNhbC4gSXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgYWNjdW11bGF0aW9ucyBvciBhbnl0aGluZyBlbHNlIHRoYXRcbiAqIHRoZSBjYWxsYmFjayBtaWdodCBmaW5kIHJlbGV2YW50LlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgb2JqZWN0LlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIFRvIGludm9rZSB1cG9uIHRyYXZlcnNpbmcgZWFjaCBjaGlsZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBDb250ZXh0IGZvciB0cmF2ZXJzYWwuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCAnJywgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBjb21wb25lbnQgQSBjb21wb25lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnb2JqZWN0JyAmJiBjb21wb25lbnQgIT09IG51bGwgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIGVzY2FwZShjb21wb25lbnQua2V5KTtcbiAgfVxuICAvLyBJbXBsaWNpdCBrZXkgZGV0ZXJtaW5lZCBieSB0aGUgaW5kZXggaW4gdGhlIHNldFxuICByZXR1cm4gaW5kZXgudG9TdHJpbmcoMzYpO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGQoYm9va0tlZXBpbmcsIGNoaWxkLCBuYW1lKSB7XG4gIHZhciBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG4gIGZ1bmMuY2FsbChjb250ZXh0LCBjaGlsZCwgYm9va0tlZXBpbmcuY291bnQrKyk7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgdGhyb3VnaCBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVuZm9yZWFjaFxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IGdldFBvb2xlZFRyYXZlcnNlQ29udGV4dChudWxsLCBudWxsLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIHJlbGVhc2VUcmF2ZXJzZUNvbnRleHQodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gIHZhciByZXN1bHQgPSBib29rS2VlcGluZy5yZXN1bHQsXG4gICAgICBrZXlQcmVmaXggPSBib29rS2VlcGluZy5rZXlQcmVmaXgsXG4gICAgICBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG5cbiAgdmFyIG1hcHBlZENoaWxkID0gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWFwcGVkQ2hpbGQpKSB7XG4gICAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChtYXBwZWRDaGlsZCwgcmVzdWx0LCBjaGlsZEtleSwgZnVuY3Rpb24gKGMpIHtcbiAgICAgIHJldHVybiBjO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICBpZiAoaXNWYWxpZEVsZW1lbnQobWFwcGVkQ2hpbGQpKSB7XG4gICAgICBtYXBwZWRDaGlsZCA9IGNsb25lQW5kUmVwbGFjZUtleShtYXBwZWRDaGlsZCxcbiAgICAgIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAvLyB0cmF2ZXJzZUFsbENoaWxkcmVuIHVzZWQgdG8gZG8gZm9yIG9iamVjdHMgYXMgY2hpbGRyZW5cbiAgICAgIGtleVByZWZpeCArIChtYXBwZWRDaGlsZC5rZXkgJiYgKCFjaGlsZCB8fCBjaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyBlc2NhcGVVc2VyUHJvdmlkZWRLZXkobWFwcGVkQ2hpbGQua2V5KSArICcvJyA6ICcnKSArIGNoaWxkS2V5KTtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gobWFwcGVkQ2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIGFycmF5LCBwcmVmaXgsIGZ1bmMsIGNvbnRleHQpIHtcbiAgdmFyIGVzY2FwZWRQcmVmaXggPSAnJztcbiAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgZXNjYXBlZFByZWZpeCA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShwcmVmaXgpICsgJy8nO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQoYXJyYXksIGVzY2FwZWRQcmVmaXgsIGZ1bmMsIGNvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0LCB0cmF2ZXJzZUNvbnRleHQpO1xuICByZWxlYXNlVHJhdmVyc2VDb250ZXh0KHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogTWFwcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5jb3VudFxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuLlxuICovXG5mdW5jdGlvbiBjb3VudENoaWxkcmVuKGNoaWxkcmVuKSB7XG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sIG51bGwpO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbnRvYXJyYXlcbiAqL1xuZnVuY3Rpb24gdG9BcnJheShjaGlsZHJlbikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgcmV0dXJuIGNoaWxkO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBjaGlsZCBpbiBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4gYW5kIHZlcmlmaWVzIHRoYXQgdGhlcmVcbiAqIGlzIG9ubHkgb25lIGNoaWxkIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbm9ubHlcbiAqXG4gKiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzXG4gKiBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGUgcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0b1xuICogYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmUgb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdEVsZW1lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAqIHN0cnVjdHVyZS5cbiAqL1xuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gICFpc1ZhbGlkRWxlbWVudChjaGlsZHJlbikgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5DaGlsZHJlbi5vbmx5IGV4cGVjdGVkIHRvIHJlY2VpdmUgYSBzaW5nbGUgUmVhY3QgZWxlbWVudCBjaGlsZC4nKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0KGRlZmF1bHRWYWx1ZSwgY2FsY3VsYXRlQ2hhbmdlZEJpdHMpIHtcbiAgaWYgKGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSB1bmRlZmluZWQpIHtcbiAgICBjYWxjdWxhdGVDaGFuZ2VkQml0cyA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAge1xuICAgICAgIShjYWxjdWxhdGVDaGFuZ2VkQml0cyA9PT0gbnVsbCB8fCB0eXBlb2YgY2FsY3VsYXRlQ2hhbmdlZEJpdHMgPT09ICdmdW5jdGlvbicpID8gd2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCAnY3JlYXRlQ29udGV4dDogRXhwZWN0ZWQgdGhlIG9wdGlvbmFsIHNlY29uZCBhcmd1bWVudCB0byBiZSBhICcgKyAnZnVuY3Rpb24uIEluc3RlYWQgcmVjZWl2ZWQ6ICVzJywgY2FsY3VsYXRlQ2hhbmdlZEJpdHMpIDogdm9pZCAwO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjb250ZXh0ID0ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9DT05URVhUX1RZUEUsXG4gICAgX2NhbGN1bGF0ZUNoYW5nZWRCaXRzOiBjYWxjdWxhdGVDaGFuZ2VkQml0cyxcbiAgICAvLyBBcyBhIHdvcmthcm91bmQgdG8gc3VwcG9ydCBtdWx0aXBsZSBjb25jdXJyZW50IHJlbmRlcmVycywgd2UgY2F0ZWdvcml6ZVxuICAgIC8vIHNvbWUgcmVuZGVyZXJzIGFzIHByaW1hcnkgYW5kIG90aGVycyBhcyBzZWNvbmRhcnkuIFdlIG9ubHkgZXhwZWN0XG4gICAgLy8gdGhlcmUgdG8gYmUgdHdvIGNvbmN1cnJlbnQgcmVuZGVyZXJzIGF0IG1vc3Q6IFJlYWN0IE5hdGl2ZSAocHJpbWFyeSkgYW5kXG4gICAgLy8gRmFicmljIChzZWNvbmRhcnkpOyBSZWFjdCBET00gKHByaW1hcnkpIGFuZCBSZWFjdCBBUlQgKHNlY29uZGFyeSkuXG4gICAgLy8gU2Vjb25kYXJ5IHJlbmRlcmVycyBzdG9yZSB0aGVpciBjb250ZXh0IHZhbHVlcyBvbiBzZXBhcmF0ZSBmaWVsZHMuXG4gICAgX2N1cnJlbnRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgIF9jdXJyZW50VmFsdWUyOiBkZWZhdWx0VmFsdWUsXG4gICAgLy8gVXNlZCB0byB0cmFjayBob3cgbWFueSBjb25jdXJyZW50IHJlbmRlcmVycyB0aGlzIGNvbnRleHQgY3VycmVudGx5XG4gICAgLy8gc3VwcG9ydHMgd2l0aGluIGluIGEgc2luZ2xlIHJlbmRlcmVyLiBTdWNoIGFzIHBhcmFsbGVsIHNlcnZlciByZW5kZXJpbmcuXG4gICAgX3RocmVhZENvdW50OiAwLFxuICAgIC8vIFRoZXNlIGFyZSBjaXJjdWxhclxuICAgIFByb3ZpZGVyOiBudWxsLFxuICAgIENvbnN1bWVyOiBudWxsXG4gIH07XG5cbiAgY29udGV4dC5Qcm92aWRlciA9IHtcbiAgICAkJHR5cGVvZjogUkVBQ1RfUFJPVklERVJfVFlQRSxcbiAgICBfY29udGV4dDogY29udGV4dFxuICB9O1xuXG4gIHZhciBoYXNXYXJuZWRBYm91dFVzaW5nTmVzdGVkQ29udGV4dENvbnN1bWVycyA9IGZhbHNlO1xuICB2YXIgaGFzV2FybmVkQWJvdXRVc2luZ0NvbnN1bWVyUHJvdmlkZXIgPSBmYWxzZTtcblxuICB7XG4gICAgLy8gQSBzZXBhcmF0ZSBvYmplY3QsIGJ1dCBwcm94aWVzIGJhY2sgdG8gdGhlIG9yaWdpbmFsIGNvbnRleHQgb2JqZWN0IGZvclxuICAgIC8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LiBJdCBoYXMgYSBkaWZmZXJlbnQgJCR0eXBlb2YsIHNvIHdlIGNhbiBwcm9wZXJseVxuICAgIC8vIHdhcm4gZm9yIHRoZSBpbmNvcnJlY3QgdXNhZ2Ugb2YgQ29udGV4dCBhcyBhIENvbnN1bWVyLlxuICAgIHZhciBDb25zdW1lciA9IHtcbiAgICAgICQkdHlwZW9mOiBSRUFDVF9DT05URVhUX1RZUEUsXG4gICAgICBfY29udGV4dDogY29udGV4dCxcbiAgICAgIF9jYWxjdWxhdGVDaGFuZ2VkQml0czogY29udGV4dC5fY2FsY3VsYXRlQ2hhbmdlZEJpdHNcbiAgICB9O1xuICAgIC8vICRGbG93Rml4TWU6IEZsb3cgY29tcGxhaW5zIGFib3V0IG5vdCBzZXR0aW5nIGEgdmFsdWUsIHdoaWNoIGlzIGludGVudGlvbmFsIGhlcmVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhDb25zdW1lciwge1xuICAgICAgUHJvdmlkZXI6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCFoYXNXYXJuZWRBYm91dFVzaW5nQ29uc3VtZXJQcm92aWRlcikge1xuICAgICAgICAgICAgaGFzV2FybmVkQWJvdXRVc2luZ0NvbnN1bWVyUHJvdmlkZXIgPSB0cnVlO1xuICAgICAgICAgICAgd2FybmluZyQxKGZhbHNlLCAnUmVuZGVyaW5nIDxDb250ZXh0LkNvbnN1bWVyLlByb3ZpZGVyPiBpcyBub3Qgc3VwcG9ydGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gJyArICdhIGZ1dHVyZSBtYWpvciByZWxlYXNlLiBEaWQgeW91IG1lYW4gdG8gcmVuZGVyIDxDb250ZXh0LlByb3ZpZGVyPiBpbnN0ZWFkPycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY29udGV4dC5Qcm92aWRlcjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoX1Byb3ZpZGVyKSB7XG4gICAgICAgICAgY29udGV4dC5Qcm92aWRlciA9IF9Qcm92aWRlcjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIF9jdXJyZW50VmFsdWU6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuX2N1cnJlbnRWYWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoX2N1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgIGNvbnRleHQuX2N1cnJlbnRWYWx1ZSA9IF9jdXJyZW50VmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfY3VycmVudFZhbHVlMjoge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY29udGV4dC5fY3VycmVudFZhbHVlMjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoX2N1cnJlbnRWYWx1ZTIpIHtcbiAgICAgICAgICBjb250ZXh0Ll9jdXJyZW50VmFsdWUyID0gX2N1cnJlbnRWYWx1ZTI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfdGhyZWFkQ291bnQ6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuX3RocmVhZENvdW50O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChfdGhyZWFkQ291bnQpIHtcbiAgICAgICAgICBjb250ZXh0Ll90aHJlYWRDb3VudCA9IF90aHJlYWRDb3VudDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIENvbnN1bWVyOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICghaGFzV2FybmVkQWJvdXRVc2luZ05lc3RlZENvbnRleHRDb25zdW1lcnMpIHtcbiAgICAgICAgICAgIGhhc1dhcm5lZEFib3V0VXNpbmdOZXN0ZWRDb250ZXh0Q29uc3VtZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgIHdhcm5pbmckMShmYWxzZSwgJ1JlbmRlcmluZyA8Q29udGV4dC5Db25zdW1lci5Db25zdW1lcj4gaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgKyAnYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIHJlbmRlciA8Q29udGV4dC5Db25zdW1lcj4gaW5zdGVhZD8nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuQ29uc3VtZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyAkRmxvd0ZpeE1lOiBGbG93IGNvbXBsYWlucyBhYm91dCBtaXNzaW5nIHByb3BlcnRpZXMgYmVjYXVzZSBpdCBkb2Vzbid0IHVuZGVyc3RhbmQgZGVmaW5lUHJvcGVydHlcbiAgICBjb250ZXh0LkNvbnN1bWVyID0gQ29uc3VtZXI7XG4gIH1cblxuICB7XG4gICAgY29udGV4dC5fY3VycmVudFJlbmRlcmVyID0gbnVsbDtcbiAgICBjb250ZXh0Ll9jdXJyZW50UmVuZGVyZXIyID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBjb250ZXh0O1xufVxuXG5mdW5jdGlvbiBsYXp5KGN0b3IpIHtcbiAgdmFyIGxhenlUeXBlID0ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9MQVpZX1RZUEUsXG4gICAgX2N0b3I6IGN0b3IsXG4gICAgLy8gUmVhY3QgdXNlcyB0aGVzZSBmaWVsZHMgdG8gc3RvcmUgdGhlIHJlc3VsdC5cbiAgICBfc3RhdHVzOiAtMSxcbiAgICBfcmVzdWx0OiBudWxsXG4gIH07XG5cbiAge1xuICAgIC8vIEluIHByb2R1Y3Rpb24sIHRoaXMgd291bGQganVzdCBzZXQgaXQgb24gdGhlIG9iamVjdC5cbiAgICB2YXIgZGVmYXVsdFByb3BzID0gdm9pZCAwO1xuICAgIHZhciBwcm9wVHlwZXMgPSB2b2lkIDA7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobGF6eVR5cGUsIHtcbiAgICAgIGRlZmF1bHRQcm9wczoge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBkZWZhdWx0UHJvcHM7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0RlZmF1bHRQcm9wcykge1xuICAgICAgICAgIHdhcm5pbmckMShmYWxzZSwgJ1JlYWN0LmxhenkoLi4uKTogSXQgaXMgbm90IHN1cHBvcnRlZCB0byBhc3NpZ24gYGRlZmF1bHRQcm9wc2AgdG8gJyArICdhIGxhenkgY29tcG9uZW50IGltcG9ydC4gRWl0aGVyIHNwZWNpZnkgdGhlbSB3aGVyZSB0aGUgY29tcG9uZW50ICcgKyAnaXMgZGVmaW5lZCwgb3IgY3JlYXRlIGEgd3JhcHBpbmcgY29tcG9uZW50IGFyb3VuZCBpdC4nKTtcbiAgICAgICAgICBkZWZhdWx0UHJvcHMgPSBuZXdEZWZhdWx0UHJvcHM7XG4gICAgICAgICAgLy8gTWF0Y2ggcHJvZHVjdGlvbiBiZWhhdmlvciBtb3JlIGNsb3NlbHk6XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGxhenlUeXBlLCAnZGVmYXVsdFByb3BzJywge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BUeXBlcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3UHJvcFR5cGVzKSB7XG4gICAgICAgICAgd2FybmluZyQxKGZhbHNlLCAnUmVhY3QubGF6eSguLi4pOiBJdCBpcyBub3Qgc3VwcG9ydGVkIHRvIGFzc2lnbiBgcHJvcFR5cGVzYCB0byAnICsgJ2EgbGF6eSBjb21wb25lbnQgaW1wb3J0LiBFaXRoZXIgc3BlY2lmeSB0aGVtIHdoZXJlIHRoZSBjb21wb25lbnQgJyArICdpcyBkZWZpbmVkLCBvciBjcmVhdGUgYSB3cmFwcGluZyBjb21wb25lbnQgYXJvdW5kIGl0LicpO1xuICAgICAgICAgIHByb3BUeXBlcyA9IG5ld1Byb3BUeXBlcztcbiAgICAgICAgICAvLyBNYXRjaCBwcm9kdWN0aW9uIGJlaGF2aW9yIG1vcmUgY2xvc2VseTpcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobGF6eVR5cGUsICdwcm9wVHlwZXMnLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBsYXp5VHlwZTtcbn1cblxuZnVuY3Rpb24gZm9yd2FyZFJlZihyZW5kZXIpIHtcbiAge1xuICAgIGlmIChyZW5kZXIgIT0gbnVsbCAmJiByZW5kZXIuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSkge1xuICAgICAgd2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCAnZm9yd2FyZFJlZiByZXF1aXJlcyBhIHJlbmRlciBmdW5jdGlvbiBidXQgcmVjZWl2ZWQgYSBgbWVtb2AgJyArICdjb21wb25lbnQuIEluc3RlYWQgb2YgZm9yd2FyZFJlZihtZW1vKC4uLikpLCB1c2UgJyArICdtZW1vKGZvcndhcmRSZWYoLi4uKSkuJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVuZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdmb3J3YXJkUmVmIHJlcXVpcmVzIGEgcmVuZGVyIGZ1bmN0aW9uIGJ1dCB3YXMgZ2l2ZW4gJXMuJywgcmVuZGVyID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHJlbmRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICEoXG4gICAgICAvLyBEbyBub3Qgd2FybiBmb3IgMCBhcmd1bWVudHMgYmVjYXVzZSBpdCBjb3VsZCBiZSBkdWUgdG8gdXNhZ2Ugb2YgdGhlICdhcmd1bWVudHMnIG9iamVjdFxuICAgICAgcmVuZGVyLmxlbmd0aCA9PT0gMCB8fCByZW5kZXIubGVuZ3RoID09PSAyKSA/IHdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgJ2ZvcndhcmRSZWYgcmVuZGVyIGZ1bmN0aW9ucyBhY2NlcHQgZXhhY3RseSB0d28gcGFyYW1ldGVyczogcHJvcHMgYW5kIHJlZi4gJXMnLCByZW5kZXIubGVuZ3RoID09PSAxID8gJ0RpZCB5b3UgZm9yZ2V0IHRvIHVzZSB0aGUgcmVmIHBhcmFtZXRlcj8nIDogJ0FueSBhZGRpdGlvbmFsIHBhcmFtZXRlciB3aWxsIGJlIHVuZGVmaW5lZC4nKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICBpZiAocmVuZGVyICE9IG51bGwpIHtcbiAgICAgICEocmVuZGVyLmRlZmF1bHRQcm9wcyA9PSBudWxsICYmIHJlbmRlci5wcm9wVHlwZXMgPT0gbnVsbCkgPyB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdmb3J3YXJkUmVmIHJlbmRlciBmdW5jdGlvbnMgZG8gbm90IHN1cHBvcnQgcHJvcFR5cGVzIG9yIGRlZmF1bHRQcm9wcy4gJyArICdEaWQgeW91IGFjY2lkZW50YWxseSBwYXNzIGEgUmVhY3QgY29tcG9uZW50PycpIDogdm9pZCAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUsXG4gICAgcmVuZGVyOiByZW5kZXJcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGVvZiB0eXBlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAvLyBOb3RlOiBpdHMgdHlwZW9mIG1pZ2h0IGJlIG90aGVyIHRoYW4gJ3N5bWJvbCcgb3IgJ251bWJlcicgaWYgaXQncyBhIHBvbHlmaWxsLlxuICB0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUpO1xufVxuXG5mdW5jdGlvbiBtZW1vKHR5cGUsIGNvbXBhcmUpIHtcbiAge1xuICAgIGlmICghaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpKSB7XG4gICAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdtZW1vOiBUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIGNvbXBvbmVudC4gSW5zdGVhZCAnICsgJ3JlY2VpdmVkOiAlcycsIHR5cGUgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgdHlwZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX01FTU9fVFlQRSxcbiAgICB0eXBlOiB0eXBlLFxuICAgIGNvbXBhcmU6IGNvbXBhcmUgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb21wYXJlXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVEaXNwYXRjaGVyKCkge1xuICB2YXIgZGlzcGF0Y2hlciA9IFJlYWN0Q3VycmVudERpc3BhdGNoZXIuY3VycmVudDtcbiAgIShkaXNwYXRjaGVyICE9PSBudWxsKSA/IGludmFyaWFudChmYWxzZSwgJ0ludmFsaWQgaG9vayBjYWxsLiBIb29rcyBjYW4gb25seSBiZSBjYWxsZWQgaW5zaWRlIG9mIHRoZSBib2R5IG9mIGEgZnVuY3Rpb24gY29tcG9uZW50LiBUaGlzIGNvdWxkIGhhcHBlbiBmb3Igb25lIG9mIHRoZSBmb2xsb3dpbmcgcmVhc29uczpcXG4xLiBZb3UgbWlnaHQgaGF2ZSBtaXNtYXRjaGluZyB2ZXJzaW9ucyBvZiBSZWFjdCBhbmQgdGhlIHJlbmRlcmVyIChzdWNoIGFzIFJlYWN0IERPTSlcXG4yLiBZb3UgbWlnaHQgYmUgYnJlYWtpbmcgdGhlIFJ1bGVzIG9mIEhvb2tzXFxuMy4gWW91IG1pZ2h0IGhhdmUgbW9yZSB0aGFuIG9uZSBjb3B5IG9mIFJlYWN0IGluIHRoZSBzYW1lIGFwcFxcblNlZSBodHRwczovL2ZiLm1lL3JlYWN0LWludmFsaWQtaG9vay1jYWxsIGZvciB0aXBzIGFib3V0IGhvdyB0byBkZWJ1ZyBhbmQgZml4IHRoaXMgcHJvYmxlbS4nKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGRpc3BhdGNoZXI7XG59XG5cbmZ1bmN0aW9uIHVzZUNvbnRleHQoQ29udGV4dCwgdW5zdGFibGVfb2JzZXJ2ZWRCaXRzKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAge1xuICAgICEodW5zdGFibGVfb2JzZXJ2ZWRCaXRzID09PSB1bmRlZmluZWQpID8gd2FybmluZyQxKGZhbHNlLCAndXNlQ29udGV4dCgpIHNlY29uZCBhcmd1bWVudCBpcyByZXNlcnZlZCBmb3IgZnV0dXJlICcgKyAndXNlIGluIFJlYWN0LiBQYXNzaW5nIGl0IGlzIG5vdCBzdXBwb3J0ZWQuICcgKyAnWW91IHBhc3NlZDogJXMuJXMnLCB1bnN0YWJsZV9vYnNlcnZlZEJpdHMsIHR5cGVvZiB1bnN0YWJsZV9vYnNlcnZlZEJpdHMgPT09ICdudW1iZXInICYmIEFycmF5LmlzQXJyYXkoYXJndW1lbnRzWzJdKSA/ICdcXG5cXG5EaWQgeW91IGNhbGwgYXJyYXkubWFwKHVzZUNvbnRleHQpPyAnICsgJ0NhbGxpbmcgSG9va3MgaW5zaWRlIGEgbG9vcCBpcyBub3Qgc3VwcG9ydGVkLiAnICsgJ0xlYXJuIG1vcmUgYXQgaHR0cHM6Ly9mYi5tZS9ydWxlcy1vZi1ob29rcycgOiAnJykgOiB2b2lkIDA7XG5cbiAgICAvLyBUT0RPOiBhZGQgYSBtb3JlIGdlbmVyaWMgd2FybmluZyBmb3IgaW52YWxpZCB2YWx1ZXMuXG4gICAgaWYgKENvbnRleHQuX2NvbnRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHJlYWxDb250ZXh0ID0gQ29udGV4dC5fY29udGV4dDtcbiAgICAgIC8vIERvbid0IGRlZHVwbGljYXRlIGJlY2F1c2UgdGhpcyBsZWdpdGltYXRlbHkgY2F1c2VzIGJ1Z3NcbiAgICAgIC8vIGFuZCBub2JvZHkgc2hvdWxkIGJlIHVzaW5nIHRoaXMgaW4gZXhpc3RpbmcgY29kZS5cbiAgICAgIGlmIChyZWFsQ29udGV4dC5Db25zdW1lciA9PT0gQ29udGV4dCkge1xuICAgICAgICB3YXJuaW5nJDEoZmFsc2UsICdDYWxsaW5nIHVzZUNvbnRleHQoQ29udGV4dC5Db25zdW1lcikgaXMgbm90IHN1cHBvcnRlZCwgbWF5IGNhdXNlIGJ1Z3MsIGFuZCB3aWxsIGJlICcgKyAncmVtb3ZlZCBpbiBhIGZ1dHVyZSBtYWpvciByZWxlYXNlLiBEaWQgeW91IG1lYW4gdG8gY2FsbCB1c2VDb250ZXh0KENvbnRleHQpIGluc3RlYWQ/Jyk7XG4gICAgICB9IGVsc2UgaWYgKHJlYWxDb250ZXh0LlByb3ZpZGVyID09PSBDb250ZXh0KSB7XG4gICAgICAgIHdhcm5pbmckMShmYWxzZSwgJ0NhbGxpbmcgdXNlQ29udGV4dChDb250ZXh0LlByb3ZpZGVyKSBpcyBub3Qgc3VwcG9ydGVkLiAnICsgJ0RpZCB5b3UgbWVhbiB0byBjYWxsIHVzZUNvbnRleHQoQ29udGV4dCkgaW5zdGVhZD8nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlQ29udGV4dChDb250ZXh0LCB1bnN0YWJsZV9vYnNlcnZlZEJpdHMpO1xufVxuXG5mdW5jdGlvbiB1c2VTdGF0ZShpbml0aWFsU3RhdGUpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VTdGF0ZShpbml0aWFsU3RhdGUpO1xufVxuXG5mdW5jdGlvbiB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxBcmcsIGluaXQpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxBcmcsIGluaXQpO1xufVxuXG5mdW5jdGlvbiB1c2VSZWYoaW5pdGlhbFZhbHVlKSB7XG4gIHZhciBkaXNwYXRjaGVyID0gcmVzb2x2ZURpc3BhdGNoZXIoKTtcbiAgcmV0dXJuIGRpc3BhdGNoZXIudXNlUmVmKGluaXRpYWxWYWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHVzZUVmZmVjdChjcmVhdGUsIGlucHV0cykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUVmZmVjdChjcmVhdGUsIGlucHV0cyk7XG59XG5cbmZ1bmN0aW9uIHVzZUxheW91dEVmZmVjdChjcmVhdGUsIGlucHV0cykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZUxheW91dEVmZmVjdChjcmVhdGUsIGlucHV0cyk7XG59XG5cbmZ1bmN0aW9uIHVzZUNhbGxiYWNrKGNhbGxiYWNrLCBpbnB1dHMpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VDYWxsYmFjayhjYWxsYmFjaywgaW5wdXRzKTtcbn1cblxuZnVuY3Rpb24gdXNlTWVtbyhjcmVhdGUsIGlucHV0cykge1xuICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gIHJldHVybiBkaXNwYXRjaGVyLnVzZU1lbW8oY3JlYXRlLCBpbnB1dHMpO1xufVxuXG5mdW5jdGlvbiB1c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgY3JlYXRlLCBpbnB1dHMpIHtcbiAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICByZXR1cm4gZGlzcGF0Y2hlci51c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgY3JlYXRlLCBpbnB1dHMpO1xufVxuXG5mdW5jdGlvbiB1c2VEZWJ1Z1ZhbHVlKHZhbHVlLCBmb3JtYXR0ZXJGbikge1xuICB7XG4gICAgdmFyIGRpc3BhdGNoZXIgPSByZXNvbHZlRGlzcGF0Y2hlcigpO1xuICAgIHJldHVybiBkaXNwYXRjaGVyLnVzZURlYnVnVmFsdWUodmFsdWUsIGZvcm1hdHRlckZuKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlYWN0RWxlbWVudFZhbGlkYXRvciBwcm92aWRlcyBhIHdyYXBwZXIgYXJvdW5kIGEgZWxlbWVudCBmYWN0b3J5XG4gKiB3aGljaCB2YWxpZGF0ZXMgdGhlIHByb3BzIHBhc3NlZCB0byB0aGUgZWxlbWVudC4gVGhpcyBpcyBpbnRlbmRlZCB0byBiZVxuICogdXNlZCBvbmx5IGluIERFViBhbmQgY291bGQgYmUgcmVwbGFjZWQgYnkgYSBzdGF0aWMgdHlwZSBjaGVja2VyIGZvciBsYW5ndWFnZXNcbiAqIHRoYXQgc3VwcG9ydCBpdC5cbiAqL1xuXG52YXIgcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24gPSB2b2lkIDA7XG5cbntcbiAgcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24gPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnR5cGUpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oZWxlbWVudFByb3BzKSB7XG4gIGlmIChlbGVtZW50UHJvcHMgIT09IG51bGwgJiYgZWxlbWVudFByb3BzICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudFByb3BzLl9fc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudFByb3BzLl9fc291cmNlO1xuICAgIHZhciBmaWxlTmFtZSA9IHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgdmFyIGxpbmVOdW1iZXIgPSBzb3VyY2UubGluZU51bWJlcjtcbiAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHlvdXIgY29kZSBhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBsaW5lTnVtYmVyICsgJy4nO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGluZm8gPSAnXFxuXFxuQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5mbztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcblxuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG4gIGlmIChvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgb3duZXJIYXNLZXlVc2VXYXJuaW5nW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dID0gdHJ1ZTtcblxuICAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cbiAgdmFyIGNoaWxkT3duZXIgPSAnJztcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBjaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZ2V0Q29tcG9uZW50TmFtZShlbGVtZW50Ll9vd25lci50eXBlKSArICcuJztcbiAgfVxuXG4gIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpO1xuICB7XG4gICAgd2FybmluZyQxKGZhbHNlLCAnRWFjaCBjaGlsZCBpbiBhIGxpc3Qgc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJywgY3VycmVudENvbXBvbmVudEVycm9ySW5mbywgY2hpbGRPd25lcik7XG4gIH1cbiAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQobnVsbCk7XG59XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgZXZlcnkgZWxlbWVudCBlaXRoZXIgaXMgcGFzc2VkIGluIGEgc3RhdGljIGxvY2F0aW9uLCBpbiBhblxuICogYXJyYXkgd2l0aCBhbiBleHBsaWNpdCBrZXlzIHByb3BlcnR5IGRlZmluZWQsIG9yIGluIGFuIG9iamVjdCBsaXRlcmFsXG4gKiB3aXRoIHZhbGlkIGtleSBwcm9wZXJ0eS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3ROb2RlfSBub2RlIFN0YXRpY2FsbHkgcGFzc2VkIGNoaWxkIG9mIGFueSB0eXBlLlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIG5vZGUncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlLCBwYXJlbnRUeXBlKSB7XG4gIGlmICh0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IG5vZGVbaV07XG4gICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChpc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gRW50cnkgaXRlcmF0b3JzIHVzZWQgdG8gcHJvdmlkZSBpbXBsaWNpdCBrZXlzLFxuICAgICAgLy8gYnV0IG5vdyB3ZSBwcmludCBhIHNlcGFyYXRlIHdhcm5pbmcgZm9yIHRoZW0gbGF0ZXIuXG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXAgPSB2b2lkIDA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIHR5cGUgPSBlbGVtZW50LnR5cGU7XG4gIGlmICh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lKHR5cGUpO1xuICB2YXIgcHJvcFR5cGVzID0gdm9pZCAwO1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBwcm9wVHlwZXMgPSB0eXBlLnByb3BUeXBlcztcbiAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHxcbiAgLy8gTm90ZTogTWVtbyBvbmx5IGNoZWNrcyBvdXRlciBwcm9wcyBoZXJlLlxuICAvLyBJbm5lciBwcm9wcyBhcmUgY2hlY2tlZCBpbiB0aGUgcmVjb25jaWxlci5cbiAgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFKSkge1xuICAgIHByb3BUeXBlcyA9IHR5cGUucHJvcFR5cGVzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocHJvcFR5cGVzKSB7XG4gICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCk7XG4gICAgY2hlY2tQcm9wVHlwZXMocHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCAncHJvcCcsIG5hbWUsIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSk7XG4gICAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQobnVsbCk7XG4gIH0gZWxzZSBpZiAodHlwZS5Qcm9wVHlwZXMgIT09IHVuZGVmaW5lZCAmJiAhcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24pIHtcbiAgICBwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgd2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCAnQ29tcG9uZW50ICVzIGRlY2xhcmVkIGBQcm9wVHlwZXNgIGluc3RlYWQgb2YgYHByb3BUeXBlc2AuIERpZCB5b3UgbWlzc3BlbGwgdGhlIHByb3BlcnR5IGFzc2lnbm1lbnQ/JywgbmFtZSB8fCAnVW5rbm93bicpO1xuICB9XG4gIGlmICh0eXBlb2YgdHlwZS5nZXREZWZhdWx0UHJvcHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAhdHlwZS5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQgPyB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdnZXREZWZhdWx0UHJvcHMgaXMgb25seSB1c2VkIG9uIGNsYXNzaWMgUmVhY3QuY3JlYXRlQ2xhc3MgJyArICdkZWZpbml0aW9ucy4gVXNlIGEgc3RhdGljIHByb3BlcnR5IG5hbWVkIGBkZWZhdWx0UHJvcHNgIGluc3RlYWQuJykgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhIGZyYWdtZW50LCB2YWxpZGF0ZSB0aGF0IGl0IGNhbiBvbmx5IGJlIHByb3ZpZGVkIHdpdGggZnJhZ21lbnQgcHJvcHNcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBmcmFnbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZnJhZ21lbnQpIHtcbiAgc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZnJhZ21lbnQpO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZnJhZ21lbnQucHJvcHMpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoa2V5ICE9PSAnY2hpbGRyZW4nICYmIGtleSAhPT0gJ2tleScpIHtcbiAgICAgIHdhcm5pbmckMShmYWxzZSwgJ0ludmFsaWQgcHJvcCBgJXNgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuICcgKyAnUmVhY3QuRnJhZ21lbnQgY2FuIG9ubHkgaGF2ZSBga2V5YCBhbmQgYGNoaWxkcmVuYCBwcm9wcy4nLCBrZXkpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKGZyYWdtZW50LnJlZiAhPT0gbnVsbCkge1xuICAgIHdhcm5pbmckMShmYWxzZSwgJ0ludmFsaWQgYXR0cmlidXRlIGByZWZgIHN1cHBsaWVkIHRvIGBSZWFjdC5GcmFnbWVudGAuJyk7XG4gIH1cblxuICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uKHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuICB2YXIgdmFsaWRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlKHR5cGUpO1xuXG4gIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gIC8vIHN1Y2NlZWQgYW5kIHRoZXJlIHdpbGwgbGlrZWx5IGJlIGVycm9ycyBpbiByZW5kZXIuXG4gIGlmICghdmFsaWRUeXBlKSB7XG4gICAgdmFyIGluZm8gPSAnJztcbiAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHR5cGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgaW5mbyArPSAnIFlvdSBsaWtlbHkgZm9yZ290IHRvIGV4cG9ydCB5b3VyIGNvbXBvbmVudCBmcm9tIHRoZSBmaWxlICcgKyBcIml0J3MgZGVmaW5lZCBpbiwgb3IgeW91IG1pZ2h0IGhhdmUgbWl4ZWQgdXAgZGVmYXVsdCBhbmQgbmFtZWQgaW1wb3J0cy5cIjtcbiAgICB9XG5cbiAgICB2YXIgc291cmNlSW5mbyA9IGdldFNvdXJjZUluZm9FcnJvckFkZGVuZHVtKHByb3BzKTtcbiAgICBpZiAoc291cmNlSW5mbykge1xuICAgICAgaW5mbyArPSBzb3VyY2VJbmZvO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvICs9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICAgIH1cblxuICAgIHZhciB0eXBlU3RyaW5nID0gdm9pZCAwO1xuICAgIGlmICh0eXBlID09PSBudWxsKSB7XG4gICAgICB0eXBlU3RyaW5nID0gJ251bGwnO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0eXBlKSkge1xuICAgICAgdHlwZVN0cmluZyA9ICdhcnJheSc7XG4gICAgfSBlbHNlIGlmICh0eXBlICE9PSB1bmRlZmluZWQgJiYgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICB0eXBlU3RyaW5nID0gJzwnICsgKGdldENvbXBvbmVudE5hbWUodHlwZS50eXBlKSB8fCAnVW5rbm93bicpICsgJyAvPic7XG4gICAgICBpbmZvID0gJyBEaWQgeW91IGFjY2lkZW50YWxseSBleHBvcnQgYSBKU1ggbGl0ZXJhbCBpbnN0ZWFkIG9mIGEgY29tcG9uZW50Pyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHR5cGVTdHJpbmcgPSB0eXBlb2YgdHlwZTtcbiAgICB9XG5cbiAgICB3YXJuaW5nJDEoZmFsc2UsICdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIGlzIGludmFsaWQgLS0gZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciAnICsgJ2J1aWx0LWluIGNvbXBvbmVudHMpIG9yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgJyArICdjb21wb25lbnRzKSBidXQgZ290OiAlcy4lcycsIHR5cGVTdHJpbmcsIGluZm8pO1xuICB9XG5cbiAgdmFyIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICBpZiAodmFsaWRUeXBlKSB7XG4gICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUpIHtcbiAgICB2YWxpZGF0ZUZyYWdtZW50UHJvcHMoZWxlbWVudCk7XG4gIH0gZWxzZSB7XG4gICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmFjdG9yeVdpdGhWYWxpZGF0aW9uKHR5cGUpIHtcbiAgdmFyIHZhbGlkYXRlZEZhY3RvcnkgPSBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24uYmluZChudWxsLCB0eXBlKTtcbiAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcbiAgLy8gTGVnYWN5IGhvb2s6IHJlbW92ZSBpdFxuICB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG93UHJpb3JpdHlXYXJuaW5nJDEoZmFsc2UsICdGYWN0b3J5LnR5cGUgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHRoZSBjbGFzcyBkaXJlY3RseSAnICsgJ2JlZm9yZSBwYXNzaW5nIGl0IHRvIGNyZWF0ZUZhY3RvcnkuJyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICB2YWx1ZTogdHlwZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbn1cblxuZnVuY3Rpb24gY2xvbmVFbGVtZW50V2l0aFZhbGlkYXRpb24oZWxlbWVudCwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHZhciBuZXdFbGVtZW50ID0gY2xvbmVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICB9XG4gIHZhbGlkYXRlUHJvcFR5cGVzKG5ld0VsZW1lbnQpO1xuICByZXR1cm4gbmV3RWxlbWVudDtcbn1cblxuLy8gSGVscHMgaWRlbnRpZnkgc2lkZSBlZmZlY3RzIGluIGJlZ2luLXBoYXNlIGxpZmVjeWNsZSBob29rcyBhbmQgc2V0U3RhdGUgcmVkdWNlcnM6XG5cblxuLy8gSW4gc29tZSBjYXNlcywgU3RyaWN0TW9kZSBzaG91bGQgYWxzbyBkb3VibGUtcmVuZGVyIGxpZmVjeWNsZXMuXG4vLyBUaGlzIGNhbiBiZSBjb25mdXNpbmcgZm9yIHRlc3RzIHRob3VnaCxcbi8vIEFuZCBpdCBjYW4gYmUgYmFkIGZvciBwZXJmb3JtYW5jZSBpbiBwcm9kdWN0aW9uLlxuLy8gVGhpcyBmZWF0dXJlIGZsYWcgY2FuIGJlIHVzZWQgdG8gY29udHJvbCB0aGUgYmVoYXZpb3I6XG5cblxuLy8gVG8gcHJlc2VydmUgdGhlIFwiUGF1c2Ugb24gY2F1Z2h0IGV4Y2VwdGlvbnNcIiBiZWhhdmlvciBvZiB0aGUgZGVidWdnZXIsIHdlXG4vLyByZXBsYXkgdGhlIGJlZ2luIHBoYXNlIG9mIGEgZmFpbGVkIGNvbXBvbmVudCBpbnNpZGUgaW52b2tlR3VhcmRlZENhbGxiYWNrLlxuXG5cbi8vIFdhcm4gYWJvdXQgZGVwcmVjYXRlZCwgYXN5bmMtdW5zYWZlIGxpZmVjeWNsZXM7IHJlbGF0ZXMgdG8gUkZDICM2OlxuXG5cbi8vIEdhdGhlciBhZHZhbmNlZCB0aW1pbmcgbWV0cmljcyBmb3IgUHJvZmlsZXIgc3VidHJlZXMuXG5cblxuLy8gVHJhY2Ugd2hpY2ggaW50ZXJhY3Rpb25zIHRyaWdnZXIgZWFjaCBjb21taXQuXG5cblxuLy8gT25seSB1c2VkIGluIHd3dyBidWlsZHMuXG4gLy8gVE9ETzogdHJ1ZT8gSGVyZSBpdCBtaWdodCBqdXN0IGJlIGZhbHNlLlxuXG4vLyBPbmx5IHVzZWQgaW4gd3d3IGJ1aWxkcy5cblxuXG4vLyBPbmx5IHVzZWQgaW4gd3d3IGJ1aWxkcy5cblxuXG4vLyBSZWFjdCBGaXJlOiBwcmV2ZW50IHRoZSB2YWx1ZSBhbmQgY2hlY2tlZCBhdHRyaWJ1dGVzIGZyb20gc3luY2luZ1xuLy8gd2l0aCB0aGVpciByZWxhdGVkIERPTSBwcm9wZXJ0aWVzXG5cblxuLy8gVGhlc2UgQVBJcyB3aWxsIG5vIGxvbmdlciBiZSBcInVuc3RhYmxlXCIgaW4gdGhlIHVwY29taW5nIDE2LjcgcmVsZWFzZSxcbi8vIENvbnRyb2wgdGhpcyBiZWhhdmlvciB3aXRoIGEgZmxhZyB0byBzdXBwb3J0IDE2LjYgbWlub3IgcmVsZWFzZXMgaW4gdGhlIG1lYW53aGlsZS5cbnZhciBlbmFibGVTdGFibGVDb25jdXJyZW50TW9kZUFQSXMgPSBmYWxzZTtcblxudmFyIFJlYWN0ID0ge1xuICBDaGlsZHJlbjoge1xuICAgIG1hcDogbWFwQ2hpbGRyZW4sXG4gICAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICAgIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICAgIHRvQXJyYXk6IHRvQXJyYXksXG4gICAgb25seTogb25seUNoaWxkXG4gIH0sXG5cbiAgY3JlYXRlUmVmOiBjcmVhdGVSZWYsXG4gIENvbXBvbmVudDogQ29tcG9uZW50LFxuICBQdXJlQ29tcG9uZW50OiBQdXJlQ29tcG9uZW50LFxuXG4gIGNyZWF0ZUNvbnRleHQ6IGNyZWF0ZUNvbnRleHQsXG4gIGZvcndhcmRSZWY6IGZvcndhcmRSZWYsXG4gIGxhenk6IGxhenksXG4gIG1lbW86IG1lbW8sXG5cbiAgdXNlQ2FsbGJhY2s6IHVzZUNhbGxiYWNrLFxuICB1c2VDb250ZXh0OiB1c2VDb250ZXh0LFxuICB1c2VFZmZlY3Q6IHVzZUVmZmVjdCxcbiAgdXNlSW1wZXJhdGl2ZUhhbmRsZTogdXNlSW1wZXJhdGl2ZUhhbmRsZSxcbiAgdXNlRGVidWdWYWx1ZTogdXNlRGVidWdWYWx1ZSxcbiAgdXNlTGF5b3V0RWZmZWN0OiB1c2VMYXlvdXRFZmZlY3QsXG4gIHVzZU1lbW86IHVzZU1lbW8sXG4gIHVzZVJlZHVjZXI6IHVzZVJlZHVjZXIsXG4gIHVzZVJlZjogdXNlUmVmLFxuICB1c2VTdGF0ZTogdXNlU3RhdGUsXG5cbiAgRnJhZ21lbnQ6IFJFQUNUX0ZSQUdNRU5UX1RZUEUsXG4gIFN0cmljdE1vZGU6IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUsXG4gIFN1c3BlbnNlOiBSRUFDVF9TVVNQRU5TRV9UWVBFLFxuXG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbixcbiAgY2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbixcbiAgY3JlYXRlRmFjdG9yeTogY3JlYXRlRmFjdG9yeVdpdGhWYWxpZGF0aW9uLFxuICBpc1ZhbGlkRWxlbWVudDogaXNWYWxpZEVsZW1lbnQsXG5cbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uLFxuXG4gIHVuc3RhYmxlX0NvbmN1cnJlbnRNb2RlOiBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSxcbiAgdW5zdGFibGVfUHJvZmlsZXI6IFJFQUNUX1BST0ZJTEVSX1RZUEUsXG5cbiAgX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ6IFJlYWN0U2hhcmVkSW50ZXJuYWxzXG59O1xuXG4vLyBOb3RlOiBzb21lIEFQSXMgYXJlIGFkZGVkIHdpdGggZmVhdHVyZSBmbGFncy5cbi8vIE1ha2Ugc3VyZSB0aGF0IHN0YWJsZSBidWlsZHMgZm9yIG9wZW4gc291cmNlXG4vLyBkb24ndCBtb2RpZnkgdGhlIFJlYWN0IG9iamVjdCB0byBhdm9pZCBkZW9wdHMuXG4vLyBBbHNvIGxldCdzIG5vdCBleHBvc2UgdGhlaXIgbmFtZXMgaW4gc3RhYmxlIGJ1aWxkcy5cblxuaWYgKGVuYWJsZVN0YWJsZUNvbmN1cnJlbnRNb2RlQVBJcykge1xuICBSZWFjdC5Db25jdXJyZW50TW9kZSA9IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFO1xuICBSZWFjdC5Qcm9maWxlciA9IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG4gIFJlYWN0LnVuc3RhYmxlX0NvbmN1cnJlbnRNb2RlID0gdW5kZWZpbmVkO1xuICBSZWFjdC51bnN0YWJsZV9Qcm9maWxlciA9IHVuZGVmaW5lZDtcbn1cblxuXG5cbnZhciBSZWFjdCQyID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGRlZmF1bHQ6IFJlYWN0XG59KTtcblxudmFyIFJlYWN0JDMgPSAoIFJlYWN0JDIgJiYgUmVhY3QgKSB8fCBSZWFjdCQyO1xuXG4vLyBUT0RPOiBkZWNpZGUgb24gdGhlIHRvcC1sZXZlbCBleHBvcnQgZm9ybS5cbi8vIFRoaXMgaXMgaGFja3kgYnV0IG1ha2VzIGl0IHdvcmsgd2l0aCBib3RoIFJvbGx1cCBhbmQgSmVzdC5cbnZhciByZWFjdCA9IFJlYWN0JDMuZGVmYXVsdCB8fCBSZWFjdCQzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlYWN0O1xuICB9KSgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25leHQvbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDEyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25vZGUtbGlicy1icm93c2VyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NwZWNpZXMtY29uc3RydWN0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDEyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190YXNrLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHsgZTogZmFsc2UsIHY6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHsgZTogdHJ1ZSwgdjogZSB9O1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3BlcmZvcm0uanNcbi8vIG1vZHVsZSBpZCA9IDEzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvbWlzZS1yZXNvbHZlLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciByZWRlZmluZUFsbCA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgJGl0ZXJEZWZpbmUgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpO1xudmFyIHN0ZXAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKTtcbnZhciBzZXRTcGVjaWVzID0gcmVxdWlyZSgnLi9fc2V0LXNwZWNpZXMnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFzdEtleSA9IHJlcXVpcmUoJy4vX21ldGEnKS5mYXN0S2V5O1xudmFyIHZhbGlkYXRlID0gcmVxdWlyZSgnLi9fdmFsaWRhdGUtY29sbGVjdGlvbicpO1xudmFyIFNJWkUgPSBERVNDUklQVE9SUyA/ICdfcycgOiAnc2l6ZSc7XG5cbnZhciBnZXRFbnRyeSA9IGZ1bmN0aW9uICh0aGF0LCBrZXkpIHtcbiAgLy8gZmFzdCBjYXNlXG4gIHZhciBpbmRleCA9IGZhc3RLZXkoa2V5KTtcbiAgdmFyIGVudHJ5O1xuICBpZiAoaW5kZXggIT09ICdGJykgcmV0dXJuIHRoYXQuX2lbaW5kZXhdO1xuICAvLyBmcm96ZW4gb2JqZWN0IGNhc2VcbiAgZm9yIChlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pIHtcbiAgICBpZiAoZW50cnkuayA9PSBrZXkpIHJldHVybiBlbnRyeTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvbnN0cnVjdG9yOiBmdW5jdGlvbiAod3JhcHBlciwgTkFNRSwgSVNfTUFQLCBBRERFUikge1xuICAgIHZhciBDID0gd3JhcHBlcihmdW5jdGlvbiAodGhhdCwgaXRlcmFibGUpIHtcbiAgICAgIGFuSW5zdGFuY2UodGhhdCwgQywgTkFNRSwgJ19pJyk7XG4gICAgICB0aGF0Ll90ID0gTkFNRTsgICAgICAgICAvLyBjb2xsZWN0aW9uIHR5cGVcbiAgICAgIHRoYXQuX2kgPSBjcmVhdGUobnVsbCk7IC8vIGluZGV4XG4gICAgICB0aGF0Ll9mID0gdW5kZWZpbmVkOyAgICAvLyBmaXJzdCBlbnRyeVxuICAgICAgdGhhdC5fbCA9IHVuZGVmaW5lZDsgICAgLy8gbGFzdCBlbnRyeVxuICAgICAgdGhhdFtTSVpFXSA9IDA7ICAgICAgICAgLy8gc2l6ZVxuICAgICAgaWYgKGl0ZXJhYmxlICE9IHVuZGVmaW5lZCkgZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGhhdFtBRERFUl0sIHRoYXQpO1xuICAgIH0pO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCB7XG4gICAgICAvLyAyMy4xLjMuMSBNYXAucHJvdG90eXBlLmNsZWFyKClcbiAgICAgIC8vIDIzLjIuMy4yIFNldC5wcm90b3R5cGUuY2xlYXIoKVxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICBmb3IgKHZhciB0aGF0ID0gdmFsaWRhdGUodGhpcywgTkFNRSksIGRhdGEgPSB0aGF0Ll9pLCBlbnRyeSA9IHRoYXQuX2Y7IGVudHJ5OyBlbnRyeSA9IGVudHJ5Lm4pIHtcbiAgICAgICAgICBlbnRyeS5yID0gdHJ1ZTtcbiAgICAgICAgICBpZiAoZW50cnkucCkgZW50cnkucCA9IGVudHJ5LnAubiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgZGF0YVtlbnRyeS5pXTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0Ll9mID0gdGhhdC5fbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhhdFtTSVpFXSA9IDA7XG4gICAgICB9LFxuICAgICAgLy8gMjMuMS4zLjMgTWFwLnByb3RvdHlwZS5kZWxldGUoa2V5KVxuICAgICAgLy8gMjMuMi4zLjQgU2V0LnByb3RvdHlwZS5kZWxldGUodmFsdWUpXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgdGhhdCA9IHZhbGlkYXRlKHRoaXMsIE5BTUUpO1xuICAgICAgICB2YXIgZW50cnkgPSBnZXRFbnRyeSh0aGF0LCBrZXkpO1xuICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICB2YXIgbmV4dCA9IGVudHJ5Lm47XG4gICAgICAgICAgdmFyIHByZXYgPSBlbnRyeS5wO1xuICAgICAgICAgIGRlbGV0ZSB0aGF0Ll9pW2VudHJ5LmldO1xuICAgICAgICAgIGVudHJ5LnIgPSB0cnVlO1xuICAgICAgICAgIGlmIChwcmV2KSBwcmV2Lm4gPSBuZXh0O1xuICAgICAgICAgIGlmIChuZXh0KSBuZXh0LnAgPSBwcmV2O1xuICAgICAgICAgIGlmICh0aGF0Ll9mID09IGVudHJ5KSB0aGF0Ll9mID0gbmV4dDtcbiAgICAgICAgICBpZiAodGhhdC5fbCA9PSBlbnRyeSkgdGhhdC5fbCA9IHByZXY7XG4gICAgICAgICAgdGhhdFtTSVpFXS0tO1xuICAgICAgICB9IHJldHVybiAhIWVudHJ5O1xuICAgICAgfSxcbiAgICAgIC8vIDIzLjIuMy42IFNldC5wcm90b3R5cGUuZm9yRWFjaChjYWxsYmFja2ZuLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICAgICAgLy8gMjMuMS4zLjUgTWFwLnByb3RvdHlwZS5mb3JFYWNoKGNhbGxiYWNrZm4sIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gICAgICBmb3JFYWNoOiBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrZm4gLyogLCB0aGF0ID0gdW5kZWZpbmVkICovKSB7XG4gICAgICAgIHZhbGlkYXRlKHRoaXMsIE5BTUUpO1xuICAgICAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgMyk7XG4gICAgICAgIHZhciBlbnRyeTtcbiAgICAgICAgd2hpbGUgKGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhpcy5fZikge1xuICAgICAgICAgIGYoZW50cnkudiwgZW50cnkuaywgdGhpcyk7XG4gICAgICAgICAgLy8gcmV2ZXJ0IHRvIHRoZSBsYXN0IGV4aXN0aW5nIGVudHJ5XG4gICAgICAgICAgd2hpbGUgKGVudHJ5ICYmIGVudHJ5LnIpIGVudHJ5ID0gZW50cnkucDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIDIzLjEuMy43IE1hcC5wcm90b3R5cGUuaGFzKGtleSlcbiAgICAgIC8vIDIzLjIuMy43IFNldC5wcm90b3R5cGUuaGFzKHZhbHVlKVxuICAgICAgaGFzOiBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiAhIWdldEVudHJ5KHZhbGlkYXRlKHRoaXMsIE5BTUUpLCBrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChERVNDUklQVE9SUykgZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZSh0aGlzLCBOQU1FKVtTSVpFXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gQztcbiAgfSxcbiAgZGVmOiBmdW5jdGlvbiAodGhhdCwga2V5LCB2YWx1ZSkge1xuICAgIHZhciBlbnRyeSA9IGdldEVudHJ5KHRoYXQsIGtleSk7XG4gICAgdmFyIHByZXYsIGluZGV4O1xuICAgIC8vIGNoYW5nZSBleGlzdGluZyBlbnRyeVxuICAgIGlmIChlbnRyeSkge1xuICAgICAgZW50cnkudiA9IHZhbHVlO1xuICAgIC8vIGNyZWF0ZSBuZXcgZW50cnlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhhdC5fbCA9IGVudHJ5ID0ge1xuICAgICAgICBpOiBpbmRleCA9IGZhc3RLZXkoa2V5LCB0cnVlKSwgLy8gPC0gaW5kZXhcbiAgICAgICAgazoga2V5LCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDwtIGtleVxuICAgICAgICB2OiB2YWx1ZSwgICAgICAgICAgICAgICAgICAgICAgLy8gPC0gdmFsdWVcbiAgICAgICAgcDogcHJldiA9IHRoYXQuX2wsICAgICAgICAgICAgIC8vIDwtIHByZXZpb3VzIGVudHJ5XG4gICAgICAgIG46IHVuZGVmaW5lZCwgICAgICAgICAgICAgICAgICAvLyA8LSBuZXh0IGVudHJ5XG4gICAgICAgIHI6IGZhbHNlICAgICAgICAgICAgICAgICAgICAgICAvLyA8LSByZW1vdmVkXG4gICAgICB9O1xuICAgICAgaWYgKCF0aGF0Ll9mKSB0aGF0Ll9mID0gZW50cnk7XG4gICAgICBpZiAocHJldikgcHJldi5uID0gZW50cnk7XG4gICAgICB0aGF0W1NJWkVdKys7XG4gICAgICAvLyBhZGQgdG8gaW5kZXhcbiAgICAgIGlmIChpbmRleCAhPT0gJ0YnKSB0aGF0Ll9pW2luZGV4XSA9IGVudHJ5O1xuICAgIH0gcmV0dXJuIHRoYXQ7XG4gIH0sXG4gIGdldEVudHJ5OiBnZXRFbnRyeSxcbiAgc2V0U3Ryb25nOiBmdW5jdGlvbiAoQywgTkFNRSwgSVNfTUFQKSB7XG4gICAgLy8gYWRkIC5rZXlzLCAudmFsdWVzLCAuZW50cmllcywgW0BAaXRlcmF0b3JdXG4gICAgLy8gMjMuMS4zLjQsIDIzLjEuMy44LCAyMy4xLjMuMTEsIDIzLjEuMy4xMiwgMjMuMi4zLjUsIDIzLjIuMy44LCAyMy4yLjMuMTAsIDIzLjIuMy4xMVxuICAgICRpdGVyRGVmaW5lKEMsIE5BTUUsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICAgICAgdGhpcy5fdCA9IHZhbGlkYXRlKGl0ZXJhdGVkLCBOQU1FKTsgLy8gdGFyZ2V0XG4gICAgICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgICAgICAvLyBraW5kXG4gICAgICB0aGlzLl9sID0gdW5kZWZpbmVkOyAgICAgICAgICAgICAgICAvLyBwcmV2aW91c1xuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBraW5kID0gdGhhdC5faztcbiAgICAgIHZhciBlbnRyeSA9IHRoYXQuX2w7XG4gICAgICAvLyByZXZlcnQgdG8gdGhlIGxhc3QgZXhpc3RpbmcgZW50cnlcbiAgICAgIHdoaWxlIChlbnRyeSAmJiBlbnRyeS5yKSBlbnRyeSA9IGVudHJ5LnA7XG4gICAgICAvLyBnZXQgbmV4dCBlbnRyeVxuICAgICAgaWYgKCF0aGF0Ll90IHx8ICEodGhhdC5fbCA9IGVudHJ5ID0gZW50cnkgPyBlbnRyeS5uIDogdGhhdC5fdC5fZikpIHtcbiAgICAgICAgLy8gb3IgZmluaXNoIHRoZSBpdGVyYXRpb25cbiAgICAgICAgdGhhdC5fdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHN0ZXAoMSk7XG4gICAgICB9XG4gICAgICAvLyByZXR1cm4gc3RlcCBieSBraW5kXG4gICAgICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGVudHJ5LmspO1xuICAgICAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIGVudHJ5LnYpO1xuICAgICAgcmV0dXJuIHN0ZXAoMCwgW2VudHJ5LmssIGVudHJ5LnZdKTtcbiAgICB9LCBJU19NQVAgPyAnZW50cmllcycgOiAndmFsdWVzJywgIUlTX01BUCwgdHJ1ZSk7XG5cbiAgICAvLyBhZGQgW0BAc3BlY2llc10sIDIzLjEuMi4yLCAyMy4yLjIuMlxuICAgIHNldFNwZWNpZXMoTkFNRSk7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi1zdHJvbmcuanNcbi8vIG1vZHVsZSBpZCA9IDEzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBtZXRhID0gcmVxdWlyZSgnLi9fbWV0YScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIHJlZGVmaW5lQWxsID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgZWFjaCA9IHJlcXVpcmUoJy4vX2FycmF5LW1ldGhvZHMnKSgwKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE5BTUUsIHdyYXBwZXIsIG1ldGhvZHMsIGNvbW1vbiwgSVNfTUFQLCBJU19XRUFLKSB7XG4gIHZhciBCYXNlID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgQyA9IEJhc2U7XG4gIHZhciBBRERFUiA9IElTX01BUCA/ICdzZXQnIDogJ2FkZCc7XG4gIHZhciBwcm90byA9IEMgJiYgQy5wcm90b3R5cGU7XG4gIHZhciBPID0ge307XG4gIGlmICghREVTQ1JJUFRPUlMgfHwgdHlwZW9mIEMgIT0gJ2Z1bmN0aW9uJyB8fCAhKElTX1dFQUsgfHwgcHJvdG8uZm9yRWFjaCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIG5ldyBDKCkuZW50cmllcygpLm5leHQoKTtcbiAgfSkpKSB7XG4gICAgLy8gY3JlYXRlIGNvbGxlY3Rpb24gY29uc3RydWN0b3JcbiAgICBDID0gY29tbW9uLmdldENvbnN0cnVjdG9yKHdyYXBwZXIsIE5BTUUsIElTX01BUCwgQURERVIpO1xuICAgIHJlZGVmaW5lQWxsKEMucHJvdG90eXBlLCBtZXRob2RzKTtcbiAgICBtZXRhLk5FRUQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIEMgPSB3cmFwcGVyKGZ1bmN0aW9uICh0YXJnZXQsIGl0ZXJhYmxlKSB7XG4gICAgICBhbkluc3RhbmNlKHRhcmdldCwgQywgTkFNRSwgJ19jJyk7XG4gICAgICB0YXJnZXQuX2MgPSBuZXcgQmFzZSgpO1xuICAgICAgaWYgKGl0ZXJhYmxlICE9IHVuZGVmaW5lZCkgZm9yT2YoaXRlcmFibGUsIElTX01BUCwgdGFyZ2V0W0FEREVSXSwgdGFyZ2V0KTtcbiAgICB9KTtcbiAgICBlYWNoKCdhZGQsY2xlYXIsZGVsZXRlLGZvckVhY2gsZ2V0LGhhcyxzZXQsa2V5cyx2YWx1ZXMsZW50cmllcyx0b0pTT04nLnNwbGl0KCcsJyksIGZ1bmN0aW9uIChLRVkpIHtcbiAgICAgIHZhciBJU19BRERFUiA9IEtFWSA9PSAnYWRkJyB8fCBLRVkgPT0gJ3NldCc7XG4gICAgICBpZiAoS0VZIGluIHByb3RvICYmICEoSVNfV0VBSyAmJiBLRVkgPT0gJ2NsZWFyJykpIGhpZGUoQy5wcm90b3R5cGUsIEtFWSwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgYW5JbnN0YW5jZSh0aGlzLCBDLCBLRVkpO1xuICAgICAgICBpZiAoIUlTX0FEREVSICYmIElTX1dFQUsgJiYgIWlzT2JqZWN0KGEpKSByZXR1cm4gS0VZID09ICdnZXQnID8gdW5kZWZpbmVkIDogZmFsc2U7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9jW0tFWV0oYSA9PT0gMCA/IDAgOiBhLCBiKTtcbiAgICAgICAgcmV0dXJuIElTX0FEREVSID8gdGhpcyA6IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIElTX1dFQUsgfHwgZFAoQy5wcm90b3R5cGUsICdzaXplJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jLnNpemU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRUb1N0cmluZ1RhZyhDLCBOQU1FKTtcblxuICBPW05BTUVdID0gQztcbiAgJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYsIE8pO1xuXG4gIGlmICghSVNfV0VBSykgY29tbW9uLnNldFN0cm9uZyhDLCBOQU1FLCBJU19NQVApO1xuXG4gIHJldHVybiBDO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2xsZWN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIDAgLT4gQXJyYXkjZm9yRWFjaFxuLy8gMSAtPiBBcnJheSNtYXBcbi8vIDIgLT4gQXJyYXkjZmlsdGVyXG4vLyAzIC0+IEFycmF5I3NvbWVcbi8vIDQgLT4gQXJyYXkjZXZlcnlcbi8vIDUgLT4gQXJyYXkjZmluZFxuLy8gNiAtPiBBcnJheSNmaW5kSW5kZXhcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciBhc2MgPSByZXF1aXJlKCcuL19hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoVFlQRSwgJGNyZWF0ZSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNjtcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHZhciBjcmVhdGUgPSAkY3JlYXRlIHx8IGFzYztcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgY2FsbGJhY2tmbiwgdGhhdCkge1xuICAgIHZhciBPID0gdG9PYmplY3QoJHRoaXMpO1xuICAgIHZhciBzZWxmID0gSU9iamVjdChPKTtcbiAgICB2YXIgZiA9IGN0eChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIHJlc3VsdCA9IElTX01BUCA/IGNyZWF0ZSgkdGhpcywgbGVuZ3RoKSA6IElTX0ZJTFRFUiA/IGNyZWF0ZSgkdGhpcywgMCkgOiB1bmRlZmluZWQ7XG4gICAgdmFyIHZhbCwgcmVzO1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoTk9fSE9MRVMgfHwgaW5kZXggaW4gc2VsZikge1xuICAgICAgdmFsID0gc2VsZltpbmRleF07XG4gICAgICByZXMgPSBmKHZhbCwgaW5kZXgsIE8pO1xuICAgICAgaWYgKFRZUEUpIHtcbiAgICAgICAgaWYgKElTX01BUCkgcmVzdWx0W2luZGV4XSA9IHJlczsgICAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzKSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAvLyBzb21lXG4gICAgICAgICAgY2FzZSA1OiByZXR1cm4gdmFsOyAgICAgICAgICAgICAgLy8gZmluZFxuICAgICAgICAgIGNhc2UgNjogcmV0dXJuIGluZGV4OyAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcmVzdWx0LnB1c2godmFsKTsgICAgICAgIC8vIGZpbHRlclxuICAgICAgICB9IGVsc2UgaWYgKElTX0VWRVJZKSByZXR1cm4gZmFsc2U7IC8vIGV2ZXJ5XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJU19GSU5EX0lOREVYID8gLTEgOiBJU19TT01FIHx8IElTX0VWRVJZID8gSVNfRVZFUlkgOiByZXN1bHQ7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LW1ldGhvZHMuanNcbi8vIG1vZHVsZSBpZCA9IDEzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiLy8gOS40LjIuMyBBcnJheVNwZWNpZXNDcmVhdGUob3JpZ2luYWxBcnJheSwgbGVuZ3RoKVxudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX2FycmF5LXNwZWNpZXMtY29uc3RydWN0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWwsIGxlbmd0aCkge1xuICByZXR1cm4gbmV3IChzcGVjaWVzQ29uc3RydWN0b3Iob3JpZ2luYWwpKShsZW5ndGgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKTtcbnZhciBTUEVDSUVTID0gcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3JpZ2luYWwpIHtcbiAgdmFyIEM7XG4gIGlmIChpc0FycmF5KG9yaWdpbmFsKSkge1xuICAgIEMgPSBvcmlnaW5hbC5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmICh0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpIEMgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGlzT2JqZWN0KEMpKSB7XG4gICAgICBDID0gQ1tTUEVDSUVTXTtcbiAgICAgIGlmIChDID09PSBudWxsKSBDID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSByZXR1cm4gQyA9PT0gdW5kZWZpbmVkID8gQXJyYXkgOiBDO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1zcGVjaWVzLWNvbnN0cnVjdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIGZyb20gPSByZXF1aXJlKCcuL19hcnJheS1mcm9tLWl0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChOQU1FKSB7XG4gIHJldHVybiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgaWYgKGNsYXNzb2YodGhpcykgIT0gTkFNRSkgdGhyb3cgVHlwZUVycm9yKE5BTUUgKyBcIiN0b0pTT04gaXNuJ3QgZ2VuZXJpY1wiKTtcbiAgICByZXR1cm4gZnJvbSh0aGlzKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29sbGVjdGlvbi10by1qc29uLmpzXG4vLyBtb2R1bGUgaWQgPSAxMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsInZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyLCBJVEVSQVRPUikge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvck9mKGl0ZXIsIGZhbHNlLCByZXN1bHQucHVzaCwgcmVzdWx0LCBJVEVSQVRPUik7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWZyb20taXRlcmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tL1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09MTEVDVElPTikge1xuICAkZXhwb3J0KCRleHBvcnQuUywgQ09MTEVDVElPTiwgeyBvZjogZnVuY3Rpb24gb2YoKSB7XG4gICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIEEgPSBuZXcgQXJyYXkobGVuZ3RoKTtcbiAgICB3aGlsZSAobGVuZ3RoLS0pIEFbbGVuZ3RoXSA9IGFyZ3VtZW50c1tsZW5ndGhdO1xuICAgIHJldHVybiBuZXcgdGhpcyhBKTtcbiAgfSB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LWNvbGxlY3Rpb24tb2YuanNcbi8vIG1vZHVsZSBpZCA9IDE0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIiwiJ3VzZSBzdHJpY3QnO1xuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tL1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgZm9yT2YgPSByZXF1aXJlKCcuL19mb3Itb2YnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09MTEVDVElPTikge1xuICAkZXhwb3J0KCRleHBvcnQuUywgQ09MTEVDVElPTiwgeyBmcm9tOiBmdW5jdGlvbiBmcm9tKHNvdXJjZSAvKiAsIG1hcEZuLCB0aGlzQXJnICovKSB7XG4gICAgdmFyIG1hcEZuID0gYXJndW1lbnRzWzFdO1xuICAgIHZhciBtYXBwaW5nLCBBLCBuLCBjYjtcbiAgICBhRnVuY3Rpb24odGhpcyk7XG4gICAgbWFwcGluZyA9IG1hcEZuICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG1hcHBpbmcpIGFGdW5jdGlvbihtYXBGbik7XG4gICAgaWYgKHNvdXJjZSA9PSB1bmRlZmluZWQpIHJldHVybiBuZXcgdGhpcygpO1xuICAgIEEgPSBbXTtcbiAgICBpZiAobWFwcGluZykge1xuICAgICAgbiA9IDA7XG4gICAgICBjYiA9IGN0eChtYXBGbiwgYXJndW1lbnRzWzJdLCAyKTtcbiAgICAgIGZvck9mKHNvdXJjZSwgZmFsc2UsIGZ1bmN0aW9uIChuZXh0SXRlbSkge1xuICAgICAgICBBLnB1c2goY2IobmV4dEl0ZW0sIG4rKykpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvck9mKHNvdXJjZSwgZmFsc2UsIEEucHVzaCwgQSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgdGhpcyhBKTtcbiAgfSB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LWNvbGxlY3Rpb24tZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9hcnJheS9mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qc1xuLy8gbW9kdWxlIGlkID0gMTU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKTtcbnZhciBpc0FycmF5SXRlciA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlckZuID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbiAoaXRlcikgeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlIC8qICwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KGFycmF5TGlrZSk7XG4gICAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICAgIHZhciBhTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB2YXIgbWFwZm4gPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWQ7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgaXRlckZuID0gZ2V0SXRlckZuKE8pO1xuICAgIHZhciBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYgKG1hcHBpbmcpIG1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYgKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKSB7XG4gICAgICBmb3IgKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDKCk7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvciAocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSAxNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBpbmRleCwgdmFsdWUpIHtcbiAgaWYgKGluZGV4IGluIG9iamVjdCkgJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8vIFRoaXMgbWV0aG9kIG9mIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdCBuZWVkcyB0byBiZVxuLy8ga2VwdCBpZGVudGljYWwgdG8gdGhlIHdheSBpdCBpcyBvYnRhaW5lZCBpbiBydW50aW1lLmpzXG52YXIgZyA9IChmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMgfSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG5cbi8vIFVzZSBgZ2V0T3duUHJvcGVydHlOYW1lc2AgYmVjYXVzZSBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgY2FsbGluZ1xuLy8gYGhhc093blByb3BlcnR5YCBvbiB0aGUgZ2xvYmFsIGBzZWxmYCBvYmplY3QgaW4gYSB3b3JrZXIuIFNlZSAjMTgzLlxudmFyIGhhZFJ1bnRpbWUgPSBnLnJlZ2VuZXJhdG9yUnVudGltZSAmJlxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhnKS5pbmRleE9mKFwicmVnZW5lcmF0b3JSdW50aW1lXCIpID49IDA7XG5cbi8vIFNhdmUgdGhlIG9sZCByZWdlbmVyYXRvclJ1bnRpbWUgaW4gY2FzZSBpdCBuZWVkcyB0byBiZSByZXN0b3JlZCBsYXRlci5cbnZhciBvbGRSdW50aW1lID0gaGFkUnVudGltZSAmJiBnLnJlZ2VuZXJhdG9yUnVudGltZTtcblxuLy8gRm9yY2UgcmVldmFsdXRhdGlvbiBvZiBydW50aW1lLmpzLlxuZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcblxuaWYgKGhhZFJ1bnRpbWUpIHtcbiAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgcnVudGltZS5cbiAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBvbGRSdW50aW1lO1xufSBlbHNlIHtcbiAgLy8gUmVtb3ZlIHRoZSBnbG9iYWwgcHJvcGVydHkgYWRkZWQgYnkgcnVudGltZS5qcy5cbiAgdHJ5IHtcbiAgICBkZWxldGUgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIH0gY2F0Y2goZSkge1xuICAgIGcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUtbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbiEoZnVuY3Rpb24oZ2xvYmFsKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgdmFyIGluTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIjtcbiAgdmFyIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lO1xuICBpZiAocnVudGltZSkge1xuICAgIGlmIChpbk1vZHVsZSkge1xuICAgICAgLy8gSWYgcmVnZW5lcmF0b3JSdW50aW1lIGlzIGRlZmluZWQgZ2xvYmFsbHkgYW5kIHdlJ3JlIGluIGEgbW9kdWxlLFxuICAgICAgLy8gbWFrZSB0aGUgZXhwb3J0cyBvYmplY3QgaWRlbnRpY2FsIHRvIHJlZ2VuZXJhdG9yUnVudGltZS5cbiAgICAgIG1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgYm90aGVyIGV2YWx1YXRpbmcgdGhlIHJlc3Qgb2YgdGhpcyBmaWxlIGlmIHRoZSBydW50aW1lIHdhc1xuICAgIC8vIGFscmVhZHkgZGVmaW5lZCBnbG9iYWxseS5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBEZWZpbmUgdGhlIHJ1bnRpbWUgZ2xvYmFsbHkgKGFzIGV4cGVjdGVkIGJ5IGdlbmVyYXRlZCBjb2RlKSBhcyBlaXRoZXJcbiAgLy8gbW9kdWxlLmV4cG9ydHMgKGlmIHdlJ3JlIGluIGEgbW9kdWxlKSBvciBhIG5ldywgZW1wdHkgb2JqZWN0LlxuICBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZSA9IGluTW9kdWxlID8gbW9kdWxlLmV4cG9ydHMgOiB7fTtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBydW50aW1lLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIHJ1bnRpbWUubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBydW50aW1lLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi4gSWYgdGhlIFByb21pc2UgaXMgcmVqZWN0ZWQsIGhvd2V2ZXIsIHRoZVxuICAgICAgICAgIC8vIHJlc3VsdCBmb3IgdGhpcyBpdGVyYXRpb24gd2lsbCBiZSByZWplY3RlZCB3aXRoIHRoZSBzYW1lXG4gICAgICAgICAgLy8gcmVhc29uLiBOb3RlIHRoYXQgcmVqZWN0aW9ucyBvZiB5aWVsZGVkIFByb21pc2VzIGFyZSBub3RcbiAgICAgICAgICAvLyB0aHJvd24gYmFjayBpbnRvIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIGFzIGlzIHRoZSBjYXNlXG4gICAgICAgICAgLy8gd2hlbiBhbiBhd2FpdGVkIFByb21pc2UgaXMgcmVqZWN0ZWQuIFRoaXMgZGlmZmVyZW5jZSBpblxuICAgICAgICAgIC8vIGJlaGF2aW9yIGJldHdlZW4geWllbGQgYW5kIGF3YWl0IGlzIGltcG9ydGFudCwgYmVjYXVzZSBpdFxuICAgICAgICAgIC8vIGFsbG93cyB0aGUgY29uc3VtZXIgdG8gZGVjaWRlIHdoYXQgdG8gZG8gd2l0aCB0aGUgeWllbGRlZFxuICAgICAgICAgIC8vIHJlamVjdGlvbiAoc3dhbGxvdyBpdCBhbmQgY29udGludWUsIG1hbnVhbGx5IC50aHJvdyBpdCBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgZ2VuZXJhdG9yLCBhYmFuZG9uIGl0ZXJhdGlvbiwgd2hhdGV2ZXIpLiBXaXRoXG4gICAgICAgICAgLy8gYXdhaXQsIGJ5IGNvbnRyYXN0LCB0aGVyZSBpcyBubyBvcHBvcnR1bml0eSB0byBleGFtaW5lIHRoZVxuICAgICAgICAgIC8vIHJlamVjdGlvbiByZWFzb24gb3V0c2lkZSB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBzbyB0aGVcbiAgICAgICAgICAvLyBvbmx5IG9wdGlvbiBpcyB0byB0aHJvdyBpdCBmcm9tIHRoZSBhd2FpdCBleHByZXNzaW9uLCBhbmRcbiAgICAgICAgICAvLyBsZXQgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiBoYW5kbGUgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHJ1bnRpbWUuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gSW4gc2xvcHB5IG1vZGUsIHVuYm91bmQgYHRoaXNgIHJlZmVycyB0byB0aGUgZ2xvYmFsIG9iamVjdCwgZmFsbGJhY2sgdG9cbiAgLy8gRnVuY3Rpb24gY29uc3RydWN0b3IgaWYgd2UncmUgaW4gZ2xvYmFsIHN0cmljdCBtb2RlLiBUaGF0IGlzIHNhZGx5IGEgZm9ybVxuICAvLyBvZiBpbmRpcmVjdCBldmFsIHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LlxuICAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzIH0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpXG4pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5Jyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL19jb3JlJykuUHJvbWlzZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi9fYW4taW5zdGFuY2UnKTtcbnZhciBmb3JPZiA9IHJlcXVpcmUoJy4vX2Zvci1vZicpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBtaWNyb3Rhc2sgPSByZXF1aXJlKCcuL19taWNyb3Rhc2snKSgpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi9fdXNlci1hZ2VudCcpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi9fcHJvbWlzZS1yZXNvbHZlJyk7XG52YXIgUFJPTUlTRSA9ICdQcm9taXNlJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucztcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4IHx8ICcnO1xudmFyICRQcm9taXNlID0gZ2xvYmFsW1BST01JU0VdO1xudmFyIGlzTm9kZSA9IGNsYXNzb2YocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xudmFyIGVtcHR5ID0gZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9O1xudmFyIEludGVybmFsLCBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHksIE93blByb21pc2VDYXBhYmlsaXR5LCBXcmFwcGVyO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZjtcblxudmFyIFVTRV9OQVRJVkUgPSAhIWZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICAvLyBjb3JyZWN0IHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgICB2YXIgcHJvbWlzZSA9ICRQcm9taXNlLnJlc29sdmUoMSk7XG4gICAgdmFyIEZha2VQcm9taXNlID0gKHByb21pc2UuY29uc3RydWN0b3IgPSB7fSlbcmVxdWlyZSgnLi9fd2tzJykoJ3NwZWNpZXMnKV0gPSBmdW5jdGlvbiAoZXhlYykge1xuICAgICAgZXhlYyhlbXB0eSwgZW1wdHkpO1xuICAgIH07XG4gICAgLy8gdW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIHJldHVybiAoaXNOb2RlIHx8IHR5cGVvZiBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICYmIHByb21pc2UudGhlbihlbXB0eSkgaW5zdGFuY2VvZiBGYWtlUHJvbWlzZVxuICAgICAgLy8gdjggNi42IChOb2RlIDEwIGFuZCBDaHJvbWUgNjYpIGhhdmUgYSBidWcgd2l0aCByZXNvbHZpbmcgY3VzdG9tIHRoZW5hYmxlc1xuICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9ODMwNTY1XG4gICAgICAvLyB3ZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICAgICAgJiYgdjguaW5kZXhPZignNi42JykgIT09IDBcbiAgICAgICYmIHVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUvNjYnKSA9PT0gLTE7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufSgpO1xuXG4vLyBoZWxwZXJzXG52YXIgaXNUaGVuYWJsZSA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgdGhlbjtcbiAgcmV0dXJuIGlzT2JqZWN0KGl0KSAmJiB0eXBlb2YgKHRoZW4gPSBpdC50aGVuKSA9PSAnZnVuY3Rpb24nID8gdGhlbiA6IGZhbHNlO1xufTtcbnZhciBub3RpZnkgPSBmdW5jdGlvbiAocHJvbWlzZSwgaXNSZWplY3QpIHtcbiAgaWYgKHByb21pc2UuX24pIHJldHVybjtcbiAgcHJvbWlzZS5fbiA9IHRydWU7XG4gIHZhciBjaGFpbiA9IHByb21pc2UuX2M7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgb2sgPSBwcm9taXNlLl9zID09IDE7XG4gICAgdmFyIGkgPSAwO1xuICAgIHZhciBydW4gPSBmdW5jdGlvbiAocmVhY3Rpb24pIHtcbiAgICAgIHZhciBoYW5kbGVyID0gb2sgPyByZWFjdGlvbi5vayA6IHJlYWN0aW9uLmZhaWw7XG4gICAgICB2YXIgcmVzb2x2ZSA9IHJlYWN0aW9uLnJlc29sdmU7XG4gICAgICB2YXIgcmVqZWN0ID0gcmVhY3Rpb24ucmVqZWN0O1xuICAgICAgdmFyIGRvbWFpbiA9IHJlYWN0aW9uLmRvbWFpbjtcbiAgICAgIHZhciByZXN1bHQsIHRoZW4sIGV4aXRlZDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgaWYgKCFvaykge1xuICAgICAgICAgICAgaWYgKHByb21pc2UuX2ggPT0gMikgb25IYW5kbGVVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgICAgICAgICBwcm9taXNlLl9oID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGhhbmRsZXIgPT09IHRydWUpIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRvbWFpbikgZG9tYWluLmVudGVyKCk7XG4gICAgICAgICAgICByZXN1bHQgPSBoYW5kbGVyKHZhbHVlKTsgLy8gbWF5IHRocm93XG4gICAgICAgICAgICBpZiAoZG9tYWluKSB7XG4gICAgICAgICAgICAgIGRvbWFpbi5leGl0KCk7XG4gICAgICAgICAgICAgIGV4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQgPT09IHJlYWN0aW9uLnByb21pc2UpIHtcbiAgICAgICAgICAgIHJlamVjdChUeXBlRXJyb3IoJ1Byb21pc2UtY2hhaW4gY3ljbGUnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGVuID0gaXNUaGVuYWJsZShyZXN1bHQpKSB7XG4gICAgICAgICAgICB0aGVuLmNhbGwocmVzdWx0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0gZWxzZSByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0gZWxzZSByZWplY3QodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoZG9tYWluICYmICFleGl0ZWQpIGRvbWFpbi5leGl0KCk7XG4gICAgICAgIHJlamVjdChlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdoaWxlIChjaGFpbi5sZW5ndGggPiBpKSBydW4oY2hhaW5baSsrXSk7IC8vIHZhcmlhYmxlIGxlbmd0aCAtIGNhbid0IHVzZSBmb3JFYWNoXG4gICAgcHJvbWlzZS5fYyA9IFtdO1xuICAgIHByb21pc2UuX24gPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXByb21pc2UuX2gpIG9uVW5oYW5kbGVkKHByb21pc2UpO1xuICB9KTtcbn07XG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gcHJvbWlzZS5fdjtcbiAgICB2YXIgdW5oYW5kbGVkID0gaXNVbmhhbmRsZWQocHJvbWlzZSk7XG4gICAgdmFyIHJlc3VsdCwgaGFuZGxlciwgY29uc29sZTtcbiAgICBpZiAodW5oYW5kbGVkKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzTm9kZSkge1xuICAgICAgICAgIHByb2Nlc3MuZW1pdCgndW5oYW5kbGVkUmVqZWN0aW9uJywgdmFsdWUsIHByb21pc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhbmRsZXIgPSBnbG9iYWwub251bmhhbmRsZWRyZWplY3Rpb24pIHtcbiAgICAgICAgICBoYW5kbGVyKHsgcHJvbWlzZTogcHJvbWlzZSwgcmVhc29uOiB2YWx1ZSB9KTtcbiAgICAgICAgfSBlbHNlIGlmICgoY29uc29sZSA9IGdsb2JhbC5jb25zb2xlKSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcignVW5oYW5kbGVkIHByb21pc2UgcmVqZWN0aW9uJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEJyb3dzZXJzIHNob3VsZCBub3QgdHJpZ2dlciBgcmVqZWN0aW9uSGFuZGxlZGAgZXZlbnQgaWYgaXQgd2FzIGhhbmRsZWQgaGVyZSwgTm9kZUpTIC0gc2hvdWxkXG4gICAgICBwcm9taXNlLl9oID0gaXNOb2RlIHx8IGlzVW5oYW5kbGVkKHByb21pc2UpID8gMiA6IDE7XG4gICAgfSBwcm9taXNlLl9hID0gdW5kZWZpbmVkO1xuICAgIGlmICh1bmhhbmRsZWQgJiYgcmVzdWx0LmUpIHRocm93IHJlc3VsdC52O1xuICB9KTtcbn07XG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICByZXR1cm4gcHJvbWlzZS5faCAhPT0gMSAmJiAocHJvbWlzZS5fYSB8fCBwcm9taXNlLl9jKS5sZW5ndGggPT09IDA7XG59O1xudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBoYW5kbGVyO1xuICAgIGlmIChpc05vZGUpIHtcbiAgICAgIHByb2Nlc3MuZW1pdCgncmVqZWN0aW9uSGFuZGxlZCcsIHByb21pc2UpO1xuICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnJlamVjdGlvbmhhbmRsZWQpIHtcbiAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHByb21pc2UuX3YgfSk7XG4gICAgfVxuICB9KTtcbn07XG52YXIgJHJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICB2YXIgcHJvbWlzZSA9IHRoaXM7XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgcHJvbWlzZS5fdiA9IHZhbHVlO1xuICBwcm9taXNlLl9zID0gMjtcbiAgaWYgKCFwcm9taXNlLl9hKSBwcm9taXNlLl9hID0gcHJvbWlzZS5fYy5zbGljZSgpO1xuICBub3RpZnkocHJvbWlzZSwgdHJ1ZSk7XG59O1xudmFyICRyZXNvbHZlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgdmFyIHRoZW47XG4gIGlmIChwcm9taXNlLl9kKSByZXR1cm47XG4gIHByb21pc2UuX2QgPSB0cnVlO1xuICBwcm9taXNlID0gcHJvbWlzZS5fdyB8fCBwcm9taXNlOyAvLyB1bndyYXBcbiAgdHJ5IHtcbiAgICBpZiAocHJvbWlzZSA9PT0gdmFsdWUpIHRocm93IFR5cGVFcnJvcihcIlByb21pc2UgY2FuJ3QgYmUgcmVzb2x2ZWQgaXRzZWxmXCIpO1xuICAgIGlmICh0aGVuID0gaXNUaGVuYWJsZSh2YWx1ZSkpIHtcbiAgICAgIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cmFwcGVyID0geyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH07IC8vIHdyYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGVuLmNhbGwodmFsdWUsIGN0eCgkcmVzb2x2ZSwgd3JhcHBlciwgMSksIGN0eCgkcmVqZWN0LCB3cmFwcGVyLCAxKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAkcmVqZWN0LmNhbGwod3JhcHBlciwgZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlLl92ID0gdmFsdWU7XG4gICAgICBwcm9taXNlLl9zID0gMTtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBmYWxzZSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgJHJlamVjdC5jYWxsKHsgX3c6IHByb21pc2UsIF9kOiBmYWxzZSB9LCBlKTsgLy8gd3JhcFxuICB9XG59O1xuXG4vLyBjb25zdHJ1Y3RvciBwb2x5ZmlsbFxuaWYgKCFVU0VfTkFUSVZFKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gICRQcm9taXNlID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIGFuSW5zdGFuY2UodGhpcywgJFByb21pc2UsIFBST01JU0UsICdfaCcpO1xuICAgIGFGdW5jdGlvbihleGVjdXRvcik7XG4gICAgSW50ZXJuYWwuY2FsbCh0aGlzKTtcbiAgICB0cnkge1xuICAgICAgZXhlY3V0b3IoY3R4KCRyZXNvbHZlLCB0aGlzLCAxKSwgY3R4KCRyZWplY3QsIHRoaXMsIDEpKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICRyZWplY3QuY2FsbCh0aGlzLCBlcnIpO1xuICAgIH1cbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIEludGVybmFsID0gZnVuY3Rpb24gUHJvbWlzZShleGVjdXRvcikge1xuICAgIHRoaXMuX2MgPSBbXTsgICAgICAgICAgICAgLy8gPC0gYXdhaXRpbmcgcmVhY3Rpb25zXG4gICAgdGhpcy5fYSA9IHVuZGVmaW5lZDsgICAgICAvLyA8LSBjaGVja2VkIGluIGlzVW5oYW5kbGVkIHJlYWN0aW9uc1xuICAgIHRoaXMuX3MgPSAwOyAgICAgICAgICAgICAgLy8gPC0gc3RhdGVcbiAgICB0aGlzLl9kID0gZmFsc2U7ICAgICAgICAgIC8vIDwtIGRvbmVcbiAgICB0aGlzLl92ID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIHZhbHVlXG4gICAgdGhpcy5faCA9IDA7ICAgICAgICAgICAgICAvLyA8LSByZWplY3Rpb24gc3RhdGUsIDAgLSBkZWZhdWx0LCAxIC0gaGFuZGxlZCwgMiAtIHVuaGFuZGxlZFxuICAgIHRoaXMuX24gPSBmYWxzZTsgICAgICAgICAgLy8gPC0gbm90aWZ5XG4gIH07XG4gIEludGVybmFsLnByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lLWFsbCcpKCRQcm9taXNlLnByb3RvdHlwZSwge1xuICAgIC8vIDI1LjQuNS4zIFByb21pc2UucHJvdG90eXBlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHJlYWN0aW9uID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoc3BlY2llc0NvbnN0cnVjdG9yKHRoaXMsICRQcm9taXNlKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IGlzTm9kZSA/IHByb2Nlc3MuZG9tYWluIDogdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fYy5wdXNoKHJlYWN0aW9uKTtcbiAgICAgIGlmICh0aGlzLl9hKSB0aGlzLl9hLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX3MpIG5vdGlmeSh0aGlzLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIDI1LjQuNS4xIFByb21pc2UucHJvdG90eXBlLmNhdGNoKG9uUmVqZWN0ZWQpXG4gICAgJ2NhdGNoJzogZnVuY3Rpb24gKG9uUmVqZWN0ZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBvblJlamVjdGVkKTtcbiAgICB9XG4gIH0pO1xuICBPd25Qcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBJbnRlcm5hbCgpO1xuICAgIHRoaXMucHJvbWlzZSA9IHByb21pc2U7XG4gICAgdGhpcy5yZXNvbHZlID0gY3R4KCRyZXNvbHZlLCBwcm9taXNlLCAxKTtcbiAgICB0aGlzLnJlamVjdCA9IGN0eCgkcmVqZWN0LCBwcm9taXNlLCAxKTtcbiAgfTtcbiAgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZiA9IG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgICByZXR1cm4gQyA9PT0gJFByb21pc2UgfHwgQyA9PT0gV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7IFByb21pc2U6ICRQcm9taXNlIH0pO1xucmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKSgkUHJvbWlzZSwgUFJPTUlTRSk7XG5yZXF1aXJlKCcuL19zZXQtc3BlY2llcycpKFBST01JU0UpO1xuV3JhcHBlciA9IHJlcXVpcmUoJy4vX2NvcmUnKVtQUk9NSVNFXTtcblxuLy8gc3RhdGljc1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuNSBQcm9taXNlLnJlamVjdChyKVxuICByZWplY3Q6IGZ1bmN0aW9uIHJlamVjdChyKSB7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSh0aGlzKTtcbiAgICB2YXIgJCRyZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICAkJHJlamVjdChyKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKExJQlJBUlkgfHwgIVVTRV9OQVRJVkUpLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC42IFByb21pc2UucmVzb2x2ZSh4KVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoTElCUkFSWSAmJiB0aGlzID09PSBXcmFwcGVyID8gJFByb21pc2UgOiB0aGlzLCB4KTtcbiAgfVxufSk7XG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICEoVVNFX05BVElWRSAmJiByZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uIChpdGVyKSB7XG4gICRQcm9taXNlLmFsbChpdGVyKVsnY2F0Y2gnXShlbXB0eSk7XG59KSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjEgUHJvbWlzZS5hbGwoaXRlcmFibGUpXG4gIGFsbDogZnVuY3Rpb24gYWxsKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgdmFyICRpbmRleCA9IGluZGV4Kys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBDLnJlc29sdmUocHJvbWlzZSkudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeUNhbGxlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIHZhbHVlc1skaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgICAgICB9LCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIDI1LjQuNC40IFByb21pc2UucmFjZShpdGVyYWJsZSlcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICBmb3JPZihpdGVyYWJsZSwgZmFsc2UsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZSkgcmVqZWN0KHJlc3VsdC52KTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5wcm9taXNlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCBhcmdzLCB0aGF0KSB7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW52b2tlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgbWFjcm90YXNrID0gcmVxdWlyZSgnLi9fdGFzaycpLnNldDtcbnZhciBPYnNlcnZlciA9IGdsb2JhbC5NdXRhdGlvbk9ic2VydmVyIHx8IGdsb2JhbC5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBQcm9taXNlID0gZ2xvYmFsLlByb21pc2U7XG52YXIgaXNOb2RlID0gcmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhlYWQsIGxhc3QsIG5vdGlmeTtcblxuICB2YXIgZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudCwgZm47XG4gICAgaWYgKGlzTm9kZSAmJiAocGFyZW50ID0gcHJvY2Vzcy5kb21haW4pKSBwYXJlbnQuZXhpdCgpO1xuICAgIHdoaWxlIChoZWFkKSB7XG4gICAgICBmbiA9IGhlYWQuZm47XG4gICAgICBoZWFkID0gaGVhZC5uZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfSBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5lbnRlcigpO1xuICB9O1xuXG4gIC8vIE5vZGUuanNcbiAgaWYgKGlzTm9kZSkge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZmx1c2gpO1xuICAgIH07XG4gIC8vIGJyb3dzZXJzIHdpdGggTXV0YXRpb25PYnNlcnZlciwgZXhjZXB0IGlPUyBTYWZhcmkgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMzM5XG4gIH0gZWxzZSBpZiAoT2JzZXJ2ZXIgJiYgIShnbG9iYWwubmF2aWdhdG9yICYmIGdsb2JhbC5uYXZpZ2F0b3Iuc3RhbmRhbG9uZSkpIHtcbiAgICB2YXIgdG9nZ2xlID0gdHJ1ZTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgT2JzZXJ2ZXIoZmx1c2gpLm9ic2VydmUobm9kZSwgeyBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZSA9ICF0b2dnbGU7XG4gICAgfTtcbiAgLy8gZW52aXJvbm1lbnRzIHdpdGggbWF5YmUgbm9uLWNvbXBsZXRlbHkgY29ycmVjdCwgYnV0IGV4aXN0ZW50IFByb21pc2VcbiAgfSBlbHNlIGlmIChQcm9taXNlICYmIFByb21pc2UucmVzb2x2ZSkge1xuICAgIC8vIFByb21pc2UucmVzb2x2ZSB3aXRob3V0IGFuIGFyZ3VtZW50IHRocm93cyBhbiBlcnJvciBpbiBMRyBXZWJPUyAyXG4gICAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodW5kZWZpbmVkKTtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBwcm9taXNlLnRoZW4oZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChmbikge1xuICAgIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICAgIGlmIChsYXN0KSBsYXN0Lm5leHQgPSB0YXNrO1xuICAgIGlmICghaGVhZCkge1xuICAgICAgaGVhZCA9IHRhc2s7XG4gICAgICBub3RpZnkoKTtcbiAgICB9IGxhc3QgPSB0YXNrO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanNcbi8vIG1vZHVsZSBpZCA9IDE3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBuYXZpZ2F0b3IgPSBnbG9iYWwubmF2aWdhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50IHx8ICcnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanNcbi8vIG1vZHVsZSBpZCA9IDE3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtZmluYWxseVxuJ3VzZSBzdHJpY3QnO1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIHNwZWNpZXNDb25zdHJ1Y3RvciA9IHJlcXVpcmUoJy4vX3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4vX3Byb21pc2UtcmVzb2x2ZScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuUiwgJ1Byb21pc2UnLCB7ICdmaW5hbGx5JzogZnVuY3Rpb24gKG9uRmluYWxseSkge1xuICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBjb3JlLlByb21pc2UgfHwgZ2xvYmFsLlByb21pc2UpO1xuICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBvbkZpbmFsbHkgPT0gJ2Z1bmN0aW9uJztcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHJldHVybiB4OyB9KTtcbiAgICB9IDogb25GaW5hbGx5LFxuICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgdGhyb3cgZTsgfSk7XG4gICAgfSA6IG9uRmluYWxseVxuICApO1xufSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLmZpbmFsbHkuanNcbi8vIG1vZHVsZSBpZCA9IDE3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0Jztcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtdHJ5XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIG5ld1Byb21pc2VDYXBhYmlsaXR5ID0gcmVxdWlyZSgnLi9fbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuL19wZXJmb3JtJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnUHJvbWlzZScsIHsgJ3RyeSc6IGZ1bmN0aW9uIChjYWxsYmFja2ZuKSB7XG4gIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5LmYodGhpcyk7XG4gIHZhciByZXN1bHQgPSBwZXJmb3JtKGNhbGxiYWNrZm4pO1xuICAocmVzdWx0LmUgPyBwcm9taXNlQ2FwYWJpbGl0eS5yZWplY3QgOiBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlKShyZXN1bHQudik7XG4gIHJldHVybiBwcm9taXNlQ2FwYWJpbGl0eS5wcm9taXNlO1xufSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qc1xuLy8gbW9kdWxlIGlkID0gMTc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnNldCcpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcuc2V0LnRvLWpzb24nKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnNldC5vZicpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcuc2V0LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlNldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zZXQuanNcbi8vIG1vZHVsZSBpZCA9IDE3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcbnZhciBzdHJvbmcgPSByZXF1aXJlKCcuL19jb2xsZWN0aW9uLXN0cm9uZycpO1xudmFyIHZhbGlkYXRlID0gcmVxdWlyZSgnLi9fdmFsaWRhdGUtY29sbGVjdGlvbicpO1xudmFyIFNFVCA9ICdTZXQnO1xuXG4vLyAyMy4yIFNldCBPYmplY3RzXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24nKShTRVQsIGZ1bmN0aW9uIChnZXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIFNldCgpIHsgcmV0dXJuIGdldCh0aGlzLCBhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7IH07XG59LCB7XG4gIC8vIDIzLjIuMy4xIFNldC5wcm90b3R5cGUuYWRkKHZhbHVlKVxuICBhZGQ6IGZ1bmN0aW9uIGFkZCh2YWx1ZSkge1xuICAgIHJldHVybiBzdHJvbmcuZGVmKHZhbGlkYXRlKHRoaXMsIFNFVCksIHZhbHVlID0gdmFsdWUgPT09IDAgPyAwIDogdmFsdWUsIHZhbHVlKTtcbiAgfVxufSwgc3Ryb25nKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zZXQuanNcbi8vIG1vZHVsZSBpZCA9IDE3N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9EYXZpZEJydWFudC9NYXAtU2V0LnByb3RvdHlwZS50b0pTT05cbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5SLCAnU2V0JywgeyB0b0pTT046IHJlcXVpcmUoJy4vX2NvbGxlY3Rpb24tdG8tanNvbicpKCdTZXQnKSB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zZXQudG8tanNvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTc4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9wcm9wb3NhbC1zZXRtYXAtb2Zmcm9tLyNzZWMtc2V0Lm9mXG5yZXF1aXJlKCcuL19zZXQtY29sbGVjdGlvbi1vZicpKCdTZXQnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zZXQub2YuanNcbi8vIG1vZHVsZSBpZCA9IDE3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vcHJvcG9zYWwtc2V0bWFwLW9mZnJvbS8jc2VjLXNldC5mcm9tXG5yZXF1aXJlKCcuL19zZXQtY29sbGVjdGlvbi1mcm9tJykoJ1NldCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnNldC5mcm9tLmpzXG4vLyBtb2R1bGUgaWQgPSAxODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2V0ID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL3NldCcpO1xuXG52YXIgX3NldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXQpO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheScpO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RvQ29uc3VtYWJsZUFycmF5Mik7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YnKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG5leHBvcnRzLmRlZmF1bHRIZWFkID0gZGVmYXVsdEhlYWQ7XG5cbnZhciBfcmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgX3JlYWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtcblxudmFyIF9wcm9wVHlwZXMgPSByZXF1aXJlKCdwcm9wLXR5cGVzJyk7XG5cbnZhciBfcHJvcFR5cGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Byb3BUeXBlcyk7XG5cbnZhciBfc2lkZUVmZmVjdCA9IHJlcXVpcmUoJy4vc2lkZS1lZmZlY3QnKTtcblxudmFyIF9zaWRlRWZmZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NpZGVFZmZlY3QpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgSGVhZCA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICgwLCBfaW5oZXJpdHMzLmRlZmF1bHQpKEhlYWQsIF9SZWFjdCRDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEhlYWQoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgSGVhZCk7XG4gICAgcmV0dXJuICgwLCBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMuZGVmYXVsdCkodGhpcywgKEhlYWQuX19wcm90b19fIHx8ICgwLCBfZ2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKEhlYWQpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEhlYWQsIFt7XG4gICAga2V5OiAncmVuZGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBIZWFkO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuSGVhZC5jb250ZXh0VHlwZXMgPSB7XG4gIGhlYWRNYW5hZ2VyOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm9iamVjdFxufTtcbmZ1bmN0aW9uIGRlZmF1bHRIZWFkKCkge1xuICByZXR1cm4gW19yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KCdtZXRhJywgeyBjaGFyU2V0OiAndXRmLTgnLCBjbGFzc05hbWU6ICduZXh0LWhlYWQnIH0pXTtcbn1cblxuZnVuY3Rpb24gcmVkdWNlQ29tcG9uZW50cyhjb21wb25lbnRzKSB7XG4gIHZhciBfY29tcG9uZW50cyRtYXAkbWFwJHI7XG5cbiAgcmV0dXJuIChfY29tcG9uZW50cyRtYXAkbWFwJHIgPSBjb21wb25lbnRzLm1hcChmdW5jdGlvbiAoYykge1xuICAgIHJldHVybiBjLnByb3BzLmNoaWxkcmVuO1xuICB9KS5tYXAoZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5DaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKTtcbiAgfSkucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpO1xuICB9LCBbXSkucmV2ZXJzZSgpKS5jb25jYXQuYXBwbHkoX2NvbXBvbmVudHMkbWFwJG1hcCRyLCAoMCwgX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KShkZWZhdWx0SGVhZCgpKSkuZmlsdGVyKGZ1bmN0aW9uIChjKSB7XG4gICAgcmV0dXJuICEhYztcbiAgfSkuZmlsdGVyKHVuaXF1ZSgpKS5yZXZlcnNlKCkubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgdmFyIGNsYXNzTmFtZSA9IChjLmNsYXNzTmFtZSA/IGMuY2xhc3NOYW1lICsgJyAnIDogJycpICsgJ25leHQtaGVhZCc7XG4gICAgcmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jbG9uZUVsZW1lbnQoYywgeyBjbGFzc05hbWU6IGNsYXNzTmFtZSB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG1hcE9uU2VydmVyKGhlYWQpIHtcbiAgcmV0dXJuIGhlYWQ7XG59XG5cbmZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2UoaGVhZCkge1xuICBpZiAodGhpcy5jb250ZXh0ICYmIHRoaXMuY29udGV4dC5oZWFkTWFuYWdlcikge1xuICAgIHRoaXMuY29udGV4dC5oZWFkTWFuYWdlci51cGRhdGVIZWFkKGhlYWQpO1xuICB9XG59XG5cbnZhciBNRVRBVFlQRVMgPSBbJ25hbWUnLCAnaHR0cEVxdWl2JywgJ2NoYXJTZXQnLCAnaXRlbVByb3AnLCAncHJvcGVydHknXTtcblxuLy8gcmV0dXJucyBhIGZ1bmN0aW9uIGZvciBmaWx0ZXJpbmcgaGVhZCBjaGlsZCBlbGVtZW50c1xuLy8gd2hpY2ggc2hvdWxkbid0IGJlIGR1cGxpY2F0ZWQsIGxpa2UgPHRpdGxlLz4uXG5cbmZ1bmN0aW9uIHVuaXF1ZSgpIHtcbiAgdmFyIHRhZ3MgPSBuZXcgX3NldDIuZGVmYXVsdCgpO1xuICB2YXIgbWV0YVR5cGVzID0gbmV3IF9zZXQyLmRlZmF1bHQoKTtcbiAgdmFyIG1ldGFDYXRlZ29yaWVzID0ge307XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChoKSB7XG4gICAgc3dpdGNoIChoLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3RpdGxlJzpcbiAgICAgIGNhc2UgJ2Jhc2UnOlxuICAgICAgICBpZiAodGFncy5oYXMoaC50eXBlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0YWdzLmFkZChoLnR5cGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21ldGEnOlxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gTUVUQVRZUEVTLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgdmFyIG1ldGF0eXBlID0gTUVUQVRZUEVTW2ldO1xuICAgICAgICAgIGlmICghaC5wcm9wcy5oYXNPd25Qcm9wZXJ0eShtZXRhdHlwZSkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaWYgKG1ldGF0eXBlID09PSAnY2hhclNldCcpIHtcbiAgICAgICAgICAgIGlmIChtZXRhVHlwZXMuaGFzKG1ldGF0eXBlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgbWV0YVR5cGVzLmFkZChtZXRhdHlwZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjYXRlZ29yeSA9IGgucHJvcHNbbWV0YXR5cGVdO1xuICAgICAgICAgICAgdmFyIGNhdGVnb3JpZXMgPSBtZXRhQ2F0ZWdvcmllc1ttZXRhdHlwZV0gfHwgbmV3IF9zZXQyLmRlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChjYXRlZ29yaWVzLmhhcyhjYXRlZ29yeSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNhdGVnb3JpZXMuYWRkKGNhdGVnb3J5KTtcbiAgICAgICAgICAgIG1ldGFDYXRlZ29yaWVzW21ldGF0eXBlXSA9IGNhdGVnb3JpZXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn1cblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9zaWRlRWZmZWN0Mi5kZWZhdWx0KShyZWR1Y2VDb21wb25lbnRzLCBvblN0YXRlQ2hhbmdlLCBtYXBPblNlcnZlcikoSGVhZCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2xpYi9oZWFkLmpzXG4vLyBtb2R1bGUgaWQgPSAxODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YnKTtcblxudmFyIF9nZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2syID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrJyk7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2szID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY2xhc3NDYWxsQ2hlY2syKTtcblxudmFyIF9jcmVhdGVDbGFzczIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MnKTtcblxudmFyIF9jcmVhdGVDbGFzczMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVDbGFzczIpO1xuXG52YXIgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4nKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4yKTtcblxudmFyIF9pbmhlcml0czIgPSByZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMnKTtcblxudmFyIF9pbmhlcml0czMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pbmhlcml0czIpO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheScpO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3RvQ29uc3VtYWJsZUFycmF5Mik7XG5cbnZhciBfc2V0ID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL3NldCcpO1xuXG52YXIgX3NldDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXQpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSB3aXRoU2lkZUVmZmVjdDtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3V0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB3aXRoU2lkZUVmZmVjdChyZWR1Y2VDb21wb25lbnRzVG9TdGF0ZSwgaGFuZGxlU3RhdGVDaGFuZ2VPbkNsaWVudCwgbWFwU3RhdGVPblNlcnZlcikge1xuICBpZiAodHlwZW9mIHJlZHVjZUNvbXBvbmVudHNUb1N0YXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCByZWR1Y2VDb21wb25lbnRzVG9TdGF0ZSB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVTdGF0ZUNoYW5nZU9uQ2xpZW50ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBoYW5kbGVTdGF0ZUNoYW5nZU9uQ2xpZW50IHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIG1hcFN0YXRlT25TZXJ2ZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtYXBTdGF0ZU9uU2VydmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBtYXBTdGF0ZU9uU2VydmVyIHRvIGVpdGhlciBiZSB1bmRlZmluZWQgb3IgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKFdyYXBwZWRDb21wb25lbnQpIHtcbiAgICBpZiAodHlwZW9mIFdyYXBwZWRDb21wb25lbnQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgV3JhcHBlZENvbXBvbmVudCB0byBiZSBhIFJlYWN0IGNvbXBvbmVudC4nKTtcbiAgICB9XG5cbiAgICB2YXIgbW91bnRlZEluc3RhbmNlcyA9IG5ldyBfc2V0Mi5kZWZhdWx0KCk7XG4gICAgdmFyIHN0YXRlID0gdm9pZCAwO1xuXG4gICAgZnVuY3Rpb24gZW1pdENoYW5nZShjb21wb25lbnQpIHtcbiAgICAgIHN0YXRlID0gcmVkdWNlQ29tcG9uZW50c1RvU3RhdGUoW10uY29uY2F0KCgwLCBfdG9Db25zdW1hYmxlQXJyYXkzLmRlZmF1bHQpKG1vdW50ZWRJbnN0YW5jZXMpKSk7XG5cbiAgICAgIGlmIChTaWRlRWZmZWN0LmNhblVzZURPTSkge1xuICAgICAgICBoYW5kbGVTdGF0ZUNoYW5nZU9uQ2xpZW50LmNhbGwoY29tcG9uZW50LCBzdGF0ZSk7XG4gICAgICB9IGVsc2UgaWYgKG1hcFN0YXRlT25TZXJ2ZXIpIHtcbiAgICAgICAgc3RhdGUgPSBtYXBTdGF0ZU9uU2VydmVyKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgU2lkZUVmZmVjdCA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShTaWRlRWZmZWN0LCBfQ29tcG9uZW50KTtcblxuICAgICAgZnVuY3Rpb24gU2lkZUVmZmVjdCgpIHtcbiAgICAgICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgU2lkZUVmZmVjdCk7XG4gICAgICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChTaWRlRWZmZWN0Ll9fcHJvdG9fXyB8fCAoMCwgX2dldFByb3RvdHlwZU9mMi5kZWZhdWx0KShTaWRlRWZmZWN0KSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICB9XG5cbiAgICAgICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKFNpZGVFZmZlY3QsIFt7XG4gICAgICAgIGtleTogJ2NvbXBvbmVudFdpbGxNb3VudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgICAgbW91bnRlZEluc3RhbmNlcy5hZGQodGhpcyk7XG4gICAgICAgICAgZW1pdENoYW5nZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wb25lbnREaWRVcGRhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICAgIGVtaXRDaGFuZ2UodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcG9uZW50V2lsbFVubW91bnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgICAgbW91bnRlZEluc3RhbmNlcy5kZWxldGUodGhpcyk7XG4gICAgICAgICAgZW1pdENoYW5nZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgIHJldHVybiBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgIFdyYXBwZWRDb21wb25lbnQsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jaGlsZHJlblxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1dLCBbe1xuICAgICAgICBrZXk6ICdwZWVrJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBlZWsoKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXhwb3NlIGNhblVzZURPTSBzbyB0ZXN0cyBjYW4gbW9ua2V5cGF0Y2ggaXRcblxuICAgICAgICAvLyBUcnkgdG8gdXNlIGRpc3BsYXlOYW1lIG9mIHdyYXBwZWQgY29tcG9uZW50XG5cbiAgICAgIH0sIHtcbiAgICAgICAga2V5OiAncmV3aW5kJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJld2luZCgpIHtcbiAgICAgICAgICBpZiAoU2lkZUVmZmVjdC5jYW5Vc2VET00pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG1heSBvbmx5IGNhbGwgcmV3aW5kKCkgb24gdGhlIHNlcnZlci4gQ2FsbCBwZWVrKCkgdG8gcmVhZCB0aGUgY3VycmVudCBzdGF0ZS4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVjb3JkZWRTdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgIHN0YXRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1vdW50ZWRJbnN0YW5jZXMuY2xlYXIoKTtcbiAgICAgICAgICByZXR1cm4gcmVjb3JkZWRTdGF0ZTtcbiAgICAgICAgfVxuICAgICAgfV0pO1xuICAgICAgcmV0dXJuIFNpZGVFZmZlY3Q7XG4gICAgfShfcmVhY3QuQ29tcG9uZW50KTtcblxuICAgIFNpZGVFZmZlY3QuZGlzcGxheU5hbWUgPSAnU2lkZUVmZmVjdCgnICsgKDAsIF91dGlscy5nZXREaXNwbGF5TmFtZSkoV3JhcHBlZENvbXBvbmVudCkgKyAnKSc7XG4gICAgU2lkZUVmZmVjdC5jb250ZXh0VHlwZXMgPSBXcmFwcGVkQ29tcG9uZW50LmNvbnRleHRUeXBlcztcbiAgICBTaWRlRWZmZWN0LmNhblVzZURPTSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuXG5cbiAgICByZXR1cm4gU2lkZUVmZmVjdDtcbiAgfTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvbGliL3NpZGUtZWZmZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxOTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ25leHQvZXJyb3InKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIG5vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvcGFnZXMvX2Vycm9yLmpzP2VudHJ5IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2dldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtcHJvdG90eXBlLW9mJyk7XG5cbnZhciBfZ2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjaycpO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NsYXNzQ2FsbENoZWNrMik7XG5cbnZhciBfY3JlYXRlQ2xhc3MyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzJyk7XG5cbnZhciBfY3JlYXRlQ2xhc3MzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlQ2xhc3MyKTtcblxudmFyIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMiA9IHJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuJyk7XG5cbnZhciBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuMik7XG5cbnZhciBfaW5oZXJpdHMyID0gcmVxdWlyZSgnYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzJyk7XG5cbnZhciBfaW5oZXJpdHMzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaW5oZXJpdHMyKTtcblxudmFyIF9yZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBfcmVhY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO1xuXG52YXIgX3Byb3BUeXBlcyA9IHJlcXVpcmUoJ3Byb3AtdHlwZXMnKTtcblxudmFyIF9wcm9wVHlwZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvcFR5cGVzKTtcblxudmFyIF9odHRwU3RhdHVzID0gcmVxdWlyZSgnaHR0cC1zdGF0dXMnKTtcblxudmFyIF9odHRwU3RhdHVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2h0dHBTdGF0dXMpO1xuXG52YXIgX2hlYWQgPSByZXF1aXJlKCcuL2hlYWQnKTtcblxudmFyIF9oZWFkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2hlYWQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgRXJyb3IgPSBmdW5jdGlvbiAoX1JlYWN0JENvbXBvbmVudCkge1xuICAoMCwgX2luaGVyaXRzMy5kZWZhdWx0KShFcnJvciwgX1JlYWN0JENvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gRXJyb3IoKSB7XG4gICAgKDAsIF9jbGFzc0NhbGxDaGVjazMuZGVmYXVsdCkodGhpcywgRXJyb3IpO1xuICAgIHJldHVybiAoMCwgX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4zLmRlZmF1bHQpKHRoaXMsIChFcnJvci5fX3Byb3RvX18gfHwgKDAsIF9nZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoRXJyb3IpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gICgwLCBfY3JlYXRlQ2xhc3MzLmRlZmF1bHQpKEVycm9yLCBbe1xuICAgIGtleTogJ3JlbmRlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgIHZhciBzdGF0dXNDb2RlID0gdGhpcy5wcm9wcy5zdGF0dXNDb2RlO1xuXG4gICAgICB2YXIgdGl0bGUgPSBzdGF0dXNDb2RlID09PSA0MDQgPyAnVGhpcyBwYWdlIGNvdWxkIG5vdCBiZSBmb3VuZCcgOiBfaHR0cFN0YXR1czIuZGVmYXVsdFtzdGF0dXNDb2RlXSB8fCAnQW4gdW5leHBlY3RlZCBlcnJvciBoYXMgb2NjdXJyZWQnO1xuXG4gICAgICByZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZXJyb3IgfSxcbiAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgX2hlYWQyLmRlZmF1bHQsXG4gICAgICAgICAgbnVsbCxcbiAgICAgICAgICBfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudCgnbWV0YScsIHsgbmFtZTogJ3ZpZXdwb3J0JywgY29udGVudDogJ3dpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAnIH0pXG4gICAgICAgICksXG4gICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICdkaXYnLFxuICAgICAgICAgIG51bGwsXG4gICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJywgeyBkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6ICdib2R5IHsgbWFyZ2luOiAwIH0nIH0gfSksXG4gICAgICAgICAgc3RhdHVzQ29kZSA/IF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2gxJyxcbiAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5oMSB9LFxuICAgICAgICAgICAgc3RhdHVzQ29kZVxuICAgICAgICAgICkgOiBudWxsLFxuICAgICAgICAgIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7IHN0eWxlOiBzdHlsZXMuZGVzYyB9LFxuICAgICAgICAgICAgX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICdoMicsXG4gICAgICAgICAgICAgIHsgc3R5bGU6IHN0eWxlcy5oMiB9LFxuICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgJy4nXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfV0sIFt7XG4gICAga2V5OiAnZ2V0SW5pdGlhbFByb3BzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFByb3BzKF9yZWYpIHtcbiAgICAgIHZhciByZXMgPSBfcmVmLnJlcyxcbiAgICAgICAgICBlcnIgPSBfcmVmLmVycjtcblxuICAgICAgdmFyIHN0YXR1c0NvZGUgPSByZXMgPyByZXMuc3RhdHVzQ29kZSA6IGVyciA/IGVyci5zdGF0dXNDb2RlIDogbnVsbDtcbiAgICAgIHJldHVybiB7IHN0YXR1c0NvZGU6IHN0YXR1c0NvZGUgfTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEVycm9yO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuRXJyb3IucHJvcFR5cGVzID0ge1xuICBzdGF0dXNDb2RlOiBfcHJvcFR5cGVzMi5kZWZhdWx0Lm51bWJlclxufTtcbmV4cG9ydHMuZGVmYXVsdCA9IEVycm9yO1xuXG5cbnZhciBzdHlsZXMgPSB7XG4gIGVycm9yOiB7XG4gICAgY29sb3I6ICcjMDAwJyxcbiAgICBiYWNrZ3JvdW5kOiAnI2ZmZicsXG4gICAgZm9udEZhbWlseTogJy1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgUm9ib3RvLCBcIlNlZ29lIFVJXCIsIFwiRmlyYSBTYW5zXCIsIEF2ZW5pciwgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBcIkx1Y2lkYSBHcmFuZGVcIiwgc2Fucy1zZXJpZicsXG4gICAgaGVpZ2h0OiAnMTAwdmgnLFxuICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJ1xuICB9LFxuXG4gIGRlc2M6IHtcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcbiAgICBsaW5lSGVpZ2h0OiAnNDlweCcsXG4gICAgaGVpZ2h0OiAnNDlweCcsXG4gICAgdmVydGljYWxBbGlnbjogJ21pZGRsZSdcbiAgfSxcblxuICBoMToge1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgIGJvcmRlclJpZ2h0OiAnMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwuMyknLFxuICAgIG1hcmdpbjogMCxcbiAgICBtYXJnaW5SaWdodDogJzIwcHgnLFxuICAgIHBhZGRpbmc6ICcxMHB4IDIzcHggMTBweCAwJyxcbiAgICBmb250U2l6ZTogJzI0cHgnLFxuICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICB2ZXJ0aWNhbEFsaWduOiAndG9wJ1xuICB9LFxuXG4gIGgyOiB7XG4gICAgZm9udFNpemU6ICcxNHB4JyxcbiAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICBsaW5lSGVpZ2h0OiAnaW5oZXJpdCcsXG4gICAgbWFyZ2luOiAwLFxuICAgIHBhZGRpbmc6IDBcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvbGliL2Vycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAzNjVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjEwLjBcbm1vZHVsZS5leHBvcnRzID0ge1xuICAxMDA6ICdDb250aW51ZScsXG4gIDEwMTogJ1N3aXRjaGluZyBQcm90b2NvbHMnLFxuICAyMDA6ICdPSycsXG4gIDIwMTogJ0NyZWF0ZWQnLFxuICAyMDI6ICdBY2NlcHRlZCcsXG4gIDIwMzogJ05vbi1BdXRob3JpdGF0aXZlIEluZm9ybWF0aW9uJyxcbiAgMjA0OiAnTm8gQ29udGVudCcsXG4gIDIwNTogJ1Jlc2V0IENvbnRlbnQnLFxuICAyMDY6ICdQYXJ0aWFsIENvbnRlbnQnLFxuICAyMDc6ICdNdWx0aSBTdGF0dXMnLFxuICAyMDg6ICdBbHJlYWR5IFJlcG9ydGVkJyxcbiAgMjI2OiAnSU0gVXNlZCcsXG4gIDMwMDogJ011bHRpcGxlIENob2ljZXMnLFxuICAzMDE6ICdNb3ZlZCBQZXJtYW5lbnRseScsXG4gIDMwMjogJ0ZvdW5kJyxcbiAgMzAzOiAnU2VlIE90aGVyJyxcbiAgMzA0OiAnTm90IE1vZGlmaWVkJyxcbiAgMzA1OiAnVXNlIFByb3h5JyxcbiAgMzA2OiAnU3dpdGNoIFByb3h5JyxcbiAgMzA3OiAnVGVtcG9yYXJ5IFJlZGlyZWN0JyxcbiAgMzA4OiAnUGVybWFuZW50IFJlZGlyZWN0JyxcbiAgNDAwOiAnQmFkIFJlcXVlc3QnLFxuICA0MDE6ICdVbmF1dGhvcml6ZWQnLFxuICA0MDI6ICdQYXltZW50IFJlcXVpcmVkJyxcbiAgNDAzOiAnRm9yYmlkZGVuJyxcbiAgNDA0OiAnTm90IEZvdW5kJyxcbiAgNDA1OiAnTWV0aG9kIE5vdCBBbGxvd2VkJyxcbiAgNDA2OiAnTm90IEFjY2VwdGFibGUnLFxuICA0MDc6ICdQcm94eSBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZCcsXG4gIDQwODogJ1JlcXVlc3QgVGltZS1vdXQnLFxuICA0MDk6ICdDb25mbGljdCcsXG4gIDQxMDogJ0dvbmUnLFxuICA0MTE6ICdMZW5ndGggUmVxdWlyZWQnLFxuICA0MTI6ICdQcmVjb25kaXRpb24gRmFpbGVkJyxcbiAgNDEzOiAnUmVxdWVzdCBFbnRpdHkgVG9vIExhcmdlJyxcbiAgNDE0OiAnUmVxdWVzdC1VUkkgVG9vIExhcmdlJyxcbiAgNDE1OiAnVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZScsXG4gIDQxNjogJ1JlcXVlc3RlZCBSYW5nZSBub3QgU2F0aXNmaWFibGUnLFxuICA0MTc6ICdFeHBlY3RhdGlvbiBGYWlsZWQnLFxuICA0MTg6ICdJXFwnbSBhIHRlYXBvdCcsXG4gIDQyMTogJ01pc2RpcmVjdGVkIFJlcXVlc3QnLFxuICA0MjI6ICdVbnByb2Nlc3NhYmxlIEVudGl0eScsXG4gIDQyMzogJ0xvY2tlZCcsXG4gIDQyNDogJ0ZhaWxlZCBEZXBlbmRlbmN5JyxcbiAgNDI2OiAnVXBncmFkZSBSZXF1aXJlZCcsXG4gIDQyODogJ1ByZWNvbmRpdGlvbiBSZXF1aXJlZCcsXG4gIDQyOTogJ1RvbyBNYW55IFJlcXVlc3RzJyxcbiAgNDMxOiAnUmVxdWVzdCBIZWFkZXIgRmllbGRzIFRvbyBMYXJnZScsXG4gIDQ1MTogJ1VuYXZhaWxhYmxlIEZvciBMZWdhbCBSZWFzb25zJyxcbiAgNTAwOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyxcbiAgNTAxOiAnTm90IEltcGxlbWVudGVkJyxcbiAgNTAyOiAnQmFkIEdhdGV3YXknLFxuICA1MDM6ICdTZXJ2aWNlIFVuYXZhaWxhYmxlJyxcbiAgNTA0OiAnR2F0ZXdheSBUaW1lLW91dCcsXG4gIDUwNTogJ0hUVFAgVmVyc2lvbiBub3QgU3VwcG9ydGVkJyxcbiAgNTA2OiAnVmFyaWFudCBBbHNvIE5lZ290aWF0ZXMnLFxuICA1MDc6ICdJbnN1ZmZpY2llbnQgU3RvcmFnZScsXG4gIDUwODogJ0xvb3AgRGV0ZWN0ZWQnLFxuICA1MTA6ICdOb3QgRXh0ZW5kZWQnLFxuICA1MTE6ICdOZXR3b3JrIEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkJyxcbiAgQ09OVElOVUU6IDEwMCxcbiAgU1dJVENISU5HX1BST1RPQ09MUzogMTAxLFxuICBPSzogMjAwLFxuICBDUkVBVEVEOiAyMDEsXG4gIEFDQ0VQVEVEOiAyMDIsXG4gIE5PTl9BVVRIT1JJVEFUSVZFX0lORk9STUFUSU9OOiAyMDMsXG4gIE5PX0NPTlRFTlQ6IDIwNCxcbiAgUkVTRVRfQ09OVEVOVDogMjA1LFxuICBQQVJUSUFMX0NPTlRFTlQ6IDIwNixcbiAgTVVMVElfU1RBVFVTOiAyMDcsXG4gIEFMUkVBRFlfUkVQT1JURUQ6IDIwOCxcbiAgSU1fVVNFRDogMjI2LFxuICBNVUxUSVBMRV9DSE9JQ0VTOiAzMDAsXG4gIE1PVkVEX1BFUk1BTkVOVExZOiAzMDEsXG4gIEZPVU5EOiAzMDIsXG4gIFNFRV9PVEhFUjogMzAzLFxuICBOT1RfTU9ESUZJRUQ6IDMwNCxcbiAgVVNFX1BST1hZOiAzMDUsXG4gIFNXSVRDSF9QUk9YWTogMzA2LFxuICBURU1QT1JBUllfUkVESVJFQ1Q6IDMwNyxcbiAgUEVSTUFORU5UX1JFRElSRUNUOiAzMDgsXG4gIEJBRF9SRVFVRVNUOiA0MDAsXG4gIFVOQVVUSE9SSVpFRDogNDAxLFxuICBQQVlNRU5UX1JFUVVJUkVEOiA0MDIsXG4gIEZPUkJJRERFTjogNDAzLFxuICBOT1RfRk9VTkQ6IDQwNCxcbiAgTUVUSE9EX05PVF9BTExPV0VEOiA0MDUsXG4gIE5PVF9BQ0NFUFRBQkxFOiA0MDYsXG4gIFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEOiA0MDcsXG4gIFJFUVVFU1RfVElNRU9VVDogNDA4LFxuICBDT05GTElDVDogNDA5LFxuICBHT05FOiA0MTAsXG4gIExFTkdUSF9SRVFVSVJFRDogNDExLFxuICBQUkVDT05ESVRJT05fRkFJTEVEOiA0MTIsXG4gIFJFUVVFU1RfRU5USVRZX1RPT19MQVJHRTogNDEzLFxuICBSRVFVRVNUX1VSSV9UT09fTE9ORzogNDE0LFxuICBVTlNVUFBPUlRFRF9NRURJQV9UWVBFOiA0MTUsXG4gIFJFUVVFU1RFRF9SQU5HRV9OT1RfU0FUSVNGSUFCTEU6IDQxNixcbiAgRVhQRUNUQVRJT05fRkFJTEVEOiA0MTcsXG4gIElNX0FfVEVBUE9UOiA0MTgsXG4gIE1JU0RJUkVDVEVEX1JFUVVFU1Q6IDQyMSxcbiAgVU5QUk9DRVNTQUJMRV9FTlRJVFk6IDQyMixcbiAgVVBHUkFERV9SRVFVSVJFRDogNDI2LFxuICBQUkVDT05ESVRJT05fUkVRVUlSRUQ6IDQyOCxcbiAgTE9DS0VEOiA0MjMsXG4gIEZBSUxFRF9ERVBFTkRFTkNZOiA0MjQsXG4gIFRPT19NQU5ZX1JFUVVFU1RTOiA0MjksXG4gIFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0U6IDQzMSxcbiAgVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlM6IDQ1MSxcbiAgSU5URVJOQUxfU0VSVkVSX0VSUk9SOiA1MDAsXG4gIE5PVF9JTVBMRU1FTlRFRDogNTAxLFxuICBCQURfR0FURVdBWTogNTAyLFxuICBTRVJWSUNFX1VOQVZBSUxBQkxFOiA1MDMsXG4gIEdBVEVXQVlfVElNRU9VVDogNTA0LFxuICBIVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRDogNTA1LFxuICBWQVJJQU5UX0FMU09fTkVHT1RJQVRFUzogNTA2LFxuICBJTlNVRkZJQ0lFTlRfU1RPUkFHRTogNTA3LFxuICBMT09QX0RFVEVDVEVEOiA1MDgsXG4gIE5PVF9FWFRFTkRFRDogNTEwLFxuICBORVRXT1JLX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEOiA1MTFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9odHRwLXN0YXR1cy9saWIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNMQTs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hCQTs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNsQkE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNoQkE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDM0JBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEE7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDYkE7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBOzs7Ozs7QUNBQTs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakNBOzs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNGQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JDQTtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7OztBQ0FBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3hCQTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzUyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN2TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCQTs7Ozs7O0FDQUE7QUFDQTtBQUNBOzs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdHRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzdSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ0hBO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=
            return { page: comp.default }
          })
        