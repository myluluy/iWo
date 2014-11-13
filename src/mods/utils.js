/*
 * @author xiaojue[designsor@gmail.com]
 * @date 20141113
 * @fileoverview base utils
 */

iwo.define('mods/utils', function(require) {

  var Arr = Array.prototype,
  Obj = Object,
  toString = Obj.prototype.toString;

  var utils = {
    noop: function() {},
    keys: Obj.keys ? Obj.keys: function(o) {
      var ret = [];
      for (var p in o) {
        if (o.hasOwnProperty(p)) ret.push(p);
      }
      return ret;
    },
    each: function(src, fn) {
      var key;
      for (key in src) {
        fn(src[key], key, src);
      }
    },
    forEach: Arr.forEach ? function(arr, fn) {
      arr.forEach(fn);
    }: function(arr, fn) {
      for (var i = 0; i < arr.length; i++) fn(arr[i], i, arr);
    },
    filter: Arr.filter ? function(arr, fn) {
      return arr.filter(fn);
    }: function(arr, fn) {
      var ret = [];
      utils.forEach(arr, function(item, i, arr) {
        if (fn(item, i, arr)) ret.push(item);
      });
      return ret;
    },
    map: Arr.map ? function(arr, fn) {
      return arr.map(fn);
    }: function(arr, fn) {
      var ret = [];
      utils.forEach(arr, function(item, i, arr) {
        ret.push(fn(item, i, arr));
      });
      return ret;
    },
    isString: function(v) {
      return toString.call(v) === '[object String]';
    },
    isFunction: function() {
      return toString.call(v) === '[object Function]';
    },
    isArray: function() {
      return toString.call(v) === '[object Array]';
    },
    isObject: function(v) {
      return v === Obj(v);
    },
    isNode: function(v) {
      return v.nodeType && ('cloneNode' in v);
    },
    indexOf: Arr.indexOf ? function(arr, selector) {
      return arr.indexOf(selector);
    }: function(arr, selector) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === selector) return i;
      }
      return - 1;
    },
    extend: function(src, target, preserve) {
      var key;
      src = utils.clone(src);
      target = utils.clone(target);
      for (key in target) {
        if (utils.isObject(target[key])) {
          utils.extend(src[key], target[key]);
        } else {
          src[key] = (preserve && src[key]) ? src[key] : target[key];
        }
      }
      return src;
    },
    mixin: function(dest, src, copyFunc) {
      var empty = {};
      utils.each(src, function(s, name) {
        if (! (name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))) {
          dest[name] = copyFunc ? copyFunc(s) : s;
        }
      });
      return dest;
    },
    clone: function(src) {
      var r;
      if (!src || ! utils.isObject(src) || utils.isFunction(src)) {
        return src;
      }
      if (isNode(src)) {
        return src.cloneNode(true);
      }
      if (src instanceof Date) {
        return new Date(src.getTime());
      }
      if (src instanceof RegExp) {
        return new RegExp(src);
      }
      if (src && utils.isArray(src)) {
        r = [];
        utils.forEach(src, function(item, key) {
          if (key in src) r.push(clone(item));
        });
      } else {
        r = src.constructor ? new src.constructor() : {};
      }
      return utils.mixin(r, src, utils.clone);
    },
    remove: function(src, name, safe) {
      if (safe) {
        var safeObj = {};
        utils.each(src, function(item, key) {
          if (key !== name) safeObj[key] = item;
        });
      } else {
        delete src[name];
      }
      return safeObj || src;
    },
    createNew: function(src) {
      var F = function() {};
      F.prototype = src;
      F.prototype.constructor = F;
      return new F();
    },
    implement: function(arr, blackList) {
      var collection = {};

      utils.forEach(arr, function(item, i, arr) {

        if (utils.isFunction(item)) arr[i] = item.prototype;

        var safe = utils.clone(item);

        utils.forEach(blackList, function(key) {
          utils.remove(safe, key);
        });

        if (safe.implement) {
          collection = utils.implement(safe.implement);
        } else {
          collection = utils.extend(collection, safe);
        }

      });
      return collection;
    }
  };
  return utils;
});
