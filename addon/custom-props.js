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

export default {
  addCustomProps: () => {
    // Adding `PropTypes.emberArray` for verifying Ember.A/Array instances.
    PropTypes.emberArray = emberArray;
  }
};
