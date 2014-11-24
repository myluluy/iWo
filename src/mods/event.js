/**
 * @author xiaojue,luying
 * @date 2014113
 * @fileoverview custom event
 */

iwo.define('mods/event', ['mods/class', 'mods/utils'], function(require) {

  var Class = require('mods/class');
  var utils = require('mods/utils');

  var Event = new Class({
    initialize: function() {
      this.events = {};
    },
    trigger: function(name, args, scope) {
      var self = this,
      cbs = this.events[name];
      if(!cbs) return;
      for (var i = 0; i < cbs.length; i++) {
        var cb = cbs[i];
        if (utils.isFunction(cb)) {
          cb._args = args;
          cb._scope = scope || self;
          if (cb.apply(cb._scope, cb._args) === false) break;
        }
      }
    },
    on: function(name, cb) {
      var events = this.events;
      if (events[name]) {
        events[name].push(cb);
      } else {
        events[name] = [cb];
      }
    },
    once: function(name, cb) {
      var self = this,
      once = function() {
        var cbs = self.events[name],
        cbIndex = utils.indexOf(cbs, once);
        if (utils.isFunction(cb)) cb.apply(self, utils.Args2Array(arguments));
        cbs.split(cbIndex, 1);
      };
      this.on(name, once);
    },
    live: function(name, cb) {
      var self = this,
      fired, live = function() {
        if (!fired) {
          var cbs = self.events[name],
          cbIndex = utils.indexOf(cbs, live);
          for (var i = 0; i < cbIndex; i++) {
            var fn = cbs[i];
            fn.apply(fn._scope, fn._args);
          }
          fired = true;
        }
        if (utils.isFunction(cb)) cb.apply(self, utils.Args2Array(arguments));
      };
      this.on(name, live);
    }
  });

  return Event;

});
