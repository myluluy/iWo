/**
 * @author xiaojue,luying
 * @date 2014113
 * @fileoverview custom event
 */

iwo.define('mods/event', ['mods/class', 'mods/utils'], function(require) {

  var Class = require('mods/class');
  var utils = require('mods/utils');

  function splitEvents(names, cb) {
    utils.forEach(names.split(','),cb);
  }

  var Event = new Class({
    initialize: function() {
      this.events = {};
    },
    trigger: function(name, args, scope) {
      var self = this,
      events = this.events,
      cbs = events[name] ? events[name] : [];
      cbs._args = args;
      cbs._scope = scope || self;
      cbs._trigged = true;
      for (var i = 0; i < cbs.length; i++) {
        var cb = cbs[i];
        if (utils.isFunction(cb)) {
          if (cb.apply(cbs._scope, cbs._args) === false) break;
        }
      }
      events[name] = cbs;
    },
    on: function(names, cb) {
      var self = this;
      splitEvents(names, function(name) {
        var events = self.events;
        if (events[name]) {
          events[name].push(cb);
        } else {
          events[name] = [cb];
        }
      });
    },
    once: function(names, cb) {
      var self = this;
      splitEvents(names, function(name) {
        var once = function() {
          var cbs = self.events[name],
          cbIndex = utils.indexOf(cbs, once);
          if (utils.isFunction(cb)) cb.apply(cbs._scope, cbs._args);
          cbs.split(cbIndex, 1);
        };
        self.on(name, once);
      });
    },
    live: function(names, cb) {
      var self = this;
      splitEvents(names, function(name) {
        var events = self.events[name];
        if (events._trigged && utils.isFunction(cb)) {
          cb.apply(cbs._scope, cbs._args);
        }
        self.on(name, cb);
      });
    }
  });

  return Event;

});
