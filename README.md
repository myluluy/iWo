iWo
===

iWoEditor is a WYSIWYG editor like MediumEditor,the editor core is simple and extensible.

You can very easy to write plugin for iWoEditor,we also provide many basic plugins for it.

It supported IE6-11 and Chrome,Firefox,Safari latest version.

## Usage

```html
<script src="iwo.core.min.js"></script>
```

```javascript
var editorDiv = document.getElementById('editor');
var configs = {
  themePath:'path/to/themePath',
  theme:'default',
  pluginPath:'path/to/plugins',
  plugins:iwo.base
  //plugins:'bold,italic,underline,justify,color,link,toolbar,image,video,music,http://my.domain/path/to/someplugin.js'
};
var iwoEditor = new iwo(editorDiv,configs);
```

## Api

### Iwo Methods
----

##### iwo.help
##### iwo.getHtml
##### iwo.setHtml
##### iwo.getText
##### iwo.setText
##### iwo.getCursor
##### iwo.setCursor
##### iwo.addSelect
##### iwo.getSelectedHtml
##### iwo.setSelectedHtml
##### iwo.focus
##### iwo.blur
##### iwo.sync
##### iwo.reset
##### iwo.$
##### iwo.bindEvent
##### iwo.removeEvent
##### iwo.onecEvent
##### iwo.on
##### iwo.off
##### iwo.trigger
##### iwo.get
##### iwo.set
##### iwo.getPlugin
##### iwo.setPlugin
##### iwo.render
##### iwo.destory
##### iwo.extend
##### iwo.execCommand
##### iwo.hasCommand
##### iwo.addStyle
##### iwo.removeStyle
##### iwo.addLink
##### iwo.removeLink
##### iwo.insertHtml
##### iwo.insertNode
##### iwo.removeNode
##### iwo.hide
##### iwo.show
##### iwo.disabled
##### iwo.history

### Iwo Attribute
----

##### iwo.themePath
##### iwo.theme
##### iwo.pluginPath
##### iwo.plugins
##### iwo.base
##### iwo.version
##### iwo.content
##### iwo.focused
##### iwo.width
##### iwo.disabled
##### iwo.el
##### iwo.parent
##### iwo.extra

### Iwo Event
----

##### before:Method|attr
##### after:Medthod|attr
##### ready
##### selectChange
##### contentChange
##### show
##### hide
##### destory
##### render
##### focus
##### blur
##### pluginInit
##### pluginBefore
##### pluginAfter
##### paset

## Contributors

```
liulyliu
xiaojue
```

## License

WTFPL

      DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2014 iWo <https://github.com/liulyliu/iWo>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
