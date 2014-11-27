/**
 * @author arck[myluluy@gmail.com]
 * @date 20141115
 * @fileoverview commands manager for iwo
 */
iwo.register('mods/commands', ['mods/utils', 'mods/base'], function(require) {

  var Base = require('mods/base'),
  utils = require('mods/utils');

  var CommandManager = Base.create({
    initialize: function() {
      this.__Commands = {};
    },
    /**
     * @method : register
     * @注册新命令
     * @params : name (string) 命令名称 command (object) 命令的具体行为:
     *
     * command 具体属性:
     *    execute : 执行命令的具体方法 (function 必需)
     *    type : 该命令的类型 : normal | unevent
     */
    register: function(name, command) {
      if (this.__Commands[name]) {
        return;
      }
      cmd = fixCommand(name, command);
      this.__Commands[name] = cmd;
      this.trigger('commandregister', utils.clone(cmd));
    },

    execCommand: function(cmdName) {
      var cmd = this.__Commands[cmdName],
      res;
      if (cmd) {
        if (cmd.type !== 'unevent') {
          this.trigger('commandbefore', arguments);
          this.trigger('commandbefore.' + cmd.name, arguments);
        }
        res = cmd.execute(arguments);
        if (cmd.type !== 'unevent') {
          this.trigger('commandafter' + cmd.name, arguments);
          this.trigger('commandafter', arguments);
        }
        return res;
      } else {
        throw new Error('cannot find the method "execute " for ' + cmdName);
      }
    },

    queryProperties: function(cmdName, prop) {
      var cmd = this.__Commands[cmdName],
      res;
      res = cmd && cmd[prop];
      if (res === undefined) {
        return undefined;
      }
      return utils.isFunction(res) ? '[object Function]': utils.isString(res) ? res: utils.clone(res);

    },

    on: function(eventname, func) {
      return this.on(eventname, func);
    },
    getAllCommands: function() {
      return utils.clone(this.__Commands);
    }
  });

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

  return new CommandManager();
});

