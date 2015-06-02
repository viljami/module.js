'use strict';

;window.module = (function(window, undefined){
  var queue = {};
  var isWindowLoaded = false;

  var loader = function (name, dependencies, fn){
    queue[name].result = fn.apply(
      undefined,
      dependencies && dependencies.map(function (s){
        if (! queue[s]) throw new Error('module not defined: ' + s);
        if (queue[s].loaded) return queue[s].result;
        return loader(s, queue[s].deps, queue[s].fn);
      }));

    queue[name].loaded = true;
    return queue[name].result;
  };

  // init modules
  window.addEventListener('load', function (){
    setTimeout(function (){ // defer
      isWindowLoaded = true;
      Object.keys(queue)
      .forEach(function(name){
        if (queue[name].result) return;
        loader(name, queue[name].deps, queue[name].fn);
      });
    }, 10);
  });

  return function (moduleName, dependencies, fn){
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

    if (isWindowLoaded && ! moduleLoaded) return loader(moduleName, dependencies, fn);
  };
})(window);
