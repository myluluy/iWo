/**
 * @author xiaojue[designsor@gmail.com]
 * @date 20141126
 * @fileoverview base for class
 */

iwo.define('mods/base', ['mods/event', 'mods/class', 'mods/attr', 'mods/utils'], function(require) {

  var Class = require('mods/class');

  var Attr = require('mods/attr');
  var Event = require('mods/event');

  var utils = require('mods/utils');

  var Base = new Class({
    create:function(src){
       var cls = new Class(src);
       cls.extend([Event,Attr]);
       return cls;
    }
  });

  return new Base();

});

