'use strict';

;window.module = (function(window, undefined){
  var queue = {};
  var isWindowLoaded = false;

  var loader = function (name, dependencies, fn){
    queue[name].result = fn.apply(undefined, dependencies && 
      dependencies.map(function (s){
        if (! queue[s]) throw new Error('module not defined: ' + s);
        if (queue[s].loaded) return queue[s].result;
        return loader(s, queue[s].deps, queue[s].fn);
      }));
    // Allow modules to return undefined.
    queue[name].loaded = true;
    return queue[name].result;
  };

  // Init modules.
  window.addEventListener('load', function (){
    setTimeout(function (){ // defer ensures all module calls have happened
      isWindowLoaded = true;
      Object.keys(queue).forEach(function(name){
        if (! queue[name].loaded) loader(name, queue[name].deps, queue[name].fn);
      });
    }, 10);
  });

  return function (moduleName, dependencies, fn){
    var result;
    if (arguments.length === 1) return queue[moduleName].result;
    if (! fn){
      fn = dependencies;
      dependencies = undefined;
      result = fn();
    }

    queue[moduleName] = {
      fn: fn,
      deps: dependencies,
      result: result,
      loaded: !! result
    };

    // Load module and return it initialised if module called after page load.
    if (isWindowLoaded && ! result) return loader(moduleName, dependencies, fn);
  };
})(window);
