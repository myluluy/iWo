/*
 * @file : documentfragment.js
 * @author : arck[myluluy@gmail.com]
 * @date : 2015.01.21
 * @version : 1.0.0
 *
 * */

iwo.define('mods/domengine/documentfragment', ['mods/domengine/document', 'mods/utils', 'mods/dtd'], function(require) {
  var Document = require('mods/domengine/document');

  var Documentfragment = function(name) {
  
  };
  Documentfragment.prototype = new Document();
  proto = Documentfragment.prototype;

  return Documentfragment;
});
