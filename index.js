'use strict';
const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-prop-types',

  /**
   * By default we strip out the call to check prop types in prod builds
   */
  addonOptions: {
    compress: true,
    getDefaultProps: true
  },

  /**
   * Import prop-types package from /vendor (See treeForVendor for package Funnel
   * details). Configure UglifyJS for prod builds.
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

    // Check for configurations specified by consuming app and fall back to addon
    // defaults using Object.assign
    app.options = app.options || {};
    app.options.emberCliPropTypes = app.options.emberCliPropTypes || {};
    let addonOptions = Object.assign(this.addonOptions, app.options.emberCliPropTypes)
    this.addonOptions = addonOptions;

    // In production strip out features that are disabled
    if (this.env === 'production' && addonOptions.compress) {
      app.options.minifyJS = app.options.minifyJS || {};
      app.options.minifyJS.options = app.options.minifyJS.options || {};
      let minifyOpts = app.options.minifyJS.options;

      minifyOpts.enabled = true; // If you want to remove unreachable code, uglify must be enabled
      minifyOpts.compress = minifyOpts.compress || {};
      minifyOpts.compress.dead_code = true; // Prunes dead code
      minifyOpts.compress.global_defs = minifyOpts.compress.global_defs || {};
      minifyOpts.compress.global_defs['process.env.NODE_ENV'] = this.env;
      minifyOpts.compress.global_defs['process.env.INCLUDE_GET_DEFAULT_PROPS'] = addonOptions.getDefaultProps;
    }

    // Import the prop-types library only in dev builds. In prod builds import the
    // prod shims so import statements don't throw
    if (this.env === 'development') {
      app.import(`${vendor}/prop-types/prop-types.js`, {
        using: [
          { transformation: 'amd', as: 'prop-types' }
        ]
      });
    } else {
      app.import(`${vendor}/prop-types-production-shims.js`);
    }

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
    if (this.env !== 'development') { return vendorTree; }

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
   * In non-production builds (or always if code stripping has been disabled) the
   * global `process` is not defined by UglifyJS, prevent this from throwing an error
   * by attaching it as a global to the window.
   * @method contentFor
   * @param {string} type The outlet for the injected content
   * @returns {string} Content to inject into the outlet
   */
  contentFor(type) {
    if (
      (this.env === 'development' || this.addonOptions.compress === false)
      && type === 'head'
    ) {
      return `<script>window.process = { env: { NODE_ENV: "development", INCLUDE_GET_DEFAULT_PROPS: ${this.addonOptions.getDefaultProps} } };</script>`;
    }
  }
};
