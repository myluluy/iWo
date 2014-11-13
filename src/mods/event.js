/**
 * @author xiaojue,luying
 * @date 2014113
 * @fileoverview custom event
 */

iwo.define('mods/event', ['mods/utils'], function(require) {

  var utils = require('mods/utils'),
  createEvt = function(name) {
    return {
      returnValue: true,
      event: name,
      undo: false
    };
  },
  Event = function() {
    this.__Events = {};
    this.__hasFire = {};
  };

  Event.prototype = {
    constructor: Event,
    /**
       * 触发事件
       * @param {Object} object 事件处理函数的作用域
       * @param {String} name   事件名称
       * @param {Object} data   传入的数据
       */
    fire: function(object, name, data) {
      name = name.toLowerCase();
      var funcs = this.__Events[name] || [];
      var datas = Array.prototype.slice.apply(arguments, [2]);
      var returnValue, item, params, a = 0;

      for (; a < funcs.length; a++) {
        item = funcs[a];
        if (!utils.isFunction(item)) {
          continue;
        }
        e = createEvt(name);
        params = utils.clone(datas);
        params.unshift(e);
        returnValue = item.apply(object || this, params);
        if (false === returnValue) {
          return returnValue;
        }
        if (e.undo === true) {
          this.__Events[name][a] = undefined;
          this.__Events[name].splice(a, 1);
          a--;
        }

        if (e.returnValue === false) {
          break;
        }
      }
      this.__hasFire[name] = utils.clone(arguments);
      return returnValue;
    },
    /**
       * 绑定事件
       * @param {String} name  事件名称
       * @param {Function} func    事件处理函数
       * @param {Boolean} isFirst  处理函数是否添加在最前面
       * @returns {*}
       */
    bind: function(evtname, func, isFirst) {
      evtname = evtname.toLowerCase();
      var names = evtname.split(',');
      for (var i = 0; i < names.length; i++) {
        var name = names[i];
        if (!this.__Events[name]) {
          this.__Events[name] = [];
        }

        if (isFirst && this.__hasFire[name]) {
          if (utils.isFunction(func)) {
            var e = createEvt(name);
            var object = this.__hasFire[name][0] || this;
            var data = this.__hasFire[name],
            datas = [];
            if (data) {
              datas = Array.prototype.slice.apply(data, [2, data.length]);
            }
            datas.unshift(e);
            func.apply(object, datas);
            if (e.undo !== true) {
              this.__Events[name].unshift(func);
            }
          }
        } else {
          this.__Events[name].unshift(func);
        }
      }

    }

  };

  return Event;
});

