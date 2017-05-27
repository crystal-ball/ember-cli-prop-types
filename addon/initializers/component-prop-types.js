import Component from 'ember-component';
import PropTypes from 'prop-types';
import emberArray from '../custom-props/ember-array';
const { checkPropTypes } = PropTypes;

/**
 * Initializer is optimized for production using injected variables.
 * These are either added to the window as globals during dev builds or injected into
 * the build using UglifyJS during production builds.
 */
function initialize() {
  let propTypesExtends = {};

  // Adding `PropTypes.emberArray` for verifying Ember.A instances.
  PropTypes.emberArray = emberArray;

  // Props validation included in dev only
  // Add props validation checking during `didReceiveAttrs` hook with
  // `checkPropTypes` utility method
  if (NODE_ENV === 'development') {
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
  if (INCLUDE_GET_DEFAULT_PROPS) {
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
  if (NODE_ENV === 'development' || INCLUDE_GET_DEFAULT_PROPS) {
    Component.reopen(propTypesExtends);
  }
}

export default {
  name: 'component-prop-types',
  initialize
};
