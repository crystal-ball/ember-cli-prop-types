'use strict';
const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-prop-types',

  defaultOptions: {
    compress: true
  },

  /**
   * Import prop-types package from /vendor. See treeForVendor for package Funnel
   * details.
   * @method included
   * @param {Object} app Parent app or addon
   * @return {Object} Parent application
   */
  included(app) {
    this._super.included.apply(this, arguments);
    const vendor = this.treePaths.vendor;
    this.env = process.env.EMBER_ENV || 'development';

    // Find the parent app by crawling addon tree
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    app.options = app.options || {};
    app.options.emberCliPropTypes = app.options.emberCliPropTypes || {};
    const options = Object.assign(this.defaultOptions, app.options.emberCliPropTypes);

    // In production strip out addon props validation unless configured not to
    if (this.env === 'production' && options.compress) {
      app.options.minifyJS = Object.assign(app.options.minifyJS, {
        options: {
          enabled: true, // If you want to remove unreachable code, uglify must be enabled
          compress: {
            dead_code: true,
            global_defs: {
              'process.env.NODE_ENV': this.env
            }
          }
        }
      });
    }

    // prop-types has a stripped down production build that is only 3kb and doesn't
    // perform actual validations, import .min in prod builds
    app.import(`${vendor}/prop-types/prop-types${this.env === 'production' ? '.min' : ''}.js`, {
        using: [
          { transformation: 'amd', as: 'prop-types' }
        ]
      });

    return app;
  },
  /**
   * Package must be pulled into the /vendor directory or CLI will fail to app.import
   * it. Use a Funnel to move package from node_modules to /vendor
   * @method treeForVendor
   * @param {Array} vendorTree Broccoli vendor tree
   * @return {Array} Broccoli vendor tree
   */
  treeForVendor(vendorTree) {
    const tree = [];
    if (vendorTree) { tree.push(vendorTree); }

    // require.resolve always returns the correct path to the prop-types node_module
    tree.push(new Funnel(path.dirname(require.resolve('prop-types')), {
      destDir: 'prop-types',
      include: [new RegExp(/\.js$/)]
    }));

    return mergeTrees(tree);
  },
  /**
   * In non-production builds the global `process` is not defined by UglifyJS, prevent
   * this from throwing an error by attaching it as a global to the window.
   * @method contentFor
   * @param {string} type The outlet for the injected content
   * @returns {string} Content to inject into the outlet
   */
  contentFor(type) {
    if (this.env === 'development' && type === 'head') {
      return '<script>window.process = { env: { NODE_ENV: "development" } };</script>';
    }
  }
};
