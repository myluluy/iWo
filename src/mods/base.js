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
    initialize: function() {

    }
  });

  Base.extend([Event, Attr]);

  return Base;

});

