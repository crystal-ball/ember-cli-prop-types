import Component from 'ember-component';
import Extended from '../models/extended';
import DS from 'ember-data';
import hbs from 'htmlbars-inline-precompile';
import { instanceOf, emberArray } from 'prop-types';
const { PromiseArray } = DS;

export default Component.extend({

  propTypes: {
    emberObject: instanceOf(Extended),
    emberArray: emberArray.isRequired,
    emberArrayNotRequired: emberArray,
    promiseArray: instanceOf(PromiseArray)
  },

  layout: hbs`
    <h3>Support for Native Ember Classes</h3>
    <p>Ember Object {{emberObject}}:
      <ul>
        {{#each-in emberObject as |key value|}}
          <li>{{key}}: {{value}}</li>
        {{/each-in}}
      </ul>
    </p>
    <p>Ember.Array ({{emberArray}}):
      <ul>
        {{#each emberArray as |item|}}
          <li>{{item}}</li>
        {{/each}}
      </ul>
    </p>
    <p>PromiseArray {{promiseArray}}:
      <ul>
        {{#each promiseArray as |item|}}
          <li>{{item}}</li>
        {{/each}}
      </ul>
    </p>
  `
});
