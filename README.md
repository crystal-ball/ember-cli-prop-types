![hey](https://github.com/healthsparq/ember-cli-prop-types/raw/master/faux-go.png)

<div style="text-align: center;">

[![Latest NPM release](https://img.shields.io/npm/v/ember-cli-prop-types.svg)](
https://www.npmjs.com/package/ember-cli-prop-types)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-prop-types.svg)](https://emberobserver.com/addons/ember-cli-prop-types)
[![Dependencies](https://david-dm.org/healthsparq/ember-cli-prop-types.svg)](https://david-dm.org/healthsparq/ember-cli-prop-types)
[![Dev Dependencies](https://david-dm.org/healthsparq/ember-cli-prop-types/dev-status.svg)](https://david-dm.org/healthsparq/ember-cli-prop-types?type=dev)

</div>

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

## Excluding From Production

You most likely will not want to include prop types validation in production. By default, the addon will not run the initializer that auto-runs prop type checking to components in production builds, and an `uglifyjs` config is added/invoked to automatically remove unreachable/unused code during the build, meaning your `propTypes` declaractions in your component files should be automatically stripped out.

There are two mechanisms for excluding this addon from prod builds:

### Via Addon Config

This method is automatic. By default, `propTypes` validation will only occur for `development` builds of your application. You can add a configuration object to your app's `ember-cli-build.js` file to override this behavior:

```javascript
// ember-cli-build.js

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    emberCliPropTypes: {
      // Enable prop type validation for prod builds via
      // disabling code stripping
      stripCode: false
    }
  });
}
```

### Via Addon Blacklisting

Alternatively, you can choose to blacklist the addon to remove it completely for production builds. This is accomplished in your `ember-cli-build.js` file like so:

```javascript
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

// Create flag used to check if this is a production build
const production = EmberApp.env() === 'production';

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    addons: {
      // Set up a blacklist array contingent on the build type;
      // Prod builds blacklist ember-cli-prop-types, others blacklist
      // nothing. Your app may require a slightly more advanced setup
      // to deal with blacklisting of multiple addons. 
      blacklist: production ? ['ember-cli-prop-types'] : []
    }
  });
}
```

Note that this will not automatically strip your `propTypes` declarations from your components; you will need to set up an `uglifyJS` config for your app to do this. You can use the addon's [index.js](./index.js) as a reference for accomplishing this, but the jist is simply adding config options to your `ember-cli-build.js` file:

```javascript
// ember-cli-build.js
module.exports = function(defaults) {
  var app = new EmberApp(defaults, {

    // Set up the minifyJS options for uglify here
    minifyJSOptions: {
      options: {
        // If you want to remove unreachable code, uglify must be enabled
        enabled: true,
        compress: {
          // Enables stripping out of unreachable code
          dead_code: true
        }
      }
    }
  }
}
```

## Contributing

If you'd like to contribute, please read our [contribution guidelines](./.github/CONTRIBUTING.md) and then get cracking!

[Please report bugs using the issues tab.](https://github.com/healthsparq/ember-cli-prop-types/issues)