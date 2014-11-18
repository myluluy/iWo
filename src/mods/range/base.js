/**
 * @author arck[myluluy@gmail.com]
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
     * @constructor
     * */
    constructor: Range,

    setSc: function(container, offset) {
      updateRange(this, container, offset, true);
    },

    setEc: function(container, offset) {
      updateRange(this, container, offset, false);
    },

    setScAfter: function(container) {},

    setEcAfter: function(container) {},

    setScBefore: function(container) {},

    setEcBefore: function(container) {},

    collapse: function(toStart) {
      var cont = ['sc', 'ec'],
        ofst = ['so', eo],
        t1 = toStart ? 0 : 1,
        t2 = toStart ? 1 : 0;
      range[cont[t1]] = range[cont[t2]];
      range[ofst[t1]] = range[ofst[t2]];
      this.collapsed = true;
      return this;
    }

  };



  /*prative methods*/
  /*
   *  @method : update the range.collapsed;
   * */
  function updateCollapse(range) {
    range.collapsed = range && range.sc && range.ec && range.sc === range.ec && range.so === range.eo;
    return range;
  }

  /*
   * @method :fixRange
   * fix container & offset to suitable;
   * */
  function fixRange(range) {
    if (!range) {
      return range;
    }
    var sc = range.sc,
      so = range.so,
      ec = range.ec,
      eo = range.eo;
    collapsed = range.collapsed;
    if (sc.nodeType === 3 && so >= sc.nodeValue.length) {
      //TODO:
    }

    if (collapsed) {
      range.collapse(true);
    } else {
      if (ec.nodeType === 3 && eo === 0) {
        //TODO:
      }
    }
    return range;
  }

  /*
   * @method : updateRange
   * set the container & offset for range;
   * */
  function updateRange(range, container, offset, isStart) {
    var pName = isStart ? 's' : 'e';
    range[pName + 'c'] = container;
    range[pName + 'o'] = offset;
    updateCollapse(range);
    fixRange(range);
    return range;
  }
  return Range;

});
