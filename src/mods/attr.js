/**
 * @author xiaojue
 * @date 20141125
 * @fileoverview class for attr
 */

iwo.define('mods/attr', ['mods/class', 'mods/utils'], function(require) {

  var Class = require('mods/class');
  var utils = require('mods/utils');

  var Attr = new Class({
    initialize: function(config) {
      var attrs = this.attrs = {};
      if (config) {
        utils.mixin(attrs, config);
      }
      this._setMethodEvent(attrs); //设置before after方法
      console.log('attr');
    },
    _set: function(key, val) {
      var prev = this.attrs[key];
      this.attrs[key] = val;
      this.trigger('change:' + key, [val, prev, key]);
      this.trigger('change', [key, val, prev]);
    },
    set: function(keys, val) {
      var self = this;
      if (utils.isObject(keys)) {
        utils.each(keys, function(val, key) {
          self._set.call(self,key, val);
        });
      } else {
        this._set(keys, val);
      }
      return this;
    },
    get: function(key) {
      return this.attrs[key];
    },
    _setMethodEvent: function(attrs) {
      var self = this;
      utils.each(attrs, function(attr, method) {
        if (utils.isFunction(attr)){
          self[method] = function(){
            var args = utils.Args2Array(arguments);
            self.trigger('before'+upFirst(method),args,self);
            attr.apply(self,args);
            self.trigger('after'+upFirst(method),args,self);
          };
          delete self.attrs[method];
        }
      });
    }
  });

  function upFirst(method){
    var f = method.charAt(0);
    return f.toUpperCase() + method.slice(1); 
  }

  return Attr;

});
