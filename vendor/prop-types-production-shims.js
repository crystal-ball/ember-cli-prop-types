// Production Shims:
// Shims for the validators are required until some totally rad soul writes a Babel
// plugin to strip out `propTypes` declarations and `prop-types` import statements.

// Update process:
// Use the prop-types library shims: https://github.com/facebook/prop-types/blob/master/factoryWithThrowingShims.js
// Copy shims into rollup as an ES6 module and bundle to an AMD named module of prop-types

// IMPORTANT!
// Do not update the imported `prop-types` package without checking that the production
// shims here match that version!
define('prop-types', function () { 'use strict';

  function shim() {}
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = function() {};
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;

});
