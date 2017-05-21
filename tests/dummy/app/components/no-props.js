import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({

  layout: hbs`
    <h4>This component has no props, it should never throw an error</h4>
  `
});
