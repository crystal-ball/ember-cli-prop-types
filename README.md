![PropTypes Icon](https://github.com/crystal-ball/ember-cli-prop-types/raw/master/icon.png)

[![Latest NPM release](https://img.shields.io/npm/v/ember-cli-prop-types.svg)](https://www.npmjs.com/package/ember-cli-prop-types)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-prop-types.svg)](https://emberobserver.com/addons/ember-cli-prop-types)
[![Dependencies](https://david-dm.org/crystal-ball/ember-cli-prop-types.svg)](https://david-dm.org/crystal-ball/ember-cli-prop-types)
[![Dev Dependencies](https://david-dm.org/crystal-ball/ember-cli-prop-types/dev-status.svg)](https://david-dm.org/crystal-ball/ember-cli-prop-types?type=dev)

# Ember CLI PropTypes

This addon makes the [prop-types](https://www.npmjs.com/package/prop-types)
library available for React style props validation in your Ember application. The
addon itself is very simple, it includes:
1. AMD compatible import of `prop-types` library _(prod optimized import weight of
  only 0.12KB gzipped)_.
2. Props validation called in dev builds with `checkPropTypes`, see the
  [component-prop-types](https://github.com/crystal-ball/ember-cli-prop-types/blob/master/addon/initializers/component-prop-types.js)
  initializer _(Component reopen stripped for production builds)_.
3. Optional Component extension to include `getDefaultProps` method for specifying
  default values for undefined passed props.

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

Note that these validations are only run in dev environments.

### Validating Ember-Specific Classes/Concepts

You can validate the majority of Ember classes or other Ember-specific concepts
via the `instanceOf` type checker. We have added specific support for `Ember.Array`
and will continue to add support for Ember classes that cannot be validated using
the library as-is.

```javascript
import Component from 'ember-component';
import EmberObject from 'ember-object';
import DS from 'ember-data';
import PropTypes from 'prop-types';
const { PromiseArray } = DS;

export default Component.extend({
  propTypes: {
    post: PropTypes.instanceOf(EmberObject),
    relatedPosts: PropTypes.instanceOf(PromiseArray),
    authors: PropTypes.emberArray.isRequired,
    comments: PropTypes.emberArray,
    leaveCommentClosureAction: PropTypes.func
  }
});
```

#### Ember-Specific Validators:

- `PropTypes.emberArray`

### Destructured Imports

Destructuring imports is also supported:

```javascript
import Component from 'ember-component';
import { string, number, bool, func } from 'prop-types';

export default Component.extend({
  propTypes: {
    title: string.isRequired,
    pages: number,
    isLatest: bool,
    someAction: func
  }
});
```

## Props Default Values
This addon adds the ability to set a default value for passed props through a
`getDefaultProps` method. This method should return an object with the default props
values:

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

Note that the `getDefaultProps` method is run during production builds.

## Lifecycle Hook Super Calls
This addon calls props validation and default value assignments in the
`didReceiveAttrs` and `init` lifecycle hooks. Per the Ember.js docs, if you need to
define additional behavior in these hooks you must call `this._super(...arguments)`:

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
The props validations are only run in development builds. In production builds a set
of no-op functions are imported instead of the `prop-types` library and the call to
`PropTypes.checkPropTypes` is stripped. The production weight for the addon is
0.29 KB (0.12 KB gzipped).

The `getDefaultProps` method is included and run by default in production builds. If
you would prefer not to enable this method, you can configure the addon to strip it
out:

```javascript
// ember-cli-build.js
module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    emberCliPropTypes: {
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
