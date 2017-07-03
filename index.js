'use strict';
const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-prop-types',

  /**
   * By default we include the `getDefaultProps` method in component reopen, but it
   * can be configured off.
   */
  addonOptions: {
    getDefaultProps: true
  },
  /**
   * Import prop-types package from /vendor (See treeForVendor for package Funnel
   * details). Configure environment constants injection.
   * @method included
   * @param {Object} app Parent app or addon
   * @return {Object} Parent application
   */
  included(app) {
    this._super.included.apply(this, arguments);
    const vendor = this.treePaths.vendor;
    this.env = process.env.EMBER_ENV || 'development';

    // Find the parent app by crawling addon tree
    while (typeof app.import !== 'function' && app.app) { app = app.app; }

    // Check for configurations specified by consuming app and fall back to addon
    // defaults using Object.assign
    app.options = app.options || {};
    app.options.emberCliPropTypes = app.options.emberCliPropTypes || {};
    this.addonOptions = Object.assign(this.addonOptions, app.options.emberCliPropTypes);

    // Configure Babel plugin to replace env constant flags with literal values
    this.options = this.options || {};
    this.options.babel = this.options.babel || {};
    this.options.babel.plugins = this.options.babel.plugins || [];
    this.options.babel.plugins.push(
      ['inline-replace-variables', {
        NODE_ENV: this.env,
        INCLUDE_GET_DEFAULT_PROPS: this.addonOptions.getDefaultProps
      }
    ]);

    // Import the prop-types library only in dev builds. In prod builds import the
    // prod shims so import statements don't throw
    if (this.env !== 'production') {
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
   * The `prop-types` package must be pulled into the /vendor directory or CLI will
   * fail to app.import it. Use a Funnel to move package from node_modules to /vendor
   * @method treeForVendor
   * @param {Array} vendorTree Broccoli vendor tree
   * @return {Array} Broccoli vendor tree
   */
  treeForVendor(vendorTree) {
    if (this.env === 'production') { return vendorTree; }

    const tree = [];
    if (vendorTree) { tree.push(vendorTree); }

    // require.resolve always returns the correct path to the prop-types node_module
    tree.push(new Funnel(path.dirname(require.resolve('prop-types')), {
      destDir: 'prop-types',
      include: [new RegExp(/\.js$/)]
    }));

    return mergeTrees(tree);
  }
};
