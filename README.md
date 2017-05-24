![PropTypes Icon](https://github.com/crystal-ball/ember-cli-prop-types/raw/master/icon.png)

[![Latest NPM release](https://img.shields.io/npm/v/ember-cli-prop-types.svg)](
https://www.npmjs.com/package/ember-cli-prop-types)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-prop-types.svg)](https://emberobserver.com/addons/ember-cli-prop-types)
[![Dependencies](https://david-dm.org/crystal-ball/ember-cli-prop-types.svg)](https://david-dm.org/crystal-ball/ember-cli-prop-types)
[![Dev Dependencies](https://david-dm.org/crystal-ball/ember-cli-prop-types/dev-status.svg)](https://david-dm.org/crystal-ball/ember-cli-prop-types?type=dev)

# Ember CLI PropTypes

This addon makes the [prop-types](https://www.npmjs.com/package/prop-types)
library available for React style props validation in your Ember application. The
addon itself is very simple, it includes:
1. AMD compatible import of `prop-types` library _(prod optimized import weight of
  only 0.12KB gzipped)_.
2. Ember `Component` reopen in dev builds to call `checkPropTypes`, see the
  [component-prop-types](https://github.com/crystal-ball/ember-cli-prop-types/blob/master/addon/initializers/component-prop-types.js)
  initializer _(Component reopen stripped for production builds)_.

Props validations and the validators themselves are all provided by the
[prop-types](https://www.npmjs.com/package/prop-types) library.

## Install

```
ember install ember-cli-prop-types
```

## Props Validation
Import `PropTypes` into your component JS files and define a `propTypes` property to
perform validation on passed props:

```javascript
// your-component.js
import Component from 'ember-component';
import PropTypes from 'prop-types';

export default Component.extend({
  // Define prop types for your passed properties here
  propTypes: {
    title: PropTypes.string.isRequired,
    pages: PropTypes.number,
    isLatest: PropTypes.bool
  }
});
```

The `prop-types` library will validate that any props passed into your component
match the type specified in `propTypes`. See the
[prop-types Documentation](https://www.npmjs.com/package/prop-types) for details on
defining `propTypes` for your components.

#### Destructured Imports

Destructuring imports is also supported:

```javascript
import Component from 'ember-component';
import { string, number, bool } from 'prop-types';

export default Component.extend({
  propTypes: {
    title: string.isRequired,
    pages: number,
    isLatest: bool
  }
});
```

## Props Default Values
This addon adds the ability to set a default value for passed props through a `getDefaultProps`
method. This method should return an object with the default props values:

```javascript
import Component from 'ember-component';
import { string, number, bool } from 'prop-types';

export default Component.extend({
  propTypes: {
    title: string.isRequired,
    pages: number,
    isLatest: bool
  },
  getDefaultProps() {
    return {
      title: 'Ambitious Props',
      pages: 1,
      isLatest: false
    };
  }
});
```

During component initialization, if a prop with a configured default is `undefined`,
it will be set to the returned default value. This can be especially helpful when
working with dynamic values or the component helper.

The `getDefaultProps` method is run during production builds.

## Lifecycle Hook Super Calls
This addon calls props validation and default value assignments in the `didReceiveAttrs`
and `init` lifecycle hooks. Per the Ember.js docs, if you need to define additional behavior in
these hooks you must call `this._super(...arguments)`:

```javascript
export default Component.extend({
  propTypes: {
    someString: PropTypes.string
  },
  getDefaultProps() {
    return {
      someString: 'Default Value'
    }
  },

  init() {
    this._super(...arguments);
    // your component code
  },
  didReceiveAttrs() {
    this._super(...arguments);
    // your component code
  }
})
```

## In Production
Although props validation is only run in development builds, this addon must be
included for production builds as well. During production builds the `prop-types`
library is not imported. Instead a set of shims is imported for the props validators
so that the `import` statements do not throw errors. Prod weight for the addon is
0.29 KB (0.12 KB gzipped).

The call to `PropTypes.checkPropTypes` is automatically stripped in production builds
as well using UglifyJS's `compress` configurations. If you would like to disable this
additional stripping you can configure the addon to skip it in your
`ember-cli-build.js` configs _(Note that even if you disable the code stripping props
validations will still only be run in dev builds)_.

The `getDefaultProps` method is run during component `init` in production builds. If
you would prefer not to enable this method, you can configure the addon to strip it
out:

```javascript
// ember-cli-build.js
module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    emberCliPropTypes: {
      compress: false, // Setting to false will disable code stripping
      getDefaultProps: false // Setting to false will strip `getDefaultProps` feature
    }
  });

  return app.toTree();
};

```

## Contributing

If you'd like to contribute, please read our [contribution
guidelines](./.github/CONTRIBUTING.md) and then get cracking!

[Please report bugs using the issues tab.](https://github.com/crystal-ball/ember-cli-prop-types/issues)
