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

export { createChainableTypeChecker };
