/*
 * @file : attribute.js
 * @author : arck[myluluy@gmail.com]
 * @date : 2015.01.21
 * @version : 1.0.0
 *
 * */

iwo.define('mods/domengine/attribute', ['mods/utils', 'mods/dtd'], function(require) {

  var Attribute = function(name) {
    this.nodeType = this.ATTRIBUTE_NODE;
    this.value = null;
    this.nodeName = name;
    this.name = name;
    this.ownerElement = null;

    if (typeof name === 'string') {
      this.lowerCaseName = name.toLowerCase();
      this.upperCaseName = name.toUpperCase();
    }

  };
  proto = Attribute.prototype;

  return Attribute;
});
