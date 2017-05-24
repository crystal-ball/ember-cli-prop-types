import Component from 'ember-component';
import { checkPropTypes } from 'prop-types';

/**
 * Initializer is optimized for production using injected process.env variables.
 * These are either added to the window as globals during dev builds or injected into
 * the build using UglifyJS during production builds.
 */
function initialize() {
  let propTypesExtends = {};

  // Props validation included in dev only
  // Add props validation checking during `didReceiveAttrs` hook with
  // `checkPropTypes` utility method
  if (process.env.NODE_ENV === 'development') {
    propTypesExtends.didReceiveAttrs = function() {
      this._super(...arguments);

      const propTypes = this.get('propTypes') || {};

      // prop-types can handle calling `checkPropTypes` without any props, always call
      checkPropTypes(
        propTypes, // PropTypes definition
        this.getProperties(...Object.keys(propTypes)), // Values to validate
        'prop', // Type of validation that is occuring
        this.toString() // Name of component for better debug messaging
      );
    };
  }

  // Default Props included by default, can be configured off
  // Sets a default value for props during component initialization if undefined or
  // null
  if (process.env.INCLUDE_GET_DEFAULT_PROPS) {
    propTypesExtends.init = function() {
      this._super(...arguments);
      // If default props are not configured, we're done
      if (!this.get('getDefaultProps')) { return; }
      let defaultProps = this.get('getDefaultProps')();

      // If any prop with a default is undefined (undefined only), assign default
      // value to prop. Do not set default for null, undefined means a variable has
      // not been declared, null means a variable has been set to null.
      for (let prop in defaultProps) {
        if (this.get(prop) === undefined) { this.set(prop, defaultProps[prop]); }
      }
    };
  }

  // Only reopen Component class if adding props validation or getDefaultProps method
  if (process.env.NODE_ENV === 'development' || process.env.INCLUDE_GET_DEFAULT_PROPS) {
    Component.reopen(propTypesExtends);
  }
}

export default {
  name: 'component-prop-types',
  initialize
};
