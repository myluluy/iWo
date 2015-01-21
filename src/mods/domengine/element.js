/*
 * @file : element.js
 * @author : arck[myluluy@gmail.com]
 * @date : 2015.01.21
 * @version : 1.0.0
 *
 * */

iwo.define('mods/domengine/element', ['mods/domengine/document', 'mods/utils', 'mods/dtd'], function(require) {
  var Document = require('mods/domengine/document');
  var dtd = require('mods/dtd');
  var Element = function(name) {
    this.isBlock = !!dtd.$block[name];
    this.isInline = !!dtd.$inline[name];
    this.tagName = name;
    this.nodeType = this.ELEMENT_NODE;
    this.parentNode = this.nextSibling = this.previousSibling = this.firstChild = this.lastChild = null;
    this.parentBlockNode = null;
    this.nextBlockSibling = null;
    this.previousBlockSibling = null;
    this.firstBlockChild = null;
    this.lastBLockChild = null;
    var attributes = [],
      property = [];

  };
  Element.prototype = new Document();

  proto = Element.prototype;

  proto.constructor = Element;

  proto.getAttribute = function() {};

  proto.setAttribute = function() {};

  proto.removeAttribute = function() {};

  proto.getAttributeNode = function() {};

  proto.setAttributeNode = function() {};

  proto.appendChild = function() {};

  proto.removeChild = function() {};

  proto.getElementById = function(id) {};

  proto.html = function() {};


  return Element;
});
