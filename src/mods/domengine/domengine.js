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
    textnode = 'mods/domengine/textnode',
    doc = 'mods/domengine/document';
var deps = ['mods/utils', 'mods/dtd', attribute, comment, documentfragment, element, textnode, doc];
iwo.define('mods/domengine/domengine', deps, function(require) {
    var dtd = require('mods/dtd');
    var typeList = {
            Attribute: require(attribute),

            Comment: require(comment),

            DocumentFragment: require(documentfragment),

            Element: require(element),

            TextNode: require(textnode)
        },


        Document = require(doc);

    var proto = Document.prototype;

    for (var t in typeList) {
        var type = typeList[t];
        (function(t) {
            proto['create' + t] = function(param) {
                return new Mod(this, t, param);
            }
        })(t)

    }

    function Mod(doc, typeName, param) {
        var node = new typeList[typeName](param);
        node.nodeType = {
            'Attribute': doc.ATTRIBUTE_NODE,
            'Comment': doc.COMMENT_NODE,
            'DocumentFragment': doc.DOCUMENT_FRAGMENT_NODE,
            'Element': doc.ELEMENT_NODE,
            'TextNode': doc.TEXT_NODE
        }[typeName];


        if (node.nodeType != doc.TEXT_NODE) {
            node.data = param;
        } else {
            node.parentNode = node.nextSibling = node.previousSibling = node.firstChild = node.lastChild = null;

            node.nextBlockSibling = null;

            node.previousBlockSibling = null;
        }

        return node;
    }

    return new Document();
});
