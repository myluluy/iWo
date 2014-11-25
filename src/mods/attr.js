/**
 * @author xiaojue
 * @date 20141125
 * @fileoverview class for attr
 */

iwo.define('mods/attr', ['mods/class', 'mods/utils'], function(require) {

  var Class = require('mods/class');
  var Event = require('mods/event');
  var utils = require('mods/utils');

  var Attr = new Class({
    initialize: function() {

    },
    set: function() {

    },
    get: function() {

    }
  });

  Attr.extend(new Event());

  return Attr;

});

