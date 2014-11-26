/**
 * @author xiaojue
 * @date 20141125
 * @fileoverview class for attr
 */

iwo.define('mods/attr', ['mods/class', 'mods/utils'], function(require) {

  var Class = require('mods/class');
  var utils = require('mods/utils');

  var attrs = {};
  var attrsOptions = {};

  var Attr = new Class({
    initialize: function(config) {
      var id = this.id;
      attrs[id] = {};
      attrsOptions[id] = {};
      if (config) {
        utils.mixin(attrs[id], config);
      }
      _setMethodEvent.call(this); //设置before after方法
    },
    set: function(keys, val, options) {
      var self = this;
      if (utils.isObject(keys)) {
        utils.each(keys, function(val, key) {
          _set.call(self, key, val, options);
        });
      } else {
        _set.call(self, keys, val, options);
      }
      return this;
    },
    get: function(key) {
      var id = this.id;
      return utils.clone(attrs[id][key]);
    }
  });

  function _set(key, val,options) {
    var id = this.id,
    prev = attrs[id][key],
    o = attrsOptions[id][key];
    if(!o && options) attrsOptions[id][key] = options;
    if(o && o.readOnly){
      throw Error('can set a readOnly value'); 
    }else{
      attrs[id][key] = val;
      this.trigger('change:' + key, [val, prev, key]);
      this.trigger('change', [key, val, prev]);
    }
  }

  function _setMethodEvent() {
    var self = this;
    utils.each(attrs[this.id], function(attr, method) {
      if (utils.isFunction(attr)) {
        self[method] = function() {
          var args = utils.Args2Array(arguments);
          self.trigger('before' + _upFirst(method), args, self);
          attr.apply(self, args);
          self.trigger('after' + _upFirst(method), args, self);
        };
        delete attrs[self.id][method];
      }
    });
  }

  function _upFirst(method) {
    var f = method.charAt(0);
    return f.toUpperCase() + method.slice(1);
  }

  return Attr;

});

