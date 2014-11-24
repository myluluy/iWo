/**
 * @author arck[myluluy@gmail.com]
 * @date 20141115
 * @fileoverview commands manager for iwo
 */
iwo.register('mods/range/commands', ['mods/utils', 'mods/event'], function(require) {
  var Event = require('mods/event'),
    utils = require('mods/utils'),
    evt = new Event(),
    __Commands = {},
    commandManager = {
      /**
       * @method : register
       * @注册新命令
       * @params : name (string) 命令名称 command (object) 命令的具体行为:
       *
       * command 具体属性:
       *    execute : 执行命令的具体方法 (function 必需)
       *    type : 该命令的类型 : normal | unevent |
       */
      register: function(name, command) {
        if (__Commands[name]) {
          return;
        }
        cmd = fixCommand(name, command);
        __Commands[name] = cmd;
        evt.fire('commandregister', utils.clone(cmd));
      },

      execCommand: function(cmdName) {
        var cmd = __Commands[cmdName],
          res;
        if (cmd) {
          if (cmd.type !== 'unevent') {
            evt.fire('commandbefore', arguments);
            evt.fire('commandbefore.' + cmd.name, arguments);
          }
          res = cmd.execute(arguments);
          if (cmd.type !== 'unevent') {
            evt.fire('commandafter' + cmd.name, arguments);
            evt.fire('commandafter', arguments);
          }
          return res;
        } else {
          throw new Error('cannot find the method "execute " for ' + cmdName);
        }
      },

      queryProperties: function(cmdName, prop) {
        var cmd = __Commands[cmdName],
          res;
        res = cmd && cmd[prop];
        if (res === undefined) {
          return undefined;
        }
        return utils.isFunction(res) ? '[object Function]' : utils.isString(res) ? res : utils.clone(res);

      },

      bind: function(evtname, func) {
        return evt.bind(evtname, func, false);
      },
      getAllCommands: function() {
        return utils.clone(__Commands);
      }
    };

  function fixCommand(name, command) { //TODO: To extend the cmd for more function
    var cmd = Object.create(null),
      res;
    cmd.name = name;
    cmd.type = command.type || 'normal';
    cmd.execute = function() {
      if (utils.isFunction(command.execute)) {
        return command.execute.apply(command, arguments);
      }
    };
    return cmd;
  }
  return commandManager;
});
