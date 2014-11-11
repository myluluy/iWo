iWo
===

iWoEditor is a WYSIWYG editor like MediumEditor,the editor core is simple and extensible.

You can very easy to write plugin for iWoEditor,we also provide many basic plugins for it.

It supported IE6-11 and Chrome,Firefox,Safari latest version.

## Usage

```html
<script src="iwo.core.min.js"></script>
<div id="editor"></div>
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

[Methods](docs/methods.md),[Attribute](docs/attribues.md),[Events](docs/events.md)

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
