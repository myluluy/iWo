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

    this.nextBlockSibling = null;

    this.previousBlockSibling = null;

    this.children = [];

    var attributes = [],
      property = [];
    this.block = {
      parentNode: null
    };

  };

  Element.prototype = new Document();


  proto = Element.prototype;


  proto.constructor = Element;


  proto.getAttribute = function() {};


  proto.setAttribute = function() {};


  proto.removeAttribute = function() {};


  proto.getAttributeNode = function() {};


  proto.setAttributeNode = function() {};


  proto.prependChild = function(node) {

    if (this.parentNode && this.parentNode === node || this === node) {
      //不能append父节点或自己本身
      return null;
    }

    if (node.parentNode) {
      //更改父节点
      node.parentNode.removeChild(node);

    }

    node.parentNode = this;

    if (this.isBlock) {
      node.block.parentNode = this;
    } else {
      node.block = this.block;
    }
    var next = this.children[0];
    node.nextSibling = next;
    if (next) {
      node.nextBlockSibling = next.isBlock ? next : next.nextBlockSibling;
      next.previousSibling = node;
      next.previousBlockSibling = node.isBlock ? node : null;
    }
    node.previousSibling = node.previousBlockSibling = null;

    this.children.unshift(node);
    this.firstChild = node;
    if (this.children.length === 1) {
      this.lastChild = node;
    }
    return this;
  };

  proto.appendChild = function(node) {

    if (this.parentNode && this.parentNode === node || this === node) {
      //不能append父节点或自己本身
      return null;
    }

    if (node.parentNode) {
      //更改父节点
      node.parentNode.removeChild(node);

    }
    node.parentNode = this;


    if (this.isBlock) {
      node.block.parentNode = this;
    } else {
      node.block = this.block;
    }


    node.previousSibling = this.children[this.children.length - 1] || null;

    var prev = node.previousSibling;
    if (prev) {
      node.previousBlockSibling = prev.isBlock ? prev : prev.previousBlockSibling;
    }


    node.nextSibling = null;

    node.nextBlockSibling = null;

    if (node.previousSibling) {

      node.previousSibling.nextSibling = node;

      if (node.isBlock) {

        node.previousSibling.nextBlockSibling = node;

      }
    }

    this.children.push(node);


    if (this.children.length === 1) {

      this.firstChild = node;

    }

    this.lastChild = node;

    return this;


  };


  proto.removeChild = function(node) {

    var index = -1;

    if (this.children.indexOf) {
      //get the index
      index = this.children.indexOf(node);

    } else {
      // for IE6
      for (var i in this.children) {

        var item = this.children[i];

        if (node === item) {

          index = i;

          break;

        }
      }
    }

    if (index === -1) {

      return false;

    }




    var prev = this.children[index - 1],
      next = this.children[index + 1];



    if (prev) {
      prev.nextSibling = this.children[i + 1] || null;
      prev.nextBlockSibling = node.nextBlockSibling;
    }

    if (next) {
      next.previousSibling = this.children[i - 1] || null;
      next.previousBlockSibling = node.previousBlockSibling;
    }

    this.children.splice(index, 1);

    this.firstChild = this.children[0] || null;
    this.lastChild = this.children[this.children.length - 1] || null;
    prev = next = null;

    node.parentNode = node.nextSibling = node.nextBlockSibling = null;

    node.previousSibling = node.previousBlockSibling = null;

    node.block = {
      parentNode: null
    };
  };


  proto.getElementById = function(id) {};


  proto.html = function() {};



  return Element;

});
