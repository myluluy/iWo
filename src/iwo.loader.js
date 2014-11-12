/**
 * @author xiaojue[designsor@gmail.com]
 * @date 20141112
 * @fileoverview core for iwo,a easy module control
 */
(function(win, doc, undef) {

  var cache = {},

  loadings = {},
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

  var utils = {
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
    loadDeps: function() {
      for (var id in loadings)(loadings[id] === 0) && utils.loadMod(id);
    },
    loadScript: function(path, cb) {
      var script = doc.createElement('script'),
      parent = doc.getElementsByTagName('head')[0];
      script.onload = script.onreadystatechange = script.onerror = function() {
        if (/loaded|complete|undefined/.test(script.readyState)) {
          script.onload = script.onerror = script.onreadystatechange = null;
          script.parentNode.removeChild(script);
          script = undef;
          cb && cb();
        }
      };
      script.src = basepath + path + '.js';
      parent.appendChild(script);
    },
    loadMod: function(id) {
      loadings[id] = 1;
      utils.loadScript(id, function() {
        loadings[id] = 2;
        if (utils.checkLoading()) {
          while (queue.length) {
            queue.shift().compile();
          }
        } else {
          utils.loadDeps();
        }
      });
    },
    run: function(path) {
      var mod = cache[path];
      queue.push(mod);
      utils.loadDeps();
    },
    register: function(path, deps, factory) {
      new Module(path, deps, factory);
    }
  };

  Module.prototype = {
    constructor: Module,
    compile: function() {
      return this.factory(utils._r);
    }
  };

  win.iwo = {
    version: '0.0.1',
    core: 'iwo.core',
    run: utils.run,
    register: utils.register
  };

  utils.loadScript(iwo.core, function() {
    iwo.run(iwo.core);
  });

})(window, document);
