![hey](./faux-go.png)

# React PropTypes for Ember CLI

This addon adds support for React-style `PropTypes` validation on Ember Components. This addon utilizes [React's prop-types library](https://www.npmjs.com/package/prop-types) and can be used in your components in exactly the same way as they are in React.

## Usage

```
ember install ember-cli-prop-types
```

You can now import `PropTypes` into your component JS files and define a `propTypes` property to perform validation:

```javascript
// some-component.js

import Component from 'ember-component';
import PropTypes from 'prop-types';

export default Component.extend({
  // Define prop types for your passed properties here
  propTypes: {
    title: PropTypes.string,
    pages: PropTypes.number,
    isLatest: PropTypes.bool
  }
});
```

The presence of a `propTypes` property on your component will automatically invoke validation via `PropTypes.checkPropTypes` on all of the properties you specify. Standard usage for defining your `propTypes` applies here. [See PropTypes Documentation](https://www.npmjs.com/package/prop-types) for details on defining `propTypes` for your component.

### Destructured Imports

Destructuring on import is also supported:

```javascript
import Component from 'ember-component';
import { array } from 'prop-types';

export default Component.extend({
  propTypes: {
    photos: array
  }
});
```

## Caveats

Because this addon uses an initializer to re-open the Component class and add the `propTypes` checking to the `didReceiveAttrs` hook of all components, any components you have that you want to utilize `propTypes` on that also make use of `didReceiveAttrs` will need to call `this._super(...arguments)` in their local calls to `didReceiveAttrs` to preserve the call to `PropTypes.checkPropTypes`:

```javascript
  propTypes: {
    someString: PropTypes.string
  },

  didReceiveAttrs() {
    this._super(...arguments);
    // your other code goes here
  }
```

## Contributing

If you'd like to contribute, please read our [contribution guidelines](./.github/CONTRIBUTING.md) and then get cracking!

[Please report bugs using the issues tab.](https://github.com/healthsparq/ember-cli-prop-types/issues)