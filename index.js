/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-prop-types',

  /**
   * Options for configuring addon. All default options should be specified here.
   * These defaults are assigned to the consuming app's specified options in the
   * `included` hook.
   * @property emberCliPropTypesOptions
   * @type {Object}
   */
  emberCliPropTypesOptions: {
    stripCode: true
  },

  /**
   * Set correct references to consuming application by crawling tree.
   * Call to import dependecies.
   *
   * Shims the prop-types npm module right into your app so you can `import`
   * it and use it like a bawse.
   * @method included
   * @param {Object} app Parent app or addon
   * @return {Object} Parent application
   */
  included(app) {
    this._super.included.apply(this, arguments);
    const vendor = this.treePaths.vendor;

    // Set up Addon Configuration, Merge With App Configuration
    // -------------------------------------------------------------------------

    // Validate consuming app options objects exist
    app.options = app.options || {};
    app.options.emberCliPropTypes = app.options.emberCliPropTypes || {};
    app.options.minifyJS = app.options.minifyJS || {};

    // Collect addon variables and references
    const env = process.env.EMBER_ENV || 'development';
    // This is the config specified in consuming application's config/environment.js
    const applicationConfig = this.project.config(env);
    // Create Radical options using specified and default options
    const emberCliPropTypesOptions = Object.assign(
      this.emberCliPropTypesOptions,
      app.options.emberCliPropTypes
    );

    const featureFlags = Object.assign(
      {
        DEVELOPMENT: env === 'development',
        PRODUCTION: env === 'production',
        TEST: env === 'test'
      },
      applicationConfig.featureFlags || {}
    );

    const minifyJSOptions = {
      options: {
        enabled: true, // If you want to remove unreachable code, uglify must be enabled
        compress: {
          global_defs: featureFlags,
          dead_code: true
        }
      }
    };

    this.featureFlags = featureFlags;
    this.emberCliPropTypesOptions = emberCliPropTypesOptions;
    this.env = env;

    // Update Consuming App
    // ---------------------------------------------------------------------------

    // If consumer wants to strip unreachable code, merge UglifyJS options into
    // consuming app configuration. NOTE that even if this is enabled we ONLY
    // want to do it for production builds b/c it will crush the dev rebuild time
    if (emberCliPropTypesOptions.stripCode && env === 'production') {
      app.options.minifyJS = Object.assign(app.options.minifyJS, minifyJSOptions);
    }

    // Import Assets and Node Moduel Shim
    // -------------------------------------------------------------------------

    // Import prop-types
    app.import(`${vendor}/prop-types/prop-types.js`);

    // Super important magic
    app.import(`${vendor}/prop-types-shim.js`, {
      exports: {
        PropTypes: ['default']
      }
    });

    // Yay we did it
    return app;
  },
  /**
   * Addon treeFor[*] hook to merge prop-types into vendor tree. CLI will bundle
   * the asset into the build from there.
   * @method treeForVendor
   * @param {Array} vendorTree Broccoli tree of vendor file probably
   * @return {Array} Whatever mergeTrees returns
   */
  treeForVendor(vendorTree) {
    const trees = [];
    let propTypesPath = path.dirname(require.resolve('prop-types')); // waow

    // Pull in existing vendor tree
    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(new Funnel(propTypesPath, {
      destDir: 'prop-types',
      include: [new RegExp(/\.js$/)]
    }));

    return mergeTrees(trees);
  }
};
