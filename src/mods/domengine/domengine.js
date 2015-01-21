/*
 * @file : domengine.js
 * @author : arck[myluluy@gmail.com]
 * @date : 2015.01.20
 * @version : 1.0.0
 *
 * */

var attribute = 'mods/domengine/attribute',
  comment = 'mods/domengine/comment',
  documentfragment = 'mods/domengine/documentfragment',
  element = 'mods/domengine/element',
  textnode = 'mods/domengine/textnode';
  var deps = ['mods/utils', 'mods/dtd', attribute, comment, documentfragment, element, textnode];
iwo.define('mods/domengine/domengine',deps , function(require) {
  var Attribute = require(attribute),

    Comment = require(comment),

    DocumentFragment = require(documentfragment),

    Element = require(element),

    Textnode = require(textnode);


  var dom = {

    createAttribute: function(name) {
      return new Attribute(name);
    },

    createComment: function(string) {
      return new Comment(string);
    },

    createDocumentFragment: function() {
      return new DocumentFragment();
    },

    createElement: function(name) {
      return new Element(name);
    },

    createTextNode: function(text) {
      return new Textnode(text);
    },

    parseDom: function(HTMLString) {

    }

  };

  return dom;
});
