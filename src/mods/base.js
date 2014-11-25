iwo.define('mods/base', ['mods/event','mods/class','mods/attr','mods/utils'], function(require) {

  var Class = require('mods/class');

  var Attr = require('mods/attr');
  var Event = require('mods/event');

  var utils = require('mods/utils');

  var Base = new Class({
    initialize: function() {
      console.log('base');
    }
  });

  Base.extend([Event,Attr]);

  var test = new Base({
    attrs:{
      a:1,
      b:2
    },
    c:3,
    test:function(){
      this.set('a',5); 
    }
  });

  test.on('change:a',function(){
    console.log('change a'); 
  });

  test.on('beforeTest',function(){
    console.log(arguments); 
  });

  test.test(123);

  return Base;

});

