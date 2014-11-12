iwo.register('mods/help',['mods/dom','mods/utils'],function(require){
    var dom = require('mods/dom');
    var utils = require('mods/utils');
    return {
      dom:dom,
      utils:utils
    };
});
