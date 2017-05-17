import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';
import { bool, number, string } from 'prop-types';

export default Component.extend({
  propTypes: {
    someString: string,
    someNum: number,
    someBool: bool
  },

  layout: hbs`
    <h1>Pop open the console to see prop type validation errors</h1>
  `
});