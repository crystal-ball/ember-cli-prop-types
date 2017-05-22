import Component from 'ember-component';
import { checkPropTypes } from 'prop-types';

/**
 * Reopen the Component class and add props validation checking the `didReceiveAttrs`
 * hook with `checkPropTypes` utility method exported by `prop-types`.
 */
function initialize() {
  // Strip out the props validation in production environments
  if (process.env.NODE_ENV === 'development') {
    Component.reopen({
      didReceiveAttrs() {
        this._super(...arguments);

        const propTypes = this.get('propTypes') || {};

        // prop-types can handle calling `checkPropTypes` without any props, always call
        checkPropTypes(
          propTypes, // PropTypes definition
          this.getProperties(...Object.keys(propTypes)), // Values to validate
          'prop', // Type of validation that is occuring
          this.toString() // Name of component for better debug messaging
        );
      }
    });
  }
}

export default {
  name: 'component-prop-types',
  initialize
};
