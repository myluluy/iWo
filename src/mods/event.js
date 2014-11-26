/**
 * @author xiaojue,luying
 * @date 2014113
 * @fileoverview custom event
 */

iwo.define('mods/event', ['mods/class', 'mods/utils'], function(require) {

  var Class = require('mods/class');
  var utils = require('mods/utils');

  function _splitEvents(names, cb) {
    utils.forEach(names.split(','), cb);
  }

  var _events = {};

  var Event = new Class({
    initialize:function(){
      var id = this.id = utils.uniqueID('ID');
      _events[id] = {};
    },
    trigger: function(name, args, scope) {
      var self = this,
      events = _events[this.id],
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
      _splitEvents(names, function(name) {
        var events = _events[self.id];
        if (events[name]) {
          events[name].push(cb);
        } else {
          events[name] = [cb];
        }
      });
    },
    once: function(names, cb) {
      var self = this;
      _splitEvents(names, function(name) {
        var once = function() {
          var cbs = _events[self.id][name],
          cbIndex = utils.indexOf(cbs, once);
          if (utils.isFunction(cb)) cb.apply(cbs._scope, cbs._args);
          cbs.splice(cbIndex, 1);
        };
        self.on(name, once);
      });
    },
    live: function(names, cb) {
      _live.call(this, names, cb, 'on');
    },
    liveOnce: function(names, cb) {
      _live.call(this, names, cb, 'once');
    }
  });

  function _live(names, cb, type) {
    var self = this;
    _splitEvents(names, function(name) {
      var events = _events[self.id][name];
      if (events._trigged && utils.isFunction(cb)) {
        cb.apply(events._scope, events._args);
      }
      self[type](name, cb);
    });
  }

  return Event;

});
