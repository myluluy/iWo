/**
 * @author xiaojue[designsor@gmail.com]
 * @date 20141113
 * @fileoverview 可多级继承的class
 */

iwo.define('mods/class', ['mods/utils'], function(require) {

  var utils = require('mods/utils');

  function Class(src) {
    src = src || {};
    var constructor = function() {
      return (this.initialize) ? this.initialize.apply(this, utils.Args2Array(arguments)) : this;
    };
    if (src.implement) {
      var imp = src.implement;
      utils.remove(src, 'implement');
      src = utils.extend(src, utils.implement(imp, ['initialize']));
    }
    constructor.prototype = utils.createNew(src);
    constructor.constructor = constructor;
    constructor._parent = utils.createNew(src);
    utils.forEach(['extend', 'implement'], function(item) {
      constructor[item] = Class[item];
    });
    return constructor;
  }

  Class.extend = function(src) {
    var self = this;
    if (src.implement) {
      this.prototype = utils.extend(this.prototype, utils.implement(src.implement));
      remove(src, 'implement');
    }
    utils.each(src, function(item, key) {
      src[key] = utils.isFunction(item) ? (function(method, name) {
        return function() {
          this.parent = self._parent[name];
          return method.apply(this, utils.Args2Array(arguments));
        };
      })(item, key) : src[key];
    });
    this._parent = utils.extend(this._parent, src, true);
    this.prototype = utils.extend(this.prototype, src);
    return this;
  };

  Class.implement = function(arr) {
    return (this.prototype = utils.extend(this.prototype, utils.implement(arr,['initialize'])));
  };

  return Class;

});

