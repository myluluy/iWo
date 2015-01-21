/*
 * @file : comment.js
 * @author : arck[myluluy@gmail.com]
 * @date : 2015.01.21
 * @version : 1.0.0
 *
 * */

iwo.define('mods/domengine/comment', ['mods/domengine/document', 'mods/utils', 'mods/dtd'], function(require) {
  var Document = require('mods/domengine/document');

  var Comment = function(name) {

  };
  Comment.prototype = new Document();
  proto = Comment.prototype;

  return Comment;
});
