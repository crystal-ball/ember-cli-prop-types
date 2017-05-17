import Component from 'ember-component';
import { checkPropTypes } from 'prop-types';

/**
 * This initializer reopens the Component class and adds propType checking to
 * the `didReceiveAttrs` hook, utilizing the [`prop-types` npm package](https://www.npmjs.com/package/prop-types).
 */
export function initialize() {
  Component.reopen({
    // Methods
    // -------------------------------------------------------------------------
    _checkPropTypes() {
      const propTypes = this.get('propTypes');
      const propKeys = typeof propTypes === 'object' ? Object.keys(propTypes) : null;

      // Assuming we have both prop types and property keys to look up,
      // check those funky prop types YEEEAAAAAAH
      if (propTypes && propKeys && propKeys.length) {
        // Passing `this` into checkPropTypes's `componentName` argument prints
        // then name and instance/elementId of the offending component into the
        // console warning
        checkPropTypes(propTypes, this.getProperties(...propKeys), 'prop', this);
      }
    },
    // Hooks
    // -------------------------------------------------------------------------
    didReceiveAttrs() {
      this._super(...arguments);
      // Check for existence of prop types, set up references to keys
      this._checkPropTypes();
    }
  });
}

export default {
  name: 'component-prop-types',
  initialize
};
