/**
 * @author xiaojue[designsor@gmail.com]
 * @date 20141113
 * @fileoverview 可多级继承的class
 */

iwo.define('mods/class', ['mods/utils'], function(require) {

  var utils = require('mods/utils');

  function Class(src) {

    src = src || {};
    var constructor = function() {
      return (this.initialize) ? this.initialize.apply(this, utils.Args2Array(arguments)) : this;
    };

    constructor.prototype = utils.createNew(src);
    constructor.constructor = constructor;

    utils.forEach(['extend'], function(item) {
      constructor[item] = Class[item];
    });
    return constructor;
  }

  function clonePro(pros){
    var sub = {};
    for(var key in pros){
      if(key === 'initialize') continue;
      sub[key] = pros[key]; 
    }
    return sub;
  }

  Class.extend = function(arr) {
    var self = this;

    var inits = [];

    utils.forEach(arr, function(constructor) {
      var pro = clonePro(constructor.prototype);
      self.prototype = utils.extend(self.prototype,pro);
      if(constructor.prototype.initialize) inits.push(constructor.prototype.initialize);
    });

    var init = this.prototype.initialize;
    if(init){
      this.prototype.initialize = function(){
        var that = this;
        var args = utils.Args2Array(arguments); 
        utils.forEach(inits,function(init){
          init.apply(that,args); 
        });
        init.apply(this,args);
      }; 
    }
       
    return this;
  };

  return Class;

});

