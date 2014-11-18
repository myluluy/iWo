/**
 * @author arck[myluluy@gmail.com]
 * @date 20141113
 * @fileoverview selection for iwo
 */
iwo.register('mods/selection', ['mods/range/base', 'mods/range/range'], function(require) {

  function Selection(doc) {
    this.doc = doc || document;
  }

  var prop = Selection.prototype;
  prop.getRange = function() {};
  prop.setRange = function(range) {

  };
  prop.addRange = function() {

  };

  return selection;
});
