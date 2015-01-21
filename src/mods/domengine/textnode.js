/*
 * @file : textnode.js
 * @author : arck[myluluy@gmail.com]
 * @date : 2015.01.21
 * @version : 1.0.0
 *
 * */

iwo.define('mods/domengine/textnode', ['mods/domengine/document', 'mods/utils', 'mods/dtd'], function(require) {
  var Document = require('mods/domengine/document');

  var Textnode = function(name) {

  };
  Textnode.prototype = new Document();
  proto = Textnode.prototype;

  return Textnode;
});
