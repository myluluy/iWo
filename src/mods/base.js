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
      this.set('t', 1, {
        readOnly: true
      });
    }
  });

  Base.extend([Event, Attr]);

  var test = new Base({
    hoho: {
      a: 1
    }
  });

  test.once('change:hoho',function(){
    console.log(123); 
  });

  test.set('hoho',2);
  test.set('hoho',2);

  return Base;

});

