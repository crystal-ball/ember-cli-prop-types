import Ember from 'ember';
import { createChainableTypeChecker } from './helpers';
const { isArray } = Ember;

export default createChainableTypeChecker(function(props, propName, componentName) {
  let val = props[propName];
  if (!isArray(val)) {
    return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`. Validation failed.');
  }
});
