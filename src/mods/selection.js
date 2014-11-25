/**
 * @author arck[myluluy@gmail.com]
 * @date 20141113
 * @fileoverview selection for iwo
 */
iwo.register('mods/selection', ['mods/range/base', 'mods/range/range', 'mods/event'], function(require) {
  var Range = require('mods/range/range'),
    Event = require('mods/event');

  function Selection(doc, body) {
    this.doc = doc || document;

    this.body = body || doc.body;

    this.range = new Range(doc);

    this.history = [];

    this.event = new Event();


  }

  Selection.MAX_HISTORY_LENGTH = 10;

  var prop = Selection.prototype;

  prop.updateRange = function() {
    var nativeSelection = win.getSelection(),
      nativeRange, rangeCount = nativeSelection.rangeCount;
    if (rangeCount === 0) { //TODO:move range to body
      return null;
    }


    this.saveRange();

    nativeRange = nativeSelection.getRangeAt(0);
    this.range.setSc(nativeRange.startContainer, nativeRange.startOffset);

    if (nativeRange.collapsed) {
      this.range.collapse(true);
    } else {
      nativeRange = rangeCount === 1 ? nativeRange : nativeSelection.getRangeAt(rangeCount - 1);
      this.range.setEc(nativeRange.endContainer, nativeRange.endOffset);
    }

  };

  prop.saveRange = function() {
    this.history.push(this.range.cloneRange());
    if (Selection.MAX_HISTORY_LENGTH < this.history.length) {
      this.history.shift();
    }
  };

  prop.getLastRange = function() {
    var len = this.history.length;
    return len === 0 ? null : this.history[len - 1];
  };

  prop.select = function() {
    var win = this.getWin(),
      body = this.body,
      range = this.range,
      nativeSelection, nativeRange;

    try {
      body.focus();
    } catch (e) {
      win.focus();
    }

    nativeSelection = win.getSelection();
    nativeSelection.removeAllRanges();
    nativeRange = this.doc.createRange();
    nativeRange.setStart(range.sc, range.so);
    nativeRange.setEnd(range.ec, range.eo);
    nativeSelection.addRange(nativeRange);
    return this;
  };

  prop.getWin = function() {
    return this.doc.defaultView || this.doc.parentWindow;
  };

  prop.addRange = function() {

  };
  
  function listenForSelectionChange() { //TODO
    var listeners = 'keyup,mouseup,touchend';
  }

  return selection;
});
