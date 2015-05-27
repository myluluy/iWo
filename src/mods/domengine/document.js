/*
 * @file : document.js
 * @author : arck[myluluy@gmail.com]
 * @date : 2015.01.21
 * @version : 1.0.0
 *
 * */

iwo.define('mods/domengine/document', [], function(require) {
  var Document = function() {
  
  };


  Document.prototype = {

    contructor: Document,

    ELEMENT_NODE: 1,

    ATTRIBUTE_NODE: 2,

    TEXT_NODE: 3,

    CDATA_SECTION_NODE: 4,

    ENTITY_REFERENCE_NODE: 5,

    ENTITY_NODE: 6,

    PROCESSING_INSTRUCTION_NODE: 7,

    COMMENT_NODE: 8,

    DOCUMENT_NODE: 9,

    DOCUMENT_TYPE_NODE: 10,

    DOCUMENT_FRAGMENT_NODE: 11,

    NOTATION_NODE: 12

  };

  return Document;
});
