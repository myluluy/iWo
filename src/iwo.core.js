/**
 * @author xiaojue[designsor@gmail.com]
 * @date 20141112
 * @fileoverview core for iwo,a easy module control
 */
(function(win, doc, undef) {

  var cache = {},
  loadings = {},
  //0,1,2|init,loading,success
  queue = [],
  scripts = doc.getElementsByTagName('script'),
  root = scripts[scripts.length - 1].src,
  basepath = root.slice(0, root.lastIndexOf('/') + 1);

  function Module(path, deps, factory) {
    this.id = path;
    this.deps = deps;
    for (var i = 0; i < deps.length; i++) {
      var id = deps[i];
      if (!loadings[id]) loadings[id] = 0;
    }
    this.factory = factory;
    cache[path] = this;
  }

  Module.prototype = {
    loadDeps: function() {
      for (var id in loadings) {
        if (loadings[id] === 0) this.loadScript(id);
      }
    },
    _r: function(id) {
      var mod = cache[id];
      return mod.exports || (mod.exports = mod.compile());
    },
    checkLoading: function() {
      for (var i in loadings) {
        if (loadings[i] < 2) return false;
      }
      return true;
    },
    loadScript: function(id) {
      var self = this,
      script = doc.createElement('script'),
      parent = doc.getElementsByTagName('head')[0];
      loadings[id] = 1;
      script.onload = script.onreadystatechange = script.onerror = function() {
        if (/loaded|complete|undefined/.test(script.readyState)) {
          script.onload = script.onerror = script.onreadystatechange = null;
          //script.parentNode.removeChild(script);
          script = undef;
          loadings[id] = 2;
          if (self.checkLoading()) self.compile();
          else self.loadDeps();
        }
      };
      script.src = basepath + id + '.js';
      parent.appendChild(script);
    },
    compile: function() {
      return this.factory(this._r);
    }
  };

  var loader = {
    _register: function(path, deps, factory) {
      new Module(path, deps, factory);
    },
    _run: function(path) {
      var mod = cache[path];
      mod.loadDeps();
    }
  };

  win.loader = loader;

})(window, document);

loader._register('iwo.core', ['mods/help'], function(require) {
  var help = require('mods/help');
  console.log(help);
});

loader._register('iwo.a', ['mods/utils'], function(require) {
  var help = require('mods/utils');
  console.log(help);
});

loader._register('iwo.b', ['mods/dom'], function(require) {
  var help = require('mods/dom');
  console.log(help);
});

loader._run('iwo.core');
loader._run('iwo.core');
loader._run('iwo.a');
loader._run('iwo.b');

