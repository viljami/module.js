# Modules made simple

Manages your modules, gets dependencies right and initialises after page load.

## Benefits

 * manage dependencies - no matter which order your JavaScript files are loaded the dependencies load in correct order
 * scope - avoid your modules being part or window object

## Usage

   module('app', ['customInput'], function(customInput){ ... });
   module('customInput', function(){ ... });

# Copyright

MIT
