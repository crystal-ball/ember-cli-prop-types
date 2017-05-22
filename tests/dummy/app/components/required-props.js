import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';
import { string } from 'prop-types';

export default Component.extend({

  propTypes: {
    name: string.isRequired
  },

  layout: hbs`
    <p>Courtesy of the {{name}} repo</p>
  `
});
