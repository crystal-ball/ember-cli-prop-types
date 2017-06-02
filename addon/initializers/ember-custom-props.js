import Ember from 'ember';
import PropTypes from 'prop-types';
const { isArray } = Ember;

let createChainableTypeChecker = function(validate) {
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';
    if (props[propName] === null || props[propName] === undefined) {
      if (isRequired) {
        return new Error(
          ('Required prop `' + propName + '` was not specified in `' + componentName + '`.')
        );
      }
      return null;
    } else {
      return validate(props, propName, componentName, location);
    }
  }

  let chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
};

let emberArray = createChainableTypeChecker(function(props, propName, componentName) {
  let val = props[propName];
  if (!isArray(val)) {
    return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`. Validation failed.');
  }
});

/**
 * Initializer appends the ember-cli-prop-types' custom props to the `PropTypes`
 * main object so they're usable in end applicaitons. This is only run in development env.
 */
function initialize() {
  if (NODE_ENV !== 'production') {
    PropTypes.emberArray = emberArray;
  }
}

export default {
  name: 'ember-custom-props',
  initialize
};
