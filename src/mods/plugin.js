/**
 * @author arck[myluluy@gmail.com]
 * @date 20141124
 * @fileoverview plugin manager for iwo
 */
iwo.register('mods/plugin', ['mods/utils', 'mods/base'], function(require) {

  var Base = require('mods/base'),
  utils = require('mods/utils');

  var PluginManager = Base.create({
    initialize: function() {
      this.__Plugins = [{},
      {},
      {},
      {}];
    },
    init: function(priority) {
      var self = this,
      count = 0;
      utils.deffer(function() {
        load(0);
      }).deffer(function() {
        load(1);
      }).deffer(function() {
        load(2);
      }).deffer(function() {
        load(3);
        self.trigger('pluginloaded');
      });

      function load(priority) {
        for (var plg in this.__Plugins[priority]) {
          self.loader(priority, plg.name);
        }
        self.trigger('pluginloaded_' + priority);
      }
    },
    loader: function(priority, name) {
      var plg = this.__Plugins[priority] && this.__Plugins[priority][name];
      if (plg && utils.isFunction(plg.init)) {
        plg.init();
      }
    },
    register: function(name, plugin) {
      var plg = fixPlugin(name, plugin);
      if (plg.priority > 3) {
        return;
      }
      this.__Plugins[plg.priority][name] = plg;
    }
  });

  function fixPlugin(name, plugin) {
    var plg = Object.create(null);
    plg.type = plugin.type || 'normal';
    plg.priority = plugin.priority || 3;
    plg.name = name;
    plg.stance = null;
    plg.init = function() {
      plg.init = null;
      plg.stance = utils.isFunction(plugin.constructor) ? new plugin.constructor(plugin.params) : {};
    };
    return plg;
  }

  return new PluginManager();
});

