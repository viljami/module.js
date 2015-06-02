/* globals window */

'use strict';

;window.module = (function(window, undefined){
  var queue = {};
  var rootScope = {};
  var loaded = false;

  window.addEventListener('load', function(){
    setTimeout(function(){
      loaded = true;
      Object.keys(queue)
      .forEach(function(name){
        if (queue[name].result) return;
        loader(name, queue[name].deps, queue[name].fn);
      });
    }, 10);
  });

  return function(moduleName, dependencies, fn){
    if (arguments.length === 1) return queue[moduleName].result;
    var result, moduleLoaded = false;
    if (! fn){
      fn = dependencies;
      dependencies = undefined;
      result = fn();
      moduleLoaded = true;
    }

    queue[moduleName] = {
      fn: fn,
      deps: dependencies,
      result: result,
      loaded: moduleLoaded
    };

    if (loaded && ! moduleLoaded) return loader(moduleName, dependencies, fn)
  };

  function loader (name, dependencies, fn){
    queue[name].result = fn.apply(
      rootScope,
      dependencies && dependencies.map(function(s){
        if (! queue[s]) throw new Error('module not defined: ' + s);
        if (queue[s].loaded) return queue[s].result;
        return loader(s, queue[s].deps, queue[s].fn);
      }));

    queue[name].loaded = true;
    return queue[name].result;
  }
})(window);
