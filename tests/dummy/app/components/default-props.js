import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

export default Component.extend({

  getDefaultProps() {
    return {
      content: 'When passing dynamic data, it can be helpful to have a default value for some prop.'
    };
  },

  layout: hbs`
    <p>
      {{content}}
    </p>
  `
});
