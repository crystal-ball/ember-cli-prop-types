import { bool, number, string } from 'prop-types';

import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({
  propTypes: {
    someString: string,
    someNumber: number.isRequired,
    someBool: bool
  },

  layout: hbs`
    <h1>Props Validation Demo</h1>
    <p>The test component allows <code>someString</code> to be a string, but we are
    passing a number to the component. Pop open the console to see the error thrown
    as a result.</p>
    <p><code>someNumber</code> is required but is not passed - it also generates error in console.</p>
  `
});
