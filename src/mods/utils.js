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
    Args2Array: function(args) {
      return Arr.slice.apply(args);
    },
    keys: Obj.keys ? Obj.keys : function(o) {
      var ret = [];
      for (var p in o) {
        if (o.hasOwnProperty(p)) ret.push(p);
      }
      return ret;
    },
    each: function(src, fn,deep) {
      var key;
      for (key in src) {
        if(src.hasOwnProperty(key)) fn(src[key], key, src);
      }
    },
    forEach: Arr.forEach ? function(arr, fn) {
      arr.forEach(fn);
    } : function(arr, fn) {
      for (var i = 0; i < arr.length; i++) fn(arr[i], i, arr);
    },
    filter: Arr.filter ? function(arr, fn) {
      return arr.filter(fn);
    } : function(arr, fn) {
      var ret = [];
      utils.forEach(arr, function(item, i, arr) {
        if (fn(item, i, arr)) ret.push(item);
      });
      return ret;
    },
    map: Arr.map ? function(arr, fn) {
      return arr.map(fn);
    } : function(arr, fn) {
      var ret = [];
      utils.forEach(arr, function(item, i, arr) {
        ret.push(fn(item, i, arr));
      });
      return ret;
    },
    isString: function(v) {
      return toString.call(v) === '[object String]';
    },
    isFunction: function(v) {
      return toString.call(v) === '[object Function]';
    },
    isArray: function(v) {
      return toString.call(v) === '[object Array]';
    },
    isObject: function(v) {
      return toString.call(v) === '[object Object]';
    },
    isNode: function(v) {
      return v.nodeType && utils.indexOf([2, 11, 9], v.nodeType) && ('cloneNode' in v);
    },
    indexOf: Arr.indexOf ? function(arr, selector) {
      return arr.indexOf(selector);
    } : function(arr, selector) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === selector) return i;
      }
      return -1;
    },
    extend: function(src, target,filter) {
      var key;
      for (key in target) {
        if (utils.isObject(target[key])) {
          utils.extend(src[key], target[key]);
        } else {
          if(filter){
            src[key] = filter(target,src,key) ? src[key] : target[key];
          }else{
            src[key] = target[key];
          }
        }
      }
      return src;
    },
    mixin: function(dest, src, copyFunc) {
      var empty = {};
      utils.each(src, function(s, name) {
        if (!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))) {
          dest[name] = copyFunc ? copyFunc(s) : s;
        }
      });
      return dest;
    },
    clone: function(src) {
      var r;
      if (!src || !utils.isObject(src) || utils.isFunction(src)) {
        return src;
      }
      if (utils.isNode(src)) {
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
    dichotomySearch: function(arr, condition, greedy) { //TODO
      var len = arr.length,
        res,
        _res = null,
        currStart = 0,
        currEnd = len - 1,
        curr = null,
        cond;
      while (res === undefined && currStart <= currEnd) {
        curr = currStart === currEnd ? currStart : Math.ceil((currEnd + currStart) / 2);
        cond = condition(curr, arr[curr]);
        switch (cond) {
          case -1:
            if (currStart !== curr) {
              currStart = curr;
            } else {
              res = null;
            }
            break;
          case 0:
            res = arr[curr];
            break;
          case 1:
            if (currEnd !== curr) {
              currEnd = curr;
            } else {
              res = null;
            }
            break;
          default:
            res = null;
            break;

        }
      }
      _res = null;
      return res || null;
    }

  };

  return utils;
});
