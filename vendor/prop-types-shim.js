/**
 * Defines a quick AMD module that allows us to `import PropTypes from 'prop-types'`
 * directly in Components.
 */
define('prop-types', [], function() {
  'use strict';

  // Grab all of the exported items from the module
  const exportKeys = Object.keys(PropTypes);
  let exports = {
    'default': PropTypes
  };

  exportKeys.forEach(key => {
    if (key !== 'PropTypes') {
      exports[key] = PropTypes[key];
    }
  });

  return exports;
});