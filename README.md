# Modules made simple

Manage your modules and get dependencies right.

## Benefits

 * manage dependencies - no matter which order your JavaScript files are loaded the dependencies load in correct order
 * scope - avoid your modules being part or window object

## Usage

   module('app', ['customInput'], function(customInput){ ... });
   module('customInput', function(){ ... });

# Copyright

MIT
