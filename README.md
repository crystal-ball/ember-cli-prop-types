![PropTypes Icon](https://github.com/healthsparq/ember-cli-prop-types/raw/master/icon.png)

[![Latest NPM release](https://img.shields.io/npm/v/ember-cli-prop-types.svg)](
https://www.npmjs.com/package/ember-cli-prop-types)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-prop-types.svg)](https://emberobserver.com/addons/ember-cli-prop-types)
[![Dependencies](https://david-dm.org/healthsparq/ember-cli-prop-types.svg)](https://david-dm.org/healthsparq/ember-cli-prop-types)
[![Dev Dependencies](https://david-dm.org/healthsparq/ember-cli-prop-types/dev-status.svg)](https://david-dm.org/healthsparq/ember-cli-prop-types?type=dev)

# Ember CLI PropTypes

This addon shims the [prop-types](https://www.npmjs.com/package/prop-types)
library for React style props validation in your Ember application. The addon itself
is very simple, it includes:
- AMD compatible import of `prop-types` library, with prod import weight of only
  08.KB gzipped.
- Ember `Component` reopen in dev builds to call `checkPropTypes`, _(see the
  [component-prop-types](https://github.com/healthsparq/ember-cli-prop-types/blob/master/addon/initializers/component-prop-types.js)
  initializer)_.
- Stripping of Component reopen call for production builds.

## Install

```
ember install ember-cli-prop-types
```

## Usage
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

#### Using didReceiveAttrs
This addon calls the props validation method in the `didReceiveAttrs` hook of dev
builds. Per the Ember.js docs, if you need to define additional behavior called in
`didReceiveAttrs` you must call `this._super(...arguments)`:

```javascript
export default Component.extend({
  propTypes: {
    someString: PropTypes.string
  },

  didReceiveAttrs() {
    this._super(...arguments);
    // your component code
  }
})
```

## In Production
Props validation is only run in development builds. During production builds a
stripped version of the library is imported. File size is 2.2KB (0.8KB gzipped).

The call to `PropTypes.checkPropTypes` is automatically stripped in production builds
as well using UglifyJS's `compress` configurations. If you would like to disable
this additional stripping you can configure the addon to skip it in you `ember-cli-build.js` configs:

```javascript
// ember-cli-build.js
module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    emberCliPropTypes: {
      compress: false
    }
  });

  return app.toTree();
};

```

## Contributing

If you'd like to contribute, please read our [contribution
guidelines](./.github/CONTRIBUTING.md) and then get cracking!

[Please report bugs using the issues tab.](https://github.com/healthsparq/ember-cli-prop-types/issues)
