/**
 * @author myluluy@gmail.com
 * @date 20141113
 * @fileoverview range  for iwo
 */
iwo.register('mods/range/base', [], function(require) {
  function Range(doc) {

    /*
     *  @property range.startContainer, range.endContainer,
     *
     * */
    this.sc = this.ec = null;


    /*
     *  @property range.startContainer, range.endContainer,
     *
     * */
    this.so = this.eo = null;


    /*
     *  @property iframe document
     *
     * */
    this.doc = doc || document;

    this.collapsed = null;
  
  }



  Range.prototype = {

    /*
     *  constructor
     * */
    constructor: Range,

    setSc: function(container, offset) {},

    setEc: function(container, offset) {},

    setScAfter: function(container) {},

    setEcAfter: function(container) {},

    setScBefore: function(container) {},

    setEcBefore: function(container) {}

  }

  return Range;

});
