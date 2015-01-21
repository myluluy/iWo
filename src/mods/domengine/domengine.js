/*
 * @file : DomEngine.js
 * @author : arck[myluluy@gmail.com]
 * @date : 2015.01.20
 * version : 1.0.0
 *
 * */


/**
 *
 * DOM是静态属性与方法的命名空间
 **/
iwo.register('domengine', ['mods/utils'],function(require) {
  var DOM = {
      /*
       *  Object
       *  Number:1
       * */

      //'document': document,

      /*
       * Methods
       * Number : 5
       * */

      createAttribute: function(name) {
        var attr = new Attribute(name);
        return attr;
      },

      createComment: function() {},

      createDocumentFragment: function() {},

      createElement: function(name) {
        var elem = new Element(name);
        return elem;
      },

      createTextNode: function() {},

    },


    Document = function() {

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


  var Attribute = function(name) {
      this.nodeType = this.ATTRIBUTE_NODE;
      this.value = null;
      this.nodeName = name;
      this.name = name;
      this.ownerElement = null

      if (typeof name === 'string') {
        this.lowerCaseName = name.toLowerCase();
        this.upperCaseName = name.toUpperCase();
      }

    },

    Comment = function(str) {},

    DocumentFragment = function() {},

    Element = function(name) {
      this.isBlock = false;
      this.isInline = true;
      this.isCustom = false;
      this.tagName = name;
      this.nodeType = this.ELEMENT_NODE;
      var attributes = [],
        property = [];

    },

    TextNode = function(str) {},

    attributeProto = Attribute.prototype = new Document,
    commentProto = Comment.prototype = new Document,
    documentFragmentProto = DocumentFragment.prototype = new Document,
    elementProto = Element.prototype = new Document,
    textNodeProto = TextNode.prototype = new Document;



  //window.DOM = DOM


  //test
  var div = DOM.createElement('div');
  console.info(div);
})
