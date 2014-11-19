/**
 * @author myluluy@gmail.com
 * @date 20141113
 * @fileoverview range  for iwo
 */
iwo.register('mods/range/base', ['mods/range/base'], function(require) {
  var Base = require('mods/range/base');

  function Range(doc) {
    var base = new Base(doc);
  }

  Range.prototype = {

    constructor: Range,

    insertNode: function(node) {

    },

    getTextNodes: function() {

    },

    mergeTextNode: function() {

    },

    breakContainer: function() {

    },

    removeNode: function(isChild) {

    },

    getBlockParents : function(){
    
    }

  };

  return Range;
});
