/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-prop-types',

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
