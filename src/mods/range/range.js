/**
 * @author myluluy@gmail.com
 * @date 20141113
 * @fileoverview range  for iwo
 */
iwo.register('mods/range/base', ['mods/range/base', 'mods/class'], function(require) {

  var Class = require('mods/class');
  var Base = require('mods/range/base');

  var Range = new Class({
    initialize: function(doc) {
      var base = new Base(doc);
    },
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

    getBlockParents: function() {

    }
  });

  return Range;
});

