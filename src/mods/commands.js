/**
 * @author arck[myluluy@gmail.com]
 * @date 20141115
 * @fileoverview commands manager for iwo
 */
iwo.register('mods/range/commands', ['mods/utils', 'mods/event'], function(require) {
  var Event = require('mods/event'),
    utils = require('mods/utils'),
    __Commands = {};

  function CommandManager() {
    this.__Commands = __Commands;

  }

  CommandManager.prototype = {
    constructor: CommandManager,

    register: function(cmdName, CmdControl) {
      if (__Commands[cmdName]) {
        return;
      }
      __Commands[cmdName] = new CmdControl();
    },

    execCommand: function(cmdName) {

    }


  };

});
