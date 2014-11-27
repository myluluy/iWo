/**
 * @author arck[myluluy@gmail.com]
 * @date 20141113
 * @fileoverview selection for iwo
 */
iwo.register('mods/selection', ['mods/base', 'mods/range/range'], function(require) {

  var Range = require('mods/range/range'),
  Base = require('mods/base');

  var Selection = Base.create({
    initialize: function(doc, body) {
      this.doc = doc || document;

      this.body = body || doc.body;

      this.range = new Range(doc);

      this.history = [];

      this.set('MAX_HISTORY_LENGTH', 10, {
        readOnly: true
      });
    },
    updateRange: function() {
      var nativeSelection = this.getWin().getSelection(),
      nativeRange,
      rangeCount = nativeSelection.rangeCount;
      //if (rangeCount === 0) { //TODO:move range to body
      //  return null;
      //}
      this.saveRange();

      nativeRange = nativeSelection.getRangeAt(0);
      this.range.setSc(nativeRange.startContainer, nativeRange.startOffset);

      if (nativeRange.collapsed) {
        this.range.collapse(true);
      } else {
        nativeRange = rangeCount === 1 ? nativeRange: nativeSelection.getRangeAt(rangeCount - 1);
        this.range.setEc(nativeRange.endContainer, nativeRange.endOffset);
      }

    },
    saveRange: function() {
      this.history.push(this.range.cloneRange());
      if (this.get('MAX_HISTORY_LENGTH') < this.history.length) {
        this.history.shift();
      }
    },
    getLastRange: function() {
      var len = this.history.length;
      return len === 0 ? null: this.history[len - 1];
    },
    select: function() {
      var win = this.getWin(),
      body = this.body,
      range = this.range,
      nativeSelection,
      nativeRange;

      try {
        body.focus();
      } catch(e) {
        win.focus();
      }

      nativeSelection = win.getSelection();
      nativeSelection.removeAllRanges();
      nativeRange = this.doc.createRange();
      nativeRange.setStart(range.sc, range.so);
      nativeRange.setEnd(range.ec, range.eo);
      nativeSelection.addRange(nativeRange);
      return this;
    },
    getWin: function() {
      return this.doc.defaultView || this.doc.parentWindow;
    },
    addRange: function() {

    }
  });

  function listenForSelectionChange() { //TODO
    var listeners = 'keyup,mouseup,touchend';
  }

  return selection;
});

